"use client";

import React from "react";
import { Zap, MessageCircle, Truck, CheckCircle2, ArrowUpRight } from "lucide-react";

export function BentoGrid() {
  return (
    <section id="features" className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-ink text-brand-orange text-xs font-mono font-bold uppercase rounded-[6px] border border-ink mb-3 shadow-hard-sm">
            {"// BENEFICIOS CLAVE"}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink uppercase tracking-tighter leading-[0.9]">
            DISEÑADO PARA<br />
            <span className="bg-brand-orange px-2 border-2 border-ink inline-block mt-1 shadow-hard-sm">
              VENDER MÁS
            </span>
          </h2>
        </div>
        <p className="font-body text-sm sm:text-base md:text-lg text-ink font-medium max-w-md">
          Vende en vivo por TikTok e Instagram sin enredos. Tus pedidos se organizan solos, tu stock se actualiza en tiempo real y tus clientes compran felices.
        </p>
      </div>

      {/* Bento Grid: 2+1 on Row 1, 1+2 on Row 2 (Balanced on Mobile, Tablet & Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Large 2-column Card (Cero Sobreventas / Reserva Automática) */}
        <div className="md:col-span-2 lg:col-span-2 rounded-[24px] border-4 border-ink bg-[#09090B] text-paper p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-hard-lg transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col justify-between">
          {/* Subtle background overlay */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#FFA800 1.5px, transparent 1.5px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between pb-4 sm:pb-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-brand-orange text-ink flex items-center justify-center font-bold border-2 border-ink shadow-hard-sm">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-display text-xs sm:text-sm md:text-base text-brand-orange uppercase tracking-wider">
                RESERVA AUTOMÁTICA EN VIVO
              </span>
            </div>
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-teal font-mono text-[11px] sm:text-xs font-bold border border-teal/40">
              100% GARANTIZADO
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 my-6 sm:my-8 space-y-3 sm:space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-white leading-tight">
              CERO SOBREVENTAS EN TUS TRANSMISIONES
            </h3>
            <p className="font-body text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              ¿Muchos clientes pidiendo la misma prenda al mismo tiempo en tu Live? Cuando alguien da clic en comprar la última unidad, queda apartada de inmediato. Dile adiós a vender lo que ya no tienes, a las cancelaciones incómodas y a perder clientes enojados.
            </p>
          </div>

          {/* Metric Badges: Row of 3 on tablet & desktop */}
          <div className="relative z-10 pt-4 sm:pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono">
            <div className="bg-white/5 p-3.5 sm:p-4 rounded-[12px] border border-white/10">
              <div className="text-brand-orange font-display text-2xl sm:text-3xl">AL TOQUE</div>
              <div className="text-[11px] sm:text-xs text-white/60 uppercase mt-0.5">Apartado automático</div>
            </div>
            <div className="bg-white/5 p-3.5 sm:p-4 rounded-[12px] border border-white/10">
              <div className="text-teal font-display text-2xl sm:text-3xl">0%</div>
              <div className="text-[11px] sm:text-xs text-white/60 uppercase mt-0.5">Errores y sobreventas</div>
            </div>
            <div className="bg-white/5 p-3.5 sm:p-4 rounded-[12px] border border-white/10">
              <div className="text-brand-orange font-display text-2xl sm:text-3xl">100%</div>
              <div className="text-[11px] sm:text-xs text-white/60 uppercase mt-0.5">Listo para tus Lives</div>
            </div>
          </div>
        </div>

        {/* Card 2: 1x1 Column (WhatsApp Checkout) */}
        <div className="md:col-span-1 lg:col-span-1 rounded-[24px] border-4 border-ink bg-paper p-6 sm:p-8 relative overflow-hidden shadow-hard-lg dot-pattern transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b-2 border-ink">
            <div className="w-10 h-10 rounded-[10px] bg-teal text-ink flex items-center justify-center font-bold border-2 border-ink shadow-hard-sm">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold text-ink uppercase bg-teal px-2 py-0.5 rounded border border-ink">
              WHATSAPP
            </span>
          </div>

          <div className="my-6 space-y-3">
            <h3 className="font-display text-xl sm:text-2xl text-ink uppercase tracking-tight leading-tight">
              CHECKOUT DIRECTO
            </h3>
            <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
              Tu cliente arma su carrito en tu catálogo web y te llega el pedido ordenado directo a tu WhatsApp con nombre, dirección exacta, foto del comprobante de Yape o Plin y las prendas elegidas.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t-2 border-ink font-body text-xs font-bold text-ink">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-teal flex-shrink-0" />
              <span>Número de Yape / Plin copiado en un toque</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-teal flex-shrink-0" />
              <span>Foto del comprobante directo en tu chat</span>
            </div>
          </div>
        </div>

        {/* Card 3: 1x1 Column (Logistics Kanban & Couriers) */}
        <div className="md:col-span-1 lg:col-span-1 rounded-[24px] border-4 border-ink bg-paper p-6 sm:p-8 relative overflow-hidden shadow-hard-lg dot-pattern transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b-2 border-ink">
            <div className="w-10 h-10 rounded-[10px] bg-brand-orange text-ink flex items-center justify-center font-bold border-2 border-ink shadow-hard-sm">
              <Truck className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold text-ink uppercase bg-brand-orange px-2 py-0.5 rounded border border-ink">
              LOGÍSTICA
            </span>
          </div>

          <div className="my-6 space-y-3">
            <h3 className="font-display text-xl sm:text-2xl text-ink uppercase tracking-tight leading-tight">
              ORGANIZADOR DE ENVÍOS
            </h3>
            <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
              Organiza tus paquetes en columnas claras: &quot;Por empaquetar&quot;, &quot;En camino&quot; y &quot;Entregado&quot;. Asigna guías de Olva Courier, Shalom o motorizados sin perder ningún paquete.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t-2 border-ink font-body text-xs font-bold text-ink">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-brand-orange flex-shrink-0" />
              <span>Rótulos de envío con datos listos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink fill-brand-orange flex-shrink-0" />
              <span>Seguimiento claro para tus clientes</span>
            </div>
          </div>
        </div>

        {/* Card 4: 2-column wide Card (Control Total Tallas & Colores) */}
        <div className="md:col-span-2 lg:col-span-2 rounded-[24px] border-4 border-ink bg-brand-orange p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-hard-lg transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-brand-orange text-xs font-mono font-bold uppercase rounded-[6px]">
              <Zap className="w-3.5 h-3.5 fill-brand-orange" />
              <span>CONTROL TOTAL DE TALLAS & COLORES</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-ink uppercase tracking-tight leading-snug">
              OLVÍDATE DE RESPONDER 50 VECES ¿QUÉ TALLAS QUEDAN?
            </h3>
            <p className="font-body text-xs sm:text-sm md:text-base text-ink font-medium">
              Tu catálogo muestra solo las tallas y colores que realmente tienes listos para enviar. Si una talla se agota, desaparece automáticamente para que nadie te pida lo que ya no hay.
            </p>
          </div>

          <a
            href="/registro"
            className="w-full sm:w-auto md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[12px] border-2 border-ink bg-ink text-brand-orange font-body font-bold text-sm uppercase tracking-wider shadow-hard hover:bg-paper hover:text-ink transition-colors whitespace-nowrap active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span>EMPEZAR YA</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
