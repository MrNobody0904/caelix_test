import React from 'react';
import { Logo } from '../common/Logo';

interface FooterProps {
  onOpenContact: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer
      style={{
        backgroundColor: '#F5F5F7',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '64px',
        paddingBottom: '48px',
      }}
    >
      <div className="container">
        {/* Top Grid: Logo + Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '56px',
          }}
          className="footer-grid"
        >
          {/* Brand info */}
          <div>
            <Logo height={32} showTagline={true} />
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-muted)',
                marginTop: '16px',
                maxWidth: '280px',
                lineHeight: 1.6,
              }}
            >
              The operating system for early-stage teams. One connected record for people, projects, and growth services.
            </p>
            <div style={{ marginTop: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-dark)' }}>
              Initial geographies: Pune • Bhagalpur • Pan-India
            </div>
          </div>

          {/* Col 1: Product */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Product
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#workforce" style={{ color: 'var(--color-muted)' }}>Workforce (Core)</a></li>
              <li><a href="#record" style={{ color: 'var(--color-muted)' }}>Connected Record</a></li>
              <li><a href="#talent" style={{ color: 'var(--color-muted)' }}>Talent Network</a></li>
              <li><a href="#pricing" style={{ color: 'var(--color-muted)' }}>Pricing & Plans</a></li>
              <li><a href="#faq" style={{ color: 'var(--color-muted)' }}>FAQs</a></li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Growth Services
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#growth" style={{ color: 'var(--color-muted)' }}>Website Design & Dev</a></li>
              <li><a href="#growth" style={{ color: 'var(--color-muted)' }}>Technical & Content SEO</a></li>
              <li><a href="#growth" style={{ color: 'var(--color-muted)' }}>Brand Identity Architecture</a></li>
              <li><button onClick={() => onOpenContact('Growth Retainer')} style={{ color: 'var(--color-muted)', padding: 0 }}>Custom Retainers</button></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Company
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#problem" style={{ color: 'var(--color-muted)' }}>Our Mission</a></li>
              <li><button onClick={() => onOpenContact('Design Partner Inquiry')} style={{ color: 'var(--color-muted)', padding: 0 }}>Design Partners</button></li>
              <li><button onClick={() => onOpenContact('College & E-Cell Collaboration')} style={{ color: 'var(--color-muted)', padding: 0 }}>Campus E-Cells</button></li>
              <li><button onClick={() => onOpenContact('Founder Contact')} style={{ color: 'var(--color-muted)', padding: 0 }}>Contact Us</button></li>
            </ul>
          </div>

          {/* Col 4: Legal & Ethics */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Ethics & Trust
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#trust" style={{ color: 'var(--color-muted)' }}>Responsible AI Policy</a></li>
              <li><a href="#trust" style={{ color: 'var(--color-muted)' }}>Data Privacy & Security</a></li>
              <li><span style={{ color: 'var(--color-muted)' }}>Terms of Service</span></li>
              <li><span style={{ color: 'var(--color-muted)' }}>GDPR / DPDP Compliance</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '13px',
            color: 'var(--color-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Caelix Technologies Private Limited. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Made with pride in India</span>
            <span role="img" aria-label="India flag">🇮🇳</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
