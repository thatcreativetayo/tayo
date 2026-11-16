'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

const designs = [
  "/designs/7.webp",
  "/designs/13.webp",
  "/designs/14.webp",
  "/designs/15.webp",
  "/gallery/jordan.webp",
  "/gallery/nike.webp",
  "/gallery/bread.webp",
  "/gallery/portfolio.webp",
  "/gallery/portfolio2.webp",
  "/gallery/studi (3).webp",
  "/gallery/New Project.webp",
];

const carouselImages = designs.map((src, index) => ({
  src,
  alt: `Portfolio project ${index + 1}`,
}));

const heroTextVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full max-w-220 overflow-hidden">
      <div className="mx-auto flex flex-col px-4 pt-16 sm:px-10 sm:pt-20">
        <Image
          src="/heroimg.png"
          alt="Illustrated landscape with a tree, flowers, green hills, and blue sky"
          width={1472}
          height={828}
          priority
          className="aspect-[3.9/1] w-full rounded-md object-cover object-[center_74%]"
        />

        <motion.div
          className="mt-6 flex flex-col items-start"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h1
            variants={heroTextVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.75rem,4vw,2.1rem)] font-medium leading-[0.8] tracking-[-0.06em] text-base"
          >
            i code... <span className="text-black/35">and</span> design.
          </motion.h1>

          <motion.h2
            variants={heroTextVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-x-1.5 text-[clamp(1.25rem,6.2vw,2.1rem)] font-medium leading-[1.05] tracking-[-0.065em] text-black/35 sm:text-[clamp(1.6rem,3.8vw,2.1rem)] sm:leading-[1.15]"
          >
            <span className="inline-flex items-center gap-x-1.5 whitespace-nowrap">
              <span>a <span className="text-base">product engineer</span></span>
              <Image
                src="/codeicons.svg"
                alt="TypeScript, development tools, and GitHub"
                width={196}
                height={89}
                className="w-15 shrink-0 translate-y-1 sm:w-[clamp(5.5rem,12vw,7rem)] sm:translate-y-1.5"
              />
            </span>
            <span className="inline-flex items-center gap-x-1.5 whitespace-nowrap">
              <span className="text-black/35">&amp;</span>
              <span className="text-base">designer</span>
              <Image
                src="/designicons.svg"
                alt="Figma and design tools"
                width={196}
                height={89}
                className="w-15 shrink-0 translate-y-1 sm:w-[clamp(5.5rem,12vw,7rem)] sm:translate-y-1.5"
              />
            </span>
          </motion.h2>

          <motion.p
            variants={heroTextVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.4rem,5.8vw,2.1rem)] font-medium leading-[0.95] tracking-[-0.065em] text-black/35 sm:text-[clamp(1.55rem,3.6vw,2.1rem)] sm:leading-[0.8]"
          >
            bringing multiple ideas to life every day.
          </motion.p>

          <motion.p
            variants={heroTextVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[42rem] text-sm leading-[1.45] tracking-[-0.035em] text-black/40 sm:text-[14px]"
          >
            i enjoy getting my hands into every part of building a product, from
            figuring out the idea and shaping its experience to designing the
            interface and engineering what happens behind it. i’m always
            experimenting, learning, and finding better ways to bring things to
            life.
          </motion.p>

          <motion.a
            variants={heroTextVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            href="/#projects"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-linear-to-b from-[#2A2A2A] to-[#111111] px-6 text-[13px] font-medium text-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-all duration-300"
          >
            explore my world
          </motion.a>
        </motion.div>
      </div>

      <TiltedGridHero
        images={carouselImages}
        className="h-[300px] w-full sm:h-[360px] md:h-[420px]"
      />
    </section>
  );
}
