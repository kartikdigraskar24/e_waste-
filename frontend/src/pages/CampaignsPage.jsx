// Campaigns Page — hardcoded Pune e-waste awareness campaigns
import { Link } from 'react-router-dom';

const CAMPAIGNS = [
  {
    _id: '1',
    title: 'E-Waste Awareness Drive — Aundh',
    description: 'A community-led campaign in Aundh, Pune to educate residents about safe disposal of old electronics. Free e-waste collection camp organized in partnership with PMC.',
    date: '2025-02-15',
    location: 'Aundh, Pune',
  },
  {
    _id: '2',
    title: 'Green Campus Initiative — COEP',
    description: 'COEP Technological University launched a campus-wide e-waste collection drive. Students collected over 200 kg of old gadgets, batteries and cables for certified recycling.',
    date: '2025-03-01',
    location: 'COEP, Shivajinagar, Pune',
  },
  {
    _id: '3',
    title: "Don't Trash It — Recycle It!",
    description: 'A social media and on-ground campaign in Kothrud urging citizens to stop dumping e-waste in landfills. Partnered with local NGO GreenMind to organize drop-off points across the area.',
    date: '2025-01-20',
    location: 'Kothrud, Pune',
  },
  {
    _id: '4',
    title: 'School E-Waste Education Program',
    description: 'Workshop series conducted across 10 schools in Pune to teach students about hazardous materials in electronics and the importance of responsible e-waste disposal.',
    date: '2025-03-10',
    location: 'Various Schools, Pune',
  },
  {
    _id: '5',
    title: 'Corporate E-Waste Amnesty — Hinjewadi IT Park',
    description: 'IT companies in Hinjewadi were encouraged to surrender unused laptops, servers and peripherals. Over 1 tonne of e-waste was collected and sent to certified recyclers.',
    date: '2025-02-28',
    location: 'Hinjewadi, Pune',
  },
  {
    _id: '6',
    title: 'Battery Recycling Awareness — Hadapsar',
    description: 'Targeted campaign focused on lithium battery disposal dangers. Set up collection bins at 15 locations across Hadapsar and Magarpatta for safe battery drop-off.',
    date: '2025-03-18',
    location: 'Hadapsar, Pune',
  },
];

function CampaignCard({ campaign }) {
  const formattedDate = new Date(campaign.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="campaign-card">
      <div className="campaign-card-img-placeholder">📢</div>
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
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Showing {CAMPAIGNS.length} approved campaigns
          </p>
          <div className="grid-3">
            {CAMPAIGNS.map((c) => (
              <CampaignCard key={c._id} campaign={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
