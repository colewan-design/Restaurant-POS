<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coa_billings', function (Blueprint $table) {
            $table->id();
            $table->string('coa_billing_id');
            $table->string('employee_name');
            $table->string('employee_id');
            $table->float('total_disallowances')->nullable();
            $table->float('total_payments')->nullable();
            $table->float('total_balance')->nullable();
            $table->float('amount_due')->nullable();
            $table->date('payroll_period')->nullable();
            $table->string('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coa_billings');
    }
};
