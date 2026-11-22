import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { HERO_CONTENT } from "../data/landingContent";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Glow ambiental */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/15 blur-[128px]" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          {HERO_CONTENT.badge}
        </div>

        {/* Titular */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          {HERO_CONTENT.titlePart1}{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            {HERO_CONTENT.titleHighlight}
          </span>{" "}
          {HERO_CONTENT.titlePart2}
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          {HERO_CONTENT.subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/registro">
            <Button size="lg" className="w-full sm:w-auto text-base">
              {HERO_CONTENT.ctaPrimary}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <a href="#planes">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
              Ver Planes y Precios
            </Button>
          </a>
        </div>

        {/* Garantías */}
        <p className="mt-6 text-xs text-zinc-500 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 inline" />
          {HERO_CONTENT.guaranteeText}
        </p>
      </div>
    </section>
  );
}
