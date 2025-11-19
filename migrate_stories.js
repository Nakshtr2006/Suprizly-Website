// Script to migrate diyData.json to MongoDB as Stories (if relevant)
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Story = require('./models/Story');

mongoose.connect('mongodb://localhost:27017/suprizly', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dataPath = path.join(__dirname, 'json', 'diyData.json');
const stories = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

(async () => {
  await Story.deleteMany({});
  await Story.insertMany(stories);
  console.log('Stories migrated!');
  mongoose.disconnect();
})();
