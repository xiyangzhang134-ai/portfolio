"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, NAV_LINKS } from "@/lib/constants";
import { slideDown } from "@/animations/variants";
import { useLenis } from "@/components/layout/LenisScrollContext";

/**
 * Navbar — minimal, glass, appears with entry animation.
 * Reads real scroll position from Lenis context.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);

  /* Read virtual scroll from Lenis */
  const { scrollY, lenis } = useLenis();

  useEffect(() => {
    setScrolled(scrollY > 40);
    setVisible(scrollY < lastScroll.current || scrollY < 60);
    lastScroll.current = scrollY;
  }, [scrollY]);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href) as HTMLElement | null;
    if (target && lenis) {
      lenis.scrollTo(target, { offset: 0 });
    }
  };

  return (
    <motion.nav
      variants={slideDown}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      className={cn(
        "fixed top-0 inset-x-0 z-50 px-6 py-4 md:px-12 md:py-5",
        "flex items-center justify-between",
        "transition-colors duration-500",
        scrolled
          ? "bg-[#0D1117]/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <Link href="/" className="font-display text-2xl font-black tracking-[0.15em]">
        <span
          className="inline-block"
          style={{
            background: "linear-gradient(135deg, #6D5EF8, #8B5CF6, #FFB7D5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          PORTFOLIO
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            className={cn(
              "font-body text-xs uppercase tracking-[0.15em] bg-transparent border-0",
              "text-white/60 hover:text-[#FFB7D5] transition-colors duration-300",
              "cursor-none",
            )}
          >
            {link.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
