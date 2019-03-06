'use strict';

const config = require('../middleware/config'),
jwt = require('jsonwebtoken'),
mongoose = require('mongoose'), 
User = mongoose.model('Users');

let addUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err)
      res.status(400).send(err);
    else res.json(user);
  });
};

let deleteUser = function(req, res) {
  User.deleteOne({
    _id: req.body.userId 
  }, function(err, user) {
    if (err)
      res.status(400).send(err);
    else res.json({ 
      deletedCount: user.deletedCount
    });
  })
};

let listUsers = function(req, res) {
  User.find({}, function(err, userList) {
    if (err)
      res.status(400).send(err);
    else res.json(userList);
  });
};

let getUser = function(req, res) {
  User.find({
    username: req.body.username,
    password: req.body.password
  }, function(err, user) {
    if (err)
      res.status(400).send(err);
    else if (user.length === 1) {

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
    } else res.status(404).json({});
  });
};

module.exports = {addUser, deleteUser, listUsers, getUser}; 