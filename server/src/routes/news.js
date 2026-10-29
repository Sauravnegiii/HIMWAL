const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { newsData } = require('../data/seedData');
const { getDBStatus } = require('../config/db');

// GET all news/notices (supports ?type=featured|notice)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    if (getDBStatus().connected) {
      const filter = {};
      if (type) filter.type = type;

      const items = await News.find(filter).sort({ date: -1 });
      if (items.length > 0) return res.json({ success: true, count: items.length, data: items });
    }

    let fallback = [...newsData];
    if (type) {
      fallback = fallback.filter(n => n.type === type);
    }
    res.json({ success: true, count: fallback.length, data: fallback, source: 'fallback' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
