<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\TypeDocument;


class Document extends Model
{
    protected $fillable = [
        'name', 'habilitado','type_document_id', 'url', 'fecha_vencimiento', 'informacion'
    ];

    public function typeDocuments()
    {
      return $this->hasMany(TypeDocument::class, 'id', 'type_document_id');
    }
}
 