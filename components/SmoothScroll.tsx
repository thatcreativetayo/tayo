'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip smooth scroll entirely for accessibility
      return;
    }

    // Dynamically import Lenis only when needed
    let lenis: any;
    let rafId: number;

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 0.8, // Reduced from 1.2s for better perceived performance
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
