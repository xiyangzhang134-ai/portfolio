"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import CyberpunkScene from "@/components/hero/CyberpunkScene";
import CharacterStage from "@/components/hero/CharacterStage";
import HeroText from "@/components/hero/HeroText";
import { fadeUp } from "@/animations/variants";
import { useLenis } from "@/components/layout/LenisScrollContext";

/**
 * Hero — Cyberpunk + Apple minimalism.
 * Left/center: character with cyberpunk background.
 * Right/bottom: typewriter text reveal.
 */
export default function Hero() {
  const [animPhase, setAnimPhase] = useState<"idle" | "morphing" | "waving">("idle");
  const { lenis } = useLenis();

  const scrollToSection = useCallback(
    (href: string) => {
      const target = document.querySelector(href) as HTMLElement | null;
      if (target && lenis) {
        lenis.scrollTo(target, { offset: 0 });
      }
    },
    [lenis],
  );

  return (
    <section
      id="home"
      className="relative h-dvh w-full overflow-hidden flex items-center"
    >
      {/* Cyberpunk canvas background */}
      <CyberpunkScene />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E')",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Layout: vertical stack on mobile, horizontal split on desktop */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-0">
        {/* Left: Character Stage */}
        <div className="relative w-full md:w-[55%] lg:w-[50%] h-[55vh] md:h-full flex items-center justify-center order-1 md:order-none">
          <CharacterStage onPhaseChange={setAnimPhase} />
        </div>

        {/* Right: Text — positioned bottom on mobile, center-right on desktop */}
        <div className="relative w-full md:w-[45%] lg:w-[50%] flex items-center justify-start md:justify-end order-2 md:order-none pb-4 md:pb-0 md:pr-0 lg:pr-8">
          <motion.div
            className="w-full max-w-md"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <HeroText onScrollTo={scrollToSection} />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 z-[2] pointer-events-none bg-gradient-to-t from-[#0D1117]/60 to-transparent" />

      {/* Scroll indicator */}
      {animPhase === "waving" && (
        <motion.div
          className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-20 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-body">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-7 bg-gradient-to-b from-white/25 to-transparent"
            animate={{ scaleY: [1, 1.6, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  );
}
