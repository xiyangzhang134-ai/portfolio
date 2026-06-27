"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AI_PROJECTS } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/** AI Projects — 3 cards with expand/collapse on click */
export default function AIProjects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section ref={ref} id="ai-projects" className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24">
      <div className="w-full max-w-5xl mx-auto space-y-16">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">Projects</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient">AI 实践项目</h2>
        </motion.div>

        <motion.div className="space-y-6 md:space-y-8" variants={fadeUpStaggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {AI_PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.title}
              className="glass-card overflow-hidden cursor-pointer group"
              variants={fadeUp}
              custom={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-3xl md:text-4xl shrink-0">{proj.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8FD3FF] mb-1 font-body">{proj.tagline}</p>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white/85">{proj.title}</h3>
                  <p className="text-sm text-white/35 font-body mt-1">{proj.desc}</p>
                </div>
                <motion.span
                  className="text-white/20 text-lg shrink-0"
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▾
                </motion.span>
              </div>

              {/* Expand details */}
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    className="px-6 pb-6 md:px-8 md:pb-8 space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={`h-[1px] bg-gradient-to-r ${proj.color} mb-4`} />
                    <ul className="space-y-1.5">
                      {proj.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-white/40 font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/50 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
