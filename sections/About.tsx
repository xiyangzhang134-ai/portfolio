"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCounter } from "@/hooks/useCounter";
import { STATS } from "@/lib/constants";
import { fadeUp, fadeUpStaggerContainer } from "@/animations/variants";

/**
 * About — Apple-style layout.
 * Left: huge heading. Right: description + animated stat counters.
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* LEFT — big title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#8FD3FF] mb-4 font-body">
            Who I am
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-none">
            <span
              style={{
                background: "linear-gradient(135deg, #FFF6FB, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              I craft
              <br />
              digital
              <br />
              worlds.
            </span>
          </h2>
        </motion.div>

        {/* RIGHT — description + counters */}
        <motion.div
          className="space-y-12"
          variants={fadeUpStaggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            className="text-white/50 text-base md:text-lg leading-relaxed font-body max-w-md"
            variants={fadeUp}
          >
            Born at the intersection of engineering and aesthetics. I build products
            that feel alive — blending AI, motion design, and obsessive attention to
            every pixel. From trading engines to design systems, the through-line is
            always: <em className="text-white/70">make it extraordinary</em>.
          </motion.p>

          {/* Stat counters */}
          <motion.div
            className="grid grid-cols-2 gap-x-12 gap-y-8"
            variants={fadeUp}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-4xl md:text-5xl font-display font-black text-gradient">
                  <StatCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-white/30 font-body">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Animated number counter using requestAnimationFrame + easeOutExpo */
function StatCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const ref = useCounter(target, 2.2);
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span ref={ref}>0</span>
      <span className="text-lg text-[#8B5CF6]">{suffix}</span>
    </span>
  );
}
