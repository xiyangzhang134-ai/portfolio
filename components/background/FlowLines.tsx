"use client";

import { motion } from "framer-motion";

const PATHS = [
  "M-100,200 Q200,100 500,300 T1100,200",
  "M-100,400 Q300,250 600,500 T1200,400",
  "M-100,600 Q400,400 700,700 T1300,600",
];

/**
 * FlowLines — animated SVG stroke-dashoffset flowing lines behind the character.
 */
export default function FlowLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      viewBox="0 0 1100 800"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#8FD3FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFB7D5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={1.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            delay: 0.6 + i * 0.15,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
          style={{
            strokeDasharray: "1 1",
            animation: `float-line ${3 + i * 0.5}s linear infinite`,
          }}
        />
      ))}
    </svg>
  );
}
