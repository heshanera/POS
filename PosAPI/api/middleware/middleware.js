/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const config = require('./config');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid',
          error: err,
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

module.exports = {
  checkToken,
};
