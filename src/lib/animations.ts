import { Variants } from "framer-motion";

// Luxury ease curve: easeOutExpo / cubic-bezier
export const LUXURY_EASE = [0.16, 1, 0.3, 1];

export const fadeIn = (duration = 0.8, delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: LUXURY_EASE }
  }
});

export const fadeUp = (yOffset = 30, duration = 0.8, delay = 0): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: LUXURY_EASE }
  }
});

export const fadeDown = (yOffset = -30, duration = 0.8, delay = 0): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: LUXURY_EASE }
  }
});

export const fadeLeft = (xOffset = 30, duration = 0.8, delay = 0): Variants => ({
  hidden: { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: LUXURY_EASE }
  }
});

export const fadeRight = (xOffset = -30, duration = 0.8, delay = 0): Variants => ({
  hidden: { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: LUXURY_EASE }
  }
});

export const scaleUp = (scaleStart = 0.95, duration = 0.8, delay = 0): Variants => ({
  hidden: { opacity: 0, scale: scaleStart },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, delay, ease: LUXURY_EASE }
  }
});

export const staggerContainer = (staggerChildren = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const letterReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: LUXURY_EASE }
  }
};

export const wordReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 1, ease: LUXURY_EASE }
  }
};

export const lineReveal = (duration = 1, delay = 0): Variants => ({
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration, delay, ease: LUXURY_EASE }
  }
});

export const navMenuVariants: Variants = {
  hidden: { opacity: 0, y: -20, pointerEvents: "none" },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.5, ease: LUXURY_EASE }
  },
  exit: {
    opacity: 0,
    y: -20,
    pointerEvents: "none",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  }
};
