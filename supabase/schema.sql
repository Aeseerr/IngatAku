-- Supabase SQL untuk aplikasi IngatAku
-- Jalankan di Supabase Dashboard > SQL Editor > New query > Run

create extension if not exists "pgcrypto";

create table if not exists public.kegiatan (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  jenis text not null default 'Pekerjaan',
  tenggat_waktu int4 not null default 0,
  dampak_nilai text not null default 'Sedang',
  ketergantungan_tim text not null default 'Tidak',
  konsekuensi_telat text not null default 'Sedang',
  beban_sks int4 not null default 0,
  score float8 not null default 0,
  priority_level text not null default 'Rendah',
  status text not null default 'Belum',
  is_read bool not null default false,
  created_at timestamp with time zone not null default now()
);


-- Aman dijalankan ulang untuk project yang tabelnya sudah pernah dibuat
alter table public.kegiatan alter column beban_sks set default 0;
alter table public.kegiatan alter column tenggat_waktu set default 0;
alter table public.kegiatan alter column priority_level set default 'Rendah';

alter table public.kegiatan enable row level security;

drop policy if exists "Users can read own kegiatan" on public.kegiatan;
create policy "Users can read own kegiatan"
on public.kegiatan for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own kegiatan" on public.kegiatan;
create policy "Users can insert own kegiatan"
on public.kegiatan for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own kegiatan" on public.kegiatan;
create policy "Users can update own kegiatan"
on public.kegiatan for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own kegiatan" on public.kegiatan;
create policy "Users can delete own kegiatan"
on public.kegiatan for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists kegiatan_user_id_created_at_idx
on public.kegiatan (user_id, created_at desc);
