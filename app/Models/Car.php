<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DriversHasCars;
use App\Models\Driver;

 

class Car extends Model
{
    protected $fillable = [
        'tipo', 'marca' ,'modelo', 'ano', 'motor', 'patente', 'color','asientos', 'habilitado',
        'empresa_id', 'numero_movil'
    ];
}
