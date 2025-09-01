
-- 01_schema.sql
create extension if not exists "uuid-ossp";

-- PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('homeowner','tiler','admin')) not null default 'homeowner',
  full_name text,
  phone text,
  city text,
  avatar_url text,
  push_token text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- TILERS
create table if not exists public.tilers (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  city text,
  bio text,
  cover_url text,
  rating_avg numeric,
  rating_count int,
  is_active boolean not null default true,
  spotlights text[],
  created_at timestamptz default now()
);

-- SERVICES
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  cover_url text,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- TILER_SERVICES
create table if not exists public.tiler_services (
  id uuid primary key default uuid_generate_v4(),
  tiler_id uuid not null references public.tilers(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  rate_lkr_sqft numeric
);

-- BOOKINGS
create type booking_status as enum ('pending','accepted','declined','completed','canceled');
create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  homeowner_id uuid not null references public.profiles(id) on delete cascade,
  tiler_id uuid not null references public.tilers(id) on delete cascade,
  service_id uuid not null references public.services(id),
  address text,
  date_preference text,
  notes text,
  status booking_status not null default 'pending',
  created_at timestamptz default now()
);

-- REVIEWS
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  tiler_id uuid not null references public.tilers(id),
  reviewer_id uuid not null references public.profiles(id),
  rating_quality int not null check (rating_quality between 1 and 5),
  rating_service int not null check (rating_service between 1 and 5),
  rating_timeliness int not null check (rating_timeliness between 1 and 5),
  rating_pricing int not null check (rating_pricing between 1 and 5),
  rating_cleanliness int not null check (rating_cleanliness between 1 and 5),
  comment text,
  approved boolean not null default true,
  created_at timestamptz default now()
);

-- BANNERS
create table if not exists public.banners (
  id uuid primary key default uuid_generate_v4(),
  title text,
  image_url text,
  cta_label text,
  cta_url text,
  priority int default 0
);

-- ESTIMATOR CONFIG
create table if not exists public.estimator_configs (
  id uuid primary key default uuid_generate_v4(),
  wastage_default numeric,
  labor_floor_min numeric,
  labor_floor_max numeric,
  labor_skirting_min numeric,
  labor_skirting_max numeric,
  created_at timestamptz default now()
);

-- helper function to detect admin
create or replace function public.is_admin(uid uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from public.profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;
