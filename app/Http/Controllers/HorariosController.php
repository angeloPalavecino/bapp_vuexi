<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use Illuminate\Http\Request;
use App\Models\Horarios;
use App\Models\Sucursal;
use App\Models\HorariosHasSucursales;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class HorariosController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'horario' => 'required',
             'habilitado' => 'required',
         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $horarios = Horarios::join('horarios_has_sucursales', 'horarios.id', '=', 'horarios_has_sucursales.horario_id')
        ->join('sucursals', 'horarios_has_sucursales.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
        ->select(
            'horarios.id',
            'horarios.horario',
            'horarios.habilitado',
            'sucursals.nombre as sucursal',
            'empresas.razon_social' )
            ->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $horarios->toArray(),
            ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

      /*  $existe_horario = Horarios::where('horario', $request['horario'])->first();
        if ($existe_horario != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El horario ya se encuentra registrado',
                ], 300);           
        }*/


        $input = $request->all();
        $horario = $input['horario'];
        $habilitado = $input['habilitado'];
        $sucursales = $input['sucursales'];


        $horario = Horarios::create(
            array(
                   'horario'       => $horario, 
                   'habilitado'    => $habilitado,
                 )
            );
            
        //AGREGA SUCURSALES AL GRUPO
        foreach ($sucursales as $keyres => $sucursal) {
            HorariosHasSucursales::create(array(
                'horario_id'      => $horario->id,
                'sucursal_id'     => $sucursal
            ));            
        }  
   
        return response()->json(
            [
                'status' => 'success',
                'item' => $horario->toArray()
            ], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
            //Datos Horarios
        
            $horario = Horarios::select(
                'horarios.id',
                'horarios.horario', 
                'horarios.habilitado',
                'horarios.created_at', 
                'horarios.updated_at' )
            ->where('horarios.id',$id)
            ->get();
    
            //Sucursales
    
            $sucursales = HorariosHasSucursales::join('sucursals', 'horarios_has_sucursales.sucursal_id', '=', 'sucursals.id')
            ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
            ->select(
                'sucursals.id',
                'sucursals.nombre', 
                'sucursals.direccion',
                'sucursals.matriz',
                'sucursals.lat',
                'sucursals.lng',
                'empresas.razon_social',
                'empresas.id as empresa_id')
                ->where('horarios_has_sucursales.horario_id',$id)
                ->get();

            return response()->json(
                [
                    'status' => 'success',
                    'item' => $horario->toArray(),
                    'sucursales' => $sucursales->toArray()
                ], 200);
                    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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

        $horario = Horarios::where('id',$id)->first(); 

        if(!is_null($horario)){
    
            $input = $request->all();
            $horario = $input['horario'];
            $habilitado = $input['habilitado'];
            $sucursales = $input['sucursales'];
           

        $horario = Horarios::where('id', $id)->update(
         array(
                'horario'       => $horario, 
                'habilitado'    => $habilitado,
              )
         );

         //ACTUALIZA SUCURSALES DEL HORARIO  

         HorariosHasSucursales::where('horario_id', $id)->delete();

         foreach ($sucursales as $keyres => $sucursal) {
            HorariosHasSucursales::create(array(
                 'horario_id'      => $id,
                 'sucursal_id'     => $sucursal
             ));                 
         }
        
            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'El horario ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El horario no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $horario = Horarios::findOrFail($id);
             
            if(!is_null($horario)){
                 
                 $horario->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El horario ha sido eliminado!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El horario no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El horario no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Horarios::destroy($ids);
                
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

    public function combo($id)
    {
        $horario = Horarios::select(
            'id',
            'horario' )->where('habilitado', 1 )->where('id','!=',$id)->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $horario->toArray()
            ], 200);
    }
}
