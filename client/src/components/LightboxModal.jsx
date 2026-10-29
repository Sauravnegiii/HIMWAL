import React, { useEffect } from 'react';
import { getAssetUrl } from '../utils/assets';

const LightboxModal = ({ isOpen, currentIndex, total, imageSrc, onPrev, onNext, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div
      id="lightbox"
      className="lightbox"
      style={{ display: 'flex' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <span className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
        &times;
      </span>
      <button className="lightbox-prev" onClick={onPrev} aria-label="Previous image">
        &#10094;
      </button>
      <div style={{ textAlign: 'center', maxWidth: '90%', maxHeight: '90%' }}>
        <img
          id="lightbox-image"
          src={getAssetUrl(imageSrc)}
          alt={`Photo view ${currentIndex}`}
          style={{ maxWidth: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: '8px' }}
        />
        {total > 1 && (
          <div style={{ color: 'white', marginTop: '12px', fontSize: '0.95rem', fontWeight: 600 }}>
            Image {currentIndex} of {total}
          </div>
        )}
      </div>
      <button className="lightbox-next" onClick={onNext} aria-label="Next image">
        &#10095;
      </button>
    </div>
  );
};

export default LightboxModal;
