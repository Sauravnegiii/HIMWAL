const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { productsData } = require('../data/seedData');
const { getDBStatus } = require('../config/db');

// GET all products
router.get('/', async (req, res) => {
  try {
    if (getDBStatus().connected) {
      const { category, featured } = req.query;
      const filter = {};
      if (category && category !== 'all') filter.category = category;
      if (featured === 'true') filter.featured = true;

      const products = await Product.find(filter).sort({ createdAt: -1 });
      if (products.length > 0) return res.json({ success: true, count: products.length, data: products });
    }
    // Fallback to rich seed data
    let fallback = [...productsData];
    if (req.query.category && req.query.category !== 'all') {
      fallback = fallback.filter(p => p.category === req.query.category);
    }
    res.json({ success: true, count: fallback.length, data: fallback, source: 'fallback' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    if (getDBStatus().connected) {
      const product = await Product.findById(req.params.id);
      if (product) return res.json({ success: true, data: product });
    }
    const fallback = productsData.find(p => p.name.toLowerCase().includes(req.params.id.toLowerCase()));
    if (fallback) return res.json({ success: true, data: fallback });
    res.status(404).json({ success: false, message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST new product
router.post('/', async (req, res) => {
  try {
    const { name, category, description, image, items, priceInfo, featured } = req.body;
    if (!name || !category || !description) {
      return res.status(400).json({ success: false, message: 'Name, category, and description are required.' });
    }

    if (getDBStatus().connected) {
      const newProduct = await Product.create({
        name,
        category,
        description,
        image: image || '/Images/products/handcrafted souvenirs.webp',
        items: items || [],
        priceInfo: priceInfo || 'Contact for rates & availability',
        featured: !!featured
      });
      return res.status(201).json({ success: true, data: newProduct });
    }

    res.status(200).json({
      success: true,
      message: 'Product received (Running in fallback mode; connect MongoDB to persist permanently)',
      data: req.body
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
