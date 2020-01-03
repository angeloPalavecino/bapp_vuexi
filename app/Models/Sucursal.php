<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'empresa_id', 'nombre' ,'direccion', 'pais','ciudad','comuna','numeracion','matriz','lat','lng',
    ];
}
