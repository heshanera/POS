const request = require('supertest');
const server = require('../server');
const User = require('../api/models/userModel');
const Item = require('../api/models/itemModel');
const Order = require('../api/models/orderModel');
let mongoose = require('mongoose');

let userId = '';
let token = '';
let connection = '';

before((done) => {
	// Accessing test database
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true });
    connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'connection error'));
    connection.once('open', function() {
      console.log('\tWe are connected to test database!');
    });
    done();
});

beforeEach((done) => {
	// create new user
	const newUser = new User({
		username: 'johns',
		password: 'pass',
		firstName: 'John',
		lastName: 'Smith'
	});

	//check the given credentials are already in the db
	User.find({
	    username: newUser.username,
	    password: newUser.password
  	})
  	.then((response) => {
  		// if the user is already in the database
  		if (response.length > 0) {
  			User.deleteMany({username: newUser.username})
			.then((response) => {
		        // do nothing
		    })
		    .catch();
  		}
  		// if the user is not in the database
  		newUser.save()
	    .then((response) => {	
	        userId = response._id;
	        token = response.token;
	        done();
	    })
  	})
  	.catch((err) => {
  		console.log(err);
  		done();
  	})
})


after((done) => {
    connection.db.dropDatabase(done);
});