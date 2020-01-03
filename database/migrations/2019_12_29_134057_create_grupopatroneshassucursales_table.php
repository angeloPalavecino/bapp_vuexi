<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGrupopatroneshassucursalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grupo_patron_has_sucursales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('grupopatrones_id');
            $table->unsignedBigInteger('sucursal_id');
            $table->timestamps();

            $table->foreign('grupopatrones_id')
            ->references('id')
            ->on('grupo_patrons')
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
        Schema::dropIfExists('grupo_patron_has_sucursales');
    }
}
