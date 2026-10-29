const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  pdfLink: { type: String },
  type: { type: String, enum: ['featured', 'notice', 'report'], default: 'featured' },
  date: { type: Date, default: Date.now },
  category: { type: String, default: 'General' }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
