import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { Globe, Search, Palette, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface GrowthProps {
  onOpenContact: (topic?: string) => void;
}

const SERVICES = [
  {
    icon: Globe,
    title: 'High-Converting Website',
    price: 'From ₹45,000',
    type: 'Fixed-fee Sprint',
    description: 'Fast, responsive, modern web presence built on React/Next.js with frictionless conversion paths.',
    deliverables: [
      'Interactive Figma prototype & design review',
      'Production React/Vite/Next.js codebase',
      'Sub-second page speeds (Lighthouse 95+)',
      'CMS integration & automated staging',
    ],
  },
  {
    icon: Search,
    title: 'Technical & Content SEO',
    price: 'From ₹25,000',
    type: 'Sprint or Retainer',
    description: 'Zero fluff keyword indexing, schema markup, and content roadmaps engineered for early founders.',
    deliverables: [
      'High-intent keyword matrix & search volume',
      'Technical sitemap & structured JSON-LD schema',
      'Founder-led thought leadership outline',
      'Monthly search ranking audits in Caelix',
    ],
  },
  {
    icon: Palette,
    title: 'Identity & Brand Architecture',
    price: 'From ₹35,000',
    type: 'Fixed-fee Package',
    description: 'Clean visual identity, typography scale, logos, and slide pitch templates built to attract investors.',
    deliverables: [
      'Modern geometric logo & icon marks',
      'Design tokens & Apple-minimal style guide',
      'Pitch deck and investor one-pager templates',
      'Social assets and brand guidelines PDF',
    ],
  },
];

export const Growth: React.FC<GrowthProps> = ({ onOpenContact }) => {
  const containerRef = useReveal({ stagger: 0.1 });

  return (
    <section id="growth" className="section section-light" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 60px', textAlign: 'center' }}>
          <span className="badge-blue reveal" style={{ marginBottom: '16px' }}>
            Phase 1 Services
          </span>
          <h2 className="reveal" style={{ marginBottom: '18px' }}>
            Your website, SEO and branding. Delivered, and tracked beside your own tasks.
          </h2>
          <p className="reveal" style={{ fontSize: '18px', maxWidth: '680px', margin: '0 auto' }}>
            No disconnected agency slack channels or surprise retainers. Caelix partners with vetted digital builders and streams deliverables directly into your workspace.
          </p>
        </div>

        {/* 2-Column: Services Cards + Milestone Tracker Mockup */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '32px',
            alignItems: 'start',
          }}
          className="growth-grid"
        >
          {/* Services Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {SERVICES.map((serv, index) => {
              const Icon = serv.icon;
              return (
                <div key={index} className="card card-hover reveal" style={{ padding: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: '#F5F5F7',
                          color: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{serv.title}</h3>
                        <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>{serv.type}</span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                      }}
                    >
                      {serv.price}
                    </span>
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '16px' }}>
                    {serv.description}
                  </p>

                  <div
                    style={{
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '14px',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '8px' }}>
                      Included Deliverables:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {serv.deliverables.map((del, dIdx) => (
                        <li
                          key={dIdx}
                          style={{
                            fontSize: '13px',
                            color: 'var(--color-dark)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-primary)',
                            }}
                          />
                          {del}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenContact(`Growth Service: ${serv.title}`)}
                  >
                    <span>Request scope & kickoff</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Milestone and Approvals Tracker Mockup */}
          <div className="card reveal" style={{ padding: '28px', backgroundColor: '#FFFFFF', position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <span className="badge-blue" style={{ fontSize: '11px', marginBottom: '6px' }}>
                  Workspace Milestone Tracker
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Active Growth Sprint</h3>
              </div>
              <span className="badge-muted">Live sync</span>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '24px' }}>
              Review design frames, staging URLs, and SEO documents right where your team manages daily engineering sprints.
            </p>

            {/* Milestones timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {/* Milestone 1 */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Milestone 1: Identity & Tokens</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#059669' }}>Approved</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-muted)', paddingLeft: '24px' }}>
                  Color system, SVG mark, typography specs signed off by Founder.
                </p>
              </div>

              {/* Milestone 2 */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--color-primary)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#0071E3" />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Milestone 2: Landing Page V1</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>In Review</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-muted)', paddingLeft: '24px', marginBottom: '10px' }}>
                  Staging build deployed. Interactive 3D scene & contact form connected.
                </p>
                <div style={{ paddingLeft: '24px', display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ height: '30px', fontSize: '12px' }}
                    onClick={() => alert('Demo: Milestone approved with cryptographic team timestamp!')}
                  >
                    1-Click Approve
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ height: '30px', fontSize: '12px' }}
                    onClick={() => onOpenContact('Growth Revision Request')}
                  >
                    Request edit
                  </button>
                </div>
              </div>

              {/* Milestone 3 */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid var(--color-border)',
                  opacity: 0.7,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #D1D5DB' }} />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Milestone 3: Technical SEO & Schema</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>Queued</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-muted)', paddingLeft: '24px' }}>
                  Starts immediately upon Milestone 2 approval.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--color-muted)',
              }}
            >
              <ShieldCheck size={16} color="#0071E3" />
              <span>Payments held securely until milestones are approved by you.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .growth-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
