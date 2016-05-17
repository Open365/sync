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

var EyeCrypt = require('eyeos-crypt').EyeCrypt;
var settings = require('./settings');
var log2out = require('log2out');

var UserEventsMarshaller = function(eyeCrypt) {
	this.settings = settings;
    this.userCrypt = eyeCrypt || new EyeCrypt(this.settings.crypto);
	this.logger = log2out.getLogger('UserEventsMarshaller');
};

UserEventsMarshaller.prototype.login = function(req, cb) {
	var body = req.body;
	if (!body.username || !body.password) {
		this.logger.error("Missing username or password in login event");
		return cb(new Error("Missing username or password"));
	}

	this.userCrypt.decrypt(body.password, function(err, decryptedPassword) {
		if (err) {
			return cb(err);
		}

		cb(null, {
			username: body.username,
			password: decryptedPassword,
			card: body.card,
			fullName: body.fullName
		});
	});
};

UserEventsMarshaller.prototype.passwordChanged = function(req, cb) {
	var body = req.body;

	// JSON Validation
	if (!body.username || !body.oldPassword || !body.newPassword) {
		this.logger.error("Request is missing parameters");
		return cb(new Error("Missing parameters"));
	}

	this.userCrypt.decrypt(body.newPassword, function(err, decryptedNewPassword) {
		if (err) {
			return cb(err);
		}

		cb(null, {
			username: body.username,
			card: body.card,
			newPassword: decryptedNewPassword
		});
	});
};

module.exports = UserEventsMarshaller;
