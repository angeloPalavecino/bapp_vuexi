<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Observaciones;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ObservacionesController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'descripcion' => 'required',       
         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $observaciones = Observaciones::all();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $observaciones->toArray(),
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

        $input = $request->all();
        $descripcion = strtoupper($input['descripcion']);

        $observacion = Observaciones::create(
         array(
                 'descripcion'   => $descripcion 
              )
         );
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $observacion->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Observaciones  $observaciones
     * @return \Illuminate\Http\Response
     */
    public function show(Observaciones $observaciones, $id)
    {
        $observacion = Observaciones::find($id);
        return response()->json(
            [
                'status' => 'success',
                'item' => $observacion->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Observaciones  $observaciones
     * @return \Illuminate\Http\Response
     */
    public function edit(Observaciones $observaciones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Observaciones  $observaciones
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

        $observacion = Observaciones::where('id',$id)->first(); 

        //dd($observacion);

        if(!is_null($observacion)){
    
            $input = $request->all();
            $descripcion = strtoupper($input['descripcion']);

        $observacion = Observaciones::where('id', $id)->update(
         array(
                 'descripcion'                  => $descripcion 
              )
         );
            

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'La observacion ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'La observacion no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Observaciones  $observaciones
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $observacion = Observaciones::findOrFail($id);
             
            if(!is_null($observacion)){
                 
                 $observacion->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'La observacion ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'La observacion no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'La observacion no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Observaciones::destroy($ids);
                
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
