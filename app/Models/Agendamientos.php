<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agendamientos extends Model
{
    protected $fillable = [
        'codificacion_id', 'tipo', 'fecha_inicio', 'fecha_fin', 'horario_plan', 'tipo_fecha','usuario_id'
    ];

    public function getTipoAttribute($value)
    {
        return strtoupper($value);
    }

    public function setTipoAttribute($value)
    {
        $this->attributes['tipo'] = strtoupper($value);
    }
}
