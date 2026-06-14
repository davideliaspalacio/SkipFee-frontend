import type { Metadata } from "next";
import PreRegistro from "./PreRegistro";

const title = "Pre-regístrate en Skipfee";
const description =
  "Déjanos tus datos y te contactamos para activar tu restaurante en Skipfee: vende directo por WhatsApp, sin comisiones. Asegura tu cupo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pre-registro" },
  openGraph: { title, description, url: "/pre-registro", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <main>
      <PreRegistro />
    </main>
  );
}
