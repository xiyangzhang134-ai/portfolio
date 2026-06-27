"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroText — typewriter effect revealing:
 *   Hi 👋
 *   I'm
 *   张熙洋
 *
 * Followed by a subtitle that fades in, and a blinking caret.
 */
export default function HeroText() {
  const [phase, setPhase] = useState<"waiting" | "line1" | "line2" | "line3" | "done">("waiting");
  const [visibleChars, setVisibleChars] = useState({ line1: 0, line2: 0, line3: 0 });

  const line1 = "Hi 👋";
  const line2 = "I'm";
  const line3 = "张熙洋";

  const subtitle = "Brand Designer & AI Creative";
  const roles = [
    "品牌设计",
    "广告创意",
    "AI 视觉",
    "活动策划",
  ];

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    /* Start after morph animation finishes (~6s) */
    const init = setTimeout(() => setPhase("line1"), 5500);

    return () => {
      clearTimeout(init);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* Type line1 */
  useEffect(() => {
    if (phase !== "line1") return;
    let i = 0;
    const type = () => {
      if (i <= line1.length) {
        setVisibleChars((p) => ({ ...p, line1: i }));
        i++;
        timerRef.current = setTimeout(type, 100);
      } else {
        timerRef.current = setTimeout(() => setPhase("line2"), 250);
      }
    };
    type();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]); // eslint-disable-line

  /* Type line2 */
  useEffect(() => {
    if (phase !== "line2") return;
    let i = 0;
    const type = () => {
      if (i <= line2.length) {
        setVisibleChars((p) => ({ ...p, line2: i }));
        i++;
        timerRef.current = setTimeout(type, 80);
      } else {
        timerRef.current = setTimeout(() => setPhase("line3"), 200);
      }
    };
    type();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]); // eslint-disable-line

  /* Type line3 */
  useEffect(() => {
    if (phase !== "line3") return;
    let i = 0;
    const type = () => {
      if (i <= line3.length) {
        setVisibleChars((p) => ({ ...p, line3: i }));
        i++;
        timerRef.current = setTimeout(type, 140);
      } else {
        timerRef.current = setTimeout(() => setPhase("done"), 400);
      }
    };
    type();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]); // eslint-disable-line

  const isActive = phase !== "waiting";

  return (
    <div className="relative z-20 flex flex-col items-start gap-2 md:gap-3 pointer-events-none select-none">
      {/* Line 1 */}
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white/80 tracking-tight">
        {isActive ? (
          <>
            {line1.slice(0, visibleChars.line1)}
            {phase === "line1" && <BlinkingCaret />}
          </>
        ) : null}
      </p>

      {/* Line 2 */}
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white/80 tracking-tight">
        {(phase === "line2" || phase === "line3" || phase === "done") && (
          <>
            {line2.slice(0, visibleChars.line2)}
            {phase === "line2" && <BlinkingCaret />}
          </>
        )}
      </p>

      {/* Line 3 — Name */}
      <h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-none"
        style={{
          background: "linear-gradient(135deg, #FFF6FB 0%, #FFB7D5 35%, #8B5CF6 70%, #6D5EF8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {(phase === "line3" || phase === "done") && (
          <>
            {line3.slice(0, visibleChars.line3)}
            {(phase === "line3" || phase === "done") && <BlinkingCaret />}
          </>
        )}
      </h1>

      {/* Subtitle */}
      {phase === "done" && (
        <div className="mt-4 md:mt-6 space-y-3">
          <p
            className="text-sm sm:text-base md:text-lg text-white/40 font-body tracking-wide animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            {subtitle}
          </p>
          {/* Role tags */}
          <div
            className="flex flex-wrap gap-2 animate-fade-in"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            {roles.map((role, i) => (
              <span
                key={role}
                className="px-3 py-1.5 rounded-full text-xs md:text-sm font-body text-white/50 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BlinkingCaret() {
  return (
    <span
      className="inline-block w-[3px] h-[0.8em] bg-[#8B5CF6] ml-0.5 align-middle rounded-full animate-caret-blink"
    />
  );
}
