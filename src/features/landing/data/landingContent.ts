import { FeatureItem, PlanItem, SectorItem, FaqItem } from "../types/landing.types";

/**
 * ============================================================================
 * DATOS EDITABLES DE LA LANDING PAGE
 * Diseñado para que Angella Pairazamán (@AngeDev-Ing) pueda ajustar copys,
 * precios y secciones fácilmente.
 * ============================================================================
 */

export const HERO_CONTENT = {
  badge: "🚀 El SaaS de Despachos para WhatsApp & Redes",
  titlePart1: "Vende por WhatsApp sin",
  titleHighlight: "sobreventas ni caos",
  titlePart2: "en tus despachos",
  subtitle:
    "El catálogo web ultra-rápido que reserva el stock en tiempo real y organiza tus pedidos en un tablero Kanban. Ideal para tiendas de ropa, calzado y accesorios en Perú y LATAM.",
  ctaPrimary: "Crear mi catálogo gratis",
  ctaSecondary: "Ver demo en vivo",
  guaranteeText: "Prueba gratis por 7 días · Sin tarjeta de crédito · Listo en 3 minutos",
};

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "atomic-stock",
    title: "Cero Sobreventas (Reserva Atómica)",
    description:
      "Cuando un cliente pide desde tu catálogo, el stock se bloquea en milisegundos. Nunca más vendas dos veces la misma prenda por chat.",
    iconName: "ShieldCheck",
  },
  {
    id: "whatsapp-checkout",
    title: "Checkout Directo a WhatsApp",
    description:
      "Tus clientes arman su carrito y el pedido te llega estructurado por WhatsApp con dirección, producto exacto y voucher de Yape/Plin.",
    iconName: "MessageCircle",
  },
  {
    id: "kanban-dispatch",
    title: "Tablero Logístico de Despachos",
    description:
      "Pasa tus pedidos de 'Preparando' a 'En Ruta' y 'Entregado' con un solo clic. Controla motorizados y envíos de Olva Courier o Shalom.",
    iconName: "Truck",
  },
  {
    id: "variants-control",
    title: "Control Total de Tallas y Colores",
    description:
      "Administra SKUs, fotos y stock por cada variante. Olvídate de responder 50 veces al día '¿qué tallas te quedan?'.",
    iconName: "Layers",
  },
];

export const SECTORS_DATA: SectorItem[] = [
  {
    id: "retail",
    name: "Retail / Ropa, Calzado & Accesorios",
    status: "ACTIVE",
    description: "Venta directa de productos con tallas, colores y existencias en tiempo real.",
    iconName: "ShoppingBag",
  },
  {
    id: "manufacturing",
    name: "Talleres / Sublimación & Personalizados",
    status: "COMING_SOON",
    description: "Control de insumos (polos base, cajas, papel) y empaques personalizables.",
    iconName: "Printer",
  },
  {
    id: "services",
    name: "Servicios / Barberías & Salones",
    status: "COMING_SOON",
    description: "Gestión de citas y consumo de productos (tintes, tratamientos).",
    iconName: "Scissors",
  },
];

export const PLANS_DATA: PlanItem[] = [
  {
    id: "emprendedor",
    name: "Emprendedor",
    tagline: "Para tiendas personales que quieren dejar de anotar en cuadernos.",
    monthlyPrice: 49,
    features: [
      "Hasta 50 productos con variantes",
      "Hasta 150 pedidos mensuales",
      "Catálogo público móvil con link propio",
      "Reserva atómica de stock (cero sobreventas)",
      "Checkout directo a WhatsApp",
      "Soporte por WhatsApp",
    ],
    ctaText: "Elegir Plan Emprendedor",
  },
  {
    id: "pro",
    name: "Pro / Negocio",
    tagline: "Para marcas en crecimiento que despachan a diario con couriers.",
    monthlyPrice: 89,
    badge: "Más Popular",
    isPopular: true,
    features: [
      "Hasta 300 productos con variantes",
      "Pedidos mensuales ilimitados",
      "Tablero Kanban de despachos",
      "Control de motorizados (Olva, Shalom)",
      "Alertas de stock mínimo crítico",
      "Multi-usuario (Operador y Despachador)",
      "Soporte prioritario",
    ],
    ctaText: "Comenzar con Plan Pro",
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: "¿Mis clientes tienen que crearse una cuenta para comprar?",
    answer:
      "No. El catálogo está diseñado para compra rápida móvil (Guest Checkout). El comprador solo elige la talla, pone su dirección y el pedido te llega directo a tu WhatsApp en 3 clics.",
  },
  {
    question: "¿Cómo cobro a mis clientes?",
    answer:
      "El pedido llega a tu WhatsApp con el monto total exacto. Tú le envías tu QR de Yape, Plin o cuenta bancaria y confirmas el pedido.",
  },
  {
    question: "¿Qué pasa si dos clientes intentan comprar la última prenda a la vez?",
    answer:
      "Nuestro motor de base de datos aplica un bloqueo atómico: el primero que confirma congela el stock y al segundo se le notifica amablemente que la prenda se agotó. Cero reclamos por sobreventa.",
  },
];
