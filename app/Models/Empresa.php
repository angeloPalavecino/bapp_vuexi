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
}
