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

var assert = require('chai').assert;

var EyeosUser = require('./EyeosUser');
var SeafileUtils = require('./SeafileUtils');
var generateSeafileUsername = require('../src/lib/generateSeafileUsername');

suite('Sync Component Test', function () {
	test('Check if seafile account has been created', function(done) {
		var user = new EyeosUser('eyeos', 'eyeos');
		user.login(function(err) {
			assert.notOk(err);
			SeafileUtils.pollForUser(generateSeafileUsername(user.username, user.getCard()), user.password, function(exists) {
				assert.ok(exists, "Seafile user has not been created");
				done();
			});
		});
	});

	test('Check if seafile account is updated after changePassword', function(done) {
		var user = new EyeosUser('eyeos1', 'eyeos');
		user.login(function(err) {
			assert.notOk(err);

			SeafileUtils.pollForUser(generateSeafileUsername(user.username, user.getCard()), null, function(exists) {
				assert.ok(exists);

				var newPassword = 'EyeosEyeos001';
				user.changePassword(newPassword, function(err) {
					assert.notOk(err);

					SeafileUtils.pollForUser(generateSeafileUsername(user.username, user.getCard()), newPassword, function(exists) {
						assert.ok(exists, "Seafile user password has not been updated");
						done();
					});
				});
			});
		});
	});
});
