<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Observacionesinternas extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'descripcion',
    ];

    public function getDescripcionAttribute($value)
    {
        return strtoupper($value);
    }

    public function setDescripcionAttribute($value)
    {
        $this->attributes['descripcion'] = strtoupper($value);
    }
}
