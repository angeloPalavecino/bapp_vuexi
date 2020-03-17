<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'empresa_id', 'nombre' ,'direccion', 'pais','ciudad','comuna','numeracion','matriz','lat','lng',
    ];

    public function getNombreAttribute($value)
    {
        return strtoupper($value);
    }

    public function setNombreAttribute($value)
    {
        $this->attributes['nombre'] = strtoupper($value);
    }

    public function getDireccionAttribute($value)
    {
        return strtoupper($value);
    }

    public function setDireccionAttribute($value)
    {
        $this->attributes['direccion'] = strtoupper($value);
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
}
