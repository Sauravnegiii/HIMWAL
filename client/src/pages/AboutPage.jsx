import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeamModal from '../components/TeamModal';

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const [teamRes, advRes] = await Promise.all([
          fetch('/api/team?isAdvisor=false'),
          fetch('/api/team?isAdvisor=true')
        ]);
        const teamData = await teamRes.json();
        const advData = await advRes.json();

        if (teamData.success) setTeamMembers(teamData.data);
        if (advData.success) setAdvisors(advData.data);
      } catch (err) {
        console.error('Failed to load team data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const openMemberModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="hero-badge" style={{ marginBottom: '24px', display: 'inline-block' }}>
            Registered NGO • Uttarakhand
          </span>
          <h1>Protecting Ecology &amp; Livelihoods</h1>
          <p>
            Dedicated to environmental conservation, sustainable livelihoods, and the preservation of Uttarakhand's rich
            heritage.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>About Us</span>
        </div>
      </div>

      {/* Foundation Section */}
      <section className="section section-light">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <p className="lead">
                HIMWAL (Himalayan Women, Awareness and Livelihood) Society is an Uttarakhand-based NGO founded under the
                Societies Registration Act 21, 1860.
              </p>
              <p>
                Our work spans rural areas and urban centers across Uttarakhand. We work locally to implement grassroots
                initiatives, ensuring a broad and diverse impact. By focusing on the intersection of ecology and
                community, we aim to develop comprehensive strategies to address the various environmental challenges
                faced by the sensitive Himalayan ecosystem.
              </p>

              <div className="impact-note" style={{ marginTop: '32px', padding: '24px' }}>
                <div className="impact-note-icon" style={{ width: '48px', height: '48px', minWidth: '48px' }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ width: '24px', height: '24px' }}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="impact-note-text">
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>Registered Organization</h3>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>Registration No: UK06008122023012444</p>
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                height: '100%',
                minHeight: '350px'
              }}
            >
              <img
                src="/Images/millet/023.webp"
                alt="Uttarakhand Himalayan Landscape"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                onError={(e) => {
                  e.target.src = '/LOGO.jpeg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Himalayan Reality */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>The Himalayan Reality</h2>
            <div className="section-line"></div>
            <p>Understanding the ground realities of Uttarakhand drives our mission forward.</p>
          </div>

          <div className="goals-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="info-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                Ecological Fragility
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', lineHeight: '1.7' }}>
                Climate changes, deforestation, and landslides threaten mountain biodiversity and traditional farming
                systems across Uttarakhand valleys.
              </p>
            </div>
            <div className="info-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                Rural Out-Migration
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', lineHeight: '1.7' }}>
                Lack of local livelihoods leads to the abandonment of villages. By empowering women through agro-value
                addition, we revitalize local village economies.
              </p>
            </div>
            <div className="info-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                Living Cultural Traditions
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', lineHeight: '1.7' }}>
                Pahadi folk knowledge, sacred groves, indigenous seed varieties, and traditional performing arts require
                active documentation and safeguarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="section section-light" id="team">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <div className="section-line"></div>
            <p>The dedicated individuals working to preserve Uttarakhand's ecology and heritage.</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              (Click on any team member to view their complete biography)
            </p>
          </div>

          <div className="team-grid" id="team-grid">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="program-card team-card"
                onClick={() => openMemberModal(member)}
                style={{ cursor: 'pointer' }}
                title="Click to view biography"
              >
                <div className="program-image" style={{ height: '280px' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/LOGO.jpeg';
                    }}
                  />
                </div>
                <div className="program-content" style={{ textAlign: 'center', padding: '20px' }}>
                  <h3 style={{ marginBottom: '4px', fontSize: '1.15rem' }}>{member.name}</h3>
                  <p
                    style={{
                      color: 'var(--color-secondary)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      margin: 0
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors and Mentors Section */}
      <section className="section" id="advisors">
        <div className="container">
          <div className="section-header">
            <h2>Advisors and Mentors</h2>
            <div className="section-line"></div>
            <p>
              Our mentors and advisors are the guiding force behind HIMWAL, providing invaluable expertise and
              leadership to help us achieve our mission.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              (Click on any advisor to view their full profile and accolades)
            </p>
          </div>

          <div className="team-grid" id="advisor-grid">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="program-card team-card advisor-card"
                onClick={() => openMemberModal(advisor)}
                style={{ cursor: 'pointer' }}
                title="Click to view profile"
              >
                <div className="program-image" style={{ height: '280px' }}>
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/LOGO.jpeg';
                    }}
                  />
                </div>
                <div className="program-content" style={{ textAlign: 'center', padding: '20px' }}>
                  <h3 style={{ marginBottom: '4px', fontSize: '1.15rem' }}>{advisor.name}</h3>
                  <p
                    style={{
                      color: 'var(--color-secondary)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      margin: 0
                    }}
                  >
                    {advisor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Pop-up Modal */}
      <TeamModal member={selectedMember} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AboutPage;
