<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Patron;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PatronesController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'codigo' => 'required',
             'descripcion' => 'required',
             'color' => 'required', 
             'lat' => 'required', 
             'lng' => 'required', 

         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $patrones = Patron::all();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $patrones->toArray(),
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

        $existe_codigo = Patron::where('codigo', $request['codigo'])->first();
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
        $color = $input['color'];
        $lat = $input['lat'];
        $lng = $input['lng'];
    
        $patron = Patron::create(
         array(
                 'codigo'   => $codigo,
                 'descripcion' => $descripcion,
                 'color'   => $color, 
                 'lat'   => $lat, 
                 'lng'   => $lng,                 
              )
         );
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $patron->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Patron  $patron
     * @return \Illuminate\Http\Response
     */
    public function show(Patron $patron, $id)
    {
        $patron = Patron::find($id);
        return response()->json(
            [
                'status' => 'success',
                'item' => $patron->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Patron  $patron
     * @return \Illuminate\Http\Response
     */
    public function edit(Patron $patron)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Patron  $patron
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

        $patron = Patron::where('id',$id)->first(); 


        if(!is_null($patron)){
    
            $input = $request->all();
            $codigo = $input['codigo'];
            $descripcion = $input['descripcion'];
            $color = $input['color'];
            $lat = $input['lat'];
            $lng = $input['lng'];
           

        $patron = Patron::where('id', $id)->update(
         array(
                'codigo'   => $codigo, 
                'descripcion' => $descripcion,
                'color'   => $color, 
                'lat'   => $lat, 
                'lng'   => $lng, 
              )
         );
            

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'El patron ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El patron no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Patron  $patron
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        try{
          
            $patron = Patron::findOrFail($id);
             
            if(!is_null($patron)){
                 
                 $patron->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El patron ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El patron no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El patron no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Patron::destroy($ids);
                
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
              
            $patrones = Patron::select(
                'id',
                'codigo',
                'lat',
                'lng',
                'color',
                'descripcion' )->where('id', '!=',$id)->get();
               
       
        
        return response()->json(
            [
                'status' => 'success',
                'items' => $patrones->toArray()
            ], 200);
    }
}
