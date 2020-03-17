<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarsHasEmpresas extends Model
{
    protected $fillable = [
        'car_id', 'empresa_id'
    ];

}
