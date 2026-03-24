// Main App Component — sets up React Router with all page routes
// Note: Types, Environmental Impact, and Recycling Process are now tabs within the AboutPage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DisposalLocationsPage from './pages/DisposalLocationsPage';
import CampaignsPage from './pages/CampaignsPage';
import UploadCampaignPage from './pages/UploadCampaignPage';
import UploadLocationPage from './pages/UploadLocationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/locations" element={<DisposalLocationsPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/upload" element={<UploadCampaignPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/upload-location" element={<UploadLocationPage />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-height)' }}>
              <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</p>
              <h2 style={{ marginBottom: '0.75rem' }}>Page Not Found</h2>
              <p style={{ marginBottom: '1.5rem' }}>The page you are looking for does not exist.</p>
              <a href="/" className="btn btn-primary">← Back to Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
