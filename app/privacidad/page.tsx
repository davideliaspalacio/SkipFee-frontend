import type { Metadata } from "next";
import { readContent } from "@/lib/content";

const title = "Política de privacidad";
const description =
  "Política de tratamiento de datos personales de Skipfee, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacidad" },
  openGraph: { title, description, url: "/privacidad", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: readContent("privacidad") }} />;
}
