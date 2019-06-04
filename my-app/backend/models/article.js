const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["article", "cours"]
  },
  creator: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Article", articleSchema);
