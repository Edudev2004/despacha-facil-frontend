# Despacha Fácil — Protocolo de Ingeniería, GitFlow & GitHub Projects

Bienvenido a **Despacha Fácil** (`despachafacil.com`), SaaS B2B de comercio social en Perú y Latinoamérica para venta de moda en transmisiones en vivo (TikTok/Instagram), reservas atómicas de 20 minutos, pagos directos Yape/Plin y logística automatizada (Shalom y Olva Courier).

Cualquier agente de IA, desarrollador o colaborador que trabaje en este ecosistema DEBE acatar estrictamente las siguientes reglas operativas.

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

## 2. Tablero de Gestión: GitHub Projects v2

* **Tablero Maestro:** [Despacha Fácil — MVP v1.0 (Project #12)](https://github.com/users/Edudev2004/projects/12)
* **Organización de Sprints:**
  * 6 Sprints organizados como hitos verticales (Backend + Frontend de punta a punta).
  * 27 Requisitos Funcionales (`RF-01` al `RF-27`).
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

---

## 4. Arquitectura de Backend y Multi-Tenancy

* **Base de datos compartida, esquema compartido:** Todo registro de negocio (productos, pedidos, clientes, stock) DEBE incluir `tenant_id` obligatorio.
* **Seguridad:** Tokens JWT en cookies `HttpOnly` (`df_token`) y cabecera `Authorization: Bearer`.
* **Aislamiento:** Uso de `TenantContext` (`ThreadLocal`) para inyectar y filtrar por `tenant_id` en cada petición autenticada.
* **Concurrencia:** Reserva de stock atómica con bloqueo pesimista en base de datos (`SELECT ... FOR UPDATE`) y control de tiempo de vida (TTL 20 min).
