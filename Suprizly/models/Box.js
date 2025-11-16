const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  name: String,
  price: Number,
  discount: Number,
  desc: String,
  features: [String]
});

module.exports = mongoose.model('Box', boxSchema);
