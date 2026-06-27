"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT } from "@/lib/constants";
import { fadeUpStaggerContainer, fadeUp } from "@/animations/variants";

/**
 * Contact — emoji-driven minimal contact info.
 * Click email → mailto, click phone → tel.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const items = [
    { emoji: "👤", label: "姓名", value: CONTACT.name, href: undefined },
    { emoji: "📱", label: "电话", value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
    { emoji: "💬", label: "微信", value: CONTACT.wechat, href: undefined },
    { emoji: "📧", label: "邮箱", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { emoji: "🌐", label: "网站", value: CONTACT.github, href: `https://${CONTACT.github}` },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <motion.div
        className="w-full max-w-2xl mx-auto text-center space-y-16"
        variants={fadeUpStaggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Heading */}
        <motion.div className="space-y-4" variants={fadeUp}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8FD3FF] font-body">
            Contact
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black">
            <span
              style={{
                background: "linear-gradient(135deg, #FFF6FB, #FFB7D5, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              联系我
            </span>
          </h2>
        </motion.div>

        {/* Contact items */}
        <motion.div className="space-y-3" variants={fadeUp}>
          {items.map((item) => {
            const content = (
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-400">
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-body mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base font-body text-white/60">
                    {item.value}
                  </p>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <a
                  key={item.emoji}
                  href={item.href}
                  className="block cursor-pointer"
                >
                  {content}
                </a>
              );
            }

            return <div key={item.emoji}>{content}</div>;
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
