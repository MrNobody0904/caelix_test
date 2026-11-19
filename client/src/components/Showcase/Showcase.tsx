import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, ShieldCheck, UserCheck, CheckSquare, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: 'org',
    step: '01',
    title: 'Org setup in minutes',
    subtitle: 'Structure without enterprise overhead',
    desc: 'Map your startup departments, cross-functional squads, and direct reporting lines in under five minutes. No lengthy enterprise onboarding calls required.',
    icon: Network,
    badge: 'Fast Onboarding',
  },
  {
    id: 'roles',
    step: '02',
    title: 'Role-based access',
    subtitle: 'Admin, Sub-admin, and Member',
    desc: 'Keep sensitive financial and hiring data protected while empowering team leads to assign sprint tasks and conduct weekly updates with zero micromanagement.',
    icon: ShieldCheck,
    badge: 'Security & Permissions',
  },
  {
    id: 'profiles',
    step: '03',
    title: 'Profiles with skills & history',
    subtitle: 'Living evidence of team capability',
    desc: 'Rich, verified employee records showing active skill competencies, historical contributions, and current workload allocations across every team member.',
    icon: UserCheck,
    badge: 'People Intelligence',
  },
  {
    id: 'tracking',
    step: '04',
    title: 'Project and task tracking',
    subtitle: 'Unified sprint visibility',
    desc: 'Track tasks, dependencies, and delivery milestones. Weekly AI digests distill team updates into clean executive briefs with direct links to the raw data.',
    icon: CheckSquare,
    badge: 'Execution Velocity',
  },
];

