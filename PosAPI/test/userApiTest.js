const request = require('supertest');
const server = require('../server');
const User = require('../api/models/userModel');

describe('API testing for user', () => {

	let token = '';
	let userId = '';
	describe('POST /getUser', () => {
	    
		it('respond 404 when user is not found', (done) => {
	    	const userCredentials = {
	    		username: 'brucew',
	    		password: 'pass'
	    	};
	        request(server)	
	            .post('/getUser')
	            .send(userCredentials)
	            .expect(404, done);
	    });

	    it('respond with user details and an authentication token', (done) => {
	    	const userCredentials = {
	    		username: 'johns',
	    		password: 'pass'
	    	};
	        request(server)	
	            .post('/getUser')
	            .send(userCredentials)
	            .expect((response) => {
	            	token = JSON.parse(response.text).token;
	            })
	            .expect(200, done);
	    });
	});

	describe('GET /listUsers', () => {
	    it('respond with 401 when request is not authorized', (done) => {
	        request(server)	
	            .get('/listUsers')
	            .set('Accept', 'application/json')
	            .expect('Content-Type', /json/)
	            .expect('{"success":false,"message":"Auth token is not supplied"}')
	            .expect(401, done);
	    });

	    it('respond with json containing a list of all users', (done) => {
	        request(server)	
	            .get('/listUsers')
	            .set('Accept', 'application/json')
	            .set('Authorization', token)
	            .expect('Content-Type', /json/)
	            .expect(200, done);
	    });
	});

	describe('POST /addUser', () => {
	    it('respond with 200 when user is added successfuly', (done) => {
	    	const userDetails = {
	    		username: 'harryp',
	    		password: 'pass',
	    		firstName: 'Harry',
	    		lastName: 'Potter'
	    	};
	        request(server)	
	            .post('/addUser')
	            .set('Accept', /json/)
	            .set('Authorization', token)
	            .send(userDetails)
	            .expect('Content-Type', /json/)
	            .expect((response) => {
	            	userId = response.body._id;
	            })
	            .expect(200, done);
	    });

	    it('respond with 400 when an error occurred in adding the new user', (done) => {
	        request(server)	
	            .post('/addUser')
	            .set('Accept', /json/)
	            .set('Authorization', token)
	            .expect('Content-Type', /json/)
	            .expect(400, done);
	    });

	});

	describe('DELETE /deleteUser', () => {
	    it('respond with 401 when request is not authorized', (done) => {
	    	const userDetails = {
	    		userId: '41224d776a326fb40f000001'
	    	};
	        request(server)	
	            .delete('/deleteUser')
	            .set('Accept', 'application/json')
	            .send(userDetails)
	            .expect('Content-Type', /json/)
	            .expect('{"success":false,"message":"Auth token is not supplied"}')
	            .expect(401, done);
	    });

	    it('respond with message when user is successfuly deleted', (done) => {
	    	const userDetails = {
	    		userId: userId
	    	};

	        request(server)	
	            .delete('/deleteUser')
	            .set('Accept', 'application/json')
	            .set('Authorization', token)
	            .send(userDetails)
	            .expect('Content-Type', /json/)
	            .expect('{"deletedCount":1}')
	            .expect(200, done);
	    });

	  	it('respond with 400 when an error occurred in deleting an existing user', (done) => {
	  		const userDetails = {
	    		userId: '{*&%}'
	    	};
            request(server)	
	            .delete('/deleteUser')
	            .set('Accept', 'application/json')
	            .set('Authorization', token)
	            .send(userDetails)
	            .expect('Content-Type', /json/)
	            .expect(400, done);
	    });

	});

});
