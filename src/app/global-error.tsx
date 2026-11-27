"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registro interno en cliente sin exponer al usuario
    console.error("[DESPACHA_FACIL_SYSTEM_ERROR]", error);
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-screen w-full bg-paper text-ink dot-pattern-light flex flex-col items-center justify-center p-4 selection:bg-brand-orange selection:text-ink">
        <main className="w-full max-w-lg bg-white rounded-[24px] border-3 border-ink shadow-hard-lg overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
          {/* Cabecera Neo-Brutalista Coral */}
          <div className="p-6 border-b-2 border-ink bg-brand-coral text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-white border-2 border-ink grid place-items-center shadow-hard-sm">
                <AlertCircle className="w-4 h-4 text-ink" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink px-2 py-0.5 rounded-[6px] bg-white border border-ink">
                AVISO DEL SISTEMA
              </span>
            </div>
          </div>

          {/* Cuerpo amigable sin revelar códigos ni stack traces */}
          <div className="p-6 sm:p-8 space-y-5">
            <h1 className="font-display text-3xl sm:text-4xl uppercase text-ink tracking-tight leading-none">
              ALGO SALIÓ INESPERADO
            </h1>

            <p className="font-body text-sm text-ink/80 leading-relaxed">
              Ocurrió una interrupción momentánea al procesar tu solicitud. El equipo ya está al tanto y los datos de tu comercio están seguros.
            </p>

            <div className="p-4 rounded-[14px] bg-paper border-2 border-ink space-y-1">
              <span className="font-mono text-[11px] font-bold text-ink uppercase block">
                RECOMENDACIÓN
              </span>
              <span className="font-body text-xs text-ink/70 block leading-tight">
                Puedes reintentar la acción de inmediato o regresar al panel principal para continuar tus despachos.
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-brand-orange text-ink font-body font-bold text-xs uppercase tracking-wider border-2 border-ink shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>REINTENTAR AHORA</span>
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-white text-ink font-body font-bold text-xs uppercase tracking-wider border-2 border-ink shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <Home className="w-4 h-4" />
                <span>IR AL PANEL</span>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
