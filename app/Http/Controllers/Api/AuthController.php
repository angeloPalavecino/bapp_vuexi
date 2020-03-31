<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Empresa;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function login() {
        $credentials = request(["email", "password"]);
        if (! $token = auth()->attempt($credentials)) {

            return response()->json(
                [
                    'status' => 'error',
                    'error' => 'Unauthorized',
                    'message' => 'Usuario o clave erronea. Intente nuevamente',
                ], 300);

           // return response()->json(['error' => 'Unauthorized'], 300);//401
        }
        return $this->respondWithToken($token);
    }

    public function register()
    {
        $validator = Validator::make(request()->input(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'success' => false,
                'errors' => $validator->getMessageBag()->toArray()
            ), 422);
        }

        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => bcrypt(request('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return $this->respondWithToken($token);
    }

    public function me() {
        return response()->json(auth()->user());
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    public function refresh() {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken(string $token) {

        //Datos usuario
        $user = User::with('roles')->where('id', auth()->user()->id)->get()->toArray(); 
        $user[0]['name'] = ucwords(strtolower($user[0]['name']));
        $user[0]['lastname'] = ucwords(strtolower($user[0]['lastname']));
        $user[0]['displayName'] = $user[0]['name']." ".$user[0]['lastname'];
        $user[0]['photoURL'] = $user[0]['imagen'];
        
        //Nombre empresa
        $emp = Empresa::find($user[0]['empresa_id']);
        $user[0]['empresa'] = ucwords(strtolower($emp['razon_social']));  
 
        //Nombre Rol
        $rol = $user[0]['roles'];
        $user[0]['rol'] = ucwords(strtolower($rol[0]['name']));  

        //Permisos
        $role = Role::find($rol[0]['id']); 
        $user[0]['permisos'] = array_column($role->permissions->toArray(), 'name');  

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'userData' => $user[0] 
        ]);
    }
}
