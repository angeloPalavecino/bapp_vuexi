<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriversHasDrivers extends Model
{
    protected $fillable = [
        'driver_id', 'asociado_id','habilitado'
    ];
}
