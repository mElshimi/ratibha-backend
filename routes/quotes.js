const express = require('express');
const router = express.Router();

const quotes = [
  'لا يوجد مستحيل مع الإصرار.',
  'كل يوم هو فرصة جديدة للنجاح.',
  'ثق بنفسك وواصل التقدم.',
  'النجاح يبدأ بخطوة.',
  'اجتهد اليوم لتفتخر بنفسك غدًا.'
];

router.get('/', (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

module.exports = router;
