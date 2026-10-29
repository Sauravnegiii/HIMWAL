import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import { apiFetch } from '../utils/api';
import { newsData as fallbackNews } from '../data/seedData';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiFetch('/api/news?type=featured');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setNews(data.data);
            return;
          }
        }
        throw new Error('API unavailable');
      } catch (err) {
        // Fallback to static seed data
        setNews(fallbackNews.filter(n => n.type === 'featured'));
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <span className="hero-badge">Latest Updates</span>
          <h1>Latest &amp; Announcements</h1>
          <p>
            Stay informed about our latest initiatives, awareness campaigns, workshops, community outreach programmes
            and important notices.
          </p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Latest</span>
        </div>
      </div>

      <section id="featured-news" className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2>Featured Latest</h2>
            <div className="section-line"></div>
            <p>Highlights from our recent programmes and community engagements across Uttarakhand.</p>
          </div>

          <div
            className="news-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              maxWidth: '900px',
              margin: '0 auto',
              gap: '30px'
            }}
          >
            {news.map((item) => (
              <article
                key={item.title}
                className="news-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  {item.image && (
                    <figure className="news-card-image-wrapper" style={{ margin: 0, height: '220px', overflow: 'hidden' }}>
                      <img
                        className="news-card-image"
                        src={getAssetUrl(item.image)}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = getAssetUrl('/LOGO.jpeg');
                        }}
                      />
                    </figure>
                  )}
                  <div className="program-content" style={{ padding: '24px 24px 16px 24px' }}>
                    <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>{item.title}</h3>
                    <p style={{ marginBottom: '24px', color: 'var(--color-text-light)', lineHeight: '1.7' }}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {item.pdfLink && (
                  <div style={{ textAlign: 'center', padding: '0 24px 24px 24px' }}>
                    <a
                      href={getAssetUrl(item.pdfLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
                    >
                      View Document &rarr;
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Link to Archive Page */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/archive" className="btn btn-primary btn-lg" style={{ display: 'inline-block' }}>
              View Complete Notice &amp; Report Archive &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
