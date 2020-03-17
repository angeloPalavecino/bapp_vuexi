<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fuerazona extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'empresa_id', 'comuna' ,'tipo', 'distancia', 'sucursal_id',
    ];

    public function getComunaAttribute($value)
    {
        return strtoupper($value);
    }

    public function setComunaAttribute($value)
    {
        $this->attributes['comuna'] = strtoupper($value);
    }

    
    public function getTipoAttribute($value)
    {
        return strtoupper($value);
    }

    public function setTipoAttribute($value)
    {
        $this->attributes['tipo'] = strtoupper($value);
    }
}
