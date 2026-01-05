<?php

namespace Database\Seeders;

use App\Models\OfficeInfo;
use Illuminate\Database\Seeder;

class OfficeInfoSeeder extends Seeder
{
    public function run(): void
    {
        OfficeInfo::create([
            'office_name' => 'Sekretariat DPRD Kabupaten Sumbawa',
            'address' => 'Jl. Lintas Sumbawa-Bima Km.5 Boak, Unter Iwes, Kabupaten Sumbawa, Nusa Tenggara Barat',
            'phone' => '(0371) 2020020, 2020021',
            'email' => 'dprd@sumbawakab.go.id',
            'working_hours' => "Senin - Kamis: 08.00 - 14.00 WITA\nJumat: 08.00 - 16.00 WITA\nSabtu - Minggu: Libur",
            'maps_embed' => '',
        ]);
    }
}
