<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\ServiciosKMS;
use App\Models\EmpresasHasServKMS;
use App\Models\Empresa;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ServiciosKMSController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'descripcion' => 'required',
             'cant_psjs' => 'required',
             'min_servicio' => 'required',
             'kms' => 'required',
             'min' => 'required',
             'bajada_bandera' => 'required',   
             'porticos' => 'required',   
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
          
            $item['cantidad'] = EmpresasHasServKMS::where('empresa_id', '=', $item->id)->count();
             
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

        $servkms = ServiciosKMS::create($inputs);

        EmpresasHasServKMS::create(array(
            'empresa_id'     => $request->empresa_id,
            'serv_kms_id'   => $servkms->id
        ));
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $servkms->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ServiciosKMS  $serviciosKMS
     * @return \Illuminate\Http\Response
     */
    public function show(ServiciosKMS $serviciosKMS, $id)
    {
        //$servkms = ServiciosKMS::find($id);
        
        $servkms = DB::table('servicios_k_m_s_s')
                ->join('empresas_has_serv_k_m_s_s', 'empresas_has_serv_k_m_s_s.serv_kms_id', '=', 'servicios_k_m_s_s.id')
                ->select(
                    'servicios_k_m_s_s.id',
                    'servicios_k_m_s_s.descripcion', 
                    'servicios_k_m_s_s.cant_psjs',
                    'servicios_k_m_s_s.min_servicio',
                    'servicios_k_m_s_s.kms',
                    'servicios_k_m_s_s.min',
                    'servicios_k_m_s_s.bajada_bandera', 
                    'servicios_k_m_s_s.porticos', 
                    'empresas_has_serv_k_m_s_s.empresa_id'
                    )
                ->where('servicios_k_m_s_s.id', '=', $id)
                ->get(); 


        return response()->json(
            [
                'status' => 'success',
                'item' => $servkms->toArray()
            ], 200);
    }

    public function listado($idEmpresa)
    {
            
        $servkms = EmpresasHasServKMS::with('servicioskms')->where('empresa_id', $idEmpresa)->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $servkms->toArray()
            ], 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ServiciosKMS  $serviciosKMS
     * @return \Illuminate\Http\Response
     */
    public function edit(ServiciosKMS $serviciosKMS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ServiciosKMS  $serviciosKMS
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

        $servkms = ServiciosKMS::where('id',$id)->first(); 

        //dd($observacion);

        if(!is_null($servkms)){
    
        $input = $request->all();

        $descripcion        = $input['descripcion'];
        $cant_psjs          = $input['cant_psjs'];
        $min_servicio       = $input['min_servicio'];
        $kms                = $input['kms'];
        $min                = $input['min'];
        $bajada_bandera     = $input['bajada_bandera'];
        $porticos           = $input['porticos'];


        $servkms = ServiciosKMS::where('id', $id)->update(array(
            'descripcion'             => $descripcion, 
            'cant_psjs'               => $cant_psjs, 
            'min_servicio'            => $min_servicio, 
            'kms'                     => $kms, 
            'min'                     => $min, 
            'bajada_bandera'          => $bajada_bandera,
            'porticos'                => $porticos
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
     * @param  \App\ServiciosKMS  $serviciosKMS
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            
            $servkms = ServiciosKMS::findOrFail($id);
            
            if(!is_null($servkms)){
                 
                $servkms->delete();
 
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
              
                ServiciosKMS::destroy($ids);
                
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
