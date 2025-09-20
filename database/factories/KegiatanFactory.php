<?php

namespace Database\Factories;

use App\Models\Kegiatan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kegiatan>
 */
class KegiatanFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_kegiatan' => fake()->randomElement([
                'Reuni Alumni',
                'Seminar Karir',
                'Workshop Teknologi',
                'Bakti Sosial',
                'Pelatihan Kewirausahaan',
                'Temu Alumni',
                'Job Fair',
                'Kelas Inspirasi'
            ]),
            'deskripsi' => fake()->paragraphs(2, true),
            'tanggal' => fake()->dateTimeBetween('now', '+3 months'),
        ];
    }

    /**
     * Indicate that the activity is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'tanggal' => fake()->dateTimeBetween('+1 week', '+2 months'),
        ]);
    }

    /**
     * Indicate that the activity is a reunion event.
     */
    public function reunion(): static
    {
        return $this->state(fn (array $attributes) => [
            'nama_kegiatan' => 'Reuni Alumni ' . fake()->numberBetween(2010, 2024),
            'deskripsi' => 'Acara reuni untuk mempererat tali silaturahmi antar alumni.',
        ]);
    }
}