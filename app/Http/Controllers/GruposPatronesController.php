<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\GrupoPatron;
use App\Models\GrupoPatronHasPatrones;
use App\Models\GrupoPatronHasSucursales;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GruposPatronesController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'codigo' => 'required',   
             'descripcion' => 'required',   
             'fuerazona' => 'required',          
         ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$grupopatron = GrupoPatron::all();

        $grupopatron = GrupoPatron::join('grupo_patron_has_sucursales', 'grupo_patrons.id', '=', 'grupo_patron_has_sucursales.grupopatrones_id')
        ->join('sucursals', 'grupo_patron_has_sucursales.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
        ->select(
            'grupo_patrons.id',
            'grupo_patrons.codigo', 
            'grupo_patrons.descripcion',
            'grupo_patrons.fuerazona',
            'grupo_patrons.created_at', 
            'grupo_patrons.updated_at', 
            'sucursals.nombre as sucursal', 
            'empresas.razon_social' )
            ->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $grupopatron->toArray(),
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

        $existe_codigo = GrupoPatron::where('codigo', $request['codigo'])->first();
        if ($existe_codigo != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El codigo ya se encuentra registrado',
                ], 300);           
        }

        $input = $request->all();
        $codigo = $input['codigo'];
        $descripcion = $input['descripcion'];
        $fuerazona = $input['fuerazona'];
        $patrones = $input['patrones'];
        $sucursales = $input['sucursales'];

        $grupopatron = GrupoPatron::create(
         array(
            
                'codigo'   => $codigo, 
                'descripcion'   => $descripcion, 
                'fuerazona'   => $fuerazona,              
              )
         );

         //AGREGA PATRONES AL GRUPO
         foreach ($patrones as $keyres => $patron) {
            GrupoPatronHasPatrones::create(array(
                'grupopatrones_id'      => $grupopatron->id,
                'patron_id'             => $patron
            ));            
        }  
        
        //AGREGA SUCURSALES AL GRUPO
        foreach ($sucursales as $keyres => $sucursal) {
            GrupoPatronHasSucursales::create(array(
                'grupopatrones_id'      => $grupopatron->id,
                'sucursal_id'           => $sucursal
            ));            
        }  

         return response()->json(
            [
                'status' => 'success',
                'item' => $grupopatron->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\GrupoPatron  $grupoPatron
     * @return \Illuminate\Http\Response
     */
    public function show(GrupoPatron $grupoPatron,$id)
    {
        //$grupopatron = GrupoPatron::find($id);
        
        //Datos Grupo de patrones
        
        $grupopatron = GrupoPatron::select(
            'grupo_patrons.id',
            'grupo_patrons.codigo', 
            'grupo_patrons.descripcion',
            'grupo_patrons.fuerazona',
            'grupo_patrons.created_at', 
            'grupo_patrons.updated_at' )
            ->where('grupo_patrons.id',$id)
            ->get();

        //Sucursales

        $sucursales = GrupoPatronHasSucursales::join('sucursals', 'grupo_patron_has_sucursales.sucursal_id', '=', 'sucursals.id')
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
            ->where('grupo_patron_has_sucursales.grupopatrones_id',$id)
            ->get();
                
        //Patrones

        $patrones = GrupoPatronHasPatrones::join('patrons', 'grupo_patron_has_patrones.patron_id', '=', 'patrons.id')
        ->select(
            'patrons.id',
            'patrons.codigo', 
            'patrons.descripcion',
            'patrons.color',
            'patrons.lat', 
            'patrons.lng' )
            ->where('grupo_patron_has_patrones.grupopatrones_id',$id)
            ->get();

        return response()->json(
            [
                'status' => 'success',
                'item' => $grupopatron->toArray(),
                'patrones' => $patrones->toArray(),
                'sucursales' => $sucursales->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\GrupoPatron  $grupoPatron
     * @return \Illuminate\Http\Response
     */
    public function edit(GrupoPatron $grupoPatron)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GrupoPatron  $grupoPatron
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

        $grupopatron = GrupoPatron::where('id',$id)->first(); 


        if(!is_null($grupopatron)){
    
            $input = $request->all();
            $codigo = $input['codigo'];
            $descripcion = $input['descripcion'];
            $fuerazona = $input['fuerazona'];
            $patrones = $input['patrones'];
            $sucursales = $input['sucursales'];
           

        $grupopatron = GrupoPatron::where('id', $id)->update(
         array(
            
                'codigo'   => $codigo, 
                'descripcion'   => $descripcion, 
                'fuerazona'   => $fuerazona, 
              )
         );


        //ACTUALIZA PATRONES AL GRUPO  

        GrupoPatronHasPatrones::where('grupopatrones_id', $id)->delete();

        foreach ($patrones as $keyres => $patron) {
            GrupoPatronHasPatrones::create(array(
                'grupopatrones_id'      => $id,
                'patron_id'             => $patron
            ));                 
        }

         //ACTUALIZA SUCURSALES AL GRUPO  

         GrupoPatronHasSucursales::where('grupopatrones_id', $id)->delete();

         foreach ($sucursales as $keyres => $sucursal) {
            GrupoPatronHasSucursales::create(array(
                 'grupopatrones_id'      => $id,
                 'sucursal_id'             => $sucursal
             ));                 
         }



        
            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'El grupo de patrones ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El grupo de patrones no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GrupoPatron  $grupoPatron
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $grupopatron = GrupoPatron::findOrFail($id);
             
            if(!is_null($grupopatron)){
                 
                 $grupopatron->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El grupo de patrones ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El grupo de patrones no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El grupo de patrones no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                GrupoPatron::destroy($ids);
                
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
        $grupopatron = GrupoPatron::select(
            'id',
            'codigo' )->where('id','!=',$id)->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $grupopatron->toArray()
            ], 200);
    }

    public function codigos($id)
    {
        $grupopatron = GrupoPatronHasSucursales::join('sucursals', 'grupo_patron_has_sucursales.sucursal_id', '=', 'sucursals.id')
        ->join('grupo_patrons', 'grupo_patron_has_sucursales.grupopatrones_id', '=', 'grupo_patrons.id')
        ->select(
            'grupo_patrons.id',
            'grupo_patrons.codigo')->where('grupo_patron_has_sucursales.sucursal_id',$id)->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $grupopatron->toArray()
            ], 200);
    }
    
}
