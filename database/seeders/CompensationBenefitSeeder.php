<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompensationBenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'title' => 'Midyear Bonus',
                'details' => '1 month salary given not earlier than May 15',
                'cabid' => 'CAB111',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Year-End Bonus',
                'details' => 'Equivalent to 1 month salary + cash gift',
                'cabid' => 'CAB222',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample data as needed
            
        ];

        // Insert data into the table
        DB::table('compensations_and_benefits')->insert($data);
    }
}
