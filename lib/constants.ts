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
  { label: "Work",    href: "#projects" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/** Projects — placeholder for real portfolio work */
export const PROJECTS = [
  {
    title: "XR 品牌视觉系统",
    tagline: "Brand Identity · AI 增强",
    description: "为科技品牌设计完整的视觉识别系统，包括 logo、typography、motion guidelines。融合 AI 辅助生成与传统设计流程。",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#8B5CF6] via-[#6D5EF8] to-[#FFB7D5]",
    tags: ["Brand", "Motion", "AI"],
  },
  {
    title: "元宇宙活动策划",
    tagline: "Creative Direction · 沉浸式体验",
    description: "策划并执行虚拟现实品牌发布会，融合空间设计、交互设计和叙事创意，创造前所未有的沉浸式品牌体验。",
    image: "https://images.unsplash.com/photo-1639762481055-c888ca09b8ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#6D5EF8] via-[#8FD3FF] to-[#8B5CF6]",
    tags: ["Creative", "3D", "Spatial"],
  },
  {
    title: "AI 生成广告系统",
    tagline: "Generative Advertising · AI x Brand",
    description: "设计了一套 AI 驱动的广告创意生成系统，能够根据品牌基因自动产出数百个视觉方案，保留品牌一致性的同时实现规模化创作。",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#FFB7D5] via-[#8B5CF6] to-[#8FD3FF]",
    tags: ["AI", "Generative", "Brand"],
  },
] as const;

/** Skills — tag cloud display */
export const SKILLS = [
  { name: "品牌设计",     color: "#8B5CF6" },
  { name: "AI 创意",      color: "#6D5EF8" },
  { name: "3D / Spatial", color: "#8FD3FF" },
  { name: "Motion",       color: "#FFB7D5" },
  { name: "广告策划",     color: "#8B5CF6" },
  { name: "活动创意",     color: "#6D5EF8" },
  { name: "Figma",        color: "#8FD3FF" },
  { name: "原型设计",     color: "#FFB7D5" },
  { name: "视频后期",     color: "#A78BFA" },
  { name: "策略分析",     color: "#60A5FA" },
] as const;

/** Contact — 张熙洋 */
export const CONTACT = {
  name:    "张熙洋",
  role:    "Brand Designer & AI Creative",
  email:   "xiyangzhang134@gmail.com",
  github:  "github.com/xiyangzhang134-ai",
  instagram: "instagram.com/yourname",
  wechat:  "wx_yourid",
} as const;

/** Stats for About section */
export const STATS = [
  { value: 23, suffix: "+", label: "Projects" },
  { value: 7,  suffix: "",  label: "Years" },
  { value: 14, suffix: "",  label: "Clients" },
  { value: 3,  suffix: "M+", label: "Impressions" },
] as const;
