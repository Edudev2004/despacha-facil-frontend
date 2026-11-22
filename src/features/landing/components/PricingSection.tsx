import React from "react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { PLANS_DATA } from "../data/landingContent";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section id="planes" className="py-24 border-t border-zinc-900 bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Planes Transparentes
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Invierte en no perder ventas
          </p>
          <p className="mt-4 text-zinc-400">
            Precios en Soles peruanos (PEN). Cancela o cambia de plan cuando quieras.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {PLANS_DATA.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col justify-between ${
                plan.isPopular ? "border-emerald-500 shadow-2xl shadow-emerald-950/40" : ""
              }`}
            >
              <div>
                {plan.badge && (
                  <div className="absolute -top-3 right-6">
                    <Badge variant="success" className="px-3 py-1 font-semibold">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">S/ {plan.monthlyPrice}</span>
                  <span className="text-sm font-medium text-zinc-400">/ mes</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Link href="/registro">
                  <Button
                    variant={plan.isPopular ? "primary" : "outline"}
                    className="w-full text-base"
                    size="lg"
                  >
                    {plan.ctaText}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
