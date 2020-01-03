<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Excepciones extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rut', 'direccion' ,'lat', 'lng',
    ];
}
