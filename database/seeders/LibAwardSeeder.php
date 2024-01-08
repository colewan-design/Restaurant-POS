<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LibAwardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'award_id' => 'A1111',
                'award_name' => 'Outstanding Student Services Provider',
                'incentives' => '100.00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'award_id' => 'Loyalty Service Awards',
                'award_name' => 'Plaque of Recognition',
                'incentives' => '100.00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample data as needed
            
        ];

        // Insert data into the table
        DB::table('lib_awards')->insert($data);
    }
}
