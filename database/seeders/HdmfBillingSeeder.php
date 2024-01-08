<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HdmfBillingSeeder  extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('hdmf_billings')->insert([
            'hdmf_billing_id' => 'HDMFBILL' . now()->format('YmdHis'),
            'employee_id' => 'your_employee_id_value',
            'dvdate' => 'your_dvdate_value',
            'scheme_desc' => 'your_scheme_desc_value',
            'loan_granted' => 'your_loan_granted_value',
            'monthly_amortization' => 'your_monthly_amortization_value',
            'start_term' => 'your_start_term_value',
            'end_term' => 'your_end_term_value',
            'remarks' => 'your_remarks_value',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
