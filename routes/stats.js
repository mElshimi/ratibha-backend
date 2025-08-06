const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Daily stats
router.get('/daily/:date', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id, date: req.params.date });
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  res.json({ total, done });
});

// Weekly stats (Friday)
router.get('/weekly/:friday', auth, async (req, res) => {
  // friday: 'YYYY-MM-DD' (the Friday of the week)
  const start = new Date(req.params.friday);
  start.setDate(start.getDate() - 6); // from Saturday
  const end = new Date(req.params.friday);
  const tasks = await Task.find({
    user: req.user.id,
    date: { $gte: start.toISOString().slice(0,10), $lte: end.toISOString().slice(0,10) }
  });
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  res.json({ total, done });
});

module.exports = router;
