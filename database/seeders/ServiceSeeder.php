<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Perencanaan Kegiatan',
                'slug' => 'perencanaan-kegiatan',
                'description' => 'Pimpinan dan anggota Komisi II melakukan diskusi dan penentuan agenda konsultasi atau kunjungan kerja yang sesuai dengan program kerja Komisi II.

Agenda disusun berdasarkan prioritas dan kebutuhan komisi.',
                'icon' => 'FileText',
                'order' => 1,
            ],
            [
                'name' => 'Pengajuan Usulan',
                'slug' => 'pengajuan-usulan',
                'description' => 'Komisi II mengajukan usulan resmi kepada pimpinan DPRD melalui Sekretariat.

Usulan mencakup tujuan, waktu, dan agenda kegiatan perjalanan dinas.',
                'icon' => 'FileText',
                'order' => 2,
            ],
            [
                'name' => 'Verifikasi Administrasi',
                'slug' => 'verifikasi-administrasi',
                'description' => 'Sekretariat memeriksa kelengkapan dokumen (surat, anggaran, administrasi, lokasi, transportasi dll.).

Memastikan kesesuaian anggaran dengan alokasi yang tersedia.',
                'icon' => 'Search',
                'order' => 3,
            ],
            [
                'name' => 'Persetujuan Pimpinan',
                'slug' => 'persetujuan-pimpinan',
                'description' => 'Pimpinan DPRD memberikan persetujuan atau penolakan berdasarkan usulan dari sekretariat DPRD.

Jika disetujui, proses lanjut ke penerbitan dokumen.',
                'icon' => 'Shield',
                'order' => 4,
            ],
            [
                'name' => 'Penerbitan Surat Tugas & SPPD',
                'slug' => 'penerbitan-surat-tugas-sppd',
                'description' => 'Dokumen resmi perjalanan dinas (Surat Tugas dan SPPD) diterbitkan.

Dokumen ini sebagai legitimasi pelaksanaan kegiatan.',
                'icon' => 'FileCheck',
                'order' => 5,
            ],
            [
                'name' => 'Pelaksanaan Perjalanan Dinas',
                'slug' => 'pelaksanaan-perjalanan-dinas',
                'description' => 'Kegiatan konsultasi atau kunjungan kerja dilaksanakan sesuai agenda yang telah ditentukan.

Pimpinan dan anggota Komisi II memastikan semua kegiatan terdokumentasi dengan baik untuk hasil akhir laporan kuker.',
                'icon' => 'MapPin',
                'order' => 6,
            ],
            [
                'name' => 'Laporan & Pertanggungjawaban',
                'slug' => 'laporan-pertanggungjawaban',
                'description' => 'Setelah perjalanan dinas selesai, lalu Pimpinan dan anggota Komisi II kembali, dibuat laporan hasil dan pertanggungjawaban keuangan (SPJ).

Laporan kuker diserahkan ke Sekretariat untuk diproses apakah sudah sesuai dengan rencana awal perjalanan dinas.',
                'icon' => 'FileText',
                'order' => 7,
            ],
            [
                'name' => 'Arsip',
                'slug' => 'arsip',
                'description' => 'Semua dokumen (surat, laporan kerja, SPJ) disimpan sebagai arsip resmi di Komisi II.

Arsip digunakan sebagai referensi dan dokumentasi untuk kegiatan.',
                'icon' => 'Database',
                'order' => 8,
            ],
        ];

        foreach ($services as $serviceData) {
            Service::create([
                'name' => $serviceData['name'],
                'slug' => $serviceData['slug'],
                'description' => $serviceData['description'],
                'icon' => $serviceData['icon'],
                'order' => $serviceData['order'],
                'is_active' => true,
            ]);
        }
    }
}
