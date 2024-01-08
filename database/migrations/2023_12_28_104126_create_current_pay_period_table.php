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
        Schema::create('current_pay_period', function (Blueprint $table) {
            $table->id();
            $table->date('first_half_start')->nullable();
            $table->date('first_half_end')->nullable();
            $table->date('second_half_start')->nullable();
            $table->date('second_half_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('current_pay_period');
    }
};