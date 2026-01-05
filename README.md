# Sistem Informasi Alur SOP Perjalanan Dinas Komisi II DPRD Kabupaten Sumbawa

Portal informasi publik yang menampilkan alur SOP perjalanan dinas Komisi II DPRD Kabupaten Sumbawa. Website ini bersifat informatif dengan panel admin untuk mengelola konten.

## 📋 Deskripsi

Aplikasi ini dibangun untuk memberikan informasi kepada publik mengenai:
- Alur SOP perjalanan dinas Komisi II
- Galeri kegiatan
- Informasi kontak kantor
- Arsip laporan (khusus admin)

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Backend | Laravel 11 |
| Frontend | React + Inertia.js |
| Styling | Tailwind CSS |
| Database | MySQL |
| Icons | Lucide React |

## 📁 Struktur Direktori

```
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── Admin/
│   │       │   ├── ArchiveController.php
│   │       │   ├── BannerController.php
│   │       │   ├── DashboardController.php
│   │       │   ├── GalleryController.php
│   │       │   ├── OfficeInfoController.php
│   │       │   └── ServiceController.php
│   │       ├── ContactController.php
│   │       ├── GalleryController.php
│   │       ├── HomeController.php
│   │       └── ServiceController.php
│   └── Models/
│       ├── Archive.php
│       ├── Banner.php
│       ├── Gallery.php
│       ├── OfficeInfo.php
│       ├── Service.php
│       └── User.php
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   └── js/
│       ├── Components/
│       │   ├── BannerSlider.jsx
│       │   ├── ConfirmModal.jsx
│       │   ├── ContactInfo.jsx
│       │   ├── GalleryGrid.jsx
│       │   └── ServiceCard.jsx
│       ├── Layouts/
│       │   ├── AdminLayout.jsx
│       │   └── PublicLayout.jsx
│       └── Pages/
│           ├── Admin/
│           │   ├── Archives/
│           │   ├── Banners/
│           │   ├── Gallery/
│           │   ├── OfficeInfo/
│           │   ├── Services/
│           │   └── Dashboard.jsx
│           ├── Auth/
│           ├── Contact/
│           ├── Gallery/
│           ├── Services/
│           └── Home.jsx
├── routes/
│   └── web.php
└── public/
    └── logo/
        └── logo.jpeg
```

## 🗄️ Database Design

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id              │
│ name            │
│ email           │
│ password        │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│    services     │
├─────────────────┤
│ id              │
│ name            │
│ slug            │
│ description     │
│ icon            │
│ order           │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│    banners      │
├─────────────────┤
│ id              │
│ title           │
│ subtitle        │
│ image_path      │
│ link            │
│ order           │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│   galleries     │
├─────────────────┤
│ id              │
│ title           │
│ image_path      │
│ description     │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│    archives     │
├─────────────────┤
│ id              │
│ title           │
│ description     │
│ file_path       │
│ file_name       │
│ file_type       │
│ file_size       │
│ report_date     │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│  office_info    │
├─────────────────┤
│ id              │
│ office_name     │
│ address         │
│ phone           │
│ email           │
│ working_hours   │
│ maps_embed      │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

### Tabel Database

| Tabel | Deskripsi |
|-------|-----------|
| `users` | Data admin untuk login |
| `services` | Alur SOP perjalanan dinas |
| `banners` | Banner/slider di landing page |
| `galleries` | Foto galeri kegiatan |
| `archives` | Arsip laporan (PDF/Word) |
| `office_info` | Informasi kantor |

## 🔄 Alur Aplikasi

### Flowchart Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                        PENGGUNA                              │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│    PUBLIC (Tanpa Login) │     │    ADMIN (Perlu Login)  │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│ • Beranda (Banner)      │     │ • Dashboard             │
│ • Alur SOP              │     │ • Kelola Banner         │
│ • Galeri                │     │ • Kelola Alur SOP       │
│ • Kontak                │     │ • Kelola Arsip Laporan  │
└─────────────────────────┘     │ • Kelola Galeri         │
                                │ • Kelola Info Kantor    │
                                └─────────────────────────┘
```

### Use Case Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         SISTEM                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │   ┌──────────────┐        ┌──────────────┐          │    │
│  │   │ Lihat Banner │        │ Kelola Banner│          │    │
│  │   └──────────────┘        └──────────────┘          │    │
│  │          │                       │                   │    │
│  │   ┌──────────────┐        ┌──────────────┐          │    │
│  │   │ Lihat Alur   │        │ Kelola Alur  │          │    │
│  │   │    SOP       │        │    SOP       │          │    │
│  │   └──────────────┘        └──────────────┘          │    │
│  │          │                       │                   │    │
│  │   ┌──────────────┐        ┌──────────────┐          │    │
│  │   │ Lihat Galeri │        │ Kelola Galeri│          │    │
│  │   └──────────────┘        └──────────────┘          │    │
│  │          │                       │                   │    │
│  │   ┌──────────────┐        ┌──────────────┐          │    │
│  │   │ Lihat Kontak │        │ Kelola Arsip │          │    │
│  │   └──────────────┘        └──────────────┘          │    │
│  │          │                       │                   │    │
│  │          │                ┌──────────────┐          │    │
│  │          │                │ Kelola Info  │          │    │
│  │          │                │   Kantor     │          │    │
│  │          │                └──────────────┘          │    │
│  └──────────┼───────────────────────┼──────────────────┘    │
│             │                       │                        │
└─────────────┼───────────────────────┼────────────────────────┘
              │                       │
              ▼                       ▼
        ┌──────────┐           ┌──────────┐
        │  PUBLIC  │           │  ADMIN   │
        └──────────┘           └──────────┘
```

