import { useState, useEffect } from 'react';
import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { Problem } from './components/Problem/Problem';
import { ConnectedRecord } from './components/ConnectedRecord/ConnectedRecord';
import { Showcase } from './components/Showcase/Showcase';
import { Growth } from './components/Growth/Growth';
import { Talent } from './components/Talent/Talent';
import { Trust } from './components/Trust/Trust';
import { Pricing } from './components/Pricing/Pricing';
import { Faq } from './components/Faq/Faq';
import { Cta } from './components/Cta/Cta';
import { Footer } from './components/Footer/Footer';
import { ContactModal } from './components/common/ContactModal';
import { TourModal } from './components/common/TourModal';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  // Initialize smooth scrolling with Lenis & ScrollTrigger sync
  useLenis();

  const [contactOpen, setContactOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('Talk to us');
  const [tourOpen, setTourOpen] = useState(false);

  const handleOpenContact = (topic: string = 'Talk to us') => {
    setContactTopic(topic);
    setContactOpen(true);
  };

  // Refresh ScrollTrigger after initial mount and font rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="caelix-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Sticky Navigation */}
      <Nav onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* 2. Hero Section with 3D Constellation & HTML/CSS Dashboard Mockup */}
        <Hero
          onOpenTour={() => setTourOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* 3. Problem Section */}
        <Problem />

        {/* 4. One Connected Record */}
        <ConnectedRecord />

        {/* 5. Workforce Showcase (Pinned interactive demo) */}
        <Showcase />

        {/* 6. Growth Services */}
        <Growth onOpenContact={handleOpenContact} />

        {/* 7. Talent Teaser & Waitlist */}
        <Talent />

        {/* 8. Trust and Responsible AI */}
        <Trust />

        {/* 9. Pricing */}
        <Pricing onOpenContact={handleOpenContact} />

        {/* 10. FAQ Accordion */}
        <Faq />

        {/* 11. Final CTA */}
        <Cta onOpenContact={handleOpenContact} />
      </main>

      {/* 12. Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultTopic={contactTopic}
      />

      <TourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
      />
    </div>
  );
}
