---
name: despacha-facil-design-system
description: "Autonomous Principal Neo-Brutalist Design Technologist & UI Engineer for the Despacha Fácil B2B SaaS Ecosystem (Landing, Merchant Live-Commerce Dashboard, Mobile Buyer Catalog, WhatsApp Vouchers & Courier Logistics). Enforces strict Neo-Brutalist visual tokens, high-contrast usability, and mobile viewport ergonomics."
category: frontend
risk: low
source: despacha-facil-internal
source_type: proprietary
date_added: "2026-11-23"
author: despacha-facil-core-team
tags: [despacha-facil, neo-brutalism, tailwind, ui-ux, mobile-first, social-commerce, latin-america]
tools: [claude, cursor, gemini, antigravity]
license: "Proprietary"
---

# Despacha Fácil Design System & Ecosystem UI Engineering

## 1. Overview & Core Philosophy

**Despacha Fácil** is the premier B2B SaaS social commerce platform for fashion brands, live sellers, and apparel merchants across Peru and Latin America. Its mission is captured in its battle cry: **"Vende Más Sin Caos y en un Clic"** (Sell More Without Chaos and in One Click).

The user interface follows a strict **Neo-Brutalist / Editorial Brutalism** architecture:
1. **Bold, Tactile Reality:** Solid black borders (`border-ink`), zero blurry drop-shadows, true hard shadows (`shadow-hard`), and interactive press states (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`).
2. **High-Stakes Social Commerce Clarity:** Instant comprehension under TikTok/Instagram Live adrenaline. A merchant or buyer must clearly see stock reservation, Yape/Plin vouchers, and Olva/Shalom couriers with zero cognitive friction.
3. **Mobile-First Android Precision:** Designed and battle-tested for standard Latin American mobile viewports (e.g. Honor 200 Smart, Xiaomi Redmi, Samsung Galaxy — 360px to 412px wide).

---

## 2. The Strict Anti-Slop Banned Matrix

Any agent or developer working on Despacha Fácil MUST immediately eliminate and avoid these forbidden design anti-patterns:

| Banned Anti-Pattern | How It Shows Up (AI Slop) | Mandatory Despacha Fácil Replacement |
| :--- | :--- | :--- |
| **Soft Blurry Shadows** | `shadow-md`, `shadow-xl`, `shadow-2xl` with generic gray blurs. | **Neo-Brutalist Hard Shadows:** `shadow-hard-sm` (2px), `shadow-hard` (4px), or `shadow-hard-lg` (8px) solid black `#09090B`. |
| **Generic Purple / Indigo AI Gradients** | Indigo-to-purple backgrounds, radial glow blobs, dark slate cards. | **Curated Palette:** Warm Cream Paper (`#FAF8F5`), Solid Ink (`#09090B`), Brand Electric Orange (`#FFA800`), Coral (`#F56917`), and Mint Teal (`#34C9A8`). |
| **Pill Buttons Everywhere** | `rounded-full` on primary action buttons. | **Structured Geometric Radius:** `rounded-[8px]` for small controls, `rounded-[12px]` for action buttons, `rounded-[18px]` to `rounded-[24px]` for cards. `rounded-full` is RESERVED solely for status pills/stickers. |
| **Centered Mobile Hero Headlines** | Centering headlines, subtitles, and CTA buttons on phones. | **Left-Aligned Hierarchy (`text-left items-start`):** On mobile viewports (`< lg`), all headings, badges, and CTAs must be left-aligned for rapid downward vertical scanning. |
| **Sticky Navbar Collisions** | Placing content with insufficient top padding (`pt-4` or `pt-6`) below sticky headers. | **Safe Breathing Margins:** Minimum `pt-10 sm:pt-12 md:pt-14` below sticky navbars. Badge stickers must have `mt-2 mb-5` spacing. |
| **Floating Cards Blocking Info** | Using `absolute -bottom-6` on mobile that covers the underlying price, product, or buy button. | **Stacked Responsive Flow:** On mobile use `relative -mt-6 z-20` (slight overlap without covering prices); switch to `sm:absolute sm:-bottom-8` on tablet/desktop. |
| **Bracket / Number Wrapping** | Code badges like `[ 01 ]` splitting into `[` and `01` and `]` across multiple lines. | **Non-Breaking Mono Badges:** Use `[01]` with `shrink-0 whitespace-nowrap` on code indicator spans. |
| **Raw Emojis in Buttons** | Using raw emojis (`🚀`, `📦`, `⚡`) directly inside production buttons or PIL images. | **Crisp Vector SVGs:** Use Lucide React icons (`<Zap />`, `<ArrowRight />`, `<ShieldCheck />`) with uniform 2px stroke width. |
| **Low-Contrast Gray Text** | Tiny `text-gray-400` on light backgrounds. | **High-Contrast Ink:** Minimum `text-ink` (`#09090B`) or `text-ink/80` for high outdoor legibility on budget smartphone displays. |

---

## 3. Design Tokens & Visual Hierarchy

### 3.1 Color Tokens
```typescript
export const colors = {
  paper: "#FAF8F5",       // Canvas & Card Light Background
  ink: "#09090B",         // Deep Black Borders, Typography, Dark Cards
  brand: {
    orange: "#FFA800",    // Primary Accent, Hero Highlight, High-Urgency CTAs
    coral: "#F56917",     // Secondary Warning, Live Alerts
    teal: "#34C9A8",      // Success, Stock Reserved, Live Badges, WhatsApp Verified
  },
  white: "#FFFFFF",       // Clean Card Surface
  gray: {
    border: "#E4E4E7",    // Subtle Pattern Grid Dots
    muted: "#71717A",     // Secondary Metadata
  }
};
```

### 3.2 Typography Tokens
1. **Display Heading (`font-display`):** `Dela Gothic One`, cursive, sans-serif.
   * Usage: Hero headlines, card titles, large price displays, modal titles.
   * Style: Always `uppercase`, `tracking-tight` or `tracking-tighter`, high leading control (`leading-[0.92]` to `leading-none`).
2. **Body & Controls (`font-body`):** `Space Grotesk`, sans-serif.
   * Usage: Paragraphs, button labels, form labels, tooltips.
   * Weights: `font-bold` for action items, `font-medium` for descriptive text.
3. **Telemetry & Technical Codes (`font-mono`):** `Geist Mono` or monospace.
   * Usage: SKU tags, order IDs (`#ORD-9021`), numbers (`[01]`), courier tracking, live stock countdowns.
   * Style: `font-bold`, uppercase, tracking-wider.

### 3.3 Shadow Tokens (Hard Shadows)
```css
/* Small Hard Shadow: Badges, Inset Buttons, Inputs */
.shadow-hard-sm {
  box-shadow: 2px 2px 0px 0px #09090B;
}

/* Medium Hard Shadow: Action Buttons, Floating Badges */
.shadow-hard {
  box-shadow: 4px 4px 0px 0px #09090B;
}

/* Large Hard Shadow: Primary Display Cards, Modals */
.shadow-hard-lg {
  box-shadow: 8px 8px 0px 0px #09090B;
}
```

### 3.4 Interactive Physics
All interactive cards and buttons MUST implement authentic tactile feedback:
```css
/* Button Active Press Class */
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
transition-all duration-150
```

---

## 4. Mobile Viewport Architecture (Honor 200 Smart / Android Precision)

1. **Width Constraints:** Test layouts against `360px` minimum width. Never assume `414px` or `768px`.
2. **Left Alignment on Mobile:**
   ```tsx
   // CORRECT:
   <div className="w-full flex flex-col items-start text-left">
     <h1 className="text-left font-display uppercase ...">...</h1>
     <p className="text-left font-body ...">...</p>
   </div>

   // FORBIDDEN on Mobile:
   // items-center text-center mx-auto
   ```
3. **Safe Vertical Flow (No Accidental Stacking):**
   When stacking overlapping cards on mobile, never use large negative coordinates (`-bottom-16`) that cover actionable areas. Instead, use natural flow with slight overlap:
   ```tsx
   <div className="relative w-full ..."> {/* Main Card */}
     ...
   </div>
   {/* Overlapping Badge: Natural relative flow on mobile, absolute on desktop */}
   <div className="relative -mt-6 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-6 z-20 w-[92%] sm:w-64">
     ...
   </div>
   ```
4. **Burger Menu Integrity:**
   Menu numbers must never break or wrap:
   ```tsx
   <a className="group flex items-start gap-3 text-xl sm:text-3xl font-display uppercase">
     <span className="font-mono text-xs sm:text-sm text-teal font-bold shrink-0 whitespace-nowrap pt-1">
       [01]
     </span>
     <span className="leading-tight">{item.label}</span>
   </a>
   ```

---

## 5. Ecosystem Component Blueprints

### Blueprint 1: Primary Neo-Brutalist CTA Button
```tsx
import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "whatsapp";
  children: React.ReactNode;
}

export function DFButton({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-[12px] border-2 border-ink font-body font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none whitespace-nowrap";
  
  const variants = {
    primary: "bg-ink text-brand-orange shadow-hard hover:bg-brand-orange hover:text-ink hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm",
    secondary: "bg-paper text-ink shadow-hard hover:bg-teal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm",
    whatsapp: "bg-[#25D366] text-ink shadow-hard hover:bg-[#20ba59] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
}
```

### Blueprint 2: Live Apparel Product Card (Buyer Catalog / TikTok Live)
```tsx
import React from "react";
import Image from "next/image";
import { Zap, ShieldCheck } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: string;
  size: string;
  stock: number;
  imageUrl?: string;
  isReserved?: boolean;
  onApartar: () => void;
}

export function LiveApparelCard({
  title,
  price,
  size,
  stock,
  isReserved = false,
  onApartar,
}: ProductCardProps) {
  return (
    <div className="relative w-full rounded-[20px] sm:rounded-[24px] border-3 border-ink bg-white p-4 sm:p-5 flex flex-col justify-between shadow-hard overflow-hidden">
      {/* Top Header: Live Status + SKU */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-ink/20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-bold text-ink uppercase">TIKTOK LIVE #04</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-teal text-ink font-mono text-[10px] font-bold border border-ink">
          TALLA {size}
        </span>
      </div>

      {/* Product Image / Icon Area */}
      <div className="my-4 text-center py-6 bg-paper rounded-[16px] border-2 border-ink grid place-items-center relative">
        <span className="text-5xl sm:text-6xl">🧥</span>
        {stock === 1 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-brand-coral text-white font-mono text-[9px] font-bold uppercase tracking-wider border border-ink shadow-hard-sm">
            ¡ÚLTIMA PRENDA!
          </span>
        )}
      </div>

      {/* Info & Price */}
      <div className="text-left">
        <h4 className="font-display text-lg sm:text-xl text-ink uppercase tracking-tight leading-tight">
          {title}
        </h4>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-display text-2xl text-ink">
            S/ {price}
          </span>
          <span className="font-mono text-xs text-ink/70">
            Stock: {stock} u.
          </span>
        </div>
      </div>

      {/* Action Button: Apartar en Vivo */}
      <button
        onClick={onApartar}
        disabled={isReserved || stock === 0}
        className={`w-full mt-4 py-3 rounded-[10px] border-2 border-ink font-body font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
          isReserved
            ? "bg-teal/50 text-ink cursor-not-allowed border-dashed"
            : "bg-brand-orange text-ink shadow-hard-sm hover:bg-ink hover:text-brand-orange active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        }`}
      >
        <Zap className="w-4 h-4" />
        <span>{isReserved ? "PRENDA RESERVADA" : "APARTAR PRENDA AHORA"}</span>
      </button>
    </div>
  );
}
```

### Blueprint 3: WhatsApp Voucher & Order Reviewer (Merchant Dashboard)
```tsx
import React from "react";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";

