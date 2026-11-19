import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReveal } from '../../hooks/useReveal';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchPlans, FALLBACK_PLANS, type PlansResponse } from '../../lib/api';

interface PricingProps {
  onOpenContact: (topic?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenContact }) => {
  const containerRef = useReveal({ stagger: 0.1 });
  const [plansData, setPlansData] = useState<PlansResponse>(FALLBACK_PLANS);
  const [isAnnual, setIsAnnual] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const teamPriceRef = useRef<HTMLSpanElement>(null);

  // Load plans from API (GET /api/plans)
  useEffect(() => {
    fetchPlans().then((data) => {
      if (data && data.plans) {
        setPlansData(data);
      }
    });
  }, []);

  // GSAP roll animation when switching billing interval
  const toggleBilling = (annual: boolean) => {
    setIsAnnual(annual);

    if (teamPriceRef.current) {
      const startVal = annual ? 499 : 399;
      const endVal = annual ? 399 : 499;

      gsap.fromTo(
        teamPriceRef.current,
        { innerText: startVal },
        {
          innerText: endVal,
          duration: 0.45,
          snap: { innerText: 1 },
          ease: 'power2.out',
        }
      );
    }
  };

  // Expand / collapse feature table animation
  const handleToggleComparison = () => {
    if (!showComparison) {
      setShowComparison(true);
      setTimeout(() => {
        if (tableRef.current) {
          gsap.fromTo(
            tableRef.current,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
          );
        }
      }, 10);
    } else {
      if (tableRef.current) {
        gsap.to(tableRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power3.in',
          onComplete: () => setShowComparison(false),
        });
      } else {
        setShowComparison(false);
      }
    }
  };

  const starterPlan = plansData.plans.find((p) => p.id === 'starter') || plansData.plans[0];
  const teamPlan = plansData.plans.find((p) => p.id === 'team') || plansData.plans[1];
  const growthPlan = plansData.plans.find((p) => p.id === 'growth') || plansData.plans[2];

  return (
    <section id="pricing" className="section section-white" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
          <span className="badge-blue reveal" style={{ marginBottom: '16px' }}>
            Transparent Pricing
          </span>
          <h2 className="reveal" style={{ marginBottom: '16px' }}>
            Simple plans. Start free.
          </h2>
          <p className="reveal" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Get started at zero cost with your core 5-person team. Upgrade smoothly as you add members and require growth execution.
          </p>
        </div>

        {/* Segmented Monthly / Annual Toggle */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '4px',
              backgroundColor: '#F5F5F7',
              borderRadius: '9999px',
              border: '1px solid var(--color-border)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => toggleBilling(false)}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                color: !isAnnual ? 'var(--color-dark)' : 'var(--color-muted)',
                backgroundColor: !isAnnual ? '#FFFFFF' : 'transparent',
                border: !isAnnual ? '1px solid var(--color-border)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              Monthly billing
            </button>
            <button
              onClick={() => toggleBilling(true)}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                color: isAnnual ? 'var(--color-dark)' : 'var(--color-muted)',
                backgroundColor: isAnnual ? '#FFFFFF' : 'transparent',
                border: isAnnual ? '1px solid var(--color-border)' : '1px solid transparent',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Annual billing</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#EBF5FF',
                  color: 'var(--color-primary)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Three Cards Grid (Mobile stacks with Team first via CSS order) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1140px',
            margin: '0 auto 40px',
            alignItems: 'stretch',
          }}
          className="pricing-grid"
        >
          {/* 1. Starter Plan */}
          <div
            className="card card-hover pricing-card-starter reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px 28px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 600 }}>{starterPlan.name}</h3>
                <span className="badge-muted">{starterPlan.memberLimit}</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', minHeight: '42px', marginBottom: '20px' }}>
                {starterPlan.tagline}
              </p>

              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '40px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}>
                  ₹0
                </span>
                <span style={{ fontSize: '14px', color: 'var(--color-muted)' }}>forever</span>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '12px' }}>
                  What's included:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {starterPlan.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Check size={16} color="#0071E3" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => onOpenContact('Starter Plan')}
            >
              {starterPlan.ctaText}
            </button>
          </div>

          {/* 2. Team Plan (Middle, 2px blue border, "Most popular" chip) */}
          <div
            className="card card-hover pricing-card-team reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px 28px',
              border: '2px solid var(--color-primary)',
              position: 'relative',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Most popular chip */}
            <div
              style={{
                position: 'absolute',
                top: '-13px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                padding: '3px 14px',
                borderRadius: '9999px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              Most popular
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 600 }}>{teamPlan.name}</h3>
                <span className="badge-blue" style={{ fontSize: '11px' }}>{teamPlan.memberLimit}</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', minHeight: '42px', marginBottom: '20px' }}>
                {teamPlan.tagline}
              </p>

              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '40px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}>
                  ₹<span ref={teamPriceRef}>{isAnnual ? 399 : 499}</span>
                </span>
                <span style={{ fontSize: '14px', color: 'var(--color-muted)' }}>
                  per member / month {isAnnual && '(billed annually)'}
                </span>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '12px' }}>
                  Everything in Starter, plus:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {teamPlan.features.slice(2).map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Check size={16} color="#0071E3" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => onOpenContact('Team Plan 14-day Trial')}
            >
              {teamPlan.ctaText}
            </button>
          </div>

          {/* 3. Growth Bundle Plan */}
          <div
            className="card card-hover pricing-card-growth reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px 28px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 600 }}>{growthPlan.name}</h3>
                <span className="badge-muted">Custom</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', minHeight: '42px', marginBottom: '20px' }}>
                {growthPlan.tagline}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}>
                  Custom Scope
                </span>
                <div style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '2px' }}>
                  Fixed sprint fee or monthly retainer
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '12px' }}>
                  Software + Services Included:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {growthPlan.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Check size={16} color="#0071E3" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => onOpenContact('Growth Bundle Custom')}
            >
              {growthPlan.ctaText}
            </button>
          </div>
        </div>

        {/* Talent Note */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>
            Note: Talent plans (per-role fee or employer subscription) launch with the pilot.
          </p>
        </div>

        {/* Expandable "Compare all features" Button */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleToggleComparison}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            aria-expanded={showComparison}
          >
            <span>{showComparison ? 'Hide feature comparison' : 'Compare all features'}</span>
            {showComparison ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div
            ref={tableRef}
            style={{
              overflowX: 'auto',
              maxWidth: '1000px',
              margin: '32px auto 0',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 600, width: '40%' }}>Feature Capability</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, width: '20%' }}>Starter</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, width: '20%', color: 'var(--color-primary)' }}>Team</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, width: '20%' }}>Growth Bundle</th>
                </tr>
              </thead>
              <tbody>
                {plansData.comparison.map((category, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr style={{ backgroundColor: '#F5F5F7' }}>
                      <td colSpan={4} style={{ padding: '12px 20px', fontWeight: 700, fontSize: '13px', color: 'var(--color-dark)' }}>
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '12px 20px', color: 'var(--color-dark)' }}>{row.name}</td>
                        <td style={{ padding: '12px 20px', color: 'var(--color-muted)' }}>{row.starter}</td>
                        <td style={{ padding: '12px 20px', fontWeight: 500, color: 'var(--color-dark)' }}>{row.team}</td>
                        <td style={{ padding: '12px 20px', color: 'var(--color-muted)' }}>{row.growth}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
          /* Stack Team plan first on mobile */
          .pricing-card-team {
            order: 1 !important;
          }
          .pricing-card-starter {
            order: 2 !important;
          }
          .pricing-card-growth {
            order: 3 !important;
          }
        }
      `}</style>
    </section>
  );
};
