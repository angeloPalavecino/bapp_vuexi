<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiciosKMS extends Model
{
    protected $fillable = [
        'descripcion', 'cant_psjs' ,'min_servicio', 'kms', 'min' ,'bajada_bandera','porticos'
    ];
}
