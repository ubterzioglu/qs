-- Revision requests board (admin-internal) + per-request comment threads.
--
-- Security: RLS enabled with NO policies -> anon/authenticated are fully denied.
-- All reads/writes go through the service-role client from guarded /admin
-- server actions (requireAdmin), so the data never leaves the admin surface.

create table if not exists revision_requests (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  page        text not null default '',        -- which page/section it concerns
  priority    text not null default 'normal' check (priority in ('low','normal','high')),
  status      text not null default 'open'     check (status in ('open','in_progress','done')),
  created_by  text not null,                   -- admin email
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists revision_comments (
  id         uuid primary key default gen_random_uuid(),
  request_id uuid not null references revision_requests(id) on delete cascade,
  author     text not null,                    -- admin email
  body       text not null,
  created_at timestamptz not null default now()
);

create index if not exists revision_comments_request_idx
  on revision_comments (request_id, created_at);

alter table revision_requests enable row level security;
alter table revision_comments enable row level security;
-- (intentionally no policies: service-role only)
