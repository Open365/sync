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
var request = require('request');
var log2out = require('log2out');

function SeafileSync(settingsInj, requestInj) {
	this.settings = settingsInj || settings;
	this.request = requestInj || request;
	this.logger = log2out.getLogger('SeafileSync');
}

SeafileSync.prototype.sync = function (username, encryptedPassword, libraries, cb) {
	var url = 'http://' + this.settings.seafileSync.host + '/syncUserLibraries';
	var json = {
		username: username,
		password: encryptedPassword,
		libraries: libraries
	};

	var options = {
		url: url,
		method: 'POST',
		json: json
	};

	var self = this;
	this.request(options, function (err, response) {
		if (err) {
			self.logger.error("SeafileSync Failed:", err);
			return cb(err);
		}
		if (response.statusCode != 200) {
			self.logger.error("SeafileSync Failed:", response.statusCode);
			return cb(new Error("Seafile sync failed" + response.statusCode));
		}

		cb(null);
	});
};

module.exports = SeafileSync;
