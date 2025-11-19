// Entry point for Express server with EJS and MongoDB integration
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/suprizly')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.log('MongoDB connection failed. Running without database...');
    console.log('To fix: Install MongoDB or use MongoDB Atlas');
  });

// Models
const Box = require('./models/Box');
const Story = require('./models/Story');

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const mainRoutes = require('./routes/main');
const boxRoutes = require('./routes/boxes');
const storyRoutes = require('./routes/stories');

app.use('/', mainRoutes);
app.use('/boxes', boxRoutes);
app.use('/stories', storyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
