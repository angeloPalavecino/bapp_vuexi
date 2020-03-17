<?php

namespace App\Http\Controllers;

use Validator;
use DateTime;
use App\Models\Empresa;
use App\Models\Responsable;
use App\Models\Sucursal;
use App\Models\Ciclofacturacion;
use App\Models\Cicloproduccion;

use App\Models\ServiciosPasajeros;
use App\Models\ServiciosPlanas;
use App\Models\ServiciosKMS;

use App\Models\EmpresasHasServKMS;
use App\Models\EmpresasHasServPlanas;
use App\Models\EmpresasHasServPsjs;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EmpresaController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'rut' => 'required',
             'dv' => 'required',
             'razon_social' => 'required',  
             'hora_max_agendamiento' => 'required',              
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
        //dd($request->all());
        $datos = $request->all();
        $empresa = $datos[0];
        //$servicioplana = $datos[1];
        //$serviciopasajero = $datos[2];
        //$serviciokm = $datos[3];
        $responsables = $datos[1];
        $sucursales = $datos[2];
        $cicfac = $datos[3];
        $cicprod = $datos[4];
        
        //Valida datos empresa
        $validation = $this->validator( $empresa);

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }

        //Agrega Empresa
        $rut = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $empresa['rut']));
        $dv = strtoupper($empresa['dv']);
        $razon_social = strtoupper($empresa['razon_social']);
        $giro = strtoupper($empresa['giro']);
        $d = new DateTime($empresa['fecha_incorporacion']);
        $fecha_incorporacion = $d->format('Y-m-d');
        $habilitado =  $empresa['habilitado'];
        $hora_max_agendamiento =  $empresa['hora_max_agendamiento'];
       

        $existe_empresa = Empresa::where('rut', $rut)->first();
        if ($existe_empresa != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El rut ya se encuentra registrado',
                ], 300);           
        }

        
     
        $emp = Empresa::create(
         array(
                 'rut'                  => $rut,
                 'dv'                   => $dv,
                 'razon_social'         => $razon_social,
                 'giro'                 => $giro,
                 'fecha_incorporacion'  => $fecha_incorporacion,
                 'habilitado'           => $habilitado,
                 'hora_max_agendamiento'=> $hora_max_agendamiento 
              )
         );

     
        //Agrega Ciclo Produccion
        $cicprod["empresa_id"] =  $emp->id;
        $tcicprod = Cicloproduccion::create($cicprod);

        //Agrega Ciclo Facturacion
        $cicfac["empresa_id"] =  $emp->id;
        $tcicfac = Ciclofacturacion::create($cicfac);
      

        //Agrega Sucursales
         $auxSuc = array();
         
         foreach ($sucursales as $key => $itemsuc) {
            try {
                $direccion = $itemsuc['direccion'];  
                //$geocode = Geocoder::geocode($direccion)->get()->first();
                $geocode = app('geocoder')->geocode($direccion)->get()->first();
                if($geocode){
                    $itemsuc['lat'] = $geocode->getCoordinates()->getLatitude();
                    $itemsuc['lng'] = $geocode->getCoordinates()->getLongitude();
                }else{
                    $itemsuc['lat'] = null;
                    $itemsuc['lng'] = null;                  

                }
              } catch (Exception $e) {
                $itemsuc['lat'] = null;
                $itemsuc['lng'] = null;
            }         
            $itemsuc["empresa_id"] = $emp->id;
            $itemsuc["direccion"] = strtoupper($itemsuc['direccion']);
            $itemsuc["nombre"] = strtoupper($itemsuc['nombre']);
            $sucur = Sucursal::create($itemsuc);
            array_push($auxSuc,$sucur); 
         }
         

         //Agrega Responsables
         $auxRes = array();

         foreach ($responsables as $key => $itemres) {
            $itemres["empresa_id"] = $emp->id;
            $itemres["name"] = strtoupper($itemres['name']);
            $respon = Responsable::create($itemres);
            array_push($auxRes,$respon); 
         }

        
        
         return response()->json(
            [
                'status' => 'success',
                'item' => $emp->toArray()
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function show(Empresa $empresa, $id)
    {
        $empresa = Empresa::find($id);
        $responsables = Responsable::where('empresa_id', $id)->get();
        $sucursales = Sucursal::where('empresa_id', $id)->get();
        $cicfac = Ciclofacturacion::where('empresa_id', $id)->get();
        $cicpro = Cicloproduccion::where('empresa_id', $id)->get();


        return response()->json(
            [
                'status' => 'success',
                'item' => $empresa->toArray(),
                'responsables' => $responsables->toArray(),
                'sucursales' => $sucursales->toArray(),
                'cicfac' => $cicfac->toArray(),
                'cicpro' => $cicpro->toArray(),
                
            ], 200);
    }

    public function combo()
    {
        $empresas = Empresa::select(
            'empresas.id as id',
            'empresas.razon_social as label',
            'empresas.razon_social as value' )->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $empresas->toArray()
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function edit(Empresa $empresa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $datos = $request->all();
        $empresa = $datos[0];
        //$servicioplana = $datos[1];
        //$serviciopasajero = $datos[2];
        //$serviciokm = $datos[3];
        $responsables = $datos[1];
        $sucursales = $datos[2];
        $cicfac = $datos[3];
        $cicprod = $datos[4];

        $validation = $this->validator($empresa);

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }
        $emp = Empresa::where('id',$id)->first(); 

        if(!is_null($emp)){

        //Actualizar Ciclo Produccion
        Cicloproduccion::where('id', $cicprod['id'])->update($cicprod);
      
        //Actualizar Ciclo Facturacion
        Ciclofacturacion::where('id', $cicfac['id'])->update($cicfac);

         //Actualiza Sucursal   
        $auxsuc = array_column($sucursales, 'id');
        Sucursal::whereNotIn('id', $auxsuc)->delete();
        foreach ($sucursales as $keysuc => $itemsuc) {    
           try {
            $direccion = $itemsuc['direccion'];   
              //$geocode = Geocoder::geocode($direccion)->get()->first();
              $geocode = app('geocoder')->geocode($direccion)->get()->first();
            if($geocode){
                $itemsuc['lat'] = $geocode->getCoordinates()->getLatitude();
                $itemsuc['lng'] = $geocode->getCoordinates()->getLongitude();
            }else{
                $itemsuc['lat'] = null;
                $itemsuc['lng'] = null;                  

            }
            } catch (Exception $e) {
              $itemsuc['lat'] = null;
              $itemsuc['lng'] = null;
           }
           $itemsuc["direccion"] = strtoupper($itemsuc['direccion']);
           $itemsuc["nombre"] = strtoupper($itemsuc['nombre']);

           if (isset($itemsuc['id'])) {
                Sucursal::where('id', $itemsuc['id'])->update($itemsuc);
            }else{
                $itemsuc['empresa_id'] = $id;
                Sucursal::create($itemsuc);
            }
        }

        //Actualiza Responsable   
        $auxres = array_column($responsables, 'id');
        Responsable::whereNotIn('id', $auxres)->delete();
        foreach ($responsables as $keyres => $itemres) {
            $itemres["name"] = strtoupper($itemres['name']);
            if (isset($itemres['id'])) {
                
                Responsable::where('id', $itemres['id'])->update($itemres);
            }else{
                $itemres['empresa_id'] = $id;
                Responsable::create($itemres);
            }
            
        }

        $d = new DateTime($empresa['fecha_incorporacion']);

        //dd( $d->format('Y-m-d'));

        //Actualizar Empresa   
        Empresa::where('id', $id)->update(
         array(
                'rut'                  => strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $empresa['rut'])),
                'dv'                   => strtoupper($empresa['dv']),
                'razon_social'         => strtoupper($empresa['razon_social']),
                'giro'                 => strtoupper($empresa['giro']),
                'habilitado'           => $empresa['habilitado'],
                'fecha_incorporacion'  => $d->format('Y-m-d'),
                'hora_max_agendamiento'=> $empresa['hora_max_agendamiento'], 
              )
         );
            
       
            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'La empresa ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El empresa no fue encontrado',
                ], 300);

           
        }
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $empresa = Empresa::findOrFail($id);

            $servpsjs = EmpresasHasServPsjs::where('empresa_id', $id)->get();
            $servplanas = EmpresasHasServPlanas::where('empresa_id', $id)->get();
            $servkms = EmpresasHasServKMS::where('empresa_id', $id)->get();

            $idsservpsjs = array_column($servpsjs->toArray(), 'serv_psj_id'); 
            $idsservplanas = array_column($servplanas->toArray(), 'serv_planas_id'); 
            $idsservkms = array_column($servkms->toArray(), 'serv_kms_id'); 

                         
            if(!is_null($empresa)){
                 
               
                ServiciosPasajeros::destroy($idsservpsjs);
                ServiciosPlanas::destroy($idsservplanas);
                ServiciosKMS::destroy($idsservkms);
 
                $empresa->delete();
          
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'La empresa ha sido eliminada!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'La empresa no existe!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'La empresa no existe!!'
                 ], 300);
   
         }
 
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');

        $servpsjs = EmpresasHasServPsjs::whereIn('empresa_id', $ids)->get();
        $servplanas = EmpresasHasServPlanas::whereIn('empresa_id', $ids)->get();
        $servkms = EmpresasHasServKMS::whereIn('empresa_id', $ids)->get();

        $idsservpsjs = array_column($servpsjs->toArray(), 'serv_psj_id'); 
        $idsservplanas = array_column($servplanas->toArray(), 'serv_planas_id'); 
        $idsservkms = array_column($servkms->toArray(), 'serv_kms_id'); 
        
        try{

            if(count($ids) > 0 ){       
                
                ServiciosPasajeros::destroy($idsservpsjs);
                ServiciosPlanas::destroy($idsservplanas);
                ServiciosKMS::destroy($idsservkms);
                
                Empresa::destroy($ids);
                
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

    public function otros($id)
    {

        $empresa = Empresa::findOrFail($id);
        $responsables = Responsable::where('empresa_id', $id)->get();
        $sucursales = Sucursal::where('empresa_id', $id)->get();
        $cicfac = Ciclofacturacion::where('empresa_id', $id)->get();
        $cicpro = Cicloproduccion::where('empresa_id', $id)->get();

        return response()->json(
            [
                'status' => 'success',
                'responsables' => $responsables->toArray(),
                'sucursales' => $sucursales->toArray(),
                'cicfac' => $cicfac->toArray(),
                'cicpro' => $cicpro->toArray(),
            ], 200);
    }

    public function listemp()
    {
        $empresas = Empresa::all();
         
          return response()->json(
              [
                  'status' => 'success',
                  'items' => $empresas->toArray(),
              ], 200);
    }
}
