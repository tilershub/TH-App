
-- 03_seed.sql
-- NOTE: Replace the UUIDs as needed or let defaults generate.

-- Create an admin profile linked to an existing auth user (set the UUID accordingly)
-- insert into auth.users(id, email) values ('00000000-0000-0000-0000-000000000001','admin@example.com'); -- handled by Supabase auth
insert into public.profiles (id, role, full_name, phone, city)
values ('00000000-0000-0000-0000-000000000001','admin','TILERSHUB Admin','0774503744','Colombo')
on conflict (id) do update set role=excluded.role;

-- Services
insert into public.services (id, name, slug, description) values
  (uuid_generate_v4(),'Bathroom Tiling','bathroom-tiling','Professional bathroom tiling'),
  (uuid_generate_v4(),'Floor Tiling','floor-tiling','Floor tiling for living/rooms'),
  (uuid_generate_v4(),'Mosaic','mosaic','Decorative mosaic installation')
on conflict do nothing;

-- Estimator config
insert into public.estimator_configs (id, wastage_default, labor_floor_min, labor_floor_max, labor_skirting_min, labor_skirting_max)
values (uuid_generate_v4(), 0.08, 200, 300, 100, 160)
on conflict do nothing;

-- Banners
insert into public.banners (id, title, image_url, cta_label, cta_url, priority) values
(uuid_generate_v4(),'Find a Certified Tiler','https://placehold.co/1200x400','Browse Tilers','https://tilershub.lk',1);
