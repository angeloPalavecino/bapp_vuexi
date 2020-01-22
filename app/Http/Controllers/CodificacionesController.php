<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\Codificaciones;
use App\Models\Sucursal;
use App\Models\GrupoPatronHasPatrones;
use App\Models\GrupoPatronHasSucursales;
use App\Models\GrupoPatron;
use App\Models\Excepciones;

use Illuminate\Http\Request;

class CodificacionesController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'sucursal_id' => 'required',
             'rut' => 'required',
             'nombre' => 'required',
             'apellido' => 'required', 
             'direccion' => 'required', 
             'comuna' => 'required', 
             'email' => 'email|required', 
             'telefono' => 'required', 
             'centro_costo' => 'required', 
             'codigo' => 'required', 
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
        $codificaciones = Codificaciones::join('sucursals', 'codificaciones.sucursal_id', '=', 'sucursals.id')
        ->leftJoin('grupo_patrons', 'codificaciones.grupo_patron_id', '=', 'grupo_patrons.id')
        ->select(
            'codificaciones.id',
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
            'sucursals.nombre as sucursal',
            'grupo_patrons.codigo' )
            ->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $codificaciones->toArray(),
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

        $existe_rut = Codificaciones::where('rut', $request['rut'])->first();
        if ($existe_rut != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El rut ya se encuentra registrado',
                ], 300);           
        }

        
        

        $input = $request->all();
        $sucursal_id = $input['sucursal_id'];
        $rut = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $input['rut'])); 
        $codigo = $input['codigo'];
        $nombre = $input['nombre'];
        $apellido = $input['apellido'];
        $direccion = $input['direccion'];
        $comuna = $input['comuna'];
        $email = $input['email'];
        $telefono = $input['telefono'];
        $centro_costo = $input['centro_costo'];
        $lat = $input['lat'];
        $lng = $input['lng'];
        $distancia = 0 ;

        $sucursal = Sucursal::findorfail($sucursal_id);
        if(!is_null($sucursal)){
            $latSuc = $sucursal['lat'];
            $lngSuc = $sucursal['lng'];
            $distancia = self::calculoDistancia($lat, $lng, $latSuc,$lngSuc);
        }
        

        $codificacion = Codificaciones::create(
         array(
                'sucursal_id'       => $sucursal_id, 
                'rut'               => $rut, 
                'nombre'            => $nombre, 
                'apellido'          => $apellido, 
                'direccion'         => $direccion,     
                'comuna'            => $comuna,  
                'email'             => $email,  
                'telefono'          => $telefono,  
                'centro_costo'      => $centro_costo,     
                'lat'               => $lat,     
                'lng'               => $lng,     
                'grupo_patron_id'   => $codigo,     
                'distancia'         => $distancia,              
              )
         );


         return response()->json(
            [
                'status' => 'success',
                'item' => $codificacion->toArray()
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
        $codificaciones = Codificaciones::join('sucursals', 'codificaciones.sucursal_id', '=', 'sucursals.id')
        ->leftJoin('grupo_patrons', 'codificaciones.grupo_patron_id', '=', 'grupo_patrons.id')
        ->select(
            'codificaciones.id',
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
            'codificaciones.grupo_patron_id',
            'codificaciones.direccion', 
            'codificaciones.comuna',
            'codificaciones.email',
            'codificaciones.telefono',
            'codificaciones.centro_costo',
            'codificaciones.sucursal_id',
            'codificaciones.lat',
            'codificaciones.lng',
            'codificaciones.created_at',
            'codificaciones.updated_at',
            'sucursals.nombre as sucursal',
            'sucursals.lat as latsuc',
            'sucursals.lng as lngsuc',
            'sucursals.empresa_id',
            'grupo_patrons.codigo' )
            ->where('codificaciones.id', $id)
            ->get();
        
        $patrones = GrupoPatronHasPatrones::join('patrons', 'grupo_patron_has_patrones.patron_id', '=', 'patrons.id')
            ->join('grupo_patrons', 'grupo_patron_has_patrones.grupopatrones_id', '=', 'grupo_patrons.id')
            ->select(
                'patrons.id',
                'patrons.codigo', 
                'patrons.descripcion',
                'patrons.color',
                'patrons.lat', 
                'patrons.lng' )
                ->where('grupo_patrons.id',$codificaciones[0]['grupo_patron_id'])
                ->get();
    
      
        return response()->json(
            [
                'status' => 'success',
                'item' => $codificaciones->toArray(),
                'patrones' => $patrones->toArray()
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
        $validation = $this->validator($request->all());

        if ($validation->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validation->errors(),
                ], 300);
           
        }

        $codificacion = Codificaciones::where('id',$id)->first(); 


        if(!is_null($codificacion)){
    
            $input = $request->all();
            $sucursal_id = $input['sucursal_id'];
            $rut = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $input['rut'])); 
            $codigo = $input['codigo'];
            $nombre = $input['nombre'];
            $apellido = $input['apellido'];
            $direccion = $input['direccion'];
            $comuna = $input['comuna'];
            $email = $input['email'];
            $telefono = $input['telefono'];
            $centro_costo = $input['centro_costo'];
            $lat = $input['lat'];
            $lng = $input['lng'];
            $distancia = 0 ;

            $sucursal = Sucursal::findorfail($sucursal_id);
            if(!is_null($sucursal)){
                $latSuc = $sucursal['lat'];
                $lngSuc = $sucursal['lng'];
                $distancia = self::calculoDistancia($lat, $lng, $latSuc,$lngSuc);
            }
           

        $codificacion = Codificaciones::where('id', $id)->update(
            array(
                'sucursal_id'       => $sucursal_id, 
                'rut'               => $rut, 
                'nombre'            => $nombre, 
                'apellido'          => $apellido, 
                'direccion'         => $direccion,     
                'comuna'            => $comuna,     
                'email'             => $email,  
                'telefono'          => $telefono,  
                'centro_costo'      => $centro_costo,    
                'lat'               => $lat,     
                'lng'               => $lng,     
                'grupo_patron_id'   => $codigo,     
                'distancia'         => $distancia,              
              )
         );


            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'El rut ha sido actualizado!!'
                ], 200);


        }else{

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El rut no fue encontrado',
                ], 300);

           
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
          
            $codificacion = Codificaciones::findOrFail($id);
             
            if(!is_null($codificacion)){
                 
                 $codificacion->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El rut ha sido eliminado!!!'
                     ], 200);
             
             }else{
         
                 return response()->json(
                     [
                         'status' => 'error',
                         'message' => 'El rut no existe!!!'
                     ], 300);
             }
 
 
         }catch(ModelNotFoundException $e){
             
             return response()->json(
                 [
                     'status' => 'error',
                     'message' => 'El rut no existe!!!'
                 ], 300);
   
         }
    }

    public function borrar(Request $request )
    {
      
        
        $ids = array_column($request->all(), 'id');
        
        try{

            if(count($ids) > 0 ){          
                
                Codificaciones::destroy($ids);
                
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
   

    function calculoDistancia($point1_lat, $point1_long, $point2_lat, $point2_long, $unit = 'km', $decimals = 2) {
        // Cálculo de la distancia en grados
            $degrees = rad2deg(acos((sin(deg2rad($point1_lat))*sin(deg2rad($point2_lat))) + (cos(deg2rad($point1_lat))*cos(deg2rad($point2_lat))*cos(deg2rad($point1_long-$point2_long)))));
     
        // Conversión de la distancia en grados a la unidad escogida (kilómetros, millas o millas naúticas)
            switch($unit) {
                case 'km':
                    $distance = $degrees * 111.13384; // 1 grado = 111.13384 km, basándose en el diametro promedio de la Tierra (12.735 km)
                    break;
                case 'mi':
                    $distance = $degrees * 69.05482; // 1 grado = 69.05482 millas, basándose en el diametro promedio de la Tierra (7.913,1 millas)
                    break;
                case 'nmi':
                    $distance =  $degrees * 59.97662; // 1 grado = 59.97662 millas naúticas, basándose en el diametro promedio de la Tierra (6,876.3 millas naúticas)
            }
            return round($distance, $decimals);
    }

    function validaCodificacion($point, $polygon)
    {
        if($polygon[0] != $polygon[count($polygon)-1])
            $polygon[count($polygon)] = $polygon[0];
        $j = 0;
        $oddNodes = false;
        $x = $point[1];
        $y = $point[0];
        $n = count($polygon);
        for ($i = 0; $i < $n; $i++)
        {
            $j++;
            if ($j == $n)
            {
                $j = 0;
            }
            if ((($polygon[$i][0] < $y) && ($polygon[$j][0] >= $y)) || (($polygon[$j][0] < $y) && ($polygon[$i][0] >=
                $y)))
            {
                if ($polygon[$i][1] + ($y - $polygon[$i][0]) / ($polygon[$j][0] - $polygon[$i][0]) * ($polygon[$j][1] -
                    $polygon[$i][1]) < $x)
                {
                    $oddNodes = !$oddNodes;
                }
            }
        }
        return $oddNodes;
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

    public function importar(Request $request)
    {
        
        $input = $request->all();
        $sucursal_id = $input['sucursal'];
        $codificaciones = $input['codificaciones'];

        if($sucursal_id < 0 && sizeof($codificaciones) < 0){

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Error al intentar ingresar los registros!'
            ], 300);

        }


        foreach ($codificaciones as $codificacion) {
            
            $rut        = isset($codificacion['Rut']) ? strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", trim($codificacion['Rut']))) : " "; 
            $direccion  = isset($codificacion['Direccion']) ? self::limpiar_string($codificacion['Direccion']) : "";
            $comuna     = isset($codificacion['Comuna']) ? self::limpiar_string($codificacion['Comuna']) : ""; 

                if(empty($rut) || $rut == " " || empty($direccion) || $direccion == " " || empty($comuna) || $comuna == " "){
                    
                }else{
                    
                    $nombre     = (isset($codificacion['Nombre'])) ? self::limpiar_string($codificacion['Nombre']) : "NN"; 
                    $apellido   = (isset($codificacion['Apellido'])) ? self::limpiar_string($codificacion['Apellido']) : "NN"; 
                    $email   = (isset($codificacion['Email'])) ? self::limpiar_string($codificacion['Email']) : 'Sin mail'; 
                    $telefono   = (isset($codificacion['Telefono'])) ? self::limpiar_string($codificacion['Telefono']) : "Sin telefono"; 
                    $centro_costo   = (isset($codificacion['Centro_costo'])) ? self::limpiar_string($codificacion['Centro_costo']) : "Sin centro costo"; 
                    $direccion_completa = strtoupper($direccion.",".$comuna.",Chile");
                    $codigo = null;
                    $sucursal = Sucursal::findorfail($sucursal_id);
                    
                    //OBTIENE LAT Y LNG - CALCULA DISTANCIA
                    $geocode = app('geocoder')->geocode($direccion_completa)->get()->first();
                    if($geocode){
                        
                        $lat = $geocode->getCoordinates()->getLatitude();
                        $lng = $geocode->getCoordinates()->getLongitude();
                        $distancia = 0;   

                        
                        if(!is_null($sucursal)){
                            $latSuc = $sucursal['lat'];
                            $lngSuc = $sucursal['lng'];
                            $distancia = self::calculoDistancia($lat, $lng, $latSuc,$lngSuc);
                        }

                    }else{

                        $excepcion = Excepciones::where('rut', $rut)->first();

                        if($excepcion){
                
                            $lat = $excepcion['lat'];
                            $lng = $excepcion['lng']; 
                            $direccion = $excepcion['direccion'];
                            $comuna = $excepcion['comuna'];
                    
                            if(!is_null($sucursal)){
                                $latSuc = $sucursal['lat'];
                                $lngSuc = $sucursal['lng'];
                                $distancia = self::calculoDistancia($lat, $lng, $latSuc,$lngSuc);
                            }

                        }else{
                            
                            $lat = null;
                            $lng = null; 
                            $distancia = 0;
                        }
                                          
                    }

                    //DETERMINA SI EL RUT SE ENCUENTRA DENTRO DEL PATRON
                    $gp = GrupoPatronHasSucursales::where('sucursal_id',$sucursal_id)->get();
                   
                    if(count($gp) > 0 ){
                      
                        $idsgp = array_column($gp->toArray(), 'grupopatrones_id');
                    
                        $patrones = GrupoPatron::join('grupo_patron_has_patrones', 'grupo_patrons.id', '=', 'grupo_patron_has_patrones.grupopatrones_id')
                            ->join('patrons', 'grupo_patron_has_patrones.patron_id', '=', 'patrons.id')
                            ->select(
                                'grupo_patrons.id as codigo', 
                                'patrons.lat as lat', 
                                'patrons.lng as lng' )
                                ->whereIn('grupo_patrons.id', $idsgp )
                                ->get();

                        foreach ($patrones as $patron) {

                            $latpatron = explode(',' , $patron->lat);
                            $lngpatron = explode(',' , $patron->lng);
                            $count = count($latpatron)-1;
                            $polygon = array();
                        
                            for($i = 0 ; $i<=$count ; $i++)   {
                                $polygon[$i] = array($lngpatron[$i],$latpatron[$i]);
                            }

                            if(self::validaCodificacion(array($lng , $lat),$polygon)){
                                $codigo = $patron['codigo'];
                                break;
                            }
                        }

                    }

                    //BUSCAR EL RUT PARA SABER QUE ACCION TOMAR
                    $codificado = Codificaciones::where('rut', $rut )->first();
                    
                    if ($codificado != null) {

                        //ACTUALIZAR CODIFICACION

                        Codificaciones::where('id', $codificado['id'])->update(
                            array(
                                'sucursal_id'       => $sucursal_id, 
                                'nombre'            => $nombre, 
                                'apellido'          => $apellido, 
                                'direccion'         => $direccion,     
                                'comuna'            => $comuna,     
                                'email'             => $email,     
                                'telefono'          => $telefono,     
                                'centro_costo'      => $centro_costo,     
                                'lat'               => $lat,     
                                'lng'               => $lng,     
                                'grupo_patron_id'   => $codigo,     
                                'distancia'         => $distancia,              
                            )
                        );

                    }else{

                        //INSERTAR CODIFICACION

                        Codificaciones::create(
                            array(
                                   'sucursal_id'       => $sucursal_id, 
                                   'rut'               => $rut, 
                                   'nombre'            => $nombre, 
                                   'apellido'          => $apellido, 
                                   'direccion'         => $direccion,     
                                   'comuna'            => $comuna, 
                                   'email'             => $email,     
                                   'telefono'          => $telefono,     
                                   'centro_costo'      => $centro_costo,      
                                   'lat'               => $lat,     
                                   'lng'               => $lng,     
                                   'grupo_patron_id'   => $codigo,     
                                   'distancia'         => $distancia,              
                                 )
                            );

                    }
                }				    



        }

        return response()->json(
            [
                'status' => 'success',
                'message' => 'Los registros han sido guardados exitosamente!'
            ], 200);
    }

    public function combo($id){
        
        $codificaciones = Codificaciones::select(
            'codificaciones.id',
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
         //  'codificaciones.grupo_patron_id',
            'codificaciones.direccion', 
            'codificaciones.comuna',
         //   'codificaciones.email',
         //   'codificaciones.telefono',
         //   'codificaciones.centro_costo',
         //   'codificaciones.sucursal_id',
         //   'codificaciones.lat',
         //   'codificaciones.lng',
         //   'codificaciones.created_at',
         //   'codificaciones.updated_at',
         )
            ->where('codificaciones.sucursal_id', $id)
            ->get();

            return response()->json(
                [
                    'status' => 'success',
                    'items' => $codificaciones->toArray(),
                ], 200);

    }
}
