import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className="header" style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none' }}>
      <div className="container header-inner">
        <Link to="/" className="logo">
          <img src="/LOGO.jpeg" alt="HIMWAL Logo" />
          <div className="logo-text">
            <span className="logo-title">HIMWAL</span>
            <span className="logo-tagline">Himalayan Women Awareness & Livelihood Society</span>
          </div>
        </Link>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} id="main-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
          <NavLink to="/programs" className={({ isActive }) => (isActive ? 'active' : '')}>
            Programs
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active' : '')}>
            Gallery
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
            Products
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? 'active' : '')}>
            Latest
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')} style={{ opacity: 0.85 }}>
            Portal
          </NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/#contact" className="btn btn-primary">
            Donate
          </Link>
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            id="menu-toggle"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
