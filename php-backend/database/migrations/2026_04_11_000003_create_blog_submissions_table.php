<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('blog_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->text('summary');
            $table->string('submitted_by_ip', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->foreignId('approved_post_id')->nullable()->constrained('blog_posts');
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_submissions');
    }
};
