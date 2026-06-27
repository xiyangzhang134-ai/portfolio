"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * AuroraBackground — Three.js particle field with drift + mouse parallax.
 * Renders behind all content as a full-screen canvas.
 */
export default function AuroraBackground() {
  const mountRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 9;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Particles (custom shader for glow) ── */
    const COUNT = 1600;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const palette = [
      new THREE.Color("#8B5CF6"),
      new THREE.Color("#6D5EF8"),
      new THREE.Color("#FFB7D5"),
      new THREE.Color("#8FD3FF"),
    ];

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 12;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
      speeds[i] = 0.002 + Math.random() * 0.008;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Point material with additive blending for neon glow
    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── Mouse tracking ── */
    let mx = 0, my = 0;
    let targetMx = 0, targetMy = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMx = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── Animation ── */
    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      mx += (targetMx - mx) * 0.03;
      my += (targetMy - my) * 0.03;

      // Rotate the entire particle cloud slowly
      points.rotation.y += 0.0004;
      points.rotation.x += 0.0002;

      // Add mouse parallax
      points.rotation.y += mx * 0.15;
      points.rotation.x -= my * 0.1;

      // Camera follow mouse slightly for parallax
      camera.position.x += (mx * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-my * 0.7 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Animate individual particle Y positions (slow drift)
      const posArr = points.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        posArr[i3 + 1] += Math.sin(t * 2 + i * 0.02) * speeds[i];
        posArr[i3] += Math.cos(t * 1.5 + i * 0.03) * speeds[i] * 0.6;
      }
      points.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}
