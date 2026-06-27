"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Spring-smoothed mouse position. Returns {x, y} as deltas from center (-0.5..0.5).
 * Only activates on mouse devices (hover: hover & pointer: fine).
 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const active = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    active.current = true;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
    };

    // Spring follow: each frame move 8% closer to target
    const tick = () => {
      const cx = current.current.x;
      const cy = current.current.y;
      const tx = target.current.x;
      const ty = target.current.y;
      current.current.x += (tx - cx) * 0.08;
      current.current.y += (ty - cy) * 0.08;
      setPos({ x: current.current.x, y: current.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      active.current = false;
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return pos;
}

/**
 * Returns a ref callback and cleanup for magnetic effect.
 * Attach returned ref to the magnetic element.
 * Returns x/y deltas to apply transform.
 */
export function useMagnetic(strength = 0.3) {
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const elRef = useRef<HTMLDivElement | null>(null);

  const bind = useCallback(
    (el: HTMLDivElement | null) => {
      elRef.current = el;
      if (!el) return;

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        setDelta({ x: cx * strength, y: cy * strength });
      };

      const onLeave = () => setDelta({ x: 0, y: 0 });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    [strength],
  );

  return { delta, bind };
}
