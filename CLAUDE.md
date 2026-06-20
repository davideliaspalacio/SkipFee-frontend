# website-skipfee — Landing de marketing + leads

> Contexto del ecosistema: ver [`../CLAUDE.md`](../CLAUDE.md). Este doc es el detalle de la landing.

## Propósito

Sitio público de marketing que vende Skipfee ("vende por WhatsApp, sin comisiones") y **capta leads** de restaurantes mediante un formulario de pre-registro de 3 pasos. Optimizado para SEO y conversión. `name` interno en package.json: **`frontend-v1`**, `version` 0.1.0.

## Stack

- **Next.js 16.2.6** (App Router) + React 19 + TypeScript strict, **SSG** (`output: "export"`).
- **Sin** Tailwind/MDX/CMS/contentlayer/i18n — minimalista a propósito. Design system propio en `app/globals.css` (variables `oklch`, ~620 líneas).
- Deploy: `out/` → Cloudflare (`wrangler.jsonc`, worker `skipfee-frontend`, `not_found_handling: 404-page`). Prod: `https://skipfee.co`.

## Estructura y sistema de contenido (particular)

```
app/
  page.tsx  para-tu-negocio/  para-tus-clientes/  precios/  terminos/  privacidad/
  pre-registro/{page.tsx, PreRegistro.tsx}   # form 3 pasos (client component)
  layout.tsx globals.css opengraph-image.tsx robots.ts sitemap.ts
components/{Nav, Footer, Enhance}.tsx        # Enhance = progressive enhancement (reveals, count-up, tabs, calculadora)
content/                                     # HTML PRE-EXTRAÍDO (no MDX): home/clientes/negocio/precios/terminos/privacidad .html + _meta.json + _page-styles.css
lib/{site.ts, leads.ts, content.ts}
scripts/extract.mjs                          # extrae <main>+<style> de ../landing/ → content/, reescribe links, genera _meta.json
```

⚠️ **El contenido NO se edita en JSX.** Vive como HTML plano en `content/*.html`, generado por `scripts/extract.mjs` a partir de una carpeta **`../landing/`** (prototipos de diseño). Las páginas Next renderizan ese HTML server-side en build. Para cambiar texto/diseño de una página, normalmente se edita el origen en `landing/` y se re-extrae — **`landing/` no está en este repo** (es externa al checkout actual; ojo si `extract.mjs` falla por eso).

## Leads

`PreRegistro.tsx` → `submitLead()` (`lib/leads.ts`) → `POST ${NEXT_PUBLIC_API_URL}/api/leads` → el **backend** guarda en Supabase (`leads`) + avisa a Discord. Si `NEXT_PUBLIC_API_URL` está vacío → **modo demo** (no guarda, solo `console.info`). Paso 1 solo valida; paso 2 hace el POST con `estado: calificado`.

Campos del lead: `business_name, contact_name, whatsapp, email, city, orders_volume, peak_hours, est_loss, current_apps, cuisine_type, plan, source='landing-preregistro', user_agent`.

## SEO (es el punto fuerte)

- Metadata global (`layout.tsx`): template `%s · Skipfee`, keywords, Open Graph + Twitter, canonical.
- **JSON-LD:** Organization, WebSite, SoftwareApplication, y FAQPage en `/precios`.
- `sitemap.ts` (5 rutas con prioridades), `robots.ts`, `opengraph-image.tsx` (PNG 1200×630 dinámico vía `ImageResponse`; `public/_headers` fuerza su `Content-Type`).
- Analytics opcional: Cloudflare Web Analytics (`NEXT_PUBLIC_CF_BEACON_TOKEN`), Google verification.

## Variables de entorno (`NEXT_PUBLIC_*`, incrustadas en build)

`NEXT_PUBLIC_SITE_URL` (OG/canonical/sitemap), `NEXT_PUBLIC_API_URL` (backend; sin esto → demo), `NEXT_PUBLIC_WHATSAPP_NUMBER` (botones wa.me), `NEXT_PUBLIC_CALENDAR_URL` (agendar; si vacío muestra "te escribimos en <24h"), `NEXT_PUBLIC_CF_BEACON_TOKEN`, `NEXT_PUBLIC_GOOGLE_VERIFICATION`.

## Funcionalidades

Landing (hero con **calculadora de ahorro** interactiva), páginas cliente/negocio/precios (4 planes + tabla + FAQ), términos, privacidad. `Enhance.tsx` añade animaciones de scroll, count-up, tabs y la calculadora vía JS (con degradación elegante: el contenido funciona sin JS).

## Estado y gotchas

- v0.1.0, production-ready, pero **requiere configurar las env en Cloudflare** (sobre todo `NEXT_PUBLIC_API_URL`, si no el form no guarda).
- Dependencia de la carpeta externa `../landing/` para regenerar `content/` (ver arriba).
- Sin tests. Origen del sitio debe estar en `EXTRA_CORS_ORIGINS` del backend para que `/api/leads` acepte el POST.
- Dev usa puerto por defecto (3000) → choca con el backend; córrelos en puertos distintos.
