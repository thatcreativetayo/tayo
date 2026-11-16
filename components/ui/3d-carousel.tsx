"use client";

import Image from "next/image";
import {
  AnimatePresence,
  animate as animateValue,
  motion,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";

interface ThreeDPhotoCarouselProps {
  cards: string[];
  className?: string;
}

const isServer = typeof window === "undefined";

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (isServer) return;

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function ThreeDPhotoCarousel({ cards, className }: ThreeDPhotoCarouselProps) {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isSmallScreen ? 1100 : 1800;
  const rotation = useMotionValue(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  if (cards.length === 0) return null;

  const faceWidth = cylinderWidth / cards.length;
  const radius = cylinderWidth / (2 * Math.PI);

  const handlePan = (_: MouseEvent | TouchEvent | PointerEvent, info: { delta: { x: number } }) => {
    rotation.set(rotation.get() + info.delta.x * 0.12);
  };

  const handlePanEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { velocity: { x: number } }) => {
    animateValue(rotation, rotation.get() + info.velocity.x * 0.06, {
      type: "spring",
      stiffness: 100,
      damping: 30,
      mass: 0.1,
    });
  };

  return (
    <>
      <div
        className={`relative h-[360px] w-full overflow-hidden sm:h-[430px] ${className ?? ""}`}
        aria-label="Interactive 3D portfolio carousel"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ perspective: "1000px", perspectiveOrigin: "50% 45%" }}
        >
          <motion.div
            className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
            style={{
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
              touchAction: "pan-y",
            }}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            {cards.map((image, index) => (
              <motion.button
                key={`${image}-${index}`}
                type="button"
                aria-label={`View portfolio image ${index + 1}`}
                className="absolute top-1/2 flex h-[230px] origin-center items-center justify-center rounded-xl p-1.5 sm:h-[270px]"
                style={{
                  width: faceWidth,
                  marginLeft: -faceWidth / 2,
                  left: "50%",
                  transform: `rotateY(${index * (360 / cards.length)}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
                onClick={() => setActiveCard(index)}
              >
                <motion.div
                  layoutId={`carousel-image-${index}`}
                  className="relative h-full w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  initial={{ filter: "blur(4px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Image
                    src={image}
                    alt={`Portfolio design ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 140px, 220px"
                    quality={75}
                    className="pointer-events-none object-cover"
                  />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeCard !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              layoutId={`carousel-image-${activeCard}`}
              className="relative h-[min(80vh,700px)] w-[min(90vw,900px)] overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={cards[activeCard]}
                alt={`Portfolio design ${activeCard + 1}`}
                fill
                sizes="90vw"
                quality={75}
                className="object-contain"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setActiveCard(null)}
              aria-label="Close portfolio image"
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { ThreeDPhotoCarousel };
