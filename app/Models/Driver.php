<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Car;
use App\Models\DriversHasCars;
use App\Models\DriversHasDrivers;

class Driver extends Model
{
    protected $fillable = [
        'name', 'lastname' ,'rut', 'email', 'telefono', 'habilitado', 'pais','ciudad', 
        'comuna', 'dueno', 'conductor', 'direccion', 'numeracion', 'clase', 'empresa_id'
        , 'driver_default'
    ];

     public function cars()
     {
       return $this->hasMany(DriversHasCars::class, 'driver_id', 'id');
     }
     
     public function conductores()
     {
       return $this->hasMany(DriversHasDrivers::class, 'asociado_id', 'id');
     }

     public function asociados()
     {
       return $this->hasMany(DriversHasDrivers::class, 'driver_id', 'id');
     }
}


  