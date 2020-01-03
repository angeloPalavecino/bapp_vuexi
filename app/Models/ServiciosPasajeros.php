<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiciosPasajeros extends Model
{
    //
    protected $fillable = [
        'num_psj_min', 'num_psj_max' ,'fac_rang_min', 'fac_rang_max', 'valor' ,'fac_rang_fz1', 
        'valor_fz1', 'fac_rang_fz2' ,'valor_fz2'
    ];
    
}
