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

var WError = require('verror').WError;
var log2out = require('log2out');

var EyeosSeafileAdminApi = require('eyeos-seafile-api').admin;

function SeafileUser() {
	this.logger = log2out.getLogger("SeafileUser");
	this.seafileAdmin = new EyeosSeafileAdminApi();
}

SeafileUser.prototype.prepareUser = function (email, password, fullName, cb) {
	var self = this;

	var params = {
		email: email,
		password: password
	};

	self.seafileAdmin.createAccount(params, function(err) {
		if (err) {
			err = new WError(err, "SeafileAdmin createAccount failed for", email);
			return cb(err);
		}
		self.logger.debug("Created account for user " + email);
		if(!fullName) {
			return cb();
		}

		self.logger.debug("Updating user's full name");
		params.name = fullName;
		self.seafileAdmin.updateAccount(params, function(err) {
			if (err) {
				err = new WError(err, "SeafileAdmin updateAccount failed for", email);
				return cb(err);
			}
			return cb();
		});
	});
};

SeafileUser.prototype.updatePassword = function (email, password, cb) {
	var params = {
		email: email,
		password: password
	};
	var self = this;
	self.logger.debug(params);
	self.seafileAdmin.updateAccount(params, function(err) {
		if (err) {
			return cb(err);
		}

		self.logger.debug("Successfully updated seafile password for", params.email);
		cb();
	});
};

module.exports = SeafileUser;
