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
  instagram: "https://www.instagram.com/skipfee",
  // Verificación de Google Search Console (método "Etiqueta HTML").
  // Pega aquí el valor "content" de la meta google-site-verification, o usa NEXT_PUBLIC_GOOGLE_VERIFICATION.
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  // Cloudflare Web Analytics (mide PERSONAS reales, no bots).
  // Token: Cloudflare → Web Analytics → tu sitio → "Manual" → copia el "token".
  // Pégalo aquí o usa NEXT_PUBLIC_CF_BEACON_TOKEN.
  cfAnalyticsToken: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "",
} as const;
