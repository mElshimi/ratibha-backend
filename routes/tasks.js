const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Add task or study
router.post('/', auth, async (req, res) => {
  const { title, type, date } = req.body;
  if (!title || !type || !date)
    return res.status(400).json({ msg: 'يرجى ملء جميع الحقول' });
  const task = new Task({ user: req.user.id, title, type, date });
  await task.save();
  res.status(201).json(task);
});

// Get all tasks for a day
router.get('/:date', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id, date: req.params.date });
  res.json(tasks);
});

// Mark task as done
router.patch('/:id/done', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { done: true }, { new: true });
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ msg: 'تم الحذف' });
});

module.exports = router;
