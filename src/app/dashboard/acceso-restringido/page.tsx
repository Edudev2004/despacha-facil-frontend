"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <main className="min-h-[70vh] w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-[24px] border-3 border-ink shadow-hard-lg overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
        {/* Cabecera Neo-Brutalista Ámbar */}
        <div className="p-6 border-b-2 border-ink bg-brand-orange flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-white border-2 border-ink grid place-items-center shadow-hard-sm">
              <ShieldAlert className="w-4 h-4 text-ink" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink px-2 py-0.5 rounded-[6px] bg-white border border-ink">
              ACCESO RESTRINGIDO
            </span>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="p-6 sm:p-8 space-y-5">
          <h1 className="font-display text-3xl sm:text-4xl uppercase text-ink tracking-tight leading-none">
            ZONA NO AUTORIZADA
          </h1>

          <p className="font-body text-sm text-ink/80 leading-relaxed">
            Tu rol actual en la tienda no cuenta con los permisos necesarios para acceder a este módulo.
          </p>

          <div className="p-4 rounded-[14px] bg-paper border-2 border-ink space-y-1">
            <span className="font-mono text-[11px] font-bold text-ink uppercase block">
              GESTIÓN DE PERMISOS
            </span>
            <span className="font-body text-xs text-ink/70 block leading-tight">
              Si necesitas trabajar en esta sección, solicita al administrador del negocio que actualice tus accesos en el panel de equipo.
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-brand-orange text-ink font-body font-bold text-xs uppercase tracking-wider border-2 border-ink shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <Home className="w-4 h-4" />
              <span>IR A MI PANEL</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-white text-ink font-body font-bold text-xs uppercase tracking-wider border-2 border-ink shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>VOLVER ATRÁS</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
