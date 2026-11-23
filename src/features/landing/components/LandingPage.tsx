"use client";

import React from "react";
import { CustomCursor } from "./CustomCursor";
import { NoiseOverlay } from "./NoiseOverlay";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { MarqueeTicker } from "./MarqueeTicker";
import { BentoGrid } from "./BentoGrid";
import { NewDropsSection } from "./NewDropsSection";
import { PricingSection } from "./PricingSection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-acid selection:text-ink relative overflow-x-hidden">
      {/* 1. Global Custom Cursor with mix-blend-mode: difference */}
      <CustomCursor />

      {/* 2. Global SVG Noise Overlay (3% opacity) */}
      <NoiseOverlay />

      {/* 3. Sticky Navigation Bar */}
      <Navbar />

      {/* 4. 12-Column Hero Section */}
      <main>
        <HeroSection />

        {/* 5. Continuous 20s Linear Loop Marquee */}
        <MarqueeTicker />

        {/* 6. Bento Category Grid */}
        <BentoGrid />

        {/* 7. Horizontal Scrolling Product Section (New Drops) */}
        <NewDropsSection />

        {/* 8. Pricing Section with Neo-Brutalist Cards */}
        <PricingSection />
      </main>

      {/* 9. Full-width Footer */}
      <Footer />
    </div>
  );
}
