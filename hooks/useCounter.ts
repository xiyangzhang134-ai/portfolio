"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useCounter: counts from 0 to target when element enters viewport.
 * Uses Lenis-aware observer. Returns the ref for the element.
 */
export function useCounter(
  target: number,
  duration = 2,
) {
  const ref = useRef<HTMLSpanElement>(null!);
  const counted = useRef(false);

  const animate = useCallback(
    () => {
      const el = ref.current;
      if (!el || counted.current) return;
      counted.current = true;
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // ease-out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(eased * target);
        el.textContent = String(current);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      };
      requestAnimationFrame(step);
    },
    [target, duration],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) animate(); },
      { threshold: 0.3 },
    );
    io.observe(el);
    // also check immediately in case already in view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) animate();
    return () => io.disconnect();
  }, [animate]);

  return ref;
}
