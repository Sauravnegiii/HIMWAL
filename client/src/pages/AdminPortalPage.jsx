import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import { apiFetch } from '../utils/api';

const AdminPortalPage = () => {
  // Authentication states
  const [token, setToken] = useState(localStorage.getItem('himwal_admin_token') || '');
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Login form states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard states
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [health, setHealth] = useState(null);
  const [activeTab, setActiveTab] = useState('inquiries');

  // Add product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'pickles',
    description: '',
    image: '/Images/products/handcrafted souvenirs.webp',
    priceInfo: 'Handcrafted Pahadi organic product',
    featured: false
  });
  const [productFeedback, setProductFeedback] = useState('');

  // 1. Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const res = await apiFetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setAdminUser(data.admin);
          loadDashboardData(token);
        } else {
          // Token expired or invalid
          handleLogout();
        }
      } catch (err) {
        handleLogout();
      } finally {
        setAuthLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('himwal_admin_token');
    setToken('');
    setAdminUser(null);
    setMessages([]);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);

    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('himwal_admin_token', data.token);
        setToken(data.token);
        setAdminUser(data.admin);
        setLoginForm({ username: '', password: '' });
        loadDashboardData(data.token);
      } else {
        setLoginError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setLoginError('Unable to connect to authentication server. Please ensure the backend is running.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const loadDashboardData = async (authToken) => {
    try {
      const [statsRes, msgRes, healthRes] = await Promise.all([
        apiFetch('/api/stats'),
        apiFetch('/api/contact', {
          headers: { Authorization: `Bearer ${authToken}` }
        }),
        apiFetch('/api/health')
      ]);

      const statsData = await statsRes.json();
      const msgData = await msgRes.json();
      const healthData = await healthRes.json();

      if (statsData.success) setStats(statsData.data);
      if (msgData.success) setMessages(msgData.data);
      setHealth(healthData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductFeedback('');
    try {
      const res = await apiFetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProductFeedback('✅ Product successfully added to catalog!');
        setNewProduct({
          name: '',
          category: 'pickles',
          description: '',
          image: '/Images/products/handcrafted souvenirs.webp',
          priceInfo: 'Handcrafted Pahadi organic product',
          featured: false
        });
        loadDashboardData(token);
      } else {
        setProductFeedback(`❌ ${data.message || 'Error creating product'}`);
      }
    } catch (err) {
      setProductFeedback('❌ Network error submitting product');
    }
  };

  if (authLoading) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <h3>Verifying Administrator Credentials...</h3>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER LOGIN SCREEN (IF NOT AUTHENTICATED)
  // -------------------------------------------------------------
  if (!adminUser) {
    return (
      <>
        <div className="page-hero">
          <div className="page-hero-overlay"></div>
          <div className="page-hero-content">
            <span className="hero-badge">Staff &amp; Executive Access</span>
            <h1>Administrator Login</h1>
            <p>Authorized access for HIMWAL Society coordination and management.</p>
          </div>
        </div>

        <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '480px' }}>
            <div
              style={{
                background: 'white',
                padding: '40px 36px',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
                borderTop: '5px solid var(--color-primary)'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <img
                  src={getAssetUrl('/LOGO.jpeg')}
                  alt="HIMWAL Logo"
                  style={{ width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto 14px auto', objectFit: 'cover' }}
                />
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-text)' }}>Admin Portal</h3>
                <p style={{ margin: '6px 0 0 0', fontSize: '0.88rem', color: 'var(--color-text-light)' }}>
                  Enter your credentials to manage inquiries and catalog
                </p>
              </div>

              {loginError && (
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    background: '#fee2e2',
                    border: '1px solid #fca5a5',
                    color: '#991b1b',
                    fontSize: '0.9rem'
                  }}
                >
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    className="modal-input"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter administrator password"
                      className="modal-input"
                      style={{ paddingRight: '45px' }}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-light)'
                      }}
                      tabIndex={-1}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ marginTop: '8px', padding: '12px' }}
                  disabled={loginSubmitting}
                >
                  {loginSubmitting ? 'Authenticating...' : 'Sign In to Portal'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.82rem', color: 'var(--color-text-light)' }}>
                Protected system &bull; HIMWAL Society Dehradun
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // -------------------------------------------------------------
  // RENDER AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="hero-badge" style={{ background: '#1c865c', color: 'white' }}>
            Authenticated Session &bull; {adminUser.username}
          </span>
          <h1>HIMWAL Portal &amp; Management</h1>
          <p>Real-time server monitoring, inquiry logs, and community database management.</p>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Admin Portal</span>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm"
            style={{ borderColor: '#ef4444', color: '#ef4444' }}
          >
            Logout ({adminUser.username})
          </button>
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
          <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            >
              Inquiries &amp; Orders ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('addProduct')}
              className={`admin-tab-btn ${activeTab === 'addProduct' ? 'active' : ''}`}
            >
              Add Community Product (API)
            </button>
          </div>

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ margin: 0 }}>Recent Contact &amp; Product Inquiries</h3>
                <button onClick={() => loadDashboardData(token)} className="admin-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
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
                Posts directly to <code>/api/products</code> with your administrator bearer token.
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
