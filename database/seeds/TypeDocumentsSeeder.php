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
            ['id' => 1,'name' => 'Cedula Identidad', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 2,'name' => 'Certificado Antecedentes Penales', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 3,'name' => 'Licencia de Conducir', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
           
            ['id' => 4,'name' => 'Padron', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 5,'name' => 'Permisos Circulacion', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 6,'name' => 'Revision Tecnica', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 7,'name' => 'Carton Ministerial (MTT)', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
           
            ['id' => 8,'name' => 'Seguro Obligatorio', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 9,'name' => 'Seguro Vida Conductor', 'habilitado' => 1, 'tipo' => 1, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 10,'name' => 'Seguro Asiento Pasajero', 'habilitado' => 1, 'tipo' => 0, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
           
            ['id' => 11,'name' => 'Cedula Identidad', 'habilitado' => 1, 'tipo' => 2, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 12,'name' => 'Contrato', 'habilitado' => 1, 'tipo' => 2, 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
        

          ];


        DB::table('type_documents')->insert($type_documents);
    }
}
