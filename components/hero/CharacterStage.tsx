"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * CharacterStage — cinematic morph sequence:
 *
 * 0.0s: standing.png fades in
 * 0.5s: idle loop (gentle float + subtle breathing, hair sway CSS)
 * 2.5s: cinematic morph begins
 *       Step 1 — forward translation (standing moves toward camera)
 *       Step 2 — crossfade + scale transition to waving image
 *       Step 3 — waving settles with gentle wave every 6s
 *
 * Uses GSAP timeline with custom cubic-bezier for film-like easing.
 */

interface CharacterStageProps {
  onPhaseChange?: (phase: "idle" | "morphing" | "waving") => void;
}

export default function CharacterStage({ onPhaseChange }: CharacterStageProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const standingRef = useRef<HTMLImageElement>(null!);
  const wavingRef = useRef<HTMLImageElement>(null!);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const waveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Mouse parallax */
  const mx = useRef(0);
  const my = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = (e.clientX / window.innerWidth - 0.5) * 8;
      my.current = (e.clientY / window.innerHeight - 0.5) * 5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const raf = () => {
      if (containerRef.current) {
        containerRef.current.style.transform =
          `perspective(800px) rotateY(${mx.current}deg) rotateX(${-my.current}deg)`;
      }
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  /* GSAP Timeline */
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    /* ── Initial setup ── */
    tl.set(wavingRef.current, { opacity: 0, scale: 0.8, filter: "blur(5px)" });
    tl.set(standingRef.current, { opacity: 0, scale: 0.92, y: 0 });

    /* Phase 0: Fade in standing (0.7s) */
    tl.to(standingRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    }, 0.15);

    /* Gentle float animation on standing */
    tl.to(standingRef.current, {
      y: -4,
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
    }, 0.4);

    tl.call(() => onPhaseChange?.("idle"), undefined, 0.8);

    /* ── Cinematic Morph (2.5s) ── */
    /* Step 1: Standing moves forward + slight scale up */
    tl.to(standingRef.current, {
      scale: 1.08,
      y: -8,
      filter: "blur(1px)",
      duration: 0.9,
      ease: "power3.in",
    }, 2.5);

    /* Step 2: Crossfade — standing fades, waving appears */
    tl.to(standingRef.current, {
      opacity: 0,
      scale: 1.14,
      filter: "blur(4px)",
      duration: 1.1,
      ease: "power2.inOut",
    }, 3.15);

    tl.to(wavingRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.0,
      ease: "power2.out",
    }, 3.25);

    /* Step 3: Waving settles with gentle float */
    tl.to(wavingRef.current, {
      y: -3,
      duration: 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
    }, 4.0);

    tl.call(() => onPhaseChange?.("morphing"), undefined, 2.5);
    tl.call(() => onPhaseChange?.("waving"), undefined, 4.5);

    tl.play();
    timelineRef.current = tl;

    /* ── Gentle wave interval (every 6s) ── */
    waveIntervalRef.current = setInterval(() => {
      if (!wavingRef.current) return;
      gsap.to(wavingRef.current, {
        scale: 1.03,
        duration: 0.35,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
      gsap.to(wavingRef.current, {
        x: -2,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        delay: 0.05,
      });
    }, 6000);

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
      {/* Standing */}
      <img
        ref={standingRef}
        src="/portfolio/characters/standing.png"
        alt="Character standing"
        className="absolute max-h-[70vh] w-auto object-contain pointer-events-none select-none animate-character-float"
        draggable={false}
      />

      {/* Waving */}
      <img
        ref={wavingRef}
        src="/portfolio/characters/waving.png"
        alt="Character waving"
        className="absolute max-h-[70vh] w-auto object-contain pointer-events-none select-none animate-character-float"
        draggable={false}
        style={{ willChange: "transform, opacity, filter" }}
      />
    </div>
  );
}
