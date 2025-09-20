<?php

namespace Database\Factories;

use App\Models\Lowongan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lowongan>
 */
class LowonganFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => fake()->jobTitle(),
            'deskripsi' => fake()->paragraphs(2, true),
            'perusahaan' => fake()->company(),
            'tanggal_post' => fake()->dateTimeBetween('-2 weeks', 'now'),
        ];
    }

    /**
     * Indicate that the job posting is for IT roles.
     */
    public function it(): static
    {
        return $this->state(fn (array $attributes) => [
            'judul' => fake()->randomElement([
                'Software Developer',
                'Web Developer',
                'System Administrator',
                'Network Engineer',
                'Database Administrator'
            ]),
            'perusahaan' => fake()->randomElement([
                'PT. Teknologi Nusantara',
                'CV. Digital Indonesia',
                'PT. Software Solutions',
                'Startup Tech Inc.'
            ]),
        ]);
    }
}