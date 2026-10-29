import React, { useState, useEffect } from 'react';

const OrderInquiryModal = ({ isOpen, onClose, selectedProduct = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    product: selectedProduct || '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, product: selectedProduct }));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
      setError('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'order_inquiry'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. You can also contact us directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello HIMWAL Team,\n\nI am interested in ordering/inquiring about your products:\n- Name: ${formData.name}\n- Product: ${formData.product || 'General Inquiry'}\n- Phone: ${formData.phone}\n- Address: ${formData.address}\n- Requirements: ${formData.message}`
    );
    window.open(`https://wa.me/919068682863?text=${text}`, '_blank');
  };

  return (
    <div
      id="orderModal"
      className="order-modal-overlay"
      style={{ display: 'flex' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-box">
        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h3>Product Enquiry &amp; Orders</h3>
        <p>Please fill out your details below. Our team will contact you regarding availability and pricing within 48 hours.</p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🌿</div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Enquiry Submitted Successfully!</h4>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '20px' }}>
              Thank you, {formData.name}. Our community coordinator will connect with you shortly.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={openWhatsApp} className="btn whatsapp-btn" style={{ background: '#25D366', color: 'white' }}>
                Chat on WhatsApp Now
              </button>
              <button type="button" onClick={onClose} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {error && (
              <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <div className="modal-form-row">
              <div>
                <label htmlFor="name" className="modal-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="modal-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="modal-label">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="modal-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="modal-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@example.com"
                className="modal-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="address" className="modal-label">Address / City *</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Your City or Delivery Address"
                className="modal-input"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="product" className="modal-label">Category / Product of Interest *</label>
              <select
                id="product"
                name="product"
                required
                className="modal-input"
                value={formData.product}
                onChange={handleChange}
              >
                <option value="" disabled>Select an option...</option>
                <option value="Pickles & Chutney Powders">Pickles & Chutney Powders</option>
                <option value="Pahadi Salt (पिस्यू लूँन)">Pahadi Salt (पिस्यू लूँन)</option>
                <option value="Himalayan Pulses & Rajma">Himalayan Pulses & Rajma</option>
                <option value="Badi, Flours & Ladoos">Badi, Flours & Ladoos</option>
                <option value="Herbal Dhoop & Sacred Goods">Herbal Dhoop & Sacred Goods</option>
                <option value="Handcrafted Souvenirs & Art">Handcrafted Souvenirs & Art</option>
                <option value="Bulk Order / Custom Inquiry">Bulk Order / Custom Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="modal-label">Specific Requirements &amp; Quantity</label>
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Mention items, quantities, or city for delivery..."
                className="modal-input"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block modal-submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderInquiryModal;
