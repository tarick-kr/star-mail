const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  date: {
    type: Date,
    unique: false,
  },
  name: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: false,
  },
  subscription: {
    type: Boolean,
    unique: false,
  },
});

module.exports = model('users', userSchema);
