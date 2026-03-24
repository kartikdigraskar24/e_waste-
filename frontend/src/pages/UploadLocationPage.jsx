// Upload Location Page — public form to submit a new e-waste disposal location
import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function UploadLocationPage() {
  const [form, setForm] = useState({
    plantName: '',
    address: '',
    contactNumber: '',
    mapsLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post(`${API}/locations/public`, form);
      setMessage({ type: 'success', text: 'Thank you! The disposal location has been submitted successfully.' });
      setForm({ plantName: '', address: '', contactNumber: '', mapsLink: '' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <h1>Add a Disposal Location</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
            Know of a certified e-waste recycling plant or collection center? Add it to our directory
            to help others dispose of their electronics responsibly.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="card card-body">
            {message.text && (
              <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Plant / Center Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. GreenTech E-Waste Recyclers"
                  value={form.plantName}
                  onChange={(e) => setForm({ ...form, plantName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Address *</label>
                <textarea
                  className="form-control"
                  placeholder="Include street, city, state, and pin code"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. +91 98765 43210"
                  value={form.contactNumber}
                  onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Google Maps Link (Optional)</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://maps.google.com/..."
                  value={form.mapsLink}
                  onChange={(e) => setForm({ ...form, mapsLink: e.target.value })}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  A maps link helps users navigate to the location easily.
                </p>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                {loading ? 'Submitting...' : 'Submit Location'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
