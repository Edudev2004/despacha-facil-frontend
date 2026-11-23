"use client";

import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

interface ProductDrop {
  id: string;
  name: string;
  tag: string;
  price: string;
  stock: number;
  isSoldOut?: boolean;
  category: string;
  icon: string;
}

const DROPS: ProductDrop[] = [
  {
    id: "drop-1",
    name: "CASACA STREET TÉRMICA",
    tag: "POPULAR",
    price: "S/ 149.00",
    stock: 2,
    category: "TEXTIL // INVIERNO",
    icon: "🧥",
  },
  {
    id: "drop-2",
    name: "POLERA ACID OVERSIZE",
    tag: "DROP 01",
    price: "S/ 89.00",
    stock: 5,
    category: "STREETWEAR",
    icon: "👕",
  },
  {
    id: "drop-3",
    name: "CHUNKY RUNNER V2",
    tag: "SOLD OUT",
    price: "S/ 229.00",
    stock: 0,
    isSoldOut: true,
    category: "CALZADO // DROP",
    icon: "👟",
  },
  {
    id: "drop-4",
    name: "CARGO PANTS RIPSTOP",
    tag: "ÚLTIMAS",
    price: "S/ 119.00",
    stock: 1,
    category: "PANTALONES",
    icon: "👖",
  },
  {
    id: "drop-5",
    name: "GORRA SNAPBACK DRILL",
    tag: "RESTOCK",
    price: "S/ 49.00",
    stock: 8,
    category: "ACCESORIOS",
    icon: "🧢",
  },
];

export function NewDropsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="drops" className="py-16 sm:py-20 border-t-4 border-ink bg-paper scroll-mt-24">
      <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Header with Arrow Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-block px-3 py-1 bg-acid text-ink text-xs font-mono font-bold uppercase rounded-[6px] border-2 border-ink mb-3 shadow-hard-sm">
              {"// EXPERIENCIA EN VIVO"}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink uppercase tracking-tighter leading-none">
              NEW DROPS
            </h2>
            <p className="font-body text-sm sm:text-base text-ink font-medium mt-2">
              Así es como tus clientes exploran y compran tus productos en el catálogo móvil ultrarrápido.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior drop"
              className="w-12 h-12 rounded-[10px] border-2 border-ink bg-paper flex items-center justify-center shadow-hard hover:bg-acid active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              <ArrowLeft className="w-5 h-5 text-ink" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente drop"
              className="w-12 h-12 rounded-[10px] border-2 border-ink bg-ink text-acid flex items-center justify-center shadow-hard hover:bg-acid hover:text-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Flex Container (overflow-x-auto, hidden scrollbars, 320px cards) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-8 pt-2 scroll-smooth"
        >
          {DROPS.map((drop) => {
            const isSoldOut = drop.isSoldOut;

            return (
              <div
                key={drop.id}
                className={`w-[320px] flex-shrink-0 rounded-[24px] border-2 border-ink bg-white p-5 shadow-hard-lg flex flex-col justify-between transition-all duration-150 hover:-translate-y-1 ${
                  isSoldOut ? "border-ink/60" : ""
                }`}
              >
                {/* Square Image Container */}
                <div
                  className={`relative w-full aspect-square rounded-[16px] border-2 border-ink bg-paper flex items-center justify-center overflow-hidden mb-5 ${
                    isSoldOut ? "grayscale opacity-60" : ""
                  }`}
                >
                  {/* Subtle dot pattern inside container */}
                  <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

                  {/* Product Icon Graphic */}
                  <span className="text-7xl select-none relative z-10 transition-transform duration-200 hover:scale-110">
                    {drop.icon}
                  </span>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`px-3 py-1 text-[11px] font-mono font-bold uppercase rounded-[6px] border border-ink shadow-hard-sm ${
                        isSoldOut
                          ? "bg-ink text-paper"
                          : "bg-acid text-ink"
                      }`}
                    >
                      {drop.tag}
                    </span>
                  </div>

                  {/* Stock counter */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-white text-ink border border-ink rounded-full">
                      {isSoldOut ? "0 STOCK" : `${drop.stock} DISP`}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 mb-4">
                  <span className="text-[11px] font-mono text-ink/70 uppercase">
                    {drop.category}
                  </span>
                  <h3 className="font-display text-xl text-ink uppercase tracking-tight leading-snug">
                    {drop.name}
                  </h3>
                </div>

                {/* Price and Action */}
                <div className="pt-3 border-t-2 border-ink flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-ink/60 uppercase block">
                      PRECIO
                    </span>
                    <span className="font-display text-xl text-ink">
                      {drop.price}
                    </span>
                  </div>

                  {isSoldOut ? (
                    <button
                      disabled
                      className="px-4 py-2 rounded-[8px] border-2 border-ink bg-ink/20 text-ink/50 font-body text-xs font-bold uppercase cursor-not-allowed"
                    >
                      AGOTADO
                    </button>
                  ) : (
                    <button
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] border-2 border-ink bg-ink text-acid font-body text-xs font-bold uppercase shadow-hard-sm hover:bg-acid hover:text-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>PEDIR</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
