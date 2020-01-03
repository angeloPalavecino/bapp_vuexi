<?php

use Illuminate\Database\Seeder;

class CarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cars')->insert([
            'id' => 1,
            'empresa_id' => 1,
            'tipo' => '-',
            'marca' => '-',
            'modelo' => '-',
            'ano' => 0,
            'motor' => '-',
            'patente' => '-',
            'color' => '-',
            'asientos' => '-',
            'numero_movil' => 'Sin movil',
            'habilitado' => 1,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);
    }
}
