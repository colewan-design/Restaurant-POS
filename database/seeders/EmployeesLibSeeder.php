<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeesLibSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'employee_name' => 'John Doe',
                'email_address' => 'john@example.com',
                'salary_grade' => 'A',
                'step' => 1,
                'position' => 'Manager',
                'place_of_assignment' => 'Head Office',
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'employee_name' => 'Jane Smith',
                'email_address' => 'jane@example.com',
                'salary_grade' => 'B',
                'step' => 2,
                'position' => 'Supervisor',
                'place_of_assignment' => 'Branch Office',
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample data as needed
            
        ];

        // Insert data into the table
        DB::table('employees_lib')->insert($data);
    }
}
