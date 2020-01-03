<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GrupoPatron extends Model
{
    protected $fillable = [
        'descripcion','codigo','fuerazona','sucursal_id'
    ];
}
