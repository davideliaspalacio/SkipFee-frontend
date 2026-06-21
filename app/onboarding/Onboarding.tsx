"use client";

import { useEffect, useState, type FormEvent } from "react";
import { submitLead, leadsConfigured, type Lead } from "@/lib/leads";
import {
  PLAN_ORDER,
  PLANS,
  SCREEN_LABELS,
  lockedScreens,
  type PlanId,
} from "@/lib/plans";

const CITIES = ["Medellín", "Bogotá", "Cali", "Barranquilla", "Bucaramanga", "Cartagena", "Pereira", "Otra"];
const CUISINES = ["Hamburguesas", "Pizza", "Comida rápida", "Comida típica", "Saludable / bowls", "Asiática / sushi", "Postres / café", "Otra"];

const STEPS = ["Tu negocio", "Tu plan", "Tu tienda", "Listo"];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "").slice(0, 22);

const cop = (n: number) => "$" + n.toLocaleString("es-CO");

type Product = { name: string; price: number };

const SAMPLE_MENU: Record<string, Product[]> = {
  Hamburguesas: [
    { name: "Hamburguesa clásica", price: 19000 },
    { name: "Doble carne y tocineta", price: 27000 },
    { name: "Papas a la francesa", price: 9000 },
  ],
  Pizza: [
    { name: "Pizza margarita", price: 28000 },
    { name: "Pizza pepperoni", price: 32000 },
    { name: "Limonada natural", price: 7000 },
  ],
  "Comida rápida": [
    { name: "Perro caliente especial", price: 15000 },
    { name: "Salchipapa", price: 16000 },
    { name: "Gaseosa 400ml", price: 5000 },
  ],
  "Comida típica": [
    { name: "Bandeja paisa", price: 26000 },
    { name: "Sancocho de gallina", price: 22000 },
    { name: "Jugo de mora", price: 7000 },
  ],
  "Saludable / bowls": [
    { name: "Bowl de pollo", price: 24000 },
    { name: "Ensalada césar", price: 21000 },
    { name: "Limonada de coco", price: 9000 },
  ],
  "Asiática / sushi": [
    { name: "Roll California (10u)", price: 28000 },
    { name: "Gyozas (6u)", price: 18000 },
    { name: "Té helado", price: 7000 },
  ],
  "Postres / café": [
    { name: "Brownie con helado", price: 14000 },
    { name: "Capuccino", price: 8000 },
    { name: "Cheesecake", price: 13000 },
  ],
};
const DEFAULT_MENU: Product[] = [
  { name: "Producto estrella", price: 20000 },
  { name: "Combo del día", price: 28000 },
  { name: "Bebida", price: 6000 },
];
const sampleMenu = (cuisine: string): Product[] =>
  (SAMPLE_MENU[cuisine] ?? DEFAULT_MENU).map((p) => ({ ...p }));

// Base del panel admin para el "modo demo". En prod se setea NEXT_PUBLIC_ADMIN_URL.
function adminBase(): string {
  const env = (process.env.NEXT_PUBLIC_ADMIN_URL ?? "").replace(/\/+$/, "");
  if (env) return env;
  if (typeof window !== "undefined" && window.location.hostname === "localhost") return "http://localhost:3001";
  return "https://admin.skipfee.co";
}

const empty = {
  business_name: "",
  whatsapp: "",
  city: "",
  cuisine_type: "",
  plan: "negocio" as PlanId,
  open_hour: "11:00",
  close_hour: "22:00",
  products: [] as Product[],
};

