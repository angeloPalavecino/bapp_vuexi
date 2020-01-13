<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Illuminate\Http\Request;
use App\Models\Agendamientos;


class AgendamientosController extends Controller
{
    public function validator(array $data){ 

        return Validator::make($data, [
            // 'codificacion_id' => 'required',
             //'car_plan_id' => 'required',
             //'car_real_id' => 'required',
             //'drivers_plan_id' => 'required', 
             //'drivers_real_id' => 'required', 
             //'observaciones_id' => 'required', 
             //'observacionesinternas_id' => 'required', 
             'tipo' => 'required', 
             //'fecha' => 'required', 
             //'fecha_fin' => 'required', 
             'horario' => 'required', 
             //'horario_real' => 'required', 
             'tipo_fecha' => 'required', 
             //'detalle_observaciones' => 'required', 
             //'detalle_observacionesinternas' => 'required', 


         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $agendamientos = Agendamientos::join('codificaciones', 'agendamientos.codificacion_id', '=', 'codificaciones.id')
        ->join('sucursals', 'codificaciones.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
       // ->join('cars', 'agendamientos.car_plan_id', '=', 'cars.id')
       // ->join('drivers', 'agendamientos.drivers_plan_id', '=', 'drivers.id')
        ->join('horarios', 'agendamientos.horario_plan', '=', 'horarios.id')
        ->select(
            'codificaciones.id as codificacion_id',
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
            'codificaciones.direccion',
            'codificaciones.comuna',
            'codificaciones.email',
            'codificaciones.telefono',
            'codificaciones.centro_costo',
            'sucursals.nombre as sucursal',
            'empresas.razon_social',
            //'drivers.name as nombre_conductor_plan',
            //'drivers.lastname as apellido_conductor_plan',
            //'drivers.rut as rut_conductor_plan',
            'horarios.horario as horario_plan',
            //'cars.numero_movil as movil_plan',
            'agendamientos.id',
            'agendamientos.fecha_inicio',
            'agendamientos.fecha_fin',
            'agendamientos.tipo')
            ->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $agendamientos->toArray(),
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

        $datos = $request->all();
        $input = $datos[0];
        $codificaciones = $datos[1];

        $validation = $this->validator($input);

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }

        $tipo = $input['tipo'];
        $horario = $input['horario'];
        $tipo_fecha = $input['tipo_fecha'];
       
        if($tipo_fecha == 1){
            $fechas = explode(",", $input['fechas']);

            foreach ($codificaciones as $key => $codificacion) {
              
                //Borrar Permanentes y Mensual

                foreach ($fechas as $keyf => $fecha) {
                
                    Agendamientos::create(
                        array(
                                'codificacion_id'   => $codificacion['id'],
                                'horario_plan'      => $horario,
                                'tipo'              => $tipo,
                                'fecha_inicio'      => $fecha,
                                'fecha_fin'         => $fecha,
                                'tipo_fecha'        => $tipo_fecha,
                                
                            )
                        );

                }

            }

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Los registros se ha guardado exitosamente!!!'
                ], 200);


        }else if($tipo_fecha == 2){

            $ano = $input['ano'];
            $meses = $input['meses'];

            foreach ($codificaciones as $key => $codificacion) {
                
                //Borrar Permanente y Diarias

                foreach ($meses as $keym => $mes) {
                    $day = date("d", mktime(0,0,0, $mes+1, 0, $ano));
                    $fecha_inicio = date('Y-m-d', mktime(0,0,0, $mes, 1, $ano));
                    $fecha_fin = date('Y-m-d', mktime(0,0,0, $mes, $day, $ano));

                    Agendamientos::create(
                        array(
                                'codificacion_id'   => $codificacion['id'],
                                'horario_plan'      => $horario,
                                'tipo'              => $tipo,
                                'fecha_inicio'      => $fecha_inicio,
                                'fecha_fin'         => $fecha_fin,
                                'tipo_fecha'        => $tipo_fecha,
                                
                            )
                        );

                }

            }

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Los registros se ha guardado exitosamente!!!'
                ], 200);


        }else{

            $fecha_inicio = date("Y-m-d H:i:s");
            $fecha_fin = date("Y-m-d H:i:s", mktime(00, 00, 00, 12, 31, 2037));

            foreach ($codificaciones as $key => $codificacion) {
                
                //Borrar Diarias y Mensuales
               
                    Agendamientos::create(
                        array(
                                'codificacion_id'   => $codificacion['id'],
                                'horario_plan'      => $horario,
                                'tipo'              => $tipo,
                                'fecha_inicio'      => $fecha_inicio,
                                'fecha_fin'         => $fecha_fin,
                                'tipo_fecha'        => $tipo_fecha,
                                
                            )
                        );

            }

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Los registros se ha guardado exitosamente!!!'
                ], 200);


        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $agendamiento = Agendamientos::join('codificaciones', 'agendamientos.codificacion_id', '=', 'codificaciones.id')
        ->join('sucursals', 'codificaciones.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
       // ->join('cars', 'agendamientos.car_plan_id', '=', 'cars.id')
       // ->join('drivers', 'agendamientos.drivers_plan_id', '=', 'drivers.id')
        ->join('horarios', 'agendamientos.horario_plan', '=', 'horarios.id')
        ->select(
            'codificaciones.id as codificacion_id',
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
            'codificaciones.direccion',
            'codificaciones.comuna',
            'codificaciones.email',
            'codificaciones.telefono',
            'codificaciones.centro_costo',
            'sucursals.nombre as sucursal',
            'empresas.razon_social',
         //   'drivers.name as nombre_conductor',
         //   'drivers.lastname as apellido_conductor',
         //   'drivers.rut as rut_conductor',
            'horarios.horario as horario_plan',
         //   'cars.numero_movil as movil_plan',
            'agendamientos.id',
            'agendamientos.fecha_inicio',
            'agendamientos.fecha_fin',
            'agendamientos.tipo',
            'agendamientos.created_at',
            'agendamientos.updated_at')
            ->first('codificaciones.id', $id);
      
        return response()->json(
            [
                'status' => 'success',
                'item' => $agendamiento->toArray(),
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $agendamiento = Agendamientos::findOrFail($id);
             
            if(!is_null($agendamiento)){
                 
                 $agendamiento->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El agendamiento ha sido eliminado!!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El agendamiento no existe!!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El agendamiento no existe!!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Agendamientos::destroy($ids);
                
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
