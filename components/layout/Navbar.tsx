"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, NAV_LINKS } from "@/lib/constants";
import { slideDown } from "@/animations/variants";
import { useLenis } from "@/components/layout/LenisScrollContext";

/**
 * Navbar — minimal, glass, appears with entry animation.
 * Reads real scroll position from Lenis context.
 * Mobile: hamburger → fullscreen drawer.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  /* Read virtual scroll from Lenis */
  const { scrollY, lenis } = useLenis();

  useEffect(() => {
    setScrolled(scrollY > 40);
    setVisible(scrollY < lastScroll.current || scrollY < 60);
    lastScroll.current = scrollY;
  }, [scrollY]);

  /** Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href) as HTMLElement | null;
    if (target && lenis) {
      lenis.scrollTo(target, { offset: 0 });
    }
    setMenuOpen(false);
  };

  return (
    <>
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
        <Link href="/portfolio" className="font-display text-xl sm:text-2xl font-black tracking-[0.15em]">
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

        {/* Desktop nav links */}
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

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex md:hidden flex-col gap-1.5 w-7 bg-transparent border-0 cursor-pointer z-[60]"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <motion.span
            className="block h-[2px] w-full bg-white rounded-full origin-center"
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-[2px] w-full bg-white rounded-full"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[2px] w-full bg-white rounded-full origin-center"
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0D1117]/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-3xl font-bold text-white/70 bg-transparent border-0 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
