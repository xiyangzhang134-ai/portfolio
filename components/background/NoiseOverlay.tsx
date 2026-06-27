"use client";

/**
 * NoiseOverlay — a very faint dynamic noise texture over the entire viewport.
 * Uses CSS animation for grain effect. Opacity ~3%, barely visible.
 */
export default function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9990] pointer-events-none"
      style={{
        opacity: 0.03,
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E')",
        backgroundSize: "256px 256px",
        animation: "noise 0.5s steps(4) infinite",
      }}
    />
  );
}
