<?php

namespace App\Http\Controllers;
use Validator;
use DB;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\CarsHasDocuments;
use App\Models\Document;
use App\Models\DriversHasCars;
use App\Models\ConductoresHasCars;
use Illuminate\Support\Facades\Storage;



class CarController extends Controller
{
    
    public function validatorCar(array $data){ 

        return Validator::make($data, [
            'tipo' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'ano' => 'required|numeric',
            'motor' => 'required', 
            'patente' => 'required',
            'habilitado' => 'required',
            'color' => 'required',
            'asientos' => 'required|numeric',
         ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$car = Car::with('asociados')->get();
       $car = DB::table('cars')
              ->join('drivers_has_cars', 'drivers_has_cars.car_id', '=', 'cars.id')
              ->join('drivers', 'drivers.id', '=', 'drivers_has_cars.driver_id')
              ->select(
                  'cars.id', 
                  'cars.tipo', 
                  'cars.marca',
                  'cars.modelo', 
                  'cars.ano', 
                  'cars.motor', 
                  'cars.patente', 
                  'cars.color',
                  'cars.asientos', 
                  'cars.habilitado',
                  'cars.empresa_id', 
                  'cars.numero_movil',
                  'drivers_has_cars.driver_id',
                  'drivers_has_cars.car_id',
                  'drivers.name',
                  'drivers.lastname'

                  )
              ->where('cars.id', '>', 1)
              ->get();
       //dd($car);
        return response()->json(
        [
            'status' => 'success',
            'items' => $car->toArray(),
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

        $validationCar = $this->validatorCar($request->all());
        if ($validationCar->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validationDriver->errors(),
                ], 300);
           
        }

        $existe_car = Car::where('patente', $request['patente'])->first();
        if ($existe_car != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El movil ya se encuentra registrado',
                ], 300);           
        }

        $existe_car = Car::where('numero_movil', $request['numero_movil'])->first();
        if ($existe_car != null) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'El n° de movil ya se encuentra registrado',
                ], 300);           
        }

        $returnCar = Car::create($request->all());

        $idCar = $returnCar->id;

        if ($idCar < 1) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Problemas al ingresar el movil',
                ], 300);
        } 
        
        $dataDriversHasCars =  array(
            'driver_id'  => $request["driver_id"],
            'car_id'     => $idCar,
            'habilitado' => true,
        );
        $returnDriverHasCars = DriversHasCars::create($dataDriversHasCars);       
        $returnIdDriversHasCars = $returnDriverHasCars->id;
        if ($returnIdDriversHasCars < 1) {
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
        $car = DB::table('cars')
        ->join('drivers_has_cars', 'drivers_has_cars.car_id', '=', 'cars.id')
        ->join('drivers', 'drivers.id', '=', 'drivers_has_cars.driver_id')
        ->join('empresas', 'empresas.id', '=', 'cars.empresa_id')
        ->select(
            'cars.id', 
            'cars.tipo', 
            'cars.marca',
            'cars.modelo', 
            'cars.ano', 
            'cars.motor', 
            'cars.patente', 
            'cars.color',
            'cars.asientos', 
            'cars.habilitado',
            'cars.empresa_id', 
            'cars.numero_movil',
            'cars.created_at',
            'cars.updated_at',
            'drivers_has_cars.driver_id',
            'drivers_has_cars.car_id',
            'drivers.name',
            'drivers.lastname',
            'empresas.razon_social'

            )
        ->where('cars.id', '=', $id)
        ->get();

        $documents = DB::table('cars_has_documents')
        ->join('documents', 'documents.id', '=', 'cars_has_documents.document_id')
        ->join('type_documents', 'type_documents.id', '=', 'documents.type_document_id')
        ->select(
            'documents.id',
            'documents.type_document_id', 
            'documents.name',
            'documents.url',
            'documents.informacion',
            'documents.fecha_vencimiento',
            'documents.habilitado', 
            'cars_has_documents.car_id',
            'cars_has_documents.document_id',
            'cars_has_documents.habilitado as hashabilitado'
            )
        ->where('cars_has_documents.car_id', '=', $id)
        ->where('type_documents.tipo', '=', 0)
        ->get(); 

        return response()->json(
            [
                'status' => 'success',
                'item' => $car->toArray(),
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
        
        $validationCar = $this->validatorCar($request->all());
        
        if ($validationCar->fails()) {

            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validationCar->errors(),
                ], 300);
           
        }
        Car::where('id', $id)->update($request->except(['driver_id']));

        $dataDriversHasCars =  array(
            'driver_id'  => $request["driver_id"],
        );
        
        DriversHasCars::where('car_id', $id)->update($dataDriversHasCars);       
  
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
          
           $car = Car::findOrFail($id);
           $document = CarsHasDocuments::where('car_id', $id)->get();
           $idsDocument = array_column($document->toArray(), 'document_id'); 

           //Busca id de conductores con el movil que se eliminara
           $conductorhasCars = ConductoresHasCars::select('driver_id')->where('car_id', $id)->get();

           if(!is_null($car)){
                
                foreach ($idsDocument as $key => $doc) {
                    $documento = Document::findOrFail($doc);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                }


                //Actualiza a "sin movil" a los conductores que se les elimino el movil
                $dataConductoresHasCars =  array(
                    'car_id'  => 1,
                );
                ConductoresHasCars::whereIN('driver_id', $conductorhasCars->toArray())->update($dataConductoresHasCars);
                
                $car->delete();

                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'El Movil ha sido eliminado!!'
                    ], 200);
            
            }else{
        
                return response()->json(
                    [
                        'status' => 'error',
                        'message' => 'El Movil no existe!!'
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
        $document = CarsHasDocuments::whereIn('car_id', $ids)->get();

        $idsDocument = array_column($document->toArray(), 'document_id'); 

        //Busca id de conductores con el movil que se eliminara
        $conductorhasCars = ConductoresHasCars::select('driver_id')->whereIn('car_id', $ids)->get();
        
        try{

            if(count($ids) > 0 ){          
                
                foreach ($idsDocument as $key => $doc) {
                    $documento = Document::findOrFail($doc);
                    Storage::disk('delete')->delete($documento->url);
                    $documento->delete();
                }

                //Actualiza a "sin movil" a los conductores que se les elimino el movil
                 $dataConductoresHasCars =  array(
                    'car_id'  => 1,
                );
                ConductoresHasCars::whereIN('driver_id', $conductorhasCars->toArray())->update($dataConductoresHasCars);
                   

                Car::destroy($ids);
                
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
        $fileNameSinExtencion = $request->id."-".$request->tipo_documento; //numero_movil
        $fileName = $request->id."-".$request->tipo_documento.'.'.$extension;//$file->getClientOriginalName(); numero_movil
        $exists = Document::where('name', $fileNameSinExtencion)->first();
        $uploadFile = Storage::disk('local')->put('cars/'.$fileName, file_get_contents($file));

        if($uploadFile == true)
        {

            $url = '/documents/cars/'.$fileName;
          
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
                    $dataHas = CarsHasDocuments::create(
                        array(
                            'car_id'     => $request->id,
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
            ], 200);     }

    public function documents ($id)
    {
               
       // $car = CarsHasDocuments::with('documents')->where('car_id', $id)->get();
       
       $car = DB::table('cars_has_documents')
       ->join('documents', 'documents.id', '=', 'cars_has_documents.document_id')
       ->join('type_documents', 'type_documents.id', '=', 'documents.type_document_id')
       ->select(
           'documents.id',
           'documents.type_document_id', 
           'documents.name',
           'documents.url',
           'documents.informacion',
           'documents.fecha_vencimiento',
           'documents.habilitado', 
           'cars_has_documents.car_id',
           'cars_has_documents.document_id',
           'cars_has_documents.habilitado as hashabilitado'
           )
       ->where('cars_has_documents.car_id', '=', $id)
       ->where('type_documents.tipo', '=', 0)
       ->get(); 


        return response()->json(
            [
                'status' => 'success',
                'items' => $car->toArray(),
            ], 200); 
    }

    public function document ($id)
    {
        $document = Document::where('id', $id)->first();
        return response()->download(storage_path($document->url), $document->name);
    }

      //Moviles para usuarios
      public function cars()
      {
         
          $cars = Car::select('id','tipo', 'numero_movil','patente')->where('id', '>', 1)->get();
  
          return response()->json(
              [
                  'status' => 'success',
                  'items' => $cars->toArray(),
              ], 200);    
      }


      //Moviles para usuarios
      public function carsall()
      {
         
          $cars = Car::select('id', 'numero_movil','patente')->get();
  
          return response()->json(
              [
                  'status' => 'success',
                  'items' => $cars->toArray(),
              ], 200);    
      }

    public function combo()
    {
        $cars = Car::select(
            'cars.numero_movil as label',
            'cars.numero_movil as value' )->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $cars->toArray()
            ], 200);
    }

    public function matriz($id)
    {
        $cars = Car::select(
            'cars.id',
            'cars.numero_movil' )->where('habilitado',true)->where('empresa_id',$id)->get();

        return response()->json(
            [
                'status' => 'success',
                'items' => $cars->toArray()
            ], 200);
    }

    

}
