"use client";

import Image from "next/image";
import React, { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";

const photos = [
  { src: "/me/food.png", label: "fav food..." },
  { src: "/me/jos.png", label: "jos GOATED view." },
  { src: "/me/mac.png", label: "dream setup." },
  { src: "/me/me.jpg", label: "this guy just seems chill, like me." },
  { src: "/me/sun.jpg", label: "random pic of the sun." },
  { src: "/me/teejay.jpg", label: "childhood pic, lol." },
  { src: "/me/water.jpg", label: "beautiful sea view" },
  { src: "/me/meme.jpg", label: "my favourite meme." },
];

// slight fixed rotation per photo so it reads as a natural fan, not perfectly aligned
const rotations = [-10, -8, -6, -4, -1, 4, 6, 8];

const OffScreen = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection className="flex flex-col max-w-4xl w-full p-7 text-center serif text-base/50 justify-center items-center py-24">
      <motion.div
        className="text-xl sm:text-2xl md:text-3xl font-bold"
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        i build stuff,
        <Image
          src="/cursor.png"
          alt="logo"
          width={1000}
          height={1000}
          className="size-8 border-3 border-white rounded-xl shadow-[0px_6px_6px_0px_#00000015,inset_0_0_14px_#000000] inline -rotate-7 mx-1"
        />
        code mostly,
        <Image
          src="/figma.png"
          alt="logo"
          width={1000}
          height={1000}
          className="size-8 object-cover border-3 border-white rounded-xl shadow-[0px_6px_6px_0px_#00000015,inset_0_0_14px_#000000] inline -rotate-7 mx-1"
        />
        sometimes design, occasionally both at 2am for no good reason. no real
        plan to any of it, i just start and figure the rest out as i go. some of
        it ships, some of it quietly dies halfway, and that's fine, it's usually
        just me and whatever i'm working on at the time, nothing dramatic. this
        is where it all ends up eventually, the stuff that made it and the stuff
        that didn't. off the clock, I&apos;m probably rewatching an{" "}
        <Image
          src="/aot.png"
          alt=""
          width={36}
          height={36}
          className="size-8 object-cover border-3 border-white rounded-xl shadow-[0px_6px_6px_0px_#00000015,inset_0_0_14px_#000000] inline -rotate-7 mx-1"
        />{" "}
        anime arc or grinding{" "}
        <Image
          src="/fc.png"
          alt=""
          width={36}
          height={36}
          className="size-8 object-cover border-3 border-white rounded-xl shadow-[0px_6px_6px_0px_#00000015,inset_0_0_14px_#000000] inline -rotate-7 mx-1"
        />{" "}
        FC26.
      </motion.div>
      <motion.div
        className="flex w-full mt-16 flex-col"
        variants={staggerChildren(0.05, 0.1)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h1 className="serif text-2xl sm:text-3xl font-bold text-base mb-8 ml-0 sm:ml-8 text-left">
          off screen.
        </h1>
        <div className="flex w-full items-center justify-start md:justify-center overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {photos.map((photo, i) => {
            const isHovered = hovered === i;
            const anyHovered = hovered !== null;

            return (
              <div
                key={photo.src}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`
              relative bg-white p-2 pb-4 shadow-lg shrink-0
              transition-all duration-300 ease-out cursor-pointer
              ${anyHovered ? "-mx-2" : "-mx-3"}
            `}
                style={{
                  transform: isHovered
                    ? "translateY(-12px) rotate(0deg) scale(1.08)"
                    : `rotate(${rotations[i]}deg)`,
                  zIndex: isHovered ? 20 : i,
                  boxShadow: isHovered
                    ? "0 20px 30px -10px rgba(45,25,9,0.35)"
                    : "0 8px 12px -4px rgba(45,25,9,0.15)",
                }}
              >
                <div className="w-20 h-28 sm:w-24 sm:h-32 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    width={270}
                    height={360}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span
                  className={`
    absolute left-1/2 bg-light shadow-md shadow-base/10 rounded-full px-4 py-0.25 text-base/75 font-bold -translate-x-1/2 -top-10
    text-sm whitespace-nowrap hidden md:block
    transition-all duration-300 ease-out
    ${
      isHovered
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-2 pointer-events-none"
    }
  `}
                >
                  {photo.label.split("").map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className={`
        inline-block transition-all duration-200 ease-out
        ${isHovered ? "blur-0 opacity-100" : "blur-sm opacity-0"}
      `}
                      style={{
                        transitionDelay: isHovered
                          ? `${charIndex * 30}ms`
                          : "0ms",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

export default OffScreen;
