const User = require('../../api/models/userModel')
const assert = require('assert')

describe('User', () => {

	it('should be invalid if the username or password is empty', (done) => {
		let user = new User();
		user.validate((err) => {
			assert.ok(err.errors['username']);
			assert.ok(err.errors['password']);
			done();
		})
	});

	it('should generate the current date and time when saving a user', (done) => {
		let user = new User({username: 'johns', password: 'pass'});
		assert.equal(user.registeredDate.toJSON(), new Date().toJSON());
		done();
	});
})