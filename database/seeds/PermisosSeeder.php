<?php

use Illuminate\Database\Seeder;

class PermisosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            ['id' => 1,'name' => 'users.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 2,'name' => 'users.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 3,'name' => 'users.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 4,'name' => 'users.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 5,'name' => 'users.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 6,'name' => 'users.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 7,'name' => 'users.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
             
            ['id' => 8,'name' => 'roles.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 9,'name' => 'roles.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 10,'name' => 'roles.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 11,'name' => 'roles.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 12,'name' => 'roles.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 13,'name' => 'roles.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 14,'name' => 'roles.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 15,'name' => 'moviles.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 16,'name' => 'moviles.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 17,'name' => 'moviles.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 18,'name' => 'moviles.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 19,'name' => 'moviles.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 20,'name' => 'moviles.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 21,'name' => 'moviles.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 22,'name' => 'empresas.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 23,'name' => 'empresas.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 24,'name' => 'empresas.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 25,'name' => 'empresas.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 26,'name' => 'empresas.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 27,'name' => 'empresas.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 28,'name' => 'empresas.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 29,'name' => 'excepciones.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 30,'name' => 'excepciones.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 31,'name' => 'excepciones.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 32,'name' => 'excepciones.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 33,'name' => 'excepciones.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 34,'name' => 'excepciones.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 35,'name' => 'excepciones.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            
            ['id' => 36,'name' => 'observaciones.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 37,'name' => 'observaciones.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 38,'name' => 'observaciones.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 39,'name' => 'observaciones.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 40,'name' => 'observaciones.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 41,'name' => 'observaciones.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 42,'name' => 'observaciones.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 43,'name' => 'obsinternas.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 44,'name' => 'obsinternas.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 45,'name' => 'obsinternas.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 46,'name' => 'obsinternas.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 47,'name' => 'obsinternas.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 48,'name' => 'obsinternas.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 49,'name' => 'obsinternas.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 50,'name' => 'fuerazona.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 51,'name' => 'fuerazona.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 52,'name' => 'fuerazona.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 53,'name' => 'fuerazona.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 54,'name' => 'fuerazona.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 55,'name' => 'fuerazona.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 56,'name' => 'fuerazona.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 57,'name' => 'servpasajeros.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 58,'name' => 'servpasajeros.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 59,'name' => 'servpasajeros.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 60,'name' => 'servpasajeros.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 61,'name' => 'servpasajeros.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 62,'name' => 'servpasajeros.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 63,'name' => 'servpasajeros.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 64,'name' => 'servkms.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 65,'name' => 'servkms.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 66,'name' => 'servkms.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 67,'name' => 'servkms.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 68,'name' => 'servkms.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 69,'name' => 'servkms.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 70,'name' => 'servkms.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 71,'name' => 'servplanas.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 72,'name' => 'servplanas.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 73,'name' => 'servplanas.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 74,'name' => 'servplanas.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 75,'name' => 'servplanas.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 76,'name' => 'servplanas.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 77,'name' => 'servplanas.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 78,'name' => 'patrones.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 79,'name' => 'patrones.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 80,'name' => 'patrones.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 81,'name' => 'patrones.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 82,'name' => 'patrones.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 83,'name' => 'patrones.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 84,'name' => 'patrones.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 85,'name' => 'grupopatrones.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 86,'name' => 'grupopatrones.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 87,'name' => 'grupopatrones.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 88,'name' => 'grupopatrones.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 89,'name' => 'grupopatrones.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 90,'name' => 'grupopatrones.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 91,'name' => 'grupopatrones.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            
            ['id' => 92,'name' => 'codificaciones.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 93,'name' => 'codificaciones.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 94,'name' => 'codificaciones.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 95,'name' => 'codificaciones.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 96,'name' => 'codificaciones.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 97,'name' => 'codificaciones.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 98,'name' => 'codificaciones.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    
            ['id' => 99,'name' => 'horarios.store', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 100,'name' => 'horarios.create', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 101,'name' => 'horarios.index', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 102,'name' => 'horarios.update', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 103,'name' => 'horarios.show', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 104,'name' => 'horarios.destroy', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
            ['id' => 105,'name' => 'horarios.edit', 'guard_name' => 'api', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")],
    

        ];

        DB::table('permissions')->insert($permissions);

    }
}
