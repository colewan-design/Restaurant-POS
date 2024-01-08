<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DisallowancesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('disallowances')->insert([
            'employee_id' => 1,
            'disallowance_id' => 1,
            'total_disallowances' => 100.00,
            'total_payments' => 50.00,
            'total_balance' => 50.00,
            'amount_due' => 30.00,
            'payroll_period' => '2023-11',
            'remarks' => 'Sample remarks text.',
            'prepared_by' => 'John Doe',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
