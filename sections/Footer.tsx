"use client";

/**
 * Footer — 「感谢您的浏览」+ © 2026.
 */
export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative py-16 px-6 md:px-12 lg:px-24 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-sm md:text-base text-white/25 font-body leading-relaxed">
          感谢您的浏览。
          <br />
          期待与您一起创造更优秀的品牌作品。
        </p>

        <p className="text-white/20 font-display text-sm md:text-base">
          —— 张熙洋
        </p>

        <p className="text-[10px] md:text-xs text-white/10 font-body uppercase tracking-[0.2em]">
          {year} © All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
