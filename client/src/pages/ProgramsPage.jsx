import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`/api/programs${activeFilter !== 'all' ? `?category=${activeFilter}` : ''}`);
        const data = await res.json();
        if (data.success) {
          setPrograms(data.data);
        }
      } catch (err) {
        console.error('Failed to load programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [activeFilter]);

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'food-nutrition', label: 'Food & Nutrition' },
    { id: 'agriculture', label: 'Seed Conservation' },
    { id: 'environment', label: 'Environment Awareness' },
    { id: 'culture', label: 'Cultural Heritage' }
  ];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Our Core Programs</h1>
          <p>
            Grassroots initiatives driving sustainable change, food security, and cultural preservation across
            Uttarakhand.
          </p>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Programs</span>
        </div>
      </div>

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2>Four Pillars of Our Work</h2>
            <div className="section-line"></div>
            <p>Combining ecological science with traditional Himalayan practices</p>
          </div>

          {/* Category Filter Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                style={{
                  padding: '8px 18px',
                  borderRadius: '24px',
                  border: '1px solid var(--color-border)',
                  background: activeFilter === cat.id ? 'var(--color-primary)' : 'white',
                  color: activeFilter === cat.id ? 'white' : 'var(--color-text)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detailed Narrative Program Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {programs.map((program, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={program.title}
                  style={{
                    background: 'white',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    boxShadow: 'var(--shadow-sm)',
                    flexDirection: isEven ? 'row-reverse' : 'row'
                  }}
                >
                  <div style={{ flex: '1 1 400px', minHeight: '280px', maxHeight: '380px', position: 'relative' }}>
                    <img
                      src={program.image}
                      alt={program.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/LOGO.jpeg';
                      }}
                    />
                  </div>
                  <div
                    style={{
                      flex: '1 1 450px',
                      padding: '40px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    {program.hindiTitle && (
                      <span className="program-tag" style={{ marginBottom: '8px', display: 'inline-block' }}>
                        {program.hindiTitle}
                      </span>
                    )}
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '12px' }}>
                      {program.title}
                    </h3>
                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.7', marginBottom: '16px' }}>
                      {program.description}
                    </p>

                    {program.highlights && program.highlights.length > 0 && (
                      <ul style={{ paddingLeft: '20px', color: 'var(--color-text)', fontSize: '0.92rem', marginBottom: '20px' }}>
                        {program.highlights.map((h, i) => (
                          <li key={i} style={{ marginBottom: '6px' }}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div>
                      <Link to="/gallery" className="btn btn-secondary btn-sm" style={{ display: 'inline-block' }}>
                        View Field Activities &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramsPage;
