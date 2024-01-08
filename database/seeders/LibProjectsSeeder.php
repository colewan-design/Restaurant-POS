<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LibProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'project_name' => 'GAA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Higher Education',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample data as needed
            
        ];

        // Insert data into the table
        DB::table('lib_projects')->insert($data);
    }
}
