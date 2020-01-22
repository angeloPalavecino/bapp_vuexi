<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
     
    public function validator(array $data){ 

        return Validator::make($data, [
             'name' => 'required',
             'permisos' => 'required' 
         ]);
    }

    public function index()
    {
        $roles = Role::all();
        $aux = array();
        
        foreach ($roles as $key => $item) {
          
           $aux[$key] = [ 
            'id' => $item->id,
            'name' => $item->name,
            'guard_name' => $item->guard_name,
            'created_at' => $item->created_at,
            'updated_at' => $item->updated_at,            
            'permisos' => $item->permissions->toArray()
        
            ];
            
        }
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $aux,
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
        $name = $input['name'];
        $guard_name = 'api';

        //Actualiza Rol
        
        $role = Role::create(
         array(
                 'name' => $name,    
                 'guard_name' => $guard_name,                
              )
         );
        
        //Actualiza permisos
        //$aux = array_column($request->get('permisos'), 'id');
        $role->givePermissionTo($request->get('permisos'));

        return response()->json(
            [
                'status' => 'success',
                'item' => $role->toArray()
            ], 200);
    }

   
    public function show($id)
    {
        $role = Role::find($id); 
        $aux = array();
        
        $aux[0] = [ 
            'id' => $role->id,
            'name' => $role->name,
            'guard_name' => $role->guard_name,
            'created_at' => $role->created_at,
            'updated_at' => $role->updated_at,            
            'permisos' => array_column($role->permissions->toArray(), 'id')
        ];

        return response()->json(
            [
                'status' => 'success',
                'item' => $aux
            ], 200);
    }

    public function combo()
    {
        $roles = Role::select(
            'roles.name as label',
            'roles.name as value' )->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $roles->toArray()
            ], 200);
    }

    
  
    public function update(Request $request, $id)
    {
        
        $validation = $this->validator($request->all());
        
        
        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
        }
        

        $role = Role::where('id', $id)->first(); 

        if(!is_null($role)){
    
            $input = $request->all();
            $name = $input['name'];
           
            //Actualiza Rol

            Role::where('id', $role->id)->update(
             array(
                     'name'  => $name                     
                  )
             );
    
            //Actualiza permisos
            //$aux = array_column($request->get('permisos'), 'id');
            $role->syncPermissions($request->get('permisos'));

            return response()->json(
                [
                    'status' => 'success',
                    'item' => $role->toArray()
                ], 200);


        }else{
    
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El rol no fue encontrado',
                ], 300);
        }
       
        
    }

    
    public function destroy($id)
    {
        
        try{
          
            $rol = Role::findOrFail($id);
             
            if(!is_null($rol)){
                 
                 $rol->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El rol ha sido eliminado!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El rol no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El rol no existe!!'
                 ], 300);
   
         }

        
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Role::destroy($ids);
                
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

    
}
