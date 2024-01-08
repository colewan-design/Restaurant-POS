<?php

namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MandatoryDeductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'mandatory_deduction_name' => 'Social Security Contribution',
                'mandatory_value' => '5%', 
                'mandatory_type' => 'Percentage',
                'description' => 'Mandatory deduction for social security contribution',
                'active' => true,
            ],
            [
                'mandatory_deduction_name' => 'Income Tax',
                'mandatory_value' => '10%', 
                'mandatory_type' => 'Percentage',
                'description' => 'Mandatory deduction for income tax',
                'active' => true,
            ],
        ];

        // Insert data into the table
        DB::table('mandatory_deductions')->insert($data);
    }
}
