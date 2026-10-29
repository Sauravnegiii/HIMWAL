const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const { programsData } = require('../data/seedData');
const { getDBStatus } = require('../config/db');

// GET all programs
router.get('/', async (req, res) => {
  try {
    if (getDBStatus().connected) {
      const { category } = req.query;
      const filter = {};
      if (category && category !== 'all') filter.category = category;

      const programs = await Program.find(filter).sort({ order: 1 });
      if (programs.length > 0) return res.json({ success: true, count: programs.length, data: programs });
    }
    // Fallback to rich seed data
    let fallback = [...programsData];
    if (req.query.category && req.query.category !== 'all') {
      fallback = fallback.filter(p => p.category === req.query.category);
    }
    res.json({ success: true, count: fallback.length, data: fallback, source: 'fallback' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET program by slug or ID
router.get('/:slug', async (req, res) => {
  try {
    if (getDBStatus().connected) {
      const program = await Program.findOne({
        $or: [{ slug: req.params.slug }, { _id: req.params.slug.match(/^[0-9a-fA-F]{24}$/) ? req.params.slug : null }]
      });
      if (program) return res.json({ success: true, data: program });
    }
    const fallback = programsData.find(p => p.slug === req.params.slug);
    if (fallback) return res.json({ success: true, data: fallback });
    res.status(404).json({ success: false, message: 'Program not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
