<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ServiciosKMS;

class EmpresasHasServKMS extends Model
{
    protected $fillable = [
        'empresa_id', 'serv_kms_id'
    ];

    public function servicioskms()
    {
      return $this->hasMany(ServiciosKMS::class, 'id', 'serv_kms_id');
    }
}
