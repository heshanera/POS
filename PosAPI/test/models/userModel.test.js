const assert = require('assert');
const User = require('../../api/models/userModel');

describe('User', () => {
  it('should be invalid if the username or password is empty', (done) => {
    const user = new User();
    user.validate((err) => {
      assert.ok(err.errors.username);
      assert.ok(err.errors.password);
      done();
    });
  });

  it('should generate the current date and time when saving a user', (done) => {
    const user = new User({ username: 'johns', password: 'pass' });
    // get the current date and time
    let now = new Date();
    now.setMilliseconds(0);
    now.setSeconds(0);
    now = now.toISOString();
    // date time user registered
    let { registeredDate } = user;
    registeredDate.setMilliseconds(0);
    registeredDate.setSeconds(0);
    registeredDate = registeredDate.toISOString();
    // comparison
    assert.equal(registeredDate, now);
    done();
  });
});
