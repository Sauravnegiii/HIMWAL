import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImpactCounter from '../components/ImpactCounter';

const HomePage = () => {
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      setFeedback({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    setSubmitting(true);
    setFeedback({ type: '', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactData, type: 'contact' })
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          text: `Thank you, ${contactData.name}! Your message has been received. We will get back to you soon.`
        });
        setContactData({ name: '', email: '', message: '' });
      } else {
        setFeedback({ type: 'error', text: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', text: 'Network error. Please try reaching us directly on WhatsApp or Email.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Empowering Himalayan Women &amp; Preserving Heritage</h1>
          <p>
            An Uttarakhand-based NGO dedicated to environmental conservation, sustainable livelihoods, and the
            preservation of our unique cultural tapestry.
          </p>
          <div className="hero-buttons">
            <Link to="/programs" className="btn btn-primary btn-lg">
              Explore Our Work
            </Link>
            <a href="#contact" className="btn btn-outline btn-lg">
              Get Involved
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section section-light" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2>Himalayan Women Awareness and Livelihood Society</h2>
            <div className="section-line"></div>
          </div>

          <div className="about-grid" style={{ alignItems: 'center' }}>
            <div
              className="about-image-wrapper"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                height: '100%',
                minHeight: '400px',
                background: '#e1e5e9'
              }}
            >
              <img
                src="/Images/millet/028.webp"
                alt="HIMWAL Society Members"
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }}
                onError={(e) => {
                  e.target.src = '/LOGO.jpeg';
                }}
              />
            </div>

            <div className="about-content">
              <p className="lead">
                Founded under the Societies Registration Act 21, 1860, HIMWAL Society is committed to building resilient
                ecosystems and communities in Uttarakhand.
              </p>
              <p>
                We work across rural areas and urban centers in the region, operating locally to implement programs that
                bridge traditional ecological wisdom with modern conservation efforts. From biodiversity assessment to
                empowering rural women with livelihood opportunities, our approach is holistic and community-driven.
              </p>
              <div className="program-tag" style={{ marginTop: '10px' }}>
                Reg. No: UK06008122023012444
              </div>

              <div className="about-cards" style={{ marginTop: '24px' }}>
                <div className="info-card" style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Our Mission</h3>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    Committed to conserving the environment and safeguarding the unique cultural heritage of Uttarakhand
                    through sustainable action and community engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Goals / Initiatives Section */}
      <section id="initiatives" className="section initiatives-section">
        <div className="container">
          <div className="initiatives-header">
            <h2>Our Core Goals</h2>
            <div className="initiatives-divider"></div>
            <p>Targeted grassroots action for a resilient Himalayan future.</p>
          </div>

          <div className="goals-grid">
            <Link to="/programs" className="goal-card">
              <div className="goal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 12s3-3 6-3 6 3 6 3c0 4-6 8-6 8s-6-4-6-8z"></path>
                  <path d="M12 9v6"></path>
                  <path d="M9 12h6"></path>
                </svg>
              </div>
              <h3>Health &amp; Nutrition</h3>
            </Link>

            <Link to="/programs" className="goal-card">
              <div className="goal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 21s-5-3.5-5-9a5 5 0 0 1 10 0c0 5.5-5 9-5 9z"></path>
                  <path d="M12 12c-1.5-2-2-4-2-4"></path>
                  <path d="M12 12c1.5-2 2-4 2-4"></path>
                </svg>
              </div>
              <h3>Seed Conservation</h3>
            </Link>

            <Link to="/programs" className="goal-card">
              <div className="goal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 16l4-6 3 4 4-6 3 6"></path>
                  <path d="M2 20h20"></path>
                  <path d="M12 6a3 3 0 0 1 3 3"></path>
                </svg>
              </div>
              <h3>Environment Awareness</h3>
            </Link>

            <Link to="/programs" className="goal-card">
              <div className="goal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6"></path>
                  <path d="M8 12s4-4 8 0"></path>
                  <path d="M12 4a4 4 0 0 1 4 4c0 2.5-4 6-4 6s-4-3.5-4-6a4 4 0 0 1 4-4z"></path>
                </svg>
              </div>
              <h3>Cultural Heritage</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section
        id="impact"
        className="section section-dark"
        style={{
          background: 'linear-gradient(rgba(26,95,74,0.92), rgba(19,68,56,0.95)), #164e3f'
        }}
      >
        <div className="container">
          <div className="section-header section-header-light">
            <h2>Our Growing Impact</h2>
            <div className="section-line"></div>
            <p>Driving measurable change in Himalayan communities through dedicated grassroots work.</p>
          </div>

          <div className="impact-grid">
            <ImpactCounter target={500} suffix="+" label="People Engaged" />
            <ImpactCounter target={25} suffix="+" label="Webinars & Events" />
            <ImpactCounter target={4} label="Core Initiatives" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Connect With Us</h2>
            <div className="section-line"></div>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3>Reach Out Today</h3>
              <p>
                Join us as a volunteer, share your suggestions, or partner with us to protect the Himalayan environment
                and culture.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <strong>Headquarters Address</strong>
                  <span>
                    Lane no. 6 (E), THDC Colony,
                    <br />
                    Tea Estate Banjarawala,
                    <br />
                    Dehradun-248121 (Uttarakhand)
                  </span>
                </div>
                <div className="contact-item">
                  <strong>Phone &amp; WhatsApp</strong>
                  <a href="tel:+919068682863">+91-9068682863</a>
                  <a href="tel:+917454097237">+91-7454097237</a>
                </div>
                <div className="contact-item">
                  <strong>Email</strong>
                  <a href="mailto:contact.himwal@gmail.com">contact.himwal@gmail.com</a>
                </div>
              </div>
            </div>

            <form className="contact-form" id="contact-form" onSubmit={handleContactSubmit}>
              {feedback.text && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '16px',
                    background: feedback.type === 'success' ? '#dcfce7' : '#fee2e2',
                    color: feedback.type === 'success' ? '#166534' : '#991b1b',
                    fontSize: '0.95rem'
                  }}
                >
                  {feedback.text}
                </div>
              )}
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Full Name"
                  required
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email Address"
                  required
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="How would you like to get involved or support us?"
                  required
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
