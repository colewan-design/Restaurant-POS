<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SystemConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'electric_billing_vat' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the table
        DB::table('system_config')->insert($data);
    }
}