export default function Onboarding() {
  const [form, setForm] = useState(empty);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const set = <K extends keyof typeof empty>(k: K, v: (typeof empty)[K]) => setForm((f) => ({ ...f, [k]: v }));

  // Pre-llena WhatsApp (?w=) y plan (?plan=) si llega desde la landing.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const w = p.get("w");
    const plan = p.get("plan");
    setForm((f) => ({
      ...f,
      whatsapp: w || f.whatsapp,
      plan: plan && plan in PLANS ? (plan as PlanId) : f.plan,
    }));
  }, []);

  // Al llegar al paso 3, prellena un menú de ejemplo según el tipo de comida.
  useEffect(() => {
    if (step === 3 && form.products.length === 0) {
      setForm((f) => ({ ...f, products: sampleMenu(f.cuisine_type) }));
    }
  }, [step, form.products.length, form.cuisine_type]);

  const negocio = form.business_name.trim() || "tu restaurante";
  const slug = slugify(form.business_name) || "tutienda";
  const plan = PLANS[form.plan];
  const locked = lockedScreens(form.plan);

  const setProduct = (i: number, key: keyof Product, value: string) =>
    setForm((f) => ({
      ...f,
      products: f.products.map((p, idx) =>
        idx === i ? { ...p, [key]: key === "price" ? Number(value.replace(/\D/g, "")) || 0 : value } : p,
      ),
    }));

  const demoUrl = () => {
    const params = new URLSearchParams({
      demo: "1",
      negocio: form.business_name.trim() || "Tu Negocio",
      plan: form.plan,
    });
    return `${adminBase()}/preview/dashboard?${params.toString()}`;
  };

  const persistLead = () => {
    if (!leadsConfigured) {
      console.info("onboarding: modo demo (backend sin configurar) — no se guardó");
      return;
    }
    const lead: Lead = {
      business_name: form.business_name,
      whatsapp: form.whatsapp,
      city: form.city || undefined,
      cuisine_type: form.cuisine_type || undefined,
      plan: form.plan,
      estado: "onboarding",
      source: "landing-onboarding",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };
    // No bloquea la experiencia: si falla, lo registramos y seguimos.
    void submitLead(lead).catch((err) => console.error("onboarding lead:", err));
  };

  const submitStep1 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };
  const submitStep3 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    persistLead();
    // Pequeño respiro para que se sienta el "armado" de la tienda.
    window.setTimeout(() => {
      setStatus("idle");
      setStep(4);
    }, 650);
  };

  const pct = (step / STEPS.length) * 100;

  return (
    <>
      <section className="band ink grid-bg tight">
        <div className="wrap-wide">
          <div className="sec-head center reveal in" style={{ marginBottom: 0 }}>
            <div className="kicker">
              <span className="dot" style={{ background: "var(--green)" }} /> Crea tu tienda · sin tarjeta
            </div>
            <h1 style={{ color: "var(--on-ink)" }}>
              Monta tu restaurante en Skipfee y <span className="green">mira tu panel en vivo.</span>
            </h1>
            <p>Registra tu negocio, elige tu plan y entra a un panel de prueba con tus datos. 2 minutos, sin compromiso.</p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap" style={{ maxWidth: step === 2 ? 980 : 720 }}>
          {/* Stepper */}
          <ol className="ob-steps reveal in" aria-label="Progreso">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const state = n < step ? "done" : n === step ? "now" : "todo";
              return (
                <li key={label} className={`ob-step is-${state}`}>
                  <span className="ob-step-dot" aria-hidden="true">
                    {state === "done" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : (
                      n
                    )}
                  </span>
                  <span className="ob-step-label">{label}</span>
                </li>
              );
            })}
          </ol>

          <div className="panel lead-form ob-card reveal in">
            <div className="lead-prog" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>

            {/* PASO 1 · Tu negocio */}
            {step === 1 && (
              <form className="panel-body" onSubmit={submitStep1} noValidate>
                <h2 className="ob-h">Cuéntanos de tu negocio</h2>
                <p className="ob-lede">Con esto personalizamos tu tienda y tu panel de prueba.</p>

                <div className="field">
                  <label className="fl" htmlFor="business_name">Nombre de tu restaurante <span className="req">*</span></label>
                  <input id="business_name" type="text" required placeholder="Ej. Arepa Club"
                    value={form.business_name} onChange={(e) => set("business_name", e.target.value)} />
                  <p className="fhint">Tu tienda viviría en <b style={{ color: "var(--green-ink)" }}>{slug}.skipfee.co</b></p>
                </div>

                <div className="field">
                  <label className="fl" htmlFor="whatsapp">Tu WhatsApp <span className="req">*</span></label>
                  <div className="wa-input">
                    <span className="wa-pre" aria-hidden="true">🇨🇴 +57</span>
                    <input id="whatsapp" type="tel" required inputMode="tel" placeholder="300 123 4567"
                      value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
                  </div>
                  <p className="fhint">Sobre este número atiende el bot. No tienes que cambiarlo.</p>
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

                <div className="ob-nav">
                  <button className="btn btn-primary lead-submit" type="submit">
                    Continuar
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                </div>
              </form>
            )}

            {/* PASO 2 · Tu plan */}
            {step === 2 && (
              <div className="panel-body">
                <h2 className="ob-h">Elige tu plan</h2>
                <p className="ob-lede">Todos incluyen <b style={{ color: "var(--green-ink)" }}>0% de comisión</b>, tus clientes y tu info 100% tuyos. Cancela cuando quieras.</p>

                <div className="ob-plan-grid">
                  {PLAN_ORDER.map((id) => {
                    const p = PLANS[id];
                    const sel = form.plan === id;
                    return (
                      <label key={id} className={`ob-plan${sel ? " is-sel" : ""}${p.badge ? " is-pop" : ""}`}>
                        <input type="radio" name="plan" value={id} checked={sel} onChange={() => set("plan", id)} />
                        {p.badge && <span className="ob-plan-badge">{p.badge}</span>}
                        <span className="ob-plan-top">
                          <b>{p.name}</b>
                          <span className="ob-plan-price">US${p.priceUsd}<small>/mes</small></span>
                        </span>
                        <span className="ob-plan-tag">{p.tagline}</span>
                        <ul className="ob-plan-list">
                          {p.highlights.map((h) => (
                            <li key={h}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <span className="ob-plan-meta">{p.whatsappNumbers} · {p.conversations}</span>
                        <span className="ob-plan-check" aria-hidden="true">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="ob-nav">
                  <button type="button" className="ob-back" onClick={() => setStep(1)}>← Volver</button>
                  <button className="btn btn-primary" type="button" onClick={() => setStep(3)}>
                    Sigo con {plan.name}
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                </div>
              </div>
            )}

            {/* PASO 3 · Tu tienda (config básica) */}
            {step === 3 && (
              <form className="panel-body" onSubmit={submitStep3} noValidate>
                <h2 className="ob-h">Arma tu tienda</h2>
                <p className="ob-lede">Lo básico para ver tu panel funcionando. Después cargas todo tu menú real.</p>

                <div className="field">
                  <span className="fl">Horario de atención</span>
                  <div className="ob-hours">
                    <label className="ob-hour">
                      <span>Abre</span>
                      <input type="time" value={form.open_hour} onChange={(e) => set("open_hour", e.target.value)} />
                    </label>
                    <label className="ob-hour">
                      <span>Cierra</span>
                      <input type="time" value={form.close_hour} onChange={(e) => set("close_hour", e.target.value)} />
                    </label>
                  </div>
                </div>

                <div className="field">
                  <span className="fl">Tu menú de arranque <span className="opt">(3 productos de ejemplo)</span></span>
                  <div className="ob-prod">
                    {form.products.map((p, i) => (
                      <div className="ob-prod-row" key={i}>
                        <input aria-label={`Producto ${i + 1}`} type="text" placeholder="Nombre del producto"
                          value={p.name} onChange={(e) => setProduct(i, "name", e.target.value)} />
                        <div className="ob-price">
                          <span aria-hidden="true">$</span>
                          <input aria-label={`Precio ${i + 1}`} type="text" inputMode="numeric" placeholder="0"
                            value={p.price ? p.price.toLocaleString("es-CO") : ""} onChange={(e) => setProduct(i, "price", e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="fhint">Estos los precargamos según tu tipo de comida. Ajústalos a tu gusto.</p>
                </div>

                <div className="ob-nav">
                  <button type="button" className="ob-back" onClick={() => setStep(2)}>← Volver</button>
                  <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? (<><span className="lead-spin" aria-hidden="true" /> Armando tu tienda…</>) : (<>Crear mi tienda
                      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg></>)}
                  </button>
                </div>
              </form>
            )}

            {/* PASO 4 · Listo */}
            {step === 4 && (
              <div className="panel-body">
                <div className="lead-done" style={{ maxWidth: "none" }}>
                  <span className="lead-check-wrap">
                    <span className="lead-burst" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></span>
                    <span className="lead-check" aria-hidden="true">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                  </span>
                  <h2 style={{ marginTop: 18 }}>
                    ¡Tu tienda <span className="green">{negocio}</span> está lista para probar!
                  </h2>

                  <div className="lead-diag" style={{ textAlign: "left" }}>
                    <p>
                      Plan <b>{plan.name}</b> · {plan.whatsappNumbers} · {plan.conversations}.
                      Entra a tu panel de prueba con datos de ejemplo y mira cómo se opera tu restaurante de punta a punta.
                    </p>
                  </div>

                  <a className="btn btn-primary" href={demoUrl()} target="_blank" rel="noopener noreferrer" style={{ marginTop: 22 }}>
                    Ver mi panel de prueba
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>

                  {locked.length > 0 && (
                    <div className="ob-locks">
                      <span className="ob-locks-h">Con <b>{plan.name}</b> desbloqueas más adelante:</span>
                      <div className="ob-locks-chips">
                        {locked.map((s) => (
                          <span key={s} className="ob-lock-chip">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            {SCREEN_LABELS[s]}
                          </span>
                        ))}
                      </div>
                      <p className="lead-fine" style={{ textAlign: "center" }}>
                        En el panel verás estas funciones con candado. Sube de plan para activarlas.
                      </p>
                    </div>
                  )}

                  <p className="lead-fine" style={{ textAlign: "center" }}>
                    Es una demostración con datos de ejemplo. Cuando actives tu cuenta, configuramos tu menú y tus pagos contigo.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
