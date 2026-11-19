import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { RecordScene } from './RecordScene';
import { scrollStore } from '../../lib/scrollStore';

gsap.registerPlugin(ScrollTrigger);

export const ConnectedRecord: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      setActiveStep(2);
      scrollStore.setState({ recordProgress: 1, activeRecordNode: 2 });
      return;
    }

    const ctx = gsap.context(() => {
      // Animate line draw on scroll
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center 45%',
            scrub: 0.8,
            onUpdate: (self) => {
              const progress = self.progress;
              let current = 0;
              if (progress >= 0.7) {
                current = 2;
              } else if (progress >= 0.35) {
                current = 1;
              } else {
                current = 0;
              }
              setActiveStep(current);
              scrollStore.setState({
                recordProgress: progress,
                activeRecordNode: current,
              });
            },
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nodes = [
    {
      id: 'workforce',
      title: 'Workforce',
      tagline: 'Core Workspace',
      badge: null,
      desc: 'The foundation: teams, roles, projects, and work history living in a clean operating system.',
      icon: Users,
      actionHref: '#workforce',
      isGhosted: false,
    },
    {
      id: 'growth',
      title: 'Growth Services',
      tagline: 'Services on the Same Record',
      badge: 'Integrated Delivery',
      desc: 'Milestones and approvals tracked beside internal tasks with no separate agency disconnect.',
      icon: TrendingUp,
      actionHref: '#growth',
      isGhosted: false,
    },
    {
      id: 'talent',
      title: 'Talent Network',
      tagline: 'Remote Hiring & Proof',
      badge: 'Coming soon',
      desc: 'A hire becomes an active team member with a profile and assigned work in one friction-free step.',
      icon: Sparkles,
      actionHref: '#talent',
      isGhosted: activeStep < 2,
    },
  ];

  return (
    <section id="record" className="section section-white" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto 48px', textAlign: 'center' }}>
          <span className="badge-blue" style={{ marginBottom: '16px' }}>
            The Architecture Advantage
          </span>
          <h2 style={{ marginBottom: '18px' }}>
            One workspace. Three products. One connected record.
          </h2>
          <p style={{ fontSize: '18px', maxWidth: '640px', margin: '0 auto' }}>
            The three products share one thing standalone tools cannot provide: a single, permissioned record of your entire organization.
          </p>
        </div>

        {/* 3D Visualizer Scene */}
        <RecordScene />

        {/* Desktop Connecting SVG Line */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '960px',
            margin: '0 auto 20px',
            display: 'block',
          }}
          className="connecting-svg-container"
        >
          <svg
            viewBox="0 0 960 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '24px', display: 'block' }}
          >
            {/* Background track line */}
            <line x1="80" y1="12" x2="880" y2="12" stroke="#E5E7EB" strokeWidth="2" />
            {/* Animated drawing line */}
            <path
              ref={pathRef}
              d="M 80 12 L 880 12"
              stroke="#0071E3"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Three Connected Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
          className="connected-cards-grid"
        >
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isLit = activeStep >= index;

            return (
              <div
                key={node.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isLit ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  opacity: node.isGhosted ? 0.72 : 1,
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  transform: isLit ? 'translateY(-2px)' : 'none',
                  minHeight: '260px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        backgroundColor: isLit ? 'var(--color-primary)' : '#F5F5F7',
                        color: isLit ? '#FFFFFF' : 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    {node.badge && (
                      <span
                        className={node.badge === 'Coming soon' ? 'badge-muted' : 'badge-blue'}
                        style={{ fontSize: '11px' }}
                      >
                        {node.badge}
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '4px' }}>
                    {node.tagline}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px' }}>
                    {node.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-muted)' }}>
                    {node.desc}
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                  <a
                    href={node.actionHref}
                    className="btn-link"
                    style={{ fontSize: '14px', fontWeight: 500 }}
                  >
                    <span>Learn more</span>
                    <ChevronRight size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .connected-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .connecting-svg-container {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
