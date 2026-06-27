"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/**
 * CharacterStage — dual-image overlay with GSAP-powered sequence:
 *
 * 0.0s: standing.png fades in (opacity 0→1, scale 0.95→1)
 * 0.5s: breathing idle loop starts (CSS animation driven by JS class toggle)
 * 3.5s: morph transition begins
 *       - standing.png: scale 1→1.12, opacity 1→0, blur 0→4px
 *       - waving.png:   scale 0.88→1, opacity 0→1, blur 4→0px
 * 6.0s: waving idle — gentle hand-wave every 8s
 *
 * Mouse interaction: character tilts slightly toward cursor.
 */

interface CharacterStageProps {
  onPhaseChange?: (phase: "idle" | "morphing" | "waving") => void;
}

export default function CharacterStage({ onPhaseChange }: CharacterStageProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const standingRef = useRef<HTMLImageElement>(null!);
  const wavingRef = useRef<HTMLImageElement>(null!);
  const wavingArmRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const waveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [breathing, setBreathing] = useState(false);

  /* Follow mouse */
  const mx = useRef(0);
  const my = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = (e.clientX / window.innerWidth - 0.5) * 10;
      my.current = (e.clientY / window.innerHeight - 0.5) * 6;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `perspective(800px) rotateY(${mx.current}deg) rotateX(${-my.current}deg)`;
    };
    const raf = () => { tick(); requestAnimationFrame(raf); };
    const id = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  /* GSAP Timeline */
  useEffect(() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });

    // Set initial states
    tl.set(wavingRef.current, { opacity: 0, scale: 0.88, filter: "blur(4px)" });
    tl.set(standingRef.current, { opacity: 0, scale: 0.95 });

    // Phase 0: standing fades in
    tl.to(standingRef.current, { opacity: 1, scale: 1, duration: 0.7 }, 0);

    // Phase 1: breathing starts
    tl.call(() => {
      setBreathing(true);
      onPhaseChange?.("idle");
    }, undefined, 0.7);

    // Phase 2: morph at 3.5s
    tl.to(standingRef.current, {
      scale: 1.12,
      opacity: 0,
      filter: "blur(3px)",
      duration: 1.8,
      ease: "power2.inOut",
    }, 3.5);

    tl.to(wavingRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power2.inOut",
    }, 3.55);

    tl.call(() => {
      setBreathing(false);
      onPhaseChange?.("morphing");
    }, undefined, 3.5);

    tl.call(() => {
      onPhaseChange?.("waving");
    }, undefined, 5.5);

    tl.play();
    timelineRef.current = tl;

    /* Wave interval */
    waveIntervalRef.current = setInterval(() => {
      if (!wavingArmRef.current) return;
      gsap.to(wavingArmRef.current, {
        rotation: -12,
        duration: 0.4,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        transformOrigin: "top right",
      });
    }, 8000);

    return () => {
      tl.kill();
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
    };
  }, [onPhaseChange]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      {/* Standing image */}
      <img
        ref={standingRef}
        src="/portfolio/characters/standing.png"
        alt="Character standing"
        className={`absolute max-h-[70vh] w-auto object-contain pointer-events-none select-none ${breathing ? "animate-character-breathe" : ""}`}
        draggable={false}
      />

      {/* Waving image */}
      <div
        ref={wavingRef}
        className="absolute flex items-center justify-center"
        style={{ willChange: "transform, opacity, filter" }}
      >
        <div ref={wavingArmRef} style={{ willChange: "transform" }}>
          <img
            src="/portfolio/characters/waving.png"
            alt="Character waving"
            className="max-h-[70vh] w-auto object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
