<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SystemThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'theme' => 'light',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the table
        DB::table('system_theme')->insert($data);
    }
}
