"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AI_LEARNING_ROUTE } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/** AI Learning Route — timeline */
export default function AILearning() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} id="ai-learning" className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24">
      <div className="w-full max-w-2xl mx-auto space-y-16">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">Learning Route</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient">我的学习路线</h2>
        </motion.div>

        <motion.div className="relative space-y-0" variants={fadeUpStaggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8B5CF6]/40 via-[#8FD3FF]/30 to-[#FFB7D5]/20" />

          {AI_LEARNING_ROUTE.map((item, i) => (
            <motion.div key={i} className="relative flex items-center justify-center py-5 md:py-7" variants={fadeUp} custom={i}>
              {item.year === "↓" ? (
                <div className="relative z-10 bg-[#0D1117] px-4 py-1"><span className="text-[#8B5CF6]/40 text-sm">↓</span></div>
              ) : (
                <div className="relative z-10 bg-[#0D1117] px-6 py-3 rounded-2xl border border-white/[0.06] text-center max-w-xs mx-auto">
                  <p className="text-lg md:text-xl font-display font-bold text-[#8B5CF6] mb-1">{item.year}</p>
                  <p className="text-sm md:text-base text-white/50 font-body">{item.event}</p>
                </div>
              )}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#8B5CF6] bg-[#0D1117] z-[5]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
