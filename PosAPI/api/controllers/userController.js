'use strict';

const config = require('../middleware/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); 
const User = mongoose.model('Users');
const bcrypt = require('bcryptjs');

let addUser = function(req, res) {
  User.find({
    username: req.body.username
  })
  .then((user) => {
    if (user.length > 0) {
      throw new Error('username already exists');
    } else {
      // hashing the password
      const saltRounds = 5;
      const userInfo = req.body
      bcrypt.hash(userInfo.password, saltRounds)
      .then((hash) => {
        userInfo.password = hash;
        let newUser = new User(userInfo);
        newUser.save()
        .then((user) => {
          res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            registeredDate: user.registeredDate
          });
        });
      }, (err) => {
        res.status(400).send(err);
      });
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
};

let deleteUser = function(req, res) {
  User.find({
    username: req.body.username
  })
  .then((user) => {
    if (user.length === 0) {
      throw new Error('invalid username')
    } else {
      // comparing the password
      bcrypt.compare(req.body.password, user[0].password)
      .then((matching) => {
          if (matching) {
            User.deleteOne({
              username: req.body.username
            })
            .then((user) => {
              res.json({ deletedCount: user.deletedCount });
            })
          } else {
            throw new Error('invalid password')
          }
      })
      .catch((err) => {
        res.status(400).send(err);
      })
    }
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
    username: req.body.username
  })
  .then((user) => {
    if (user.length === 1) {
      // comparing the password
      bcrypt.compare(req.body.password, user[0].password)
      .then((matching) => {
          if (matching) {
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
          } else throw new Error('invalid password')
      })
      .catch((err) => {
        res.status(400).send(err);
      })
    } else throw new Error('invalid username');
  })
  .catch((err) => {
    res.status(400).send(err);
  });
};

module.exports = {addUser, deleteUser, listUsers, getUser}; 