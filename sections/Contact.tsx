"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { CONTACT } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/**
 * Contact — Apple-style: oversized typography, clean links.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <motion.div
        className="w-full max-w-4xl mx-auto text-center space-y-16"
        variants={fadeUpStaggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Heading */}
        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] font-body"
          variants={fadeUp}
        >
          Get in touch
        </motion.p>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-display font-black leading-none"
          variants={fadeUp}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #FFF6FB, #FFB7D5, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Let&apos;s
            <br />
            Create
          </span>
        </motion.h2>

        <motion.p
          className="text-white/30 text-base md:text-lg font-body max-w-md mx-auto leading-relaxed"
          variants={fadeUp}
        >
          Open for collaborations, freelance, and conversations about the future of
          creative technology.
        </motion.p>

        {/* Links — oversized */}
        <motion.div className="space-y-4" variants={fadeUp}>
          {[
            { label: "Email", href: `mailto:${CONTACT.email}`, text: CONTACT.email },
            { label: "GitHub", href: `https://${CONTACT.github}`, text: CONTACT.github },
            { label: "Instagram", href: `https://${CONTACT.instagram}`, text: CONTACT.instagram },
            { label: "WeChat", href: "#", text: CONTACT.wechat },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white/25 hover:text-[#FFB7D5] transition-colors duration-300 tracking-tight"
            >
              {link.text}
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <MagneticButton
            onClick={() =>
              window.open(`mailto:${CONTACT.email}`, "_blank")
            }
          >
            Say Hello
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
