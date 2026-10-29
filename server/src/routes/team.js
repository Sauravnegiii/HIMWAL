const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { teamData } = require('../data/seedData');
const { getDBStatus } = require('../config/db');

// GET all team members (supports ?isAdvisor=true or ?isAdvisor=false)
router.get('/', async (req, res) => {
  try {
    const { isAdvisor } = req.query;
    if (getDBStatus().connected) {
      const filter = {};
      if (isAdvisor !== undefined) filter.isAdvisor = isAdvisor === 'true';

      const members = await TeamMember.find(filter).sort({ order: 1 });
      if (members.length > 0) return res.json({ success: true, count: members.length, data: members });
    }

    let fallback = [...teamData];
    if (isAdvisor !== undefined) {
      fallback = fallback.filter(m => m.isAdvisor === (isAdvisor === 'true'));
    }
    res.json({ success: true, count: fallback.length, data: fallback, source: 'fallback' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
