import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import { apiFetch } from '../utils/api';
import { newsData as fallbackNews } from '../data/seedData';

const ArchivePage = () => {
  const [archiveItems, setArchiveItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const res = await apiFetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setArchiveItems(data.data);
            return;
          }
        }
        throw new Error('API unavailable');
      } catch (err) {
        // Fallback to static seed data
        setArchiveItems(fallbackNews);
      } finally {
        setLoading(false);
      }
    };
    fetchArchive();
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <span className="hero-badge">Document Archive</span>
          <h1>Latest &amp; Notice Archive</h1>
          <p>A complete chronological record of past reports, circulars, and announcements.</p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/news">Latest</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Archive</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Past Announcements &amp; Reports</h2>
            <div className="section-line"></div>
          </div>

          <ul className="archive-list" style={{ maxWidth: '850px', margin: '0 auto', listStyle: 'none', padding: 0 }}>
            {archiveItems.map((item) => (
              <li
                key={item.title}
                className="archive-item"
                style={{
                  background: 'white',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px 24px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <span className="archive-meta" style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', display: 'block', marginBottom: '4px' }}>
                    {item.category || 'Official Document'} &bull; {new Date(item.date || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                  </span>
                  <span className="archive-title" style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontWeight: 700 }}>
                    {item.title}
                  </span>
                  <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                    {item.description}
                  </p>
                </div>

                {item.pdfLink && (
                  <a
                    href={getAssetUrl(item.pdfLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="archive-link"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    View Document &rarr;
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ArchivePage;
