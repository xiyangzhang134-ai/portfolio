"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeUp } from "@/animations/variants";

/**
 * Resume — 「在线简历」with download PDF button.
 */
export default function Resume() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="resume"
      className="relative min-h-[60vh] flex items-center justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <motion.div
        className="text-center space-y-10"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] font-body">
          Resume
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black">
          <span
            style={{
              background: "linear-gradient(135deg, #FFF6FB, #FFB7D5, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            在线简历
          </span>
        </h2>

        <p className="text-white/30 text-base md:text-lg font-body max-w-md mx-auto">
          了解更多关于我的经历、技能与项目。
        </p>

        <MagneticButton
          onClick={() => {
            /* Placeholder — user can link a real PDF later */
            alert("PDF 简历即将上线，敬请期待。");
          }}
        >
          下载 PDF 简历
        </MagneticButton>
      </motion.div>
    </section>
  );
}
