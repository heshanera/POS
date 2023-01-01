const request = require('supertest');
const server = require('../../server');
const User = require('../../api/models/userModel');

describe('API testing for user', () => {
  let token = '';
  describe('POST /getUser', () => {
    it('respond with user details and an authentication token', (done) => {
      const userCredentials = {
        username: 'johns',
        password: 'pass',
      };
      request(server)
        .post('/getUser')
        .send(userCredentials)
        .expect((response) => {
          token = JSON.parse(response.text).token;
        })
        .expect(200, done);
    });

    it('respond with 401 when authentication token is invalid', (done) => {
      invalidToken = 'ausydiuqwdy786weqwu';
      request(server).post('/addOrderItem').set('Authorization', invalidToken).expect(401, done);
    });
  });

  describe('POST /nonExistingUrl', () => {
    it('respond with 404 when call a non existing url', (done) => {
      request(server).post('/nonExistingUrl').expect(404, done);
    });
  });
});
