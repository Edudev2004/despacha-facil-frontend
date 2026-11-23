"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-block px-3 py-1 bg-acid text-ink text-xs font-mono font-bold uppercase rounded-[6px] border-2 border-ink mb-3 shadow-hard-sm">
          {"// PLANES TRANSPARENTES"}
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink uppercase tracking-tighter leading-tight">
          INVIERTE EN<br />
          <span className="bg-acid px-3 border-2 border-ink inline-block mt-1 shadow-hard-sm">
            NO PERDER VENTAS
          </span>
        </h2>
        <p className="font-body text-base text-ink font-medium mt-4">
          Precios en Soles peruanos (PEN). Sin contratos forzosos. Cancela o cambia de plan cuando quieras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {/* Plan Emprendedor */}
        <div className="rounded-[24px] border-4 border-ink bg-white p-8 sm:p-10 shadow-hard-lg flex flex-col justify-between transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none">
          <div>
            <div className="flex justify-between items-center pb-4 border-b-2 border-ink">
              <span className="font-mono text-xs font-bold uppercase text-ink">
                PLAN INICIAL
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-paper text-ink font-mono text-[10px] font-bold border border-ink">
                7 DÍAS FREE
              </span>
            </div>

            <div className="my-6">
              <h3 className="font-display text-3xl text-ink uppercase">
                EMPRENDEDOR
              </h3>
              <p className="font-body text-xs text-ink/70 mt-1">
                Para marcas que quieren dejar de anotar en cuadernos y hojas de Excel.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl text-ink">S/ 49</span>
                <span className="font-mono text-xs text-ink/70 uppercase">/ mes</span>
              </div>
            </div>

            <ul className="space-y-3 font-body text-sm font-medium text-ink pt-4 border-t-2 border-ink">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-ink stroke-[3]" />
                </div>
                <span>Hasta 50 productos con variantes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-ink stroke-[3]" />
                </div>
                <span>Hasta 150 pedidos mensuales</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-ink stroke-[3]" />
                </div>
                <span>Catálogo público móvil con link propio</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-ink stroke-[3]" />
                </div>
                <span>Reserva atómica de stock (14ms)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-ink stroke-[3]" />
                </div>
                <span>Checkout directo a WhatsApp con Yape/Plin</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/registro"
              className="w-full text-center block px-6 py-4 rounded-[12px] border-2 border-ink bg-paper text-ink font-body font-bold text-sm uppercase tracking-wider shadow-hard-sm hover:bg-acid active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              ELEGIR PLAN EMPRENDEDOR
            </Link>
          </div>
        </div>

        {/* Plan Pro / Negocio (Highlighted in Neo-Brutalist Acid) */}
        <div className="rounded-[24px] border-4 border-ink bg-acid p-8 sm:p-10 shadow-hard-lg flex flex-col justify-between relative transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none">
          {/* Top highlight ribbon */}
          <div className="absolute -top-4 right-8 bg-ink text-teal px-4 py-1 rounded-full border-2 border-ink font-mono text-xs font-bold uppercase shadow-hard-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-teal" />
            <span>MÁS POPULAR</span>
          </div>

          <div>
            <div className="flex justify-between items-center pb-4 border-b-2 border-ink">
              <span className="font-mono text-xs font-bold uppercase text-ink">
                ESCALABILIDAD COMPLETA
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-ink text-teal font-mono text-[10px] font-bold border border-ink">
                RECOMENDADO
              </span>
            </div>

            <div className="my-6">
              <h3 className="font-display text-3xl text-ink uppercase">
                PRO / NEGOCIO
              </h3>
              <p className="font-body text-xs text-ink/80 mt-1">
                Para marcas en crecimiento que despachan a diario con couriers y motorizados.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl text-ink">S/ 89</span>
                <span className="font-mono text-xs text-ink/80 uppercase">/ mes</span>
              </div>
            </div>

            <ul className="space-y-3 font-body text-sm font-bold text-ink pt-4 border-t-2 border-ink">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-ink border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-teal stroke-[3]" />
                </div>
                <span>Hasta 300 productos con variantes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-ink border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-teal stroke-[3]" />
                </div>
                <span>Pedidos mensuales ILIMITADOS</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-ink border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-teal stroke-[3]" />
                </div>
                <span>Tablero Kanban logístico de despachos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-ink border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-teal stroke-[3]" />
                </div>
                <span>Control de guías Olva Courier y Shalom</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-ink border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-teal stroke-[3]" />
                </div>
                <span>Multi-usuario (Operador y Despachador)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-ink border border-ink grid place-items-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-teal stroke-[3]" />
                </div>
                <span>Alertas automáticas de stock crítico</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/registro"
              className="w-full text-center block px-6 py-4 rounded-[12px] border-2 border-ink bg-ink text-acid font-body font-bold text-sm uppercase tracking-wider shadow-hard hover:bg-paper hover:text-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              COMENZAR PRUEBA DE 7 DÍAS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
