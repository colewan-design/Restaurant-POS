<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HdmfLoanSeeder  extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('hdmf_loans')->insert([
            'pag_ibig_id_rtn' => '123456789',
            'application_agreement_number' => 'ABC123',
            'employee_name' => 'John Doe',
            'loan_type' => 'Home Loan',
            'post_code' => '12345',
            'amount' => '500000',
            'remarks' => 'This is a sample remark.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
