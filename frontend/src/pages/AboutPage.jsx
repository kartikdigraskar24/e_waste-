// About E-Waste — Mega Page
// Merges: About E-Waste, Types of E-Waste, Environmental Impact, Recycling Process
// Uses tab-based navigation so all content is accessible from one page
import { useState } from 'react';

/* ─── Tab: About ─────────────────────────────────────────────────── */
const aboutSections = [
  {
    id: 'what',
    icon: '💻',
    title: 'What is Electronic Waste?',
    content: `Electronic waste, or e-waste, refers to discarded electrical or electronic devices — anything 
    with a battery or power cord that has been thrown away, whether broken, outdated, or unwanted. 
    E-waste is the fastest-growing waste stream in the world. Globally, over 53 million metric tons 
    are generated every year, and only about 17% is formally collected and recycled.`,
  },
  {
    id: 'examples',
    icon: '📱',
    title: 'Examples of E-Waste',
    content: `Common examples include smartphones, tablets, laptops, desktop computers, printers, 
    televisions, monitors, refrigerators, washing machines, air conditioners, microwaves, 
    batteries, power banks, chargers, cables, gaming consoles, and CFL/LED bulbs. 
    Essentially any device that uses electricity can become e-waste at end of life.`,
  },
  {
    id: 'harmful',
    icon: '☠️',
    title: 'Why Is E-Waste Harmful?',
    content: `Electronic devices contain hazardous materials such as lead, mercury, cadmium, arsenic, 
    beryllium, and brominated flame retardants. When improperly disposed of in landfills or burned, 
    these toxins leach into soil and water, contaminating ecosystems and entering the food chain. 
    Informal workers who dismantle devices by hand face direct exposure to dangerous chemicals.`,
  },
  {
    id: 'benefits',
    icon: '✅',
    title: 'Benefits of Recycling E-Waste',
    content: `Recycling electronics recovers valuable materials including gold, silver, copper, palladium, 
    and rare-earth elements — reducing destructive mining. It reduces greenhouse gas emissions, 
    conserves energy (recycling aluminum uses 95% less energy), prevents toxic pollution, and creates 
    green jobs. One tonne of e-waste from computers contains more gold than 17 tonnes of gold ore.`,
  },
];

/* ─── Tab: Types ─────────────────────────────────────────────────── */
const ewaste_types = [
  { emoji: '📱', title: 'Mobile Phones & Tablets', tag: 'Consumer Electronics',
    description: 'Smartphones, feature phones, iPads contain lithium batteries, rare-earth metals, and toxic flame retardants. 5.3 billion phones will be discarded in 2023 alone.' },
  { emoji: '💻', title: 'Laptops & Computers', tag: 'IT Equipment',
    description: 'PCs contain lead in solder, mercury in displays, and cadmium in batteries. Circuit boards hold gold, silver, and copper worth recovering through proper recycling.' },
  { emoji: '🔋', title: 'Batteries', tag: 'Energy Storage',
    description: 'Lead-acid, lithium-ion, nickel-cadmium batteries all pose serious environmental hazards. Never throw batteries in regular trash — they can cause fires in landfills.' },
  { emoji: '📺', title: 'Televisions & Monitors', tag: 'Display Devices',
    description: 'Old CRT TVs contain up to 4 kg of lead. Modern LCD/LED screens contain mercury backlights and indium in the ITO layer — a valuable and rare material.' },
  { emoji: '🏠', title: 'Household Appliances', tag: 'Large Appliances',
    description: 'Fridges, ACs, washing machines contain refrigerants and compressors. Improper refrigerant disposal accelerates ozone layer depletion.' },
  { emoji: '🏭', title: 'Industrial Electronics', tag: 'Industrial',
    description: 'Medical equipment, power tools, laboratory instruments contain specialized metals and chemicals requiring expert handling for safe disposal.' },
  { emoji: '🖨️', title: 'Printers & Peripherals', tag: 'Office Equipment',
    description: 'Inkjet cartridges, laser toner, scanners contain volatile organic compounds and selenium that are hazardous if landfilled.' },
  { emoji: '🎮', title: 'Gaming Consoles & Toys', tag: 'Entertainment',
    description: 'Game consoles and electronic toys contain circuit boards, batteries, and brominated flame retardants linked to thyroid disruption.' },
  { emoji: '💡', title: 'Light Bulbs & Lighting', tag: 'Lighting',
    description: 'CFL bulbs contain mercury and must be handled carefully. Fluorescent tubes require specialized recycling to safely contain mercury.' },
];

