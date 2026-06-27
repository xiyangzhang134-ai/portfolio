import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inExpo: [1, 0, 0.3, 1] as const,
  inOutExpo: [0.87, 0, 0.13, 1] as const,
  outQuint: [0.22, 1, 0.36, 1] as const,
};

export const SPRING = {
  default: { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.6 },
  soft:    { type: "spring" as const, stiffness: 60,  damping: 18 },
  snappy:  { type: "spring" as const, stiffness: 400, damping: 30 },
  gentle:  { type: "spring" as const, stiffness: 100, damping: 22, mass: 0.8 },
};

/** Navigation */
export const NAV_LINKS = [
  { label: "能力",   href: "#ai-capabilities" },
  { label: "工具",   href: "#ai-tools" },
  { label: "项目",   href: "#ai-projects" },
  { label: "思考",   href: "#ai-thinking" },
  { label: "联系",   href: "#contact" },
] as const;

/** Hero subtitle (static, no rotation) */
export const HERO_SUBTITLE = "AI 产品运营 ｜ AI 创意设计 ｜ 品牌设计";

/** Hero intro paragraph */
export const HERO_INTRO =
  "热爱研究 AI 产品，持续探索 AI 在设计、运营、内容创作中的应用，希望成为一名 AI 原生运营人。";

/** Hero buttons (查看作品 removed) */
export const HERO_BUTTONS = [
  { label: "关于我",   href: "#about", variant: "primary" as const },
  { label: "联系我",   href: "#contact", variant: "ghost" as const },
];

/** AI Capabilities — 4 cards */
export const AI_CAPABILITIES = [
  {
    icon: "✍️",
    title: "AI 内容创作",
    desc: "利用 Claude、ChatGPT 快速完成文案、策划、方案输出。",
  },
  {
    icon: "🔍",
    title: "AI 产品体验",
    desc: "持续体验国内外 AI 产品。关注产品设计、用户体验以及商业模式。",
  },
  {
    icon: "⚡",
    title: "AI 工作流",
    desc: "利用 AI 提高效率。能够完成网站、PPT、海报、品牌视觉等内容。",
  },
  {
    icon: "📖",
    title: "AI 学习能力",
    desc: "持续关注最新 AI 技术。保持快速学习能力。",
  },
] as const;

/** AI Tools — Logo wall */
export const AI_TOOLS = [
  { name: "Claude", icon: "🧠", desc: "产品策划、Prompt Engineering、网站开发、文案撰写" },
  { name: "ChatGPT", icon: "💬", desc: "创意头脑风暴、内容撰写、数据分析、用户研究" },
  { name: "Cursor", icon: "⌨️", desc: "AI 辅助编程、网站开发、代码重构" },
  { name: "Figma", icon: "🎨", desc: "UI 设计、品牌视觉、原型制作、设计系统" },
  { name: "Photoshop", icon: "🖼️", desc: "图像处理、海报设计、视觉素材制作" },
  { name: "Illustrator", icon: "✏️", desc: "矢量图形、Logo 设计、插画创作" },
  { name: "GitHub", icon: "🐙", desc: "版本管理、项目协作、GitHub Pages 部署" },
  { name: "VS Code", icon: "💻", desc: "代码编辑、AI 辅助开发、项目调试" },
] as const;

/** AI Projects — 3 cards with expand */
export const AI_PROJECTS = [
  {
    title: "AI 个人网站",
    tagline: "Claude Code · 从零到上线",
    desc: "利用 Claude Code 从零开发个人品牌网站。",
    details: [
      "动漫人物首页",
      "Apple 风格 UI",
      "响应式布局",
      "GitHub Pages 部署",
      "滚动动画交互",
    ],
    color: "from-[#8B5CF6] via-[#6D5EF8] to-[#FFB7D5]",
    icon: "🌐",
  },
  {
    title: "AI 简历设计",
    tagline: "AI × 设计 · 高颜值作品集",
    desc: "利用 AI 制作高颜值作品集以及简历。",
    details: [
      "AI 辅助排版",
      "品牌视觉统一",
      "多端适配",
      "PDF 输出",
      "动效加持",
    ],
    color: "from-[#6D5EF8] via-[#8FD3FF] to-[#8B5CF6]",
    icon: "📄",
  },
  {
    title: "AI 品牌设计",
    tagline: "AI · 品牌视觉探索",
    desc: "利用 AI 完成品牌视觉探索。",
    details: [
      "LOGO 设计",
      "品牌色方案",
      "VI 视觉系统",
      "宣传海报",
      "品牌规范手册",
    ],
    color: "from-[#FFB7D5] via-[#8B5CF6] to-[#8FD3FF]",
    icon: "🎯",
  },
] as const;

