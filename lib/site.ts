// Central site config. Override the URL with NEXT_PUBLIC_SITE_URL in production.
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skipfee.co",
  name: "Skipfee",
  titleDefault:
    "Skipfee: vende directo por WhatsApp, sin comisiones",
  description:
    "Vende directo por WhatsApp sin comisiones, quédate con tus clientes y haz que vuelvan a comprar. Skipfee maneja cocina, rutas, finanzas y tu propia data desde un solo panel. Te quedas con el 100% de la venta.",
  locale: "es_CO",
  twitter: "@skipfee",
} as const;
