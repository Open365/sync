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

process.env.EYEOS_HIPPIE_TIMEOUT = 20000;
var EyeosHippie = require('eyeos-hippie');

function EyeosUser(username, password) {
	this.username = username || 'eyeos';
	this.password = password || 'eyeos';

	this.hippie = new EyeosHippie();
}

EyeosUser.prototype.login = function(cb) {
	var done = function(err) {
		if (err) {
			console.error("Failed to login", err);
			return cb(err);
		}

		cb();
	};

	this.hippie.login(done, this.username, this.password);
}

EyeosUser.prototype.changePassword = function(newPassword, cb) {
	var changePassword = '/principalService/v1/changepassword';

	var self = this;
	var data = {
		contentType: 'application/json'
	};
	var req = this.hippie.basicRequestWithCardAndSignature(data);
	req.parser(function(body, fn) {
		fn(null, body);
	})
	.put(changePassword)
	.send({
		currentpass: this.password,
		newpass: newPassword
	})
	.end(function(err) {
		if (!err) {
			self.password = newPassword;
		}
		cb(err);
	});
};

EyeosUser.prototype.getCard = function() {
	return JSON.parse(this.hippie.credentialsManager.getCard());
};
module.exports = EyeosUser;