/** AI Operations Thinking — timeline style */
export const AI_OPERATIONS = [
  "研究目标用户",
  "分析竞品",
  "制作官网",
  "建立品牌视觉",
  "运营小红书账号",
  "运营微信公众号",
  "建立用户社群",
  "持续收集用户反馈",
  "分析数据",
  "不断优化产品体验",
] as const;

/** AI Learning Route */
export const AI_LEARNING_ROUTE = [
  { year: "2025", event: "学习 Claude Prompt Engineering" },
  { year: "↓",   event: "学习 ChatGPT 高级用法" },
  { year: "↓",   event: "学习 Figma UI 设计" },
  { year: "↓",   event: "制作第一个 AI 网站" },
  { year: "↓",   event: "部署 GitHub Pages" },
  { year: "↓",   event: "学习 SEO 基础" },
  { year: "↓",   event: "持续探索 AI 运营" },
  { year: "未来", event: "Agent、MCP、自动化工作流、AIGC 运营" },
] as const;

/** AI Thinking — 3 quotes */
export const AI_THINKING = [
  "AI 不会取代创作者，而会放大创作者的能力。",
  "好的运营，不只是传播，而是理解用户。",
  "未来最重要的能力，是持续学习 AI。",
] as const;

/** About — personal intro */
export const ADVANTAGES = [
  { emoji: "✍️", title: "AI 内容创作", desc: "利用 Claude、ChatGPT 快速完成文案、策划、方案输出。" },
  { emoji: "🔍", title: "AI 产品体验", desc: "持续体验国内外 AI 产品，关注产品设计、用户体验以及商业模式。" },
  { emoji: "⚡", title: "AI 工作流", desc: "利用 AI 提高效率。能够完成网站、PPT、海报、品牌视觉等内容。" },
  { emoji: "📖", title: "AI 学习能力", desc: "持续关注最新 AI 技术。保持快速学习能力。" },
] as const;

/** Skills — star ratings */
export const SKILLS = [
  { name: "AI 内容创作",  stars: 5 },
  { name: "AI 产品运营",  stars: 4 },
  { name: "品牌设计",     stars: 4 },
  { name: "Claude Code",  stars: 5 },
  { name: "ChatGPT",      stars: 5 },
  { name: "Figma",        stars: 4 },
  { name: "Photoshop",    stars: 4 },
  { name: "Illustrator",  stars: 4 },
  { name: "HTML / CSS",   stars: 4 },
  { name: "JavaScript",   stars: 3 },
  { name: "React",        stars: 3 },
  { name: "GitHub",       stars: 4 },
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

/** Timeline — legacy */
export const TIMELINE = [
  { year: "2025", event: "开始接触 Claude、ChatGPT" },
  { year: "↓",   event: "学习 AI 品牌设计" },
  { year: "↓",   event: "学习 Figma UI 设计" },
  { year: "↓",   event: "制作第一个 AI 个人网站" },
  { year: "↓",   event: "部署 GitHub Pages" },
  { year: "2026", event: "寻找 AI 产品运营相关工作" },
] as const;

/** Contact */
export const CONTACT = {
  name:    "张熙洋",
  phone:   "19897584370",
  wechat:  "Vrone0846",
  email:   "thecure012@qq.com",
  github:  "xiyangzhang134-ai.github.io/portfolio",
} as const;
