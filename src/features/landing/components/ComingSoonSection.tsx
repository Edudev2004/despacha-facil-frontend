import React from "react";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { SECTORS_DATA } from "../data/landingContent";
import { ShoppingBag, Printer, Scissors } from "lucide-react";

const SECTOR_ICONS = {
  ShoppingBag: ShoppingBag,
  Printer: Printer,
  Scissors: Scissors,
};

export function ComingSoonSection() {
  return (
    <section id="rubros" className="py-20 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Especializado por Rubro
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tu negocio no es igual a los demás
          </p>
          <p className="mt-4 text-zinc-400">
            Comenzamos con Retail 100% optimizado y muy pronto abriremos módulos especiales para talleres y servicios.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SECTORS_DATA.map((sector) => {
            const Icon = SECTOR_ICONS[sector.iconName as keyof typeof SECTOR_ICONS] || ShoppingBag;
            const isActive = sector.status === "ACTIVE";

            return (
              <Card
                key={sector.id}
                className={isActive ? "border-emerald-500/40 bg-emerald-950/10" : "opacity-80"}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant={isActive ? "success" : "warning"}>
                    {isActive ? "Disponible Ahora" : "Próximamente"}
                  </Badge>
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{sector.name}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {sector.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
