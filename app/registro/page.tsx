import type { Metadata } from "next";
import Registro from "./Registro";

export const metadata: Metadata = {
  title: "Crea tu cuenta · Skipfee",
  description:
    "Monta tu tienda y empieza a vender por WhatsApp sin comisiones. Sin tarjeta, sin permanencia.",
  robots: { index: true, follow: true },
};

export default function RegistroPage() {
  return <Registro />;
}
