<?php
namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\User;
use App\Models\UsersHasCars;
use App\Models\Car;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'empresa_id' => 'required',
             'name' => 'required',
             'lastname' => 'required',
             'rut' => 'required',
             'email' => 'required|email', 
             'telefono' => 'required',
             'password' => 'required|min:8|confirmed',
             'habilitado' => 'required',
             'roles' => 'required'             
         ]);
    }

    public function index()
    {

        //$users = User::with('roles','empresas')->select('id','name', 'lastname','email','habilitado','')->get(); 
        
        $users = User::join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
                        ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                        ->join('empresas', 'empresas.id', '=', 'users.empresa_id')
                        ->select(
                            'users.id',
                            'users.name', 
                            'users.lastname',
                            'users.email',
                            'users.habilitado', 
                            'users.imagen', 
                            'empresas.razon_social',
                            'roles.name as rol' )->get();
        
        //$user = User::findOrFail('3');
        //$user->syncRoles('1');

        return response()->json(
            [
                'status' => 'success',
                'items' => $users->toArray(),
            ], 200);
    }
    public function show(Request $request, $id)
    {
        $user = User::with('roles','empresas')->where("id", $id)->get(); //User::find($id);
        //cars
        $usercars = UsersHasCars::where('user_id', $id)->get(); 
        $ids = array_column($usercars->toArray() , 'car_id');
        $cars = Car::select('id','tipo', 'numero_movil','patente')->whereIn('id', $ids)->get();

        return response()->json(
            [
                'status' => 'success',
                'item' => $user->toArray(),
                'itemcars' => $cars->toArray()
            ], 200);
    }

    public function store(Request $request)
    {
       
       $validation = $this->validator($request->all());

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }

        $input = $request->all();
        $empresa_id = $input['empresa_id'];
        $name = $input['name'];
        $lastname = $input['lastname'];
        $rut = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $input['rut'])); 
        $telefono = $input['telefono'];
        $email = $input['email'];
        $habilitado = $input['habilitado'];
        $password = Hash::make($input['password']);
        $imagen = '/images/portrait/users/avatar.jpg';
        
        $existe_usuario = User::where('rut',  $rut)->first();
        if ($existe_usuario != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El rut ya se encuentra registrado',
                ], 300);           
        }

        $existe_usuario = User::where('email', $request['email'])->first();
        if ($existe_usuario != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El email ya se encuentra registrado',
                ], 300);           
        }

        $user = User::create(
         array(
                 'name'         => $name,
                 'lastname'     => $lastname,
                 'rut'          => $rut,
                 'telefono'     => $telefono,
                 'email'        => $email,
                 'habilitado'   => $habilitado,    
                 'password'     => $password,
                 'empresa_id'   => $empresa_id,
                 'imagen'       => $imagen
              )
         );

         //Actualiza Roles
         $user->assignRole($request->get('roles'));

         //Agrega Moviles conductor
         if($request->get('roles') == 2) {
            $moviles = $request->get('moviles');

            foreach ($moviles as $movil) {
                UsersHasCars::create(
                    array(
                            'user_id'       => $user['id'],
                            'car_id'        => $movil['id'],
                            'habilitado'    => 1,    
                         )
                    );
            }
         }

         return response()->json(
            [
                'status' => 'success',
                'item' => $user->toArray()
            ], 200);

    }

    public function destroy($id)
    {
        
        try{
          
           
           $user = User::findOrFail($id);
            
           if(!is_null($user)){
                
                $user->delete();

                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'El Usuario ha sido eliminado!!'
                    ], 200);
            
            }else{
        
                return response()->json(
                    [
                        'status' => 'error',
                        'message' => 'El Usuario no existe!!'
                    ], 300);
            }


        }catch(ModelNotFoundException $e){
            
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El Usuario no existe!!'
                ], 300);
  
        }

        
    }

    public function borrar(Request $request )
    {
      
       
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                User::destroy($ids);
                
                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'Los registros ha sido eliminados!'
                    ], 200);

            }else{
        
                    return response()->json(
                        [
                            'status' => 'error',
                            'message' => 'Error al intentar eliminar los registros!'
                        ], 300);
            }
        

        }catch(ModelNotFoundException $e){
            
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Error al intentar eliminar los registros!'
                ], 300);
  
        }

        
    }


    public function update(Request $request, $id)
    {
        $datos = array();
        
        $validar = array(
            'empresa_id' => 'required',
            'name' => 'required',
            'lastname' => 'required',
            'rut' => 'required',
            'telefono' => 'required',
            'habilitado' => 'required',
            'email' => 'required|email', 
            'roles' => 'required'  
        );
        
        if(!is_null($request->get('password'))){
            
            $validar = array_add($validar, 'password' , 'required|min:8|confirmed');
            $password = Hash::make($request->get('password'));
            
            $datos = Arr::add($datos, 'password', $password);

        }
        
        $validation = Validator::make($request->all(), $validar);

        if ($validation->fails()) {

             return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
        }
        
        $usuario = User::where('id',$id)->first(); 

        if(!is_null($usuario)){
    
            $input = $request->all();
            $empresa_id = $input['empresa_id'];
            $name = $input['name'];
            $lastname = $input['lastname'];
            $rut = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $input['rut'])); 
            $telefono = $input['telefono'];
            $email = $input['email'];
            $habilitado = $input['habilitado'];
            //$imagen = $input['imagen'];

            $datos = Arr::add($datos,'empresa_id', $empresa_id);
            $datos = Arr::add($datos,'name', $name);
            $datos = Arr::add($datos,'lastname', $lastname);
            $datos = Arr::add($datos,'rut', $rut);
            $datos = Arr::add($datos,'telefono', $telefono);
            $datos = Arr::add($datos,'email', $email);
            $datos = Arr::add($datos,'habilitado', $habilitado);
            //$datos = Arr::add($datos,'imagen', $imagen);
            
            //Actualiza Usuario
            User::where('id', $id)->update($datos);
             
            //Actualiza Roles
            //$user->roles()->sync($request->get('roles'));
            $usuario->syncRoles($request->get('roles'));


            //Actualiza Moviles conductor
            UsersHasCars::where('user_id', $id)->delete();
            
            if($request->get('roles') == 2) {

                $moviles = $request->get('moviles');

                foreach ($moviles as $movil) {
                    UsersHasCars::create(
                        array(
                                'user_id'       => $id,
                                'car_id'        => $movil['id'],
                                'habilitado'    => 1,    
                            )
                        );
                }
            }

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'El Usuario ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El usuario no fue encontrado',
                ], 300);

           
        }
       
        
    }

    public function perfil(Request $request)
    {
        $user = User::with('roles')->where('id', Auth::user()->id)->get()->toArray(); 
        
        $user[0]['name'] = ucwords($user[0]['name']);
        $user[0]['lastname'] = ucwords($user[0]['lastname'] );
        
        $emp = Empresa::find($user[0]['empresa_id']);
        
        $user[0]['nombreEmpr'] = $emp['razon_social'];
        
        return response()->json(
            [
                'status' => 'success',
                'item' => $user[0],
            ], 200);
    }

    public function cambiarpass(Request $request)
    {
        
        $validar = array(
            'password' => 'required|min:8|confirmed'
        );
        
        $validation = Validator::make($request->all(), $validar);

        if ($validation->fails()) {

             return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
        }

        $id = Auth::user()->id;
        $password = Hash::make($request->get('password'));

        //Actualiza Clave
        User::where('id', $id)->update(array(
            'password'     => $password,
         ));
        
        return response()->json(
            [
                'status' => 'success',
            ], 200);
    }

    public function cars($id)
    {
        $usercars = UsersHasCars::where('user_id', $id)->get(); 
        $ids = array_column($usercars->toArray() , 'car_id');
       
        $cars = Car::select('id','tipo', 'numero_movil','patente')->whereIn('id', $ids)->get();
        
          return response()->json(
              [
                  'status' => 'success',
                  'items' => $cars->toArray(),
              ], 200);
    }

    
}

