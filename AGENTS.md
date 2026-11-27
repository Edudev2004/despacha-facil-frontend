# Despacha Fácil — Protocolo de Ingeniería, GitFlow & GitHub Projects

Bienvenido a **Despacha Fácil** (`despachafacil.com`), SaaS B2B de comercio social en Perú y Latinoamérica para venta de moda en transmisiones en vivo (TikTok/Instagram), reservas atómicas de 20 minutos, pagos directos Yape/Plin y logística automatizada (Shalom y Olva Courier).

Cualquier agente de IA, desarrollador o colaborador que trabaje en este ecosistema DEBE acatar estrictamente las siguientes reglas operativas.

---

## 0. Documentos Fundacionales de Contexto (Lectura Obligatoria para toda IA)

Antes de escribir código o plantear soluciones, todo agente debe asimilar:
1. **Lógica de Negocio y Reglas de Venta:** [docs/BUSINESS_LOGIC.md](./docs/BUSINESS_LOGIC.md)
   *(Explicación de Live-Commerce, reserva atómica 20 min, flujo de comprobantes Yape/Plin sin pasarela y logística peruana Shalom/Olva).*
2. **Arquitectura de Base de Datos & Multi-Tenancy:** [docs/ARCHITECTURE_DB.md](./docs/ARCHITECTURE_DB.md)
   *(Esquema PostgreSQL compartido, estados del pedido, convención de nombres JPA con `_` y políticas de aislamiento).*
3. **Mapa de Sprints y Parent Issues (Epics):** [docs/SPRINTS_PARENT_ISSUES.md](./docs/SPRINTS_PARENT_ISSUES.md)
   *(Estructura de los 6 Sprints verticales y los 27 Requisitos Funcionales del MVP).*
4. **Mandato Visual Neo-Brutalista:** [.agents/skills/despacha-facil-design-system/SKILL.md](./.agents/skills/despacha-facil-design-system/SKILL.md)
   *(Bordes negros, cero sombras difuminadas, colores oficiales, tipografías Dela Gothic y Space Grotesk).*

---

## 1. Protocolo GitFlow y Ciclo de Vida por Task / RF

Para cada Requisito Funcional (`RF-XX`) o tarea técnica:

1. **Partir siempre desde `develop` actualizado:**
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. **Crear rama de trabajo específica:**
   * Nuevas funcionalidades: `feature/RF-XX-descripcion-corta`
   * Correcciones de bugs: `fix/RF-XX-descripcion-corta`
   * Refactor / dependencias / chores: `chore/RF-XX-descripcion-corta`
   * **PROHIBICIÓN ESTRICTA:** Nunca realizar commits directos sobre `develop` ni sobre `main`.
3. **Mover estado en GitHub Projects:**
   * Al iniciar el trabajo, mover el Issue correspondiente a la columna **In Progress**.
4. **Verificación de calidad antes del commit:**
   * **Backend:** Compilación limpia sin errores (`mvn test-compile` o pruebas unitarias).
   * **Frontend:** Sin errores de tipado ni linting (`npx tsc --noEmit && npm run lint`).
   * **Diseño:** Cumplir el sistema Neo-Brutalista (ver Sección 3).
5. **Crear Pull Request hacia `develop`:**
   * Título en formato Conventional Commits: `feat(modulo): [RF-XX] Descripción clara`
   * El cuerpo del PR **debe incluir** `Closes #ID_DEL_ISSUE` para cerrar y enlazar automáticamente el requerimiento.
6. **Merge y limpieza:**
   * Realizar el merge hacia `develop` (vía GitHub CLI o API).
   * Eliminar la rama de la característica (`feature/...`) local y remotamente.
   * Actualizar el estado del Issue a **Done** en el tablero del proyecto.

---

## 2. Tablero de Gestión: GitHub Projects v2 & Parent Issues

