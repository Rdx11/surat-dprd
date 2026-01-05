<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@dprd.sumbawakab.go.id',
            'password' => bcrypt('password'),
        ]);

        // Run other seeders
        $this->call([
            ServiceSeeder::class,
            OfficeInfoSeeder::class,
        ]);
    }
}
