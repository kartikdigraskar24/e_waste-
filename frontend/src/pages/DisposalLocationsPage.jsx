// Disposal Locations Page — fetches location data from the backend API
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || '/api';

export default function DisposalLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API}/locations`)
      .then((res) => {
        const dataArray = Array.isArray(res.data) ? res.data : res.data.value || [];
        setLocations(dataArray);
      })
      .catch(() => setError('Could not load locations. Please ensure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>E-Waste Disposal Locations</h1>
              <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
                Find certified e-waste recycling plants near you. Drop off your old electronics safely 
                and responsibly at any of these authorized facilities.
              </p>
            </div>
            <Link to="/upload-location" className="btn btn-primary">+ Add Location</Link>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Info Bar */}
          <div className="card card-body" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '1.75rem' }}>ℹ️</span>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                What to Bring
              </p>
              <p style={{ fontSize: '0.9rem' }}>
                You can bring phones, laptops, tablets, chargers, batteries, printers, monitors, 
                keyboards, cables, and other personal electronics. Call ahead to confirm accepted items. 
                Data destruction services may be available on request.
              </p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading disposal locations...</p>
            </div>
          )}

          {/* Error */}
          {error && <div className="alert alert-error">{error}</div>}

          {/* Location Cards Grid */}
          {!loading && !error && (
            <div className="grid-3">
              {locations.map((loc) => (
                <div key={loc._id} className="location-card">
                  <div className="location-icon">📍</div>
                  <h3>{loc.plantName}</h3>

                  <div className="location-detail">
                    <span>🏠</span>
                    <span>{loc.address}</span>
                  </div>
                  <div className="location-detail">
                    <span>📞</span>
                    <a href={`tel:${loc.contactNumber.replace(/\s/g, '')}`}>
                      {loc.contactNumber}
                    </a>
                  </div>

                  {loc.mapsLink && (
                    <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                      <a
                        href={loc.mapsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-sm"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        🗺️ Open in Google Maps
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && !error && locations.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</p>
              <p>No disposal locations found. Please check back later.</p>
            </div>
          )}

          {/* Bottom note */}
          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: 'rgba(34,197,94,0.06)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-md)',
          }}>
            <p style={{ fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--green-400)' }}>Note:</strong> These are certified CPCB-authorized 
              e-waste recycling facilities. Always carry a valid ID and ask for a receipt/certificate of disposal 
              for corporate IT assets. For bulk collection (office cleanup), contact us to arrange pickup.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
