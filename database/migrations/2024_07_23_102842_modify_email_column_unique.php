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
        // Check if the index exists before dropping it
        if (Schema::hasIndex('users', 'users_email_index')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropIndex('users_email_index');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreate the index if needed
        Schema::table('users', function (Blueprint $table) {
            $table->index('email', 'users_email_index');
        });
    }
};
