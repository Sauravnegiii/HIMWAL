import React, { useEffect } from 'react';

const TeamModal = ({ member, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
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
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div
      className="profile-modal-overlay"
      style={{ display: 'flex' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="profile-modal-box">
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="profile-modal-header">
          <div className="profile-modal-avatar-wrapper">
            <img
              src={member.image}
              alt={member.name}
              className="profile-modal-img"
              onError={(e) => {
                e.target.src = '/LOGO.jpeg';
              }}
            />
          </div>
          <div className="profile-modal-meta">
            <div className="profile-modal-badges">
              <span className="profile-modal-role">{member.role}</span>
              <span className="profile-modal-tag">
                {member.isAdvisor ? 'Advisor & Mentor' : 'Team Member'}
              </span>
            </div>
            <h3 className="profile-modal-name">{member.name}</h3>
          </div>
        </div>

        <div className="profile-modal-divider"></div>

        <div>
          <h4 className="profile-modal-bio-title">Biography &amp; Background</h4>
          <p className="profile-modal-bio">{member.bio}</p>
        </div>

        <div className="profile-modal-footer">
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
