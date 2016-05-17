/*
    Copyright (c) 2016 eyeOS

    This file is part of Open365.

    Open365 is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var settings = require('./settings');
var log2out = require('log2out');
var AmqpToHttp = require('eyeos-restutils').AmqpToHttp;
var express = require('express');
var bodyParser = require('body-parser');

var UserEvents = require('./UserEvents');

function Server (customSettings) {
    this.settings = customSettings || settings;
    this.logger = log2out.getLogger("Server");
    this.userEvents = new UserEvents();
}

Server.prototype.start = function () {
    var app = express();
    app.use(bodyParser.json());

    var self = this;
    app.post('/userEvent/login', function (req, res) {
        self.userEvents.login(req, res);
    });

    app.post('/userEvent/passwordChanged', function (req, res) {
        self.userEvents.passwordChanged(req, res);
    });

    app.listen(settings.httpServer.port, function () {
        var amqpToHttp = new AmqpToHttp(settings.syncQueue, settings.httpServer);
        amqpToHttp.start();
    });
};

module.exports = Server;
