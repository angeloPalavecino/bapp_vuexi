<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Patron;

class GrupoPatronHasPatrones extends Model
{
    protected $fillable = [
        'grupopatrones_id','patron_id'
    ];

    public function patrones()
    {
      return $this->hasMany(Patron::class, 'id', 'patron_id');
    }
}
