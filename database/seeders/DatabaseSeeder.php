<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeesLib;
use App\Models\GsisBilling;
use App\Models\SystemConfig;
use App\Models\SystemTheme;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PermissionTableSeeder::class);
        $this->call(CreateAdminUserSeeder::class);
        $this->call(SystemConfigSeeder::class);
        $this->call(SystemThemeSeeder::class);
        // EmployeesLib::factory()->count(1000)->create();
        // GsisBilling::factory()->count(100000)->create();
        

    }
}
