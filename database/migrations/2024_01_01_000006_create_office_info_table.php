<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('office_info', function (Blueprint $table) {
            $table->id();
            $table->string('office_name')->default('Kantor Pertanahan Kabupaten Sumbawa');
            $table->text('address');
            $table->string('phone');
            $table->string('email');
            $table->text('working_hours');
            $table->text('maps_embed')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('office_info');
    }
};
