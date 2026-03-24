// Upload Campaign Page — form for users to submit new awareness campaigns
import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function UploadCampaignPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Handle text input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image file selection and generate preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5 MB');
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError('');
  };

  // Form validation
  const validate = () => {
    if (!form.title.trim()) return 'Campaign title is required';
    if (form.title.trim().length < 5) return 'Title must be at least 5 characters';
    if (!form.description.trim()) return 'Description is required';
    if (form.description.trim().length < 20) return 'Description must be at least 20 characters';
    if (!form.location.trim()) return 'Location is required';
    return null;
  };

  // Submit the form with multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title.trim());
    formData.append('description', form.description.trim());
    formData.append('location', form.location.trim());
    if (image) formData.append('image', image);

    setLoading(true);
    try {
      await axios.post(`${API}/campaigns`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('🎉 Campaign submitted successfully! It will appear once an admin approves it.');
      setForm({ title: '', description: '', location: '' });
      setImage(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>Upload a Campaign</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
            Share your e-waste awareness campaign with the community. Submitted campaigns are reviewed 
            by our team before being published.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '700px' }}>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <div className="card card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Campaign Title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">Campaign Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="e.g. E-Waste Collection Drive at City College"
                  value={form.title}
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={120}
                />
              </div>

              {/* Location */}
              <div className="form-group">
                <label htmlFor="location" className="form-label">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  placeholder="e.g. Marine Drive, Mumbai"
                  value={form.location}
                  onChange={handleChange}
                  required
                  maxLength={100}
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Describe the campaign, its goals, activities, and impact..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  minLength={20}
                  rows={5}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  {form.description.length}/500 characters
                </p>
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label htmlFor="image" className="form-label">Campaign Image (optional)</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                  style={{ cursor: 'pointer' }}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  Accepted: JPG, PNG, GIF, WebP — Max 5 MB
                </p>
              </div>

              {/* Image Preview */}
              {preview && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <p className="form-label">Image Preview</p>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxHeight: '280px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--card-border)',
                    }}
                  />
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {loading ? '⏳ Submitting...' : '📢 Submit Campaign'}
              </button>
            </form>
          </div>

          {/* Guidelines */}
          <div className="card card-body" style={{ marginTop: '1.5rem' }}>
            <h3 style={{ color: 'var(--green-400)', marginBottom: '1rem', fontSize: '1rem' }}>
              📋 Submission Guidelines
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem' }}>
              {[
                'Campaign must be related to e-waste awareness or recycling',
                'Images should be clear, appropriate, and relevant to the campaign',
                'Description should accurately describe the campaign and its goals',
                'Campaigns with misleading information will be rejected',
                'Allow 24–48 hours for admin review and approval',
              ].map((g, i) => (
                <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
