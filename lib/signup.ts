// Registro público (autoservicio).
//
// Igual que `leads.ts`, la landing es estática y NO toca Supabase: hace POST al
// backend, que es quien crea la empresa. La diferencia es que esto ya no captura
// un lead para que alguien llame después — crea la cuenta de verdad.
//
// Requiere `NEXT_PUBLIC_API_URL` y que el dominio de esta landing esté en
// `EXTRA_CORS_ORIGINS` del backend.

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

/** Sin backend configurado no se puede registrar a nadie. */
export const signupConfigured = Boolean(API_URL);

/** Dominio donde vivirá la tienda del negocio. Solo para mostrar. */
export const STORE_DOMAIN = process.env.NEXT_PUBLIC_STORE_DOMAIN ?? "skipfee.co";

/** A dónde se manda al dueño recién registrado a entrar. */
export const PANEL_URL = process.env.NEXT_PUBLIC_PANEL_URL ?? "https://admin.skipfee.co";

export type SignupInput = {
  businessName: string;
  email: string;
  password: string;
  slug?: string;
  turnstileToken?: string;
};

export type SignupResult =
  | {
      ok: true;
      company: { slug: string; code: number; name: string };
      needsEmailConfirmation: boolean;
      /** Pase de un solo uso para entrar al panel sin repetir la contraseña. */
      pase?: string | null;
    }
  | { ok: false; error: string; suggestion?: string };

export async function submitSignup(input: SignupInput): Promise<SignupResult> {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.ok) {
    return {
      ok: false,
      error: body?.error ?? "No pudimos crear tu cuenta. Intenta de nuevo.",
      suggestion: body?.suggestion,
    };
  }
  return body as SignupResult;
}

/**
 * Consulta en vivo qué dirección le quedaría al negocio. Sin esto el usuario
 * descubre que el nombre está tomado recién al enviar, que es donde más se
 * abandona.
 */
export async function checkSlug(name: string): Promise<{ slug: string; suggestion?: string } | null> {
  if (!signupConfigured || name.trim().length < 2) return null;
  try {
    const res = await fetch(`${API_URL}/api/auth/slug-available?name=${encodeURIComponent(name)}`);
    if (!res.ok) return null;
    const body = await res.json();
    return { slug: body.slug, suggestion: body.suggestion };
  } catch {
    return null;
  }
}

/** Versión local de la derivación, para pintar algo mientras responde el backend. */
export function previewSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}
