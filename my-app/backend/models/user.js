const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const dateNow = require('../scripts');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(dateNow())
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
