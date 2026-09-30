'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { easeOut, fadeUp, staggerChildren } from "@/lib/motion";

// Convert to WebP in image optimization
const designs = [
  "/designs/1.webp",
  "/designs/2.webp",
  "/designs/3.webp",
  "/designs/4.webp",
  "/designs/5.webp",
  "/designs/6.webp",
  "/designs/7.webp",
  "/designs/8.webp",
  "/designs/9.webp",
  "/designs/10.webp",
  "/designs/11.webp",
  "/designs/12.webp",
  "/designs/13.webp",
  "/designs/14.webp",
  "/designs/15.webp",
  "/designs/16.webp",
  "/designs/17.webp",
  "/designs/18.webp",
  "/designs/19.webp",
  "/designs/20.webp",
  "/designs/21.webp",
  "/designs/22.webp",
];

export default function Hero() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 8 });
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Delay marquee mount to prioritize above-the-fold content
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Virtualize marquee - only render visible images
  useEffect(() => {
    if (!mounted || !trackRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleRange((prev) => ({
              start: Math.min(prev.start, index),
              end: Math.max(prev.end, index + 1),
            }));
          }
        });
      },
      { rootMargin: '200px' }
    );

    const images = trackRef.current.querySelectorAll('[data-index]');
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [mounted]);

  return (
     <div className="flex pt-36 flex-col max-w-304 w-full mx-auto px-7 justify-center">
      <motion.div
        className="flex flex-col"
        variants={staggerChildren(0.12)}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-3xl sm:text-4xl font-bold text-base"
        >
          hey, i'm
          <Image
            src="/tayo.webp"
            alt="logo"
            width={40}
            height={40}
            priority
            className="size-10 border-3 border-white rounded-xl shadow-[0px_6px_6px_0px_#00000015,inset_0_0_14px_#000000] inline -rotate-7 mx-2"
          />
          tayo.
        </motion.h1>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-3xl sm:text-4xl font-bold text-base mt-2"
        >
          a product designer and engineer.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mt-3 text-base/50 text-[15px] font-medium"
        >
          i build stuff and would like to build for you too.
        </motion.p>
        <motion.button
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeOut }}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="serif py-3 px-4 min-h-11 rounded-[13px] text-[18px] shimmer-btn hover:scale-105 transition-all duration-300 font-bold mt-7 cursor-pointer text-light bg-base shadow-lg shadow-base/10 w-fit"
        >
          welcome to my world
        </motion.button>
      </motion.div>

      {/* Carousel — delayed mount and lazy-loaded images */}
      {mounted && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
          className="mt-12 relative overflow-hidden w-[calc(100%+3.5rem)] -mx-7 py-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 50%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 50%, transparent 100%)",
          }}
        >
          <div ref={trackRef} className="flex w-max marquee-track">
            {[...designs, ...designs].map((src, i) => {
              const isInRange = i >= visibleRange.start - 2 && i <= visibleRange.end + 2;
              
              return (
                <div
                  key={i}
                  data-index={i}
                  className="h-44 sm:h-56 md:h-72 w-auto mx-2 flex items-center"
                  style={{ minWidth: isInRange ? 'auto' : '200px' }}
                >
                  {isInRange ? (
                    <Image
                      src={src}
                      alt="design"
                      width={600}
                      height={800}
                      loading="lazy"
                      quality={75}
                      onClick={() => setSelected(src)}
                      className="h-44 sm:h-56 md:h-72 w-auto border-4 sm:border-8 border-white rounded-2xl sm:rounded-3xl shadow-[15px_15px_15px_0px_#00000015,inset_0_0_14px_#000000] cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-44 sm:h-56 md:h-72 w-[150px] border-4 sm:border-8 border-white rounded-2xl sm:rounded-3xl bg-gray-100" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Fullscreen modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 min-w-11 min-h-11 flex items-center justify-center text-white text-xl leading-none hover:opacity-60 transition-opacity"
          >
            ✕
          </button>
          <Image
            src={selected}
            alt="design full view"
            width={1600}
            height={1600}
            quality={90}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full w-auto rounded-2xl shadow-2xl cursor-default"
          />
        </div>
      )}

      <style jsx global>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
