"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-4 mx-4 md:mx-8 z-40 transition-all">
      <div className="flex items-center justify-between px-6 py-4 rounded-[12px] border-2 border-ink bg-[#F8F4E8]/90 backdrop-blur-[24px] shadow-hard">
        {/* Logo left with brand image */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-95 transition-opacity"
        >
          <Image
            src="/despacha-facil-logo.webp"
            alt="Despacha Fácil"
            width={220}
            height={28}
            className="h-8 sm:h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center Links (desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-bold uppercase tracking-wider text-ink">
          <a href="#features" className="hover:text-black transition-colors">
            {"// METRICAS"}
          </a>
          <a href="#drops" className="hover:text-black transition-colors">
            {"// CATÁLOGO"}
          </a>
          <a href="#pricing" className="hover:text-black transition-colors">
            {"// PLANES"}
          </a>
          <a href="#info" className="hover:text-black transition-colors">
            {"// INFO"}
          </a>
        </nav>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1 px-4 py-2 text-xs font-bold font-body uppercase tracking-wider rounded-[8px] border-2 border-ink bg-paper shadow-hard-sm hover:bg-acid transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span>INGRESAR</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/registro"
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold font-body uppercase tracking-wider rounded-[8px] border-2 border-ink bg-ink text-brand-orange shadow-hard-sm hover:bg-brand-orange hover:text-ink transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span>PROBAR GRATIS</span>
            <span className="text-[10px] font-mono font-bold bg-brand-teal text-ink px-1.5 py-0.2 rounded-sm border border-ink">
              7D
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
