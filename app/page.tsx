"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import GlowCursor from "@/components/ui/GlowCursor";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <div data-scroll-container>
        <GlowCursor />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
