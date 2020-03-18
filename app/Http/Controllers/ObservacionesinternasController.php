<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Observacionesinternas;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ObservacionesinternasController extends Controller
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
        $obsinternas = Observacionesinternas::all();
      
        //$user = User::findOrFail('1');
        //$user->syncRoles('1');

        return response()->json(
            [
                'status' => 'success',
                'items' => $obsinternas->toArray(),
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

        $obsinterna = Observacionesinternas::create(
         array(
                 'descripcion'   => $descripcion 
              )
         );
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $obsinterna->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Observacionesinternas  $observacionesinternas
     * @return \Illuminate\Http\Response
     */
    public function show(Observacionesinternas $observacionesinternas, $id)
    {
        $obsinterna = Observacionesinternas::find($id);
        return response()->json(
            [
                'status' => 'success',
                'item' => $obsinterna->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Observacionesinternas  $observacionesinternas
     * @return \Illuminate\Http\Response
     */
    public function edit(Observacionesinternas $observacionesinternas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Observacionesinternas  $observacionesinternas
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

        $obsinterna = Observacionesinternas::where('id',$id)->first(); 

        if(!is_null($obsinterna)){
    
            $input = $request->all();
            $descripcion = strtoupper($input['descripcion']);

        $obsinterna = Observacionesinternas::where('id', $id)->update(
         array(
                 'descripcion'                  => $descripcion 
              )
         );
            

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'La observacion interna ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'La observacion interna no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Observacionesinternas  $observacionesinternas
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $obsinterna = Observacionesinternas::findOrFail($id);
             
            if(!is_null($obsinterna)){
                 
                 $obsinterna->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'La observacion interna ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'La observacion interna no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'La observacion interna no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Observacionesinternas::destroy($ids);
                
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
