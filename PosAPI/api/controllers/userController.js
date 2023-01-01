const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../middleware/config');

const User = mongoose.model('Users');

const addUser = function (req, res) {
  User.find({
    username: req.body.username,
  })
    .then((user) => {
      if (user.length > 0) {
        throw new Error('username already exists');
      } else {
        // hashing the password
        const saltRounds = 5;
        const userInfo = req.body;
        bcrypt.hash(userInfo.password, saltRounds).then(
          (hash) => {
            userInfo.password = hash;
            const newUser = new User(userInfo);
            newUser.save().then((userData) => {
              res.json({
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                registeredDate: userData.registeredDate,
              });
            });
          },
          (err) => {
            res.status(400).send(err);
          },
        );
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteUser = function (req, res) {
  User.find({
    username: req.body.username,
  })
    .then((user) => {
      if (user.length === 0) {
        throw new Error('invalid username');
      } else {
        // comparing the password
        bcrypt
          .compare(req.body.password, user[0].password)
          .then((matching) => {
            if (matching) {
              User.deleteOne({
                username: req.body.username,
              }).then((userData) => {
                res.json({ deletedCount: userData.deletedCount });
              });
            } else {
              throw new Error('invalid password');
            }
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const listUsers = function (req, res) {
  User.find({})
    .then((userList) => {
      if (userList.length > 0) res.json(userList);
      else throw new Error('no users');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getUser = function (req, res) {
  User.find({
    username: req.body.username,
  })
    .then((user) => {
      if (user.length === 1) {
        // comparing the password
        bcrypt
          .compare(req.body.password, user[0].password)
          .then((matching) => {
            if (matching) {
              const { username } = user[0];
              const { firstName } = user[0];
              const { lastName } = user[0];
              const token = jwt.sign({ username }, config.secret, { expiresIn: '24h' });
              res.json({
                success: true,
                message: 'Authentication successfull',
                token,
                username,
                firstName,
                lastName,
              });
            } else throw new Error('invalid password');
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else throw new Error('invalid username');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  addUser,
  deleteUser,
  listUsers,
  getUser,
};
