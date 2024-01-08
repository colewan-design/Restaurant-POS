<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GsisLoanSeeder  extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('gsis_loans')->insert([
            'bpno' => '123456789',
            'gsis_loans_id' => 'DEF123',
            'employee_id' => 'ABC123',
            'loan_type' => 'CPL',
            'amount' => '100',
            'remarks' => 'This is a sample remark.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
