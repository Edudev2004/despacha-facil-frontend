"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14 pb-20 sm:pb-28 lg:pb-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column (Desktop) / Top Section (Mobile & Tablet): Left-aligned on mobile per user request */}
        <div className="w-full lg:col-span-7 flex flex-col items-start text-left mx-auto lg:mx-0 pr-0 lg:pr-4 xl:pr-8 max-w-2xl lg:max-w-none">
          {/* Sticker Badge: Pill-shaped, rotated -2 deg, #34C9A8 background, 2px solid #09090B border */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full border-2 border-ink bg-teal text-ink text-[11px] sm:text-xs md:text-sm font-bold font-body uppercase tracking-wider shadow-hard-sm -rotate-2 mt-2 sm:mt-0 mb-5 sm:mb-6 self-start">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-ink flex-shrink-0" />
            <span>APARTADO AUTOMÁTICO DE PRENDAS // CERO SOBREVENTAS</span>
          </div>

          {/* Display Text in Dela Gothic One with Glitch on hover */}
          <h1 className="w-full font-display uppercase tracking-tighter text-ink text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5.4rem] leading-[0.92] glitch-hover select-none text-left">
            VENDE MÁS<br />
            <span className="bg-brand-orange text-ink px-3 sm:px-4 py-0.5 sm:py-1 border-3 sm:border-4 border-ink inline-block my-2 shadow-hard">
              SIN CAOS
            </span><br />
            Y EN UN CLIC
          </h1>

          {/* Subtitle in Space Grotesk */}
          <p className="w-full mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-ink font-medium max-w-xl leading-relaxed text-left mx-0">
            El catálogo web móvil que aparta las prendas en tiempo real cuando tu cliente hace su pedido. Te pagan por Yape o Plin y organizas tus envíos de Olva Courier o Shalom sin enredos ni confusiones.
          </p>

          {/* CTAs */}
          <div className="w-full mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 sm:gap-4 sm:w-auto">
            {/* Hard-Shadow Button (Special Component) */}
            <Link
              href="/registro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[12px] border-2 border-ink bg-ink text-brand-orange font-body font-bold text-sm sm:text-base uppercase tracking-wider shadow-hard hover:bg-brand-orange hover:text-ink hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 whitespace-nowrap"
            >
              <span>CREAR CATÁLOGO GRATIS</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Secondary CTA Button */}
            <a
              href="#drops"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-[12px] border-2 border-ink bg-paper text-ink font-body font-bold text-sm sm:text-base uppercase tracking-wider shadow-hard-lg hover:bg-teal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard transition-all duration-150 whitespace-nowrap"
            >
              <span>VER DEMO EN VIVO</span>
            </a>
          </div>

          {/* Quick micro proof */}
          <div className="w-full mt-6 flex flex-wrap items-center justify-start gap-x-3.5 gap-y-1.5 text-[11px] sm:text-xs font-mono font-bold text-ink/80 text-left">
            <span>✓ SIN TARJETA</span>
            <span>•</span>
            <span>✓ LISTO EN 3 MIN</span>
            <span>•</span>
            <span>✓ 100% PERÚ & LATAM</span>
          </div>
        </div>

        {/* Right Column / Demo Card: Stacked cleanly on mobile without covering content */}
        <div className="w-full lg:col-span-5 relative mt-10 sm:mt-14 lg:mt-0 flex flex-col items-center sm:block max-w-sm sm:max-w-md mx-auto">
          {/* Primary Image Card: 32px border-radius, #09090B border */}
          <div className="relative w-full aspect-[4/5] rounded-[24px] sm:rounded-[32px] border-4 border-ink bg-[#09090B] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-hard-lg">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 dot-pattern-light opacity-60 pointer-events-none" />

            {/* Top Bar of Card */}
            <div className="relative z-10 flex items-center justify-between pb-3.5 sm:pb-4 border-b-2 border-white/20">
              <div className="flex items-center gap-2">
                <Image
                  src="/df-isotipo.webp"
                  alt="Despacha Fácil"
                  width={24}
                  height={16}
                  className="h-3.5 sm:h-4 w-auto object-contain"
                />
                <span className="font-display text-[11px] sm:text-xs text-brand-orange tracking-wider">
                  TIENDA DEMO // MODAS NAVARRO
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-teal text-ink text-[9px] sm:text-[10px] font-bold font-mono border border-ink">
                LIVE
              </span>
            </div>

            {/* Mockup Centerpiece */}
            <div className="relative z-10 my-auto text-center p-2 sm:p-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-[16px] sm:rounded-[20px] bg-brand-orange border-2 border-ink grid place-items-center shadow-hard text-2xl sm:text-4xl mb-2 sm:mb-4">
                🧥
              </div>
              <h3 className="font-display text-lg sm:text-2xl text-white uppercase tracking-tight">
                CASACA TÉRMICA
              </h3>
              <p className="font-body text-[10px] sm:text-xs text-white/70 mt-0.5 sm:mt-1">
                COLECCIÓN INVIERNO · TALLAS S / M / L
              </p>
              <div className="mt-2.5 sm:mt-4 inline-block bg-teal text-ink font-display text-base sm:text-xl px-3 sm:px-4 py-1 sm:py-1.5 rounded-[8px] border-2 border-ink shadow-hard-sm">
                S/ 139.00
              </div>
            </div>

            {/* Bottom Proof bar */}
            <div className="relative z-10 pt-3 border-t-2 border-white/20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/80">
              <span>STOCK: 1 UNIDAD</span>
              <span className="text-brand-orange font-bold">VENTA SEGURA</span>
            </div>
          </div>

          {/* Floating Asset Card: On mobile stacks right below with -mt-6 overlap, on sm+ floats absolutely */}
          <div className="relative sm:absolute -mt-6 sm:mt-0 sm:-bottom-8 sm:-left-6 md:-left-8 z-20 w-[92%] sm:w-64 max-w-[300px] sm:max-w-[280px] rounded-[18px] sm:rounded-[20px] border-2 border-ink bg-teal p-3.5 sm:p-4 shadow-hard-lg animate-float text-left self-center sm:self-auto">
            <div className="flex items-center gap-2 pb-1.5 sm:pb-2 border-b-2 border-ink font-display text-[11px] sm:text-xs text-ink uppercase">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>PRENDA RESERVADA</span>
            </div>
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs font-body font-bold text-ink leading-snug">
              Cuando tu cliente da clic en comprar, la prenda queda reservada para él. Nadie se la gana mientras realiza el pago.
            </p>
            <div className="mt-2.5 sm:mt-3 flex justify-between items-center text-[9px] sm:text-[10px] font-mono font-bold text-ink bg-white p-1.5 rounded-[8px] border border-ink">
              <span>ESTADO</span>
              <span className="text-emerald-700 font-bold">● ACTIVO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
