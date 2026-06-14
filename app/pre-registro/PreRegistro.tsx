"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { submitLead, leadsConfigured, WHATSAPP_NUMBER } from "@/lib/leads";

const CHANNELS = [
  { v: "whatsapp", label: "WhatsApp" },
  { v: "llamada", label: "Llamada" },
  { v: "email", label: "Email" },
];

// Plan Negocio (US$99/mes) — el regalo de bienvenida del pre-registro.
const NEGOCIO_INCLUDES = [
  "Tu tienda en línea con tu marca, montada por nosotros",
  "Bot de pedidos por WhatsApp + checkout con pago online",
  "Tablero de cocina, asignación a cocineros y rutas",
  "Post-venta y promociones automáticas",
  "Reportes avanzados + CRM de tus clientes",
  "Facturación electrónica (DIAN) y multi-rol",
  "0% de comisión por venta, siempre",
];

const empty = {
  business_name: "",
  contact_name: "",
  phone: "",
  email: "",
  contact_channel: "whatsapp",
};

export default function PreRegistro() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      if (leadsConfigured) {
        await submitLead({
          ...form,
          plan: "negocio_regalo",
          source: "landing-preregistro",
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        });
      } else {
        // Modo demo: Supabase aún no está configurado. Simulamos el envío para
        // poder probar la experiencia (todavía no se guarda nada).
        await new Promise((r) => setTimeout(r, 1200));
        console.info("pre-registro: modo demo (Supabase sin configurar) — el lead no se guardó");
      }
      setStatus("ok");
    } catch (err) {
      console.error("pre-registro: no se pudo guardar el lead", err);
      setStatus("error");
    }
  };

  const waHref = () => {
    const msg =
      `Hola, quiero pre-registrarme en Skipfee 👋%0A` +
      `Negocio: ${form.business_name}%0A` +
      `Nombre: ${form.contact_name}%0A` +
      `Teléfono: ${form.phone}%0A` +
      (form.email ? `Email: ${form.email}%0A` : "") +
      `Contacto por: ${form.contact_channel}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  if (status === "ok") {
    return (
      <section className="band">
        <div className="wrap">
          <div className="lead-done reveal in">
            <span className="lead-check-wrap">
              <span className="lead-burst" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i /><i />
              </span>
              <span className="lead-check" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </span>
            <h2 style={{ marginTop: 20 }}>
              ¡Listo{form.contact_name ? `, ${form.contact_name.split(" ")[0]}` : ""}! Quedaste en la lista.
            </h2>
            <p className="muted" style={{ fontSize: "1.08rem", maxWidth: "48ch", margin: "14px auto 0" }}>
              Te contactamos por <b style={{ color: "var(--ink)" }}>{CHANNELS.find((c) => c.v === form.contact_channel)?.label}</b> muy
              pronto para activar <b style={{ color: "var(--ink)" }}>{form.business_name || "tu restaurante"}</b> con tu{" "}
              <b style={{ color: "var(--green-ink)" }}>plan Negocio de regalo</b>.
            </p>
            <Link className="btn btn-primary" href="/" style={{ marginTop: 24 }}>
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="band ink grid-bg tight">
        <div className="wrap-wide">
          <div className="sec-head center reveal in" style={{ marginBottom: 0 }}>
            <div className="kicker">
              <span className="dot" style={{ background: "var(--green)" }} /> Pre-registro · oferta de lanzamiento
            </div>
            <h1 style={{ color: "var(--on-ink)" }}>
              Pre-regístrate y te regalamos el <span className="green">plan Negocio.</span>
            </h1>
            <p>
              Estamos activando restaurantes por tandas. Déjanos tus datos y, cuando te toque, montamos tu
              tienda y ponemos el bot en tu WhatsApp con el plan Negocio (US$99/mes) gratis.
            </p>
            <p className="micro" style={{ justifyContent: "center", marginTop: 18, color: "var(--on-ink-muted)" }}>
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--green)" }}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              2 min · Sin tarjeta · Plan Negocio de regalo
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap-wide">
          <div className="lead-grid reveal in">
            {/* FORM */}
            <div className="panel lead-form">
              <div className="panel-bar">
                <span>Tus datos</span>
                <span className="mono" style={{ color: "var(--green-strong)" }}>Paso 1 de 1</span>
              </div>
              <form className="panel-body" onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label className="fl" htmlFor="business_name">¿Cuál es tu negocio? <span className="req">*</span></label>
                  <input id="business_name" type="text" required placeholder="Ej. Arepa Club"
                    value={form.business_name} onChange={(e) => set("business_name", e.target.value)} />
                </div>

                <div className="field">
                  <label className="fl" htmlFor="contact_name">Tu nombre <span className="req">*</span></label>
                  <input id="contact_name" type="text" required placeholder="Ej. Camila Restrepo"
                    value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label className="fl" htmlFor="phone">Tu teléfono <span className="req">*</span></label>
                    <input id="phone" type="tel" required placeholder="300 123 4567" inputMode="tel"
                      value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                  <div className="field">
                    <label className="fl" htmlFor="email">Email <span className="opt">(opcional)</span></label>
                    <input id="email" type="email" placeholder="tucorreo@ejemplo.com"
                      value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </div>
                </div>

                <div className="field">
                  <span className="fl">¿Por dónde quieres que te contactemos?</span>
                  <div className="choices" role="radiogroup" aria-label="Canal de contacto">
                    {CHANNELS.map((c) => (
                      <label key={c.v} className="choice">
                        <input type="radio" name="contact_channel" value={c.v}
                          checked={form.contact_channel === c.v} onChange={(e) => set("contact_channel", e.target.value)} />
                        <span>{c.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary lead-submit" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="lead-spin" aria-hidden="true" /> Enviando…
                    </>
                  ) : (
                    <>
                      Quiero mi cupo y mi regalo
                      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="lead-error">
                    No pudimos guardar tu pre-registro. Inténtalo de nuevo en un momento
                    {WHATSAPP_NUMBER ? (
                      <> o <a href={waHref()} target="_blank" rel="noopener noreferrer">envíalo por WhatsApp</a></>
                    ) : null}
                    .
                  </p>
                )}

                <p className="lead-fine">
                  Al enviar aceptas que te contactemos sobre Skipfee. Tus datos son tuyos y no los compartimos.
                </p>
              </form>
            </div>

            {/* GIFT */}
            <aside className="lead-aside">
              <div className="gift">
                <div className="gift-kick"><span aria-hidden="true">🎁</span> Tu regalo de bienvenida</div>
                <div className="gift-head">
                  <div>
                    <b>Plan Negocio</b>
                    <span className="gift-sub">La operación completa, sin comisiones</span>
                  </div>
                  <div className="gift-price">
                    <s>US$99/mes</s>
                    <span className="gift-free">Gratis</span>
                  </div>
                </div>
                <p className="gift-lede">Cuando activemos tu restaurante te lo dejamos sin costo. Esto es lo que entra:</p>
                <ul className="gift-list">
                  {NEGOCIO_INCLUDES.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="gift-foot">Cupos por tanda · sin tarjeta · cancela cuando quieras</div>
              </div>
              <Link className="linklike" href="/precios" style={{ marginTop: 14, display: "inline-block" }}>
                Ver todo lo que incluye el plan →
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
