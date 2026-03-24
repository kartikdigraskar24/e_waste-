// Types of E-Waste Page — grid of category cards
const types = [
  {
    emoji: '📱',
    title: 'Mobile Phones & Tablets',
    description:
      'Smartphones, feature phones, iPads, and e-readers contain lithium batteries, rare-earth metals, and toxic flame retardants. An estimated 5.3 billion phones will be discarded in 2023 alone.',
    tag: 'Consumer Electronics',
  },
  {
    emoji: '💻',
    title: 'Laptops & Computers',
    description:
      'Laptops and desktop PCs contain lead in solder, mercury in displays, and cadmium in batteries. Circuit boards hold gold, silver, and copper worth recovering through proper recycling.',
    tag: 'IT Equipment',
  },
  {
    emoji: '🔋',
    title: 'Batteries',
    description:
      'Lead-acid, lithium-ion, nickel-cadmium, and alkaline batteries all pose serious environmental hazards. Never throw batteries in regular trash — they can cause fires in landfills.',
    tag: 'Energy Storage',
  },
  {
    emoji: '📺',
    title: 'Televisions & Monitors',
    description:
      'Old CRT TVs contain up to 4 kg of lead. Modern LCD/LED screens contain mercury backlights. Flat-screen TVs also have indium in the ITO layer, a valuable and rare material.',
    tag: 'Display Devices',
  },
  {
    emoji: '🏠',
    title: 'Household Appliances',
    description:
      'Refrigerators, air conditioners, washing machines, and microwaves contain refrigerants, compressors, and PCBs. Improper disposal of refrigerants accelerates ozone layer depletion.',
    tag: 'Large Appliances',
  },
  {
    emoji: '🏭',
    title: 'Industrial Electronics',
    description:
      'Medical equipment, power tools, laboratory instruments, and factory control systems often contain specialized metals and chemicals that require expert handling for safe disposal.',
    tag: 'Industrial',
  },
  {
    emoji: '🖨️',
    title: 'Printers & Peripherals',
    description:
      'Inkjet cartridges, laser toner, scanners, and external drives contain plastics, inks with volatile organic compounds, and selenium in copier drums that are hazardous if landfilled.',
    tag: 'Office Equipment',
  },
  {
    emoji: '🎮',
    title: 'Gaming Consoles & Toys',
    description:
      'Game consoles, controllers, electronic toys, and remote controls contain circuit boards, batteries, and plastics. Many contain brominated flame retardants linked to thyroid disruption.',
    tag: 'Entertainment',
  },
  {
    emoji: '💡',
    title: 'Light Bulbs & Lighting',
    description:
      'CFL bulbs contain mercury and must be handled carefully. LED strips contain circuit boards. Fluorescent tube lights require specialized recycling to contain the mercury safely.',
    tag: 'Lighting',
  },
];

export default function TypesPage() {
  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>Types of E-Waste</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
            Electronic waste spans across every industry and household. Understanding each category
            helps you properly sort and recycle your discarded devices.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {types.map((t, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Color header */}
                <div style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(20,184,166,0.06))',
                  borderBottom: '1px solid var(--card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <span style={{ fontSize: '3rem' }}>{t.emoji}</span>
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>{t.tag}</span>
                  </div>
                </div>
                <div className="card-body" style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem' }}>{t.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div style={{
            marginTop: '3rem',
            background: 'rgba(34,197,94,0.06)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
          }}>
            <h3 style={{ color: 'var(--green-400)', marginBottom: '0.75rem' }}>
              ♻️ How to Dispose Responsibly
            </h3>
            <p>
              For any of these categories, <strong style={{ color: 'var(--text-primary)' }}>never throw electronics in regular trash</strong>.
              Instead, use certified e-waste collection centers, manufacturer take-back programs, or 
              authorized recyclers. Visit our <a href="/locations">Disposal Locations</a> page to find 
              a certified facility near you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
