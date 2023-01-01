const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Users', UserSchema);
