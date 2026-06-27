"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AnimeGirl from "@/components/character/AnimeGirl";
import AuroraBackground from "@/components/background/AuroraBackground";
import FlowLines from "@/components/background/FlowLines";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLenis } from "@/components/layout/LenisScrollContext";
import { fadeUp, charReveal } from "@/animations/variants";

const HERO_TEXT = {
  greeting: "Hello, I am",
  name: "YOUR NAME",
  tagline: "A creator at the intersection of design, AI, and engineering — building digital experiences that feel alive.",
};

/**
 * Hero — single visual center: anime girl at 70% height.
 * Entry sequence: bg → character → text → particles (~2s).
 */
export default function Hero() {
  const [started, setStarted] = useState(false);
  const { lenis } = useLenis();

  const scrollToAbout = useCallback(() => {
    const target = document.querySelector("#about") as HTMLElement | null;
    if (target && lenis) {
      lenis.scrollTo(target, { offset: 0 });
    }
  }, [lenis]);

  useEffect(() => {
    // Kick off entry animation immediately after mount
    const timer = setTimeout(() => setStarted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
    >
      {/* ── Background layers ── */}
      {/* Aurora blobs (CSS) */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="aurora-blob"
          style={{
            width: 600,
            height: 600,
            background: "#8B5CF6",
            top: "10%",
            left: "20%",
            opacity: 0.12,
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="aurora-blob"
          style={{
            width: 500,
            height: 500,
            background: "#6D5EF8",
            bottom: "15%",
            right: "15%",
            opacity: 0.1,
          }}
          animate={{ x: [0, -30, 15, 0], y: [0, 25, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="aurora-blob"
          style={{
            width: 350,
            height: 350,
            background: "#FFB7D5",
            top: "50%",
            left: "50%",
            opacity: 0.08,
          }}
          animate={{ x: [0, 25, -15, 0], y: [0, 20, -25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="aurora-blob"
          style={{
            width: 400,
            height: 400,
            background: "#8FD3FF",
            top: "5%",
            right: "5%",
            opacity: 0.06,
          }}
          animate={{ x: [0, -20, 10, 0], y: [0, 15, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Three.js particles */}
      <AuroraBackground />

      {/* Flow lines */}
      <FlowLines />

      {/* ── Character — absolute center ── */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="h-[70vh] aspect-[2/3] relative">
          <AnimeGirl delay={0.5} />
        </div>
      </motion.div>

      {/* ── Text overlay — bottom-left ── */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 lg:bottom-16 lg:left-20 z-20 max-w-lg">
        {/* Greeting */}
        <motion.h2
          className="text-sm md:text-base uppercase tracking-[0.3em] text-[#8FD3FF] mb-3 font-body"
          variants={fadeUp}
          initial="hidden"
          animate={started ? "visible" : "hidden"}
        >
          {HERO_TEXT.greeting}
        </motion.h2>

        {/* Name — char-by-char reveal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none mb-4">
          <motion.span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, #FFF6FB 0%, #FFB7D5 40%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {HERO_TEXT.name.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={charReveal}
                initial="hidden"
                animate={started ? "visible" : "hidden"}
                custom={i}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Tagline */}
        <motion.p
          className="text-sm md:text-base text-white/40 leading-relaxed font-body max-w-xs mb-6"
          variants={fadeUp}
          initial="hidden"
          animate={started ? "visible" : "hidden"}
          custom={6}
        >
          {HERO_TEXT.tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={started ? "visible" : "hidden"}
          custom={8}
        >
          <MagneticButton onClick={scrollToAbout}>
            Explore
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-6 right-8 z-20 flex flex-col items-center gap-1"
        variants={fadeUp}
        initial="hidden"
        animate={started ? "visible" : "hidden"}
        custom={10}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-body">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
