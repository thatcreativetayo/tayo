'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";
import { easeOut, fadeUp, staggerChildren } from "@/lib/motion";

const designs = [
  "/designs/1.png",

  "/designs/2.png",

  "/designs/3.png",

  "/designs/4.png",

  "/designs/5.png",

  "/designs/6.png",

  "/designs/7.png",

  "/designs/8.png",

  "/designs/9.png",

  "/designs/10.png",

  "/designs/11.png",

  "/designs/12.png",

  "/designs/13.png",

  "/designs/14.png",

  "/designs/15.png",

  "/designs/16.png",

  "/designs/17.png",

  "/designs/18.png",

  "/designs/19.png",

  "/designs/20.png",

  "/designs/21.png",

  "/designs/22.png",
];

export default function Hero() {
  const [selected, setSelected] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

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
            src="/tayo.jpg"
            alt="logo"
            width={1000}
            height={1000}
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

      {/* Carousel — break out of px-7 without forcing fixed width */}
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
        <div className="flex w-max marquee-track">
          {[...designs, ...designs].map((src, i) => (
            <Image
              key={i}
              src={src}
              alt="design"
              width={1000}
              height={1000}
              onClick={() => setSelected(src)}
              className="h-44 sm:h-56 md:h-72 w-auto border-4 sm:border-8 border-white rounded-2xl sm:rounded-3xl shadow-[15px_15px_15px_0px_#00000015,inset_0_0_14px_#000000] mx-2 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>
      </motion.div>

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
