"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile/tablet menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "#features", label: "CÓMO FUNCIONA", code: "[ 01 ]" },
    { href: "#drops", label: "CATÁLOGO EN VIVO", code: "[ 02 ]" },
    { href: "#pricing", label: "PLANES TRANSPARENTES", code: "[ 03 ]" },
    { href: "#info", label: "INFORMACIÓN & REDES", code: "[ 04 ]" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-4 mx-3 sm:mx-6 md:mx-8 z-40 transition-all">
        <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3.5 rounded-[12px] border-2 border-ink bg-[#FAF8F5]/90 backdrop-blur-[24px] shadow-hard">
          {/* Logo Left */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 hover:opacity-95 transition-opacity"
          >
            <Image
              src="/despacha-facil-logo.webp"
              alt="Despacha Fácil"
              width={220}
              height={28}
              className="h-5 sm:h-6 md:h-8 lg:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Center Navigation (Only visible on lg: >=1024px) */}
          <nav className="hidden lg:flex items-center gap-8 font-body text-sm font-bold uppercase tracking-wider text-ink">
            <a href="#features" className="hover:text-black hover:text-brand-orange transition-colors">
              {"// CÓMO FUNCIONA"}
            </a>
            <a href="#drops" className="hover:text-black hover:text-brand-orange transition-colors">
              {"// CATÁLOGO"}
            </a>
            <a href="#pricing" className="hover:text-black hover:text-brand-orange transition-colors">
              {"// PLANES"}
            </a>
            <a href="#info" className="hover:text-black hover:text-brand-orange transition-colors">
              {"// INFO"}
            </a>
          </nav>

          {/* Right Area */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Login / Iniciar Sesión Button (ALWAYS VISIBLE on Mobile, Tablet & Desktop) */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold font-body uppercase tracking-wider rounded-[8px] border-2 border-ink bg-paper shadow-hard-sm hover:bg-brand-orange transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none whitespace-nowrap"
            >
              <span>INGRESAR</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>

            {/* Probar Gratis CTA (Visible on Tablet & Desktop: >= md) */}
            <Link
              href="/registro"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 lg:px-5 py-1.5 lg:py-2 text-xs font-bold font-body uppercase tracking-wider rounded-[8px] border-2 border-ink bg-ink text-brand-orange shadow-hard-sm hover:bg-brand-orange hover:text-ink transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none whitespace-nowrap"
            >
              <span>PROBAR GRATIS</span>
              <span className="text-[9px] lg:text-[10px] font-mono font-bold bg-teal text-ink px-1 lg:px-1.5 py-0.2 rounded-sm border border-ink">
                7D
              </span>
            </Link>

            {/* Burger Menu Button (Visible on Mobile & Tablet: < lg) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="relative z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-[8px] border-2 border-ink bg-paper shadow-hard-sm hover:bg-brand-orange transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none lg:hidden"
            >
              {/* Top Bar morphs to +45 deg */}
              <span
                className={`w-3.5 sm:w-5 h-[2px] sm:h-[2.5px] bg-ink rounded-full transition-transform duration-300 ease-in-out origin-center ${
                  isOpen ? "rotate-45 translate-y-[3px] sm:translate-y-[4.25px]" : ""
                }`}
              />
              {/* Bottom Bar morphs to -45 deg */}
              <span
                className={`w-3.5 sm:w-5 h-[2px] sm:h-[2.5px] bg-ink rounded-full transition-transform duration-300 ease-in-out origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[3px] sm:-translate-y-[4.25px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Blur Overlay Menu for Mobile & Tablet */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-[#FAF8F5]/96 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 pb-10 overflow-y-auto animate-in fade-in zoom-in-95 duration-200 lg:hidden">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 my-auto">
            <span className="font-mono text-xs text-ink/60 uppercase tracking-widest block border-b border-ink/20 pb-2">
              {"// NAVEGACIÓN PRINCIPAL"}
            </span>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="group flex items-baseline gap-3 text-2xl sm:text-4xl font-display uppercase tracking-tight text-ink hover:text-brand-orange transition-colors"
              >
                <span className="font-mono text-xs sm:text-sm text-teal font-bold">
                  {item.code}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Action Buttons in Mobile/Tablet Drawer */}
          <div className="pt-6 border-t-2 border-ink flex flex-col gap-3">
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="w-full text-center py-3.5 rounded-[12px] border-2 border-ink bg-paper text-ink font-body font-bold text-sm uppercase tracking-wider shadow-hard-sm hover:bg-brand-orange transition-all"
            >
              INICIAR SESIÓN
            </Link>
            <Link
              href="/registro"
              onClick={handleLinkClick}
              className="w-full text-center py-4 rounded-[12px] border-2 border-ink bg-ink text-brand-orange font-body font-bold text-sm uppercase tracking-wider shadow-hard flex items-center justify-center gap-2 hover:bg-brand-orange hover:text-ink transition-all"
            >
              <span>PROBAR GRATIS 7 DÍAS</span>
              <span className="text-[10px] font-mono font-bold bg-teal text-ink px-1.5 py-0.5 rounded border border-ink">
                SIN TARJETA
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
