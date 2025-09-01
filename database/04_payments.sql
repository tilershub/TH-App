
-- 04_payments.sql
create type payment_status as enum ('pending','succeeded','failed');

create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  amount numeric not null,
  currency text not null default 'LKR',
  provider text,           -- e.g. 'stripe', 'payhere', 'mock'
  provider_ref text,       -- transaction id
  status payment_status not null default 'pending',
  created_at timestamptz default now()
);

alter table public.payments enable row level security;

drop policy if exists "payments_select_by_parties" on public.payments;
create policy "payments_select_by_parties" on public.payments
for select to authenticated using (
  public.is_admin(auth.uid()) OR
  exists (select 1 from public.bookings b where b.id = payments.booking_id and (
    b.homeowner_id = auth.uid() OR
    exists (select 1 from public.tilers t where t.id = b.tiler_id and t.profile_id = auth.uid())
  ))
);

drop policy if exists "payments_insert_homeowner" on public.payments;
create policy "payments_insert_homeowner" on public.payments
for insert to authenticated with check (
  exists (select 1 from public.bookings b where b.id = booking_id and b.homeowner_id = auth.uid())
);

drop policy if exists "payments_update_admin" on public.payments;
create policy "payments_update_admin" on public.payments
for update to authenticated using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));