/* ─── Tab: Impact ────────────────────────────────────────────────── */
const impacts = [
  {
    icon: '🌱', title: 'Soil Pollution', color: '#2dd4bf',
    content: 'When electronics are dumped in landfills, lead, cadmium, and mercury slowly leach into soil, killing microorganisms, reducing agricultural productivity, and persisting for decades.',
    facts: ['Lead from 1 TV can contaminate 3,000 L of water', 'Cadmium persists in soil for 30+ years', 'E-waste sites show 400× higher lead levels'],
  },
  {
    icon: '💧', title: 'Water Pollution', color: '#3b82f6',
    content: 'Heavy metals seep through soil into groundwater, contaminating rivers and drinking wells. Mercury builds up in the food chain through biomagnification — fish absorb it, humans eat the fish.',
    facts: ['Mercury attacks the nervous system', 'Chromium causes liver and kidney damage', 'Arsenic causes skin lesions and cancer'],
  },
  {
    icon: '💨', title: 'Air Pollution', color: '#a78bfa',
    content: 'Burning scrap electronics releases dioxins, furans, and heavy metal fumes. These pollutants travel hundreds of kilometers and are absorbed into the respiratory system.',
    facts: ['Burning PVC releases cancer-causing dioxins', 'Metal fumes cause long-term lung damage', 'Particulates from burn sites travel 100s of km'],
  },
  {
    icon: '🏥', title: 'Human Health', color: '#f97316',
    content: 'Lead disrupts neurological development in children; mercury damages the brain and kidneys; brominated flame retardants disrupt thyroid function. Children near e-waste zones show significantly reduced IQ.',
    facts: ['Children near e-waste zones show lower IQ', 'Informal workers have 3× cancer risk', 'Lead impairs brain development irreversibly'],
  },
];

/* ─── Tab: Recycling ─────────────────────────────────────────────── */
const steps = [
  { number: '01', icon: '📦', title: 'Collection', subtitle: 'Drop-off Drives & Pickup Services',
    description: 'Certified collection centers, manufacturer take-back programs, door-to-door pickups, and community drives gather old electronics from homes, offices, and businesses.',
    details: ['Community e-waste drives', 'Certified drop-off centers', 'Manufacturer take-back programs', 'Corporate IT asset collection'] },
  { number: '02', icon: '🚛', title: 'Transportation', subtitle: 'Safe & Compliant Logistics',
    description: 'Collected e-waste is safely packed and transported to certified recycling facilities with hazardous materials contained to prevent leaks during transit.',
    details: ['Sealed hazmat packaging', 'GPS-tracked vehicles', 'Compliance with CPCB rules', 'Chain of custody documentation'] },
  { number: '03', icon: '🔍', title: 'Sorting & Assessment', subtitle: 'Categorization by Material & Condition',
    description: 'At the facility, devices are sorted by type, condition, and material. Items that can be refurbished are separated from those needing full dismantling.',
    details: ['Visual inspection', 'Functional testing', 'Material identification', 'Refurbishment assessment'] },
  { number: '04', icon: '🔧', title: 'Dismantling', subtitle: 'Manual & Mechanical Disassembly',
    description: 'Technicians disassemble electronics to separate circuit boards, batteries, screens, plastics, cables, and metals. Hazardous components are safely isolated.',
    details: ['Hand disassembly by trained workers', 'Mechanical shredders for plastics', 'Battery isolation protocols', 'CRT glass separation'] },
  { number: '05', icon: '⚡', title: 'Material Recovery', subtitle: 'Extraction of Valuable Resources',
    description: 'Smelting and refining extract precious metals from circuit boards. Plastic is granulated, glass recycled, and hazardous materials safely processed. Recovered materials re-enter supply chains.',
    details: ['Gold & silver smelting', 'Copper refining', 'Plastic granulation', 'Mercury retorting'] },
];

