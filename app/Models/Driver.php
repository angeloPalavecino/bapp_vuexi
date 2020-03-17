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

     public function getNameAttribute($value)
    {
        return strtoupper($value);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtoupper($value);
    }


    public function getLastnameAttribute($value)
    {
        return strtoupper($value);
    }

    public function setLastnameAttribute($value)
    {
        $this->attributes['lastname'] = strtoupper($value);
    }


    public function getRutAttribute($value)
    {
        return strtoupper($value);
    }

    public function setRutAttribute($value)
    {
        $this->attributes['rut'] = strtoupper($value);
    }



    public function getPaisAttribute($value)
    {
        return strtoupper($value);
    }

    public function setPaisAttribute($value)
    {
        $this->attributes['pais'] = strtoupper($value);
    }



    public function getCiudadAttribute($value)
    {
        return strtoupper($value);
    }

    public function setCiudadAttribute($value)
    {
        $this->attributes['ciudad'] = strtoupper($value);
    }


    public function getComunaAttribute($value)
    {
        return strtoupper($value);
    }

    public function setComunaAttribute($value)
    {
        $this->attributes['comuna'] = strtoupper($value);
    }


    public function getDireccionAttribute($value)
    {
        return strtoupper($value);
    }

    public function setDireccionAttribute($value)
    {
        $this->attributes['direccion'] = strtoupper($value);
    }

    public function getClaseAttribute($value)
    {
        return strtoupper($value);
    }

    public function setClaseAttribute($value)
    {
        $this->attributes['clase'] = strtoupper($value);
    }
}


  