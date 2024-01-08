<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BsumpcBillingSeeder  extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('bsumpc_billings')->insert([
            'bsumpc_billing_id' => 'BSUMPCBILL' . now()->format('YmdHis'),
            'employee_id' => 'your_employee_id_value',
            'loan_granted' => 'your_loan_granted_value',
            'loan_type' => 'your_loan_type_value',
            'principal_balance' => 'your_principal_balance_value',
            'principal_due' => 'your_principal_due_value',
            'interest_due' => 'your_interest_due_value',
            'total_deductions' => 'your_total_deductions_value',
            'payroll_period' => 'your_payroll_period_value',
            'bsu_remarks' => 'your_bsu_remarks_value',
            'remarks' => 'your_remarks_value',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
