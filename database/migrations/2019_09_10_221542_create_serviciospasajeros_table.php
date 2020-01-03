<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiciospasajerosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servicios_pasajeros', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('num_psj_min');
            $table->integer('num_psj_max');
            $table->decimal('fac_rang_min', 9, 2);
            $table->decimal('fac_rang_max', 9, 2);
            $table->decimal('valor', 9, 2);
            $table->decimal('fac_rang_fz1', 9, 2);
            $table->decimal('valor_fz1', 9, 2);
            $table->decimal('fac_rang_fz2', 9, 2);
            $table->decimal('valor_fz2', 9, 2);
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
        Schema::dropIfExists('servicios_pasajeros');
    }
}
