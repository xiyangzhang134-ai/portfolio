"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/constants";
import {
  Code2,
  Braces,
  Globe,
  Box,
  Play,
  Pen,
  Terminal,
  Brain,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Braces,
  Globe,
  Box,
  Play,
  Pen,
  Terminal,
  Brain,
};

/**
 * Skills — glass cards with dynamic icons, tilt & glow.
 */
export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16">
        <SectionHeading delay={0} className="text-gradient-blue">
          What I
          <br />
          Work With
        </SectionHeading>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {SKILLS.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
  isInView,
}: {
  skill: (typeof SKILLS)[number];
  index: number;
  isInView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null!);

  /* Tilt on hover */
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 200, damping: 24 });
  const springY = useSpring(rotY, { stiffness: 200, damping: 24 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current.getBoundingClientRect();
    rotX.set(((e.clientY - r.top) / r.height - 0.5) * 10);
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * -10);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const Icon = ICON_MAP[skill.icon] || Code2;

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 md:p-8 flex flex-col items-center justify-center gap-4 aspect-square group cursor-none"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.06 * index,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Icon with glow */}
      <motion.div
        className="relative"
        style={{ willChange: "filter" }}
        animate={{ filter: `drop-shadow(0 0 12px ${skill.color}55)` }}
      >
        <motion.div
          className="text-3xl md:text-4xl"
          style={{ color: skill.color }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        >
          <Icon size={40} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Label */}
      <span className="text-xs md:text-sm font-body text-white/50 group-hover:text-white/80 transition-colors duration-500">
        {skill.name}
      </span>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors duration-700 pointer-events-none"
        style={{
          boxShadow: "0 0 0px transparent",
        }}
      />
    </motion.div>
  );
}
