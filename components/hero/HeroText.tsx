"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_SUBTITLE, HERO_INTRO, HERO_BUTTONS } from "@/lib/constants";

/**
 * HeroText — AI 产品运营版
 * Line 1: Hi 👋
 * Line 2: I'm
 * Line 3: 张熙洋 (typewriter)
 * Subtitle: AI 产品运营｜AI 创意设计｜品牌设计 (static, no rotation)
 * Intro paragraph
 * Buttons: 关于我 / 联系我 (查看作品 removed)
 */
export default function HeroText({
  onScrollTo,
}: {
  onScrollTo?: (href: string) => void;
}) {
  const [phase, setPhase] = useState<"waiting" | "line1" | "line2" | "line3" | "done">("waiting");
  const [visibleChars, setVisibleChars] = useState({ line1: 0, line2: 0, line3: 0 });

  const line1 = "Hi 👋";
  const line2 = "I'm";
  const line3 = "张熙洋";

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const init = setTimeout(() => setPhase("line1"), 5500);
    return () => { clearTimeout(init); if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    if (phase !== "line1") return;
    let i = 0;
    const type = () => {
      if (i <= line1.length) { setVisibleChars((p) => ({ ...p, line1: i })); i++; timerRef.current = setTimeout(type, 100); }
      else { timerRef.current = setTimeout(() => setPhase("line2"), 250); }
    };
    type();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]); // eslint-disable-line

  useEffect(() => {
    if (phase !== "line2") return;
    let i = 0;
    const type = () => {
      if (i <= line2.length) { setVisibleChars((p) => ({ ...p, line2: i })); i++; timerRef.current = setTimeout(type, 80); }
      else { timerRef.current = setTimeout(() => setPhase("line3"), 200); }
    };
    type();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]); // eslint-disable-line

  useEffect(() => {
    if (phase !== "line3") return;
    let i = 0;
    const type = () => {
      if (i <= line3.length) { setVisibleChars((p) => ({ ...p, line3: i })); i++; timerRef.current = setTimeout(type, 140); }
      else { timerRef.current = setTimeout(() => setPhase("done"), 400); }
    };
    type();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]); // eslint-disable-line

  const isActive = phase !== "waiting";

  return (
    <div className="relative z-20 flex flex-col items-start gap-2 md:gap-3 select-none">
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white/70 tracking-tight">
        {isActive && <>{line1.slice(0, visibleChars.line1)}{phase === "line1" && <BlinkingCaret />}</>}
      </p>

      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white/70 tracking-tight">
        {(phase === "line2" || phase === "line3" || phase === "done") && <>{line2.slice(0, visibleChars.line2)}{phase === "line2" && <BlinkingCaret />}</>}
      </p>

      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-none"
        style={{ background: "linear-gradient(135deg, #FFF6FB 0%, #FFB7D5 35%, #8B5CF6 70%, #6D5EF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
      >
        {(phase === "line3" || phase === "done") && <>{line3.slice(0, visibleChars.line3)}{(phase === "line3" || phase === "done") && <BlinkingCaret />}</>}
      </h1>

      {/* Subtitle (static) */}
      {phase === "done" && (
        <p className="text-base sm:text-lg md:text-xl font-body text-[#8FD3FF] animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
          {HERO_SUBTITLE}
        </p>
      )}

      {/* Intro + Buttons */}
      {phase === "done" && (
        <div className="mt-3 md:mt-5 space-y-4 max-w-md">
          <p className="text-sm md:text-base text-white/35 font-body leading-relaxed animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
            {HERO_INTRO}
          </p>

          <div className="flex flex-wrap gap-3 pt-2 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "both" }}>
            {HERO_BUTTONS.map((btn) => (
              <button
                key={btn.label}
                onClick={() => onScrollTo?.(btn.href)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-display font-semibold tracking-wider transition-all duration-300 cursor-pointer border ${
                  btn.variant === "primary"
                    ? "bg-[#8B5CF6] border-[#8B5CF6] text-white hover:bg-[#9B6CF7] hover:shadow-[0_0_24px_rgba(139,92,246,0.5)]"
                    : "bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BlinkingCaret() {
  return <span className="inline-block w-[3px] h-[0.8em] bg-[#8B5CF6] ml-0.5 align-middle rounded-full animate-caret-blink" />;
}
