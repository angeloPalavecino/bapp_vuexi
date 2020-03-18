<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use DateTime;
use Illuminate\Http\Request;
use App\Models\Agendamientos;
use App\Models\Codificaciones;
use App\Models\Horarios;
use App\Models\HorariosHasSucursales;

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
             'fechas' => 'required', 
             'codificacion' => 'required', 
             //'fecha_fin' => 'required', 
             'horario_id' => 'required', 
             //'horario_real' => 'required', 
             //'tipo_fecha' => 'required', 
             //'detalle_observaciones' => 'required', 
             //'detalle_observacionesinternas' => 'required', 


         ]);
    }

    public function validatoredit(array $data){ 

        return Validator::make($data, [
            // 'codificacion_id' => 'required',
             //'car_plan_id' => 'required',
             //'car_real_id' => 'required',
             //'drivers_plan_id' => 'required', 
             //'drivers_real_id' => 'required', 
             //'observaciones_id' => 'required', 
             //'observacionesinternas_id' => 'required', 
             'tipo' => 'required', 
             'fecha' => 'required', 
             'codificacion' => 'required', 
             //'fecha_fin' => 'required', 
             'horario_id' => 'required', 
             //'horario_real' => 'required', 
             //'tipo_fecha' => 'required', 
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
            'empresas.hora_max_agendamiento',
            //'drivers.name as nombre_conductor_plan',
            //'drivers.lastname as apellido_conductor_plan',
            //'drivers.rut as rut_conductor_plan',
            'horarios.horario as horario_plan',
            'horarios.id as horario_id',
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
        $input = $datos['event'];
      
        $validation = $this->validator($input);

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }

        $tipo = strtoupper($input['tipo']);
        $horario = $input['horario_id'];
        $fechas = $input['fechas'];
        $codificacion = $input['codificacion'];


        foreach ($fechas as $key => $fecha) {

                $agendamiento = Agendamientos::where('horario_plan', $horario)
                                //->where('tipo', $tipo)
                                ->whereDate('fecha_inicio', $fecha)
                                ->whereDate('fecha_fin', $fecha)
                                //->where('tipo_fecha', 1)
                                ->where('codificacion_id', $codificacion)->first();  

                    if($agendamiento) {

                        return response()->json(
                            [
                                'status' => 'error',
                                'message' => 'El horario ya se encuentra codificado'
                            ], 300);
                    
                        }else{
                    //INSERTA
                    $horario_text = Horarios::where('id', $horario)->value('horario'); 
                    $fecha_aux = new DateTime($fecha." ".$horario_text);
                        
                    $aux = Agendamientos::create(
                            array(
                                    'codificacion_id'   => $codificacion,
                                    'horario_plan'      => $horario,
                                    'tipo'              => $tipo,
                                    'fecha_inicio'      => $fecha_aux,
                                    'fecha_fin'         => $fecha_aux,
                                    'tipo_fecha'        => 1,
                                    'usuario_id'        => 1)//Auth::user()->id
                                );
                        }

        }
                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'Los registros se ha guardado exitosamente!!!',
                        //'id' => $aux['id']
                    ], 200);
    
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
        ->join('users', 'agendamientos.usuario_id', '=', 'users.id')
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
            'empresas.hora_max_agendamiento',
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
            'agendamientos.updated_at',
            'users.name as nombre_usuario',
            'users.lastname as apellido_usuario')
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
        
        $datos = $request->all();
        $input = $datos['event'];
        
        $validation = $this->validatoredit($input);

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }

       
        $tipo = strtoupper($input['tipo']);
        $horario = $input['horario_id'];
        $horario_text = Horarios::where('id', $horario)->value('horario'); 
        $fechas = explode(" ", $input['fecha']);
        $fecha = new DateTime($fechas[0]." ".$horario_text); //new DateTime($input['fecha']);
        $codificacion = $input['codificacion'];

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
                'message' => 'El registro se ha guardado exitosamente!!!',
                'fecha' => $fecha
            ], 200);

    }

    public function drag(Request $request, $id)
    {
        
        $datos = $request->all();
        $input = $datos['event'];
        
        $validation = $this->validatoredit($input);

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }

    
        $tipo = strtoupper($input['tipo']);
        $horario = $input['horario_id'];
        $horario_text = Horarios::where('id', $horario)->value('horario'); 
        $fechas = explode("T", $input['fecha']);
        $fecha = new DateTime($fechas[0]." ".$horario_text); //new DateTime($input['fecha']);
        $codificacion = $input['codificacion'];

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
                'message' => 'El registro se ha guardado exitosamente!!!',
                'fecha' => $fecha
            ], 200);

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

    function limpiar_string($string)
    {
 
    $string = trim($string);
    
    $string = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
        $string
    );
 
    $string = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
        $string
    );
 
    $string = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î','Í'),
        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I','I'),
        $string
    );

    $string = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
        $string
    );
 
    $string = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
        $string
    );
 
    $string = str_replace(
        array('ñ', 'Ñ', 'ç', 'Ç'), //'ñ', 'Ñ',
        array('Ñ', 'Ñ', 'c', 'C'),//'n', 'N',
        $string
    );
 
    //Esta parte se encarga de eliminar cualquier caracter extraño
    $string = str_replace(
            array("¨", "º", "-", "~", "#", "@",'"', "|", "!",
            "·", "$", "%", "&", "/", "(", ")", "?", "'", "¡",
            "¿", "[", "^", "<code>", "]", "+", "}", "{", "¨",
            "´", ">", "< ", ";", ",", ":","."),
        '',
        $string
    );
 
 
        return $string;

    }

    function validar_fecha($fecha){
        $valores = explode('/', $fecha);
        if(count($valores) == 3 && checkdate($valores[1], $valores[0], $valores[2])){
            return true;
        }
        return false;
    }

    function validaRut($rut){

        if (!preg_match("/^[0-9.]+[-]?+[0-9kK]{1}/", $rut)) {
            return false;
        }

        if(strpos($rut,"-")==false){
            $RUT[0] = substr($rut, 0, -1);
            $RUT[1] = substr($rut, -1);
        }else{
            $RUT = explode("-", trim($rut));
        }
        $elRut = str_replace(".", "", trim($RUT[0]));
        $factor = 2;
        $suma = 0;
        for($i = strlen($elRut)-1; $i >= 0; $i--):
            $factor = $factor > 7 ? 2 : $factor;
            $suma += $elRut{$i}*$factor++;
        endfor;
        $resto = $suma % 11;
        $dv = 11 - $resto;
        if($dv == 11){
            $dv=0;
        }else if($dv == 10){
            $dv="k";
        }else{
            $dv=$dv;
        }
       if($dv == trim(strtolower($RUT[1]))){
           return true;
       }else{
           return false;
       }
    }


    public function importar(Request $request)
    {
        
        $input = $request->all();
        $sucursal_id = $input['sucursal'];
        $agendamientos = $input['agendamientos'];
        $errores = array();

        if($sucursal_id < 0 && sizeof($agendamientos) < 0){

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Error al intentar ingresar los registros!'
            ], 300);

        }


        foreach ($agendamientos as $key => $agendamiento) {

            $error = array(
                "id"    => "",
                "rut"    => "",
                "tipo"  => "",
                "fecha"  => "",
                "horario" => "",
                "observaciones" => [],
            );
            
            $id             = $key+1;
            $rut            = isset($agendamiento['Rut']) ? strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", trim($agendamiento['Rut']))) : " "; 
            $tipo           = isset($agendamiento['Tipo']) ? strtoupper(self::limpiar_string($agendamiento['Tipo'])) : "";
            $fecha          = isset($agendamiento['Fecha']) ? $agendamiento['Fecha'] : ""; 
            $horario        = isset($agendamiento['Horario']) ? $agendamiento['Horario'] : ""; 
            $valida_rut     = self::validaRut($rut);
            $valida_fecha   = self::validar_fecha($fecha);    

            $codificacion_id = Codificaciones::where('rut', $rut )->where('habilitado', true )->value('id');

            $horarios = HorariosHasSucursales::join('horarios', 'horarios_has_sucursales.horario_id', '=', 'horarios.id')
                ->select('horarios.id')
                ->where('horarios.horario',$horario)
                ->where('horarios_has_sucursales.sucursal_id',$sucursal_id)
                ->where('horarios.habilitado', true)
                ->first();
            
            if($horarios){
                $aux = $horarios->toArray();
                $horario_id = $aux["id"];
            }

            $valores = explode('/', $fecha);
            $day = $valores[0];
            $mes = $valores[1];
            $ano = $valores[2];
                            
            $fecha_agendamiento = date('Y-m-d', mktime(0,0,0, $mes, $day, $ano));
            $fecha_hoy = date("Y-m-d");

            //Validar fechas futuras?? Maximo 1 mes?.
            
            if(empty($rut) || $rut == " " || $valida_rut == false || empty($tipo) || $tipo == " " || empty($horario) 
                || $horario == " " || empty($fecha) || $fecha == " " || $valida_fecha == false || ($tipo != "ZARPE" && $tipo != "RECOGIDA")
                || empty($codificacion_id) || $codificacion_id == null || empty($horario_id) || $horario_id == null || ($fecha_agendamiento < $fecha_hoy)){
                    
                    $error['id'] = $id;
                    $error['rut'] = $rut;
                    $error['tipo'] = $tipo;
                    $error['fecha'] = $fecha;
                    $error['horario'] = $horario;

                    if(empty($rut) || $rut == " " ){
                        $error['observaciones'][] = "El rut esta vacio";
                    }
                    
                    if($valida_rut == false){
                        $error['observaciones'][] = "El rut es invalido";
                    }

                    if(empty($tipo) || $tipo == " " ){
                        $error['observaciones'][] = "El tipo esta vacia";
                    }

                    if($tipo != "ZARPE" && $tipo != "RECOGIDA"){
                        $error['observaciones'][] = "El tipo no corresponde a Zarpe o Recogida";
                    }

                    if(empty($horario) || $horario == " " ){
                        $error['observaciones'][] = "El horario esta vacio";
                    }

                    if(empty($fecha) || $fecha == " " ){
                        $error['observaciones'][] = "La fecha esta vacio";
                    }

                    if($fecha_agendamiento < $fecha_hoy){
                        $error['observaciones'][] = "La fecha es inferior a la fecha actual";
                    }

                    if($valida_fecha == false){
                        $error['observaciones'][] = "La fecha no es valida";
                    }

                    if(empty($codificacion_id) || $codificacion_id == null){
                        $error['observaciones'][] = "El rut no se encuentra codificado o esta deshabilitado";
                    }

                    if(empty($horario_id) || $horario_id == null){
                        $error['observaciones'][] = "El horario no se encuentra parametrizado en la sucursal o esta deshabilitado";
                    }


                   
                }else{
                    
                  
                    
                        
                    //if($codificacion_id && $horario_id){

                        $valores = explode('/', $fecha);
                        $day = $valores[0];
                        $mes = $valores[1];
                        $ano = $valores[2];
                            
                        $fecha_inicio = date('Y-m-d', mktime(0,0,0, $mes, $day, $ano));

                        //BUSCA SI EXISTE AGENDAMIENTO PARA EL HORARIO
                        $agendamiento = Agendamientos::where('horario_plan', $horario_id)
                          //->where('tipo', $tipo)
                          ->whereDate('fecha_inicio', $fecha_inicio)
                          ->whereDate('fecha_fin', $fecha_inicio)
                          //->where('tipo_fecha', 1)
                          ->where('codificacion_id', $codificacion_id)->first();  

                        if($agendamiento) {
                                //ACTUALIZA
                                Agendamientos::where('id', $agendamiento['id'])->update(
                                    array(
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_inicio,
                                        )
                                    );

                                }else{
                                //INSERTA
                                Agendamientos::create(
                                    array(
                                            'codificacion_id'   => $codificacion_id,
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_inicio,
                                            'tipo_fecha'        => 1,
                                            'usuario_id'        => 1
                                            
                                        )//Auth::user()->id
                                    );
                                }
                    //}else{

                   //     $error['id'] = $id;
                   //     $error['rut'] = $rut;
                   //     $error['tipo'] = $tipo;
                   //     $error['fecha'] = $fecha;
                   //     $error['horario'] = $horario;

                      

                 //   }
                }	
                
                if($error['id'] > 0){
                    $errores[] = $error;
                } 

            }

                  

        return response()->json(
            [
                'status' => 'success',
                'message' => 'Los registros han sido guardados exitosamente!',
                'errores' => $errores
            ], 200);
    }

    public function eventos($id)
    {

        $agendamientos = Agendamientos::join('codificaciones', 'agendamientos.codificacion_id', '=', 'codificaciones.id')
        ->join('sucursals', 'codificaciones.sucursal_id', '=', 'sucursals.id')
        ->join('empresas', 'sucursals.empresa_id', '=', 'empresas.id')
       // ->join('cars', 'agendamientos.car_plan_id', '=', 'cars.id')
       // ->join('drivers', 'agendamientos.drivers_plan_id', '=', 'drivers.id')
        ->join('horarios', 'agendamientos.horario_plan', '=', 'horarios.id')
        ->select(
            //'codificaciones.id as codificacion_id',
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
            'codificaciones.direccion',
            'codificaciones.comuna',
            'codificaciones.email',
            'codificaciones.telefono',
            //'codificaciones.centro_costo',
            //'sucursals.nombre as sucursal',
            //'empresas.razon_social',
            //'drivers.name as nombre_conductor_plan',
            //'drivers.lastname as apellido_conductor_plan',
            //'drivers.rut as rut_conductor_plan',
            'horarios.horario as title',
            'horarios.id as horario_id',
            //'cars.numero_movil as movil_plan',
            'agendamientos.id',
            'agendamientos.fecha_inicio as start',
            'agendamientos.fecha_fin as end',
            'agendamientos.tipo',
             //DB::raw("'event-primary' as classes"),
             DB::raw("(CASE WHEN agendamientos.tipo = 'ZARPE' THEN '#1AA1C8' ELSE '#28C76F' END) AS color")
            )
            ->where('codificaciones.id',$id)
            ->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $agendamientos->toArray(),
            ], 200);

    }

    /*public function importar(Request $request)
    {
        
        $input = $request->all();
        $sucursal_id = $input['sucursal'];
        $agendamientos = $input['agendamientos'];

        if($sucursal_id < 0 && sizeof($agendamientos) < 0){

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Error al intentar ingresar los registros!'
            ], 300);

        }


        foreach ($agendamientos as $agendamiento) {
            
            $rut        = isset($agendamiento['Rut']) ? strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", trim($agendamiento['Rut']))) : " "; 
            $tipo       = isset($agendamiento['Tipo']) ? ucwords(self::limpiar_string($agendamiento['Tipo'])) : "";
            $periodo     = isset($agendamiento['Periodo']) ? strtoupper(self::limpiar_string($agendamiento['Periodo'])) : ""; 
            $horario     = isset($agendamiento['Horario']) ? $agendamiento['Horario'] : ""; 

                

                if(empty($rut) || $rut == " " || empty($tipo) || $tipo == " " || empty($horario) 
                || $horario == " " || empty($periodo) || $periodo == " " || ($tipo != "Zarpe" && $tipo != "Recogida")){
                   
                }else{
                    
                    $codificacion_id = Codificaciones::where('rut', $rut )->value('id');
                    $horario_id = Horarios::where('horario', $horario)->value('id'); //AGREGAR LA SUCURSAL
                    $fecha = isset($agendamiento['Fecha']) ? $agendamiento['Fecha'] : ""; 
                    
                   if($periodo == "DIARIO"){
                        $periodo_id = 1;
                   }else if($periodo == "MENSUAL"){
                        $periodo_id = 2;
                   }else if($periodo == "PERMANENTE"){
                        $periodo_id = 3;
                        $fecha = "31/12/2037";
                   }
                   
                   
                   
                   if($codificacion_id && $horario_id && $periodo_id && self::validar_fecha($fecha) == true){
                        
                        //DIARIO
                        if($periodo_id === 1){

                            $valores = explode('/', $fecha);
                            $day = $valores[0];
                            $mes = $valores[1];
                            $ano = $valores[2];
                            
                            $fecha_inicio = date('Y-m-d', mktime(0,0,0, $mes, $day, $ano));

                            //BUSCA SI EXISTE AGENDAMIENTO DIARIO
                            $agendamiento = Agendamientos::where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->whereDate('fecha_inicio', $fecha_inicio)
                            ->whereDate('fecha_fin', $fecha_inicio)
                            ->where('tipo_fecha', $periodo_id)
                            ->where('codificacion_id', $codificacion_id)->first();  

                            //BORRAR MENSUAL Y PERMANENTE
                            //BORRA MENSUAL
                            Agendamientos::where('codificacion_id', $codificacion_id)
                            ->where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->whereMonth('fecha_inicio', $mes) 
                            ->whereYear('fecha_inicio', $ano) 
                            ->where('tipo_fecha', 2)->delete();
                            
                            //BORRA PERMANENTE
                            Agendamientos::where('codificacion_id', $codificacion_id)
                            ->where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->where('tipo_fecha', 3)->delete();

                            if($agendamiento) {
                                //ACTUALIZA
                                Agendamientos::where('id', $agendamiento['id'])->update(
                                    array(
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_inicio,
                                        )
                                    );

                                }else{
                                //INSERTA
                                Agendamientos::create(
                                    array(
                                            'codificacion_id'   => $codificacion_id,
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_inicio,
                                            'tipo_fecha'        => $periodo_id,
                                            
                                        )
                                    );
                                }

                        //MENSUAL
                        }else if($periodo_id === 2){

                            //OBTIENE MES Y AÑO DE LA FECHA
                            $valores = explode('/', $fecha);
                            $mes = $valores[1];
                            $ano = $valores[2];

                            $day = date("d", mktime(0,0,0, $mes+1, 0, $ano));
                            $fecha_inicio = date('Y-m-d', mktime(0,0,0, $mes, 1, $ano));
                            $fecha_fin = date('Y-m-d', mktime(0,0,0, $mes, $day, $ano));

                            //BUSCA SI EXISTE AGENDAMIENTO MENSUAL
                            $agendamiento = Agendamientos::where('codificacion_id', $codificacion_id)
                            ->where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->whereDate('fecha_inicio', $fecha_inicio)
                            ->whereDate('fecha_fin', $fecha_fin)
                            ->where('tipo_fecha', $periodo_id)->first();

                            //BORRAR MENSUAL Y PERMANENTE
                            //BORRA PERMANENTE
                            Agendamientos::where('codificacion_id', $codificacion_id)
                            ->where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->where('tipo_fecha', 3)->delete();
                            
                            //BORRA DIARIAS
                            Agendamientos::where('codificacion_id', $codificacion_id)
                            ->where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->whereMonth('fecha_inicio', $mes) //PUEDE SERH LA FECHA FIN O DE INICIO, YA QUE ES LA MISMA
                            ->whereYear('fecha_inicio', $ano) //PUEDE SERH LA FECHA FIN O DE INICIO, YA QUE ES LA MISMA
                            ->where('tipo_fecha', 1)->delete();

                            if($agendamiento) {
                                //ACTUALIZA
                                Agendamientos::where('id', $agendamiento['id'])->update(
                                    array(
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_fin,
                                        )
                                    );

                                }else{
                                //INSERTA
                                Agendamientos::create(
                                    array(
                                            'codificacion_id'   => $codificacion_id,
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_fin,
                                            'tipo_fecha'        => $periodo_id,
                                            
                                        )
                                    );
                                }
                                    
                        //PERMANENTE
                        }else if($periodo_id === 3){
                            
                            //CREA LAS FECHAS
                            $fecha_inicio = date("Y-m-d H:i:s");
                            $fecha_fin = date("Y-m-d H:i:s", mktime(00, 00, 00, 12, 31, 2037));
                            
                            //BUSCA SI EXISTE AGENDAMIENTO PERMANENTE
                            $agendamiento = Agendamientos::where('codificacion_id', $codificacion_id)
                            ->where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->where('tipo_fecha', $periodo_id)->first();

                            //BORRA TODOS LOS AGENDAMIENTOS
                            Agendamientos::where('codificacion_id', $codificacion_id)
                            ->where('horario_plan', $horario_id)
                            ->where('tipo', $tipo)
                            ->whereIn('tipo_fecha', [1, 2, 3])->delete();
                           
                            if($agendamiento) {
                               
                                //ACTUALIZA
                                Agendamientos::where('id', $agendamiento['id'])->update(
                                    array(
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_fin,
                                        )
                                    );

                                }else{
                                    
                                //INSERTA
                                Agendamientos::create(
                                    array(
                                            'codificacion_id'   => $codificacion_id,
                                            'horario_plan'      => $horario_id,
                                            'tipo'              => $tipo,
                                            'fecha_inicio'      => $fecha_inicio,
                                            'fecha_fin'         => $fecha_fin,
                                            'tipo_fecha'        => $periodo_id,
                                            
                                        )
                                    );
                                }
                                
                        }
                    }
                }				    
        }

        return response()->json(
            [
                'status' => 'success',
                'message' => 'Los registros han sido guardados exitosamente!'
            ], 200);
    }*/
}
