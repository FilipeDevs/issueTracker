<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3, true),
            'description' => fake()->paragraph(2, true),
            'type' => fake()->randomElement(['issue', 'feature', 'bug']),
            'status' => fake()->randomElement(['closed', 'new', 'in progress']),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'immediate']),
            'time_estimate' => fake()->numberBetween(1, 48),
        ];
    }
}
