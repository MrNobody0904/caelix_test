import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Users, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { HeroScene } from '../scenes/HeroScene';
import { scrollStore } from '../../lib/scrollStore';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenTour: () => void;
  onOpenContact: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTour, onOpenContact }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const chip1Ref = useRef<HTMLDivElement>(null);
  const chip2Ref = useRef<HTMLDivElement>(null);
  const chip3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Load Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.hero-title-line',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          '.hero-subheadline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          '.hero-buttons',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          mockupRef.current,
          { opacity: 0, y: 50, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
          '-=0.4'
        );

      // 2. Scrubbed Mockup and 3D Convergence
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Scrub mockup scale & lift
        gsap.fromTo(
          mockupRef.current,
          { y: 30, scale: 0.95 },
          {
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom center',
              scrub: 1.2,
              onUpdate: (self) => {
                // Update 3D scene convergence store
                scrollStore.setState({ heroConvergence: self.progress });
              },
            },
          }
        );

        // Parallax chips floating around mockup
        if (chip1Ref.current) {
          gsap.to(chip1Ref.current, {
            y: -45,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom center',
              scrub: 1.8,
            },
          });
        }

        if (chip2Ref.current) {
          gsap.to(chip2Ref.current, {
            y: -70,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom center',
              scrub: 2.2,
            },
          });
        }

        if (chip3Ref.current) {
          gsap.to(chip3Ref.current, {
            y: -35,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom center',
              scrub: 1.4,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        paddingTop: '64px',
        paddingBottom: '96px',
        overflow: 'hidden',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Hero Scene Background */}
      <HeroScene />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Early Access Chip */}
        <div style={{ marginBottom: '20px' }}>
          <span className="badge-blue hero-badge">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
              }}
            />
            Now in early access
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            maxWidth: '920px',
            margin: '0 auto 20px',
            fontSize: 'var(--fs-hero)',
            letterSpacing: '-0.025em',
          }}
        >
          <span className="hero-title-line" style={{ display: 'block' }}>
            The operating system
          </span>
          <span className="hero-title-line" style={{ display: 'block', color: 'var(--color-primary)' }}>
            for early-stage teams.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-subheadline"
          style={{
            maxWidth: '680px',
            margin: '0 auto 36px',
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: 'var(--color-muted)',
            lineHeight: 1.6,
          }}
        >
          Organize people, projects and progress in one place. Add growth services and remote hiring when you're ready.
        </p>

        {/* Buttons */}
        <div
          className="hero-buttons"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          <a href="#pricing" className="btn btn-primary">
            Start free
            <ArrowRight size={16} />
          </a>
          <button
            onClick={onOpenTour}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Play size={15} fill="currentColor" />
            Watch the tour
          </button>
        </div>

        {/* Interactive Flat Dashboard Mockup (Pure HTML/CSS) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1040px',
            margin: '0 auto',
          }}
        >
          {/* Floating UI chip 1: Team status */}
          <div
            ref={chip1Ref}
            className="card"
            style={{
              position: 'absolute',
              top: '-24px',
              left: '-20px',
              zIndex: 10,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#EBF5FF',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>14 Members Online</div>
              <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Workforce synced • 3 depts</div>
            </div>
          </div>

          {/* Floating UI chip 2: Growth deliverable */}
          <div
            ref={chip2Ref}
            className="card"
            style={{
              position: 'absolute',
              top: '40%',
              right: '-24px',
              zIndex: 10,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Landing Page V2</div>
              <div style={{ fontSize: '11px', color: '#059669' }}>Milestone Approved</div>
            </div>
          </div>

          {/* Floating UI chip 3: Verified Assessment */}
          <div
            ref={chip3Ref}
            className="card"
            style={{
              position: 'absolute',
              bottom: '-18px',
              left: '12%',
              zIndex: 10,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
            }}
          >
            <Sparkles size={16} color="#0071E3" />
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-dark)' }}>
              AI verified: React + Full-stack assessment (94%)
            </span>
          </div>

          {/* Main Dashboard Window */}
          <div
            ref={mockupRef}
            className="card"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '14px',
              padding: 0,
              overflow: 'hidden',
              textAlign: 'left',
            }}
          >
            {/* Window chrome header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: '#FAFAFA',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E5E7EB' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E5E7EB' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E5E7EB' }} />
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-muted)',
                    marginLeft: '8px',
                    fontWeight: 500,
                  }}
                >
                  caelix.app / workspace / acorn-ai
                </span>
              </div>
              <span className="badge-muted">Admin: Founder View</span>
            </div>

            {/* Dashboard Content Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                minHeight: '380px',
              }}
              className="mockup-grid"
            >
              {/* Sidebar */}
              <div
                style={{
                  borderRight: '1px solid var(--color-border)',
                  backgroundColor: '#FAFAFA',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted)', marginBottom: '10px' }}>
                    Connected Record
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#EBF5FF',
                        color: 'var(--color-primary)',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Users size={15} /> Workforce (Core)
                    </div>
                    <div
                      style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        color: 'var(--color-dark)',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <TrendingUp size={15} /> Growth Services
                    </div>
                    <div
                      style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        color: 'var(--color-muted)',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Sparkles size={15} /> Talent Network
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted)', marginBottom: '8px' }}>
                    Departments (3)
                  </div>
                  <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--color-muted)' }}>
                    <div>• Engineering (6)</div>
                    <div>• Product & Design (4)</div>
                    <div>• Go-To-Market (4)</div>
                  </div>
                </div>
              </div>

              {/* Main Panel */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Q4 Product & Growth Sprint</h3>
                    <p style={{ fontSize: '13px' }}>12 active tasks • 2 external agency milestones</p>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => onOpenContact('Workspace Demo')}>
                    + New Task
                  </button>
                </div>

                {/* Status Columns preview */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                  }}
                  className="mockup-cards-row"
                >
                  {/* Card 1 */}
                  <div
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '12px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge-muted">Core Work</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)' }}>In Progress</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                      Auth & Role Permissions
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                      Assigned to Priya (Lead Eng)
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '12px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge-blue" style={{ fontSize: '10px', padding: '1px 6px' }}>Growth Service</span>
                      <span style={{ fontSize: '11px', color: '#059669' }}>Milestone 2/3</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                      SEO Architecture & Sitemap
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                      Tracked directly in Caelix
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '12px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge-muted">AI Summary</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Weekly</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                      92% on-track this cycle
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                      Zero manual status meetings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .mockup-grid {
            grid-template-columns: 1fr !important;
          }
          .mockup-cards-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
