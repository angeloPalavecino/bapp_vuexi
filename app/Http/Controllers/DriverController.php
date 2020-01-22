<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\Driver;
use App\Models\User;
use App\Models\Car;
use App\Models\Document;
use App\Models\DriversHasDocuments;
use App\Models\DriversHasDrivers;
use App\Models\ConductoresHasCars;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Storage;



class DriverController extends Controller
{
    
    public function validatorDriver(array $data){ 

        return Validator::make($data, [
            'name' => 'required',
            'lastname' => 'required',
            'rut' => 'required',
            'email' => 'required|email', 
            'telefono' => 'required',
            'habilitado' => 'required',
            'ciudad' => 'required',
            'comuna' => 'required',
            'direccion' => 'required',
            'numeracion' => 'required',
         ]);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    
       // $driver = Driver::with('asociados')->where('conductor', '=', 1)->get();
       $driver = DB::table('drivers as drivers_original')
                ->join('drivers_has_drivers', 'drivers_has_drivers.driver_id', '=', 'drivers_original.id')
                ->join('drivers as drivers_second', 'drivers_second.id', '=', 'drivers_has_drivers.asociado_id')
                ->leftjoin('conductores_has_cars', 'conductores_has_cars.driver_id', '=', 'drivers_original.id')
                ->leftjoin('cars', 'cars.id', '=', 'conductores_has_cars.car_id')
                ->select(
                    'drivers_original.id',
                    'drivers_original.name', 
                    'drivers_original.lastname',
                    'drivers_original.rut',
                    'drivers_original.email',
                    'drivers_original.telefono',
                    'drivers_original.habilitado', 
                    'drivers_original.ciudad', 
                    'drivers_original.comuna',
                    'drivers_original.dueno', 
                    'drivers_original.conductor', 
                    'drivers_original.direccion',
                    'drivers_original.numeracion',
                    'drivers_original.clase',
                    'drivers_original.driver_default',
                    'drivers_has_drivers.driver_id',
                    'drivers_has_drivers.asociado_id',
                    'drivers_second.name as second_name',
                    'drivers_second.lastname as second_lastname',
                    'conductores_has_cars.car_id',
                    'cars.numero_movil'
                    )
                ->where('drivers_original.conductor', '=', 1)
                ->get(); 
               
         return response()->json(
             [
                 'status' => 'success',
                 'items' => $driver->toArray(),
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
        
        //Driver
        $validationDriver = $this->validatorDriver($request->all());
        if ($validationDriver->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validationDriver->errors(),
                ], 300);
           
        }
        $request['rut'] = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $request['rut'])); 

        $existe_driver = Driver::where('rut', $request['rut'])->first();
        if ($existe_driver != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El conductor ya se encuentra registrado',
                ], 300);           
        }

        if($request['car_id'] == 1 ){
            $request['driver_default'] = 0;
        }

        $returnDriver = Driver::create($request->all());

        $idDriver = $returnDriver->id;

        if ($idDriver < 1) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Problemas al ingresar el Conductor',
                ], 300);
        } 

            //Agrega asociado a conductor

            $idAsociado = $request->get('driver_id');

            $dataDriversHasDrivers =  array(
                    'driver_id'       => $idDriver,
                    'asociado_id'     => $idAsociado,
                    'habilitado'      => true
            );
            
            $returnDriverHasDrivers = DriversHasDrivers::create($dataDriversHasDrivers);  

            $returnIdDriversHasDrivers = $returnDriverHasDrivers->id;
            
            if ($returnIdDriversHasDrivers < 1) {
                    return response()->json(
                        [
                            'status' => 'error',
                            'message' => 'Problemas con la relacion',
                        ], 300);
            } 
            
            //Agrega moviles a conductor

            $idCar = $request->get('car_id');
            
            $dataConductoresHasCars =  array(
                'driver_id'       => $idDriver,
                'car_id'         => $idCar,
                'habilitado'      => true
                );
                
                $returnConductoresHasCars = ConductoresHasCars::create($dataConductoresHasCars);  

                $returnIdConductoresHasCars = $returnConductoresHasCars->id;
                
                if ($returnIdConductoresHasCars < 1) {
                        return response()->json(
                            [
                                'status' => 'error',
                                'message' => 'Problemas con la relacion',
                            ], 300);
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
        //Datos conductor
        $driver = DB::table('drivers as drivers_original')
                ->join('drivers_has_drivers', 'drivers_has_drivers.driver_id', '=', 'drivers_original.id')
                ->join('drivers as drivers_second', 'drivers_second.id', '=', 'drivers_has_drivers.asociado_id')
                ->leftjoin('conductores_has_cars', 'conductores_has_cars.driver_id', '=', 'drivers_original.id')
                ->leftjoin('cars', 'cars.id', '=', 'conductores_has_cars.car_id')
                ->select(
                    'drivers_original.id',
                    'drivers_original.name', 
                    'drivers_original.lastname',
                    'drivers_original.rut',
                    'drivers_original.email',
                    'drivers_original.telefono',
                    'drivers_original.habilitado', 
                    'drivers_original.ciudad', 
                    'drivers_original.comuna',
                    'drivers_original.dueno', 
                    'drivers_original.conductor', 
                    'drivers_original.direccion',
                    'drivers_original.numeracion',
                    'drivers_original.clase',
                    'drivers_original.driver_default',
                    'drivers_original.created_at',
                    'drivers_original.updated_at',
                    'drivers_has_drivers.driver_id',
                    'drivers_has_drivers.asociado_id',
                    'drivers_second.name as second_name',
                    'drivers_second.lastname as second_lastname',
                    'conductores_has_cars.car_id',
                    'cars.numero_movil'
                    )
                ->where('drivers_original.conductor', '=', 1)
                ->where('drivers_original.id', '=', $id)
                ->get(); 


         //Documentos
        $documents = DB::table('drivers_has_documents')
        ->join('documents', 'documents.id', '=', 'drivers_has_documents.document_id')
        ->join('type_documents', 'type_documents.id', '=', 'documents.type_document_id')
        ->select(
            'documents.id',
            'documents.type_document_id', 
            'documents.name',
            'documents.url',
            'documents.informacion',
            'documents.fecha_vencimiento',
            'documents.habilitado', 
            'drivers_has_documents.driver_id',
            'drivers_has_documents.document_id',
            'drivers_has_documents.habilitado as hashabilitado'
            )
        ->where('drivers_has_documents.driver_id', '=', $id)
        ->where('type_documents.tipo', '=', 2)
        ->get(); 

        return response()->json(
            [
                'status' => 'success',
                'item' => $driver->toArray(),
                'documents' => $documents->toArray(),
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


        $validationDriver = $this->validatorDriver($request->all());
        
        if ($validationDriver->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validationDriver->errors(),
                ], 300);
           
        }

        //Valida si ya existe un chofer por defecto para el movil
        $count = DB::table('drivers as drivers_original')
        ->join('conductores_has_cars', 'conductores_has_cars.driver_id', '=', 'drivers_original.id')
        ->where('conductores_has_cars.car_id', '=', $request['car_id'])
        ->where('drivers_original.driver_default', '=', 1)
        ->count(); 

        //Deja el driver_default en 0 si ya existe un conductor por defecto con el numero de movil seleccionado
        //o si el movil seleccionado es el "sin movil"
        if($count > 0 || $request['car_id'] == 1 ){
            $request['driver_default'] = 0;
        }

        //Actualiza conductor
        $request['rut'] = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $request['rut'])); 
        Driver::where('id', $id)->update($request->except(['driver_id','car_id']));


        //Actualiza Asociado del conductor
        $dataDriversHasDrivers =  array(
            'asociado_id'  => $request['driver_id'],
        );
    
        DriversHasDrivers::where('driver_id', $id)->update($dataDriversHasDrivers);

        $conductorhasCars = ConductoresHasCars::where('driver_id', $id)->get();


        //Busca id en tabla intermedia para determinar si hace un update o insert
        //En teoria, siempre debiera ser siempre un update porque nunca debiera quedar vacia la tabla intermedia
        $conductoreshascars = ConductoresHasCars::where('driver_id',$id)->count(); 

        if($conductoreshascars <= 0){      

            //Inserta movil del conductor
            $dataConductoresHasCars =  array(
                'driver_id'       => $id,
                'car_id'         => $request['car_id'],
                'habilitado'      => true
            );
                
            ConductoresHasCars::create($dataConductoresHasCars);  
              

        }else{

            //Actualiza Movil del conductor
            $dataConductoresHasCars =  array(
                'car_id'  => $request['car_id']
            );
            
            ConductoresHasCars::where('driver_id', $id)->update($dataConductoresHasCars);

        }
        
        // $dataUser = $request->all()['user'];
        // $dataDriver = $resultado = array_merge($dataUser, $request->all()['driver']);
        // $dataCar = $request->all()['car'];

        // $getDriver = Driver::where('id', $dataUser['id'])->first();

        // $dataDriver['user_id'] = $getDriver->user_id;
        // $dataDriver['habilitado'] = $dataUser['habilitado'];
        // $validationDriver = $this->validatorDriver($dataDriver);
        
        // if ($validationDriver->fails()) {

        //     return response()->json(
        //         [
        //             'status' => 'error',
        //             'message' => $validationDriver->errors(),
        //         ], 300);
           
        // }
        // Driver::where('id', $dataDriver['id'])->update($dataDriver);
        
        // $dataCar['driver_id'] = $dataDriver['id'];
        // $dataCar['habilitado'] = $dataUser['habilitado'];
        // $validationCar = $this->validatorCar($dataCar);

        // if ($validationCar->fails()) {

        //     return response()->json(
        //         [
        //             'status' => 'error',
        //             'message' => $validationCar->errors(),
        //         ], 300);
           
        // }
        
        // Car::where('id', $dataCar['id'])->update($dataCar);

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
          
           $driver = Driver::findOrFail($id);
           
           $document = DriversHasDocuments::where('driver_id', $id)->get();
           $idsDocument = array_column($document->toArray(), 'document_id'); 
    
           if(!is_null($driver)){
                
                foreach ($idsDocument as $key => $doc) {
                    $documento = Document::findOrFail($doc);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                }
                
                if($driver['dueno'] == 1){

                    $datadrivers =  array(
                        'conductor'  => 0,
                    );

                    Driver::where('id', $id)->update($datadrivers);

                    $driverhasdriver = DriversHasDrivers::where('driver_id', $id);
                    $driverhasdriver->delete();
            
                }else{

                    $driver->delete();

                }

                
                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'El Conductor ha sido eliminado!!'
                    ], 200);
            
            }else{
        
                return response()->json(
                    [
                        'status' => 'error',
                        'message' => 'El Conductor no existe!!'
                    ], 300);
            }


        }catch(ModelNotFoundException $e){
            
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El Conductor no existe!!'
                ], 300);
  
        }

        
    }

    public function borrar(Request $request)
    {
      
        $ids = array_column($request->all(), 'id');
        $document = DriversHasDocuments::whereIn('driver_id', $ids)->get();
        $idsDocument = array_column($document->toArray(), 'document_id');
        
        try{

            if(count($ids) > 0 ){     
                
                foreach ($document as $key => $doc) {
                    
                    $idDriver = $doc['driver_id'];
                    $idDocument = $doc['document_id'];

                    $conductor = Driver::findOrFail($idDriver);
                    $documento = Document::findOrFail($idDocument);
                    
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                    
                    if($conductor['dueno'] == 1){

                        $datadrivers =  array(
                            'conductor'  => 0,
                        );
    
                        Driver::where('id', $idDriver)->update($datadrivers);
    
                        $driverhasdriver = DriversHasDrivers::where('driver_id', $idDriver);
                        $driverhasdriver->delete();
                
                    }else{
    
                        $conductor->delete();
    
                    }
                    
                    
                }
                
                //Driver::destroy($ids);
                
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

    public function upload(Request $request)
    {

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();  
        $fileNameSinExtencion = $request->id."-".$request->tipo_documento;//rut
        $fileName = $request->id."-".$request->tipo_documento.'.'.$extension;//$file->getClientOriginalName(); rut
        $exists = Document::where('name', $fileNameSinExtencion)->first();
        $uploadFile = Storage::disk('local')->put('drivers/'.$fileName, file_get_contents($file));

        if($uploadFile == true)
        {

            $url = '/documents/drivers/'.$fileName;

            $fecha = ($request->fecha_vencimiento) ? date($request->fecha_vencimiento):null;
           
            $dataDocument = array(
                'type_document_id'  => $request->tipo_documento_id,
                'name'              => $fileNameSinExtencion,
                'url'               => $url,
                'fecha_vencimiento' => $fecha,
                'informacion'       => "",
                'habilitado'        => 1
            );
            if($exists != null)
            {
                Storage::disk('delete')->delete($exists->url);
                Document::where('name', $fileNameSinExtencion)->update($dataDocument);
            }
            else
            {
                $documentResult = Document::create($dataDocument);
                if($documentResult->id > 0)
                {   
                    $dataHas = DriversHasDocuments::create(
                        array(
                            'driver_id'     => $request->id,
                            'document_id'   => $documentResult->id,
                            'habilitado'    => 1
                        )
                    );
    
                    if($dataHas->id > 0)
                    {
                        dd($dataHas);
                    }
                    else
                    {
                        dd("Fallo");
                    }
                }
                else
                {
                    dd("Error");
                } 
            }       
        }
        else
        {
            dd("Fallo");
        }
              
        return response()->json(
            [
                'status' => 'success',
            ], 200);     
    }

    public function documents ($id)
    {
        
        //Documentos del conductor
        //Id    Descripcion
        //1     Cedula Identidad
        //2     Certificado Antecedentes Penales
        //3     Licencia de Conducir
        //9     Seguro Vida Conductor
        
        //$driver = DriversHasDocuments::with('documents')->where('driver_id', $id)->whereIn('documents.type_document_id', [1,2,3,9])->get();

        $driver = DB::table('drivers_has_documents')
                ->join('documents', 'documents.id', '=', 'drivers_has_documents.document_id')
                ->join('type_documents', 'type_documents.id', '=', 'documents.type_document_id')
                ->select(
                    'documents.id',
                    'documents.type_document_id', 
                    'documents.name',
                    'documents.url',
                    'documents.informacion',
                    'documents.fecha_vencimiento',
                    'documents.habilitado', 
                    'drivers_has_documents.driver_id',
                    'drivers_has_documents.document_id',
                    'drivers_has_documents.habilitado as hashabilitado'
                    )
                ->where('drivers_has_documents.driver_id', '=', $id)
                ->where('type_documents.tipo', '=', 1)
                ->get(); 
        
        //dd($driver->toArray());

        return response()->json(
            [
                'status' => 'success',
                'items' => $driver->toArray(),
            ], 200); 
    }

    public function document ($id)
    {
        $document = Document::where('id', $id)->first();
        return response()->download(storage_path($document->url), $document->name);
    }
}
