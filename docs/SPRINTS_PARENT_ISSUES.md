# Despacha Fácil — Mapa de Sprints, Parent Issues (Epics) y 27 RFs

Este documento define la estructura oficial de trabajo en **GitHub Projects v2** ([Tablero #12](https://github.com/users/Edudev2004/projects/12)) para organizar el desarrollo sincronizado entre colaboradores y agentes de IA.

---

## 🗺️ Mapa de Parent Issues (Epics) Creados en GitHub

| Parent Issue (Epic) | Issue GitHub | Hito / Sprint | RFs que Abarca | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **EPIC-01** | [#36](https://github.com/Edudev2004/despacha-facil-backend/issues/36) | `Sprint 1: Base, Marca & Accesos` | `RF-01`, `RF-02`, `RF-03`, `RF-04`, `RF-05` | **En Progreso (80%)** |
| **EPIC-02** | [#37](https://github.com/Edudev2004/despacha-facil-backend/issues/37) | `Sprint 2: Catálogo, Variantes & Tarifas` | `RF-06`, `RF-07`, `RF-08`, `RF-09`, `RF-10` | **Todo** |
| **EPIC-03** | [#38](https://github.com/Edudev2004/despacha-facil-backend/issues/38) | `Sprint 3: Inventario, Kardex & Storefront` | `RF-11`, `RF-12`, `RF-13`, `RF-14`, `RF-15` | **Todo** |
| **EPIC-04** | [#39](https://github.com/Edudev2004/despacha-facil-backend/issues/39) | `Sprint 4: Carrito, Reserva 20m & Lives` | `RF-16`, `RF-17`, `RF-18`, `RF-19`, `RF-20` | **Todo** |
| **EPIC-05** | [#40](https://github.com/Edudev2004/despacha-facil-backend/issues/40) | `Sprint 5: Pagos, Empaque & Despachos` | `RF-21`, `RF-22`, `RF-23`, `RF-24` | **Todo** |
| **EPIC-06** | [#41](https://github.com/Edudev2004/despacha-facil-backend/issues/41) | `Sprint 6: Tracking, Métricas & Reportes` | `RF-25`, `RF-26`, `RF-27` | **Todo** |

---

## Desglose Completo por Epic / Sprint

### 📦 [EPIC-01] Base, Marca & Accesos (Sprint 1) — Issue #36
- **RF-01:** Onboarding: Registro de Comercio, Slug Único e Invitaciones. *(Completado - Backend #3 / Frontend #14)*
- **RF-02:** Aislamiento Multi-Tenant estricto por `tenant_id`. *(Completado - Backend #4)*
- **RF-03:** Autenticación JWT en Cookies HttpOnly y Protección de Rutas RBAC. *(Completado - Backend #5 / Frontend #15)*
- **RF-04:** CRUD de Equipo y Roles en Panel Admin con Shell Responsive. *(Completado - Backend #6 / Frontend #16)*
- **RF-05:** Configuración de Marca, Colores y QR de Billeteras Yape / Plin. *(Siguiente a trabajar - Backend #7 / Frontend #17)*

---

### 👗 [EPIC-02] Catálogo, Variantes & Tarifas (Sprint 2) — Issue #37
- **RF-06:** Motor de Tarifas Base (`shipping_rates`), Tarifario Shalom/Olva y Umbral de Envío Gratis. *(Backend #8 / Frontend #18)*
- **RF-07:** Gestor Rápido de Categorías por Tienda. *(Backend #9 / Frontend #19)*
- **RF-08:** CRUD de Prendas Padre y Galería de Fotos Multi-Subida (`product_images`). *(Backend #10 / Frontend #20)*
- **RF-09:** Matriz Generadora de Variantes (Tallas x Colores), SKU automático y Alerta de Stock Mínimo. *(Backend #11 / Frontend #21)*
- **RF-10:** Merchandising en Lista: Badges de Descuento, Oferta Tachada y Ordenamiento en Catálogo. *(Backend #12 / Frontend #22)*

---

### 📊 [EPIC-03] Inventario, Kardex & Storefront Público (Sprint 3) — Issue #38
- **RF-11:** Kardex Inmutable: Entradas de Mercadería con Costo Unitario, Mermas y Ajustes de Stock. *(Backend #13 / Frontend #23)*
- **RF-12:** Tarjeta de Valorización de Inventario y Alertas de Stock Crítico. *(Backend #14 / Frontend #24)*
- **RF-13:** Catálogo Público Móvil Neo-Brutalista (/tienda/[slug]) de Ultra-Alta Conversión. *(Backend #15 / Frontend #25)*
- **RF-14:** Validación Rápida de Stock en Carrito sin Bloqueo Prematuro. *(Backend #16 / Frontend #26)*
- **RF-15:** Selector de Modalidad de Envío (Agencia Shalom / Olva Domicilio / Motorizado). *(Backend #17 / Frontend #27)*

---

### ⚡ [EPIC-04] Carrito, Reserva Atómica 20m & Operación Live (Sprint 4) — Issue #39
- **RF-16:** Reserva Atómica de Stock con Bloqueo Pesimista (`PESSIMISTIC_WRITE`) y Pedido con TTL de 20 min. *(Backend #18 / Frontend #28)*
- **RF-17:** Pantalla Post-Pedido (/pedido/[orderNumber]): Timer 20:00 regresivo, QR Yape/Plin y botón WhatsApp. *(Frontend #29)*
- **RF-18:** Scheduler Cron de Expiración Automática: Monitoreo cada 60s y devolución instantánea de stock a BD. *(Backend #19)*
- **RF-19:** Módulo POS Rápido para Venta Presencial o WhatsApp Directo con flete libre. *(Backend #20 / Frontend #30)*
- **RF-20:** Bandeja de Pedidos "Por Validar" ordenados por proximidad de expiración del cronómetro. *(Backend #21 / Frontend #31)*

---

### 🏷️ [EPIC-05] Validación de Pagos, Modo Bodega & Despachos (Sprint 5) — Issue #40
- **RF-21:** Acción de Aprobación de Pago (Transición a `PREPARING`) o Rechazo con Liberación de Stock. *(Backend #22 / Frontend #32)*
- **RF-22:** Modo Empaque Táctil para Celular/Tablet en Bodega (Checklist `order_items.is_packed`). *(Backend #23 / Frontend #33)*
- **RF-23:** Generador de Etiquetas Térmicas 10x15 cm (Formato A6) con código QR de Tracking. *(Frontend #34)*
- **RF-24:** Tablero Multimodal de Despachos y Generación de Manifiestos de Carga para Shalom y Olva. *(Backend #24 / Frontend #35)*

---

### 📈 [EPIC-06] Tracking Público, Métricas & Reportes (Sprint 6) — Issue #41
- **RF-25:** Portal Público ¿Dónde está mi pedido? (`/track/[orderNumber]`) sin necesidad de inicio de sesión. *(Backend #25 / Frontend #36)*
- **RF-26:** API y Dashboard de Métricas Operativas (Ventas del día, Prendas más vendidas, Tasa de conversión de Lives). *(Backend #26 / Frontend #37)*
- **RF-27:** Exportador de Reportes Financieros y de Envíos en Excel (`.xlsx`) con Apache POI y `.csv`. *(Backend #27 / Frontend #38)*
