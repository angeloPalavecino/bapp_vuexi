<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GrupoPatron extends Model
{
    protected $fillable = [
        'descripcion','codigo','fuerazona','sucursal_id'
    ];

    public function getDescripcionAttribute($value)
    {
        return strtoupper($value);
    }

    public function setDescripcionAttribute($value)
    {
        $this->attributes['descripcion'] = strtoupper($value);
    }

    public function getCodigoAttribute($value)
    {
        return strtoupper($value);
    }

    public function setCodigoAttribute($value)
    {
        $this->attributes['codigo'] = strtoupper($value);
    }


    public function getFuerazonaAttribute($value)
    {
        return strtoupper($value);
    }

    public function setFuerazonaAttribute($value)
    {
        $this->attributes['fuerazona'] = strtoupper($value);
    }
}
