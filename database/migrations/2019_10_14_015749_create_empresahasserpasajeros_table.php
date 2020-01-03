<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmpresahasserpasajerosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas_has_serv_psjs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('empresa_id');
            $table->unsignedBigInteger('serv_psj_id');
            $table->timestamps();

            $table->foreign('empresa_id')
            ->references('id')
            ->on('empresas');
            //->onDelete('cascade');

            $table->foreign('serv_psj_id')
            ->references('id')
            ->on('servicios_pasajeros')
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
        Schema::dropIfExists('empresas_has_serv_psjs');
    }
}
