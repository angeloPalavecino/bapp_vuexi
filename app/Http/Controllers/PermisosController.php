<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Spatie\Permission\Models\Permission;


class PermisosController extends Controller
{
     
    public function index()
    {
        $permisos = Permission::all();
        $x = -1;
        $aux = array();
        $auxNom = [];
        $Nom = "";
        
        //dd($permisos->toArray());
        foreach ($permisos->toArray() as $items) {
            $auxNom = explode('.', $items['name'], 2);  
            
            if($Nom != $auxNom[0]){
                $Nom = $auxNom[0];
                $x++;
                $aux[$x] = [ "modulos" => PermisosController::nombres($Nom) , "roles" => [], ];
                
            }            
           
           array_push( $aux[$x]['roles'] , [ "name" => PermisosController::nombres($Nom)." - ".PermisosController::nombres($auxNom[1]), "id" => $items['id']]);
            
        }
        //    dd($aux);
        /*foreach ($permisos->toArray() as $items) {
            $auxNom = explode('.', $items['name'], 2);  
            
            if($Nom != $auxNom[0]){
                $Nom = $auxNom[0];
                $x++;
                $aux[$x] = [ "title" => $Nom , "expanded" => true, "children" => [], ];
                
            }            
           
           array_push( $aux[$x]['children'] , [ "title" => $auxNom[1], "id" => $items['id'], "expanded" => true]);
            
        }*/
   
   
        return response()->json(
            [
                'status' => 'success',
                'permisos' => $permisos->toArray(),
                'permisos_aux' => $aux,
            ], 200);
    }


    public function nombres($nombre){
        switch ($nombre) {
            case "users":
                return "Usuario";
                break;
            case "roles":
                return "Roles";
                break;
            case "obsinternas":
                return "Obs. Internas";
                break;
            case "fuerazona":
                return "Fuera de Zona";
                break;
            case "index":
                return "Inicio";
                break;
            case "edit":
                return "Editar";
                break;
            case "show":
                return "Ver";
                break;
            case "destroy":
                return "Eliminar";
                break;
            case "create":
                return "Crear";
                break;
            case "store":
                return "Agregar";
                break;
            case "update":
                return "Actualizar";
                break;
            case "servpasajeros":
                return "Tarifa Pasajeros";
                break;
            case "servkms":
                return "Tarifa KMS";
                break;
            case "servplanas":
                return "Tarifa Plana";
                break;
            case "grupopatrones":
                return "Grupo de Patrones";
                break;                    
            default:
                return ucwords($nombre);
                break;

                
        }

    } 


}
