
"use client";

import Image from "next/image";
import { useState } from "react";

interface PortfolioCarouselProps {
  items: string[];
}

export default function PortfolioCarousel({
  items,
}: PortfolioCarouselProps) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!items.length) return null;

  const renderCards = (group: number) =>
    items.map((src, index) => {
      const position =
        items.length === 1
          ? 0
          : (index / (items.length - 1)) * 2 - 1;

      const distance = Math.abs(position);

      const height = Math.round(205 + distance * 175);
      const rotation = -14 * position;

      return (
        <button
          key={`${group}-${src}-${index}`}
          type="button"
          aria-label={`Preview portfolio design ${index + 1}`}
          onClick={() => setSelected(src)}
          className="hero-carousel-card group relative shrink-0 overflow-hidden rounded-[11px] border border-black/70 bg-white"
          style={{
            height: `min(${height}px, 90%)`,
            width: "clamp(105px, 12vw, 155px)",
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <Image
            src={src}
            alt={`Portfolio design ${index + 1}`}
            fill
            priority={index < 3}
            sizes="(max-width: 640px) 105px, 12vw"
            quality={85}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </button>
      );
    });

  return (
    <>
      <section
        className="hero-carousel relative mt-8 h-[420px] w-full overflow-hidden sm:mt-10"
        aria-label="Portfolio gallery"
      >
        <div className="hero-carousel-track absolute inset-y-0 left-0 flex w-max items-center">
          <div className="hero-carousel-group flex h-full shrink-0 items-center gap-[10px] pr-[10px]">
            {renderCards(0)}
          </div>

          <div
            className="hero-carousel-group flex h-full shrink-0 items-center gap-[10px] pr-[10px]"
            aria-hidden="true"
          >
            {renderCards(1)}
          </div>
        </div>
      </section>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio design preview"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close preview"
            className="absolute right-6 top-6 z-10 rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
          >
            Close ✕
          </button>

          <div
            className="relative h-[85vh] w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Selected portfolio design"
              fill
              sizes="90vw"
              quality={95}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
