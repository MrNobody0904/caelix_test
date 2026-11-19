// Reactive state store for synchronized 3D & GSAP scroll interactions

type Listener = () => void;

interface ScrollState {
  scrollY: number;
  heroConvergence: number; // 0 (floating) to 1 (settled behind mockup)
  recordProgress: number;   // 0 to 1 for Section 4 line & nodes
  activeRecordNode: number; // 0 = Workforce, 1 = Growth, 2 = Talent
  activeShowcaseStep: number; // 0 to 3 for Section 5
  isReducedMotion: boolean;
}

const state: ScrollState = {
  scrollY: 0,
  heroConvergence: 0,
  recordProgress: 0,
  activeRecordNode: 0,
  activeShowcaseStep: 0,
  isReducedMotion: typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false,
};

const listeners = new Set<Listener>();

export const scrollStore = {
  getState: () => state,
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  setState: (partial: Partial<ScrollState>) => {
    Object.assign(state, partial);
    listeners.forEach((l) => l());
  },
};
