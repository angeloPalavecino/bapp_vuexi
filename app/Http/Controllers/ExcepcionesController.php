<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Excepciones;
use App\Http\Controllers\Geocoder;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExcepcionesController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'rut' => 'required',       
             'direccion' => 'required', 
             'comuna' => 'required',     
             'sucursal_id' => 'required',    
             
         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$excepciones = Excepciones::all();

        $excepciones = Excepciones::join('sucursals', 'excepciones.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
        ->select(
            'excepciones.id',
            'excepciones.rut',
            'excepciones.direccion',
            'excepciones.comuna', 
            'excepciones.sucursal_id', 
            'excepciones.lat', 
            'excepciones.lng', 
            'sucursals.nombre', 
            'empresas.razon_social as empresa'
             )->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $excepciones->toArray(),
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
        $rut = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $input['rut'])); 
        $direccion = $input['direccion'];
        $comuna = $input['comuna'];
        $sucursal_id = $input['sucursal_id'];

        $existe_excepcion = Excepciones::where('rut', $rut)->first();
        if ($existe_excepcion != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El rut ya se encuentra registrado',
                ], 300);           
        }
        
        $lat = isset($input['lat']) ? $input['lat'] : null;
        $lng = isset($input['lng']) ? $input['lng'] : null;
        
        if(empty($lat) || $lat == " " || empty($lng) || $lng == " ") {

                $direccion_completa = strtoupper($direccion);

                try {
                    
                
                    $geocode = app('geocoder')->geocode($direccion_completa)->get()->first();
                
                    if($geocode){

                        $lat = $geocode->getCoordinates()->getLatitude();
                        $lng = $geocode->getCoordinates()->getLongitude();

                    }else{

                        return response()->json(
                            [
                                'status' => 'error',
                                'message' => 'Error al determinar las coordenadas de la direccion.',
                        ], 300);

                    }
                    
        
                } catch (Exception $e) {
                    
                    return response()->json(
                        [
                            'status' => 'error',
                            'message' => 'Error al determinar las coordenadas de la direccion.',
                    ], 300);
                }
        }

        $excepcion = Excepciones::create(
         array(
                 'rut'   => $rut,
                 'direccion'   => $direccion,
                 'comuna'   => $comuna, 
                 'sucursal_id' => $sucursal_id,
                 'lat'   => $lat,
                 'lng'   => $lng 
              )
         );
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $excepcion->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Excepciones  $excepciones
     * @return \Illuminate\Http\Response
     */
    public function show(Excepciones $excepciones, $id)
    {
        //$excepcion = Excepciones::find($id);

        $excepcion = Excepciones::join('sucursals', 'excepciones.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
        ->select(
            'excepciones.id',
            'excepciones.rut',
            'excepciones.direccion',
            'excepciones.comuna', 
            'excepciones.sucursal_id', 
            'excepciones.lat', 
            'excepciones.lng', 
            'excepciones.created_at', 
            'excepciones.updated_at', 
            'sucursals.nombre', 
            'sucursals.empresa_id', 
            'empresas.razon_social as empresa'
             )->where("excepciones.id" , $id)->get();


        return response()->json(
            [
                'status' => 'success',
                'item' => $excepcion->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Excepciones  $excepciones
     * @return \Illuminate\Http\Response
     */
    public function edit(Excepciones $excepciones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Excepciones  $excepciones
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

        $excepcion = Excepciones::where('id',$id)->first(); 

        //dd($observacion);

        if(!is_null($excepcion)){
    
            $input = $request->all();
            $rut = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $input['rut'])); 
            $direccion = $input['direccion'];
            $comuna = $input['comuna'];
            $sucursal_id = $input['sucursal_id'];

            $lat = isset($input['lat']) ? $input['lat'] : null;
            $lng = isset($input['lng']) ? $input['lng'] : null;
            
            if(empty($lat) || $lat == " " || empty($lng) || $lng == " ") {

                    $direccion_completa = strtoupper($direccion);
                    
                    try {

                        $geocode = app('geocoder')->geocode($direccion_completa)->get()->first();
                        if($geocode){
            
                            $lat = $geocode->getCoordinates()->getLatitude();
                            $lng = $geocode->getCoordinates()->getLongitude();
            
                        }else{
            
                            return response()->json(
                                [
                                    'status' => 'error',
                                    'message' => 'Error al determinar las coordenadas de la direccion.',
                            ], 300);
            
                        }
                        
            
                    } catch (Exception $e) {
                        
                        return response()->json(
                            [
                                'status' => 'error',
                                'message' => 'Error al determinar las coordenadas de la direccion.',
                        ], 300);
                    }    
            }     

        $excepcion = Excepciones::where('id', $id)->update(
         array(
                    'rut'   => $rut,
                    'direccion'   => $direccion,
                    'comuna'   => $comuna,
                    'sucursal_id' => $sucursal_id,                    
                    'lat'   => $lat,
                    'lng'   => $lng 
              )
         );
            

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'La excepcion ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'La excepcion no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Excepciones  $excepciones
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $excepcion = Excepciones::findOrFail($id);
             
            if(!is_null($excepcion)){
                 
                 $excepcion->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'La excepcion ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'La excepcion no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'La excepcion no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Excepciones::destroy($ids);
                
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
