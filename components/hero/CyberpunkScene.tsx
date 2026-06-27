"use client";

import { useEffect, useRef } from "react";

/**
 * CyberpunkScene — full-screen canvas background.
 * Renders neon rain, ground reflection, floating light particles
 * and pulsing glow spots.
 */
export default function CyberpunkScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0;
    let H = 0;
    let raf = 0;

    const neonColors = [
      "rgba(139,92,246,",
      "rgba(143,211,255,",
      "rgba(255,183,213,",
      "rgba(109,94,248,",
    ];

    const RAIN_COUNT = 180;
    const rain: Array<{ x: number; y: number; speed: number; len: number; alpha: number; color: string }> = [];

    const PARTICLE_COUNT = 50;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number; pulse: number; ps: number }> = [];

    const GLOW_COUNT = 6;
    const glows: Array<{ x: number; y: number; r: number; alpha: number; pulse: number; ps: number }> = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initRain = () => {
      rain.length = 0;
      for (let i = 0; i < RAIN_COUNT; i++) {
        rain.push({
          x: Math.random() * W,
          y: Math.random() * H,
          speed: 8 + Math.random() * 20,
          len: 12 + Math.random() * 24,
          alpha: 0.08 + Math.random() * 0.3,
          color: neonColors[Math.floor(Math.random() * neonColors.length)],
        });
      }
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35 - 0.08,
          r: 0.5 + Math.random() * 2,
          alpha: 0.15 + Math.random() * 0.45,
          pulse: Math.random() * Math.PI * 2,
          ps: 0.01 + Math.random() * 0.03,
        });
      }
    };

    const initGlows = () => {
      glows.length = 0;
      for (let i = 0; i < GLOW_COUNT; i++) {
        glows.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.4,
          r: 30 + Math.random() * 70,
          alpha: 0.02 + Math.random() * 0.05,
          pulse: Math.random() * Math.PI * 2,
          ps: 0.006 + Math.random() * 0.018,
        });
      }
    };

    resize();
    initRain();
    initParticles();
    initGlows();

    const onResize = () => { resize(); initRain(); initParticles(); initGlows(); };
    window.addEventListener("resize", onResize);

    const render = () => {
      raf = requestAnimationFrame(render);

      ctx.clearRect(0, 0, W, H);

      /* Neon glows */
      for (const g of glows) {
        g.pulse += g.ps;
        const a = g.alpha * (0.5 + 0.5 * Math.sin(g.pulse));
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        grad.addColorStop(0, `rgba(139,92,246,${a * 3})`);
        grad.addColorStop(0.5, `rgba(109,94,248,${a})`);
        grad.addColorStop(1, "rgba(139,92,246,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(g.x - g.r, g.y - g.r, g.r * 2, g.r * 2);
      }

      /* Rain */
      for (const drop of rain) {
        drop.y += drop.speed;
        if (drop.y > H + drop.len) { drop.y = -drop.len; drop.x = Math.random() * W; }
        const grad = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.len);
        grad.addColorStop(0, `${drop.color}0)`);
        grad.addColorStop(0.6, `${drop.color}${drop.alpha})`);
        grad.addColorStop(1, `${drop.color}0)`);
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 0.6, drop.y + drop.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      /* Ground reflection */
      const grd = ctx.createLinearGradient(0, H * 0.58, 0, H);
      grd.addColorStop(0, "rgba(139,92,246,0)");
      grd.addColorStop(0.12, "rgba(139,92,246,0.015)");
      grd.addColorStop(1, "rgba(139,92,246,0.05)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, H * 0.58, W, H * 0.42);

      /* Particles */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
        p.pulse += p.ps;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(143,211,255,${a})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${a * 0.25})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
