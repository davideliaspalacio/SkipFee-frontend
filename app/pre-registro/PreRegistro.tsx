"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { submitLead, leadsConfigured, WHATSAPP_NUMBER, CALENDAR_URL, type Lead } from "@/lib/leads";

const ORDERS = ["Menos de 10", "10–30", "30–60", "60–100", "Más de 100", "Apenas arranco"];
const HOURS = ["Almuerzo", "Tarde", "Noche", "Madrugada", "Fines de semana"];
const LOSS = ["No sé / nunca lo medí", "Menos de $1M", "$1M–$3M", "$3M–$6M", "Más de $6M"];
const CITIES = ["Medellín", "Bogotá", "Cali", "Barranquilla", "Bucaramanga", "Cartagena", "Pereira", "Otra"];
const APPS = ["Rappi", "DiDi Food", "UberEats", "Ninguna"];
const CUISINES = ["Hamburguesas", "Pizza", "Comida rápida", "Comida típica", "Saludable / bowls", "Asiática / sushi", "Postres / café", "Otra"];

const NEGOCIO_INCLUDES = [
  "Tu tienda en línea con tu marca, montada por nosotros",
  "Bot de pedidos por WhatsApp + checkout con pago online",
  "Tablero de cocina, asignación a cocineros y rutas",
  "Reportes avanzados + CRM de tus clientes",
  "0% de comisión por venta, siempre",
];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "").slice(0, 22);

const empty = {
  whatsapp: "",
  contact_name: "",
  business_name: "",
  email: "",
  orders_volume: "",
  peak_hours: [] as string[],
  est_loss: "",
  city: "",
  current_apps: [] as string[],
  cuisine_type: "",
  plan: "",
};

