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
  { label: "关于",   href: "#about" },
  { label: "作品",   href: "#projects" },
  { label: "技能",   href: "#skills" },
  { label: "历程",   href: "#timeline" },
  { label: "联系",   href: "#contact" },
] as const;

/** Hero rotating roles */
export const ROLES = [
  "品牌设计师",
  "广告设计师",
  "创意策划",
  "AI 创意设计",
] as const;

/** Projects — 我的作品 */
export const PROJECTS = [
  {
    title: "XR 品牌视觉系统",
    tagline: "Brand Identity · AI 增强",
    description: "为科技品牌设计完整的视觉识别系统，包括 logo、typography、motion guidelines。融合 AI 辅助生成与传统设计流程。",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#8B5CF6] via-[#6D5EF8] to-[#FFB7D5]",
    tags: ["Brand", "Motion", "AI"],
    background: "XR 科技品牌寻求全新视觉升级",
    role: "品牌设计师 / 视觉主创",
    goal: "建立兼具科技感与人文温度的品牌视觉系统",
    process: "品牌调研 → 视觉策略 → AI 辅助方案生成 → 设计定稿 → Motion Guideline",
    result: "品牌识别度提升 40%，获 Behance 推荐",
    summary: "证明了 AI 可以在保持创意质量的前提下，大幅加速品牌设计流程。",
  },
  {
    title: "AI 生成广告系统",
    tagline: "Generative Advertising · AI x Brand",
    description: "设计了一套 AI 驱动的广告创意生成系统，能够根据品牌基因自动产出数百个视觉方案，保留品牌一致性的同时实现规模化创作。",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    color: "from-[#FFB7D5] via-[#8B5CF6] to-[#8FD3FF]",
    tags: ["AI", "Generative", "Brand"],
    background: "品牌需要快速产出大量广告视觉素材",
    role: "AI 工作流设计师 / 品牌顾问",
    goal: "利用 AI 实现品牌视觉的规模化生产，同时保持一致性",
    process: "品牌基因提取 → Prompt 工程 → 生成流程设计 → 质量审核 → 迭代优化",
    result: "广告素材产出效率提升 10 倍，A/B 测试 CTR 提升 25%",
    summary: "AI 不是替代设计师，而是让设计师能够把更多精力放在策略与创意上。",
  },
] as const;

/** Skills — star ratings */
export const SKILLS = [
  { name: "品牌设计",     stars: 5 },
  { name: "广告设计",     stars: 4 },
  { name: "活动策划",     stars: 4 },
  { name: "Photoshop",    stars: 4 },
  { name: "Illustrator",  stars: 4 },
  { name: "Figma",        stars: 4 },
  { name: "Claude Code",  stars: 5 },
  { name: "ChatGPT",      stars: 5 },
  { name: "HTML",         stars: 4 },
  { name: "CSS",          stars: 4 },
  { name: "JavaScript",   stars: 3 },
  { name: "React",        stars: 3 },
] as const;

/** Advantages — 我的优势 */
export const ADVANTAGES = [
  { emoji: "🎨", title: "品牌设计思维", desc: "理解品牌定位与视觉表达。" },
  { emoji: "✨", title: "广告创意思维", desc: "善于提出有传播力的创意方案。" },
  { emoji: "🤖", title: "AI 高效工作流", desc: "熟练使用 Claude、ChatGPT 等 AI 工具提升设计效率。" },
  { emoji: "📈", title: "持续学习", desc: "保持学习，快速适应新的设计趋势与工具。" },
] as const;

/** AI Workflow steps */
export const AI_WORKFLOW = [
  "需求分析",
  "灵感收集",
  "Claude 创意策划",
  "ChatGPT 文案优化",
  "Figma 界面设计",
  "Claude Code 开发",
  "测试与优化",
  "上线交付",
] as const;

/** Timeline */
export const TIMELINE = [
  { year: "2024", event: "开始接触 AI 创意设计" },
  { year: "↓",   event: "学习品牌设计" },
  { year: "↓",   event: "学习 UI 设计" },
  { year: "↓",   event: "制作个人作品集" },
  { year: "2026", event: "寻找品牌设计相关工作" },
] as const;

/** Contact — 张熙洋 */
export const CONTACT = {
  name:    "张熙洋",
  phone:   "19897584370",
  wechat:  "Vrone0846",
  email:   "thecure012@qq.com",
  github:  "xiyangzhang134-ai.github.io/portfolio",
} as const;
