import type { Metadata } from "next";
import { readContent } from "@/lib/content";

const title = "La plataforma que opera y hace crecer tu restaurante";
const description =
  "Tablero de pedidos, pantalla de cocina (KDS), cocineros, rutas, tiempos, estadísticas, finanzas e IA, y tu propia data. Todo para operar y crecer en una sola pantalla, sin comisiones y listo para varias sedes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/para-tu-negocio" },
  openGraph: { title, description, url: "/para-tu-negocio", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: readContent("negocio") }} />;
}
