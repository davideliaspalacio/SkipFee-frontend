-- Skipfee · tabla de pre-registro (leads de la campaña)
-- Pégalo en Supabase → SQL Editor → Run. Seguro de correr varias veces.

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  whatsapp        text,
  business_name   text,
  contact_name    text,
  phone           text,
  email           text,
  contact_channel text,          -- whatsapp | llamada | email
  plan            text,          -- cohorte/oferta, p.ej. 'negocio_regalo'
  -- preguntas calificadoras (Paso 2)
  orders_volume   text,          -- ej. '30-60', '+100', 'apenas-arranco'
  peak_hours      text,          -- ej. 'almuerzo, noche'
  est_loss        text,          -- ej. '1M-3M', 'no-se'
  city            text,          -- ciudad del restaurante
  current_apps    text,          -- ej. 'Rappi, DiDi Food' | 'Ninguna'
  cuisine_type    text,          -- ej. 'Hamburguesas', 'Comida típica'
  estado          text,          -- 'parcial' (Paso 1) | 'calificado' (Paso 2)
  source          text default 'landing-preregistro',
  user_agent      text
);

-- Columnas nuevas, por si la tabla ya existía de antes (idempotente):
alter table public.leads add column if not exists whatsapp text;
alter table public.leads add column if not exists orders_volume text;
alter table public.leads add column if not exists peak_hours text;
alter table public.leads add column if not exists est_loss text;
alter table public.leads add column if not exists city text;
alter table public.leads add column if not exists current_apps text;
alter table public.leads add column if not exists cuisine_type text;
alter table public.leads add column if not exists estado text;

-- RLS: el formulario público (rol anon) SOLO puede insertar; nunca leer ni actualizar.
-- (No le damos UPDATE a anon a propósito: por eso el Paso 2 inserta una fila nueva,
--  no actualiza la del Paso 1. Tú deduplicas por whatsapp al revisar.)
alter table public.leads enable row level security;

grant insert on table public.leads to anon;

drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_whatsapp_idx on public.leads (whatsapp);
