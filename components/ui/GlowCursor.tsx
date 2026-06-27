"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * GlowCursor — a luminous orb that follows the mouse.
 * Uses motion-value driven spring for zero-render overhead.
 * Hidden on touch devices.
 */
export default function GlowCursor() {
  const [mounted, setMounted] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rAF = useRef(0);

  const springX = useSpring(cursorX, { stiffness: 260, damping: 28, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 260, damping: 28, mass: 0.4 });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFinePointer(mq.matches);
    if (!mq.matches) return;

    let px = -100;
    let py = -100;

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!rAF.current) {
        rAF.current = requestAnimationFrame(() => {
          cursorX.set(px);
          cursorY.set(py);
          rAF.current = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, [cursorX, cursorY]);

  // Never render on server; hide on touch-only devices after mount
  if (!mounted || !isFinePointer) return null;

  return (
    <motion.div
      className="cursor-custom pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        width: 36,
        height: 36,
        marginLeft: -18,
        marginTop: -18,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)",
          boxShadow:
            "0 0 18px rgba(139,92,246,0.5), 0 0 36px rgba(139,92,246,0.2), 0 0 72px rgba(255,183,213,0.1)",
        }}
      />
      {/* Ring border */}
      <div
        className="absolute inset-0 rounded-full border border-white/25"
        style={{ animation: "spin 5s linear infinite" }}
      />
      {/* Core dot */}
      <div className="relative w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
    </motion.div>
  );
}
