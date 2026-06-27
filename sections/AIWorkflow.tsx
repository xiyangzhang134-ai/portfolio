"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AI_WORKFLOW } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/**
 * AIWorkflow — vertical 8-step process with connecting line.
 */
export default function AIWorkflow() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="workflow"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-3xl mx-auto space-y-16">
        {/* Heading */}
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">
            Workflow
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-blue">
            我的 AI 设计工作流
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative space-y-0"
          variants={fadeUpStaggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8B5CF6]/60 via-[#FFB7D5]/40 to-[#8FD3FF]/20" />

          {AI_WORKFLOW.map((step, i) => (
            <motion.div
              key={step}
              className="relative flex items-center gap-6 md:gap-10 py-5 md:py-7 pl-14 md:pl-20 group"
              variants={fadeUp}
              custom={i}
            >
              {/* Step dot */}
              <div className="absolute left-4 md:left-[26px] w-5 h-5 rounded-full border-2 border-[#8B5CF6] bg-[#0D1117] z-10 group-hover:bg-[#8B5CF6] group-hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all duration-400" />

              {/* Step number */}
              <span className="text-xs text-white/15 font-display font-bold min-w-[2rem]">
                {(i + 1).toString().padStart(2, "0")}
              </span>

              {/* Step content */}
              <div className="flex-1">
                <p className="text-base md:text-lg font-body text-white/60 group-hover:text-white/90 transition-colors duration-300">
                  {step}
                </p>
              </div>

              {/* Arrow between steps */}
              {i < AI_WORKFLOW.length - 1 && (
                <span className="absolute left-[22px] md:left-[29px] top-16 md:top-[4.5rem] text-[#8B5CF6]/30 text-xs">
                  ↓
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
