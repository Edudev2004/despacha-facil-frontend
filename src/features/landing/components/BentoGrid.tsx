"use client";

import React from "react";
import { Zap, MessageCircle, Truck, Database, CheckCircle2, ArrowUpRight } from "lucide-react";

export function BentoGrid() {
  return (
    <section id="features" className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-ink text-acid text-xs font-mono font-bold uppercase rounded-[6px] border border-ink mb-3">
            {"// ARQUITECTURA CORE"}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink uppercase tracking-tighter leading-[0.9]">
            DISEÑADO PARA<br />
            <span className="bg-acid px-2 border-2 border-ink inline-block mt-1 shadow-hard-sm">
              LA VELOCIDAD
            </span>
          </h2>
        </div>
        <p className="font-body text-base md:text-lg text-ink font-medium max-w-md">
          Sin trucos ni pantallas lentas. Toda la infraestructura está construida para soportar transmisiones en vivo y picos masivos de pedidos.
        </p>
      </div>

      {/* Bento Grid: One large 2x2 card and two 1x1 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Large 2x2 Card (spans 2 columns on lg) */}
        <div className="lg:col-span-2 rounded-[24px] border-4 border-ink bg-[#09090B] text-paper p-8 sm:p-10 relative overflow-hidden shadow-hard-lg transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col justify-between">
          {/* Subtle background overlay with mix-blend-overlay */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#D2E823 1.5px, transparent 1.5px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-brand-orange text-ink flex items-center justify-center font-bold border-2 border-ink shadow-hard-sm">
                <Database className="w-5 h-5" />
              </div>
              <span className="font-display text-sm sm:text-base text-brand-orange uppercase tracking-wider">
                MOTOR TRANSACCIONAL // 14MS
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/10 text-teal font-mono text-xs font-bold border border-teal/40">
              ACID COMPLIANT
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 my-8 space-y-4">
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
              RESERVA ATÓMICA DE STOCK
            </h3>
            <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
              Cuando 50 clientes intentan comprar la última prenda talla M durante un Live de TikTok, nuestro algoritmo bloquea la unidad con <code className="bg-acid/20 text-acid px-2 py-0.5 rounded font-mono text-sm">SELECT FOR UPDATE</code> en milisegundos. Cero cancelaciones vergonzosas. Cero sobreventas.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="relative z-10 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
            <div className="bg-white/5 p-4 rounded-[12px] border border-white/10">
              <div className="text-brand-orange font-display text-2xl sm:text-3xl">14ms</div>
              <div className="text-xs text-white/60 uppercase mt-1">Latencia de bloqueo</div>
            </div>
            <div className="bg-white/5 p-4 rounded-[12px] border border-white/10">
              <div className="text-teal font-display text-2xl sm:text-3xl">0%</div>
              <div className="text-xs text-white/60 uppercase mt-1">Margen de sobreventa</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/5 p-4 rounded-[12px] border border-white/10">
              <div className="text-brand-orange font-display text-2xl sm:text-3xl">99.9%</div>
              <div className="text-xs text-white/60 uppercase mt-1">Uptime garantizado</div>
            </div>
          </div>
        </div>

        {/* 1x1 Card A: WhatsApp Checkout */}
        <div className="rounded-[24px] border-4 border-ink bg-paper p-8 relative overflow-hidden shadow-hard-lg dot-pattern transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b-2 border-ink">
            <div className="w-10 h-10 rounded-[10px] bg-teal text-ink flex items-center justify-center font-bold border-2 border-ink shadow-hard-sm">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold text-ink uppercase bg-teal px-2 py-0.5 rounded border border-ink">
              WHATSAPP
            </span>
          </div>

          <div className="my-6 space-y-3">
            <h3 className="font-display text-2xl text-ink uppercase tracking-tight leading-tight">
              CHECKOUT DIRECTO
            </h3>
            <p className="font-body text-sm text-ink/80 leading-relaxed font-medium">
              El cliente arma su carrito en el catálogo móvil y te llega el pedido estructurado con dirección, SKU exacto y comprobante de Yape/Plin.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t-2 border-ink font-body text-xs font-bold text-ink">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-teal" />
              <span>Copia automática de número Yape</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-teal" />
              <span>Adjunto de comprobante directo</span>
            </div>
          </div>
        </div>

        {/* 1x1 Card B: Logistics Kanban & Couriers */}
        <div className="rounded-[24px] border-4 border-ink bg-paper p-8 relative overflow-hidden shadow-hard-lg dot-pattern transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b-2 border-ink">
            <div className="w-10 h-10 rounded-[10px] bg-brand-orange text-ink flex items-center justify-center font-bold border-2 border-ink shadow-hard-sm">
              <Truck className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold text-ink uppercase bg-brand-orange px-2 py-0.5 rounded border border-ink">
              LOGÍSTICA
            </span>
          </div>

          <div className="my-6 space-y-3">
            <h3 className="font-display text-2xl text-ink uppercase tracking-tight leading-tight">
              KANBAN DE DESPACHOS
            </h3>
            <p className="font-body text-sm text-ink/80 leading-relaxed font-medium">
              Controla el flujo de &quot;Preparando&quot;, &quot;En Ruta&quot; y &quot;Entregado&quot;. Asigna guías de Olva Courier, Shalom o tus propios motorizados.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t-2 border-ink font-body text-xs font-bold text-ink">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-brand-orange" />
              <span>Etiquetas de embalaje listas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-brand-orange" />
              <span>Rastreo en tiempo real para cliente</span>
            </div>
          </div>
        </div>

        {/* Bonus 1x1 Card C: Multi-Tenant & Variantes */}
        <div className="lg:col-span-2 rounded-[24px] border-4 border-ink bg-acid p-8 sm:p-10 relative overflow-hidden shadow-hard-lg transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-acid text-xs font-mono font-bold uppercase rounded-[6px]">
              <Zap className="w-3.5 h-3.5 fill-acid" />
              <span>CONTROL TOTAL DE TALLAS & COLORES</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-tight">
              OLVÍDATE DE RESPONDER 50 VECES ¿QUÉ TALLAS QUEDAN?
            </h3>
            <p className="font-body text-sm sm:text-base text-ink font-medium">
              El cliente ve únicamente lo que tienes en stock físico. Cuando se agota una talla, se oculta al instante.
            </p>
          </div>

          <a
            href="/registro"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-4 rounded-[12px] border-2 border-ink bg-ink text-acid font-body font-bold text-sm uppercase tracking-wider shadow-hard hover:bg-paper hover:text-ink transition-colors"
          >
            <span>EMPEZAR YA</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
