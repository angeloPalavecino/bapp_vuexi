<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patron extends Model
{
    protected $fillable = [
        'codigo','descripcion','color','lat','lng'
    ];

    public function getCodigoAttribute($value)
    {
        return strtoupper($value);
    }

    public function setCodigoAttribute($value)
    {
        $this->attributes['codigo'] = strtoupper($value);
    }


    public function getDescripcionAttribute($value)
    {
        return strtoupper($value);
    }

    public function setDescripcionAttribute($value)
    {
        $this->attributes['descripcion'] = strtoupper($value);
    }


    public function getColorAttribute($value)
    {
        return strtoupper($value);
    }

    public function setColorAttribute($value)
    {
        $this->attributes['color'] = strtoupper($value);
    }


}
