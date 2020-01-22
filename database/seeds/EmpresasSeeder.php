<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class EmpresasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('empresas')->insert([
            'id' => 1,
            'rut' => 00000000,
            'dv' => 0,
            'razon_social' => 'Sin Empresa',
            'giro' => 'Sin Empresa',
            'habilitado' => 1,
            'fecha_incorporacion' => date("Y-m-d H:i:s"),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);
    }
}
