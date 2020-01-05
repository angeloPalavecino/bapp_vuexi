<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use App\Models\Matriz;
use App\Models\HorariosHasSucursales;
use App\Models\GrupoPatronHasSucursales;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MatrizController extends Controller
{

    public function validator(array $data){ 

        return Validator::make($data, [
             'horario_id' => 'required',
             'moviles' => 'required',
             'grupopatrones_id' => 'required',
             'sucursal_id' => 'required',
         ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $matriz = Matriz::join('horarios', 'matrizs.horario_id', '=', 'horarios.id')
        ->join('sucursals', 'matrizs.sucursal_id', '=', 'sucursals.id')
        ->join('grupo_patrons', 'matrizs.grupopatrones_id', '=', 'grupo_patrons.id')
        ->join('cars', 'matrizs.car_id', '=', 'cars.id')
        ->select(
            'matrizs.id',
            'matrizs.horario_id',
            'horarios.horario',
            'matrizs.sucursal_id',
            'sucursals.nombre as sucursal',
            'matrizs.grupopatrones_id',
            'grupo_patrons.codigo as codigo',
            'matrizs.car_id',
            'cars.numero_movil as movil' )
            ->get();
      
        return response()->json(
            [
                'status' => 'success',
                'items' => $matriz->toArray(),
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

        $input = $request->all();
        $horario_id = $input['horario_id'];
        $grupopatrones_id = $input['grupopatrones_id'];
        $sucursal_id = $input['sucursal_id'];
        $moviles = $input['moviles'];
        

        //BORRA LO ANTERIORES        
        Matriz::where('horario_id', $horario_id)
        ->where('grupopatrones_id', $grupopatrones_id)
        ->where('sucursal_id', $sucursal_id)
        ->delete();

        //AGREGA MOVILES MATRIZ
        foreach ($moviles as $keyres => $movil) {
            Matriz::create(
                array(
                       'horario_id'         => $horario_id, 
                       'car_id'             => $movil,
                       'grupopatrones_id'   => $grupopatrones_id, 
                       'sucursal_id'        => $sucursal_id,
                     )
                );           
        }  
   
        return response()->json(
            [
                'status' => 'success',
                'item' => 'El registro ha sido guardado exitosamente!!',
                'sucursal' => $sucursal_id
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
        //DATOS MATRIZ
        $matriz = Matriz::join('horarios', 'matrizs.horario_id', '=', 'horarios.id')
        ->join('sucursals', 'matrizs.sucursal_id', '=', 'sucursals.id')
        ->join('grupo_patrons', 'matrizs.grupopatrones_id', '=', 'grupo_patrons.id')
        ->join('cars', 'matrizs.car_id', '=', 'cars.id')
        ->select(
            'matrizs.id',
            'matrizs.horario_id',
            'horarios.horario',
            'matrizs.sucursal_id',
            'sucursals.nombre as sucursal',
            'matrizs.grupopatrones_id',
            'grupo_patrons.codigo as codigo',
            'matrizs.car_id',
            'cars.numero_movil as movil' )
        ->where('matrizs.sucursal_id',$id)
        ->get();

        //GRUPOS PATRON

        $gpatrones = GrupoPatronHasSucursales::join('grupo_patrons', 'grupo_patron_has_sucursales.grupopatrones_id', '=', 'grupo_patrons.id')
        ->select(
            'grupo_patrons.id',
            'grupo_patrons.codigo')
            ->where('grupo_patron_has_sucursales.sucursal_id',$id)
            ->get();

        //HORARIOS

        $horarios = HorariosHasSucursales::join('horarios', 'horarios_has_sucursales.horario_id', '=', 'horarios.id')
        ->select(
            'horarios.id',
            'horarios.horario')
            ->where('horarios_has_sucursales.sucursal_id',$id)
            ->get();

        

        return response()->json(
            [
                'status' => 'success',
                'items' => $matriz->toArray(),
                'gpatrones' => $gpatrones->toArray(),
                'horarios' => $horarios->toArray(),

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

        $matriz = Matriz::where('id',$id)->first(); 

        if(!is_null($matriz)){
    
            $input = $request->all();
            $horario_id = $input['horario_id'];
            $grupopatrones_id = $input['grupopatrones_id'];
            $sucursal_id = $input['sucursal_id'];
            $moviles = $input['moviles'];
            
    
            //BORRA LO ANTERIORES        
            Matriz::where('horario_id', $horario_id)
            ->where('grupopatrones_id', $grupopatrones_id)
            ->where('sucursal_id', $sucursal_id)
            ->delete();
    
            //AGREGA MOVILES MATRIZ
            foreach ($moviles as $keyres => $movil) {
                Matriz::create(
                    array(
                           'horario_id'         => $horario_id, 
                           'car_id'             => $movil,
                           'grupopatrones_id'   => $grupopatrones_id, 
                           'sucursal_id'        => $sucursal_id,
                         )
                    );           
            }  

           
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
          
            $matriz = Matriz::findOrFail($id);
             
            if(!is_null($matriz)){
                 
                 $matriz->delete();
 
                 return response()->json(
                     [
                         'status' => 'success',
                         'message' => 'El registro ha sido eliminado!!'
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

}
