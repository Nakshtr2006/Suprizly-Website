const express = require('express');
const router = express.Router();
const Box = require('../models/Box');

// List all boxes
router.get('/', async (req, res) => {
  const boxes = await Box.find();
  res.render('boxes', { boxes });
});

// CRUD routes (minimal for now)
router.post('/add', async (req, res) => {
  const { name, price, discount, desc, features } = req.body;
  await Box.create({ name, price, discount, desc, features: features ? features.split(',') : [] });
  res.redirect('/boxes');
});

router.post('/delete/:id', async (req, res) => {
  await Box.findByIdAndDelete(req.params.id);
  res.redirect('/boxes');
});

module.exports = router;
