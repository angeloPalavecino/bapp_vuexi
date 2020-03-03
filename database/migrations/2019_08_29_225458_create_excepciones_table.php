<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExcepcionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('excepciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('sucursal_id');
            $table->string('rut')->unique();
            $table->string('direccion');
            $table->string('comuna');
            $table->decimal('lat', 10 , 5);
            $table->decimal('lng', 10 , 5);
            $table->timestamps();


            $table->foreign('sucursal_id')
            ->references('id')->on('sucursals')
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
        Schema::dropIfExists('excepciones');
    }
}
