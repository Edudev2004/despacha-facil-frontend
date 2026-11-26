"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Package,
  Truck,
  PlusCircle,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 text-left">
      {/* Banner de Bienvenida Neo-Brutalista */}
      <section className="relative p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] border-3 border-ink bg-brand-orange text-ink shadow-hard-lg overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border-2 border-ink font-mono text-xs font-bold shadow-hard-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral fill-brand-coral" />
            <span>TIENDA ONLINE CREADA CON ÉXITO</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl text-ink uppercase tracking-tight leading-none">
            ¡BIENVENIDO A TU PANEL, R&M PERSONALIZA!
          </h1>

          <p className="font-body text-sm sm:text-base text-ink/90 font-medium">
            Tu catálogo público ya está en línea. Puedes comenzar a cargar tus prendas,
            vender en transmisiones de TikTok o Instagram con apartado de 20 minutos y despachar con Shalom u Olva.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/productos"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] bg-ink text-brand-orange border-2 border-ink font-body font-bold text-xs sm:text-sm uppercase tracking-wider shadow-hard hover:bg-white hover:text-ink transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <PlusCircle className="w-4 h-4" />
              <span>CREAR PRIMERA PRENDA</span>
            </Link>

            <Link
              href="/tienda/r-m-personaliza"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] bg-paper text-ink border-2 border-ink font-body font-bold text-xs sm:text-sm uppercase tracking-wider shadow-hard hover:bg-teal transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <span>VER CATÁLOGO PÚBLICO</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Decorativo de fondo */}
        <div className="hidden sm:block absolute -right-6 -bottom-8 select-none pointer-events-none opacity-20 font-display text-[140px] text-ink leading-none">
          DF
        </div>
      </section>

      {/* Tarjetas KPI de Estado Rápido */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-[16px] border-2 border-ink bg-white shadow-hard flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-ink/70 uppercase">
              PRENDAS EN CATÁLOGO
            </span>
            <Package className="w-5 h-5 text-ink" />
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-ink">0</span>
            <span className="font-mono text-[11px] text-ink/60 block mt-0.5">
              Límite plan: 50 prendas
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[16px] border-2 border-ink bg-white shadow-hard flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-ink/70 uppercase">
              PEDIDOS POR VALIDAR
            </span>
            <Clock className="w-5 h-5 text-brand-coral" />
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-ink">0</span>
            <span className="font-mono text-[11px] text-ink/60 block mt-0.5">
              Apartados activos de 20 min
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[16px] border-2 border-ink bg-white shadow-hard flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-ink/70 uppercase">
              POR DESPACHAR
            </span>
            <Truck className="w-5 h-5 text-teal" />
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-ink">0</span>
            <span className="font-mono text-[11px] text-ink/60 block mt-0.5">
              Shalom & Olva Courier
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[16px] border-2 border-ink bg-white shadow-hard flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-ink/70 uppercase">
              VENTAS DEL MES
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-ink">S/ 0.00</span>
            <span className="font-mono text-[11px] text-ink/60 block mt-0.5">
              Yape, Plin y Efectivo
            </span>
          </div>
        </div>
      </section>

      {/* Pasos de Configuración Rápida para Salir a Vender */}
      <section className="p-6 sm:p-8 rounded-[20px] border-2 border-ink bg-white shadow-hard space-y-4">
        <div className="border-b-2 border-ink/15 pb-3">
          <h2 className="font-display text-xl sm:text-2xl text-ink uppercase tracking-tight">
            LISTA DE LANZAMIENTO PARA TU LIVE
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink/70">
            Completa estos pasos para tener todo listo antes de tu próxima transmisión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-[14px] bg-paper border-2 border-ink shadow-hard-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-teal bg-ink px-2 py-0.5 rounded-[4px]">
                PASO 01
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-display text-sm uppercase text-ink">
              1. REGISTRAR TIENDA
            </h3>
            <p className="font-body text-xs text-ink/70">
              Cuenta creada y subdominio reservado exitosamente.
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-white border-2 border-ink shadow-hard-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-ink bg-brand-orange px-2 py-0.5 rounded-[4px] border border-ink">
                PASO 02
              </span>
            </div>
            <h3 className="font-display text-sm uppercase text-ink">
              2. SUBIR PRODUCTOS
            </h3>
            <p className="font-body text-xs text-ink/70">
              Añade fotos, tallas, colores y stock para que tus clientes puedan apartar.
            </p>
            <Link
              href="/dashboard/productos"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-brand-orange hover:text-ink underline pt-1"
            >
              <span>Ir a productos</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 rounded-[14px] bg-white border-2 border-ink shadow-hard-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-ink bg-teal px-2 py-0.5 rounded-[4px] border border-ink">
                PASO 03
              </span>
            </div>
            <h3 className="font-display text-sm uppercase text-ink">
              3. CONFIGURAR YAPE / PLIN
            </h3>
            <p className="font-body text-xs text-ink/70">
              Sube tu QR y número para recibir pagos directos sin comisiones.
            </p>
            <Link
              href="/dashboard/configuracion"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-teal hover:text-ink underline pt-1"
            >
              <span>Subir mi QR</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