* **Tablero Maestro:** [Despacha Fácil — MVP v1.0 (Project #12)](https://github.com/users/Edudev2004/projects/12)
* **Organización en 6 Epics / Parent Issues:**
  * `EPIC-01: Base, Marca & Accesos` (Sprint 1 - RF-01 al RF-05)
  * `EPIC-02: Catálogo, Variantes & Tarifas` (Sprint 2 - RF-06 al RF-10)
  * `EPIC-03: Inventario, Kardex & Storefront` (Sprint 3 - RF-11 al RF-15)
  * `EPIC-04: Carrito, Reserva 20m & Lives` (Sprint 4 - RF-16 al RF-20)
  * `EPIC-05: Pagos, Empaque & Despachos` (Sprint 5 - RF-21 al RF-24)
  * `EPIC-06: Tracking, Métricas & Reportes` (Sprint 6 - RF-25 al RF-27)
* **Campos del Tablero:**
  * `Sprint`: Del `Sprint 1: Base & Marca` al `Sprint 6: Tracking & Reportes`.
  * `Capa`: `Backend` (Spring Boot 3 + PostgreSQL) o `Frontend` (Next.js 14 + Tailwind).
  * `Prioridad`: `Must Have` o `Should Have` (Metodología MoSCoW).
  * `Status`: `Todo` $\rightarrow$ `In Progress` $\rightarrow$ `Done`.

---

## 3. Mandato Visual: Sistema de Diseño Neo-Brutalista

Toda pantalla del ecosistema (Landing, Panel de Tienda, Catálogo Móvil y Tracking) debe cumplir rigurosamente el skill [.agents/skills/despacha-facil-design-system/SKILL.md](./.agents/skills/despacha-facil-design-system/SKILL.md):

* **Colores Oficiales:**
  * Papel / Fondo claro: `#FAF8F5` (`bg-paper`)
  * Tinta / Bordes / Textos: `#09090B` (`text-ink`, `border-ink`, `border-2` o `border-3`)
  * Ámbar Eléctrico (Marca / Primario): `#FFA800` (`bg-brand-orange`)
  * Menta Esmeralda (Éxito / Live / Apartado): `#34C9A8` (`bg-teal`)
  * Coral Fuego (Urgencia / Errores): `#F56917` (`bg-brand-coral`)
  * Blanco puro: `#FFFFFF` (`bg-white`)
* **Tipografías:**
  * Titulares y Display: `Dela Gothic One` (`font-display uppercase tracking-tight`)
  * Texto, Formularios y Botones: `Space Grotesk` (`font-body font-bold` o `font-medium`)
  * Códigos, SKUs, Timers y Precios: `Geist Mono` o monospace (`font-mono`)
* **Sombras Duras (Zero Blur):**
  * `shadow-hard-sm` (2px), `shadow-hard` (4px) o `shadow-hard-lg` (8px) en negro sólido `#09090B`. Están prohibidas las sombras difuminadas (`shadow-md`, `shadow-xl`).
* **Respuesta Táctil:**
  * Todos los botones interactivos deben responder al clic: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`.
* **Ergonomía Móvil (Android / Honor 200 Smart / 360px+):**
  * Títulos y cabeceras siempre alineados a la izquierda (`text-left items-start`), nunca centrados en móvil.
  * Etiquetas de código `[01]` con `shrink-0 whitespace-nowrap` para evitar que los corchetes se quiebren.
  * Botones apilables verticalmente en pantallas estrechas con `flex-col sm:flex-row`.
* **Páginas de Error Seguras:**
  * Cero exposición de códigos numéricos (403, 404, 500) o stack traces hacia el cliente. Emplear pantallas amigables con diseño Neo-Brutalista (`not-found.tsx`, `global-error.tsx`, `acceso-restringido/page.tsx`).

---

## 4. Arquitectura de Backend y Multi-Tenancy

* **Base de datos compartida, esquema compartido:** Todo registro de negocio (productos, pedidos, clientes, stock) DEBE incluir `tenant_id` obligatorio.
* **Seguridad:** Tokens JWT en cookies `HttpOnly` (`df_token`) y cabecera `Authorization: Bearer`.
* **Aislamiento:** Uso de `TenantContext` (`ThreadLocal`) para inyectar y filtrar por `tenant_id` en cada petición autenticada.
* **Concurrencia:** Reserva de stock atómica con bloqueo pesimista en base de datos (`SELECT ... FOR UPDATE`) y control de tiempo de vida (TTL 20 min).
* **Navegación JPA:** Usar `findByTenant_Id` para relaciones de entidad `@ManyToOne Tenant tenant`.

---

## 5. Protocolo de Logging Estructurado & Trazabilidad ("Reglas de Oro")

Todo controlador, servicio de negocio y filtro de seguridad DEBE implementar logging profesional con Slf4j / Logger bien etiquetado con tags `[MODULO][ACCION]`:

1. **Tagging Obligatorio:**
   * Formato: `log.info("[MODULO][ACCION] [Tenant: {}] [User: {}] Detalle claro...", tenantId, userEmail);`
   * Ejemplos: `[AUTH][LOGIN]`, `[TEAM][CREATE]`, `[TEAM][ROLE_CHANGE]`, `[SECURITY][AUTH_FILTER]`, `[STOCK][RESERVE]`.
2. **Niveles Estrictos (Zero Saturación en Prod):**
   * **`ERROR`:** Excepciones no controladas, fallos de conexión o breaches de seguridad. Siempre con stack trace o mensaje claro.
   * **`WARN`:** Intentos de acceso denegados (403, 401), tokens expirados, validaciones de negocio rechazadas (stock insuficiente).
   * **`INFO`:** Eventos clave del negocio (inicio de servidor, login exitoso, nuevo colaborador, pedido despachado). No satura el disco.
   * **`DEBUG`:** Payloads de entrada/salida, headers de autenticación, queries detalladas. Habilitado en local para desarrollo; deshabilitado en prod.
3. **Frontend API Client:**
   * Toda petición desde el frontend debe incluir `credentials: "include"` para transmitir de manera segura las cookies HttpOnly (`df_token`).

---

## 6. Mandato de Imágenes: Optimización WebP y Cloudflare R2 ("Regla de Cero Sobrecosto")

Toda funcionalidad, pantalla o módulo que involucre subida o gestión de imágenes (Sprint 1: Marca, Banner y QR Yape/Plin; Sprint 2: Catálogo y Fotos de Productos; Sprint 5: Comprobantes de Pago Yape/Plin) DEBE acatar estrictamente las siguientes reglas:

1. **Conversión Obligatoria a WebP en el Navegador (`imageOptimizer.ts`):**
   * Toda imagen DEBE convertirse a formato `.webp` directamente en el cliente (Browser Canvas) **antes** de enviarse al backend.
   * **PROHIBICIÓN ESTRICTA:** Queda terminantemente prohibido subir imágenes crudas sin optimizar (archivos JPG/PNG pesados de 3MB a 12MB).
   * **Límites de Resolución y Calidad:**
     * **Logos y Códigos QR:** Máximo 600x600 px o 800x800 px (calidad 0.85, peso meta: ~20 KB – 50 KB).
     * **Banners de Tienda & Lives:** Máximo 1400x450 px (calidad 0.85, peso meta: ~80 KB – 140 KB).
     * **Fotos de Productos en Catálogo (Sprint 2):** Máximo 1080x1080 px (calidad 0.85, peso meta: ~70 KB – 120 KB).
2. **Componente Estándar de Carga (`ImageUploader.tsx`):**
   * Toda interfaz de carga de imágenes debe usar obligatoriamente el componente `ImageUploader` con diseño Neo-Brutalista (borde punteado negro, feedback táctil, indicador de ahorro de peso y fallback opcional de URL externa).
3. **Almacenamiento en Cloudflare R2 con Aislamiento Tenant:**
   * Las imágenes se almacenan exclusivamente en Cloudflare R2 bajo prefijos aislados:  
     `tenants/{tenantId}/{folder}/{uuid}.webp`
   * Cabecera obligatoria de caché de alto rendimiento: `CacheControl: public, max-age=31536000, immutable`.
4. **Política de Cero Basura Huérfana (Purga Automática de Storage):**
   * **Al eliminar:** Cuando un usuario haga clic en "Eliminar" en el frontend, el sistema DEBE invocar de inmediato `DELETE /api/v1/storage?url=...` para destruir físicamente el objeto en Cloudflare R2.
   * **Al reemplazar:** Si el usuario sube una imagen nueva sobre un campo que ya tenía una imagen previa, el sistema DEBE purgar automáticamente el archivo antiguo de Cloudflare R2.
   * **Al actualizar entidades en Backend:** Todo servicio de negocio (`TenantSettingsService`, `ProductService`, etc.) que modifique campos de imagen DEBE invocar `storageService.deleteFile(oldUrl)` para no dejar archivos huérfanos que consuman cuota o generen sobrecostos.
   * **Aislamiento de Eliminación:** Un tenant solo puede eliminar archivos cuyo prefijo coincida estrictamente con su `tenantId` (`tenants/{tenantId}/...`).

