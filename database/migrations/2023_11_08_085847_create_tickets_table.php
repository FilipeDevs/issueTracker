<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->enum('type', ['issue', 'feature', 'bug'])->default('issue');
            $table->enum('status', ['closed', 'new', 'in progress'])->default('new');
            $table->enum('priority', ['low', 'medium', 'high', 'immediate'])->default('medium');
            $table->string('author_name');
            $table->integer('time_estimate');
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('author_id');
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('author_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
