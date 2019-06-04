const mongoose = require('mongoose');

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
  currentPlayerNbr: {
    type: Number,
    required: true,
    min: 0,
    max: 9
  },
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
