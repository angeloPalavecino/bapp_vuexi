<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\Driver;
use App\Models\User;
use App\Models\Car;
use App\Models\Document;
use App\Models\DriversHasDocuments;
use App\Models\CarsHasDocuments;
use App\Models\DriversHasDrivers;
use App\Models\DriversHasCars;
use App\Models\ConductoresHasCars;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Storage;

class AsociadoController extends Controller
{
    public function validatorAsociado(array $data){ 

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
        
        $asociado = Driver::withCount(['cars','conductores'])->where('dueno', '=', 1)->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $asociado->toArray(),
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
        
        //Asociado
        $validationAsociado = $this->validatorAsociado($request->all());

        if ($validationAsociado->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validationAsociado->errors(),
                ], 300);
           
        }

        $request['rut'] = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $request['rut'])); 

        $existe_asociado = Driver::where('rut', $request['rut'])->first();
        if ($existe_asociado != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El asociado ya se encuentra registrado',
                ], 300);           
        }

        $returnAsociado = Driver::create($request->all());

        $idDriver = $returnAsociado->id;

        if ($idDriver < 1) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Problemas al ingresar el Asociado',
                ], 300);
        } 

            if($request->get('conductor') == 1) {

                $dataDriversHasDrivers =  array(
                    'driver_id'       => $idDriver,
                    'asociado_id'     => $idDriver,
                    'habilitado'      => true,
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


               $dataConductoresHasCars =  array(
                   'driver_id'       => $idDriver,
                   'car_id'         => 1,
                   'habilitado'      => true,
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
        
              
    }
         
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Datos asociado
        $asociado = Driver::find($id);

        //Moviles
        $moviles = DB::table('conductores_has_cars')
         ->join('cars', 'cars.id', '=', 'conductores_has_cars.car_id')
         ->select(
             'cars.id',
             'cars.patente', 
             'cars.asientos',
             'cars.numero_movil',
             )
         ->where('conductores_has_cars.driver_id', '=', $id)
         ->get(); 

        //Conductores
        $conductores = DB::table('drivers_has_drivers')
        ->join('drivers', 'drivers.id', '=', 'drivers_has_drivers.driver_id')
        ->join('conductores_has_cars', 'conductores_has_cars.driver_id', '=', 'drivers.id')
        ->join('cars', 'cars.id', '=', 'conductores_has_cars.car_id')
        ->select(
            'drivers.id',
            'drivers.name', 
            'drivers.lastname',
            'drivers.rut',
            'drivers.driver_default',
            'cars.numero_movil',
            )
        ->where('drivers_has_drivers.asociado_id', '=', $id)
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
                'item' => $asociado->toArray(),
                'documents' => $documents->toArray(),
                'moviles' => $moviles->toArray(),
                'conductores' => $conductores->toArray(),
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

       
        $validationAsociado = $this->validatorAsociado($request->all());
        
        if ($validationAsociado->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validationAsociado->errors(),
                ], 300);
           
        }

        $request['rut'] = strtoupper(str_replace(array(".", "-", ",","|","*","'"), "", $request['rut'])); 

        Driver::where('id', $id)->update($request->all());
        
        $conductor = $request->get('conductor');

        if($conductor == 1){

                $drivershasdrivers = DriversHasDrivers::where('driver_id',$id)->count(); 
              
                if($drivershasdrivers <= 0){

                        $dataDriversHasDrivers =  array(
                                'driver_id'       => $id,
                                'asociado_id'     => $id,
                                'habilitado'      => true,
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
                }
                
                $conductoreshascars = ConductoresHasCars::where('driver_id',$id)->count(); 

                if($conductoreshascars <= 0){               

                    $dataConductoresHasCars =  array(
                        'driver_id'       => $id,
                        'car_id'         => 1,
                        'habilitado'      => true,
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


            }else{

                DriversHasDrivers::where('driver_id', $id)->delete();
                ConductoresHasCars::where('driver_id', $id)->delete();
                
                //Al dejar de ser conductor, eliminar documentos?
                $document = DriversHasDocuments::where('driver_id', $id)->get();
                $idsDocument = array_column($document->toArray(), 'document_id'); 

                foreach ($idsDocument as $key => $doc) {
                    $documento = Document::findOrFail($doc);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                }
          
            }

        
        // $dataUser = $request->all()['user'];
        // $dataDriver = $resultado = array_merge($dataUser, $request->all()['driver']);
        // $dataCar = $request->all()['car'];

        // $getDriver = Driver::where('id', $dataUser['id'])->first();

        // $dataDriver['user_id'] = $getDriver->user_id;
        // $dataDriver['habilitado'] = $dataUser['habilitado'];
        // $validationDriver = $this->validatorAsociado($dataDriver);
        
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
        
      //  try{
          
           $driver = Driver::findOrFail($id);
           
                    
           if(!is_null($driver)){

                //Trae los ids de los conductores
                $driverHasDrivers =  DriversHasDrivers::where('asociado_id', $id)->get();
                $idsDriver = array_column($driverHasDrivers->toArray(), 'driver_id');
                //Trae los ids de los documentos de los conductores
                $driverHasDriversDocument = DriversHasDocuments::whereIn('driver_id', $idsDriver)->get();
                $idsDocumentDrivers =  array_column($driverHasDriversDocument->toArray(), 'document_id');
                    
                //Elimina los documento de los conductores
                foreach ($idsDocumentDrivers as $x => $doc) {
                    $idDocument = $doc;
                    $documento = Document::findOrFail($idDocument);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                } 

                //Trae los ids de los moviles
                $driverHasCars =  DriversHasCars::where('driver_id', $id)->get();
                $idsCars = array_column($driverHasCars->toArray(), 'car_id');
                //Trae los ids de los documentos de los moviles
                $driverHasCarsDocument = CarsHasDocuments::whereIn('car_id', $idsCars)->get();
                $idsDocumentCars =  array_column($driverHasCarsDocument->toArray(), 'document_id');

                //Elimina los documento de los moviles
                foreach ($idsDocumentCars as $y => $doc) {
                    $idDocument = $doc;
                    $documento = Document::findOrFail($idDocument);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                }   

                //Busca documentos del asociado
                $document = DriversHasDocuments::where('driver_id', $id)->get();
                $idsDocument = array_column($document->toArray(), 'document_id');

                //Elimina documentos del asociado
                foreach ($idsDocument as $key => $doc) {
                    $documento = Document::findOrFail($doc);
                    if($documento){
                        Storage::disk('delete')->delete($documento->url);
                        $documento->delete();
                    }
                }

                //Elimina los moviles
                Car::destroy($idsCars);

                //Elimina los conductores
                Driver::destroy($idsDriver);

                //Elimina el asociado
                $driver->delete();


                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'El Asociado ha sido eliminado!!'
                    ], 200);
            
            }else{
        
                return response()->json(
                    [
                        'status' => 'error',
                        'message' => 'El Asociado no existe!!'
                    ], 300);
            }


       /* }catch(ModelNotFoundException $e){
            
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El Asociado no existe!!!'
                ], 300);
  
        }*/

        
    }

    public function borrar(Request $request)
    {
      
        
        $ids = array_column($request->all(), 'id');
             
        try{

            if(count($ids) > 0 ){      
                
                //Trae los ids de los conductores
                $driverHasDrivers =  DriversHasDrivers::whereIn('asociado_id', $ids)->get();
                $idsDriver = array_column($driverHasDrivers->toArray(), 'driver_id');
                //Trae los ids de los documentos de los conductores
                $driverHasDriversDocument = DriversHasDocuments::whereIn('driver_id', $idsDriver)->get();
                $idsDocumentDrivers =  array_column($driverHasDriversDocument->toArray(), 'document_id');
                    
                //Elimina los documento de los conductores
                foreach ($idsDocumentDrivers as $x => $doc) {
                    $idDocument = $doc;
                    $documento = Document::findOrFail($idDocument);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                } 

                //Trae los ids de los moviles
                $driverHasCars =  DriversHasCars::whereIn('driver_id', $ids)->get();
                $idsCars = array_column($driverHasCars->toArray(), 'car_id');
                //Trae los ids de los documentos de los moviles
                $driverHasCarsDocument = CarsHasDocuments::whereIn('car_id', $idsCars)->get();
                $idsDocumentCars =  array_column($driverHasCarsDocument->toArray(), 'document_id');

                //Elimina los documento de los moviles
                foreach ($idsDocumentCars as $y => $doc) {
                    $idDocument = $doc;
                    $documento = Document::findOrFail($idDocument);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                }   
                
                //Busca documentos del asociado
                $document = DriversHasDocuments::whereIn('driver_id', $ids)->get();
                $idsDocument = array_column($document->toArray(), 'document_id');

                //Elimina documentos del asociado
                 foreach ($idsDocument as $key => $doc) {
                    $documento = Document::findOrFail($doc);
                    if($documento){
                        Storage::disk('delete')->delete($documento->url);
                        $documento->delete();
                    }
                }

                //Elimina los moviles
                Car::destroy($idsCars);

                //Elimina los conductores
                Driver::destroy($idsDriver);

                //Elimina el asociado
                Driver::destroy($ids);                
                
                
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
        $uploadFile = Storage::disk('local')->put('asociados/'.$fileName, file_get_contents($file));

        if($uploadFile == true)
        {

            $url = '/documents/asociados/'.$fileName;
          
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
        //Documentos del asociado
        //Id    Descripcion
        //11    Cedula Identidad
        //12    Contrato
        
        //$driver = DriversHasDocuments::with('documents')->where('driver_id', $id)->get();

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
        ->where('type_documents.tipo', '=', 2)
        ->get(); 
        
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

    public function combo()
    {
        $drivers = Driver::select(
            DB::raw('concat(drivers.name, " ", drivers.lastname) as label'),
            DB::raw('concat(drivers.name, " ", drivers.lastname) as value'),
             )->get();
    
         return response()->json(
            [
                'status' => 'success',
                'items' => $drivers->toArray()
            ], 200);
    }
  
}
