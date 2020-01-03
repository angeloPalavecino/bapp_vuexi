<?php

namespace App\Models;
use App\Models\User;
use App\Models\Car;

use Illuminate\Database\Eloquent\Model;

class UsersHasCars extends Model
{
    protected $fillable = [
        'user_id', 'car_id', 'habilitado'
    ];

    public function users()
    {
      return $this->hasMany(User::class, 'id', 'user_id');
    }

    public function cars()
    {
      return $this->hasMany(Car::class, 'id', 'car_id');
    }
}
