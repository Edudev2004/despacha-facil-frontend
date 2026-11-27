import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Lock, ShieldCheck, Truck, Zap } from "lucide-react";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Ingresar al Panel",
  description:
    "Inicia sesión en tu panel de Despacha Fácil para gestionar prendas reservadas en vivo, validar pagos Yape/Plin y despachar con Shalom y Olva Courier.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-paper text-ink">
      {/* LEFT BRAND PANEL (Desktop lg+) */}
      <section className="hidden lg:flex lg:col-span-5 xl:col-span-6 bg-ink text-paper dot-pattern-light border-r-[3px] border-ink p-8 xl:p-12 flex-col justify-between relative overflow-hidden">
        {/* Top Logo + Version Badge */}
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

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal text-ink border-2 border-ink font-mono text-xs font-bold uppercase shadow-hard-sm">
            <span className="w-2 h-2 rounded-full bg-ink animate-pulse" />
            PANEL v1.0
          </span>
        </div>

        {/* Center Editorial Headline + Live Status Widget */}
        <div className="my-auto py-10 space-y-8 z-10 max-w-lg">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-brand-orange text-ink border-2 border-ink font-mono text-xs font-bold uppercase -rotate-2 mb-5 shadow-hard-sm">
              <Zap className="w-3.5 h-3.5" />
              <span>LIVE-COMMERCE SIN SOBREVENTAS</span>
            </div>

            <h2 className="font-display text-4xl xl:text-5xl uppercase tracking-tight leading-[0.95] text-paper">
              VENDE EN VIVO
              <br />
              <span className="inline-block bg-brand-orange text-ink px-2.5 py-0.5 my-1.5 border-2 border-ink -rotate-1">
                SIN CAOS
              </span>
              <br />
              NI LIBRETAS.
            </h2>
          </div>

          {/* Neo-Brutalist Ecosystem Pulse Card */}
          <div className="rounded-[20px] border-2 border-ink bg-paper text-ink p-5 shadow-[8px_8px_0px_0px_#FFA800] rotate-1">
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b-2 border-ink/15">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/df-isotipo.webp"
                  alt="Isotipo Despacha Fácil"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  MODO OPERACIÓN // ACTIVO
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-teal border border-ink font-mono text-[10px] font-bold uppercase">
                ONLINE
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white border-2 border-ink">
                <span className="flex items-center gap-2 font-bold">
                  <Clock className="w-4 h-4 text-brand-coral shrink-0" />
                  RESERVA ATÓMICA
                </span>
                <span className="px-2 py-0.5 rounded bg-teal border border-ink font-bold">
                  20:00 MIN
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white border-2 border-ink">
                <span className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
                  YAPE & PLIN DIRECTO
                </span>
                <span className="px-2 py-0.5 rounded bg-brand-orange border border-ink font-bold">
                  0% COMISIÓN
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white border-2 border-ink">
                <span className="flex items-center gap-2 font-bold">
                  <Truck className="w-4 h-4 text-ink shrink-0" />
                  COURIERS PERÚ
                </span>
                <span className="px-2 py-0.5 rounded bg-paper border border-ink font-bold">
                  SHALOM / OLVA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Back Link */}
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

      {/* RIGHT LOGIN FORM PANEL (Mobile + Desktop) */}
      <section className="lg:col-span-7 xl:col-span-6 dot-pattern flex flex-col justify-between lg:justify-center items-start lg:items-center px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
        {/* Mobile/Tablet Top Bar */}
        <div className="w-full max-w-md flex lg:hidden items-center justify-between gap-3 mb-8">
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
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[8px] border-2 border-ink bg-white font-mono text-[11px] font-bold uppercase shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>INICIO</span>
          </Link>
        </div>

        {/* Form Container (Left-aligned on mobile, centered column on desktop) */}
        <div className="w-full max-w-md my-auto">
          {/* Rotated Sticker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-teal text-ink border-2 border-ink shadow-hard-sm font-mono text-xs font-bold uppercase -rotate-2 mb-3">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>ACCESO COMERCIOS</span>
          </div>

          {/* Main Neo-Brutalist Card */}
          <div className="w-full rounded-[20px] border-2 sm:border-[3px] border-ink bg-white p-5 sm:p-8 shadow-hard-lg text-left">
            <div className="flex items-start justify-between gap-3 mb-6">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight leading-none text-ink">
                  INICIAR SESIÓN
                </h1>
                <p className="font-body text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
                  Ingresa a tu tienda para aprobar Yapes, armar paquetes y despachar por Shalom u Olva.
                </p>
              </div>
              <div className="hidden sm:grid w-11 h-11 rounded-[12px] border-2 border-ink bg-paper place-items-center shrink-0 shadow-hard-sm">
                <Image
                  src="/df-isotipo.webp"
                  alt="DF"
                  width={26}
                  height={26}
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>

            <LoginForm />
          </div>

          {/* Trust Micro-Badges (Left-aligned) */}
          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px] font-bold text-ink/75 uppercase">
            <span className="px-2 py-0.5 rounded bg-white border border-ink shrink-0 whitespace-nowrap">
              [SSL STRICT]
            </span>
            <span className="px-2 py-0.5 rounded bg-white border border-ink shrink-0 whitespace-nowrap">
              [AISLAMIENTO MULTI-TENANT]
            </span>
            <span className="px-2 py-0.5 rounded bg-white border border-ink shrink-0 whitespace-nowrap">
              [100% PERÚ]
            </span>
          </div>
        </div>

        {/* Mobile Bottom Spacer */}
        <div className="h-4 lg:hidden" />
      </section>
    </main>
  );
}
