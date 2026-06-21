// Planes de Skipfee — fuente de verdad para el onboarding y el gating de marketing.
//
// Hoy los precios/features "viven" como HTML en content/precios.html (se extraen
// desde ../landing). Este archivo los expresa como datos para poder usarlos en el
// wizard de /onboarding y construir el link al panel de prueba (admin) con gating
// por plan. Si cambian los precios en la landing, actualizá también este archivo.

// Pantallas del panel admin (deben coincidir con admin-skipfee/lib/nav.ts → ScreenId).
export type AdminScreen =
  | "dashboard"
  | "pedidos"
  | "whatsapp"
  | "catalogo"
  | "despachos"
  | "clientes"
  | "reportes"
  | "configuracion";

export type PlanId = "arranque" | "negocio" | "crece-ia" | "cadena";

export interface Plan {
  id: PlanId;
  name: string;
  /** Precio mensual en USD (como en la landing). */
  priceUsd: number;
  /** Etiqueta destacada, ej. "Más popular". */
  badge?: string;
  /** Frase corta de posicionamiento. */
  tagline: string;
  /** Texto de cupo de conversaciones/mes. */
  conversations: string;
  /** Números de WhatsApp incluidos. */
  whatsappNumbers: string;
  /** Bullets vendedores que el plan INCLUYE (para las tarjetas del wizard). */
  highlights: string[];
  /** Lo que suma respecto al plan anterior (null en el primero). */
  addsOver: string | null;
  /** Pantallas del panel que este plan habilita en el demo. */
  unlocks: AdminScreen[];
}

/** Orden de presentación de los planes. */
export const PLAN_ORDER: PlanId[] = ["arranque", "negocio", "crece-ia", "cadena"];

/** Las 8 pantallas del panel, con etiqueta legible (para mostrar bloqueadas/desbloqueadas). */
export const SCREEN_LABELS: Record<AdminScreen, string> = {
  dashboard: "Dashboard",
  pedidos: "Pedidos",
  whatsapp: "WhatsApp",
  catalogo: "Catálogo",
  despachos: "Despachos y rutas",
  clientes: "Clientes (CRM)",
  reportes: "Reportes avanzados",
  configuracion: "Configuración",
};

const ALL_SCREENS: AdminScreen[] = [
  "dashboard",
  "pedidos",
  "whatsapp",
  "catalogo",
  "despachos",
  "clientes",
  "reportes",
  "configuracion",
];

export const PLANS: Record<PlanId, Plan> = {
  arranque: {
    id: "arranque",
    name: "Arranque",
    priceUsd: 49,
    tagline: "Para empezar a vender por WhatsApp sin intermediarios.",
    conversations: "800 conversaciones/mes",
    whatsappNumbers: "1 número de WhatsApp",
    highlights: [
      "Bot de pedidos por WhatsApp",
      "Checkout web con pago online (Wompi)",
      "Tablero de pedidos (kanban)",
      "Tu tienda en línea con tu marca",
      "Hasta 3 zonas de entrega + horarios",
    ],
    addsOver: null,
    unlocks: ["dashboard", "pedidos", "whatsapp", "catalogo"],
  },
  negocio: {
    id: "negocio",
    name: "Negocio",
    priceUsd: 99,
    badge: "Más popular",
    tagline: "La operación completa: cocina, equipo, post-venta y promos.",
    conversations: "1.800 conversaciones/mes",
    whatsappNumbers: "2 números de WhatsApp",
    highlights: [
      "Asignación automática a cocineros + rutas",
      "Post-venta: encuesta, reseña y regalo",
      "Promociones automáticas",
      "Reportes avanzados (heatmap y conversión)",
      "CRM de clientes + multi-rol",
    ],
    addsOver: "Todo lo de Arranque, más cocina, despachos, CRM y reportes.",
    unlocks: ALL_SCREENS,
  },
  "crece-ia": {
    id: "crece-ia",
    name: "Crece IA",
    priceUsd: 199,
    tagline: "Suma inteligencia artificial, voz y soporte prioritario.",
    conversations: "4.000 conversaciones/mes",
    whatsappNumbers: "3 números de WhatsApp",
    highlights: [
      "Agente de IA con Gemini",
      "Llamadas de voz con IA",
      "Soporte prioritario con SLA",
      "Onboarding asistido",
    ],
    addsOver: "Todo lo de Negocio, más IA, voz y soporte prioritario.",
    unlocks: ALL_SCREENS,
  },
  cadena: {
    id: "cadena",
    name: "Cadena",
    priceUsd: 399,
    tagline: "Para cadenas y multi-marca que escalan sin límites.",
    conversations: "Conversaciones ilimitadas",
    whatsappNumbers: "Números ilimitados",
    highlights: [
      "Multi-sucursal y multi-marca",
      "White-label (tu marca, no la nuestra)",
      "Campañas masivas de WhatsApp",
      "Manager de cuenta dedicado",
    ],
    addsOver: "Todo lo de Crece IA, más multi-sucursal y white-label.",
    unlocks: ALL_SCREENS,
  },
};

/** Pantallas que NO incluye un plan (para el gating de marketing). */
export function lockedScreens(plan: PlanId): AdminScreen[] {
  const unlocked = new Set(PLANS[plan].unlocks);
  return ALL_SCREENS.filter((s) => !unlocked.has(s));
}

export function planById(id: string | null | undefined): Plan {
  if (id && id in PLANS) return PLANS[id as PlanId];
  return PLANS.negocio; // default: el plan recomendado
}
