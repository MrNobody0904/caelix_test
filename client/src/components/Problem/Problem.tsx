import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { EyeOff, Layers, Globe, UserCheck } from 'lucide-react';

const PROBLEMS = [
  {
    icon: EyeOff,
    title: 'No clear view of people and work',
    description: 'Founders cannot see who is doing what. Task status lives scattered across chat groups, messy sheets, and memory.',
    tag: 'Context Fragmentation',
  },
  {
    icon: Layers,
    title: 'Enterprise HR suites are too heavy',
    description: 'A 5 to 30 person team cannot afford a complex HCM platform that requires weeks of configuration and hefty per-seat lock-ins.',
    tag: 'Over-engineered Tools',
  },
  {
    icon: Globe,
    title: 'Digital presence needs outside help',
    description: 'Early teams lack dedicated in-house designers and SEO experts. Managing external agencies introduces separate spreadsheets and friction.',
    tag: 'Agency Disconnect',
  },
  {
    icon: UserCheck,
    title: 'Hiring is slow and scattered',
    description: 'Resumes live in unorganized inbox threads with no standardized way to assess practical capabilities or translate a candidate into a staff member.',
    tag: 'Hiring Guesswork',
  },
];

export const Problem: React.FC = () => {
  const containerRef = useReveal({ stagger: 0.1 });

  return (
    <section id="problem" className="section section-light" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', margin: '0 auto 64px', textAlign: 'center' }}>
          <span className="badge-blue reveal" style={{ marginBottom: '16px' }}>
            The Reality of Scaling
          </span>
          <h2 className="reveal" style={{ marginBottom: '18px' }}>
            Running a startup shouldn't mean stitching together five tools.
          </h2>
          <p className="reveal" style={{ fontSize: '18px', maxWidth: '640px', margin: '0 auto' }}>
            Founders lose hours every single week bridging silos between project trackers, people spreadsheets, external service vendors, and resume folders.
          </p>
        </div>

        {/* Four Problem Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {PROBLEMS.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <div
                key={i}
                className="card card-hover reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
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
                      marginBottom: '18px',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: 600, marginBottom: '10px' }}>
                    {prob.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--color-muted)', lineHeight: 1.55 }}>
                    {prob.description}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {prob.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
