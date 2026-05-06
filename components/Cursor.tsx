'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const TRAIL_COUNT = 8;
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      // Shift trail — each segment follows the one before it
      for (let i = TRAIL_COUNT - 1; i > 0; i--) {
        trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.35;
        trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.35;
      }
      trail.current[0].x += (pos.current.x - trail.current[0].x) * 0.45;
      trail.current[0].y += (pos.current.y - trail.current[0].y) * 0.45;

      // Main dot follows cursor tightly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }

      // Trail dots
      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        const scale = 1 - (i / TRAIL_COUNT) * 0.75;
        const opacity = 1 - (i / TRAIL_COUNT) * 0.85;
        el.style.transform = `translate(${trail.current[i].x - 4}px, ${trail.current[i].y - 4}px) scale(${scale})`;
        el.style.opacity = String(opacity);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
