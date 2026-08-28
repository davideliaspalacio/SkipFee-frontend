"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  PANEL_URL,
  STORE_DOMAIN,
  checkSlug,
  previewSlug,
  signupConfigured,
  submitSignup,
} from "@/lib/signup";

/**
 * Registro público — la puerta del autoservicio.
 *
 * Solo TRES campos. Todo lo demás (carta, zona de entrega, WhatsApp) se pide
 * después, dentro del panel: cada campo extra en un formulario de registro
 * cuesta conversión, y nada de eso hace falta para crear la cuenta.
 *
 * El momento que engancha es ver la dirección de tu tienda aparecer mientras
 * escribes el nombre. Por eso el slug se consulta en vivo contra el backend:
 * descubrir que el nombre está tomado al enviar es donde más gente abandona.
 *
 * No se pide tarjeta, y se dice explícitamente — es lo que hace la competencia
 * y quita la ansiedad de "esto me va a cobrar".
 */

type Estado = "idle" | "enviando" | "listo";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);

  const [slug, setSlug] = useState("");
  const [slugTomado, setSlugTomado] = useState<string | null>(null);

  const [estado, setEstado] = useState<Estado>("idle");
  const [error, setError] = useState<string | null>(null);
  const [creada, setCreada] = useState<{
    slug: string;
    name: string;
    /** Con el correo por verificar apagado, la cuenta ya sirve para entrar. */
    confirmar: boolean;
    /** Pase de un solo uso: entra al panel sin volver a escribir la contraseña. */
    pase: string | null;
  } | null>(null);

  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dirección en vivo. Se pinta al instante con la derivación local y se
  // corrige cuando responde el backend (que además sabe si está tomada).
  useEffect(() => {
    setSlug(previewSlug(nombre));
    setSlugTomado(null);
    if (debounce.current) clearTimeout(debounce.current);
    if (nombre.trim().length < 2) return;

    debounce.current = setTimeout(async () => {
      const r = await checkSlug(nombre);
      if (!r) return;
      setSlug(r.slug);
      // Si el backend sugiere algo distinto del base, es que el base está tomado.
      setSlugTomado(r.suggestion && r.suggestion !== r.slug ? r.suggestion : null);
    }, 400);

    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [nombre]);

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!signupConfigured) {
      setError("El registro todavía no está habilitado. Escríbenos y te abrimos la cuenta.");
      return;
    }

    setEstado("enviando");
    const r = await submitSignup({
      businessName: nombre.trim(),
      email: email.trim(),
      password,
      // Si el base estaba tomado, mandamos la sugerencia que ya le mostramos.
      slug: slugTomado ?? undefined,
    });

    if (!r.ok) {
      setEstado("idle");
      setError(r.error);
      if (r.suggestion) setSlugTomado(r.suggestion);
      return;
    }

    setCreada({
      slug: r.company.slug,
      name: r.company.name,
      confirmar: r.needsEmailConfirmation,
      pase: r.pase ?? null,
    });
    setEstado("listo");
  };

  // El pase entra al panel sin repetir la contraseña. Se espera un momento
  // antes de saltar: la dirección de su tienda apareciendo es el momento que
  // engancha, y redirigir al instante se lo roba. Un segundo, no cinco.
  useEffect(() => {
    if (estado !== "listo" || !creada?.pase) return;
    const t = setTimeout(() => {
      window.location.assign(`${PANEL_URL}/entrar?t=${encodeURIComponent(creada.pase!)}`);
    }, 1400);
    return () => clearTimeout(t);
  }, [estado, creada]);

  // ---------------------------------------------------------------- éxito
  if (estado === "listo" && creada) {
    return (
      <section className="band">
        <div className="wrap">
          <div className="lead-done">
            <span className="lead-check-wrap">
              <span className="lead-check" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M4 12.5l5.5 5.5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>

            <h1 style={{ marginTop: 22 }}>
              {creada.confirmar ? "Revisa tu correo" : "Tu cuenta está lista"}
            </h1>
            <p className="sub">
              {creada.confirmar ? (
                <>
                  Le mandamos un enlace a <b>{email}</b> para confirmar tu cuenta. Ábrelo y entras
                  directo a tu panel.
                </>
              ) : creada.pase ? (
                <>
                  Te estamos llevando a tu panel. Ahí te esperan los primeros pasos: tu carta, tu
                  zona de entrega y tu WhatsApp.
                </>
              ) : (
                <>
                  <b>{creada.name}</b> ya existe. Entra con <b>{email}</b> y la contraseña que
                  acabas de crear, y te esperan los primeros pasos: tu carta, tu zona y tu WhatsApp.
                </>
              )}
            </p>

            <div className="signup-slug-done">
              <span>Tu tienda ya tiene dirección</span>
              <b>
                {creada.slug}.{STORE_DOMAIN}
              </b>
            </div>

            {creada.confirmar ? (
              <p className="lead-fine">
                ¿No te llegó en unos minutos? Mira en spam. Si sigue sin aparecer,{" "}
                <Link href="/pre-registro">escríbenos</Link> y lo resolvemos.
              </p>
            ) : (
              <p className="signup-entrar">
                <a
                  className="btn btn-primary"
                  href={
                    creada.pase
                      ? `${PANEL_URL}/entrar?t=${encodeURIComponent(creada.pase)}`
                      : `${PANEL_URL}/login`
                  }
                >
                  {creada.pase ? "Entrar ahora" : "Entrar a mi panel"}
                </a>
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------------ formulario
  return (
    <section className="band">
      <div className="wrap signup-wrap">
        <div className="signup-intro">
          <h1>Crea tu cuenta</h1>
          <p className="sub">
            Tres datos y ya tienes tu tienda. La carta, tu zona de entrega y tu WhatsApp los
            configuras adentro, con calma.
          </p>

          <ul className="signup-points">
            <li>Sin tarjeta de crédito</li>
            <li>Sin permanencia ni contratos</li>
            <li>0% de comisión por venta, siempre</li>
          </ul>
        </div>

        <form className="lead-form signup-form" onSubmit={enviar} noValidate={false}>
          <div className="field">
            <label className="fl" htmlFor="negocio">
              ¿Cómo se llama tu negocio? <span className="req">*</span>
            </label>
            <input
              id="negocio"
              type="text"
              required
              minLength={2}
              maxLength={120}
              autoComplete="organization"
              placeholder="Ej: Arepas Doña Rosa"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            {slug && (
              <div className="signup-slug" data-taken={!!slugTomado}>
                <span>Tu tienda será</span>
                <b>
                  {slugTomado ?? slug}.{STORE_DOMAIN}
                </b>
                {slugTomado && (
                  <small>
                    Ya hay un negocio con ese nombre, así que le agregamos un número.
                  </small>
                )}
              </div>
            )}
          </div>

          <div className="field">
            <label className="fl" htmlFor="email">
              Tu correo <span className="req">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={200}
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="signup-hint">Ahí te avisamos de tus pedidos y recuperas tu contraseña.</span>
          </div>

          <div className="field">
            <label className="fl" htmlFor="password">
              Crea una contraseña <span className="req">*</span>
            </label>
            <div className="signup-pass">
              <input
                id="password"
                type={verPassword ? "text" : "password"}
                required
                minLength={8}
                maxLength={72}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="signup-pass-toggle"
                onClick={() => setVerPassword((v) => !v)}
                aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {verPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary lead-submit"
            disabled={estado === "enviando"}
          >
            {estado === "enviando" ? (
              <>
                <span className="lead-spin" aria-hidden="true" /> Creando tu cuenta…
              </>
            ) : (
              "Crear mi cuenta gratis"
            )}
          </button>

          {error && (
            <p className="lead-error" role="alert">
              {error}
            </p>
          )}

          <p className="lead-fine">
            Al crear tu cuenta aceptas los <Link href="/terminos">términos</Link> y la{" "}
            <Link href="/privacidad">política de privacidad</Link>.
          </p>
        </form>
      </div>
    </section>
  );
}
