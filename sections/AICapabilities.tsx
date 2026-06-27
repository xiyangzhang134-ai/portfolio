"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AI_CAPABILITIES } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/** AI Capabilities — Apple-style 4 cards with emoji icons */
export default function AICapabilities() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} id="ai-capabilities" className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24">
      <div className="w-full max-w-6xl mx-auto space-y-16">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">AI Capabilities</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient">我的 AI 能力</h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" variants={fadeUpStaggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {AI_CAPABILITIES.map((cap, i) => (
            <motion.div key={cap.title} className="glass-card p-6 md:p-8 flex flex-col gap-4 group" variants={fadeUp} custom={i}>
              <motion.span className="text-4xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
                {cap.icon}
              </motion.span>
              <h3 className="text-sm md:text-base font-display font-semibold text-white/80">{cap.title}</h3>
              <p className="text-xs md:text-sm text-white/35 font-body leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
