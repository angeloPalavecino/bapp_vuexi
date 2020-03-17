<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DriversHasCars;
use App\Models\Driver;

 

class Car extends Model
{
    protected $fillable = [
        'tipo', 'marca' ,'modelo', 'ano', 'motor', 'patente', 'color','asientos', 'habilitado',
        'empresa_id', 'numero_movil'
    ];

    public function getTipoAttribute($value)
    {
        return strtoupper($value);
    }

    public function setTipoAttribute($value)
    {
        $this->attributes['tipo'] = strtoupper($value);
    }


    public function getMarcaAttribute($value)
    {
        return strtoupper($value);
    }

    public function setMarcaAttribute($value)
    {
        $this->attributes['marca'] = strtoupper($value);
    }



    public function getModeloAttribute($value)
    {
        return strtoupper($value);
    }

    public function setModeloAttribute($value)
    {
        $this->attributes['modelo'] = strtoupper($value);
    }



    public function getMotorAttribute($value)
    {
        return strtoupper($value);
    }

    public function setMotorAttribute($value)
    {
        $this->attributes['motor'] = strtoupper($value);
    }


    public function getPatenteAttribute($value)
    {
        return strtoupper($value);
    }

    public function setPatenteAttribute($value)
    {
        $this->attributes['patente'] = strtoupper($value);
    }
    


    public function getColorAttribute($value)
    {
        return strtoupper($value);
    }

    public function setColorAttribute($value)
    {
        $this->attributes['color'] = strtoupper($value);
    }

}
