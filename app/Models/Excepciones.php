<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Excepciones extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rut', 'direccion', 'comuna'  ,'lat', 'lng', 'sucursal_id',
    ];

    public function getRutAttribute($value)
    {
        return strtoupper($value);
    }

    public function setRutAttribute($value)
    {
        $this->attributes['rut'] = strtoupper($value);
    }


    public function getDireccionAttribute($value)
    {
        return strtoupper($value);
    }

    public function setDireccionAttribute($value)
    {
        $this->attributes['direccion'] = strtoupper($value);
    }
    

    public function getComunaAttribute($value)
    {
        return strtoupper($value);
    }

    public function setComunaAttribute($value)
    {
        $this->attributes['comuna'] = strtoupper($value);
    }
}
