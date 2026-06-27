"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AI_TOOLS } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/** AI Tools — Apple-style Logo wall with click-to-reveal details */
export default function AITools() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section ref={ref} id="ai-tools" className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24">
      <div className="w-full max-w-5xl mx-auto space-y-16">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">Tools</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-blue">我每天使用的 AI 工具</h2>
        </motion.div>

        {/* Logo wall */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6" variants={fadeUpStaggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {AI_TOOLS.map((tool, i) => (
            <motion.button
              key={tool.name}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`glass-card p-5 md:p-6 flex flex-col items-center gap-3 cursor-pointer group transition-all duration-400 ${
                selected === i ? "border-[#8B5CF6]/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]" : ""
              }`}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.04, y: -2 }}
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
              <span className="text-xs md:text-sm font-display font-semibold text-white/60 group-hover:text-white/90 transition-colors duration-300">{tool.name}</span>

              {/* Expandable detail */}
              <AnimatePresence>
                {selected === i && (
                  <motion.p
                    className="text-[11px] md:text-xs text-white/35 font-body leading-relaxed text-center"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tool.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
