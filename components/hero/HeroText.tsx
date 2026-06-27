"use client";

import { useEffect, useRef, useState } from "react";
import { ROLES } from "@/lib/constants";

/**
 * HeroText — typewriter effect + rotating role + intro + action buttons.
 *
 * Line 1: Hi 👋
 * Line 2: I'm
 * Line 3: 张熙洋 (fixed)
 * Line 4: rotating role (品牌设计师 / 广告设计师 / 创意策划 / AI 创意设计) every 2s
 * Intro paragraph (user-specified)
 * Buttons: 查看作品 / 在线简历 / 联系我
 */
export default function HeroText({
  onScrollTo,
}: {
  onScrollTo?: (href: string) => void;
}) {
  const [phase, setPhase] = useState<"waiting" | "line1" | "line2" | "line3" | "done">("waiting");
  const [visibleChars, setVisibleChars] = useState({ line1: 0, line2: 0, line3: 0 });
  const [roleIndex, setRoleIndex] = useState(0);

  const line1 = "Hi 👋";
  const line2 = "I'm";
  const line3 = "张熙洋";

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Start ~5.5s after page load (after character morph) */
  useEffect(() => {
    const init = setTimeout(() => setPhase("line1"), 5500);
    return () => {
      clearTimeout(init);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* Rotating roles every 2s */
  useEffect(() => {
    if (phase !== "done") return;
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [phase]);

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
    <div className="relative z-20 flex flex-col items-start gap-2 md:gap-3 select-none">
      {/* Line 1 */}
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white/70 tracking-tight">
        {isActive ? (
          <>
            {line1.slice(0, visibleChars.line1)}
            {phase === "line1" && <BlinkingCaret />}
          </>
        ) : null}
      </p>

      {/* Line 2 */}
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white/70 tracking-tight">
        {(phase === "line2" || phase === "line3" || phase === "done") && (
          <>
            {line2.slice(0, visibleChars.line2)}
            {phase === "line2" && <BlinkingCaret />}
          </>
        )}
      </p>

      {/* Line 3 — Name */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-none"
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

      {/* Rotating role */}
      {phase === "done" && (
        <div className="h-8 md:h-10 overflow-hidden">
          <p
            key={roleIndex}
            className="text-base sm:text-lg md:text-xl font-body text-[#8FD3FF] animate-role-in"
          >
            {ROLES[roleIndex]}
          </p>
        </div>
      )}

      {/* Intro paragraph */}
      {phase === "done" && (
        <div className="mt-3 md:mt-5 space-y-4 max-w-md">
          <p
            className="text-sm md:text-base text-white/35 font-body leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            我相信设计不仅仅是视觉表达，
            <br />
            更是品牌与用户建立连接的桥梁。
            <br />
            希望通过创意、设计与 AI，
            <br />
            创造更有价值的品牌体验。
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap gap-3 pt-2 animate-fade-in"
            style={{ animationDelay: "1.2s", animationFillMode: "both" }}
          >
            <ActionButton
              onClick={() => onScrollTo?.("#projects")}
              variant="primary"
            >
              查看作品
            </ActionButton>
            <ActionButton
              onClick={() => onScrollTo?.("#resume")}
              variant="secondary"
            >
              在线简历
            </ActionButton>
            <ActionButton
              onClick={() => onScrollTo?.("#contact")}
              variant="ghost"
            >
              联系我
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  variant,
}: {
  children: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "ghost";
}) {
  const base =
    "px-5 py-2.5 rounded-full text-xs md:text-sm font-display font-semibold tracking-wider transition-all duration-300 cursor-pointer border";

  const styles: Record<string, string> = {
    primary:
      "bg-[#8B5CF6] border-[#8B5CF6] text-white hover:bg-[#9B6CF7] hover:shadow-[0_0_24px_rgba(139,92,246,0.5)]",
    secondary:
      "bg-transparent border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:shadow-[0_0_16px_rgba(139,92,246,0.25)]",
    ghost:
      "bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white/80",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}

function BlinkingCaret() {
  return (
    <span className="inline-block w-[3px] h-[0.8em] bg-[#8B5CF6] ml-0.5 align-middle rounded-full animate-caret-blink" />
  );
}
