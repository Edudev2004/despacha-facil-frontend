import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Crear Catálogo Gratis — 7 Días de Prueba",
  description:
    "Crea tu catálogo móvil en 3 minutos. Aparta prendas en tiempo real durante tus transmisiones en vivo, cobra por Yape o Plin y organiza tus envíos.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-paper text-ink">
      {/* LEFT EDITORIAL PANEL */}
      <section className="hidden lg:flex lg:col-span-5 xl:col-span-5 bg-ink text-paper dot-pattern-light border-r-[3px] border-ink p-8 xl:p-12 flex-col justify-between relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 z-10">
          <Link
            href="/"
            className="inline-flex items-center px-3.5 py-2 rounded-[12px] bg-paper border-2 border-brand-orange shadow-hard-sm hover:opacity-95 transition-opacity"
          >
            <Image
              src="/despacha-facil-logo.webp"
              alt="Despacha Fácil"
              width={200}
              height={26}
              className="h-6 xl:h-7 w-auto object-contain"
              priority
            />
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-ink border-2 border-ink font-mono text-xs font-bold uppercase shadow-hard-sm">
            <span>PRUEBA 7 DÍAS</span>
          </span>
        </div>

        {/* Center Benefits */}
        <div className="my-auto py-8 space-y-6 z-10 max-w-lg text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-teal text-ink border-2 border-ink font-mono text-xs font-bold uppercase -rotate-2 shadow-hard-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>LISTO EN 3 MINUTOS</span>
          </div>

          <h2 className="font-display text-4xl xl:text-5xl uppercase tracking-tight leading-[0.95] text-paper">
            TU TIENDA ONLINE
            <br />
            <span className="inline-block bg-brand-orange text-ink px-2.5 py-0.5 my-1.5 border-2 border-ink -rotate-1">
              SIN COMISIONES
            </span>
            <br />
            Y 100% PARA PERÚ.
          </h2>

          <div className="space-y-3 font-mono text-xs pt-2">
            {[
              "Catálogo web móvil con enlace para tu bio de TikTok / Instagram.",
              "Apartado automático de 20 minutos: cero sobreventas en Lives.",
              "Vouchers directos a tu WhatsApp con QR de Yape y Plin.",
              "Módulo de empaque rápido y etiquetas para Shalom y Olva Courier.",
              "Sin tarjeta de crédito requerida para empezar.",
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-[10px] bg-white text-ink border-2 border-ink shadow-hard-sm">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium text-xs leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="flex items-center justify-between text-xs font-mono text-paper/70 z-10 pt-4 border-t border-paper/15">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-paper hover:text-brand-orange font-bold uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>VOLVER A LA LANDING</span>
          </Link>
          <span>PERÚ & LATAM</span>
        </div>
      </section>

      {/* RIGHT REGISTRATION FORM */}
      <section className="lg:col-span-7 xl:col-span-7 dot-pattern flex flex-col justify-between lg:justify-center items-start lg:items-center px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
        {/* Mobile Top Bar */}
        <div className="w-full max-w-lg flex lg:hidden items-center justify-between gap-3 mb-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/despacha-facil-logo.webp"
              alt="Despacha Fácil"
              width={180}
              height={24}
              className="h-6 w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[8px] border-2 border-ink bg-white font-mono text-[11px] font-bold uppercase shadow-hard-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>INICIO</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-lg my-auto text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-brand-orange text-ink border-2 border-ink shadow-hard-sm font-mono text-xs font-bold uppercase -rotate-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>ONBOARDING // REGISTRO RÁPIDO</span>
          </div>

          <div className="w-full rounded-[20px] border-2 sm:border-[3px] border-ink bg-white p-5 sm:p-7 shadow-hard-lg">
            <div className="flex items-start justify-between gap-3 mb-5 border-b-2 border-ink/15 pb-4">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight leading-none text-ink">
                  CREAR CATÁLOGO GRATIS
                </h1>
                <p className="font-body text-xs sm:text-sm text-ink/75 mt-1.5 leading-relaxed">
                  Configura tu tienda en 3 minutos. Tu prueba gratis dura 7 días y no te pedimos tarjeta.
                </p>
              </div>
              <div className="hidden sm:grid w-11 h-11 rounded-[12px] border-2 border-ink bg-paper place-items-center shrink-0 shadow-hard-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>

            <RegisterForm />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px] font-bold text-ink/75 uppercase">
            <span className="px-2 py-0.5 rounded bg-white border border-ink">[SIN TARJETA]</span>
            <span className="px-2 py-0.5 rounded bg-white border border-ink">[YAPE & PLIN DIRECTO]</span>
            <span className="px-2 py-0.5 rounded bg-white border border-ink">[LISTO EN 3 MIN]</span>
          </div>
        </div>

        <div className="h-4 lg:hidden" />
      </section>
    </main>
  );
}
