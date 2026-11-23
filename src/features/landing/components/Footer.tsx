"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="info" className="w-full bg-[#09090B] text-[#F8F4E8] pt-16 sm:pt-20 pb-12 border-t-4 border-ink scroll-mt-24">
      <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Top Section: Newsletter and Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/20">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <Image
                src="/despacha-facil-logo.webp"
                alt="Despacha Fácil"
                width={200}
                height={26}
                className="h-9 w-auto object-contain bg-white px-3 py-1.5 rounded-[10px] border-2 border-ink inline-block mb-4 shadow-hard-sm"
              />
            </div>
            <div className="inline-block px-3 py-1 bg-teal text-ink text-xs font-mono font-bold uppercase rounded-[6px] border border-ink">
              {"// COMUNIDAD DE SELLERS"}
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-paper uppercase tracking-tight">
              RECIBE NOVEDADES DE LOGÍSTICA & E-COMMERCE
            </h3>
            <p className="font-body text-sm sm:text-base text-paper/70 max-w-md">
              Estrategias para vender más en Lives, automatizar envíos en Lima y Provincias, y optimizar tu inventario.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-4 rounded-[12px] border-2 border-teal bg-teal/10 flex items-center gap-3 text-teal font-body font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-teal" />
                <span>¡LISTO! TE HAS SUSCRITO CON ÉXITO AL BOLETÍN.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="TU CORREO ELECTRÓNICO..."
                  required
                  className="flex-1 px-5 py-4 rounded-[12px] border-2 border-[#F8F4E8] bg-transparent text-[#F8F4E8] placeholder:text-paper/40 font-mono text-sm focus:outline-none focus:border-brand-orange"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-[12px] border-2 border-ink bg-brand-orange text-ink font-body font-bold text-sm uppercase tracking-wider shadow-hard-sm hover:bg-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
                >
                  SUSCRIBIRME
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3-Column Layout: Store, Info, Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16 border-b border-white/20">
          {/* Column 1: Store */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-acid block">
              [ 01 // BENEFICIOS & VENTAS ]
            </span>
            <ul className="space-y-2.5 font-body text-sm font-semibold uppercase tracking-wide">
              <li>
                <Link href="#drops" className="text-paper/80 hover:text-acid transition-colors">
                  Catálogo Móvil
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-paper/80 hover:text-acid transition-colors">
                  Apartado Automático de Stock
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-paper/80 hover:text-acid transition-colors">
                  Checkout WhatsApp & Yape
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-paper/80 hover:text-acid transition-colors">
                  Organizador de Envíos Olva / Shalom
                </Link>
              </li>
              <li>
                <Link href="/registro" className="text-acid hover:underline inline-flex items-center gap-1">
                  <span>Prueba Gratis 7 Días</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Info */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-acid block">
              [ 02 // PLATAFORMA & SOPORTE ]
            </span>
            <ul className="space-y-2.5 font-body text-sm font-semibold uppercase tracking-wide">
              <li>
                <span className="text-paper/80">Para Tiendas de Ropa y Emprendedores</span>
              </li>
              <li>
                <span className="text-paper/80">Funciona 24/7 en tus transmisiones en vivo</span>
              </li>
              <li>
                <span className="text-paper/80">Soporte por WhatsApp en Perú</span>
              </li>
              <li>
                <span className="text-paper/80">Panel privado y seguro para tu negocio</span>
              </li>
              <li>
                <span className="text-paper/80">Optimizado para Olva, Shalom, Yape y Plin</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-acid block">
              [ 03 // REDES & COMUNIDAD ]
            </span>
            <ul className="space-y-2.5 font-body text-sm font-semibold uppercase tracking-wide">
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/80 hover:text-acid transition-colors block"
                >
                  TIKTOK // @DESPACHAFACIL
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/80 hover:text-acid transition-colors block"
                >
                  INSTAGRAM // @DESPACHAFACIL.PE
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/80 hover:text-acid transition-colors block"
                >
                  WHATSAPP // COMUNIDAD VIP
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/80 hover:text-acid transition-colors block"
                >
                  YOUTUBE // TUTORIALES Y TIPS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Decorative Brand Text */}
        <div className="pt-12 select-none overflow-hidden text-center">
          <h2 className="font-display text-[12vw] leading-none uppercase tracking-tighter text-white/10 hover:text-white/20 transition-colors">
            DESPACHA FÁCIL
          </h2>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-paper/60">
          <div>
            © 2026 DESPACHA FÁCIL INC. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <div className="flex items-center gap-6">
            <span>PERÚ // LIMA</span>
            <span>•</span>
            <span className="text-acid font-bold">NEO-BRUTALIST ACID SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
