<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Matriz extends Model
{
    protected $fillable = [
        'horario_id','car_id','grupopatrones_id','sucursal_id'
    ];
}
