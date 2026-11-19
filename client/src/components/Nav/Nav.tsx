import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { Menu, X } from 'lucide-react';

interface NavProps {
  onOpenContact: (topic?: string) => void;
}

export const Nav: React.FC<NavProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Workforce', href: '#workforce' },
    { label: 'Growth', href: '#growth' },
    { label: 'Talent', href: '#talent' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'border-color 0.25s ease, background-color 0.25s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        <a href="#" aria-label="Caelix Home">
          <Logo height={32} showTagline={false} />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            gap: '32px',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-dark)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--color-dark)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '20px',
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => onOpenContact('Sign in')}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-muted)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-dark)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--color-muted)')}
          >
            Sign in
          </button>
          <a href="#pricing" className="btn btn-primary btn-sm">
            Get started free
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-nav-toggle"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          onClick={() => setMobileMenuOpen((v) => !v)}
          style={{
            display: 'none',
            color: 'var(--color-dark)',
            padding: '8px',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--color-dark)',
                padding: '6px 0',
              }}
            >
              {link.label}
            </a>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact('Sign in');
              }}
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-dark)',
                textAlign: 'left',
              }}
            >
              Sign in
            </button>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Get started free
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
