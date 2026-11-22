import React from "react";
import { Package } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-12">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Package className="h-4 w-4" />
          </div>
          <span className="font-bold text-white">
            Despacha<span className="text-emerald-400">Fácil</span>
          </span>
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          © {new Date().getFullYear()} Despacha Fácil. Todos los derechos reservados. Diseñado para el comercio digital en Perú y Latinoamérica.
        </p>
      </div>
    </footer>
  );
}
