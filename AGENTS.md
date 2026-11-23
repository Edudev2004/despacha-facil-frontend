# Despacha Fácil — Agent Instructions & Design System Mandate

Welcome to **Despacha Fácil** (`despachafacil.com`), the leading B2B SaaS social commerce platform in Peru and LATAM for live apparel selling, WhatsApp checkout with Yape/Plin, and automated courier dispatch (Olva Courier & Shalom).

## 1. Visual Architecture & Design System Mandate

All user interfaces across the Despacha Fácil ecosystem (Landing, Merchant Dashboard, Mobile Buyer Catalog, WhatsApp Checkouts, Logistics) MUST strictly follow our **Neo-Brutalist Design System**:

- **Detailed Design Skill:** Refer to [.agents/skills/despacha-facil-design-system/SKILL.md](./.agents/skills/despacha-facil-design-system/SKILL.md).
- **Core Colors:**
  - Canvas / Paper: `#FAF8F5` (`bg-paper`)
  - Ink / Borders: `#09090B` (`text-ink`, `border-ink`)
  - Brand Orange: `#FFA800` (`bg-brand-orange`)
  - Mint Teal: `#34C9A8` (`bg-teal`)
  - Brand Coral: `#F56917` (`bg-brand-coral`)
  - White: `#FFFFFF` (`bg-white`)
- **Typography:**
  - Titles / Display: `Dela Gothic One` (`font-display uppercase tracking-tight`)
  - Body & UI Controls: `Space Grotesk` (`font-body font-bold` or `font-medium`)
  - Codes & Telemetry: `Geist Mono` / Monospace (`font-mono text-xs`)
- **Hard Shadows:** Strictly solid black `border-2 border-ink` with `shadow-hard` (`4px 4px 0px 0px #09090B`), `shadow-hard-sm` (2px), or `shadow-hard-lg` (8px). Blurry gray shadows (`shadow-md`, `shadow-xl`) are strictly forbidden.
- **Tactile Feedback:** All buttons and interactive cards must implement active translation: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`.

## 2. Mobile Viewport Precision (Android & Honor 200 Smart)

- **Left-Aligned on Mobile:** Never center hero headlines, subtitles, or CTAs on mobile viewports (`< lg`). Use `text-left items-start`.
- **Sticky Navbar Clearance:** Provide at least `pt-10 sm:pt-12` top padding to prevent badge stickers from colliding with sticky navbars.
- **Card Stacking:** Never use large absolute negative positions on mobile that block underlying price tags or buy buttons. Use responsive stacking (`relative -mt-6 sm:absolute sm:-bottom-8`).
- **Code Brackets:** Monospace numbers like `[01]` must include `shrink-0 whitespace-nowrap` to prevent brackets from breaking across lines.

## 3. GitFlow Protocol

- Never commit directly to `main` or `develop`.
- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`.
- Pull Requests: PR into `develop`, merge via GitHub CLI (`gh pr merge --merge --delete-branch`), then fast-forward/sync `main` for production Vercel deployment.
