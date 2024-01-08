<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\EmployeesLib;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class EmployeesLibFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'employee_id' => $this->faker->unique()->numberBetween(100000, 999999),
            'gsis_bp_number' => $this->faker->unique()->numberBetween(100000, 999999),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->LastName,
            'middle_name' => $this->faker->firstName,
            'email_address' => $this->faker->unique()->safeEmail,
            'salary_grade' => $this->faker->numberBetween(1, 10), // Adjust range as needed
            'step' => $this->faker->numberBetween(1, 5), // Adjust range as needed
            'position' => $this->faker->jobTitle,
            'place_of_assignment' => $this->faker->city,
            'status' => $this->faker->randomElement(['Active', 'Inactive']), // Define status options
            // Add or modify fields and their respective fake data as required
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
