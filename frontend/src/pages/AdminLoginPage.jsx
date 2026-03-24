// Admin Login Page — authenticates admin using email + password, stores JWT in localStorage
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Both email and password are required');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      // Store JWT token in localStorage for subsequent admin requests
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminEmail', res.data.email);

      navigate('/admin/dashboard');
    } catch (err) {
      if (!err.response) {
        // Network error — backend not reachable
        setError('⚠️ Cannot connect to the server. Make sure the backend is running: open a terminal, cd into the backend folder, and run "npm start". Also ensure MongoDB is running.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      paddingTop: 'var(--nav-height)',
    }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '1.5rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'var(--gradient-brand)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1rem',
            boxShadow: 'var(--shadow-glow)',
          }}>
            🔐
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Admin Login</h1>
          <p style={{ fontSize: '0.9rem' }}>Sign in to access the admin dashboard</p>
        </div>

        {error && <div className="alert alert-error" style={{ fontSize: '0.875rem' }}>{error}</div>}

        <div className="card card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Admin Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="admin@ewaste.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {loading ? '⏳ Signing in...' : '🔐 Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem' }}>
          <a href="/" style={{ color: 'var(--text-muted)' }}>← Back to Home</a>
        </p>

        {/* Default credentials hint */}
        <div style={{
          marginTop: '1rem',
          background: 'rgba(251,191,36,0.06)',
          border: '1px solid rgba(251,191,36,0.2)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.875rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}>
          <strong style={{ color: '#fbbf24' }}>Default credentials (after running seed.js):</strong><br />
          admin@ewaste.com / Admin@123<br />
          <span style={{ fontSize: '0.75rem', marginTop: '0.3rem', display: 'block' }}>
            Backend must be running on port 5000
          </span>
        </div>
      </div>
    </div>
  );
}
