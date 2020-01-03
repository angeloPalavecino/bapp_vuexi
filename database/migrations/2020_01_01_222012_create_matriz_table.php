<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatrizTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matrizs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('grupopatrones_id');
            $table->unsignedBigInteger('horario_id');
            $table->unsignedBigInteger('car_id');
            $table->unsignedBigInteger('sucursal_id');
            $table->timestamps();

            $table->foreign('grupopatrones_id')
            ->references('id')
            ->on('grupo_patrons')
            ->onDelete('cascade');

            $table->foreign('car_id')
            ->references('id')
            ->on('cars')
            ->onDelete('cascade');

            $table->foreign('horario_id')
            ->references('id')
            ->on('horarios')
            ->onDelete('cascade');

            $table->foreign('sucursal_id')
            ->references('id')
            ->on('sucursals')
            ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matrizs');
    }
}
