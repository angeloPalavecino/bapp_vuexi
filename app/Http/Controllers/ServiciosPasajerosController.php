<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\ServiciosPasajeros;
use App\Models\EmpresasHasServPsjs;
use App\Models\Empresa;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ServiciosPasajerosController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'num_psj_min' => 'required',
             'num_psj_max' => 'required',
             'fac_rang_min' => 'required',
             'fac_rang_max' => 'required',
             'valor' => 'required',
             'fac_rang_fz1' => 'required',
             'valor_fz1' => 'required',
             'fac_rang_fz2' => 'required',
             'valor_fz2' => 'required',       
         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$empresas = Empresa::all();
        $empresas = Empresa::where('id', '>', 1)->get();

        foreach ($empresas as $key => $item) {
          
            $item['cantidad'] = EmpresasHasServPsjs::where('empresa_id', '=', $item->id)->count();
             
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

        $servpsj = ServiciosPasajeros::create($inputs);

        EmpresasHasServPsjs::create(array(
            'empresa_id'     => $request->empresa_id,
            'serv_psj_id'   => $servpsj->id
        ));
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $servpsj->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ServiciosPasajeros  $serviciosPasajeros
     * @return \Illuminate\Http\Response
     */
    public function show(ServiciosPasajeros $serviciosPasajeros, $id)
    {
        //$servpsj = ServiciosPasajeros::find($id);
        
        $servpsj = DB::table('servicios_pasajeros')
                ->join('empresas_has_serv_psjs', 'empresas_has_serv_psjs.serv_psj_id', '=', 'servicios_pasajeros.id')
                ->select(
                    'servicios_pasajeros.id',
                    'servicios_pasajeros.num_psj_min', 
                    'servicios_pasajeros.num_psj_max',
                    'servicios_pasajeros.fac_rang_min',
                    'servicios_pasajeros.fac_rang_max',
                    'servicios_pasajeros.valor',
                    'servicios_pasajeros.fac_rang_fz1', 
                    'servicios_pasajeros.valor_fz1', 
                    'servicios_pasajeros.fac_rang_fz2',
                    'servicios_pasajeros.valor_fz2',
                    'empresas_has_serv_psjs.empresa_id',
                    )
                ->where('servicios_pasajeros.id', '=', $id)
                ->get(); 

        return response()->json(
            [
                'status' => 'success',
                'item' => $servpsj->toArray()
            ], 200);
    }

    public function listado($idEmpresa)
    {
            
        $servpsjs = EmpresasHasServPsjs::with('serviciospasajeros')->where('empresa_id', $idEmpresa)->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $servpsjs->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ServiciosPasajeros  $serviciosPasajeros
     * @return \Illuminate\Http\Response
     */
    public function edit(ServiciosPasajeros $serviciosPasajeros)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ServiciosPasajeros  $serviciosPasajeros
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

        $servpsj = ServiciosPasajeros::where('id',$id)->first(); 

        //dd($observacion);

        if(!is_null($servpsj)){
    
        $input = $request->all();

        $num_psj_min = $input['num_psj_min'];
        $num_psj_max = $input['num_psj_max'];
        $fac_rang_min = $input['fac_rang_min'];
        $fac_rang_max = $input['fac_rang_max'];
        $valor = $input['valor'];
        $fac_rang_fz1 = $input['fac_rang_fz1'];
        $valor_fz1 = $input['valor_fz1'];
        $fac_rang_fz2 = $input['fac_rang_fz2'];
        $valor_fz2 = $input['valor_fz2'];


        $servpsj = ServiciosPasajeros::where('id', $id)->update(array(
            'num_psj_min'                   => $num_psj_min, 
            'num_psj_max'                   => $num_psj_max, 
            'fac_rang_min'                  => $fac_rang_min, 
            'fac_rang_max'                  => $fac_rang_max, 
            'valor'                         => $valor, 
            'fac_rang_fz1'                  => $fac_rang_fz1, 
            'valor_fz1'                     => $valor_fz1, 
            'fac_rang_fz2'                  => $fac_rang_fz2, 
            'valor_fz2'                     => $valor_fz2, 

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
     * @param  \App\ServiciosPasajeros  $serviciosPasajeros
     * @return \Illuminate\Http\Response
     */
    
    public function destroy($id)
    {
        try{
            
            $servpsj = ServiciosPasajeros::findOrFail($id);
            
            if(!is_null($servpsj)){
                 
                $servpsj->delete();
 
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
              
                ServiciosPasajeros::destroy($ids);
                
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
