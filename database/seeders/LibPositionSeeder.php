<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LibPositionSeeder extends Seeder
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
                'project_id' => 'PRO1111',
                'position_id' => 'POS1111',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'position_name' => 'Professor II',
                'project_id' => 'PRO222',
                'position_id' => 'POS222',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample data as needed
            
        ];

        // Insert data into the table
        DB::table('lib_positions')->insert($data);
    }
}
