// Footer component with links and copyright
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand section */}
          <div className="footer-brand">
            <h3>♻️ EcoSmart</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Educating communities about responsible e-waste disposal for a cleaner, healthier planet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-heading">Quick Links</p>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About E-Waste</Link></li>
              <li><Link to="/about">Types of E-Waste</Link></li>
              <li><Link to="/about">Environmental Impact</Link></li>
              <li><Link to="/about">Recycling Process</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="footer-heading">Resources</p>
            <ul className="footer-links">
              <li><Link to="/locations">Disposal Locations</Link></li>
              <li><Link to="/campaigns">Campaigns</Link></li>
              <li><Link to="/upload">Upload Campaign</Link></li>
              <li><Link to="/admin/login">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-heading">Contact</p>
            <ul className="footer-links">
              <li><a href="mailto:info@ecosmart.in">info@ecosmart.in</a></li>
              <li><a href="tel:+911800123456">1800-123-456 (Toll Free)</a></li>
              <li>
                <a href="https://www.mpcb.gov.in/" target="_blank" rel="noreferrer">
                  MPCB Guidelines ↗
                </a>
              </li>
              <li>
                <a href="https://cpcb.nic.in/" target="_blank" rel="noreferrer">
                  CPCB Resources ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} EcoSmart E-Waste Management System. Built for CEP Project.</p>
        </div>
      </div>
    </footer>
  );
}
