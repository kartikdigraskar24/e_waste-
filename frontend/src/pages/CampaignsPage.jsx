// Campaigns Page — fetches and displays approved awareness campaigns from API
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || '/api';
const API_BASE = import.meta.env.VITE_API_BASE || '';

function CampaignCard({ campaign }) {
  const imageUrl = campaign.imageUrl
    ? `${API_BASE}${campaign.imageUrl}`
    : null;

  const formattedDate = new Date(campaign.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="campaign-card">
      {/* Image or placeholder */}
      {imageUrl ? (
        <img src={imageUrl} alt={campaign.title} className="campaign-card-img" />
      ) : (
        <div className="campaign-card-img-placeholder">📢</div>
      )}
      <div className="campaign-card-body">
        <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{campaign.title}</h3>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          {campaign.description.length > 140
            ? campaign.description.slice(0, 140) + '...'
            : campaign.description}
        </p>
        <div className="campaign-card-meta">
          <span>📅 {formattedDate}</span>
          <span>📍 {campaign.location}</span>
        </div>
      </div>
    </div>
  );
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API}/campaigns`)
      .then((res) => {
        const dataArray = Array.isArray(res.data) ? res.data : res.data.value || [];
        setCampaigns(dataArray);
      })
      .catch(() => setError('Could not load campaigns. Please ensure the backend server is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>Awareness Campaigns</h1>
              <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
                Community-driven campaigns spreading awareness about e-waste management. 
                Join the movement — upload your own campaign!
              </p>
            </div>
            <Link to="/upload" className="btn btn-primary">+ Upload Campaign</Link>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Loading */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading campaigns...</p>
            </div>
          )}

          {/* Error */}
          {error && <div className="alert alert-error">{error}</div>}

          {/* Campaign Grid */}
          {!loading && !error && campaigns.length > 0 && (
            <>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                Showing {campaigns.length} approved campaign{campaigns.length !== 1 ? 's' : ''}
              </p>
              <div className="grid-3">
                {campaigns.map((c) => (
                  <CampaignCard key={c._id} campaign={c} />
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {!loading && !error && campaigns.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📢</div>
              <h3 style={{ marginBottom: '0.75rem' }}>No Campaigns Yet</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Be the first to share your e-waste awareness campaign with the community!
              </p>
              <Link to="/upload" className="btn btn-primary">Upload a Campaign</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
