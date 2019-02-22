'use strict';

const config = require('../middleware/config'),
jwt = require('jsonwebtoken'),
mongoose = require('mongoose'), 
User = mongoose.model('Users');

let addUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

let deleteUser = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully removed' });
  });
};

let listUsers = function(req, res) {
  User.find({}, function(err, userList) {
    if (err)
      res.send(err);
    res.json(userList);
  });
};

let getUser = function(req, res) {
  User.find({
    username: req.body.username,
    password: req.body.password
  }, function(err, user) {
    if (err)
      res.send(err);
    else if (user != null) {

      const username = user[0].username;
      const firstName = user[0].firstName;
      const lastName = user[0].lastName;

      let token = jwt.sign(
        {username: username},
        config.secret,
        { expiresIn: '24h' }
      );
      res.json({
        success: true,
        message: 'Authentication successfull',
        token:token,
        username: username,
        firstName: firstName,
        lastName: lastName
      }); 
      // res.json(user[0]); 
    } else res.json({});
  });
};

module.exports = {addUser, deleteUser, listUsers, getUser}; 