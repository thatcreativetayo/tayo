// Shared motion utilities for Framer Motion
// Centralized to reduce duplication

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeSoft = [0.25, 0.46, 0.45, 0.94] as const;

export const viewportOnce = { once: true, margin: "-80px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const staggerChildren = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const sectionTransition = (delay = 0) => ({
  duration: 0.7,
  ease: easeOut,
  delay,
});
