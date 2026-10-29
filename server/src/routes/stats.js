const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Program = require('../models/Program');
const TeamMember = require('../models/TeamMember');
const ContactMessage = require('../models/ContactMessage');
const { getDBStatus } = require('../config/db');

// GET aggregate stats
router.get('/', async (req, res) => {
  try {
    const dbStatus = getDBStatus();

    let productCount = 6;
    let programCount = 4;
    let teamCount = 11;
    let inquiryCount = 0;

    if (dbStatus.connected) {
      const [prod, prog, team, inq] = await Promise.all([
        Product.countDocuments(),
        Program.countDocuments(),
        TeamMember.countDocuments(),
        ContactMessage.countDocuments()
      ]);
      productCount = prod;
      programCount = prog;
      teamCount = team;
      inquiryCount = inq;
    }

    res.json({
      success: true,
      data: {
        impact: {
          peopleEngaged: 500,
          events: 25,
          coreInitiatives: 4
        },
        counts: {
          products: productCount,
          programs: programCount,
          teamMembers: teamCount,
          inquiries: inquiryCount
        },
        database: {
          connected: dbStatus.connected
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
