'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const TRAIL_COUNT = 4; // Reduced from 8 to 4 for better performance
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable cursor animation if user prefers reduced motion
    if (reducedMotion) {
      setEnabled(false);
      return;
    }
    
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      // Shift trail with fewer calculations
      for (let i = TRAIL_COUNT - 1; i > 0; i--) {
        trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.35;
        trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.35;
      }
      trail.current[0].x += (pos.current.x - trail.current[0].x) * 0.45;
      trail.current[0].y += (pos.current.y - trail.current[0].y) * 0.45;

      // Main dot - use translate3d for GPU acceleration
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
      }

      // Trail dots - use translate3d and batch updates
      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        const scale = 1 - (i / TRAIL_COUNT) * 0.75;
        const opacity = 1 - (i / TRAIL_COUNT) * 0.85;
        el.style.transform = `translate3d(${trail.current[i].x - 4}px, ${trail.current[i].y - 4}px, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none size-3 rounded-full bg-base"
        style={{ willChange: 'transform' }}
      />
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailsRef.current[i] = el; }}
          className="fixed top-0 left-0 z-[9998] pointer-events-none size-3 rounded-full bg-base"
          style={{ willChange: 'transform, opacity' }}
        />
      ))}
    </>
  );
}
