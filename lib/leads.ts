// Lead capture (pre-registro).
//
// La landing es estática y NO toca Supabase ni secretos. El form hace POST al
// BACKEND (SkipFee-backend) → `${NEXT_PUBLIC_API_URL}/api/leads`. El backend es
// quien guarda el lead en Supabase (service_role) y avisa al webhook de Discord.
//
// Para activarlo: seteá NEXT_PUBLIC_API_URL al origen del backend (ver
// .env.example) y agregá el dominio de esta landing a EXTRA_CORS_ORIGINS en el
// backend, para que su CORS te deje postear.

// Origen del backend, sin slash final. Ej: "https://api.skipfee.co".
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

// Tu número de WhatsApp de negocio, solo dígitos (ej. "573001234567").
// Se usa para el botón "escríbenos por WhatsApp" y los CTA de wa.me.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

// Link para "Agendar mi llamada" (Google Calendar Appointment Schedule o Calendly).
// Si está vacío, el éxito muestra "te escribimos en menos de 24h" en su lugar.
export const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL ?? "";

// Sin backend configurado, el form corre en modo demo (simula, no guarda).
export const leadsConfigured = Boolean(API_URL);

// Todos opcionales. El Paso 2 manda la fila ya calificada (estado "calificado").
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
  const res = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`leads ${res.status} ${detail}`);
  }
}
