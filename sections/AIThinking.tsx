"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AI_THINKING } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/** AI Thinking — 3 quotes */
export default function AIThinking() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} id="ai-thinking" className="relative min-h-[70vh] flex items-center justify-center px-6 py-24 md:px-12 lg:px-24">
      <div className="w-full max-w-3xl mx-auto space-y-16">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">Perspective</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-blue">我的 AI 思考</h2>
        </motion.div>

        <motion.div className="space-y-6" variants={fadeUpStaggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {AI_THINKING.map((quote, i) => (
            <motion.blockquote
              key={i}
              className="glass-card p-6 md:p-8 border-l-2 border-[#8B5CF6]/50 text-base md:text-lg text-white/45 font-body leading-relaxed italic"
              variants={fadeUp}
              custom={i}
            >
              「{quote}」
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
