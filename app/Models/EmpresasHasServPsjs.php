<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ServiciosPasajeros;

class EmpresasHasServPsjs extends Model
{
    protected $fillable = [
        'empresa_id', 'serv_psj_id'
    ];


    public function serviciospasajeros()
    {
      return $this->hasMany(ServiciosPasajeros::class, 'id', 'serv_psj_id');
    }
}
