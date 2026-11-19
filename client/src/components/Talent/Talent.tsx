import React, { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { Sparkles, CheckCircle2, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { submitWaitlist } from '../../lib/api';

export const Talent: React.FC = () => {
  const containerRef = useReveal({ stagger: 0.1 });
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'founder' | 'college' | 'employer'>('founder');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatusMessage(null);
    setIsError(false);

    try {
      const res = await submitWaitlist({ email, role });
      setStatusMessage(res.message || 'You have been added to the early access waitlist!');
      setEmail('');
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(err.message || 'Something went wrong. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="talent" className="section section-white" ref={containerRef}>
      <div className="container">
        {/* Teaser Header */}
        <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge-muted reveal">Phase 2</span>
            <span className="badge-blue reveal">Coming soon</span>
          </div>
          <h2 className="reveal" style={{ marginBottom: '16px' }}>
            Hire remotely. Assess fairly.
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: '18px',
              maxWidth: '640px',
              margin: '0 auto 12px',
              color: 'var(--color-muted)',
            }}
          >
            Evidence-based profiles built on real projects and assessments, not just a CV.
          </p>
          <p className="reveal" style={{ fontSize: '15px', color: 'var(--color-muted)' }}>
            When hired, candidates transition into your Caelix Workforce workspace in one click—with roles, skills, and reporting lines already in place.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1020px',
            margin: '0 auto 48px',
          }}
        >
          <div className="card reveal" style={{ backgroundColor: '#F9FAFB' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                border: '1px solid var(--color-border)',
              }}
            >
              <Sparkles size={18} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Proof over keywords
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>
              Evaluate candidates on standardized technical tasks, writing samples, and real-world debugging challenges.
            </p>
          </div>

          <div className="card reveal" style={{ backgroundColor: '#F9FAFB' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                border: '1px solid var(--color-border)',
              }}
            >
              <CheckCircle2 size={18} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Instant onboarding
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>
              No re-entering data or sending separate email invites. A hired candidate becomes an active team member with assigned projects in seconds.
            </p>
          </div>

          <div className="card reveal" style={{ backgroundColor: '#F9FAFB' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                border: '1px solid var(--color-border)',
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Responsible assessment
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>
              Transparent scoringrubrics. Machine assistance only helps summarize evidence; hiring offers always remain 100% human-decided.
            </p>
          </div>
        </div>

        {/* Priority Access Waitlist Form */}
        <div
          className="card reveal"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '36px',
            backgroundColor: '#F5F5F7',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>
            Join the Talent Pilot Early Access
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--color-muted)', marginBottom: '24px' }}>
            Get early invite codes for hiring remote designers, engineers, and apprentices from top Indian colleges and incubators.
          </p>

          <form onSubmit={handleWaitlistSubmit} style={{ maxWidth: '520px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '8px' }} className="waitlist-fields">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  className="input-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: '#FFFFFF' }}
                />
                <select
                  className="input-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <option value="founder">Founder</option>
                  <option value="employer">Employer / HR</option>
                  <option value="college">College / E-Cell</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', height: '44px' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Joining waitlist...</span>
                  </>
                ) : (
                  <>
                    <span>Request Early Access</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            {statusMessage && (
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isError ? 'var(--color-error)' : '#059669',
                  backgroundColor: isError ? '#FEF2F2' : '#ECFDF5',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isError ? '1px solid #FCA5A5' : '1px solid #A7F3D0',
                  marginTop: '12px',
                }}
              >
                {statusMessage}
              </div>
            )}

            {/* Required Footnote */}
            <div
              style={{
                marginTop: '18px',
                fontSize: '13px',
                color: 'var(--color-muted)',
                lineHeight: 1.5,
              }}
            >
              AI assists reviewers. Hiring decisions always stay with people.
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .waitlist-fields {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
