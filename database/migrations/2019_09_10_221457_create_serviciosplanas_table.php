<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiciosplanasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servicios_planas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->decimal('minima', 9, 2);
            $table->integer('num_psj_min');
            $table->integer('num_psj_max');
            $table->decimal('psj_adicional', 9, 2);
            $table->decimal('fuera_zona_1', 9, 2);
            $table->decimal('fuera_zona_2', 9, 2);
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
        Schema::dropIfExists('servicios_planas');
    }
}
