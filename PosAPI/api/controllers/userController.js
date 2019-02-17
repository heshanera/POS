'use strict';

const mongoose = require('mongoose'), 
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
    res.json(user[0]);
  });
};

module.exports = {addUser, deleteUser, listUsers, getUser}; 