export default function PreRegistro() {
  const [form, setForm] = useState(empty);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const set = (k: keyof typeof empty, v: string | string[]) => setForm((f) => ({ ...f, [k]: v }));

  // Pre-llena WhatsApp (?w=) y plan (?plan=) si vienen del hero / de un botón de plan.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const w = p.get("w");
    const plan = p.get("plan");
    if (w || plan) setForm((f) => ({ ...f, whatsapp: w || f.whatsapp, plan: plan || f.plan }));
  }, []);

  const toggleHour = (h: string) =>
    set("peak_hours", form.peak_hours.includes(h) ? form.peak_hours.filter((x) => x !== h) : [...form.peak_hours, h]);

  const toggleApp = (a: string) => {
    if (a === "Ninguna") {
      set("current_apps", form.current_apps.includes("Ninguna") ? [] : ["Ninguna"]);
      return;
    }
    const without = form.current_apps.filter((x) => x !== "Ninguna");
    set("current_apps", without.includes(a) ? without.filter((x) => x !== a) : [...without, a]);
  };

  const save = async (lead: Lead) => {
    if (leadsConfigured) {
      await submitLead({ ...lead, source: "landing-preregistro", user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "" });
    } else {
      // Modo demo: aún sin Supabase. Simulamos para poder probar el flujo (no guarda nada).
      await new Promise((r) => setTimeout(r, 800));
      console.info("pre-registro: modo demo (Supabase sin configurar) — no se guardó");
    }
  };

  const submitStep1 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // El paso 1 ya no guarda en Supabase: el cupo solo se aparta al completar el paso 2.
    // HTML form validation (required) bloquea avanzar si faltan campos.
    setStatus("idle");
    setStep(2);
  };

  const submitStep2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await save({
        whatsapp: form.whatsapp,
        contact_name: form.contact_name,
        business_name: form.business_name,
        email: form.email || undefined,
        plan: form.plan || "negocio_regalo",
        orders_volume: form.orders_volume || undefined,
        peak_hours: form.peak_hours.length ? form.peak_hours.join(", ") : undefined,
        est_loss: form.est_loss || undefined,
        city: form.city || undefined,
        current_apps: form.current_apps.length ? form.current_apps.join(", ") : undefined,
        cuisine_type: form.cuisine_type || undefined,
        estado: "calificado",
      });
      setStatus("idle");
      setStep(3);
    } catch (err) {
      console.error("pre-registro paso 2:", err);
      setStatus("error");
    }
  };

  const firstName = form.contact_name.trim().split(" ")[0];
  const negocio = form.business_name.trim() || "tu restaurante";
  const slug = slugify(form.business_name) || "tutienda";
  const lossKnown = !!form.est_loss && !form.est_loss.startsWith("No sé");

  const waHref = () => {
    const msg = `Hola, me pre-registré en Skipfee 👋 Soy ${form.contact_name} de ${negocio}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  // ---------- PASO 3 · ÉXITO + AGENDAR ----------
  if (step === 3) {
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
            <h2 style={{ marginTop: 18 }}>
              ¡Listo{firstName ? `, ${firstName}` : ""}! Tu cupo de <span className="green">{negocio}</span> está apartado.
            </h2>

            <div className="lead-diag">
              {lossKnown ? (
                <p>
                  Con <b>{form.orders_volume.toLowerCase()}</b> pedidos{form.peak_hours.length ? <> y picos en <b>{form.peak_hours.join(", ").toLowerCase()}</b></> : null},
                  podrías estar dejando ir hasta <b style={{ color: "var(--coral)" }}>{form.est_loss}</b> al mes. Con Skipfee eso se queda contigo:
                  <b style={{ color: "var(--green-ink)" }}> 0% de comisión, tus clientes, tu tienda.</b>
                </p>
              ) : (
                <p>En tu primera llamada calculamos juntos, con tus números reales, cuánto puedes recuperar. <b style={{ color: "var(--green-ink)" }}>0% de comisión, tus clientes, tu tienda.</b></p>
              )}
            </div>

            {CALENDAR_URL ? (
              <a className="btn btn-primary" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: 22 }}>
                📅 Agendar mi llamada
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            ) : (
              <p className="muted" style={{ marginTop: 20, fontSize: "1.05rem" }}>
                Te escribimos a tu <b style={{ color: "var(--ink)" }}>WhatsApp</b> en menos de 24h para montar tu tienda y activar tu plan Negocio gratis.
              </p>
            )}

            <p className="lead-fine" style={{ textAlign: "center" }}>
              15 min · te montamos tu tienda con tu marca y activamos tu plan Negocio gratis.
              {WHATSAPP_NUMBER ? (
                <> {" · "}<a href={waHref()} target="_blank" rel="noopener noreferrer">o escríbenos por WhatsApp</a></>
              ) : null}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ---------- PASOS 1 y 2 ----------
  const sending = status === "sending";

  return (
    <>
      <section className="band ink grid-bg tight">
        <div className="wrap-wide">
          <div className="sec-head center reveal in" style={{ marginBottom: 0 }}>
            <div className="kicker">
              <span className="dot" style={{ background: "var(--green)" }} /> Pre-registro · oferta de lanzamiento
            </div>
            <h1 style={{ color: "var(--on-ink)" }}>
              Aparta tu cupo y llévate el <span className="green">plan Negocio gratis.</span>
            </h1>
            <p>
              Déjanos tu WhatsApp y te contactamos para montar tu tienda y activarte. 30 segundos, sin tarjeta, sin compromiso.
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap-wide">
          <div className={step === 1 ? "lead-grid reveal in" : "reveal in"} style={step === 1 ? undefined : { maxWidth: 640, margin: "0 auto" }}>
            {/* FORM */}
            <div className="panel lead-form">
              <div className="panel-bar">
                <span>{step === 1 ? "Tus datos" : "Una pregunta más"}</span>
                <span className="mono" style={{ color: "var(--green-strong)" }}>Paso {step} de 3</span>
              </div>
              <div className="lead-prog" aria-hidden="true"><i style={{ width: step === 1 ? "33%" : "66%" }} /></div>

              {step === 1 ? (
                <form className="panel-body" onSubmit={submitStep1} noValidate>
                  <div className="field">
                    <label className="fl" htmlFor="whatsapp">¿A qué WhatsApp te escribimos? <span className="req">*</span></label>
                    <div className="wa-input">
                      <span className="wa-pre" aria-hidden="true">🇨🇴 +57</span>
                      <input id="whatsapp" type="tel" required inputMode="tel" placeholder="300 123 4567"
                        value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
                    </div>
                    <p className="fhint">Te escribe una persona, no un robot. Cero spam.</p>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label className="fl" htmlFor="contact_name">Tu nombre <span className="req">*</span></label>
                      <input id="contact_name" type="text" required placeholder="Ej. Camila Restrepo"
                        value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} />
                    </div>
                    <div className="field">
                      <label className="fl" htmlFor="business_name">Tu restaurante <span className="req">*</span></label>
                      <input id="business_name" type="text" required placeholder="Ej. Arepa Club"
                        value={form.business_name} onChange={(e) => set("business_name", e.target.value)} />
                    </div>
                  </div>
                  <p className="fhint" style={{ marginTop: -8 }}>Así se vería tu tienda: <b style={{ color: "var(--green-ink)" }}>{slug}.skipfee.co</b></p>

                  <button className="btn btn-primary lead-submit" type="submit">
                    Continuar
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                  <p className="lead-fine">30 segundos más y tu cupo queda apartado. Cero spam.</p>
                </form>
              ) : (
                <form className="panel-body" onSubmit={submitStep2} noValidate>
                  <p className="step2-intro">Última parte. Esto nos ayuda a calificar tu cupo y a personalizar tu tienda:</p>

                  <div className="field">
                    <span className="fl">¿Cuántos pedidos despachas al día?</span>
                    <div className="choices">
                      {ORDERS.map((o) => (
                        <label key={o} className="choice">
                          <input type="radio" name="orders" value={o} checked={form.orders_volume === o} onChange={() => set("orders_volume", o)} />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <span className="fl">¿En qué horas se te llena?</span>
                    <div className="choices">
                      {HOURS.map((h) => (
                        <label key={h} className="choice">
                          <input type="checkbox" checked={form.peak_hours.includes(h)} onChange={() => toggleHour(h)} />
                          <span>{h}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <span className="fl">¿Cuánto crees que pierdes al mes por no contestar a tiempo?</span>
                    <div className="choices">
                      {LOSS.map((l) => (
                        <label key={l} className="choice">
                          <input type="radio" name="loss" value={l} checked={form.est_loss === l} onChange={() => set("est_loss", l)} />
                          <span>{l}</span>
                        </label>
                      ))}
                    </div>
                    <p className="fhint">Cada chat sin responder es un pedido que se fue a otro lado.</p>
                  </div>

                  <div className="field">
                    <span className="fl">¿En qué ciudad estás?</span>
                    <div className="choices">
                      {CITIES.map((c) => (
                        <label key={c} className="choice">
                          <input type="radio" name="city" value={c} checked={form.city === c} onChange={() => set("city", c)} />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <span className="fl">¿Vendes hoy por apps de domicilios? <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 13 }}>(puedes elegir varias)</span></span>
                    <div className="choices">
                      {APPS.map((a) => (
                        <label key={a} className="choice">
                          <input type="checkbox" checked={form.current_apps.includes(a)} onChange={() => toggleApp(a)} />
                          <span>{a}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <span className="fl">¿Qué tipo de comida vendes?</span>
                    <div className="choices">
                      {CUISINES.map((c) => (
                        <label key={c} className="choice">
                          <input type="radio" name="cuisine" value={c} checked={form.cuisine_type === c} onChange={() => set("cuisine_type", c)} />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className="btn btn-primary lead-submit" type="submit" disabled={sending}>
                    {sending ? (<><span className="lead-spin" aria-hidden="true" /> Apartando…</>) : (<>Apartar mi cupo
                      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg></>)}
                  </button>
                  {status === "error" && <p className="lead-error">No pudimos guardar. Inténtalo de nuevo en un momento.</p>}
                  <p className="lead-fine">Al apartar tu cupo aceptas que te contactemos por WhatsApp sobre Skipfee. Puedes pedir que paremos cuando quieras.</p>
                  <button type="button" className="step-back" onClick={() => { setStatus("idle"); setStep(1); }}>← Volver</button>
                </form>
              )}
            </div>

            {/* GIFT (solo en el paso 1) */}
            {step === 1 && (
              <aside className="lead-aside">
                <div className="gift">
                  <div className="gift-kick"><span aria-hidden="true">🎁</span> Tu regalo de bienvenida</div>
                  <div className="gift-head">
                    <div>
                      <b>Plan Negocio</b>
                      <span className="gift-sub">La operación completa, sin comisiones</span>
                    </div>
                    <div className="gift-price"><s>US$99/mes</s><span className="gift-free">Gratis</span></div>
                  </div>
                  <p className="gift-lede">Cuando activemos tu restaurante te lo dejamos sin costo. Esto es lo que entra:</p>
                  <ul className="gift-list">
                    {NEGOCIO_INCLUDES.map((t) => (<li key={t}>{t}</li>))}
                  </ul>
                  <div className="gift-foot">Cupos por tanda · sin tarjeta · cancela cuando quieras</div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
