<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Sucursal;

class GrupoPatronHasSucursales extends Model
{
    protected $fillable = [
        'grupopatrones_id','sucursal_id'
    ];

    public function sucursales()
    {
      return $this->hasMany(Sucursal::class, 'id', 'sucursal_id');
    }
}
