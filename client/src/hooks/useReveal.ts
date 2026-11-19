import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  stagger?: number;
  y?: number;
  duration?: number;
  threshold?: string;
  delay?: number;
}

export function useReveal(options: RevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const elements = containerRef.current.querySelectorAll('.reveal');
    if (!elements || elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options.y ?? 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.85,
          stagger: options.stagger ?? 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.threshold ?? 'top 85%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [options.stagger, options.y, options.duration, options.threshold]);

  return containerRef;
}
