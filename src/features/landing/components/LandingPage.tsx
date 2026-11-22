import React from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { ComingSoonSection } from "./ComingSoonSection";
import { PricingSection } from "./PricingSection";
import { Footer } from "./Footer";

/**
 * ============================================================================
 * LANDING PAGE - DESPACHA FÁCIL
 * ----------------------------------------------------------------------------
 * Desarrollado por / Asignado a:
 * Angella Pairazamán (@AngeDev-Ing)
 *
 * Puedes modificar libremente los componentes en ./components
 * o los textos y planes en ../data/landingContent.ts
 * ============================================================================
 */
export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ComingSoonSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
