<?php

use Illuminate\Database\Seeder;

class TypeDocumentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //0 -- documentos Moviles
        //1 -- documentos Conductores  
        //2 -- documentos Asociados  
            
        $type_documents = [
            ['id' => 1,'name' => 'CEDULA IDENTIDAD', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 2,'name' => 'CERTIFICADO ANTECEDENTES PENALES', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 3,'name' => 'LICENCIA DE CONDUCIR', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
           
            ['id' => 4,'name' => 'PADRON', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 5,'name' => 'PERMISO CIRCULACION', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 6,'name' => 'REVISION TECNICA', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 7,'name' => 'CARTON MINISTERIAL (MTT)', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
           
            ['id' => 8,'name' => 'SEGURO OBLIGATORIO', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 9,'name' => 'SEGURO VIDA CONDUCTOR', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 10,'name' => 'SEGURO ASIENTO PASAJERO', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
           
            ['id' => 11,'name' => 'CEDULA IDENTIDAD', 'habilitado' => 1, 'tipo' => 2, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 12,'name' => 'CONTRATO', 'habilitado' => 1, 'tipo' => 2, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
        

          ];


        DB::table('type_documents')->insert($type_documents);
    }
}
