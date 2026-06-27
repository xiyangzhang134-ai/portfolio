"use client";

import { useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * AnimeGirl — layered SVG character with:
 *  ✓ Breathing animation
 *  ✓ Body sway
 *  ✓ Hair strand independent sway
 *  ✓ Mouse-driven 3D tilt
 *  ✓ Pupil tracking
 *  ✓ Shadow scaling with breath
 *  ✓ Rim light shift with mouse
 */
export default function AnimeGirl({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const mouse = useMousePosition();

  /* Spring-smoothed mouse values for fluid response */
  const springX = useSpring(mouse.x * 20, { stiffness: 80, damping: 24 });
  const springY = useSpring(-mouse.y * 15, { stiffness: 80, damping: 24 });
  const pupilX = useSpring(mouse.x * 4, { stiffness: 200, damping: 30 });
  const pupilY = useSpring(mouse.y * 4, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        style={{
          rotateY: springX,
          rotateX: springY,
          width: 0,
          height: 0,
        }}
      >
        <svg
          viewBox="0 0 400 600"
          width="400"
          height="600"
          className="drop-shadow-[0_0_40px_rgba(139,92,246,0.35)] drop-shadow-[0_0_80px_rgba(255,183,213,0.15)]"
          style={{ overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Hair gradient */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#6D5EF8" />
              <stop offset="100%" stopColor="#5A4FCF" />
            </linearGradient>

            {/* Hair highlight */}
            <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="60%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4C3DB8" />
            </linearGradient>

            {/* Skin tone */}
            <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF6FB" />
              <stop offset="100%" stopColor="#F3DBE8" />
            </radialGradient>

            {/* Eye gradient */}
            <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8FD3FF" />
              <stop offset="100%" stopColor="#5BA4D8" />
            </linearGradient>

            {/* Dress gradient */}
            <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="40%" stopColor="#1F1934" />
              <stop offset="100%" stopColor="#0D1117" />
            </linearGradient>

            {/* Dress highlight */}
            <linearGradient id="dressHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>

            {/* Blush grad */}
            <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB7D5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFB7D5" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── SHADOW (on ground) ── */}
          <motion.ellipse
            cx="200"
            cy="568"
            rx="110"
            ry="18"
            fill="rgba(139,92,246,0.25)"
            animate={{ rx: [108, 114, 108], opacity: [0.25, 0.32, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── BACK HAIR (large mass behind) ── */}
          <motion.g
            style={{ transformOrigin: "200px 100px", transformBox: "fill-box" }}
            animate={{ rotate: 0 }}
          >
            <motion.path
              d="M200,95
                C105,95 50,150 48,250
                C45,380 80,490 105,530
                L125,530
                C100,490 80,390 85,280
                C88,200 110,140 130,120
                L270,120
                C290,140 312,200 315,280
                C320,390 300,490 275,530
                L295,530
                C320,490 355,380 352,250
                C350,150 295,95 200,95Z"
              fill="url(#hairGrad)"
            />
          </motion.g>

          {/* ── BACK HAIR SWAY ── (offset phase for organic feel) */}
          <motion.path
            d="M200,95
              C105,95 50,150 48,250
              C45,380 80,490 105,530
              L125,530
              C100,490 80,390 85,280
              C88,200 110,140 130,120
              L270,120
              C290,140 312,200 315,280
              C320,390 300,490 275,530
              L295,530
              C320,490 355,380 352,250
              C350,150 295,95 200,95Z"
            fill="url(#hairGrad)"
            style={{ transformOrigin: "200px 100px", transformBox: "fill-box" }}
            animate={{ rotate: [-0.8, 1.2, -1, 0.6, -0.8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── BODY / DRESS ── (breathes with scale) */}
          <motion.g
            style={{ transformOrigin: "200px 350px", transformBox: "fill-box" }}
            animate={{ scaleX: [1, 1.006, 1], scaleY: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Dress body */}
            <path
              d="M145,295
                C145,285 155,278 165,278
                L200,280
                L235,278
                C245,278 255,285 255,295
                L255,310
                C265,340 275,380 278,430
                C280,470 278,510 275,545
                L260,555
                L245,555
                C248,530 250,480 248,430
                C246,390 238,340 232,310
                L200,305
                L168,310
                C162,340 154,390 152,430
                C150,480 152,530 155,555
                L140,555
                L125,545
                C122,510 120,470 122,430
                C125,380 135,340 145,310
                C145,300 145,295 145,295Z"
              fill="url(#dressGrad)"
            />
            {/* Dress collar / highlight */}
            <path
              d="M175,280 Q200,295 225,280"
              fill="none"
              stroke="url(#dressHighlight)"
              strokeWidth="2"
            />
            {/* Center line / trim */}
            <line
              x1="200"
              y1="295"
              x2="200"
              y2="390"
              stroke="rgba(139,92,246,0.15)"
              strokeWidth="1"
            />
          </motion.g>

          {/* ── NECK ── */}
          <motion.rect
            x="188"
            y="260"
            width="24"
            height="28"
            rx="6"
            fill="url(#skinGrad)"
            style={{ transformOrigin: "200px 274px", transformBox: "fill-box" }}
            animate={{ scaleY: [1, 1.005, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── HEAD FACE ── */}
          <motion.g
            style={{ transformOrigin: "200px 190px", transformBox: "fill-box" }}
            animate={{ scaleX: [1, 1.003, 1], scaleY: [1, 1.006, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Face shape */}
            <ellipse
              cx="200"
              cy="190"
              rx="66"
              ry="78"
              fill="url(#skinGrad)"
            />

            {/* ── EYEBROWS ── */}
            <path
              d="M153,178 Q170,170 187,176"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M213,176 Q230,170 247,178"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* ── EYES ── */}
            {/* Left eye */}
            <ellipse cx="169" cy="205" rx="15" ry="20" fill="url(#eyeGrad)" />
            <ellipse cx="169" cy="205" rx="13.5" ry="17" fill="#1a2a4a" />
            {/* Pupils — track mouse */}
            <motion.ellipse
              cx="169"
              cy="205"
              rx="7"
              ry="10"
              fill="url(#eyeGrad)"
              style={{ x: pupilX, y: pupilY }}
            />
            <ellipse cx="169" cy="205" rx="3.5" ry="5" fill="#0D1117" />
            {/* Highlights */}
            <ellipse cx="163" cy="197" rx="5" ry="7" fill="white" opacity="0.9" />
            <ellipse cx="172" cy="210" rx="2.5" ry="3.5" fill="white" opacity="0.6" />

            {/* Right eye */}
            <ellipse cx="231" cy="205" rx="15" ry="20" fill="url(#eyeGrad)" />
            <ellipse cx="231" cy="205" rx="13.5" ry="17" fill="#1a2a4a" />
            <motion.ellipse
              cx="231"
              cy="205"
              rx="7"
              ry="10"
              fill="url(#eyeGrad)"
              style={{ x: pupilX, y: pupilY }}
            />
            <ellipse cx="231" cy="205" rx="3.5" ry="5" fill="#0D1117" />
            <ellipse cx="225" cy="197" rx="5" ry="7" fill="white" opacity="0.9" />
            <ellipse cx="234" cy="210" rx="2.5" ry="3.5" fill="white" opacity="0.6" />

            {/* ── BLUSH ── */}
            <ellipse cx="140" cy="228" rx="20" ry="9" fill="url(#blushGrad)" />
            <ellipse cx="260" cy="228" rx="20" ry="9" fill="url(#blushGrad)" />

            {/* ── NOSE ── */}
            <path
              d="M197,220 Q200,225 203,220"
              fill="none"
              stroke="#E0C0D0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* ── MOUTH ── */}
            <path
              d="M193,237 Q200,244 207,237"
              fill="none"
              stroke="#FFB7D5"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </motion.g>

          {/* ── FRONT BANGS ── */}
          <motion.g
            style={{ transformOrigin: "200px 130px", transformBox: "fill-box" }}
            animate={{ rotate: [-0.6, 0.8, -0.9, 0.5, -0.6] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Main bangs shape */}
            <path
              d="M134,155
                C134,120 160,95 190,92
                L200,130 L210,92
                C240,95 266,120 266,155
                C266,160 260,165 250,165
                C248,150 240,135 228,145
                L224,130 L220,148
                C212,140 200,142 200,142
                C200,142 188,140 180,148
                L176,130 L172,145
                C160,135 152,150 150,165
                C140,165 134,160 134,155Z"
              fill="url(#hairHighlight)"
            />
          </motion.g>

          {/* ── LEFT SIDE STRAND 1 ── */}
          <motion.g
            style={{ transformOrigin: "130px 200px", transformBox: "fill-box" }}
            animate={{ rotate: [-1.5, 2, -1.8, 1.2, -1.5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M132,165
                C118,180 108,220 105,270
                C102,330 108,390 118,440
                C124,470 132,490 135,500
                C128,495 118,470 112,435
                C100,380 95,310 98,260
                C102,210 120,175 135,160Z"
              fill="url(#hairGrad)"
            />
          </motion.g>

          {/* ── LEFT SIDE STRAND 2 (shorter) ── */}
          <motion.g
            style={{ transformOrigin: "125px 230px", transformBox: "fill-box" }}
            animate={{ rotate: [-0.8, 1.3, -1.1, 0.7, -0.8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M140,175
                C128,195 120,240 118,295
                C116,350 124,395 132,430
                C120,420 110,370 105,310
                C100,250 110,200 128,175
                C132,173 136,173 140,175Z"
              fill="url(#hairHighlight)"
            />
          </motion.g>

          {/* ── RIGHT SIDE STRAND 1 ── */}
          <motion.g
            style={{ transformOrigin: "270px 200px", transformBox: "fill-box" }}
            animate={{ rotate: [1.5, -2, 1.8, -1.2, 1.5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M268,165
                C282,180 292,220 295,270
                C298,330 292,390 282,440
                C276,470 268,490 265,500
                C272,495 282,470 288,435
                C300,380 305,310 302,260
                C298,210 280,175 265,160Z"
              fill="url(#hairGrad)"
            />
          </motion.g>

          {/* ── RIGHT SIDE STRAND 2 ── */}
          <motion.g
            style={{ transformOrigin: "275px 230px", transformBox: "fill-box" }}
            animate={{ rotate: [0.8, -1.3, 1.1, -0.7, 0.8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M260,175
                C272,195 280,240 282,295
                C284,350 276,395 268,430
                C280,420 290,370 295,310
                C300,250 290,200 272,175
                C268,173 264,173 260,175Z"
              fill="url(#hairHighlight)"
            />
          </motion.g>

          {/* ── RIM LIGHT overlay (shifts with mouse) ── */}
          <motion.ellipse
            cx={200}
            cy={220}
            rx="80"
            ry="95"
            fill="none"
            stroke="rgba(139,92,246,0.12)"
            strokeWidth="0.5"
            style={{ x: springX, y: springY }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
