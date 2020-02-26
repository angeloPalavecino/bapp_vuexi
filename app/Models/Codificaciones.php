<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Codificaciones extends Model
{
    protected $fillable = [
        'sucursal_id', 'rut' ,'nombre', 'apellido', 'direccion', 'comuna', 'grupo_patron_id','lat', 'lng',
        'distancia','email','telefono','centro_costo','habilitado','comentario'
    ];
}
