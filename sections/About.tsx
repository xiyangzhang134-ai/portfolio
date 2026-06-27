"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ADVANTAGES } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/**
 * About — 个人简介模块
 * 你好，我是张熙洋 + 背景介绍 + 核心理念 + 优势卡片
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
      <div className="w-full max-w-7xl mx-auto space-y-20 md:space-y-28">
        {/* ── 关于我 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] mb-4 font-body">
              About Me
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-none">
              <span
                style={{
                  background: "linear-gradient(135deg, #FFF6FB, #FFB7D5, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                关于我
              </span>
            </h2>
          </motion.div>

          {/* RIGHT — 个人介绍 */}
          <motion.div
            className="space-y-6"
            variants={fadeUpStaggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p
              className="text-white/50 text-base md:text-lg leading-relaxed font-body"
              variants={fadeUp}
            >
              你好，我是张熙洋。
            </motion.p>
            <motion.p
              className="text-white/35 text-sm md:text-base leading-relaxed font-body"
              variants={fadeUp}
            >
              目前是一名大专毕业生，专业是关务与外贸服务。
              <br />
              虽然不是设计专业出身，但我一直保持着对品牌设计、广告创意和视觉表达的热爱。
            </motion.p>
            <motion.p
              className="text-white/35 text-sm md:text-base leading-relaxed font-body"
              variants={fadeUp}
            >
              我持续学习品牌视觉、UI设计、AI设计工具以及商业策划，
              希望成为一名兼具创意、美学与商业思维的设计师。
            </motion.p>
            <motion.blockquote
              className="border-l-2 border-[#8B5CF6]/40 pl-4 text-white/50 text-sm md:text-base font-body italic"
              variants={fadeUp}
            >
              <p>
                好的设计，不只是让作品变得好看，
                <br />
                更能够帮助品牌被用户记住。
              </p>
            </motion.blockquote>
          </motion.div>
        </div>

        {/* ── 我的优势 ── */}
        <div className="space-y-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#FFB7D5] mb-4 font-body">
              Strengths
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-blue">
              我的优势
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={fadeUpStaggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {ADVANTAGES.map((adv, i) => (
              <motion.div
                key={adv.title}
                className="glass-card p-6 md:p-8 flex flex-col gap-4 group"
                variants={fadeUp}
                custom={i}
              >
                <span className="text-3xl">{adv.emoji}</span>
                <h3 className="text-sm md:text-base font-display font-semibold text-white/80">
                  {adv.title}
                </h3>
                <p className="text-xs md:text-sm text-white/35 font-body leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
