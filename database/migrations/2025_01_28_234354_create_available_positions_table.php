<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('available_positions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_vacancy_id');
            $table->string('position', 255)->nullable()->default('DEFAULT NULL');
            $table->bigInteger('capacity')->nullable()->default(1);
            $table->bigInteger('apply_capacity')->nullable()->default(1);

            $table->foreign('job_vacancy_id')->references('id')->on('job_vacancies')->onDelete('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        Schema::dropIfExists('available_positions');
    }
};
