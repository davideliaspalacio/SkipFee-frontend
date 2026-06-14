import type { Metadata } from "next";
import { readContent } from "@/lib/content";

const title = "El software para manejar todo tu restaurante";
const description =
  "Tablero de pedidos, pantalla de cocina (KDS), cocineros, rutas, tiempos, estadísticas, finanzas e IA —y tu propia data. El software que las apps de delivery nunca te dieron, listo para crecer a varias sedes.";

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
