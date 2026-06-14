"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { submitLead, leadsConfigured, WHATSAPP_NUMBER } from "@/lib/leads";

const CHANNELS = [
  { v: "whatsapp", label: "WhatsApp" },
  { v: "llamada", label: "Llamada" },
  { v: "email", label: "Email" },
];

const PLANS = [
  { v: "arranque", name: "Arranque", price: "$49", desc: "Para empezar a vender por WhatsApp sin intermediarios." },
  { v: "negocio", name: "Negocio", price: "$99", desc: "La operación completa: cocina, equipo, post-venta y promos.", pop: true },
  { v: "crece_ia", name: "Crece IA", price: "$199", desc: "Suma inteligencia artificial, voz y reportes avanzados." },
  { v: "cadena", name: "Cadena", price: "$399", desc: "Para cadenas y multi-marca que escalan sin límites." },
  { v: "no_se", name: "Aún no sé", price: "", desc: "Cuéntanos tu caso y te recomendamos el plan ideal." },
];

const empty = {
  business_name: "",
  contact_name: "",
  phone: "",
  email: "",
  contact_channel: "whatsapp",
  plan: "",
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
      `Contacto por: ${form.contact_channel}%0A` +
      `Plan: ${form.plan || "por definir"}`;
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
            <p className="muted" style={{ fontSize: "1.08rem", maxWidth: "46ch", margin: "14px auto 0" }}>
              Te contactamos por <b style={{ color: "var(--ink)" }}>{CHANNELS.find((c) => c.v === form.contact_channel)?.label}</b> muy
              pronto para activar <b style={{ color: "var(--ink)" }}>{form.business_name || "tu restaurante"}</b> en Skipfee.
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
              <span className="dot" style={{ background: "var(--green)" }} /> Pre-registro
            </div>
            <h2 style={{ color: "var(--on-ink)" }}>Asegura tu cupo en Skipfee.</h2>
            <p>
              Estamos activando restaurantes por tandas. Déjanos tus datos y te contactamos para montar
              tu tienda y poner el bot en tu WhatsApp. Sin compromiso.
            </p>
            <p className="micro" style={{ justifyContent: "center", marginTop: 18, color: "var(--on-ink-muted)" }}>
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--green)" }}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              2 min · Sin tarjeta · Sin compromiso
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

                <div className="field">
                  <span className="fl">¿Qué plan te llamó la atención?</span>
                  <div className="choices" role="radiogroup" aria-label="Plan de interés">
                    {PLANS.map((p) => (
                      <label key={p.v} className="choice">
                        <input type="radio" name="plan" value={p.v}
                          checked={form.plan === p.v} onChange={(e) => set("plan", e.target.value)} />
                        <span>{p.name}{p.price ? ` · ${p.price}` : ""}</span>
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
                      Quiero mi cupo
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

            {/* PLAN EXPLAINER */}
            <aside className="lead-aside">
              <h3>Los planes, en corto</h3>
              <p className="muted" style={{ marginTop: 6, marginBottom: 18, fontSize: "15px" }}>
                Todos sin comisión por venta. No tienes que decidir hoy: si dudas, elige “Aún no sé”.
              </p>
              <div className="lead-plans">
                {PLANS.filter((p) => p.price).map((p) => (
                  <div key={p.v} className={p.pop ? "lead-plan pop" : "lead-plan"}>
                    <div className="lp-top">
                      <b>{p.name}</b>
                      {p.pop && <span className="lp-tag">Más popular</span>}
                      <span className="lp-price">{p.price}<small>/mes</small></span>
                    </div>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
              <Link className="linklike" href="/precios" style={{ marginTop: 16, display: "inline-block" }}>
                Ver el detalle de cada plan →
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
