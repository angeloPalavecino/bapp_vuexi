<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodificacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('codificaciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('sucursal_id');
            $table->unsignedBigInteger('grupo_patron_id')->nullable();
            $table->string('rut')->unique();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('direccion');
            $table->string('comuna');
            $table->string('email')->nullable();
            $table->string('telefono')->nullable();
            $table->string('centro_costo')->nullable();
            $table->decimal('lat',10,5)->nullable();
            $table->decimal('lng',10,5)->nullable();
            $table->decimal('distancia',9,2);
            $table->boolean('habilitado');
            $table->timestamps();

            $table->foreign('sucursal_id')
            ->references('id')
            ->on('sucursals')
            ->onDelete('cascade');

            $table->foreign('grupo_patron_id')
            ->references('id')
            ->on('grupo_patrons')
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
        Schema::dropIfExists('codificaciones');
    }
}
