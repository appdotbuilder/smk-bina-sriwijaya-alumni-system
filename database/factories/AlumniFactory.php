<?php

namespace Database\Factories;

use App\Models\Alumni;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alumni>
 */
class AlumniFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_user' => User::factory(),
            'nama' => fake()->name(),
            'angkatan' => fake()->numberBetween(2010, 2024),
            'jurusan' => fake()->randomElement([
                'Teknik Komputer dan Jaringan',
                'Akuntansi',
                'Administrasi Perkantoran',
                'Pemasaran',
                'Multimedia',
                'Rekayasa Perangkat Lunak'
            ]),
            'email' => fake()->unique()->safeEmail(),
            'no_hp' => fake()->phoneNumber(),
            'pekerjaan' => fake()->jobTitle(),
            'alamat' => fake()->address(),
        ];
    }

    /**
     * Indicate that the alumni is from a specific graduation year.
     */
    public function angkatan(int $year): static
    {
        return $this->state(fn (array $attributes) => [
            'angkatan' => $year,
        ]);
    }

    /**
     * Indicate that the alumni is from TKJ major.
     */
    public function tkj(): static
    {
        return $this->state(fn (array $attributes) => [
            'jurusan' => 'Teknik Komputer dan Jaringan',
        ]);
    }
}