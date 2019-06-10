const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  cards: {
    type: String,
    required: true
  },
  chipsAmount: {
    type: Number,
    required: true
  },
  rank: {
    type: Number,
    required: true
  }
}, {timestamps: true});

const gameSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    enum: ["cashgame", "MTT"]
  },
  buyIn: {
    type: Number,
    required: true,
    min: 0
  },
  maxPlayer: {
    type: Number,
    required: true,
    min: 2,
    max: 9
  },
  players: [playerSchema],
  cashPrice: {
    type: Number,
    required: true,
    min: 0
  },
  creator: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Game", gameSchema);
