'use strict';

const config = require('../middleware/config'),
jwt = require('jsonwebtoken'),
mongoose = require('mongoose'), 
User = mongoose.model('Users');

let addUser = function(req, res) {
  User.find({
    username: req.body.username
  })
  .then((user) => {
    if (user.length > 0) {
      throw new Error('username already exists');
    } else {
      var newUser = new User(req.body);
      newUser.save()
      .then((user) => {
        res.json(user);
      }, (err) => {
        res.status(400).send(err);
      })
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
};

let deleteUser = function(req, res) {
  User.deleteOne({
    username: req.body.username,
    password: req.body.password 
  })
  .then((user) => {
    if (user.deletedCount) {
      res.json({ 
        deletedCount: user.deletedCount
      });
    } else throw new Error('invalid credentials')
  })
  .catch((err) => {
    res.status(400).send(err);
  })
};

let listUsers = function(req, res) {
  User.find({})
  .then((userList) => {
    if (userList.length > 0)
      res.json(userList);
    else 
      throw new Error('no users');
  })
  .catch((err) => {
    res.status(400).send(err);
  })
};

let getUser = function(req, res) {
  User.find({
    username: req.body.username,
    password: req.body.password
  })
  .then((user) => {
    if (user.length === 1) {
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
    } else throw new Error('invalid user credentials');
  })
  .catch((err) => {
    res.status(400).send(err);
  });
};

module.exports = {addUser, deleteUser, listUsers, getUser}; 