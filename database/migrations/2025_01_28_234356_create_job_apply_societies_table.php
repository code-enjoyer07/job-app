<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_apply_societies', function (Blueprint $table) {
            $table->id();
            $table->text('notes')->nullable();
            $table->date('date');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('job_vacancy_id')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('job_vacancy_id')->references('id')->on('job_vacancies')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_apply_societies');
    }
};
