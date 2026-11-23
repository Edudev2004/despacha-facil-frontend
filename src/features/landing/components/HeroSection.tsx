"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-4 md:px-8 pt-10 pb-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 flex flex-col items-start text-left pr-0 lg:pr-4 xl:pr-8">
          {/* Sticker Badge: Pill-shaped, rotated -2 deg, #34C9A8 background, 2px solid #09090B border */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-ink bg-teal text-ink text-xs sm:text-sm font-bold font-body uppercase tracking-wider shadow-hard-sm -rotate-2 mb-6">
            <Zap className="w-4 h-4 fill-ink" />
            <span>RESERVA ATÓMICA EN 14MS // ZERO SOBREVENTAS</span>
          </div>

          {/* Display Text in Dela Gothic One with Glitch on hover */}
          <h1 className="font-display uppercase tracking-tighter text-ink text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] leading-[0.9] glitch-hover select-none">
            VENDE MÁS<br />
            <span className="bg-brand-orange text-ink px-4 py-1 border-4 border-ink inline-block my-2 shadow-hard">
              SIN CAOS
            </span><br />
            Y EN UN CLIC
          </h1>

          {/* Subtitle in Space Grotesk */}
          <p className="mt-8 text-base sm:text-lg md:text-xl font-body font-medium text-ink max-w-xl leading-relaxed">
            El catálogo web móvil que congela el stock en tiempo real en la base de datos al pedir. Tus clientes pagan por Yape o Plin y tú organizas tus envíos de Olva Courier o Shalom sin caos.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* Hard-Shadow Button (Special Component) */}
            <Link
              href="/registro"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-[12px] border-2 border-ink bg-ink text-brand-orange font-body font-bold text-sm sm:text-base uppercase tracking-wider shadow-hard hover:bg-brand-orange hover:text-ink hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150"
            >
              <span>CREAR CATÁLOGO GRATIS</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Secondary CTA Button */}
            <a
              href="#drops"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-[12px] border-2 border-ink bg-paper text-ink font-body font-bold text-sm sm:text-base uppercase tracking-wider shadow-hard-lg hover:bg-teal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard transition-all duration-150"
            >
              <span>VER DEMO EN VIVO</span>
            </a>
          </div>

          {/* Quick micro proof */}
          <div className="mt-6 flex items-center gap-4 text-xs font-mono font-bold text-ink/80">
            <span>✓ SIN TARJETA</span>
            <span>•</span>
            <span>✓ LISTO EN 3 MIN</span>
            <span>•</span>
            <span>✓ 100% PERÚ & LATAM</span>
          </div>
        </div>

        {/* Right 5 Columns */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
          {/* Primary Image Card: 32px border-radius, #09090B border */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-[32px] border-4 border-ink bg-[#09090B] p-6 flex flex-col justify-between overflow-hidden shadow-hard-lg">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 dot-pattern-light opacity-60 pointer-events-none" />

            {/* Top Bar of Card */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b-2 border-white/20">
              <div className="flex items-center gap-2">
                <Image
                  src="/df-isotipo.webp"
                  alt="Despacha Fácil"
                  width={24}
                  height={16}
                  className="h-4 w-auto object-contain"
                />
                <span className="font-display text-xs text-brand-orange tracking-wider">
                  TIENDA DEMO // MODAS NAVARRO
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-teal text-ink text-[10px] font-bold font-mono border border-ink">
                LIVE
              </span>
            </div>

            {/* Mockup Centerpiece */}
            <div className="relative z-10 my-auto text-center p-4">
              <div className="w-24 h-24 mx-auto rounded-[20px] bg-brand-orange border-2 border-ink grid place-items-center shadow-hard text-4xl mb-4">
                🧥
              </div>
              <h3 className="font-display text-2xl text-white uppercase tracking-tight">
                CASACA TÉRMICA
              </h3>
              <p className="font-body text-xs text-white/70 mt-1">
                COLECCIÓN INVIERNO · TALLAS S / M / L
              </p>
              <div className="mt-4 inline-block bg-teal text-ink font-display text-xl px-4 py-1.5 rounded-[8px] border-2 border-ink shadow-hard-sm">
                S/ 139.00
              </div>
            </div>

            {/* Bottom Proof bar */}
            <div className="relative z-10 pt-3 border-t-2 border-white/20 flex items-center justify-between text-[11px] font-mono text-white/80">
              <span>STOCK: 1 UNIDAD</span>
              <span className="text-brand-orange font-bold">14MS LOCK</span>
            </div>
          </div>

          {/* Floating Asset Card: box-shadow: 8px 8px 0px 0px #09090B, floating animation y-axis +-10px */}
          <div className="absolute -bottom-6 -left-4 sm:-left-8 z-20 w-64 rounded-[20px] border-2 border-ink bg-teal p-4 shadow-hard-lg animate-float text-left">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-ink font-display text-xs text-ink uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>RESERVA ATÓMICA</span>
            </div>
            <p className="mt-2 text-xs font-body font-bold text-ink leading-tight">
              Cuando el cliente da clic en comprar, el stock se bloquea en la BD. Nadie le quita la prenda.
            </p>
            <div className="mt-3 flex justify-between items-center text-[10px] font-mono font-bold text-ink bg-white p-1.5 rounded-[8px] border border-ink">
              <span>ESTADO</span>
              <span className="text-emerald-700 font-bold">● ACTIVO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
