<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use DateTime;
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
            'agendamientos.tipo',
            'agendamientos.tipo_fecha')
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
              
                foreach ($fechas as $keyf => $fecha) {

                     //Busca si existe ya el agendamiento diario
                    $count = Agendamientos::where('codificacion_id', $codificacion['id'])
                     ->where('horario_plan', $horario)
                     ->where('tipo', $tipo)
                     ->whereDate('fecha_inicio', $fecha)
                     ->whereDate('fecha_fin', $fecha)
                     ->where('tipo_fecha', $tipo_fecha)->count();

                     

                    if($count > 0) {

                        break;
                    
                    }else{
                        
                        //Borrar Permanente

                        $permanente = Agendamientos::where('codificacion_id', $codificacion['id'])
                        ->where('horario_plan', $horario)
                        ->where('tipo', $tipo)
                        ->where('tipo_fecha', 3)->delete();

                        //Borrar Mensual
                        //Obtiene mes y año de la fecha
                        $datetime = new DateTime($fecha);
                        $mes = $datetime->format('m');
                        $ano = $datetime->format('Y');

                        Agendamientos::where('codificacion_id', $codificacion['id'])
                        ->where('horario_plan', $horario)
                        ->where('tipo', $tipo)
                        ->whereMonth('fecha_inicio', $mes) 
                        ->whereYear('fecha_inicio', $ano) 
                        ->where('tipo_fecha', 2)->delete();
                
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

                foreach ($meses as $keym => $mes) {
                    $day = date("d", mktime(0,0,0, $mes+1, 0, $ano));
                    $fecha_inicio = date('Y-m-d', mktime(0,0,0, $mes, 1, $ano));
                    $fecha_fin = date('Y-m-d', mktime(0,0,0, $mes, $day, $ano));

                    //Busca si existe ya el agendamiento mensual
                    $count = Agendamientos::where('codificacion_id', $codificacion['id'])
                    ->where('horario_plan', $horario)
                    ->where('tipo', $tipo)
                    ->whereDate('fecha_inicio', $fecha_inicio)
                    ->whereDate('fecha_fin', $fecha_fin)
                    ->where('tipo_fecha', $tipo_fecha)->count();

                    
                    if($count > 0) {

                        break;
                    
                    }else{

                        //Borrar Permanente

                        Agendamientos::where('codificacion_id', $codificacion['id'])
                        ->where('horario_plan', $horario)
                        ->where('tipo', $tipo)
                        ->where('tipo_fecha', 3)->delete();
                        
                        //Borrar Diarias

                        Agendamientos::where('codificacion_id', $codificacion['id'])
                        ->where('horario_plan', $horario)
                        ->where('tipo', $tipo)
                        ->whereMonth('fecha_inicio', $mes) //Puede ser la fecha_fin o fecha_inicio, es la misma
                        ->whereYear('fecha_inicio', $ano) //Puede ser la fecha_fin o fecha_inicio, es la misma
                        ->where('tipo_fecha', 1)->delete();

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
                
                //Busca si existe ya el agendamiento permanente
                $count = Agendamientos::where('codificacion_id', $codificacion['id'])
                ->where('horario_plan', $horario)
                ->where('tipo', $tipo)
                ->where('tipo_fecha', $tipo_fecha)->count();

                if($count > 0) {

                    break;
                
                }else{

                    //Borrar todos los agendamientos
                    Agendamientos::where('codificacion_id', $codificacion['id'])
                    ->where('horario_plan', $horario)
                    ->where('tipo', $tipo)
                    ->whereIn('tipo_fecha', [1, 2, 3])->delete();

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
            'codificaciones.id as codificacion',
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
            'codificaciones.direccion',
            'codificaciones.comuna',
            'codificaciones.email',
            'codificaciones.telefono',
            'codificaciones.centro_costo',
            'sucursals.nombre as sucursal',
            'sucursals.id as sucursal_id',
            'empresas.razon_social',
            'empresas.id as empresa_id',
         //   'drivers.name as nombre_conductor',
         //   'drivers.lastname as apellido_conductor',
         //   'drivers.rut as rut_conductor',
            'horarios.horario as horario_plan',
         //   'cars.numero_movil as movil_plan',
            'agendamientos.id',
            'agendamientos.horario_plan as horario_id',
            'agendamientos.fecha_inicio',
            'agendamientos.fecha_fin',
            'agendamientos.tipo',
            'agendamientos.tipo_fecha',
            'agendamientos.created_at',
            'agendamientos.updated_at')
            ->where('agendamientos.id', $id)->first();
            
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
        
        $input = $request->all();
        
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
        $codificacion_id = $input['codificacion_id'];

        if($tipo_fecha == 1){

            $fecha = $input['fecha'];

            //Busca si existe ya el agendamiento diario
            $count = Agendamientos::where('horario_plan', $horario)
            ->where('tipo', $tipo)
            ->whereDate('fecha_inicio', $fecha)
            ->whereDate('fecha_fin', $fecha)
            ->where('tipo_fecha', $tipo_fecha)
            ->where('codificacion_id', $codificacion_id)
            ->where('id','!=', $id)->count();  
              
            if($count > 0) {
                
                return response()->json(
                    [
                        'status' => 'error',
                        'message' => 'La fecha ingresada ya existe!!!'
                    ], 300);

                }else{  

                //Borrar Mensual
                //Obtiene mes y año de la fecha
                $datetime = new DateTime($fecha);
                $mes = $datetime->format('m');
                $ano = $datetime->format('Y');

                Agendamientos::where('codificacion_id', $codificacion_id)
                ->where('horario_plan', $horario)
                ->where('tipo', $tipo)
                ->whereMonth('fecha_inicio', $mes) 
                ->whereYear('fecha_inicio', $ano) 
                ->where('tipo_fecha', 2)->delete();
                
                Agendamientos::where('id', $id)->update(
                    array(
                            'horario_plan'      => $horario,
                            'tipo'              => $tipo,
                            'fecha_inicio'      => $fecha,
                            'fecha_fin'         => $fecha,
                        )
                    );

                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'Los registros se han actualizado exitosamente!!!'

                    ], 200);


                
            }

        }else if($tipo_fecha == 2){

            $ano = $input['ano'];
            $mes = $input['mes'];
           
            $day = date("d", mktime(0,0,0, $mes+1, 0, $ano));
            $fecha_inicio = date('Y-m-d', mktime(0,0,0, $mes, 1, $ano));
            $fecha_fin = date('Y-m-d', mktime(0,0,0, $mes, $day, $ano));

            //Busca si existe ya el agendamiento mensual
            $count = Agendamientos::where('horario_plan', $horario)
                ->where('tipo', $tipo)
                ->whereDate('fecha_inicio', $fecha_inicio)
                ->whereDate('fecha_fin', $fecha_fin)
                ->where('tipo_fecha', $tipo_fecha)
                ->where('codificacion_id', $codificacion_id)
                ->where('id', '!=', $id)->count();

                    
            if($count > 0) {

                return response()->json(
                    [
                        'status' => 'error',
                        'message' => 'El mes ingresado ya existe!!!'
                    ], 300);
                    
            }else{

                        
                //Borrar Diarias

                Agendamientos::where('codificacion_id', $codificacion_id)
                    ->where('horario_plan', $horario)
                    ->where('tipo', $tipo)
                    ->whereMonth('fecha_inicio', $mes) //Puede ser la fecha_fin o fecha_inicio, es la misma
                    ->whereYear('fecha_inicio', $ano) //Puede ser la fecha_fin o fecha_inicio, es la misma
                    ->where('tipo_fecha', 1)->delete();

                    Agendamientos::where('id', $id)->update(
                        array(
                                'horario_plan'      => $horario,
                                'tipo'              => $tipo,
                                'fecha_inicio'      => $fecha_inicio,
                                'fecha_fin'         => $fecha_fin,
                            )
                    );


                    return response()->json(
                        [
                            'status' => 'success',
                            'message' => 'Los registros se han actualizado exitosamente!!!'
                    
                        ], 200);
            }


        }else{
                
            Agendamientos::where('id', $id)->update(
                    array(
                        'horario_plan'      => $horario,
                        'tipo'              => $tipo,
                        )
                    );
        
            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Los registros se han actualizado exitosamente!!!'
                ], 200);

        }
        

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
