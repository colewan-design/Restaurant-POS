<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DisallowanceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'name' => 'COA',
                'disallowance_category_id' => 'DC1111',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'COB',
                'disallowance_category_id' => 'DC222',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample data as needed
            
        ];

        // Insert data into the table
        DB::table('disallowance_categories')->insert($data);
    }
}
