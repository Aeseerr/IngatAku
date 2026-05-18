# IngatAku App

Aplikasi produktivitas React + Supabase untuk mencatat kegiatan, menghitung prioritas otomatis, menampilkan notifikasi, dan analitik.

## Setup lokal

1. Install dependency:

```bash
npm install
```

2. Buat file `.env.local` dari `.env.example`:

```bash
cp .env.example .env.local
```

3. Isi value Supabase:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Jalankan SQL di `supabase/schema.sql` melalui Supabase Dashboard > SQL Editor.

5. Jalankan aplikasi:

```bash
npm run dev
```

## Deploy ke Vercel / Netlify

Tambahkan environment variables berikut di dashboard hosting:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

## Perbaikan utama

- Routing login, register, protected routes, dan redirect sudah dirapikan.
- Login dan register sudah tersambung ke Supabase Auth.
- CRUD kegiatan sudah memakai Supabase table `kegiatan` dengan return data `.select().single()`.
- Notifikasi sekarang muncul untuk kegiatan prioritas tinggi atau deadline maksimal 2 hari, selama status belum `Selesai` dan `is_read` masih `false`.
- Tandai dibaca dan tandai semua dibaca tidak lagi reload halaman, tetapi update state lokal.
- Toggle status kegiatan sudah update database dan state lokal dengan benar.
- Konfigurasi Supabase dipindahkan ke environment variable agar aman untuk deploy.
- Ditambahkan SQL schema + RLS policy agar user hanya bisa mengakses datanya sendiri.
- Build production sudah dites dan berhasil.
