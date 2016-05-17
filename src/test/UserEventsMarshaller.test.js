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
var UserEventsMarshaller = require('../lib/UserEventsMarshaller');
var EyeCrypt = require('eyeos-crypt').EyeCrypt;

suite('#UserEventsMarshaller', function() {
	var sut;
	var encPassword, fakeCard, eyeCrypt, keysPath;

	setup(function() {
        encPassword = "XsXoElhUIGLhGODEBjob/jsZrf0+lkCRw5UEzUkAQ9SCvN0ZT3b2Nc3vbkcHlJhgew864CsRH4zu2cD9dzEEHLzvVVZ/A7P5ETT7OaqOaB4eegPJItkmLrTb+mevOsznXBJFoX1sYsIPkI1o3U30/wmaSi21Zr0hZ01Z9Gac+Dk=";
		fakeCard = 'aCard';
        keysPath = __dirname + '/rsa-keys/';
        eyeCrypt = new EyeCrypt({type:'rsa', rsa:{private: keysPath + 'key.pem', public: keysPath + 'key.pub'}});
		sut = new UserEventsMarshaller(eyeCrypt);
	});

	test('login should give the correct parameters', function(done) {
		var body = {
			username: 'username',
			password: encPassword,
			card: fakeCard,
			fullName: 'John Doe'
		};

		sut.login({body: body}, function(err, obj) {
			assert.notOk(err);
			assert.deepEqual(obj, {username: 'username', password: 'password', fullName: 'John Doe', card: fakeCard});
			done();
		});
	});

	test('passwordChanged should give the correct parameters', function(done) {
		var body = {
			username: 'username',
			card: fakeCard,
			oldPassword: encPassword,
			newPassword: encPassword
		};

		sut.passwordChanged({body: body}, function(err, obj) {
			assert.notOk(err);
			assert.deepEqual(obj, {username: 'username', newPassword: 'password', card: fakeCard});
			done();
		});
	});
});
