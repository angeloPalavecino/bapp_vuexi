<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agendamientos;


class AgendamientosController extends Controller
{
    public function validator(array $data){ 

        return Validator::make($data, [
             'codificacion_id' => 'required',
             'car_plan_id' => 'required',
             //'car_real_id' => 'required',
             'drivers_plan_id' => 'required', 
             //'drivers_real_id' => 'required', 
             //'observaciones_id' => 'required', 
             //'observacionesinternas_id' => 'required', 
             'tipo' => 'required', 
             'fecha_inicio' => 'required', 
             'fecha_fin' => 'required', 
             'horario_plan' => 'required', 
             //'horario_real' => 'required', 
             'tipo_periodo' => 'required', 
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
        ->join('cars', 'agendamientos.car_plan_id', '=', 'cars.id')
        ->join('drivers', 'agendamientos.drivers_plan_id', '=', 'drivers.id')
        ->join('horarios', 'agendamientos.horario_plan', '=', 'horarios.id')
        ->select(
            'codificaciones.rut',
            'codificaciones.nombre',
            'codificaciones.apellido',
            'codificaciones.direccion',
            'codificaciones.comuna',
            'sucursals.nombre as sucursal',
            'empresas.razon_social',
            'drivers.name as nombre_conductor',
            'drivers.lastname as apellido_conductor',
            'drivers.rut as rut_conductor',
            'horarios.horario',
            'cars.numero_movil',
            'agendamientos.fecha_inicio',
            'agendamientos.fecha_fin',
            'agendamientos.tipo_periodo',
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }
}
