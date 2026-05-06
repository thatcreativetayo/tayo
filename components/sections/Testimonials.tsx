'use client';
import { useState } from "react";
import { motion } from "framer-motion";

// ─── data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "Working with AjaNwachuku has been a joy. He understands design and how to apply it. He just gets it.",
    name: "Josh Chibueze",
    role: "Co-Founder & CMO, Piggyvest",
  },
  {
    quote: "The attention to detail in every pixel was unlike anything I've worked with before.",
    name: "Amara Obi",
    role: "Head of Product, Risevest",
  },
  {
    quote: "Delivered end-to-end in record time. Didn't just execute — he improved the brief.",
    name: "Temi Ade",
    role: "Founder, Fliqpay",
  },
  {
    quote: "He brings a rare mix of taste and technical fluency. The product shipped better than we imagined.",
    name: "Kola Aina",
    role: "CTO, Cowrywise",
  },
  {
    quote: "Every screen felt intentional. He has a gift for making complex flows feel effortless.",
    name: "Sade Fawehinmi",
    role: "CPO, Brass",
  },
  {
    quote: "I've worked with many designers. Aja is the one I'd call first for anything that matters.",
    name: "Emeka Eze",
    role: "CEO, Mono",
  },
];

// ─── FlipCard ─────────────────────────────────────────────────────────────────

function FlipCard({
  quote,
  name,
  role,
  index,
}: {
  quote: string;
  name: string;
  role: string;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "300px",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.40s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(-180deg)" : undefined,
        }}
        className={!flipped ? "group-hover:[transform:rotateY(-180deg)]" : ""}
      >
        {/* Front — blank */}
        <div
          className="absolute border border-base/5 inset-0 bg-[#F5F5F5] rounded-3xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        />

        {/* Back — review */}
        <div
          className="absolute inset-0 border border-base/5 shadow-xl shadow-base/3 bg-white flex flex-col rounded-3xl justify-between p-8"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            minHeight: "260px",
          }}
        >
          <p className="text-base text-lg leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="pt-5 mt-4">
            <h1 className="text-base text-sm font-bold">{name}</h1>
            <p className="text-base/40 text-xs mt-0.5">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section className="flex flex-col items-center px-6 py-20 gap-12">

      {/* Header */}
      <motion.div 
        className="text-center max-w-3xl flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
      <h1 className="text-base text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          Hear from the people I&apos;ve worked with.
        </h1>
      </motion.div>

      {/* Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <FlipCard key={i} index={i} {...t} />
        ))}
      </div>

    </section>
  );
}