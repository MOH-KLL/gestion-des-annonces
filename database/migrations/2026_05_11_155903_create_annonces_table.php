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
        Schema::create('annonces', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('titre');
                $table->text('description');
                $table->string('quartier');
                $table->dateTime('date_action');
                $table->integer('min_participants')->default(1);
                $table->integer('max_participants');
                $table->enum('statut', ['en_attente', 'confirmee', 'terminee', 'annulee'])->default('en_attente');
                $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonces');
    }
};
