import type { Metadata } from "next";
import { readContent } from "@/lib/content";

const title = "Términos y condiciones";
const description =
  "Términos y condiciones de uso de la plataforma Skipfee. Suscripción mensual, sin permanencia, conforme a la ley colombiana.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terminos" },
  openGraph: { title, description, url: "/terminos", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: readContent("terminos") }} />;
}
