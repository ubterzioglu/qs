-- Qualtron Sinclair — initial schema
-- Content tables (CMS) + form submission tables + RLS.
--
-- Security model:
--   * anon/authenticated: SELECT on published content only; INSERT-only on form tables.
--   * No public UPDATE/DELETE anywhere.
--   * All writes to content happen via the service-role key from guarded
--     /admin server actions (service role bypasses RLS).

-- ============================ content ============================

create table if not exists services (
  slug        text primary key,
  code        text not null,
  ord         int  not null default 0,
  title       jsonb not null,          -- {en, tr}
  description jsonb not null,
  quote       jsonb not null,
  subtitle    jsonb,
  image       text not null,
  image_alt   jsonb not null,
  updated_at  timestamptz not null default now()
);

create table if not exists blog_posts (
  slug              text primary key,
  status            text not null default 'published' check (status in ('published','draft')),
  title             jsonb not null,
  excerpt           jsonb not null,
  body              jsonb not null,    -- {en, tr} markdown
  cover             text,
  author            text not null default 'Qualtron Sinclair',
  published_at      date not null,
  read_time_minutes int  not null default 2,
  updated_at        timestamptz not null default now()
);

create table if not exists network_brands (
  id          int generated always as identity primary key,
  name        text not null unique,
  description jsonb not null,
  url         text,
  ord         int not null default 0
);

create table if not exists principles (
  id          int generated always as identity primary key,
  title       jsonb not null,
  description jsonb not null,
  ord         int not null default 0
);

create table if not exists portfolio_items (
  slug        text primary key,
  name        text not null,
  category    text not null default 'venture'
              check (category in ('venture','partner','subsidiary','investment','platform')),
  description jsonb not null default '{}'::jsonb,
  logo        text,
  url         text,
  ord         int  not null default 0,
  is_public   boolean not null default true,
  updated_at  timestamptz not null default now()
);

create table if not exists locations (
  id          int generated always as identity primary key,
  city        text not null,
  address     text not null,
  phone       text not null,
  phone_label text not null default 'M',
  map         text,
  ord         int not null default 0
);

create table if not exists site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ============================ form submissions ============================

create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name  text not null,
  email      text not null,
  phone      text,
  message    text not null,
  created_at timestamptz not null default now()
);

create table if not exists career_applications (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name  text not null,
  dob        text,
  email      text not null,
  phone      text,
  resume_url text,
  created_at timestamptz not null default now()
);

create table if not exists innoventure_applications (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name  text not null,
  email      text not null,
  phone      text,
  company    text not null,
  position   text not null,
  country    text not null,
  project    text not null,
  consent    boolean not null,
  cv_url     text,
  created_at timestamptz not null default now()
);

create table if not exists startup_hub_submissions (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name  text not null,
  email      text not null,
  company    text,
  file_url   text,
  message    text,
  created_at timestamptz not null default now()
);

-- ============================ RLS ============================

alter table services                 enable row level security;
alter table blog_posts               enable row level security;
alter table network_brands           enable row level security;
alter table principles               enable row level security;
alter table portfolio_items          enable row level security;
alter table locations                enable row level security;
alter table site_settings            enable row level security;
alter table contact_messages         enable row level security;
alter table career_applications      enable row level security;
alter table innoventure_applications enable row level security;
alter table startup_hub_submissions  enable row level security;

-- Content: public read (published/public rows only where applicable).
drop policy if exists "public read services" on services;
create policy "public read services" on services for select using (true);

drop policy if exists "public read published posts" on blog_posts;
create policy "public read published posts" on blog_posts for select using (status = 'published');

drop policy if exists "public read network brands" on network_brands;
create policy "public read network brands" on network_brands for select using (true);

drop policy if exists "public read principles" on principles;
create policy "public read principles" on principles for select using (true);

drop policy if exists "public read public portfolio" on portfolio_items;
create policy "public read public portfolio" on portfolio_items for select using (is_public);

drop policy if exists "public read locations" on locations;
create policy "public read locations" on locations for select using (true);

drop policy if exists "public read settings" on site_settings;
create policy "public read settings" on site_settings for select using (true);

-- Forms: public INSERT only. No select/update/delete policies -> denied for anon.
drop policy if exists "public insert contact" on contact_messages;
create policy "public insert contact" on contact_messages for insert with check (true);

drop policy if exists "public insert careers" on career_applications;
create policy "public insert careers" on career_applications for insert with check (true);

drop policy if exists "public insert innoventure" on innoventure_applications;
create policy "public insert innoventure" on innoventure_applications for insert with check (true);

drop policy if exists "public insert startup hub" on startup_hub_submissions;
create policy "public insert startup hub" on startup_hub_submissions for insert with check (true);
