"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import GlowCursor from "@/components/ui/GlowCursor";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import AICapabilities from "@/sections/AICapabilities";
import AITools from "@/sections/AITools";
import AIProjects from "@/sections/AIProjects";
import AIOperations from "@/sections/AIOperations";
import AILearning from "@/sections/AILearning";
import AIThinking from "@/sections/AIThinking";
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
          <AICapabilities />
          <AITools />
          <AIProjects />
          <AIOperations />
          <AILearning />
          <AIThinking />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
