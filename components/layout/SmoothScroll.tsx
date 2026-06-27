"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisScrollProvider } from "./LenisScrollContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Provides Lenis smooth scrolling, bridges to GSAP ScrollTrigger,
 * and exposes current scroll position via React context.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafCallback = useRef<(t: number) => void>(null!);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Bridge Lenis to ScrollTrigger
    instance.on("scroll", ({ animatedScroll }: { animatedScroll: number }) => {
      setScrollY(animatedScroll);
      ScrollTrigger.update();
    });

    // GSAP ticker drives Lenis
    rafCallback.current = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback.current);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback.current);
      instance.destroy();
    };
  }, []);

  return (
    <LenisScrollProvider scrollY={scrollY} lenis={lenis}>
      {children}
    </LenisScrollProvider>
  );
}
