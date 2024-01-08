<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionLibSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'position_name' => 'Professor I',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'position_name' => 'Professor II',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample data as needed
            
        ];

        // Insert data into the table
        DB::table('positions_lib')->insert($data);
    }
}
