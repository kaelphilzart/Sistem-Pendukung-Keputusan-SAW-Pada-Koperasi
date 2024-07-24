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
        Schema::create('pinjam', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->integer('id_kriteria1');
            $table->integer('id_kriteria2');
            $table->integer('id_kriteria3');
            $table->integer('id_kriteria4');
            $table->integer('id_kriteria5');
            $table->double('jumlah');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjam');
    }
};
