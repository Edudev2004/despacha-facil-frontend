import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-paper text-ink dot-pattern-light flex flex-col items-center justify-center p-4 selection:bg-brand-orange selection:text-ink">
      <div className="w-full max-w-lg bg-white rounded-[24px] border-3 border-ink shadow-hard-lg overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
        {/* Cabecera Neo-Brutalista */}
        <div className="p-6 border-b-2 border-ink bg-brand-orange flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-white border-2 border-ink grid place-items-center shadow-hard-sm">
              <Compass className="w-4 h-4 text-ink" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink px-2 py-0.5 rounded-[6px] bg-white border border-ink">
              ENLACE NO DISPONIBLE
            </span>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="p-6 sm:p-8 space-y-5">
          <h1 className="font-display text-3xl sm:text-4xl uppercase text-ink tracking-tight leading-none">
            NO ENCONTRAMOS ESTA PÁGINA
          </h1>

          <p className="font-body text-sm text-ink/80 leading-relaxed">
            La dirección a la que intentas ingresar no existe, fue movida o el enlace que utilizaste cambió de ruta.
          </p>

          <div className="p-4 rounded-[14px] bg-paper border-2 border-ink space-y-1">
            <span className="font-mono text-[11px] font-bold text-ink uppercase block">
              ¿QUÉ PUEDES HACER?
            </span>
            <span className="font-body text-xs text-ink/70 block leading-tight">
              Verifica que el enlace esté bien escrito o regresa al panel principal para continuar con tus operaciones.
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-brand-orange text-ink font-body font-bold text-xs uppercase tracking-wider border-2 border-ink shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <Home className="w-4 h-4" />
              <span>IR AL PANEL</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-white text-ink font-body font-bold text-xs uppercase tracking-wider border-2 border-ink shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>VOLVER AL INICIO</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
