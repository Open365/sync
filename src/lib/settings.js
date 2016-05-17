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

var path = require('path');
var environment = process.env;

var settings = {
    crypto: {
        type: "rsa",
        rsa: {
            private: path.join(__dirname, "/../../rsa-keys/key.pem")
        }
    },
    httpServer: {
        hostname: 'localhost',
        port: environment.SYNC_PORT || 8085
    },
    seafileSync: {
        host: environment.SEAFILE_SYNC_SERVER || "seafileSync.service.consul:3000"
    },
    emailDomain: environment.EYEOS_EMAIL_DOMAIN || 'open365.io',
    syncQueue: {
        type: "amqp",
        hosts: 'rabbit.service.consul:5672',
        username: environment.EYEOS_BUS_MASTER_USER || 'guest',
        password: environment.EYEOS_BUS_MASTER_PASSWD || 'guest',
        queue: {
            name: 'sync.v1',
            durable: false,
            exclusive: false,
            autoDelete: false
        },
        subscription: {
            ack: true,
            prefetchCount: +process.env.EYEOS_SYNC_SERVICE_PREFETCHCOUNT || 0
        },
        bindTo: [
            {
                exchangeName: "presence.v1",
                routingKey: 'login',
                options: {
                    type: 'topic',
                    durable: true
                }
            },
            {
                exchangeName: "presence.v1",
                routingKey: 'passwordchanged',
                options: {
                    type: 'topic',
                    durable: true
                }
            }
        ]
    }
};

module.exports = settings;
