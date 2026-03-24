// Home Page — Hero, global e-waste stats, preview sections, CTAs
import { Link } from 'react-router-dom';

const stats = [
  { number: '53.6M', label: 'Metric tons of e-waste generated globally per year' },
  { number: '17.4%', label: 'Of e-waste is formally collected and recycled' },
  { number: '3.2M', label: 'Metric tons of e-waste generated in India annually' },
  { number: '50+', label: 'Toxic elements found in electronic devices' },
];

const highlights = [
  {
    icon: '🌱',
    title: 'Eco-Friendly Recycling',
    desc: 'Learn how proper e-waste recycling reduces toxic chemicals leaching into soil and groundwater.',
  },
  {
    icon: '🏭',
    title: 'Certified Disposal Plants',
    desc: 'Locate certified e-waste disposal facilities near you to drop off old electronics safely.',
  },
  {
    icon: '📢',
    title: 'Awareness Campaigns',
    desc: 'Join and share e-waste awareness campaigns in your college, community, or workplace.',
  },
  {
    icon: '♻️',
    title: 'Material Recovery',
    desc: 'Recovered materials from e-waste include gold, copper, silver, and rare-earth elements.',
  },
];

export default function HomePage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-eyebrow">
            <span>♻️</span> Smart E-Waste Management System
          </div>
          <h1>
            Manage E-Waste.<br />
            <span>Protect Our Planet.</span>
          </h1>
          <p className="hero-desc">
            Electronic waste is the fastest-growing waste stream on Earth. Join our mission to educate,
            reduce, and responsibly recycle e-waste — one device at a time.
          </p>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-primary">Learn About E-Waste →</Link>
            <Link to="/locations" className="btn btn-outline">Find Disposal Locations</Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--dark-800)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container">
          <div className="section-header">
            <h2>The Global E-Waste Crisis</h2>
            <p>The numbers reveal the urgency of responsible electronic waste management</p>
          </div>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-number">{s.number}</span>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What We Do ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What EcoSmart Does</h2>
            <p>A one-stop platform for e-waste education, action, and community engagement</p>
          </div>
          <div className="grid-2" style={{ gap: '1.5rem' }}>
            {highlights.map((h, i) => (
              <div className="card card-body" key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{h.icon}</div>
                <div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--green-400)' }}>{h.title}</h3>
                  <p style={{ fontSize: '0.95rem' }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call to Action ───────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--dark-800)', borderTop: '1px solid var(--card-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Ready to Make a Difference?</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Upload your e-waste awareness campaign or explore disposal locations near you today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/upload" className="btn btn-primary">📢 Upload a Campaign</Link>
            <Link to="/campaigns" className="btn btn-outline">Browse Campaigns</Link>
            <Link to="/recycling" className="btn btn-outline">Recycling Process</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
