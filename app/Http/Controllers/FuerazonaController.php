<?php

namespace App\Http\Controllers;
 
use Validator;
use DB;
use App\Models\Fuerazona;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FuerazonaController extends Controller
{
    public function validator(array $data){ 

        return Validator::make($data, [
             'sucursal_id' => 'required',
             'comuna' => 'required',   
             'tipo' => 'required',   
             'distancia' => 'required',          
         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$fuerazonas = Fuerazona::all();

        $fuerazonas = Fuerazona::join('sucursals', 'fuerazonas.sucursal_id', '=', 'sucursals.id')
                        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
                        ->select(
                            'fuerazonas.id',
                            'fuerazonas.distancia',
                            'fuerazonas.tipo',
                            'fuerazonas.comuna', 
                            'fuerazonas.sucursal_id', 
                            'sucursals.nombre', 
                            'empresas.razon_social as empresa'
                             )->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $fuerazonas->toArray(),
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
        $sucursal_id = $input['sucursal_id'];
        $comuna = strtoupper($input['comuna']);
        $tipo = strtoupper($input['tipo']);
        $distancia = $input['distancia'];

        $fuerazona = Fuerazona::create(
         array(
                 'sucursal_id'   => $sucursal_id, 
                 'comuna'   => $comuna, 
                 'tipo'   => $tipo, 
                 'distancia'   => $distancia 
              )
         );
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $fuerazona->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Fuerazona  $fuerazona
     * @return \Illuminate\Http\Response
     */
    public function show(Fuerazona $fuerazona, $id)
    {
        //$fuerazona = Fuerazona::find($id);

        $fuerazona = Fuerazona::join('sucursals', 'fuerazonas.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
        ->select(
            'fuerazonas.id',
            'fuerazonas.distancia',
            'fuerazonas.tipo',
            'fuerazonas.comuna', 
            'fuerazonas.sucursal_id', 
            'fuerazonas.created_at', 
            'fuerazonas.updated_at', 
            'sucursals.nombre', 
            'sucursals.empresa_id', 
            'empresas.razon_social as empresa'
             )
             ->where("fuerazonas.id" , $id)
             ->get();

        return response()->json(
            [
                'status' => 'success',
                'item' => $fuerazona->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Fuerazona  $fuerazona
     * @return \Illuminate\Http\Response
     */
    public function edit(Fuerazona $fuerazona)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Fuerazona  $fuerazona
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

        $fuerazona = Fuerazona::where('id',$id)->first(); 

        //dd($observacion);

        if(!is_null($fuerazona)){
    
            $input = $request->all();
            $sucursal_id = $input['sucursal_id'];
            $comuna = strtoupper($input['comuna']);
            $tipo =strtoupper( $input['tipo']);
            $distancia = $input['distancia'];

        $fuerazona = Fuerazona::where('id', $id)->update(
         array(
                    'sucursal_id'   => $sucursal_id, 
                    'comuna'   => $comuna, 
                    'tipo'   => $tipo, 
                    'distancia'   => $distancia 
              )
         );
            

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'El fuera de zona ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El fuera de zona no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Fuerazona  $fuerazona
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $fuerazona = Fuerazona::findOrFail($id);
             
            if(!is_null($fuerazona)){
                 
                 $fuerazona->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El fuera de zona ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El fuera de zona no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El fuera de zona no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Fuerazona::destroy($ids);
                
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
