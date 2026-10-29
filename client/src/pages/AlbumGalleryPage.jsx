import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LightboxModal from '../components/LightboxModal';
import { getAssetUrl } from '../utils/assets';
import { apiFetch } from '../utils/api';
import { galleryAlbumsData as fallbackAlbums, generateAlbumImages } from '../data/seedData';

const AlbumGalleryPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 16;

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await apiFetch(`/api/gallery/${albumId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setAlbum(data.data);
            return;
          }
        }
        throw new Error('API unavailable');
      } catch (err) {
        // Fallback to static seed data
        const fallback = fallbackAlbums.find(a => a.albumId === albumId);
        if (fallback) {
          setAlbum({
            ...fallback,
            images: generateAlbumImages(fallback)
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [albumId]);

  if (loading) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h3>Loading photographs...</h3>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Album Not Found</h2>
        <p>The requested gallery album does not exist.</p>
        <Link to="/gallery" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>
          Back to Gallery
        </Link>
      </div>
    );
  }

  const total = album.total || (album.images ? album.images.length : 0);
  const totalPages = Math.ceil(total / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentImages = album.images ? album.images.slice(start, start + itemsPerPage) : [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev <= 1 ? total : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev >= total ? 1 : prev + 1));
  };

  const rawLightboxImg = album.images && album.images[lightboxIndex - 1]
    ? album.images[lightboxIndex - 1].src
    : `${album.folder}/${String(lightboxIndex).padStart(3, '0')}.${album.ext || 'webp'}`;
  const currentLightboxImg = getAssetUrl(rawLightboxImg);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>{album.title}</h1>
          <p>{album.description || 'Promoting healthy lifestyles and conservation across Uttarakhand'}</p>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/gallery">Gallery</Link>
          <span className="breadcrumb-sep">›</span>
          <span>{album.title}</span>
        </div>
      </div>

      <section className="section gallery-section">
        <div className="container">
          <div className="gallery-top-bar" style={{ marginBottom: '24px' }}>
            <Link to="/gallery" className="btn btn-back">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Gallery
            </Link>
          </div>

          {/* Photo Grid */}
          <div id="gallery" className="photo-grid">
            {currentImages.map((img) => (
              <img
                key={img.index}
                src={getAssetUrl(img.src)}
                alt={img.alt}
                loading="lazy"
                onClick={() => openLightbox(img.index)}
                style={{ cursor: 'pointer' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-controls" style={{ marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &larr; Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        total={total}
        imageSrc={currentLightboxImg}
        onPrev={handlePrev}
        onNext={handleNext}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default AlbumGalleryPage;
