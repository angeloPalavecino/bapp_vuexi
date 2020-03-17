<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
//use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;
//use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Models\Permission;

use Illuminate\Support\Facades\Auth;
use App\Models\UsersHasCars;
use App\Models\Empresa;

class User extends Authenticatable //implements JWTSubject
{
    use Notifiable;
    use HasRoles;
    //use HasPermissions;
    protected $guard_name = 'api';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','name', 'empresa_id' , 'lastname' ,'rut', 'email', 'password', 'telefono', 'habilitado', 'imagen',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


  /*  public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


    public function getAllPermissionsAttribute() {
        $permissions = [];
          foreach (Permission::all() as $permission) {
            if (Auth::user()->can($permission->name)) {
              $permissions[] = $permission->name;
            }
          }
          return $permissions;
      }*/

    public function cars()
    {
      return $this->hasMany(UsersHasCars::class, 'user_id', 'id');
    }

    public function empresas()
    {
      return $this->hasMany(Empresa::class, 'id', 'empresa_id');
    }

    public function getNameAttribute($value)
    {
        return strtoupper($value);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtoupper($value);
    }


    public function getLastnameAttribute($value)
    {
        return strtoupper($value);
    }

    public function setLastnameAttribute($value)
    {
        $this->attributes['lastname'] = strtoupper($value);
    }


    public function getRutAttribute($value)
    {
        return strtoupper($value);
    }

    public function setRutAttribute($value)
    {
        $this->attributes['rut'] = strtoupper($value);
    }
}
