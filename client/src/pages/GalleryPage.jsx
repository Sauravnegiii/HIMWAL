import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import { apiFetch } from '../utils/api';
import { galleryAlbumsData as fallbackAlbums } from '../data/seedData';

const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await apiFetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setAlbums(data.data);
            return;
          }
        }
        throw new Error('API unavailable');
      } catch (err) {
        // Fallback to static seed data
        setAlbums(fallbackAlbums);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Our Current Activities</h1>
          <p>Grassroots initiatives driving sustainable change in the Himalayas</p>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Current Activities</span>
        </div>
      </div>

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2>Program Highlights</h2>
            <div className="section-line"></div>
            <h4>Click on the Pictures to Discover More</h4>
          </div>

          <div className="programs-grid" id="activities-container">
            {albums.map((album) => (
              <Link
                key={album.albumId}
                to={`/gallery/${album.albumId}`}
                className="program-card"
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <div className="program-image" style={{ height: '240px', overflow: 'hidden' }}>
                  <img
                    src={getAssetUrl(album.coverImage)}
                    alt={album.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = getAssetUrl('/LOGO.jpeg');
                    }}
                  />
                </div>
                <div className="program-content" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{album.title}</h3>
                  {album.description && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', margin: 0 }}>
                      {album.total} Photographs &bull; View Album &rarr;
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