const TABS = [
  { id: 'about', label: '📖 About E-Waste' },
  { id: 'types', label: '📦 Types of E-Waste' },
  { id: 'impact', label: '🌍 Environmental Impact' },
  { id: 'recycling', label: '♻️ Recycling Process' },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>About E-Waste</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
            Everything you need to know about electronic waste — from what it is to how it's recycled.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Tab Navigation */}
          <div className="about-tab-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`about-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ─── TAB: ABOUT ───────────────────────────────────────── */}
          {activeTab === 'about' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {aboutSections.map((s) => (
                  <div key={s.id} className="card card-body" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{
                      fontSize: '2rem', width: '56px', height: '56px',
                      background: 'rgba(45,212,191,0.08)',
                      border: '1px solid rgba(45,212,191,0.2)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {s.icon}
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '0.75rem', color: 'var(--teal-400)' }}>{s.title}</h3>
                      <p>{s.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Did You Know */}
              <div style={{
                marginTop: '2.5rem',
                background: 'linear-gradient(135deg, rgba(45,212,191,0.06), rgba(59,130,246,0.06))',
                border: '1px solid rgba(45,212,191,0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                textAlign: 'center',
              }}>
                <h3 style={{ color: 'var(--teal-400)', marginBottom: '0.75rem' }}>💡 Did You Know?</h3>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                  One tonne of e-waste from discarded computers contains <strong style={{ color: 'var(--text-primary)' }}>more gold</strong> than 17 tonnes of gold ore mined from the earth.
                  Recycling electronics is truly &ldquo;urban mining&rdquo; — and far less destructive to the environment.
                </p>
              </div>
            </div>
          )}

          {/* ─── TAB: TYPES ──────────────────────────────────────── */}
          {activeTab === 'types' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
                {ewaste_types.map((t, i) => (
                  <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      padding: '1.5rem',
                      background: 'linear-gradient(135deg, rgba(45,212,191,0.07), rgba(59,130,246,0.05))',
                      borderBottom: '1px solid var(--card-border)',
                      display: 'flex', alignItems: 'center', gap: '1rem',
                    }}>
                      <span style={{ fontSize: '2.5rem' }}>{t.emoji}</span>
                      <span className="badge badge-teal">{t.tag}</span>
                    </div>
                    <div className="card-body" style={{ flex: 1 }}>
                      <h3 style={{ marginBottom: '0.6rem', fontSize: '1rem', color: 'var(--text-primary)' }}>{t.title}</h3>
                      <p style={{ fontSize: '0.875rem' }}>{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '2rem',
                background: 'rgba(45,212,191,0.05)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
              }}>
                <h3 style={{ color: 'var(--teal-400)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  ♻️ How to Dispose Responsibly
                </h3>
                <p style={{ fontSize: '0.9rem' }}>
                  For any of these categories, <strong style={{ color: 'var(--text-primary)' }}>never throw electronics in regular trash</strong>.
                  Use certified e-waste collection centers or manufacturer take-back programs.
                  Visit the <a href="/locations">Disposal Locations</a> page to find a certified facility near you.
                </p>
              </div>
            </div>
          )}

          {/* ─── TAB: IMPACT ─────────────────────────────────────── */}
          {activeTab === 'impact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {impacts.map((item, i) => (
                <div key={i} className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '4px', background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                  <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
                          <div style={{
                            width: '48px', height: '48px',
                            background: `${item.color}15`,
                            border: `1px solid ${item.color}30`,
                            borderRadius: 'var(--radius-md)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.5rem',
                          }}>
                            {item.icon}
                          </div>
                          <h2 style={{ fontSize: '1.35rem' }}>{item.title}</h2>
                        </div>
                        <p>{item.content}</p>
                      </div>
                      <div style={{
                        minWidth: '200px',
                        background: `${item.color}08`,
                        border: `1px solid ${item.color}22`,
                        borderRadius: 'var(--radius-md)',
                        padding: '1.1rem',
                      }}>
                        <p style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: item.color, marginBottom: '0.65rem' }}>
                          Key Facts
                        </p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                          {item.facts.map((f, j) => (
                            <li key={j} style={{ display: 'flex', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              <span style={{ color: item.color, flexShrink: 0 }}>▸</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(45,212,191,0.06), rgba(59,130,246,0.05))',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 2rem',
              }}>
                <h2 style={{ marginBottom: '0.75rem' }}>Together We Can Make a Change</h2>
                <p style={{ maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                  Recycle your electronics at certified facilities and encourage others to do the same.
                </p>
                <a href="/locations" className="btn btn-primary">Find a Recycling Center →</a>
              </div>
            </div>
          )}

          {/* ─── TAB: RECYCLING ──────────────────────────────────── */}
          {activeTab === 'recycling' && (
            <div>
              {/* Flow Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
                {steps.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      background: 'var(--gradient-brand-alt)',
                      color: '#fff',
                      borderRadius: '999px',
                      padding: '0.3rem 0.9rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                    }}>
                      {s.number} {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <span style={{ color: 'var(--teal-500)', fontWeight: 700 }}>→</span>
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
                          <p style={{ fontSize: '0.82rem', color: 'var(--teal-400)', margin: 0 }}>{step.subtitle}</p>
                        </div>
                      </div>
                      <p style={{ marginBottom: '0.875rem' }}>{step.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {step.details.map((d, j) => (
                          <span key={j} className="badge badge-teal" style={{ textTransform: 'none', fontWeight: 500 }}>
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Outcome Stats */}
              <div style={{
                marginTop: '2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
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
          )}
        </div>
      </section>
    </div>
  );
}
