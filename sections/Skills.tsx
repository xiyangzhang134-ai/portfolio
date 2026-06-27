"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/**
 * Skills — star ratings, no percentages.
 * Two-column grid on desktop, single column on mobile.
 */
export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-4xl mx-auto space-y-16">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient">
            我的技能
          </h2>
        </motion.div>

        {/* Skill list */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5"
          variants={fadeUpStaggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="flex items-center justify-between py-3 border-b border-white/[0.06] group"
              variants={fadeUp}
              custom={i}
            >
              <span className="text-sm md:text-base font-body text-white/60 group-hover:text-white/80 transition-colors duration-300">
                {skill.name}
              </span>
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    className={`text-xs md:text-sm transition-all duration-300 ${
                      j < skill.stars
                        ? "text-[#8B5CF6] group-hover:drop-shadow-[0_0_4px_rgba(139,92,246,0.6)]"
                        : "text-white/10"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
