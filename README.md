# SkipFee — Landing

Sitio de marketing de **Skipfee**: vende por WhatsApp y maneja tu restaurante, sin comisiones.
Hecho con **Next.js 16 (App Router)** y renderizado estático (SSG) para SEO máximo.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Producción

```bash
npm run build
npm run start
```

## Rutas

- `/` — Inicio (pitch + calculadora de ahorro)
- `/para-tus-clientes` — la experiencia del cliente (pedido por WhatsApp)
- `/para-tu-negocio` — el software interno (cocina, rutas, datos, IA…)
- `/precios` — planes y comparativa

## SEO

Metadata por página, Open Graph + Twitter cards, imagen OG dinámica (`opengraph-image`),
`sitemap.xml`, `robots.txt` y JSON-LD (datos estructurados). El dominio se configura con la
variable de entorno `NEXT_PUBLIC_SITE_URL` (por defecto `https://skipfee.co`).

## Diseño

Sistema de diseño propio en `app/globals.css` (fuentes Bricolage Grotesque + Hanken Grotesk vía
`next/font`). El contenido de cada página vive en `content/*.html` y se renderiza server-side.
