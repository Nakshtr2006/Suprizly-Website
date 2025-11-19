const express = require('express');
const router = express.Router();
const Box = require('../models/Box');

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// Other main pages
router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/diy', (req, res) => {
  res.render('diy');
});

router.get('/customer', (req, res) => {
  res.render('customer');
});

router.get('/orders', async (req, res) => {
  const boxes = await Box.find();
  res.render('orders', { boxes });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/Faq', (req, res) => {
  res.render('Faq');
});

module.exports = router;
