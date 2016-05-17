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
var UserEventsMarshaller = require('./UserEventsMarshaller');
var generateSeafileUsername = require('./generateSeafileUsername');
var SeafileUser = require('./SeafileUser');
var WError = require('verror').WError;
var log2out = require('log2out');

var UserEvents = function(settingsInj, marshallInj) {
    this.marshall = marshallInj || new UserEventsMarshaller();
    this.settings = settings;
    this.logger = log2out.getLogger('UserEvents');
    this.seafileUser = new SeafileUser();
};

UserEvents.prototype.login = function(req, res) {
    var self = this;
    this.marshall.login(req, function(err, data) {
        if (err) {
            err = new WError(err, "Failed to Demarshall req");
            self.logger.error(err);
            res.sendStatus(400).end();
            return;
        }

        var seafileUsername = generateSeafileUsername(data.username, data.card);
        self.seafileUser.prepareUser(seafileUsername, data.password, data.fullName, function(err) {
            if (err) {
                self.logger.error(err);
                res.sendStatus(500).end();
            } else {
                res.sendStatus(200).end();
            }
        });
    });
};

UserEvents.prototype.passwordChanged = function(req, res) {
    var self = this;
    this.marshall.passwordChanged(req, function(err, data) {
        if (err) {
            self.logger.error(err);
            res.sendStatus(400).end();
            return;
        }
        self.logger.debug("Successfully marshalled req");

        var seafileUsername = generateSeafileUsername(data.username, data.card);
        self.seafileUser.updatePassword(seafileUsername, data.newPassword, function(err) {
            if (err) {
                self.logger.error(err);
                res.sendStatus(500).end();
            } else {
                res.sendStatus(200).end();
            }
        });
    });
};

module.exports = UserEvents;
