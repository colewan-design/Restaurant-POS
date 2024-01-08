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
        Schema::create('coa_disallowances', function (Blueprint $table) {
            $table->id();
            $table->string('coa_disallowance_id');
            $table->float('nd_no_17_002_05_16')->nullable();
            $table->float('nd_no_17_003_05_16')->nullable();
            $table->float('nd_no_16_004_05_16')->nullable();
            $table->float('nd_no_21_018_05_13')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coa_disallowances');
    }
};
