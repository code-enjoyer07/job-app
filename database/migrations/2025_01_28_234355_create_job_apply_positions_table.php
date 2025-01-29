<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('job_apply_positions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('job_vacancy_id')->nullable();
            $table->unsignedBigInteger('job_apply_users_id')->nullable();
            $table->unsignedBigInteger('position_id')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected']);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('job_vacancy_id')->references('id')->on('job_vacancies')->onDelete('set null');
            $table->foreign('position_id')->references('id')->on('available_positions')->onDelete('set null');
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        Schema::dropIfExists('job_apply_positions');
    }
};
