<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgenamientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agendamientos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('codificacion_id');
            $table->unsignedBigInteger('car_plan_id');
            $table->unsignedBigInteger('car_real_id')->nullable();
            $table->unsignedBigInteger('drivers_plan_id');
            $table->unsignedBigInteger('drivers_real_id')->nullable();
            $table->unsignedBigInteger('observaciones_id')->nullable();
            $table->unsignedBigInteger('observacionesinternas_id')->nullable();
            $table->unsignedBigInteger('horario_plan');
            $table->string('tipo');
            $table->timestamp('fecha')->nullable();
            $table->string('horario_real')->nullable();
            $table->string('tipo_periodo');
            $table->string('detalle_observaciones')->nullable();
            $table->string('detalle_observacionesinternas')->nullable();
            $table->boolean('estado');
            $table->timestamps();


            $table->foreign('codificacion_id')
            ->references('id')
            ->on('codificaciones')
            ->onDelete('cascade');

            $table->foreign('car_plan_id')
            ->references('id')
            ->on('cars');

            $table->foreign('car_real_id')
            ->references('id')
            ->on('cars');

            $table->foreign('drivers_plan_id')
            ->references('id')
            ->on('drivers');

            $table->foreign('drivers_real_id')
            ->references('id')
            ->on('drivers');

            $table->foreign('observaciones_id')
            ->references('id')
            ->on('observaciones');

            $table->foreign('observacionesinternas_id')
            ->references('id')
            ->on('observacionesinternas');

            $table->foreign('horario_plan')
            ->references('id')
            ->on('horarios');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agendamientos');
    }
}
