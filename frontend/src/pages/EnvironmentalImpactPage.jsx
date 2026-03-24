// Environmental Impact Page — soil, water, air, human health sections
const impacts = [
  {
    icon: '🌱',
    title: 'Soil Pollution',
    color: '#22c55e',
    content: `When electronic devices are dumped in landfills, hazardous materials like lead, cadmium, 
    and mercury slowly leach into the soil. This soil contamination kills microorganisms and plant life, 
    disrupts ecosystems, reduces agricultural productivity, and persists for decades. Studies near 
    informal e-waste sites show lead concentrations 400–2,500× higher than safe levels.`,
    facts: ['Lead from 1 TV can contaminate 3,000 liters of water', 'Cadmium persists in soil for 30+ years', 'E-waste sites show 400x higher lead than safe limits'],
  },
  {
    icon: '💧',
    title: 'Water Pollution',
    color: '#3b82f6',
    content: `Heavy metals from e-waste seep through soil into groundwater, contaminating rivers, 
    lakes, and drinking water wells. Mercury builds up in the food chain through a process called 
    biomagnification — fish consume contaminated water, and humans eat the fish. Communities near 
    informal e-waste processing in Guiyu, China showed devastating health consequences from 
    contaminated water supplies.`,
    facts: ['Mercury attacks the nervous system', 'Chromium causes liver and kidney damage', 'Arsenic causes skin lesions and cancer'],
  },
  {
    icon: '💨',
    title: 'Air Pollution',
    color: '#a78bfa',
    content: `Burning scrap electronics — a common practice in informal recycling — releases highly 
    toxic gases and particles: dioxins, furans, polycyclic aromatic hydrocarbons (PAHs), and heavy 
    metal fumes. These pollutants travel long distances and are absorbed into the respiratory system. 
    Even modern electronics manufacturing and refining releases particulate matter and chemical fumes.`,
    facts: ['Burning PVC releases dioxins', 'Metal fumes cause long-term lung damage', 'Particulates travel hundreds of km from burn sites'],
  },
  {
    icon: '🏥',
    title: 'Human Health',
    color: '#f97316',
    content: `Exposure to e-waste toxins causes a cascade of health effects: lead disrupts neurological 
    development in children; mercury causes brain, kidney, and nervous system damage; cadmium damages 
    kidneys and bone density; brominated flame retardants disrupt hormones and thyroid function. 
    Children in e-waste communities show significantly reduced IQ, stunted growth, and respiratory disease.`,
    facts: ['Children near e-waste zones show lower IQ', 'Informal workers have 3× cancer risk', 'Lead impairs brain development irreversibly'],
  },
];

export default function EnvironmentalImpactPage() {
  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>Environmental Impact</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
            Improper e-waste disposal causes irreversible damage to our soil, water, air, and human health.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {impacts.map((item, i) => (
              <div key={i} className="card" style={{ overflow: 'hidden' }}>
                {/* Colored accent bar */}
                <div style={{ height: '4px', background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                    <div>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                          width: '52px', height: '52px',
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}30`,
                          borderRadius: 'var(--radius-md)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.75rem',
                        }}>
                          {item.icon}
                        </div>
                        <h2 style={{ fontSize: '1.5rem' }}>{item.title}</h2>
                      </div>
                      <p>{item.content}</p>
                    </div>

                    {/* Key Facts Box */}
                    <div style={{
                      minWidth: '220px',
                      background: `${item.color}08`,
                      border: `1px solid ${item.color}25`,
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                    }}>
                      <p style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: item.color, marginBottom: '0.75rem' }}>
                        Key Facts
                      </p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {item.facts.map((f, j) => (
                          <li key={j} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            <span style={{ color: item.color, flexShrink: 0 }}>▸</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Call to Action */}
          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(20,184,166,0.06))',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
          }}>
            <h2 style={{ marginBottom: '1rem' }}>Together We Can Make a Change</h2>
            <p style={{ maxWidth: '550px', margin: '0 auto 1.5rem' }}>
              The solution starts with awareness and responsible action. Recycle your electronics 
              at certified facilities and encourage others to do the same.
            </p>
            <a href="/locations" className="btn btn-primary">Find a Recycling Center →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
