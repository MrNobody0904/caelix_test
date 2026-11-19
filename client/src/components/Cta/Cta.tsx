import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { ArrowRight, Calendar } from 'lucide-react';

interface CtaProps {
  onOpenContact: (topic?: string) => void;
}

export const Cta: React.FC<CtaProps> = ({ onOpenContact }) => {
  const containerRef = useReveal({ stagger: 0.1 });

  return (
    <section className="section-dark" style={{ backgroundColor: '#1D1D1F', padding: '110px 0' }} ref={containerRef}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <span
            className="badge-blue reveal"
            style={{
              backgroundColor: 'rgba(0, 113, 227, 0.18)',
              borderColor: 'rgba(0, 113, 227, 0.4)',
              color: '#2997FF',
              marginBottom: '20px',
            }}
          >
            Get Started with Caelix
          </span>

          <h2 className="reveal" style={{ color: '#FFFFFF', marginBottom: '20px', fontSize: 'var(--fs-h2)' }}>
            Build your business on one connected record.
          </h2>

          <p
            className="reveal"
            style={{
              color: '#A1A1A6',
              fontSize: '19px',
              maxWidth: '620px',
              margin: '0 auto 16px',
              lineHeight: 1.6,
            }}
          >
            Eliminate operational tool sprawl. Unite team profiles, sprint milestones, and growth execution today.
          </p>

          <div
            className="reveal"
            style={{
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#86868B',
              marginBottom: '40px',
            }}
          >
            "Build Businesses. Empower People. Accelerate Growth."
          </div>

          <div
            className="reveal"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <a href="#pricing" className="btn btn-primary" style={{ height: '48px', padding: '0 28px' }}>
              <span>Start free today</span>
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => onOpenContact('Book a platform demo')}
              className="btn btn-secondary"
              style={{
                height: '48px',
                padding: '0 26px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                borderColor: '#3E3E42',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#262629';
                e.currentTarget.style.borderColor = '#0071E3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#3E3E42';
              }}
            >
              <Calendar size={16} />
              <span>Book a demo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
