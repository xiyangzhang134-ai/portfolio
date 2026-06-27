import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 * Used by all components for conditional styling.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Easing curves — shared between Framer Motion & GSAP */
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inExpo: [1, 0, 0.3, 1] as const,
  inOutExpo: [0.87, 0, 0.13, 1] as const,
  outQuint: [0.22, 1, 0.36, 1] as const,
};

/** Framer Motion transition presets */
export const SPRING = {
  default: { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.6 },
  soft:    { type: "spring" as const, stiffness: 60,  damping: 18 },
  snappy:  { type: "spring" as const, stiffness: 400, damping: 30 },
  gentle:  { type: "spring" as const, stiffness: 100, damping: 22, mass: 0.8 },
};

/** Navigation links */
export const NAV_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
] as const;

/** Projects */
export const PROJECTS = [
  {
    title: "Aether · AI Copilot",
    tagline: "Next-gen HCI for creative workflows",
    description: "A real-time collaborative AI assistant that predicts creative intent across design, code, and writing. Built with transformer architecture and WebGPU inference.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#8B5CF6] via-[#6D5EF8] to-[#FFB7D5]",
    tags: ["AI", "WebGPU", "React"],
  },
  {
    title: "Nebula · Trading Engine",
    tagline: "Algorithmic market intelligence platform",
    description: "Real-time sentiment analysis, order-flow detection, and risk modeling for institutional traders. Processes 2M+ events/sec with zero-allocation architecture.",
    image: "https://images.unsplash.com/photo-1639762481055-c888ca09b8ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#6D5EF8] via-[#8FD3FF] to-[#8B5CF6]",
    tags: ["Trading", "Go", "TA-Lib"],
  },
  {
    title: "Prism · Design System",
    tagline: "Adaptive component architecture",
    description: "A constraint-based design system that generates UI variants from a single source of truth. Used across 14 products serving 40M+ users globally.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#FFB7D5] via-[#8B5CF6] to-[#8FD3FF]",
    tags: ["Design", "Figma", "React"],
  },
] as const;

/** Skills */
export const SKILLS = [
  { name: "React",      icon: "Code2",    color: "#8B5CF6" },
  { name: "TypeScript", icon: "Braces",   color: "#6D5EF8" },
  { name: "Next.js",    icon: "Globe",    color: "#8FD3FF" },
  { name: "Three.js",   icon: "Box",      color: "#FFB7D5" },
  { name: "GSAP",       icon: "Play",     color: "#8B5CF6" },
  { name: "Figma",      icon: "Pen",      color: "#6D5EF8" },
  { name: "Python",     icon: "Terminal", color: "#8FD3FF" },
  { name: "AI/ML",      icon: "Brain",    color: "#FFB7D5" },
] as const;

/** Contact */
export const CONTACT = {
  email:    "hello@yourdomain.com",
  github:   "github.com/yourname",
  instagram: "instagram.com/yourname",
  wechat:   "wx_yourid",
} as const;

/** Stats for About section */
export const STATS = [
  { value: 23, suffix: "+", label: "Projects" },
  { value: 7,  suffix: "",  label: "Years" },
  { value: 14, suffix: "",  label: "Clients" },
  { value: 3,  suffix: "M+", label: "Users" },
] as const;
