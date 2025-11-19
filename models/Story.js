const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
