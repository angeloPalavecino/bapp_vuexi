<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDriversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('lastname');
            $table->string('rut')->unique();
            $table->string('direccion');
            $table->string('ciudad');
            $table->string('comuna');
            $table->integer('numeracion');
            $table->string('email');
            $table->string('clase');
            $table->boolean('dueno');
            $table->boolean('conductor');
            $table->boolean('driver_default');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('telefono');
            $table->boolean('habilitado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drivers');
    }
}
