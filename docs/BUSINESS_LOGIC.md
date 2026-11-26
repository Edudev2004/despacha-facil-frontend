# Despacha Fácil — Cerebro de Lógica de Negocio (Business Logic)

Este documento es la **fuente de la verdad operativa** para cualquier desarrollador o agente de Inteligencia Artificial que trabaje en el ecosistema **Despacha Fácil** (`despachafacil.com`).

---

## 1. El Problema que Resolvemos en LATAM (Venta en Vivo de Moda)

En Perú y Latinoamérica, miles de tiendas venden ropa a través de transmisiones en vivo por **TikTok Live** e **Instagram Live**:
1. **El Caos de las Libretas:** Las vendedoras anotan a mano en cuadernos quién pidió qué prenda, produciendo **sobreventas** (vender la misma prenda a dos personas distintas).
2. **Falsos Comprobantes:** Los clientes envían capturas falsas o editadas de Yape/Plin por WhatsApp.
3. **Pérdida de Tiempo en Envíos:** Escribir a mano las guías para agencias de encomienda (**Shalom** y **Olva Courier**) demora horas.

**La Solución de Despacha Fácil:** Un sistema web móvil ultra-rápido donde el comprador aparta su prenda en segundos, tiene un temporizador estricto de **20 minutos** para pagar directo al QR de la tienda, y el sistema genera automáticamente las etiquetas y manifiestos de despacho.

---

## 2. El Flujo de la Reserva Atómica (Regla de los 20 Minutos)

El núcleo del negocio es la **reserva atómica con expiración estricta (TTL 20 min)**:

```
[Comprador en Live] 
       │ 
       ▼
 1. Selecciona Prenda (Talla / Color) en Storefront Móvil (/tienda/[slug])
       │
       ▼
 2. Clic en "Apartar Prenda" (POST /api/v1/orders/reserve)
       │
       ├── Bloqueo Pesimista en BD: SELECT stock FROM product_variants WHERE id = ? FOR UPDATE
       ├── Descuenta stock temporal: stock = stock - qty
       └── Crea Pedido en estado: RESERVED (expires_at = now() + 20 minutos)
       │
       ▼
 3. Pantalla Post-Pedido (/pedido/[orderNumber]) con Cronómetro 20:00 Regresivo
       │
       ├─────────────────────────────────┬─────────────────────────────────┐
       ▼                                 ▼                                 ▼
[Escenario A: Pagó a tiempo]      [Escenario B: No pagó en 20m]     [Escenario C: Canceló]
Sube captura Yape/Plin           Scheduler Cron (@Scheduled)       Libera stock voluntario
Estado -> PAYMENT_PENDING         detecta pedidos vencidos          Estado -> CANCELLED
El stock queda reservado          Devuelve stock a la variante      Stock devuelto a BD
                                  Estado -> EXPIRED
```

### Reglas Críticas del Bloqueo y Concurrencia:
- **Zero Sobrevendidos:** Nunca restar stock con lecturas sucias (`READ_COMMITTED` sin lock). Siempre usar `@Lock(LockModeType.PESSIMISTIC_WRITE)`.
- **Inmutabilidad del Cronómetro:** Si el usuario sube el comprobante en el minuto `19:50`, el cronómetro se detiene y el pedido pasa a `PAYMENT_PENDING`.

---

## 3. Modelo de Pagos: Cero Comisiones (0% Pasarela)

- Despacha Fácil **NO** es una pasarela de pagos tipo Stripe, Mercado Pago ni Niubiz.
- El dinero va **100% directo a la cuenta bancaria del comerciante**:
  - El comerciante sube en su panel (`/dashboard/configuracion`) su **QR de Yape** y **QR de Plin** junto con su número celular y titular.
  - El comprador escanea el QR desde su app bancaria y transfiere el monto exacto (Prendas + Flete).
  - El comprador sube la captura de pantalla y digita el número de operación.
  - La vendedora ve la notificación en su bandeja `/dashboard/pedidos` (sección "Por Validar") y hace clic en **Aprobar** o **Rechazar**.

---

## 4. Logística Peruana: Modalidades de Envío (Shalom y Olva)

El cálculo de flete (`ShippingCalculator`) soporta tres modalidades reales del mercado peruano:

1. **Shalom (Recojo en Agencia):**
   - Requiere: Nombre y DNI del titular que recoge, Departamento, Provincia y Nombre/Código de la Agencia Shalom de destino.
   - Puede ser con flete prepagado en el pedido o flete "Pago en Destino".
2. **Olva Courier (Envío a Domicilio o Agencia):**
   - Requiere: Dirección exacta, Referencia, Departamento, Provincia, Distrito y código UBIGEO (6 dígitos).
3. **Motorizado / Entrega Local Express:**
   - Para entregas el mismo día en Lima Metropolitana o radio urbano de provincias. Tarifa fija configurada por la tienda.

### Regla de Envío Gratis:
- La tienda puede definir un umbral (ejemplo: *"Envío gratis por compras mayores a S/ 150.00"*).
- El carrito debe mostrar una barra interactiva de progreso: *"Te faltan S/ 30.00 para envío gratis"*.

---

## 5. Matriz de Roles y Permisos (RBAC en Comercio)

Cada tienda tiene hasta 3 tipos de usuarios:

| Rol | Identificador | Responsabilidades y Accesos Permitidos |
| :--- | :--- | :--- |
| **Administrador / Dueño** | `ROLE_ADMIN` | Control total: Catálogo, Stock, Kardex, Configuración de Marca, Billeteras Yape/Plin, Tarifas, Reportes Financieros, CRUD de Equipo y Roles. |
| **Operador en Vivo** | `ROLE_OPERATOR` | Optimizado para el celular durante el Live: Creación rápida de prendas, control de pedidos en vivo, aprobación de comprobantes Yape/Plin, ventas en POS rápido. |
| **Despachador de Bodega** | `ROLE_DISPATCHER` | Optimizado para empaque: Modo Empaque (Checklist táctil para embolsar prendas), generación e impresión de etiquetas térmicas A6 con QR, generación de manifiestos Shalom/Olva. |
