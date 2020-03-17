<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'rut', 'dv' ,'razon_social', 'giro','habilitado','fecha_incorporacion','hora_max_agendamiento'
    ];

    public function getRazonSocialAttribute($value)
    {
        return strtoupper($value);
    }

    public function setRazonSocialAttribute($value)
    {
        $this->attributes['razon_social'] = strtoupper($value);
    }


    public function getGiroAttribute($value)
    {
        return strtoupper($value);
    }

    public function setGiroAttribute($value)
    {
        $this->attributes['giro'] = strtoupper($value);
    }


    public function getDvAttribute($value)
    {
        return strtoupper($value);
    }

    public function setDvAttribute($value)
    {
        $this->attributes['dv'] = strtoupper($value);
    }
}
