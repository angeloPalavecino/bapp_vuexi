<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\ServiciosPlanas;
use App\Models\EmpresasHasServPlanas;
use App\Models\Empresa;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ServiciosPlanasController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'minima' => 'required',
             'num_psj_min' => 'required',
             'num_psj_max' => 'required',
             'psj_adicional' => 'required',
             'fuera_zona_1' => 'required',
             'fuera_zona_2' => 'required',   
         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empresas = Empresa::where('id', '>', 1)->get();

        foreach ($empresas as $key => $item) {
          
            $item['cantidad'] = EmpresasHasServPlanas::where('empresa_id', '=', $item->id)->count();
             
         }

        return response()->json(
            [
                'status' => 'success',
                'items' => $empresas->toArray(),
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

        $inputs = $request->all();

        $servplanas = ServiciosPlanas::create($inputs);

        EmpresasHasServPlanas::create(array(
            'empresa_id'     => $request->empresa_id,
            'serv_planas_id'   => $servplanas->id
        ));
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $servplanas->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ServiciosPlanas  $serviciosPlanas
     * @return \Illuminate\Http\Response
     */
    public function show(ServiciosPlanas $serviciosPlanas, $id)
    {
        //$servplanas = ServiciosPlanas::find($id);
        
            
        $servplanas = DB::table('servicios_planas')
                ->join('empresas_has_serv_planas', 'empresas_has_serv_planas.serv_planas_id', '=', 'servicios_planas.id')
                ->select(
                    'servicios_planas.id',
                    'servicios_planas.minima', 
                    'servicios_planas.num_psj_min',
                    'servicios_planas.num_psj_max',
                    'servicios_planas.psj_adicional',
                    'servicios_planas.fuera_zona_1',
                    'servicios_planas.fuera_zona_2', 
                    'empresas_has_serv_planas.empresa_id'
                    )
                ->where('servicios_planas.id', '=', $id)
                ->get(); 

        return response()->json(
            [
                'status' => 'success',
                'item' => $servplanas->toArray()
            ], 200);
    }


    public function listado($idEmpresa)
    {
        $servplanas = EmpresasHasServPlanas::with('serviciosplanas')->where('empresa_id', $idEmpresa)->get();
        
        return response()->json(
            [
                'status' => 'success',
                'items' => $servplanas->toArray()
            ], 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ServiciosPlanas  $serviciosPlanas
     * @return \Illuminate\Http\Response
     */
    public function edit(ServiciosPlanas $serviciosPlanas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ServiciosPlanas  $serviciosPlanas
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

        $servplanas = ServiciosPlanas::where('id',$id)->first(); 

        //dd($observacion);

        if(!is_null($servplanas)){
    
        $input = $request->all();

        $num_psj_min = $input['num_psj_min'];
        $num_psj_max = $input['num_psj_max'];
        $minima = $input['minima'];
        $psj_adicional = $input['psj_adicional'];
        $fuera_zona_1 = $input['fuera_zona_1'];
        $fuera_zona_2 = $input['fuera_zona_2'];


        $servplanas = ServiciosPlanas::where('id', $id)->update(array(
            'num_psj_min'                   => $num_psj_min, 
            'num_psj_max'                   => $num_psj_max, 
            'minima'                        => $minima, 
            'psj_adicional'                 => $psj_adicional, 
            'fuera_zona_1'                  => $fuera_zona_1, 
            'fuera_zona_2'                  => $fuera_zona_2
         ));
            

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'El registro ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El registro no fue encontrado',
                ], 300);

           
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ServiciosPlanas  $serviciosPlanas
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            
            $servplanas = ServiciosPlanas::findOrFail($id);
            
            if(!is_null($servplanas)){
                 
                $servplanas->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El registro ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El registro no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El registro no existe!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
              
                ServiciosPlanas::destroy($ids);
                
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
