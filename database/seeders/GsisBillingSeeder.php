<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GsisBillingSeeder  extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('gsis_billings')->insert([
            'gsis_billing_id' => 'GSISBILL' . now()->format('YmdHis'),
            'agency_number' => '123456',
            'office_assignment' => 'Sample Office',
            'employee_id' => 'EMP123',
            'bp_number' => 'BP123',
            'approval_date' => now()->format('Y-m-d'),
            'gross_loan_amount' => '100000',
            'term_start' => now()->format('Y-m-d'),
            'term_end' => now()->addMonths(12)->format('Y-m-d'),
            'loan_term_in_months' => '12',
            'first_due_month' => now()->format('Y-m'),
            'monthly_installment' => '8500',
            'remarks' => 'This is a sample remark.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
