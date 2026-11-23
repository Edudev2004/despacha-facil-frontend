"use client";

import React from "react";

export function MarqueeTicker() {
  const items = [
    "★ ZERO SOBREVENTAS",
    "✦ RESERVA ATÓMICA EN 14MS",
    "★ CHECKOUT DIRECTO WHATSAPP",
    "✦ VOUCHERS YAPE & PLIN",
    "★ TABLERO KANBAN DE DESPACHOS",
    "✦ CONTROL DE MOTORIZADOS & COURIERS",
    "★ OLVA COURIER & SHALOM",
    "✦ 100% COMMERCE PERÚ & LATAM",
  ];

  return (
    <div className="w-full bg-acid border-y-4 border-ink py-4 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* Loop twice for seamless scrolling */}
        <div className="flex items-center gap-8 px-4">
          {items.map((text, idx) => (
            <span
              key={`marquee-1-${idx}`}
              className="font-display text-lg sm:text-2xl text-ink uppercase tracking-tight whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          {items.map((text, idx) => (
            <span
              key={`marquee-2-${idx}`}
              className="font-display text-lg sm:text-2xl text-ink uppercase tracking-tight whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
