// Lead capture (pre-registro) config.
//
// The anon / publishable key is PUBLIC by design — security is enforced by Row
// Level Security on the `leads` table (anon can INSERT, never SELECT). So it is
// safe to paste it here. You can also set the NEXT_PUBLIC_ env vars instead.
//
// 1. Run the SQL in db/leads.sql in your Supabase SQL editor (creates the table + RLS).
// 2. Paste your project URL and anon key below (Project settings → API).

const URL_FALLBACK = "https://TU-PROYECTO.supabase.co";
const KEY_FALLBACK = "TU_ANON_KEY";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? URL_FALLBACK;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? KEY_FALLBACK;
export const LEADS_TABLE = "leads";

// Tu número de WhatsApp de negocio, solo dígitos (ej. "573001234567").
// Se usa para el botón "escríbenos por WhatsApp" y los CTA de wa.me.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

// Link para "Agendar mi llamada" (Google Calendar Appointment Schedule o Calendly).
// Si está vacío, el éxito muestra "te escribimos en menos de 24h" en su lugar.
export const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL ?? "";

export const leadsConfigured =
  SUPABASE_URL !== URL_FALLBACK && SUPABASE_ANON_KEY !== KEY_FALLBACK;

// Todos opcionales: el Paso 1 guarda un subconjunto (estado "parcial") y el
// Paso 2 inserta otra fila ya calificada (estado "calificado"). anon solo INSERT.
export type Lead = {
  whatsapp?: string;
  business_name?: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  contact_channel?: string;
  plan?: string;
  orders_volume?: string;
  peak_hours?: string;
  est_loss?: string;
  city?: string;
  current_apps?: string;
  cuisine_type?: string;
  estado?: string;
  source?: string;
  user_agent?: string;
};

export async function submitLead(lead: Lead): Promise<void> {
  if (!leadsConfigured) throw new Error("leads-not-configured");
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${LEADS_TABLE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`supabase ${res.status} ${detail}`);
  }
}
