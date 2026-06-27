"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/constants";
import { fadeUp } from "@/animations/variants";

/**
 * SectionHeading — large title with gradient text, used across sections.
 */
export default function SectionHeading({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.h2
      className={cn(
        "font-display text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight",
        className,
      )}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      custom={delay}
    >
      {children}
    </motion.h2>
  );
}
