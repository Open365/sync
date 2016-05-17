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

suite('#UserEventsMarshaller', function() {
	var sut;
	var encPassword, fakeCard;

	setup(function() {
		encPassword = "KpSxR+JJwbZxb0RRj0ZNFNvb+K4kLaevc3iEdQstSB1PtiROVjrUtTzbWOhWtkjkLALo67Xdd1ptIOnM4mSd4GmdOcLheLeQsbKTc+3hbirm8FdZJgH5ahTXx/rLvHUIoLCC75L2u0rAuYZUUH2OnvBr2rzuCFvXFaiskhQs6GDM542xtB83HiRdcCLsC5utWllTq5NzJmpcr9Fk9M9MvLOUu5XWMdGjLz/MENRGfx1AmsuoyDio9bs1bwz0wI7hLt/qBONQPevE6blEf1OZWaPAeQPQa8d0KFGjXamd3COUPxLjz7m5zYu+AzQrdas55gevN6EpsEtrgXov4e5vnvjLtcoQ3RRaBC+j3GDIxLN6SyESEznzT+lQehO3DOg+YFYir9LR2Kk5KBCdiQMU7Iur2j+CaTnGeoXgQkHVxeY04vlJm9TCA+iVkipZ8dJv2tnNw+rB7uvqDLIjJb3OaOxrbUBPbCUZUYx4P2uyl6QQdHdf/+Uy1KQh7njN2s55BbXn0xDNVDtp7Vfyndv3poOWsMSwTDy8zLhRjeHPopN6K1DuQJ/fiwNm9/hs7o/59PdKFT/T82AkmgKjWarEsNQeRY6zdDIn2mE095kmE1N8p70WU7lXxuct5aDRpMoBUWBhdn0bBsNs2spUmBBSF9MqWscLOhQgtqsO6rX+raA=";
		fakeCard = 'aCard';
		sut = new UserEventsMarshaller();
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
