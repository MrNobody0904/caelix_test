import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { FileSearch, UserCheck, ShieldLock, Check } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: FileSearch,
    title: 'Transparent AI',
    subtitle: 'Always shows underlying data',
    desc: 'When Caelix generates weekly project updates or workload balances, it links directly to the specific commits, tickets, and tasks analyzed. No black-box hallucination.',
    checks: ['Visible citations for every generated summary', 'Audit trail accessible to team admins', 'Raw logs can be exported anytime'],
  },
  {
    icon: UserCheck,
    title: 'Humans in charge',
    subtitle: 'No automatic decisions',
    desc: 'Algorithms advise; people decide. Caelix never automatically accepts or rejects candidates, nor does it automate performance reviews or access termination.',
    checks: ['Final hiring decisions stay with hiring managers', 'Manual override available on all automated tags', 'No biometric or emotional inference'],
  },
  {
    icon: ShieldLock,
    title: 'Privacy first',
    subtitle: 'Minimal data & strict boundaries',
    desc: 'Your startup data is never used to train generalized external public models. Multi-tenant isolation and strict role permissions prevent cross-team leaks.',
    checks: ['Role-based data masking by default', 'Encrypted in transit (TLS 1.3) and at rest', 'Zero scraping of internal discussions for ad models'],
  },
];

export const Trust: React.FC = () => {
  const containerRef = useReveal({ stagger: 0.1 });

  return (
    <section id="trust" className="section section-light" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto 60px', textAlign: 'center' }}>
          <span className="badge-blue reveal" style={{ marginBottom: '16px' }}>
            Responsible Architecture
          </span>
          <h2 className="reveal" style={{ marginBottom: '18px' }}>
            Trust and Responsible AI.
          </h2>
          <p className="reveal" style={{ fontSize: '18px', maxWidth: '640px', margin: '0 auto' }}>
            A modular monolith with a clean API. AI is added only where it solves a clear problem and can be verified by humans.
          </p>
        </div>

        {/* 3 Trust Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="card card-hover reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '30px',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      backgroundColor: '#F5F5F7',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>
                    {pillar.title}
                  </h3>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '14px' }}>
                    {pillar.subtitle}
                  </div>
                  <p style={{ fontSize: '15px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {pillar.desc}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pillar.checks.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <Check size={14} color="#0071E3" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
