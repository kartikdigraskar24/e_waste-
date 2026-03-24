// Navbar Component — responsive navigation with hamburger menu for mobile
// Types, Impact, Recycling consolidated into About E-Waste
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About E-Waste' },
  { to: '/locations', label: 'Locations' },
  { to: '/campaigns', label: 'Campaigns' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <div className="brand-icon">♻️</div>
            <div>
              <span className="brand-text">EcoSmart</span>
              <span className="brand-sub">E-Waste Management</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar-links">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/upload" className="navbar-cta">
                + Upload Campaign
              </NavLink>
            </li>
          </ul>

          {/* Hamburger button for mobile */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} onClick={closeMenu}>
            {label}
          </NavLink>
        ))}
        <NavLink to="/upload" onClick={closeMenu} style={{ color: 'var(--teal-400)' }}>
          + Upload Campaign
        </NavLink>
        <NavLink to="/admin/login" onClick={closeMenu} style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Admin Login
        </NavLink>
      </div>
    </>
  );
}
