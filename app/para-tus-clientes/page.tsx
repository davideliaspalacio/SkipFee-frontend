import type { Metadata } from "next";
import { readContent } from "@/lib/content";

const title = "Tus clientes piden por WhatsApp, sin apps ni filas";
const description =
  "Tus clientes piden por WhatsApp, en el chat de siempre: sin descargar nada, sin filas, sin contraseñas. El bot saluda, arma el pedido, cobra (tarjeta, PSE o Nequi) y avisa cuándo llega. Respuestas al instante, 24/7.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/para-tus-clientes" },
  openGraph: { title, description, url: "/para-tus-clientes", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: readContent("clientes") }} />;
}
