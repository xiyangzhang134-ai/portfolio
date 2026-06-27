"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AI_OPERATIONS } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/** AI Operations Thinking — timeline: "如果让我运营一个AI产品" */
export default function AIOperations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} id="ai-operations" className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24">
      <div className="w-full max-w-3xl mx-auto space-y-16">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">Operations Thinking</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-blue">如果让我运营一个 AI 产品</h2>
        </motion.div>

        <motion.div className="relative space-y-0" variants={fadeUpStaggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8B5CF6]/60 via-[#FFB7D5]/40 to-[#8FD3FF]/20" />

          {AI_OPERATIONS.map((step, i) => (
            <motion.div key={step} className="relative flex items-center gap-6 md:gap-10 py-4 md:py-5 pl-14 md:pl-20 group" variants={fadeUp} custom={i}>
              <div className="absolute left-4 md:left-[26px] w-5 h-5 rounded-full border-2 border-[#8B5CF6] bg-[#0D1117] z-10 group-hover:bg-[#8B5CF6] group-hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all duration-400" />
              <span className="text-xs text-white/15 font-display font-bold min-w-[2rem]">{(i + 1).toString().padStart(2, "0")}</span>
              <p className="text-base md:text-lg font-body text-white/50 group-hover:text-white/85 transition-colors duration-300">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
