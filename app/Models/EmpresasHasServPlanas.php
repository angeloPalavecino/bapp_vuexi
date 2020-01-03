<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ServiciosPlanas;

class EmpresasHasServPlanas extends Model
{
    protected $fillable = [
        'empresa_id', 'serv_planas_id'
    ];

    public function serviciosplanas()
    {
      return $this->hasMany(ServiciosPlanas::class, 'id', 'serv_planas_id');
    }
}
