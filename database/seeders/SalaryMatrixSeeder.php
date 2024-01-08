<?php

namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalaryMatrixSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'salary_matrix_id' => 'SM111',
                'salary_grade' => 1, 
                'salary_step' => 1,
                'salary_amount' => 13000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'salary_matrix_id' => 'SM222',
                'salary_grade' => 2, 
                'salary_step' => 1,
                'salary_amount' => 13819.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the table
        DB::table('salary_matrix')->insert($data);
    }
}