interface OrderReviewerProps {
  orderId: string;
  customerName: string;
  customerPhone: string;
  amount: string;
  paymentMethod: "Yape" | "Plin" | "Transferencia";
  voucherUrl: string;
  onApprove: () => void;
  onReject: () => void;
}

export function VoucherReviewCard({
  orderId,
  customerName,
  customerPhone,
  amount,
  paymentMethod,
  voucherUrl,
  onApprove,
  onReject,
}: OrderReviewerProps) {
  return (
    <div className="w-full rounded-[18px] border-2 border-ink bg-white p-4 sm:p-5 shadow-hard flex flex-col md:flex-row gap-5 items-stretch">
      {/* Left: Voucher Snapshot Preview */}
      <div className="w-full md:w-44 h-48 md:h-auto rounded-[12px] border-2 border-ink bg-[#FAF8F5] overflow-hidden relative grid place-items-center shrink-0">
        <span className="font-mono text-[10px] text-ink/60 uppercase">VOUCHER {paymentMethod}</span>
        <div className="absolute inset-0 bg-ink/5 hover:bg-transparent transition-colors cursor-pointer flex items-end p-2">
          <span className="px-2 py-1 rounded bg-white text-ink font-mono text-[9px] font-bold border border-ink shadow-hard-sm flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> VER COMPROBANTE
          </span>
        </div>
      </div>

      {/* Right: Order Telemetry & Controls */}
      <div className="flex-1 flex flex-col justify-between text-left">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-ink/20">
            <span className="font-mono text-xs font-bold text-ink">{orderId}</span>
            <span className="px-2 py-0.5 rounded bg-brand-orange text-ink font-mono text-[10px] font-bold border border-ink">
              POR VALIDAR
            </span>
          </div>
          <h4 className="mt-2 font-display text-base sm:text-lg text-ink uppercase">
            {customerName}
          </h4>
          <p className="font-mono text-xs text-ink/80 mt-0.5">
            WhatsApp: +51 {customerPhone}
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-teal text-ink font-display text-lg">
            S/ {amount} ({paymentMethod})
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 pt-3 border-t-2 border-ink/10 flex items-center gap-3">
          <button
            onClick={onApprove}
            className="flex-1 py-2.5 rounded-[8px] border-2 border-ink bg-ink text-teal font-body font-bold text-xs uppercase tracking-wider shadow-hard-sm hover:bg-teal hover:text-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>APROBAR & DESPACHAR</span>
          </button>
          <button
            onClick={onReject}
            className="px-3 py-2.5 rounded-[8px] border-2 border-ink bg-paper text-ink font-body font-bold text-xs uppercase tracking-wider hover:bg-brand-coral hover:text-white transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Blueprint 4: Courier Dispatch Selector (Olva & Shalom)
```tsx
import React, { useState } from "react";
import { Truck } from "lucide-react";

export function CourierDispatchSelector() {
  const [courier, setCourier] = useState<"olva" | "shalom">("olva");

  return (
    <div className="w-full rounded-[16px] border-2 border-ink bg-paper p-4 shadow-hard text-left">
      <div className="flex items-center gap-2 pb-2 border-b-2 border-ink">
        <Truck className="w-4 h-4 text-ink" />
        <span className="font-display text-xs text-ink uppercase tracking-wider">
          COURIER DE DESPACHO
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        {/* Olva Courier Option */}
        <button
          type="button"
          onClick={() => setCourier("olva")}
          className={`p-3 rounded-[10px] border-2 border-ink text-left transition-all ${
            courier === "olva"
              ? "bg-brand-orange text-ink shadow-hard-sm"
              : "bg-white text-ink/70 hover:bg-white"
          }`}
        >
          <div className="font-display text-sm uppercase">OLVA COURIER</div>
          <div className="font-mono text-[10px] mt-1">A DOMICILIO / AGENCIA</div>
        </button>

        {/* Shalom Option */}
        <button
          type="button"
          onClick={() => setCourier("shalom")}
          className={`p-3 rounded-[10px] border-2 border-ink text-left transition-all ${
            courier === "shalom"
              ? "bg-teal text-ink shadow-hard-sm"
              : "bg-white text-ink/70 hover:bg-white"
          }`}
        >
          <div className="font-display text-sm uppercase">SHALOM</div>
          <div className="font-mono text-[10px] mt-1">RECOJO EN AGENCIA</div>
        </button>
      </div>
    </div>
  );
}
```

### Blueprint 5: Neo-Brutalist Form Input
```tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function DFInput({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full text-left">
      <label className="block font-mono text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
        {"// " + label}
      </label>
      <input
        className={`w-full px-4 py-3 rounded-[10px] border-2 border-ink bg-white font-body text-ink text-sm placeholder:text-ink/40 focus:outline-none focus:ring-0 focus:shadow-hard transition-shadow ${className} ${
          error ? "border-brand-coral" : ""
        }`}
        {...props}
      />
      {error && (
        <span className="block font-mono text-[11px] font-bold text-brand-coral mt-1">
          {error}
        </span>
      )}
    </div>
  );
}
```

---

## 6. Verification Checklist Before Shipping Any Screen

Before considering any page, modal, or component in the Despacha Fácil ecosystem complete, execute this 5-point verification checklist:

1. **Hard Shadow Audit:** Are all drop shadows solid black `#09090B` without blur filters?
2. **Mobile Viewport Test (360px - 400px):**
   * Is the text aligned to the left on mobile screens?
   * Does the sticky navbar have at least `pt-10` clearance?
   * Do menu brackets (`[01]`) stay on a single line without breaking?
   * Are all price tags (`S/ 139.00`) and buy buttons 100% visible and unblocked?
3. **Typography Check:** Is `Dela Gothic One` used strictly for short punchy titles, and `Space Grotesk` used for multi-line readable prose?
4. **Color Harmony:** Does the design honor the brand palette (Paper `#FAF8F5`, Ink `#09090B`, Brand Orange `#FFA800`, Teal `#34C9A8`)?
5. **Tactile Interaction:** Do all clickable elements have `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none` tactile response?
