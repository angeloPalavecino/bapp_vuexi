<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmpresahasserkmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas_has_serv_k_m_s_s', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('empresa_id');
            $table->unsignedBigInteger('serv_kms_id');
            $table->timestamps();

            $table->foreign('empresa_id')
            ->references('id')
            ->on('empresas');

            $table->foreign('serv_kms_id')
            ->references('id')
            ->on('servicios_k_m_s_s')
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
        Schema::dropIfExists('empresas_has_serv_k_m_s_s');
    }
}
