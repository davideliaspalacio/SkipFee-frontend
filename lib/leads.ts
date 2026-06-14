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

// Optional WhatsApp fallback: your business number, digits only (e.g. "573001234567").
// If set, a "send by WhatsApp" option appears if the save ever fails.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const leadsConfigured =
  SUPABASE_URL !== URL_FALLBACK && SUPABASE_ANON_KEY !== KEY_FALLBACK;

export type Lead = {
  business_name: string;
  contact_name: string;
  phone: string;
  email?: string;
  contact_channel: string;
  plan: string;
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
