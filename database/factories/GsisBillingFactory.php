<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\GsisBilling;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class GsisBillingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'gsis_billing_id' => $this->faker->unique()->uuid,
            'agency_number' => $this->faker->unique()->randomNumber(),
            'office_assignment' => $this->faker->word,
            'employee_id' => $this->faker->unique()->randomNumber(),
            'bp_number' => $this->faker->unique()->randomNumber(),
            'approval_date' => $this->faker->date,
            'gross_loan_amount' => $this->faker->randomFloat(2, 1000, 10000),
            'term_start' => $this->faker->date,
            'term_end' => $this->faker->date,
            'loan_term_in_months' => $this->faker->numberBetween(6, 120),
            'first_due_month' => $this->faker->date,
            'monthly_installment' => $this->faker->randomFloat(2, 100, 1000),
            'loan_type' => $this->faker->randomElement(['Personal', 'Housing', 'Car']),
            'agency_name' => $this->faker->company,
            // 'period' => $this->faker->randomElement(['Monthly', 'Quarterly', 'Yearly']),
            'remarks' => $this->faker->text,
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