export const Showcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!containerRef.current || !pinRef.current) return;

    if (prefersReducedMotion) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      // Pinned ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2400',
        pin: pinRef.current,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const step = Math.min(FEATURES.length - 1, Math.floor(progress * FEATURES.length));
          setActiveStep(step);

          if (progressBarRef.current) {
            progressBarRef.current.style.height = `${progress * 100}%`;
          }
        },
      });

      return () => {
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="workforce"
      ref={containerRef}
      className="section-dark"
      style={{
        position: 'relative',
        backgroundColor: '#1D1D1F',
        minHeight: '100vh',
      }}
    >
      <div
        ref={pinRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '64px',
          paddingBottom: '64px',
        }}
      >
        <div className="container">
          {/* Section Header */}
          <div style={{ maxWidth: '800px', marginBottom: '48px' }}>
            <span
              className="badge-blue"
              style={{
                backgroundColor: 'rgba(0, 113, 227, 0.15)',
                borderColor: 'rgba(0, 113, 227, 0.35)',
                color: '#2997FF',
                marginBottom: '16px',
              }}
            >
              Caelix Workforce MVP
            </span>
            <h2 style={{ color: '#FFFFFF', marginBottom: '14px' }}>
              Built for teams of 3 to 30.
            </h2>
            <p style={{ color: '#A1A1A6', fontSize: '18px' }}>
              One lightweight workspace to organize people, projects, and progress before expanding into connected services.
            </p>
          </div>

          {/* Interactive Pinned Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1.3fr',
              gap: '40px',
              alignItems: 'center',
            }}
            className="showcase-grid"
          >
            {/* Progress indicator rail */}
            <div
              style={{
                width: '3px',
                height: '320px',
                backgroundColor: '#333336',
                borderRadius: '3px',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="showcase-progress-rail"
            >
              <div
                ref={progressBarRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${((activeStep + 1) / FEATURES.length) * 100}%`,
                  backgroundColor: '#0071E3',
                  transition: 'height 0.25s ease-out',
                }}
              />
            </div>

            {/* Left: Active Feature Descriptions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {FEATURES.map((feat, index) => {
                const isActive = activeStep === index;
                const Icon = feat.icon;

                return (
                  <div
                    key={feat.id}
                    onClick={() => setActiveStep(index)}
                    style={{
                      cursor: 'pointer',
                      padding: '16px 20px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#262629' : 'transparent',
                      border: isActive ? '1px solid #3E3E42' : '1px solid transparent',
                      opacity: isActive ? 1 : 0.45,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <Icon size={16} color="#2997FF" />
                      <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#2997FF', fontWeight: 600 }}>
                        {feat.step}
                      </span>
                      <span style={{ fontSize: '12px', color: '#A1A1A6' }}>•</span>
                      <span style={{ fontSize: '12px', color: '#2997FF', fontWeight: 500 }}>{feat.badge}</span>
                    </div>

                    <h3 style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '6px' }}>
                      {feat.title}
                    </h3>
                    {isActive && (
                      <p style={{ fontSize: '14px', color: '#A1A1A6', lineHeight: 1.55 }}>
                        {feat.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Mockup with Dynamic State Cross-fade */}
            <div
              style={{
                backgroundColor: '#262629',
                border: '1px solid #3E3E42',
                borderRadius: '14px',
                padding: '24px',
                minHeight: '440px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Window Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #333336',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                  <span style={{ fontSize: '12px', color: '#86868B', marginLeft: '8px' }}>
                    Workforce / {FEATURES[activeStep].title}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0, 113, 227, 0.2)',
                    color: '#2997FF',
                    fontWeight: 600,
                  }}
                >
                  Live Workspace
                </span>
              </div>

              {/* Dynamic Mockup Body per Active Feature */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {activeStep === 0 && (
                  /* Step 0: Org Setup */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ fontSize: '14px', color: '#A1A1A6', marginBottom: '4px' }}>
                      Organization Hierarchy — 12 active members
                    </div>
                    <div
                      style={{
                        padding: '14px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #333336',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                        Executive / Founders (2)
                      </div>
                      <div style={{ fontSize: '12px', color: '#86868B' }}>Reporting line: Direct to Board</div>
                    </div>
                    <div
                      style={{
                        padding: '14px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #0071E3',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                        Product Engineering (6)
                      </div>
                      <div style={{ fontSize: '12px', color: '#2997FF' }}>Active Sprint: v1.2 release</div>
                    </div>
                    <div
                      style={{
                        padding: '14px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #333336',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                        Growth & Marketing (4)
                      </div>
                      <div style={{ fontSize: '12px', color: '#86868B' }}>Connected to Caelix Growth Sprint</div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  /* Step 1: Role-based access */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '14px', color: '#A1A1A6', marginBottom: '4px' }}>
                      Permission Matrix & Guardrails
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr 100px',
                        padding: '12px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #333336',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '13px' }}>Admin</span>
                      <span style={{ color: '#86868B', fontSize: '12px' }}>Billing, hiring, contracts, audit logs</span>
                      <span style={{ color: '#2997FF', fontSize: '12px', textAlign: 'right' }}>Full access</span>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr 100px',
                        padding: '12px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #0071E3',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '13px' }}>Sub-admin</span>
                      <span style={{ color: '#86868B', fontSize: '12px' }}>Team leads, task approvals, sprint planning</span>
                      <span style={{ color: '#2997FF', fontSize: '12px', textAlign: 'right' }}>Team scope</span>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr 100px',
                        padding: '12px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #333336',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '13px' }}>Member</span>
                      <span style={{ color: '#86868B', fontSize: '12px' }}>Task updates, profile, self assessments</span>
                      <span style={{ color: '#86868B', fontSize: '12px', textAlign: 'right' }}>Standard</span>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  /* Step 2: Employee Profiles with Skills */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '10px',
                        border: '1px solid #3E3E42',
                      }}
                    >
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: '#0071E3',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '18px',
                        }}
                      >
                        AR
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>Aarav Roy</div>
                        <div style={{ fontSize: '12px', color: '#2997FF' }}>Lead Frontend Engineer • Joined Oct 2024</div>
                      </div>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: '#1D1D1F', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: '#86868B', marginBottom: '8px' }}>Verified Skills:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#333336', color: '#FFFFFF', fontSize: '12px' }}>
                          React 18 / TypeScript (Evaluated 96%)
                        </span>
                        <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#333336', color: '#FFFFFF', fontSize: '12px' }}>
                          Three.js / WebGL
                        </span>
                        <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#333336', color: '#FFFFFF', fontSize: '12px' }}>
                          Design Systems
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#86868B' }}>
                      Active Projects: Marketing Launch, Auth Permissions System
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  /* Step 3: Project & Task Tracking with AI Summaries */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                      style={{
                        padding: '14px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #333336',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>Launch Website V2</div>
                        <div style={{ fontSize: '11px', color: '#86868B' }}>Milestones tracked beside growth partner</div>
                      </div>
                      <span style={{ fontSize: '12px', color: '#34D399', fontWeight: 600 }}>100% Done</span>
                    </div>

                    <div
                      style={{
                        padding: '14px',
                        backgroundColor: '#1D1D1F',
                        borderRadius: '8px',
                        border: '1px solid #0071E3',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>Auth0 Enterprise SSO</div>
                        <div style={{ fontSize: '11px', color: '#2997FF' }}>3 sub-tasks remaining</div>
                      </div>
                      <span style={{ fontSize: '12px', color: '#2997FF', fontWeight: 600 }}>In Review</span>
                    </div>

                    {/* Transparent AI summary pill */}
                    <div
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(0, 113, 227, 0.12)',
                        border: '1px solid rgba(0, 113, 227, 0.3)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Sparkles size={16} color="#2997FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '12px', color: '#D1D5DB' }}>
                        <span style={{ fontWeight: 600, color: '#FFFFFF' }}>Transparent AI Digest: </span>
                        Team velocity +18% this sprint. 4 blocker issues resolved. Source data visible in audit history.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer status */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #333336',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#86868B',
                }}
              >
                <span>Caelix Single-Record Architecture</span>
                <span style={{ color: '#2997FF' }}>Instant team sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
          }
          .showcase-progress-rail {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
