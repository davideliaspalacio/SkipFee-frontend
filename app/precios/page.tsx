import type { Metadata } from "next";
import { readContent } from "@/lib/content";

const title = "Precios. Un precio fijo, cero comisiones";
const description =
  "Un precio fijo al mes y 0% de comisión por venta. Cuatro planes (Arranque, Negocio, Crece IA y Cadena): bot de WhatsApp, tienda en línea, cocina, rutas, finanzas y tu propia data. Calcula cuánto te ahorras. Sin permanencia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/precios" },
  openGraph: { title, description, url: "/precios", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

// Mismo contenido que la sección de FAQ visible en /precios → habilita rich snippets.
const faqs: [string, string][] = [
  [
    "¿Cobran comisión por venta?",
    "No, nunca. Pagas una mensualidad fija y te quedas con el 100% de cada pedido. Vendas $1 millón o $50 millones al mes, tu precio no cambia y no te descontamos un solo peso por venta.",
  ],
  [
    "¿Tengo que cambiar mi número de WhatsApp?",
    "No. Skipfee funciona sobre tu mismo número de siempre, el que tus clientes ya conocen. Conservas tu historial y tu identidad; el bot atiende ahí mismo.",
  ],
  [
    "¿Qué medios de pago aceptan mis clientes?",
    "Cobramos con Wompi en tu tienda en línea (el bot le manda el link al cliente): tarjeta de crédito/débito, PSE y Nequi. Tu cliente paga en dos toques y la plata te llega a ti, directo, sin intermediarios quedándose un porcentaje.",
  ],
  [
    "¿La data de mis clientes es mía?",
    "Sí, 100%. Quiénes son, qué piden, cada cuánto vuelven: todo queda en tu panel y es tuyo. Es justo lo que las apps de delivery nunca te dieron, y la razón por la que muchos dueños se pasan a Skipfee.",
  ],
  [
    "¿Hay permanencia o contrato?",
    "No. Es mes a mes y cancelas cuando quieras, sin penalidades ni letra chiquita. Si un mes no te sirve, te vas sin problema, aunque apostamos a que tus números te van a convencer de quedarte.",
  ],
  [
    "¿Cuánto tarda la activación?",
    "Una tarde. Conectamos tu WhatsApp, cargamos tu menú y configuramos zonas y pagos contigo. La mayoría de restaurantes empiezan a recibir pedidos el mismo día.",
  ],
  [
    "¿Sirve para varios locales?",
    "Sí. El plan Cadena es multi-sucursal: maneja varias sedes y marcas con white-label, números ilimitados, roles y manager dedicado. Y si apenas estás creciendo, Negocio y Crece IA te suman más números de WhatsApp sin empezar de cero.",
  ],
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <main dangerouslySetInnerHTML={{ __html: readContent("precios") }} />
    </>
  );
}
