<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Document;


class DriversHasDocuments extends Model
{
    protected $fillable = [
        'driver_id', 'document_id','habilitado'
    ];

    public function documents()
    {
      return $this->hasMany(Document::class, 'id', 'document_id');
    }
}
