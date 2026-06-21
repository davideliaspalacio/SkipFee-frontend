import type { Metadata } from "next";
import Onboarding from "./Onboarding";

const title = "Crea tu tienda en Skipfee";
const description =
  "Registra tu restaurante, elige tu plan y mira tu panel de operación en vivo. Vende por WhatsApp sin comisiones. 2 minutos, sin tarjeta.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/onboarding" },
  openGraph: { title, description, url: "/onboarding", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <main>
      <Onboarding />
    </main>
  );
}
