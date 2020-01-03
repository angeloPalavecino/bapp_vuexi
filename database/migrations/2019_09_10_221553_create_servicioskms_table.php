<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicioskmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servicios_k_m_s_s', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descripcion');
            $table->integer('cant_psjs');
            $table->decimal('min_servicio', 9, 2);
            $table->decimal('kms', 9, 2);
            $table->decimal('min', 9, 2);
            $table->decimal('bajada_bandera', 9, 2);            
            $table->decimal('porticos', 9, 2);
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
        Schema::dropIfExists('servicios_k_m_s_s');
    }
}
