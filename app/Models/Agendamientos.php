<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agendamientos extends Model
{
    protected $fillable = [
        'codificacion_id', 'car_plan_id' ,'car_real_id', 'drivers_plan_id', 'drivers_real_id', 'observaciones_id', 
        'observacionesinternas_id','tipo', 'fecha_inicio', 'fecha_fin', 'horario_plan', 'horario_real', 'tipo_periodo'
        , 'detalle_observaciones' , 'detalle_observacionesinternas', 'estado'
    ];
}
