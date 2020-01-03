<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorarioshassucursalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('horarios_has_sucursales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('horario_id');
            $table->unsignedBigInteger('sucursal_id');
            $table->timestamps();

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
        Schema::dropIfExists('horarios_has_sucursales');
    }
}
