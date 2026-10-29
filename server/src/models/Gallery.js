const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  albumId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  folder: { type: String, required: true },
  total: { type: Number, required: true },
  ext: { type: String, default: 'webp' },
  coverImage: { type: String, required: true },
  description: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
