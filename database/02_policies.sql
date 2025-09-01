
-- 02_policies.sql
alter table public.profiles enable row level security;
alter table public.tilers enable row level security;
alter table public.services enable row level security;
alter table public.tiler_services enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.banners enable row level security;
alter table public.estimator_configs enable row level security;

-- PROFILES
drop policy if exists "profiles_select_all_auth" on public.profiles;
create policy "profiles_select_all_auth" on public.profiles
for select to authenticated using (true);

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self" on public.profiles
for insert to authenticated with check (id = auth.uid());

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin" on public.profiles
for update to authenticated using (id = auth.uid() or public.is_admin(auth.uid()))
with check (id = auth.uid() or public.is_admin(auth.uid()));

-- TILERS
drop policy if exists "tilers_select_public" on public.tilers;
create policy "tilers_select_public" on public.tilers
for select to anon, authenticated using (is_active);

drop policy if exists "tilers_cud_owner_or_admin" on public.tilers;
create policy "tilers_cud_owner_or_admin" on public.tilers
for all to authenticated using (profile_id = auth.uid() or public.is_admin(auth.uid()))
with check (profile_id = auth.uid() or public.is_admin(auth.uid()));

-- SERVICES
drop policy if exists "services_select_public" on public.services;
create policy "services_select_public" on public.services
for select to anon, authenticated using (is_active);

drop policy if exists "services_admin_cud" on public.services;
create policy "services_admin_cud" on public.services
for all to authenticated using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- TILER_SERVICES
drop policy if exists "tiler_services_select_public" on public.tiler_services;
create policy "tiler_services_select_public" on public.tiler_services
for select to anon, authenticated using (true);

drop policy if exists "tiler_services_owner_or_admin" on public.tiler_services;
create policy "tiler_services_owner_or_admin" on public.tiler_services
for all to authenticated using (
  exists(select 1 from public.tilers t where t.id = tiler_services.tiler_id and (t.profile_id = auth.uid() or public.is_admin(auth.uid())))
) with check (
  exists(select 1 from public.tilers t where t.id = tiler_services.tiler_id and (t.profile_id = auth.uid() or public.is_admin(auth.uid())))
);

-- BOOKINGS
drop policy if exists "bookings_select_by_parties" on public.bookings;
create policy "bookings_select_by_parties" on public.bookings
for select to authenticated using (
  homeowner_id = auth.uid()
  or exists(select 1 from public.tilers t where t.id = bookings.tiler_id and t.profile_id = auth.uid())
  or public.is_admin(auth.uid())
);

drop policy if exists "bookings_insert_homeowner_only" on public.bookings;
create policy "bookings_insert_homeowner_only" on public.bookings
for insert to authenticated with check (homeowner_id = auth.uid());

drop policy if exists "bookings_update_status_rules" on public.bookings;
create policy "bookings_update_status_rules" on public.bookings
for update to authenticated using (
  -- homeowner can cancel their own booking
  (homeowner_id = auth.uid())
  or
  -- tiler can change status for their jobs
  exists(select 1 from public.tilers t where t.id = bookings.tiler_id and t.profile_id = auth.uid())
  or public.is_admin(auth.uid())
);

-- REVIEWS
drop policy if exists "reviews_select_public" on public.reviews;
create policy "reviews_select_public" on public.reviews
for select to anon, authenticated using (approved);

drop policy if exists "reviews_insert_reviewer" on public.reviews;
create policy "reviews_insert_reviewer" on public.reviews
for insert to authenticated with check (reviewer_id = auth.uid());

drop policy if exists "reviews_admin_update" on public.reviews;
create policy "reviews_admin_update" on public.reviews
for update to authenticated using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- BANNERS
drop policy if exists "banners_select_public" on public.banners;
create policy "banners_select_public" on public.banners
for select to anon, authenticated using (true);

drop policy if exists "banners_admin_cud" on public.banners;
create policy "banners_admin_cud" on public.banners
for all to authenticated using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- ESTIMATOR CONFIG
drop policy if exists "estimator_configs_select_public" on public.estimator_configs;
create policy "estimator_configs_select_public" on public.estimator_configs
for select to anon, authenticated using (true);

drop policy if exists "estimator_configs_admin_cud" on public.estimator_configs;
create policy "estimator_configs_admin_cud" on public.estimator_configs
for all to authenticated using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));
