const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hindiTitle: { type: String },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tag: { type: String },
  highlights: [{ type: String }],
  slug: { type: String },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Program', programSchema);
