<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('validations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_category_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('validator_id')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected']);
            $table->text('work_experience')->nullable();
            $table->text('job_position')->nullable();
            $table->text('reason_accepted')->nullable();
            $table->text('validator_notes')->nullable();

            $table->foreign('job_category_id')->references('id')->on('job_categories')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('validator_id')->references('id')->on('validators')->onDelete('set null');
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        Schema::dropIfExists('validations');
    }
};
