"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import GlowCursor from "@/components/ui/GlowCursor";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import AIWorkflow from "@/sections/AIWorkflow";
import Timeline from "@/sections/Timeline";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

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
          <Skills />
          <AIWorkflow />
          <Timeline />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
