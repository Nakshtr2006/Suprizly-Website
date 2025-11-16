// Script to migrate boxesData.json to MongoDB
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Box = require('./models/Box');

mongoose.connect('mongodb://localhost:27017/suprizly', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dataPath = path.join(__dirname, 'json', 'boxesData.json');
const boxes = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

(async () => {
  await Box.deleteMany({});
  await Box.insertMany(boxes);
  console.log('Boxes migrated!');
  mongoose.disconnect();
})();
