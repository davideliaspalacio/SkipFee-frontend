"use client";

import { useEffect, useState } from "react";
import { PLAN_ORDER, PLANS, type PlanId } from "@/lib/plans";

// Base del panel admin (demo). En prod se setea NEXT_PUBLIC_ADMIN_URL.
function adminBase(): string {
  const env = (process.env.NEXT_PUBLIC_ADMIN_URL ?? "").replace(/\/+$/, "");
  if (env) return env;
  if (typeof window !== "undefined" && window.location.hostname === "localhost") return "http://localhost:3001";
  return "https://admin.skipfee.co";
}

const SEE = [
  { emoji: "🧾", title: "Pedidos en vivo", desc: "Un tablero que se mueve solo: nuevo, cocina, en ruta, entregado." },
  { emoji: "👨‍🍳", title: "Cocina y despachos", desc: "Comandas con cronómetro y rutas de entrega optimizadas." },
  { emoji: "💬", title: "WhatsApp con bot", desc: "El bot atiende 24/7 y tú tomas el control cuando quieras." },
  { emoji: "📊", title: "Reportes y clientes", desc: "Ventas, horas pico y tu CRM — toda la info es tuya." },
];

export default function Onboarding() {
  const [plan, setPlan] = useState<PlanId>("negocio");

  // Permite preseleccionar el plan desde la landing (?plan=...).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("plan");
    if (p && p in PLANS) setPlan(p as PlanId);
  }, []);

  const demoUrl = `${adminBase()}/preview/dashboard?demo=1&plan=${plan}&tour=1`;

  return (
    <>
      {/* Hero */}
      <section className="band ink grid-bg ob-hero">
        <div className="wrap ob-hero-in">
          <span className="ob-demo-badge reveal in">
            <span className="ob-demo-dot" aria-hidden="true" /> Demo interactivo · sin registro
          </span>
          <h1 className="reveal in" style={{ color: "var(--on-ink)" }}>
            Mira por dentro el <span className="green">panel de Skipfee</span>
          </h1>
          <p className="ob-hero-lede reveal in">
            Un recorrido guiado de 2 minutos con datos de ejemplo. Sin tarjeta, sin compromiso — solo para que veas cómo se opera tu restaurante.
          </p>
          <a className="btn btn-on-ink ob-hero-cta reveal in" href={demoUrl}>
            Iniciar el recorrido
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <span className="ob-hero-fine reveal in">Datos de ejemplo · no se guarda nada</span>
        </div>
      </section>

      {/* Qué vas a recorrer */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head center">
            <div className="kicker"><span className="dot" style={{ background: "var(--green)" }} /> Lo que vas a recorrer</div>
            <h2>Toda tu operación, en un panel</h2>
          </div>
          <div className="ob-see-grid">
            {SEE.map((s, i) => (
              <div key={s.title} className={`ob-see-card reveal in d${i + 1}`}>
                <span className="ob-see-emoji float" aria-hidden="true">{s.emoji}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elegir plan + lanzar */}
      <section className="band s2">
        <div className="wrap ob-plan-wrap">
          <div className="sec-head center">
            <div className="kicker"><span className="dot" style={{ background: "var(--green)" }} /> Elige tu plan</div>
            <h2>¿Con qué plan quieres ver el panel?</h2>
            <p>Verás exactamente lo que ese plan incluye — y lo que queda con candado.</p>
          </div>

          <div className="ob-plan-grid">
            {PLAN_ORDER.map((id) => {
              const p = PLANS[id];
              const sel = plan === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`ob-plan${sel ? " is-sel" : ""}${p.badge ? " is-pop" : ""}`}
                  onClick={() => setPlan(id)}
                  aria-pressed={sel}
                >
                  {p.badge && <span className="ob-plan-badge">{p.badge}</span>}
                  <span className="ob-plan-top">
                    <b>{p.name}</b>
                    <span className="ob-plan-price">US${p.priceUsd}<small>/mes</small></span>
                  </span>
                  <span className="ob-plan-tag">{p.tagline}</span>
                  <span className="ob-plan-meta">{p.whatsappNumbers} · {p.conversations}</span>
                  <span className="ob-plan-check" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ob-launch">
            <a className="btn btn-primary ob-launch-cta" href={demoUrl}>
              Iniciar el recorrido con {PLANS[plan].name}
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <p className="ob-launch-fine">Datos de ejemplo · 2 minutos · sin registro</p>
          </div>
        </div>
      </section>
    </>
  );
}
