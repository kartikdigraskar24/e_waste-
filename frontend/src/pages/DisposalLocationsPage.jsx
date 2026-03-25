// Disposal Locations Page — hardcoded Pune e-waste disposal locations
import { Link } from 'react-router-dom';

const LOCATIONS = [
  {
    _id: '1',
    plantName: 'Eco Recycling Ltd.',
    address: 'Gat No. 478, Talawade, Pimpri-Chinchwad, Pune - 412114',
    contactNumber: '+91 20 2764 0700',
    mapsLink: 'https://maps.google.com/?q=Eco+Recycling+Ltd+Talawade+Pune',
  },
  {
    _id: '2',
    plantName: 'Attero Recycling Pvt. Ltd.',
    address: 'Survey No. 201, Uruli Devachi, Phursungi, Pune - 412308',
    contactNumber: '+91 80 9090 0200',
    mapsLink: 'https://maps.google.com/?q=Attero+Recycling+Uruli+Devachi+Pune',
  },
  {
    _id: '3',
    plantName: 'E-Parisaraa — Pune Collection Point',
    address: 'Kasarwadi, Pimpri-Chinchwad, Pune - 411034',
    contactNumber: '+91 80 2397 8999',
    mapsLink: 'https://maps.google.com/?q=Kasarwadi+Pimpri+Chinchwad+Pune',
  },
  {
    _id: '4',
    plantName: 'GreenTech Recyclers',
    address: 'Plot No. 12, MIDC Bhosari Industrial Area, Pune - 411026',
    contactNumber: '+91 98220 34567',
    mapsLink: 'https://maps.google.com/?q=MIDC+Bhosari+Pune',
  },
  {
    _id: '5',
    plantName: 'Pune Municipal Corporation — E-Waste Drop Point',
    address: 'PMC Head Office, Shivajinagar, Pune - 411005',
    contactNumber: '+91 20 2512 5000',
    mapsLink: 'https://maps.google.com/?q=PMC+Shivajinagar+Pune',
  },
  {
    _id: '6',
    plantName: 'Starlite Recycling Center',
    address: 'Hadapsar Industrial Estate, Hadapsar, Pune - 411013',
    contactNumber: '+91 98505 67890',
    mapsLink: 'https://maps.google.com/?q=Hadapsar+Industrial+Estate+Pune',
  },
  {
    _id: '7',
    plantName: 'ReGain E-Waste Solutions',
    address: 'Baner Road, Near Sus Road Junction, Pune - 411045',
    contactNumber: '+91 94220 11234',
    mapsLink: 'https://maps.google.com/?q=Baner+Road+Sus+Road+Pune',
  },
  {
    _id: '8',
    plantName: 'Karo Sambhav — Authorized Collection Point',
    address: 'FC Road, Deccan Gymkhana, Pune - 411004',
    contactNumber: '+91 11 4084 8484',
    mapsLink: 'https://maps.google.com/?q=FC+Road+Deccan+Gymkhana+Pune',
  },
  {
    _id: '9',
    plantName: 'CPCB Authorized Facility — Navi Peth',
    address: 'Navi Peth, Near Pune Railway Station, Pune - 411030',
    contactNumber: '+91 20 2445 1212',
    mapsLink: 'https://maps.google.com/?q=Navi+Peth+Pune+Railway+Station',
  },
];

export default function DisposalLocationsPage() {
  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>E-Waste Disposal Locations</h1>
              <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
                Find certified e-waste recycling plants near you in Pune. Drop off your old electronics safely 
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

          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Showing {LOCATIONS.length} certified disposal locations in Pune
          </p>

          {/* Location Cards Grid */}
          <div className="grid-3">
            {LOCATIONS.map((loc) => (
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
              e-waste recycling facilities in Pune. Always carry a valid ID and ask for a receipt/certificate of 
              disposal for corporate IT assets. For bulk collection, contact us to arrange pickup.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
