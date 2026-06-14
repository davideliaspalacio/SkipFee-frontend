-- Skipfee · tabla de pre-registro (leads de la campaña)
-- Pégalo en Supabase → SQL Editor → Run. Seguro de correr varias veces.

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  business_name   text not null,
  contact_name    text not null,
  phone           text not null,
  email           text,
  contact_channel text,          -- whatsapp | llamada | email
  plan            text,          -- cohorte/oferta, p.ej. 'negocio_regalo'
  source          text default 'landing-preregistro',
  user_agent      text
);

-- RLS: el formulario público (rol anon) SOLO puede insertar; nunca leer.
-- Tú lees los leads desde el dashboard de Supabase o con la service key.
alter table public.leads enable row level security;

grant insert on table public.leads to anon;

drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Búsqueda rápida por fecha
create index if not exists leads_created_at_idx on public.leads (created_at desc);
