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

var eyeosSeafile = require('eyeos-seafile-api');

function seafileUserExists(username, password, cb) {
	if (typeof password === "string") {
		var user = new eyeosSeafile.user(username, password);
		user.listLibraries(function(err) {
			console.log('List libraries error: ', err);
			cb(!err);
		});
	} else {
		var admin = new eyeosSeafile.admin();
		admin.listAccounts({}, function(err, accounts) {
			if (err) {
				return cb(err);
			}

			var emails = accounts.map(function(account) { return account.email; });
			console.log("Got accounts", emails);
			return cb(emails.indexOf(username) != -1);
		});
	}
}

function pollForUser(username, password, cb) {
	var maxTries = 20;
	var timeout = 500;

	var fn = seafileUserExists.bind(null, username, password, function(exists) {
		if (!maxTries || exists) {
			return cb(exists);
		}
		console.log("Seafile user [", username, password, "] does not exist. Will try again");
		maxTries--;
		setTimeout(fn, timeout);
	});

	fn();
}

module.exports = {
	pollForUser: pollForUser
}
