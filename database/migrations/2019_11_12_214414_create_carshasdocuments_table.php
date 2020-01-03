<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarshasdocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars_has_documents', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('car_id');
            $table->unsignedBigInteger('document_id');
            $table->boolean('habilitado');
            $table->timestamps();

            $table->foreign('car_id')
            ->references('id')
            ->on('cars')
            ->onDelete('cascade');

            $table->foreign('document_id')
            ->references('id')
            ->on('documents')
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
        Schema::dropIfExists('cars_has_documents');
    }
}
