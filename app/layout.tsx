import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Hanken_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Enhance from "@/components/Enhance";
import { SITE } from "@/lib/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.titleDefault, template: "%s · Skipfee" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "vender por WhatsApp",
    "bot de WhatsApp para restaurantes",
    "sin comisiones de delivery",
    "software para restaurantes",
    "domicilios",
    "Wompi",
    "Rappi alternativa",
    "Colombia",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.titleDefault,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.titleDefault,
    description: SITE.description,
    creator: SITE.twitter,
  },
  robots: { index: true, follow: true },
  category: "technology",
  verification: SITE.googleVerification ? { google: SITE.googleVerification } : undefined,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: "Skipfee",
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
      description: SITE.description,
      slogan: "Vende por WhatsApp, sin comisiones.",
      areaServed: "CO",
      sameAs: [SITE.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "es-CO",
      publisher: { "@id": `${SITE.url}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Skipfee",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, WhatsApp",
      url: SITE.url,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#org` },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "49",
        highPrice: "399",
        priceCurrency: "USD",
        offerCount: 4,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        {children}
        <Footer />
        <Enhance />
      </body>
    </html>
  );
}
