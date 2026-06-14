// Central site config. Override the URL with NEXT_PUBLIC_SITE_URL in production.
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skipfee.co",
  name: "Skipfee",
  titleDefault:
    "Skipfee — Vende por WhatsApp y maneja tu restaurante. Sin comisiones.",
  description:
    "Skipfee reemplaza a las apps de delivery: tus clientes piden por WhatsApp y tú manejas cocina, cocineros, rutas, finanzas y tu propia data desde un panel. Te quedas con el 100% de la venta. Sin comisiones.",
  locale: "es_CO",
  twitter: "@skipfee",
} as const;
