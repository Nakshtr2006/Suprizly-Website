const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// List all stories
router.get('/', async (req, res) => {
  const stories = await Story.find();
  res.render('customer', { stories });
});

// CRUD routes (minimal for now)
router.post('/add', async (req, res) => {
  const { title, content, author } = req.body;
  await Story.create({ title, content, author });
  res.redirect('/stories');
});

router.post('/delete/:id', async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.redirect('/stories');
});

module.exports = router;
