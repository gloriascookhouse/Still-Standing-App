const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Save diary entry
router.post('/add', authMiddleware, async (req, res) => {
  const { entry } = req.body;
  try {
    const user = await User.findById(req.userId);
    user.diary.push({ entry });
    await user.save();
    res.json({ message: 'Diary saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get diary entries
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.diary);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save/unsave favorites
router.post('/favorite', authMiddleware, async (req, res) => {
  const { message } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (user.favorites.includes(message)) {
      user.favorites = user.favorites.filter(m => m !== message);
    } else {
      user.favorites.push(message);
    }
    await user.save();
    res.json(user.favorites);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
