<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //$this->call(UsersTableSeeder::class);
        $this->call(EmpresasSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(PermisosSeeder::class);
        $this->call(TypeDocumentsSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(CarsSeeder::class);

    }
}
