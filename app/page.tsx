"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import GlowCursor from "@/components/ui/GlowCursor";
import NoiseOverlay from "@/components/background/NoiseOverlay";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <div data-scroll-container>
        <GlowCursor />
        <NoiseOverlay />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
