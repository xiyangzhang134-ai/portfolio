"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";
import { STATS, SKILLS } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/**
 * About — Apple-style: oversized typography + glass skill tags + stat counters.
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
        {/* LEFT — Big title + description */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">
            About
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black leading-none">
            <span
              style={{
                background: "linear-gradient(135deg, #FFF6FB, #FFB7D5, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              创意
              <br />
              即生产力
            </span>
          </h2>
          <motion.p
            className="text-white/40 text-sm md:text-base leading-relaxed font-body max-w-md mt-8"
            variants={fadeUp}
            custom={2}
          >
            跨越品牌策略与 AI 创意的边界。<br />
            从品牌视觉系统到沉浸式数字体验，每一个项目都在探索创意与技术的共振。
          </motion.p>
        </motion.div>

        {/* RIGHT — Stats + Skill tags */}
        <motion.div
          className="space-y-12"
          variants={fadeUpStaggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Stats */}
          <motion.div className="grid grid-cols-2 gap-x-12 gap-y-8" variants={fadeUp}>
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient">
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

          {/* Skill Tags */}
          <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
            {SKILLS.map((skill) => (
              <motion.span
                key={skill.name}
                className="glass-card px-4 py-2 text-xs md:text-sm font-body text-white/60 cursor-default"
                whileHover={{ scale: 1.06, color: "rgba(255,255,255,0.9)" }}
                transition={{ duration: 0.3 }}
                style={{
                  borderColor: `${skill.color}30`,
                  boxShadow: `0 0 12px ${skill.color}15`,
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
