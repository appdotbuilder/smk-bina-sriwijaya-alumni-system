<?php

namespace Database\Seeders;

use App\Models\Alumni;
use App\Models\Berita;
use App\Models\Kegiatan;
use App\Models\Lowongan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlumniSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin SMK Bina Sriwijaya',
            'email' => 'admin@smkbinasriwijaya.edu',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create alumni users with profiles
        User::factory()
            ->count(20)
            ->create([
                'role' => 'alumni',
                'status' => 'active',
                'email_verified_at' => now(),
            ])
            ->each(function ($user) {
                Alumni::factory()->create([
                    'id_user' => $user->id,
                    'email' => $user->email,
                ]);
            });

        // Create some pending alumni
        User::factory()
            ->count(5)
            ->create([
                'role' => 'alumni',
                'status' => 'pending',
            ])
            ->each(function ($user) {
                Alumni::factory()->create([
                    'id_user' => $user->id,
                    'email' => $user->email,
                ]);
            });

        // Create news articles
        Berita::factory()->count(10)->create();

        // Create job postings
        Lowongan::factory()->count(15)->create();
        Lowongan::factory()->it()->count(8)->create();

        // Create activities
        $activities = Kegiatan::factory()->count(8)->create();
        Kegiatan::factory()->reunion()->count(2)->create();

        // Assign some alumni to activities
        $alumni = Alumni::all();
        $activities->each(function ($activity) use ($alumni) {
            $activity->alumni()->attach(
                $alumni->random(random_int(3, 8))->pluck('id_alumni')
            );
        });
    }
}