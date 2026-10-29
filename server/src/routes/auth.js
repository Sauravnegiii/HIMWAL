const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    const expectedUser = (process.env.ADMIN_USERNAME || 'admin').trim();
    const expectedPass = (process.env.ADMIN_PASSWORD || 'himwal@admin2026').trim();

    if (username.trim() !== expectedUser || password.trim() !== expectedPass) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Access is restricted to HIMWAL administrators.'
      });
    }

    const secret = process.env.JWT_SECRET || 'himwal_secure_jwt_secret_2026_uttarakhand';
    const token = jwt.sign(
      { username: expectedUser, role: 'admin' },
      secret,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Authentication successful.',
      token,
      admin: {
        username: expectedUser,
        role: 'admin'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/verify
router.get('/verify', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid.',
    admin: req.admin
  });
});

module.exports = router;
