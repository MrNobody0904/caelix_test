import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useReveal } from '../../hooks/useReveal';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Who is Caelix for?',
    answer:
      'Caelix is engineered specifically for early-stage startups and lean teams of 3 to 30 people. It gives founders, engineers, designers, and operators a unified operating system that tracks people, sprint tasks, and external growth projects without the complexity and cost of heavy enterprise HCM software.',
  },
  {
    question: 'Can I start with only Workforce?',
    answer:
      'Yes, absolutely. Workforce is our foundational core software and is free forever for teams up to 5 members. You can organize your startup hierarchy, define member roles, and run sprint boards today—and add Growth services or the Talent pilot only when you need them.',
  },
  {
    question: 'How do Growth services work?',
    answer:
      'Unlike disconnected agencies that require separate Trello boards and confusing email threads, Caelix connects vetted growth specialists (web developers, SEO strategists, brand designers) directly to your workspace. Deliverables, feedback iterations, and approvals appear right beside your internal sprint tasks with fixed-fee transparency.',
  },
  {
    question: 'Is my team data private?',
    answer:
      'Completely private. Caelix enforces strict tenant isolation, encrypted data storage (TLS 1.3 in transit and AES-256 at rest), and granular role-based permissions. Your proprietary project details and employee information are never used to train public third-party AI models.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no lock-in contracts. You can upgrade, downgrade, or cancel your subscription at any time directly from your billing settings. You can also export your organization data, task history, and member records in standard CSV or JSON format at any point.',
  },
];

export const Faq: React.FC = () => {
  const containerRef = useReveal({ stagger: 0.08 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (index: number) => {
    const isCurrentOpen = openIndex === index;
    const prevIndex = openIndex;

    // Close previously open item with GSAP
    if (prevIndex !== null && contentRefs.current[prevIndex]) {
      gsap.to(contentRefs.current[prevIndex], {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: 'power3.in',
      });
    }

    if (isCurrentOpen) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      const targetEl = contentRefs.current[index];
      if (targetEl) {
        gsap.fromTo(
          targetEl,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
        );
      }
    }
  };

  return (
    <section id="faq" className="section section-light" ref={containerRef}>
      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge-blue reveal" style={{ marginBottom: '16px' }}>
            Got Questions?
          </span>
          <h2 className="reveal" style={{ marginBottom: '16px' }}>
            Frequently Asked Questions
          </h2>
          <p className="reveal" style={{ fontSize: '18px', color: 'var(--color-muted)' }}>
            Everything you need to know about Caelix, our modular products, and our data architecture.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="card reveal"
                style={{
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  border: isOpen ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-dark)' }}>
                    {faq.question}
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? '#EBF5FF' : '#F5F5F7',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                  }}
                >
                  <p
                    style={{
                      paddingTop: '16px',
                      fontSize: '15px',
                      lineHeight: 1.65,
                      color: 'var(--color-muted)',
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
