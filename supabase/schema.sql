-- Supabase/Postgres schema generated from svp-platform project structure
-- Focus: organizations/users (basic), marketing CMS pages, government solicitations tracking,
-- and solicitation search history. Adjust/extend as needed.

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================================
-- Core: Organizations
-- ============================================================================

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists organizations_slug_idx on public.organizations (slug);

-- ============================================================================
-- Core: User Profiles (maps to auth.users)
-- ============================================================================

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user',
  organization_id uuid references public.organizations(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_profiles_org_idx on public.user_profiles (organization_id);

-- ============================================================================
-- Marketing CMS
-- ============================================================================

do $$ begin
  if not exists (select 1 from pg_type where typname = 'marketing_page_status') then
    create type public.marketing_page_status as enum ('draft', 'published');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'marketing_section_type') then
    create type public.marketing_section_type as enum ('hero', 'content', 'bullets', 'stats', 'cta');
  end if;
end $$;

create table if not exists public.marketing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  status public.marketing_page_status not null default 'draft',
  primary_cta_label text,
  primary_cta_href text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create index if not exists marketing_pages_status_idx on public.marketing_pages (status);

create table if not exists public.marketing_page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.marketing_pages(id) on delete cascade,
  section_key text not null,
  type public.marketing_section_type not null,
  title text,
  subtitle text,
  body text,
  bullets jsonb,
  ctas jsonb,
  enabled boolean not null default true,
  "order" int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, section_key)
);

create index if not exists marketing_page_sections_page_order_idx on public.marketing_page_sections (page_id, "order");

-- ============================================================================
-- Government Solicitations (internal tracking)
-- ============================================================================

do $$ begin
  if not exists (select 1 from pg_type where typname = 'gov_solicitation_status') then
    create type public.gov_solicitation_status as enum ('draft', 'open', 'submitted', 'awarded', 'archived');
  end if;
end $$;

create table if not exists public.government_solicitations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  solicitation_number text,
  agency text,
  set_aside text,
  naics text[],
  posted_date date,
  due_date date,
  status public.gov_solicitation_status not null default 'draft',
  url text,
  description text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create index if not exists government_solicitations_status_idx on public.government_solicitations (status);
create index if not exists government_solicitations_due_date_idx on public.government_solicitations (due_date);

-- ============================================================================
-- Solicitation Search History (optional)
-- ============================================================================

create table if not exists public.solicitation_search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  filters jsonb not null default '{}'::jsonb,
  platforms text[] not null default array[]::text[],
  results_count int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists solicitation_search_history_user_created_idx on public.solicitation_search_history (user_id, created_at desc);

-- ============================================================================
-- RLS (basic, safe defaults)
-- ============================================================================

alter table public.organizations enable row level security;
alter table public.user_profiles enable row level security;
alter table public.marketing_pages enable row level security;
alter table public.marketing_page_sections enable row level security;
alter table public.government_solicitations enable row level security;
alter table public.solicitation_search_history enable row level security;

-- Public read-only access to published marketing pages/sections
create policy if not exists "marketing_pages_public_read_published"
on public.marketing_pages
for select
to anon, authenticated
using (status = 'published');

create policy if not exists "marketing_sections_public_read_for_published_pages"
on public.marketing_page_sections
for select
to anon, authenticated
using (
  exists (
    select 1 from public.marketing_pages p
    where p.id = marketing_page_sections.page_id
      and p.status = 'published'
  )
);

-- Admin-only management of marketing content
create policy if not exists "marketing_pages_admin_all"
on public.marketing_pages
for all
to authenticated
using (
  exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and up.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and up.role = 'admin'
  )
);

create policy if not exists "marketing_sections_admin_all"
on public.marketing_page_sections
for all
to authenticated
using (
  exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and up.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and up.role = 'admin'
  )
);

-- User profile policies
create policy if not exists "user_profiles_self_read"
on public.user_profiles
for select
to authenticated
using (id = auth.uid());

create policy if not exists "user_profiles_self_update"
on public.user_profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Government solicitations: authenticated access (tighten to admin later)
create policy if not exists "government_solicitations_admin_all"
on public.government_solicitations
for all
to authenticated
using (
  exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and up.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and up.role = 'admin'
  )
);

-- Search history: only owner
create policy if not exists "solicitation_search_history_owner_all"
on public.solicitation_search_history
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
