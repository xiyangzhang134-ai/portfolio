"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/lib/constants";
import { SPRING } from "@/lib/constants";

/** Sentinel: is this running on a touch device? */
const IS_TOUCH = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

/**
 * Projects — full-width cards with tilt (desktop), hover image zoom & info reveal.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 space-y-20"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading delay={0} className="text-gradient">
          Selected
          <br />
          Work
        </SectionHeading>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/** Single full-width project card with tilt & hover effects */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null!);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  /* Tilt — desktop only */
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotY, { stiffness: 300, damping: 30 });

  const onMove = IS_TOUCH ? undefined : (e: React.MouseEvent) => {
    const r = ref.current.getBoundingClientRect();
    rotX.set(((e.clientY - r.top) / r.height - 0.5) * 6);
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * -6);
  };
  const onLeave = IS_TOUCH ? undefined : () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-3xl group cursor-pointer sm:cursor-none"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 * index }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: IS_TOUCH ? undefined : `perspective(1000px) rotateX(${springX}deg) rotateY(${springY}deg)`,
      }}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-10 group-hover:opacity-25 transition-opacity duration-700`}
      />

      {/* Content grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0 p-6 md:p-10 lg:p-12 bg-[#0D1117]/70 backdrop-blur-sm">
        {/* Image */}
        <div className="lg:col-span-3 relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            style={{ willChange: "transform" }}
            whileHover={IS_TOUCH ? undefined : { scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="lg:col-span-2 flex flex-col justify-center p-4 md:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8FD3FF] mb-3 font-body">
            {project.tagline}
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black leading-tight mb-4 group-hover:text-white/90 transition-colors duration-500">
            {project.title}
          </h3>
          <motion.p
            className="text-white/40 sm:text-white/30 text-sm leading-relaxed mb-6 font-body max-w-sm sm:group-hover:opacity-100 sm:group-hover:text-white/50 transition-all duration-400"
            initial={{ opacity: 0, y: 8 }}
            whileHover={IS_TOUCH ? undefined : { opacity: 1, y: 0, color: "rgba(255,255,255,0.5)" }}
            transition={{ duration: 0.4 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider border border-white/10 text-white/40 group-hover:border-white/20 group-hover:text-white/60 transition-all duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors duration-700 pointer-events-none" />
    </motion.div>
  );
}
