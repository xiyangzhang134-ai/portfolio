import type { Variants, Transition } from "framer-motion";
import { EASE, SPRING } from "@/lib/constants";

/* ─── Fade up (stagger container children naturally) ─── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE.outExpo, delay: i * 0.06 },
  }),
};

export const fadeUpStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ─── Scale + fade (for character entry) ─── */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE.outExpo },
  },
};

/* ─── Character-by-character reveal ─── */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 24, rotateZ: 4 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: {
      duration: 0.5,
      ease: EASE.outExpo,
      delay: i * 0.03,
    },
  }),
};

/* ─── From above (for nav) ─── */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.outExpo } },
};

/* ─── Card hover tilt ─── */
export const cardTilt: Variants = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: { scale: 1.02, transition: SPRING.default },
};

/* ─── Line draw (SVG) ─── */
export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.6,
    transition: { duration: 2, ease: EASE.inOutExpo },
  },
};
