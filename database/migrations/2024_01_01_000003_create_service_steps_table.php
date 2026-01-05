<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->integer('step_number');
            $table->string('step_title');
            $table->text('step_description');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_steps');
    }
};
