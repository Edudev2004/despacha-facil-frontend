# Despacha Fácil — Mapa de Sprints, Parent Issues (Epics) y 27 RFs

Este documento define la estructura de trabajo en **GitHub Projects v2** ([Tablero #12](https://github.com/users/Edudev2004/projects/12)) para organizar el desarrollo sincronizado entre colaboradores y agentes de IA.

---

## Mapa de Sprints & Parent Issues (Epics)

```
[PROYECTO MVP v1.0]
 │
 ├── SPRINT 1: Base, Marca & Accesos ────────────► EPIC-01 (RF-01 al RF-05)
 ├── SPRINT 2: Catálogo, Variantes & Tarifas ────► EPIC-02 (RF-06 al RF-10)
 ├── SPRINT 3: Inventario, Kardex & Storefront ──► EPIC-03 (RF-11 al RF-15)
 ├── SPRINT 4: Carrito, Reserva 20m & Lives ─────► EPIC-04 (RF-16 al RF-20)
 ├── SPRINT 5: Pagos, Empaque & Despachos ───────► EPIC-05 (RF-21 al RF-24)
 └── SPRINT 6: Tracking, Métricas & Reportes ────► EPIC-06 (RF-25 al RF-27)
```

---

## Desglose Completo por Epic / Sprint

### 📦 EPIC-01: Base, Marca & Accesos (Sprint 1)
- **RF-01:** Onboarding: Registro de Comercio, Slug Único e Invitaciones. *(Completado)*
- **RF-02:** Aislamiento Multi-Tenant estricto por `tenant_id`. *(Completado)*
- **RF-03:** Autenticación JWT en Cookies HttpOnly y Protección de Rutas RBAC. *(Completado)*
- **RF-04:** CRUD de Equipo y Roles en Panel Admin con Shell Responsive. *(Completado)*
- **RF-05:** Configuración de Marca, Colores y QR de Billeteras Yape / Plin. *(Siguiente a trabajar)*

---

### 👗 EPIC-02: Catálogo, Variantes & Tarifas (Sprint 2)
- **RF-06:** Motor de Tarifas Base (`shipping_rates`), Tarifario Shalom/Olva y Umbral de Envío Gratis.
- **RF-07:** Gestor Rápido de Categorías por Tienda.
- **RF-08:** CRUD de Prendas Padre y Galería de Fotos Multi-Subida (`product_images`).
- **RF-09:** Matriz Generadora de Variantes (Tallas x Colores), SKU automático y Alerta de Stock Mínimo.
- **RF-10:** Merchandising en Lista: Badges de Descuento, Oferta Tachada y Ordenamiento en Catálogo.

---

### 📊 EPIC-03: Inventario, Kardex & Storefront Público (Sprint 3)
- **RF-11:** Kardex Inmutable: Entradas de Mercadería con Costo Unitario, Mermas y Ajustes de Stock.
- **RF-12:** Tarjeta de Valorización de Inventario y Alertas de Stock Crítico.
- **RF-13:** Catálogo Público Móvil Neo-Brutalista (/tienda/[slug]) de Ultra-Alta Conversión.
- **RF-14:** Validación Rápida de Stock en Carrito sin Bloqueo Prematuro.
- **RF-15:** Selector de Modalidad de Envío (Agencia Shalom / Olva Domicilio / Motorizado).

---

### ⚡ EPIC-04: Carrito, Reserva Atómica 20m & Operación Live (Sprint 4)
- **RF-16:** Reserva Atómica de Stock con Bloqueo Pesimista (`PESSIMISTIC_WRITE`) y Pedido con TTL de 20 min.
- **RF-17:** Pantalla Post-Pedido (/pedido/[orderNumber]): Timer 20:00 regresivo, QR Yape/Plin y botón WhatsApp.
- **RF-18:** Scheduler Cron de Expiración Automática: Monitoreo cada 60s y devolución instantánea de stock a BD.
- **RF-19:** Módulo POS Rápido para Venta Presencial o WhatsApp Directo con flete libre.
- **RF-20:** Bandeja de Pedidos "Por Validar" ordenados por proximidad de expiración del cronómetro.

---

### 🏷️ EPIC-05: Validación de Pagos, Modo Bodega & Despachos (Sprint 5)
- **RF-21:** Acción de Aprobación de Pago (Transición a `PREPARING`) o Rechazo con Liberación de Stock.
- **RF-22:** Modo Empaque Táctil para Celular/Tablet en Bodega (Checklist `order_items.is_packed`).
- **RF-23:** Generador de Etiquetas Térmicas 10x15 cm (Formato A6) con código QR de Tracking.
- **RF-24:** Tablero Multimodal de Despachos y Generación de Manifiestos de Carga para Shalom y Olva.

---

### 📈 EPIC-06: Tracking Público, Métricas & Reportes (Sprint 6)
- **RF-25:** Portal Público ¿Dónde está mi pedido? (`/track/[orderNumber]`) sin necesidad de inicio de sesión.
- **RF-26:** API y Dashboard de Métricas Operativas (Ventas del día, Prendas más vendidas, Tasa de conversión de Lives).
- **RF-27:** Exportador de Reportes Financieros y de Envíos en Excel (`.xlsx`) con Apache POI y `.csv`.
