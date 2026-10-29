const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  type: { type: String, enum: ['contact', 'order_inquiry'], default: 'contact' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  product: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'reviewed', 'resolved'], default: 'new' }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
