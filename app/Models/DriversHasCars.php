<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriversHasCars extends Model
{
    protected $fillable = [
        'driver_id', 'car_id','habilitado'
    ];
}