## 🚀 Instalasi

### Prasyarat

- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL/MariaDB
- Git

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd surat-dprd
   ```

2. **Install Dependencies PHP**
   ```bash
   composer install
   ```

3. **Install Dependencies Node.js**
   ```bash
   npm install
   ```

4. **Konfigurasi Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Konfigurasi Database**
   
   Edit file `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=dprd_sumbawa
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **Jalankan Migrasi & Seeder**
   ```bash
   php artisan migrate --seed
   ```

7. **Buat Storage Link**
   ```bash
   php artisan storage:link
   ```

8. **Build Assets**
   ```bash
   npm run build
   ```

9. **Jalankan Server**
   ```bash
   php artisan serve
   ```

10. **Akses Aplikasi**
    - Public: `http://localhost:8000`
    - Admin: `http://localhost:8000/login`

### Kredensial Default Admin

| Field | Value |
|-------|-------|
| Email | `admin@dprd.sumbawakab.go.id` |
| Password | `password` |

## 📍 Routing

### Public Routes

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/` | Halaman Beranda |
| GET | `/layanan` | Daftar Alur SOP |
| GET | `/layanan/{slug}` | Detail Alur SOP |
| GET | `/galeri` | Galeri Kegiatan |
| GET | `/kontak` | Informasi Kontak |

### Admin Routes (Perlu Login)

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/admin/dashboard` | Dashboard Admin |
| GET/POST | `/admin/banners` | CRUD Banner |
| GET/POST | `/admin/services` | CRUD Alur SOP |
| GET/POST | `/admin/archives` | CRUD Arsip Laporan |
| GET/POST | `/admin/gallery` | CRUD Galeri |
| GET/PUT | `/admin/office-info` | Edit Info Kantor |

## 📱 Fitur

### Public

- ✅ Banner Slider dengan auto-play
- ✅ Informasi jam operasional, alamat, kontak
- ✅ Daftar 8 Alur SOP Perjalanan Dinas
- ✅ Detail setiap alur SOP
- ✅ Galeri foto kegiatan
- ✅ Halaman kontak
- ✅ Responsive design

### Admin Panel

- ✅ Dashboard dengan statistik
- ✅ CRUD Banner (gambar slider)
- ✅ CRUD Alur SOP
- ✅ CRUD Arsip Laporan (PDF/Word)
- ✅ CRUD Galeri Foto
- ✅ Edit Informasi Kantor
- ✅ Konfirmasi hapus dengan modal
- ✅ Validasi form dengan error messages

## 📊 Alur SOP Perjalanan Dinas

1. **Perencanaan Kegiatan** - Diskusi dan penentuan agenda
2. **Pengajuan Usulan** - Usulan resmi ke pimpinan DPRD
3. **Verifikasi Administrasi** - Pemeriksaan kelengkapan dokumen
4. **Persetujuan Pimpinan** - Persetujuan/penolakan dari pimpinan
5. **Penerbitan Surat Tugas & SPPD** - Penerbitan dokumen resmi
6. **Pelaksanaan Perjalanan Dinas** - Pelaksanaan kegiatan
7. **Laporan & Pertanggungjawaban** - Laporan hasil dan SPJ
8. **Arsip** - Penyimpanan dokumen

## 🔧 Development

### Menjalankan Development Server

```bash
# Terminal 1 - Laravel
php artisan serve

# Terminal 2 - Vite (Hot Reload)
npm run dev
```

### Build untuk Production

```bash
npm run build
```

## 📝 Informasi Kantor

| Item | Detail |
|------|--------|
| Nama | Sekretariat DPRD Kabupaten Sumbawa |
| Alamat | Jl. Lintas Sumbawa-Bima Km.5 Boak, Unter Iwes, Kab Sumbawa |
| Telepon | (0371) 2020020, 2020021 |
| Email | dprd@sumbawakab.go.id |
| Jam Operasional | Senin-Kamis: 08.00-14.00 WITA, Jumat: 08.00-16.00 WITA |

## 📄 Lisensi

Hak Cipta © 2026 DPRD Kabupaten Sumbawa. All rights reserved.
