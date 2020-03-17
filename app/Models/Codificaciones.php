<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Codificaciones extends Model
{
    protected $fillable = [
        'sucursal_id', 'rut' ,'nombre', 'apellido', 'direccion', 'comuna', 'grupo_patron_id','lat', 'lng',
        'distancia','email','telefono','centro_costo','habilitado','comentario'
    ];
    
    public function getRutAttribute($value)
    {
        return strtoupper($value);
    }

    public function setRutAttribute($value)
    {
        $this->attributes['rut'] = strtoupper($value);
    }


    public function getNombreAttribute($value)
    {
        return strtoupper($value);
    }

    public function setNombreAttribute($value)
    {
        $this->attributes['nombre'] = strtoupper($value);
    }

    public function getApellidoAttribute($value)
    {
        return strtoupper($value);
    }
    
    public function setApellidoAttribute($value)
    {
        $this->attributes['apellido'] = strtoupper($value);
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


    public function getCentroCostoAttribute($value)
    {
        return strtoupper($value);
    }

    public function setCentroCostoAttribute($value)
    {
        $this->attributes['centro_costo'] = strtoupper($value);
    }

}
