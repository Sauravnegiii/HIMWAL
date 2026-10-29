const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { getDBStatus } = require('../config/db');

// In-memory fallback for contact messages when DB is offline
const inMemoryMessages = [];

// POST submit contact message or product enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, product, message, type } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    const messageData = {
      type: type || (product ? 'order_inquiry' : 'contact'),
      name,
      email,
      phone: phone || '',
      address: address || '',
      product: product || '',
      message,
      createdAt: new Date()
    };

    if (getDBStatus().connected) {
      const saved = await ContactMessage.create(messageData);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received by HIMWAL Society.',
        data: saved
      });
    }

    inMemoryMessages.unshift({ ...messageData, _id: Date.now().toString() });
    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received by HIMWAL Society.',
      data: messageData,
      source: 'memory'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const authMiddleware = require('../middleware/auth');

// GET all messages (for admin dashboard, protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (getDBStatus().connected) {
      const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }
    res.json({ success: true, count: inMemoryMessages.length, data: inMemoryMessages, source: 'memory' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
