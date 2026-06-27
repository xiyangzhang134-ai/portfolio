"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/constants";
import { SPRING } from "@/lib/constants";

/**
 * MagneticButton — the hover area pulls toward the cursor.
 * Combines a glass-style button with the magnetic hook.
 */
export default function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null!);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setDelta({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  };

  const onLeave = () => setDelta({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: delta.x, y: delta.y }}
      transition={SPRING.default}
    >
      <button
        onClick={onClick}
        className={cn(
          "relative overflow-hidden rounded-full px-10 py-4",
          "border border-[#8B5CF6] text-[#8B5CF6]",
          "font-display text-sm font-semibold uppercase tracking-widest",
          "transition-all duration-300",
          "hover:bg-[#8B5CF6] hover:text-[#FFF6FB]",
          "hover:shadow-[0_0_30px_rgba(139,92,246,0.5),0_0_60px_rgba(255,183,213,0.2)]",
        )}
      >
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  );
}
