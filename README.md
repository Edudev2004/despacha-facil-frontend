# 📦 Despacha Fácil — Frontend (Next.js 14 / TypeScript / Tailwind CSS)

> **Plataforma SaaS Multi-Tenant para Comercio Social y Retail en Perú y Latinoamérica.**  
> Elimina las sobreventas por WhatsApp/redes sociales mediante catálogos web mobile-first con reserva atómica y tableros Kanban de despacho.

---

## 👥 Equipo de Desarrollo

| Desarrollador | Usuario GitHub | Rol Principal |
| :--- | :--- | :--- |
| **Rommel Navarro** | [@Edudev2004](https://github.com/Edudev2004) | Lead Developer & Arquitectura Core |
| **Angella Pairazamán** | [@AngeDev-Ing](https://github.com/AngeDev-Ing) | Frontend Developer / Landing Page & UX UI |

---

## 🏗️ Arquitectura por Features (Feature-Driven Design)

El proyecto abandona la división clásica por tipos de archivos y se organiza por **capacidades de negocio (Features)**. Cada feature es autosuficiente y desacoplada:

```text
src/
├── app/                              # Next.js App Router (Rutas y Páginas)
│   ├── layout.tsx                    # Layout raíz global
│   ├── page.tsx                      # Renderiza la Landing Page
│   ├── tienda/[slug]/                # Catálogo público del comercio (despachafacil.com/tienda/[slug])
│   ├── login/                        # Inicio de sesión para dueños de tienda
│   ├── registro/                     # Registro de nuevo tenant (Onboarding)
│   └── app/                          # Panel administrativo del comercio (app.despachafacil.com)
│       └── dashboard/                # KPIs, métricas y accesos directos
│
├── features/                         # MÓDULOS DE NEGOCIO DESACOPLADOS
│   ├── landing/                      # 🌟 APARTADO DE LA LANDING PAGE (Asignado a Angella)
│   │   ├── components/               # Navbar, HeroSection, FeaturesSection, PricingSection, etc.
│   │   ├── data/                     # Textos, planes y FAQs editables (landingContent.ts)
│   │   ├── types/                    # Interfaces de la landing (landing.types.ts)
│   │   └── index.ts                  # Exporta <LandingPage />
│   │
│   ├── catalog-public/               # Catálogo público móvil para compradores de WhatsApp
│   │   ├── components/               # ProductCard, VariantSelector, CartDrawer, WhatsAppCheckoutModal
│   │   ├── hooks/                    # useCart, usePublicCatalog
│   │   ├── services/                 # catalogApi.ts (consumo de endpoints públicos)
│   │   └── types/                    # PublicCatalogProduct, CartItem
│   │
│   ├── products/                     # Gestión de productos, SKUs, variantes y stock
│   │   ├── components/               # ProductList, ProductForm, VariantManager
│   │   ├── services/                 # productApi.ts
│   │   └── types/                    # Product, ProductVariant
│   │
│   ├── orders/                       # Pedidos y detalle de transacciones
│   │   ├── components/               # OrderTable, OrderDetailModal
│   │   ├── services/                 # orderApi.ts
│   │   └── types/                    # Order, OrderStatus
│   │
│   ├── dispatches/                   # Tablero Kanban de Logística y Couriers (Olva/Shalom)
│   │   ├── components/               # KanbanBoard, KanbanColumn, DispatchCard
│   │   ├── services/                 # dispatchApi.ts
│   │   └── types/                    # Dispatch, DispatchStatus
│   │
│   └── auth/                         # Autenticación JWT y Tenant Context
│       ├── components/               # LoginForm, RegisterTenantWizard
│       ├── services/                 # authApi.ts
│       └── types/                    # UserSession, LoginCredentials
│
└── shared/                           # RECURSOS GLOBALES COMPARTIDOS
    ├── components/ui/                # Primitivos UI (Button, Badge, Card, Modal, Input)
    ├── lib/                          # apiClient, formatters (S/ PEN, fechas), utils (cn)
    └── types/                        # ApiResponse, PaginatedResponse, ApiError
```

---

## 🌿 Flujo de Trabajo GitFlow

Trabajamos con la metodología **GitFlow** estricta para garantizar orden, estabilidad y revisiones de código eficientes:

```mermaid
gitGraph
   commit id: "v1.0-init"
   branch develop
   checkout develop
   commit id: "dev-setup"
   branch feature/landing-redesign
   checkout feature/landing-redesign
   commit id: "feat: hero update"
   commit id: "feat: pricing toggle"
   checkout develop
   merge feature/landing-redesign id: "merge PR #1"
   checkout main
   merge develop id: "release v1.0.1" tag: "v1.0.1"
```

### 1. Ramas Principales
* **`main`**: Código de **producción** estable, testeado y desplegado en Vercel (`despachafacil.com` / `app.despachafacil.com`). **Prohibido hacer commits directos a `main`.**
* **`develop`**: Rama principal de **desarrollo e integración**. Todas las características nuevas se integran aquí mediante Pull Requests (PRs).

### 2. Ramas de Trabajo
* **`feature/<nombre-descriptivo>`**: Ramas creadas desde `develop` para nuevas funciones.
  * Ejemplo: `feature/landing-redesign`, `feature/cart-drawer`, `feature/kanban-dispatch`.
* **`bugfix/<nombre-descriptivo>`**: Corrección de errores detectados en `develop`.
* **`hotfix/<nombre-descriptivo>`**: Correcciones críticas urgentes nacidas directamente de `main`.

### 3. Convención de Commits (Conventional Commits)
Cada commit debe iniciar con un prefijo semántico en minúsculas:
* `feat:` Nueva funcionalidad para el usuario.
* `fix:` Corrección de un bug.
* `docs:` Cambios exclusivamente en documentación o READMEs.
* `style:` Ajustes visuales de Tailwind o espaciados que no alteran la lógica.
* `refactor:` Mejora o reestructuración de código sin agregar funciones ni romper tests.
* `chore:` Actualización de dependencias, configuración de build o linters.

### 4. Ciclo de un Pull Request (PR)
1. Actualiza tu rama local con `develop`: `git pull origin develop`.
2. Crea tu rama: `git checkout -b feature/mi-tarea`.
3. Desarrolla y commitea con commits semánticos.
4. Sube tu rama: `git push -u origin feature/mi-tarea`.
5. Abre el **Pull Request hacia `develop`** en GitHub solicitando review de tu compañero.

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
* Node.js v20+ o v22+
* npm, pnpm o bun

### Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/Edudev2004/despacha-facil-frontend.git
cd despacha-facil-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno locales
cp .env.example .env.local

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🎨 Guía Rápida para Angella (@AngeDev-Ing) — Landing Page

La plantilla base ya está montada y funcionando en:
👉 `src/features/landing/`

* **Para editar textos, planes o preguntas frecuentes:**  
  Edita el archivo [`src/features/landing/data/landingContent.ts`](src/features/landing/data/landingContent.ts).
* **Para personalizar el diseño visual de cada sección:**  
  Encuentras los componentes en [`src/features/landing/components/`](src/features/landing/components/) (`HeroSection.tsx`, `FeaturesSection.tsx`, `PricingSection.tsx`, etc.).
* **Para probar el build antes de hacer push:**  
  Ejecuta `npm run build` para asegurar que no haya errores de TypeScript ni de compilación.
