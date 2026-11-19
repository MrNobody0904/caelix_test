import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  inverted?: boolean;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showTagline = false,
  inverted = false,
  height = 32,
}) => {
  return (
    <div
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* Brand Mark SVG for razor-sharp vector rendering at any scale */}
      <svg
        width={height * 1.05}
        height={height}
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, display: 'block' }}
        aria-hidden="true"
      >
        {/* Outer C bracket */}
        <path
          d="M75 14H40L14 50L40 86H75L62 72H46L29 50L46 28H62L75 14Z"
          fill={inverted ? '#FFFFFF' : '#111827'}
        />
        {/* Inner Blue Parallelogram Accent */}
        <path
          d="M86 14L62 60H46L70 14H86Z"
          fill="#0071E3"
        />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: `${Math.round(height * 0.72)}px`,
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: inverted ? '#FFFFFF' : '#111827',
          }}
        >
          CAELIX
        </span>
        {showTagline && (
          <span
            style={{
              fontSize: `${Math.max(10, Math.round(height * 0.28))}px`,
              fontWeight: 500,
              color: inverted ? '#A1A1A6' : 'var(--color-muted)',
              marginTop: '3px',
              letterSpacing: '0.01em',
            }}
          >
            Think Beyond. Grow Beyond.
          </span>
        )}
      </div>
    </div>
  );
};
