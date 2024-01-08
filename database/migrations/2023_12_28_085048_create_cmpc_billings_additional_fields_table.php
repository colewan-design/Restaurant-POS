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
        Schema::table('cmpc_billings', function (Blueprint $table) {
            $table->float('loan_granted')->nullable();
            $table->float('loan_balance')->nullable();
            $table->float('annuity_amortization')->nullable();
            $table->float('total_deduction')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
    }
};
