const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {timestamps: true});

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
  comments: [commentSchema],
  creator: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Article", articleSchema);
