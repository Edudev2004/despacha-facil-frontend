import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Package, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <Package className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Despacha<span className="text-emerald-400">Fácil</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#beneficios" className="text-sm text-zinc-400 transition hover:text-white">
            Beneficios
          </a>
          <a href="#rubros" className="text-sm text-zinc-400 transition hover:text-white">
            Rubros
          </a>
          <a href="#planes" className="text-sm text-zinc-400 transition hover:text-white">
            Planes
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/registro">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              Prueba Gratis
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
