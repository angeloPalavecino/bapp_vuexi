<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiciosPlanas extends Model
{
    //
    protected $fillable = [
        'minima', 'num_psj_min' ,'num_psj_max', 'psj_adicional', 'fuera_zona_1' ,'fuera_zona_2'
    ];

}
