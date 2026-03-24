// Recycling Process Page — visual 5-step timeline
const steps = [
  {
    number: '01',
    icon: '📦',
    title: 'Collection',
    subtitle: 'Drop-off Drives & Pickup Services',
    description: `E-waste collection is the first step. Certified collection centers, manufacturer 
    take-back programs, door-to-door pickup services, and community drives are all channels through 
    which old electronics are gathered from homes, offices, and businesses. Items are sorted into 
    categories at the collection point.`,
    details: ['Community e-waste drives', 'Certified drop-off centers', 'Manufacturer programs', 'Corporate IT asset collection'],
  },
  {
    number: '02',
    icon: '🚛',
    title: 'Transportation',
    subtitle: 'Safe & Compliant Logistics',
    description: `Collected e-waste is safely packed and transported to certified recycling facilities. 
    Hazardous materials are contained to prevent leaks during transit. Transportation must comply 
    with local and national regulations for hazardous waste movement — improper transport can lead 
    to spills and environmental contamination.`,
    details: ['Sealed hazmat packaging', 'GPS-tracked vehicles', 'Compliance with EPA/CPCB rules', 'Chain of custody documentation'],
  },
  {
    number: '03',
    icon: '🔍',
    title: 'Sorting & Assessment',
    subtitle: 'Categorization by Material & Condition',
    description: `At the recycling facility, devices are sorted by type, condition, and material 
    composition. Items that can be refurbished and reused are separated from those that need full 
    dismantling. This sorting step maximizes resource recovery and minimizes waste.`,
    details: ['Visual inspection', 'Functional testing', 'Material identification', 'Refurbishment assessment'],
  },
  {
    number: '04',
    icon: '🔧',
    title: 'Dismantling',
    subtitle: 'Manual & Mechanical Disassembly',
    description: `Technicians manually disassemble electronics to separate components: circuit boards, 
    batteries, screens, plastic casings, cables, and metals are all pulled apart. This step requires 
    trained workers wearing protective equipment to avoid exposure to hazardous substances. 
    Hazardous components like batteries are safely isolated.`,
    details: ['Hand disassembly by trained workers', 'Mechanical shredders for plastics', 'Battery isolation protocols', 'CRT glass separation'],
  },
  {
    number: '05',
    icon: '⚡',
    title: 'Material Recovery',
    subtitle: 'Extraction of Valuable Resources',
    description: `The final step involves recovering raw materials from the separated components. 
    Smelting and refining extract precious metals (gold, silver, copper, palladium) from circuit 
    boards. Plastic is granulated and reused. Glass is recycled. Hazardous materials like mercury 
    and lead are safely contained and processed. The recovered materials re-enter manufacturing supply chains.`,
    details: ['Gold & silver smelting', 'Copper refining', 'Plastic granulation', 'Mercury retorting'],
  },
];

export default function RecyclingProcessPage() {
  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>The Recycling Process</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
            Follow electronics through a certified recycling journey — from your home to recovered raw materials.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Flow Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '3rem',
          }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  background: 'var(--gradient-brand)',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '0.3rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}>
                  {s.number} {s.icon}
                </div>
                {i < steps.length - 1 && (
                  <span style={{ color: 'var(--green-500)', fontWeight: 700 }}>→</span>
                )}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="steps-timeline">
            {steps.map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-icon">{step.number}</div>
                <div className="step-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                    <div>
                      <h3 style={{ margin: 0 }}>{step.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--teal-400)', margin: 0 }}>{step.subtitle}</p>
                    </div>
                  </div>
                  <p style={{ marginBottom: '1rem' }}>{step.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {step.details.map((d, j) => (
                      <span key={j} className="badge badge-green" style={{ textTransform: 'none', fontWeight: 500 }}>
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Outcome Box */}
          <div style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { icon: '🥇', value: '95%', label: 'Less energy to recycle aluminum vs. mining' },
              { icon: '💰', value: '$57B', label: 'Worth of raw materials in global e-waste' },
              { icon: '🌿', value: '40kg', label: 'CO₂ saved per recycled laptop' },
              { icon: '⚗️', value: '70+', label: 'Recoverable elements from electronics' },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <span className="stat-number" style={{ fontSize: '1.75rem' }}>{stat.value}</span>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
