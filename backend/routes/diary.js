const express = require('express');
const jwt = require('jsonwebtoken');
const Diary = require('../models/Diary');

const router = express.Router();

// Middleware to check token
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get diary entries
router.get('/', auth, async (req, res) => {
  const entries = await Diary.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(entries);
});

// Add diary entry
router.post('/', auth, async (req, res) => {
  const entry = await Diary.create({ userId: req.userId, entry: req.body.entry });
  res.json(entry);
});

module.exports = router;
