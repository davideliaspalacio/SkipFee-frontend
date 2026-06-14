import type { Metadata } from "next";
import { readContent } from "@/lib/content";

const title = "Precios. Un precio fijo, cero comisiones";
const description =
  "Un precio fijo al mes y cero comisiones por venta. Elige Básico, Pro o Enterprise: bot de WhatsApp, pagos, cocina, rutas, finanzas y tu propia data. Calcula cuánto te ahorras. Sin permanencia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/precios" },
  openGraph: { title, description, url: "/precios", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: readContent("precios") }} />;
}
