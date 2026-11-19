import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Users, TrendingUp, Sparkles } from 'lucide-react';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOUR_STEPS = [
  {
    title: 'One Unified Workspace',
    subtitle: 'The single source of truth for early-stage startup operations',
    icon: Users,
    description:
      'Instead of fragmenting work across Notion, Trello, spreadsheets, and chat groups, Caelix gives your 3-30 person team a clean single dashboard where people, roles, tasks, and company milestones are naturally interlinked.',
    highlights: ['Org hierarchy setup in under 5 minutes', 'Role-based access: Admin, Sub-admin, Member', 'Transparent permission controls'],
    badge: 'Step 1 of 3: Workforce',
  },
  {
    title: 'Growth Services on the Same Board',
    subtitle: 'Website, SEO, and Branding without external vendor chaos',
    icon: TrendingUp,
    description:
      'Order agency-quality digital execution without leaving your operating system. Deliverables, revisions, and milestone sign-offs sit right beside your internal sprint tasks with zero context switching.',
    highlights: ['Fixed-fee predictability with no hidden scope creep', 'Direct review workflows & asset approvals', 'Real-time progress bars'],
    badge: 'Step 2 of 3: Growth',
  },
  {
    title: 'Talent & Verified Evidence',
    subtitle: 'Hire remotely with assessment-backed proof, not keyword resumes',
    icon: Sparkles,
    description:
      'When you are ready to expand, tap into vetted candidate pools evaluated on actual practical projects. When hired, their profile instantly converts into an active employee record with history and tasks intact.',
    highlights: ['Evidence-based skill benchmarks', 'Human-in-the-loop decisions (AI only assists)', 'Instant employee onboarding conversion'],
    badge: 'Step 3 of 3: Talent',
  },
];

export const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          padding: '36px',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close tour"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--color-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '16px' }}>
          <span className="badge-blue">{step.badge}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: '#F5F5F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              flexShrink: 0,
            }}
          >
            <Icon size={24} />
          </div>
          <div>
            <h3 id="tour-modal-title" style={{ fontSize: '22px' }}>
              {step.title}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>{step.subtitle}</p>
          </div>
        </div>

        <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
          {step.description}
        </p>

        <div
          style={{
            backgroundColor: '#F5F5F7',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '28px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '8px' }}>
            Key Capabilities:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {step.highlights.map((highlight, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: 'var(--color-dark)',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#EBF5FF',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step dots & navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {TOUR_STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentStep ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: i === currentStep ? 'var(--color-primary)' : 'var(--color-border)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentStep(i)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-secondary btn-sm"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((c) => Math.max(0, c - 1))}
              style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> Back
            </button>
            {currentStep < TOUR_STEPS.length - 1 ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentStep((c) => Math.min(TOUR_STEPS.length - 1, c + 1))}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={onClose}>
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
