const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const statisticSchema = mongoose.Schema({
  gamesPlayed: {
    type: Number,
    required: true,
    defaultValue: 0
  },
  gamesWon: {
    type: Number,
    required: true,
    defaultValue: 0
  },
  gamesLost: {
    type: Number,
    required: true,
    defaultValue: 0
  },
  coursesRead: {
    type: Number,
    required: true,
    defaultValue: 0
  }
}, {
  timestamps: true
});

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
  statistics: statisticSchema
}, {
  timestamps: true
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
