import React from "react";
import { Card } from "@/shared/components/ui/Card";
import { FEATURES_DATA } from "../data/landingContent";
import { ShieldCheck, MessageCircle, Truck, Layers } from "lucide-react";

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  MessageCircle: MessageCircle,
  Truck: Truck,
  Layers: Layers,
};

export function FeaturesSection() {
  return (
    <section id="beneficios" className="py-20 border-t border-zinc-900 bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Diseñado para la velocidad
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Todo lo que necesitas para despachar como los grandes
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES_DATA.map((feature) => {
            const Icon = ICON_MAP[feature.iconName as keyof typeof ICON_MAP] || ShieldCheck;
            return (
              <Card key={feature.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
