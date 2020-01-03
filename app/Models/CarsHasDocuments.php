<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Document;

class CarsHasDocuments extends Model
{
    protected $fillable = [
        'car_id', 'document_id','habilitado'
    ];

    public function documents()
    {
      return $this->hasMany(Document::class, 'id', 'document_id');
    }
}
