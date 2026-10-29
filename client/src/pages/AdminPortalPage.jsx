import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPortalPage = () => {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'addProduct'

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'pickles',
    description: '',
    image: '/Images/products/handcrafted souvenirs.webp',
    priceInfo: 'Handcrafted Pahadi organic product',
    featured: false
  });
  const [productFeedback, setProductFeedback] = useState('');

  const loadData = async () => {
    try {
      const [statsRes, msgRes, healthRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/contact'),
        fetch('/api/health')
      ]);
      const statsData = await statsRes.json();
      const msgData = await msgRes.json();
      const healthData = await healthRes.json();

      if (statsData.success) setStats(statsData.data);
      if (msgData.success) setMessages(msgData.data);
      setHealth(healthData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductFeedback('');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProductFeedback('✅ Product successfully added!');
        setNewProduct({
          name: '',
          category: 'pickles',
          description: '',
          image: '/Images/products/handcrafted souvenirs.webp',
          priceInfo: 'Handcrafted Pahadi organic product',
          featured: false
        });
        loadData();
      } else {
        setProductFeedback(`❌ ${data.message || 'Error creating product'}`);
      }
    } catch (err) {
      setProductFeedback('❌ Network error submitting product');
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="hero-badge">MERN Control Center</span>
          <h1>HIMWAL Portal &amp; Management</h1>
          <p>Real-time server monitoring, inquiry logs, and community database management.</p>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Portal</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Status Metrics Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '36px'
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Server Status
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: health?.status === 'online' ? '#16a34a' : '#d97706', marginTop: '6px' }}>
                {health?.status === 'online' ? '🟢 Online (Port 5000)' : '🟡 Connecting...'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                Express.js &bull; Node.js
              </div>
            </div>

            <div
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                MongoDB Database
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: stats?.database?.connected ? '#16a34a' : '#2563eb', marginTop: '6px' }}>
                {stats?.database?.connected ? '🟢 Connected' : '🔵 Seed Fallback Mode'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                {stats?.database?.connected ? 'Local / Atlas DB Synced' : 'Ready to sync with MongoDB'}
              </div>
            </div>

            <div
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Products &amp; Programs
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '6px' }}>
                {stats?.counts?.products || 6} Products &bull; {stats?.counts?.programs || 4} Programs
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                {stats?.counts?.teamMembers || 11} Team &amp; Advisors
              </div>
            </div>

            <div
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Submitted Inquiries
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-secondary)', marginTop: '6px' }}>
                {messages.length} Inquiries Logged
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                Live contact messages &amp; orders
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`btn ${activeTab === 'inquiries' ? 'btn-primary' : 'btn-outline'}`}
            >
              Inquiries &amp; Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('addProduct')}
              className={`btn ${activeTab === 'addProduct' ? 'btn-primary' : 'btn-outline'}`}
            >
              Add Community Product (API)
            </button>
          </div>

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Recent Contact &amp; Product Inquiries</h3>
                <button onClick={loadData} className="btn btn-outline btn-sm">
                  Refresh
                </button>
              </div>

              {messages.length === 0 ? (
                <div style={{ background: 'white', padding: '40px', textAlign: 'center', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <p style={{ color: 'var(--color-text-light)', margin: 0 }}>
                    No messages received yet. Submit an enquiry from the <Link to="/products">Products page</Link> or the <Link to="/#contact">Home contact form</Link> to test live message logging!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((msg, index) => (
                    <div
                      key={msg._id || index}
                      style={{
                        background: 'white',
                        padding: '20px 24px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem', color: 'var(--color-text)' }}>{msg.name}</strong>
                          <span style={{ marginLeft: '12px', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                            {msg.email} {msg.phone ? `• ${msg.phone}` : ''}
                          </span>
                        </div>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            background: msg.type === 'order_inquiry' ? 'rgba(242, 153, 74, 0.15)' : 'rgba(28, 134, 92, 0.15)',
                            color: msg.type === 'order_inquiry' ? 'var(--color-secondary-dark)' : 'var(--color-primary)'
                          }}
                        >
                          {msg.type === 'order_inquiry' ? `Product Order: ${msg.product || 'General'}` : 'Contact Message'}
                        </span>
                      </div>

                      {msg.address && (
                        <div style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                          <strong>Delivery / City:</strong> {msg.address}
                        </div>
                      )}

                      <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', background: '#f8fafc', padding: '12px', borderRadius: '6px' }}>
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add Product Tab */}
          {activeTab === 'addProduct' && (
            <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', maxWidth: '700px' }}>
              <h3 style={{ marginBottom: '8px' }}>Add New Product via REST API</h3>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '24px' }}>
                Posts directly to <code>/api/products</code>. When MongoDB is running, it inserts into the collection.
              </p>

              {productFeedback && (
                <div style={{ padding: '12px', borderRadius: '6px', marginBottom: '20px', background: productFeedback.startsWith('✅') ? '#dcfce7' : '#fee2e2' }}>
                  {productFeedback}
                </div>
              )}

              <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Wild Forest Honey"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="modal-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="modal-input"
                  >
                    <option value="pickles">Pickles &amp; Chutneys</option>
                    <option value="spices">Traditional Salts &amp; Spices</option>
                    <option value="pulses">High Altitude Pulses</option>
                    <option value="grains">Millet Flours &amp; Grains</option>
                    <option value="wellness">Herbal Dhoop &amp; Sacred Goods</option>
                    <option value="handicrafts">Handicrafts &amp; Art</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Description *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Brief description of the organic harvest and artisan process..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="modal-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Image URL / Path</label>
                  <input
                    type="text"
                    placeholder="/Images/products/handcrafted souvenirs.webp"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="modal-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Price / Pricing Info</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹250 per 500g jar"
                    value={newProduct.priceInfo}
                    onChange={(e) => setNewProduct({ ...newProduct, priceInfo: e.target.value })}
                    className="modal-input"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                  Create Product (POST /api/products)
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminPortalPage;
