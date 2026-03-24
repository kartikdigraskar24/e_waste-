// Admin Dashboard Page — protected page for managing campaigns and locations
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth headers from localStorage
const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
});

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem('adminEmail');

  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New location form state
  const [locForm, setLocForm] = useState({
    plantName: '',
    address: '',
    contactNumber: '',
    mapsLink: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch all campaigns and locations on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campRes, locRes] = await Promise.all([
          axios.get(`${API}/campaigns/all`, authHeaders()),
          axios.get(`${API}/locations`),
        ]);
        setCampaigns(campRes.data);
        setLocations(locRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/admin/login');
        } else {
          setError('Failed to load data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Approve a campaign
  const approveCampaign = async (id) => {
    try {
      await axios.patch(`${API}/campaigns/${id}/approve`, {}, authHeaders());
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: 'approved' } : c))
      );
      showSuccess('Campaign approved successfully!');
    } catch {
      setError('Failed to approve campaign.');
    }
  };

  // Delete a campaign
  const deleteCampaign = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await axios.delete(`${API}/campaigns/${id}`, authHeaders());
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
      showSuccess('Campaign deleted.');
    } catch {
      setError('Failed to delete campaign.');
    }
  };

  // Add a new location
  const addLocation = async (e) => {
    e.preventDefault();
    if (!locForm.plantName || !locForm.address || !locForm.contactNumber) {
      setError('Plant name, address, and contact are required');
      return;
    }
    try {
      const res = await axios.post(`${API}/locations`, locForm, authHeaders());
      setLocations((prev) => [res.data.location, ...prev]);
      setLocForm({ plantName: '', address: '', contactNumber: '', mapsLink: '' });
      showSuccess('Location added successfully!');
    } catch {
      setError('Failed to add location.');
    }
  };

  // Delete a location
  const deleteLocation = async (id) => {
    if (!window.confirm('Delete this location?')) return;
    try {
      await axios.delete(`${API}/locations/${id}`, authHeaders());
      setLocations((prev) => prev.filter((l) => l._id !== id));
      showSuccess('Location deleted.');
    } catch {
      setError('Failed to delete location.');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const statusBadge = (status) => {
    const map = {
      approved: 'badge-green',
      pending: 'badge-yellow',
      rejected: 'badge-red',
    };
    return <span className={`badge ${map[status]}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <div className="container">
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Admin Dashboard</h1>
            <p style={{ fontSize: '0.9rem' }}>Logged in as <strong style={{ color: 'var(--green-400)' }}>{adminEmail}</strong></p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={logout}>
            🚪 Logout
          </button>
        </div>

        {/* Alerts */}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Summary Cards */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          {[
            { label: 'Total Campaigns', value: campaigns.length, icon: '📢' },
            { label: 'Pending Review', value: campaigns.filter((c) => c.status === 'pending').length, icon: '⏳' },
            { label: 'Approved', value: campaigns.filter((c) => c.status === 'approved').length, icon: '✅' },
            { label: 'Disposal Plants', value: locations.length, icon: '📍' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <span className="stat-number" style={{ fontSize: '2rem' }}>{s.value}</span>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button className={`tab-btn ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>
            📢 All Campaigns ({campaigns.length})
          </button>
          <button className={`tab-btn ${activeTab === 'locations' ? 'active' : ''}`} onClick={() => setActiveTab('locations')}>
            📍 Disposal Locations ({locations.length})
          </button>
          <button className={`tab-btn ${activeTab === 'add-location' ? 'active' : ''}`} onClick={() => setActiveTab('add-location')}>
            ➕ Add Location
          </button>
        </div>

        {/* ─── Tab: Campaigns ─────────────────────────────────────── */}
        {activeTab === 'campaigns' && (
          <div>
            {campaigns.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <p>No campaigns yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {campaigns.map((c) => (
                  <div key={c._id} className="card card-body" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                        <h3 style={{ fontSize: '1rem' }}>{c.title}</h3>
                        {statusBadge(c.status)}
                      </div>
                      <p style={{ fontSize: '0.875rem', marginBottom: '0.4rem' }}>
                        {c.description.length > 120 ? c.description.slice(0, 120) + '...' : c.description}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span>📍 {c.location}</span>
                        <span>📅 {new Date(c.date).toLocaleDateString('en-IN')}</span>
                        {c.imageUrl && <span>🖼️ Has image</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {c.status !== 'approved' && (
                        <button className="btn btn-success btn-sm" onClick={() => approveCampaign(c._id)}>
                          ✓ Approve
                        </button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => deleteCampaign(c._id)}>
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Tab: Locations ─────────────────────────────────────── */}
        {activeTab === 'locations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {locations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <p>No locations yet. Add one using the &ldquo;Add Location&rdquo; tab.</p>
              </div>
            ) : (
              locations.map((loc) => (
                <div key={loc._id} className="card card-body" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--green-400)', marginBottom: '0.3rem' }}>{loc.plantName}</h3>
                    <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>📍 {loc.address}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>📞 {loc.contactNumber}</p>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteLocation(loc._id)}>
                    🗑 Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ─── Tab: Add Location ──────────────────────────────────── */}
        {activeTab === 'add-location' && (
          <div style={{ maxWidth: '600px' }}>
            <div className="card card-body">
              <h3 style={{ marginBottom: '1.25rem', color: 'var(--green-400)' }}>
                ➕ Add New Disposal Location
              </h3>
              <form onSubmit={addLocation}>
                <div className="form-group">
                  <label className="form-label">Plant Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. GreenTech E-Waste Recyclers"
                    value={locForm.plantName}
                    onChange={(e) => setLocForm({ ...locForm, plantName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Address *</label>
                  <textarea
                    className="form-control"
                    placeholder="Full address with city and pin code"
                    value={locForm.address}
                    onChange={(e) => setLocForm({ ...locForm, address: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={locForm.contactNumber}
                    onChange={(e) => setLocForm({ ...locForm, contactNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Google Maps Link (optional)</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://maps.google.com/..."
                    value={locForm.mapsLink}
                    onChange={(e) => setLocForm({ ...locForm, mapsLink: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  ➕ Add Location
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
