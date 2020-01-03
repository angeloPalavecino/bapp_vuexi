<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::prefix('v1')->group(function () {

    
    Route::prefix('auth')->group(function () {
        // Below mention routes are public, user can access those without any restriction.
        // Create New User
        Route::post('register', 'AuthController@register');
        // Login User
        Route::post('login', 'AuthController@login');
        
        // Refresh the JWT Token
        Route::get('refresh', 'AuthController@refresh');
        
        // Below mention routes are available only for the authenticated users.
        Route::middleware('auth:api')->group(function () {
            // Get user info
            Route::get('user', 'AuthController@user');
             // Logout user from application
            Route::post('logout', 'AuthController@logout');

        });

      
    });
    //USUARIOS
    Route::prefix('users')->group(function () {
       // Route::middleware('auth:api')->group(function () {
            // Usuarios
            Route::get('users', 'UserController@index');
            Route::get('users/create', 'UserController@create');
            Route::get('users/{id}', 'UserController@show');
            Route::delete('users/{id}', 'UserController@destroy');
            Route::post('users/borrar', 'UserController@borrar');
            Route::put('users/{id}', 'UserController@update');
            Route::post('users/store', 'UserController@store');
            Route::get('users/{id}/edit', 'UserController@edit');
            Route::get('perfil', 'UserController@perfil');
            Route::post('cambiarpass', 'UserController@cambiarpass');
            Route::get('cars/{id}', 'UserController@cars');
            
      //  });
    });
    //ROLES
    Route::prefix('roles')->group(function () {
       // Route::middleware('auth:api')->group(function () {
            // Roles
            Route::get('roles', 'RoleController@index');
            Route::get('roles/create', 'RoleController@create');
            Route::get('roles/{id}', 'RoleController@show');
            Route::delete('roles/{id}', 'RoleController@destroy');
            Route::post('roles/borrar', 'RoleController@borrar');
            Route::put('roles/{id}', 'RoleController@update');
            Route::post('roles/store', 'RoleController@store');
            Route::get('roles/{id}/edit', 'RoleController@edit');
            Route::get('combo', 'RoleController@combo');


      // });
    });
    //PERMISOS
    Route::prefix('permisos')->group(function () {
        //Route::middleware('auth:api')->group(function () {
            // Permisos
            Route::get('permisos', 'PermisosController@index');
        //});
    });


     //CICLO FACTURACION
     Route::prefix('ciclofacturacion')->group(function () {
       // Route::middleware('auth:api')->group(function () {
            // Ciclo facturacion
            Route::get('ciclofacturacion', 'CiclofacturacionController@index');
            Route::get('ciclofacturacion/create', 'CiclofacturacionController@create');
            Route::get('ciclofacturacion/{id}', 'CiclofacturacionController@show');
            Route::delete('ciclofacturacion/{id}', 'CiclofacturacionController@destroy');
            Route::post('ciclofacturacion/borrar', 'CiclofacturacionController@borrar');
            Route::put('ciclofacturacion/{id}', 'CiclofacturacionController@update');
            Route::post('ciclofacturacion/store', 'CiclofacturacionController@store');
            Route::get('ciclofacturacion/{id}/edit', 'CiclofacturacionController@edit');


      // });
    });

     //CICLO PRODUCCION
     Route::prefix('cicloproduccion')->group(function () {
     //   Route::middleware('auth:api')->group(function () {
            // Ciclo produccion
            Route::get('cicloproduccion', 'CicloproduccionController@index');
            Route::get('cicloproduccion/create', 'CicloproduccionController@create');
            Route::get('cicloproduccion/{id}', 'CicloproduccionController@show');
            Route::delete('cicloproduccion/{id}', 'CicloproduccionController@destroy');
            Route::post('cicloproduccion/borrar', 'CicloproduccionController@borrar');
            Route::put('cicloproduccion/{id}', 'CicloproduccionController@update');
            Route::post('cicloproduccion/store', 'CicloproduccionController@store');
            Route::get('cicloproduccion/{id}/edit', 'CicloproduccionController@edit');


      // });
    });

    //EMPRESA
    Route::prefix('empresas')->group(function () {
      //  Route::middleware('auth:api')->group(function () {
            // Empresa
            Route::get('empresas', 'EmpresaController@index');
            Route::get('empresas/create', 'EmpresaController@create');
            Route::get('empresas/{id}', 'EmpresaController@show');
            Route::delete('empresas/{id}', 'EmpresaController@destroy');
            Route::post('empresas/borrar', 'EmpresaController@borrar');
            Route::put('empresas/{id}', 'EmpresaController@update');
            Route::post('empresas/store', 'EmpresaController@store');
            Route::get('empresas/{id}/edit', 'EmpresaController@edit');
            Route::get('empresas/otros/{id}', 'EmpresaController@otros');
            Route::get('listemp', 'EmpresaController@listemp');
            Route::get('combo', 'EmpresaController@combo');

      // });
    });

    //EXCEPCIONES
    Route::prefix('excepciones')->group(function () {
      //  Route::middleware('auth:api')->group(function () {
            // Excepciones
            Route::get('excepciones', 'ExcepcionesController@index');
            Route::get('excepciones/create', 'ExcepcionesController@create');
            Route::get('excepciones/{id}', 'ExcepcionesController@show');
            Route::delete('excepciones/{id}', 'ExcepcionesController@destroy');
            Route::post('excepciones/borrar', 'ExcepcionesController@borrar');
            Route::put('excepciones/{id}', 'ExcepcionesController@update');
            Route::post('excepciones/store', 'ExcepcionesController@store');
            Route::get('excepciones/{id}/edit', 'ExcepcionesController@edit');


      // });
    });

     //FUERA ZONA
     Route::prefix('fuerazonas')->group(function () {
       // Route::middleware('auth:api')->group(function () {
            // Fuera Zona
            Route::get('fuerazonas', 'FuerazonaController@index');
            Route::get('fuerazonas/create', 'FuerazonaController@create');
            Route::get('fuerazonas/{id}', 'FuerazonaController@show');
            Route::delete('fuerazonas/{id}', 'FuerazonaController@destroy');
            Route::post('fuerazonas/borrar', 'FuerazonaController@borrar');
            Route::put('fuerazonas/{id}', 'FuerazonaController@update');
            Route::post('fuerazonas/store', 'FuerazonaController@store');
            Route::get('fuerazonas/{id}/edit', 'FuerazonaController@edit');


       //});
    });

     //OBSERVACIONES
     Route::prefix('observaciones')->group(function () {
       // Route::middleware('auth:api')->group(function () {
            // Observaciones
            Route::get('observaciones', 'ObservacionesController@index');
            Route::get('observaciones/create', 'ObservacionesController@create');
            Route::get('observaciones/{id}', 'ObservacionesController@show');
            Route::delete('observaciones/{id}', 'ObservacionesController@destroy');
            Route::post('observaciones/borrar', 'ObservacionesController@borrar');
            Route::put('observaciones/{id}', 'ObservacionesController@update');
            Route::post('observaciones/store', 'ObservacionesController@store');
            Route::get('observaciones/{id}/edit', 'ObservacionesController@edit');


      // });
    });


    //OBSERVACIONES INTERNAS
    Route::prefix('observacionesinternas')->group(function () {
       // Route::middleware('auth:api')->group(function () {
            // Observaciones Internas
            Route::get('observacionesinternas', 'ObservacionesinternasController@index');
            Route::get('observacionesinternas/create', 'ObservacionesinternasController@create');
            Route::get('observacionesinternas/{id}', 'ObservacionesinternasController@show');
            Route::delete('observacionesinternas/{id}', 'ObservacionesinternasController@destroy');
            Route::post('observacionesinternas/borrar', 'ObservacionesinternasController@borrar');
            Route::put('observacionesinternas/{id}', 'ObservacionesinternasController@update');
            Route::post('observacionesinternas/store', 'ObservacionesinternasController@store');
            Route::get('observacionesinternas/{id}/edit', 'ObservacionesinternasController@edit');


       //});
    });

    //RESPONSABLE
    Route::prefix('responsable')->group(function () {
     //   Route::middleware('auth:api')->group(function () {
            // Responsable
            Route::get('responsable', 'ResponsableController@index');
            Route::get('responsable/create', 'ResponsableController@create');
            Route::get('responsable/{id}', 'ResponsableController@show');
            Route::delete('responsable/{id}', 'ResponsableController@destroy');
            Route::post('responsable/borrar', 'ResponsableController@borrar');
            Route::put('responsable/{id}', 'ResponsableController@update');
            Route::post('responsable/store', 'ResponsableController@store');
            Route::get('responsable/{id}/edit', 'ResponsableController@edit');


      // });
    });

    //SUCURSAL
    Route::prefix('sucursal')->group(function () {
     //   Route::middleware('auth:api')->group(function () {
            // Sucursal
            Route::get('sucursal', 'SucursalController@index');
            Route::get('sucursal/create', 'SucursalController@create');
            Route::get('sucursal/{id}', 'SucursalController@show');
            Route::delete('sucursal/{id}', 'SucursalController@destroy');
            Route::post('sucursal/borrar', 'SucursalController@borrar');
            Route::put('sucursal/{id}', 'SucursalController@update');
            Route::post('sucursal/store', 'SucursalController@store');
            Route::get('sucursal/{id}/edit', 'SucursalController@edit');
            Route::get('combo/{id}', 'SucursalController@combo');


      // });
    });

    //CONDUCTORES
    Route::prefix('driver')->group(function () {
      //  Route::middleware('auth:api')->group(function () {
        // CONDUCTORES
            Route::get('driver', 'DriverController@index');
            Route::get('driver/create', 'DriverController@create');
            Route::get('driver/{id}', 'DriverController@show');
            Route::delete('driver/{id}', 'DriverController@destroy');
            Route::post('driver/borrar', 'DriverController@borrar');
            Route::put('driver/{id}', 'DriverController@update');
            Route::post('driver/store', 'DriverController@store');
            Route::get('driver/{id}/edit', 'DriverController@edit');
            Route::post('driver/upload', 'DriverController@upload');
            Route::get('driver/documents/{id}', 'DriverController@documents');
            Route::get('driver/document/{id}', 'DriverController@document');
            //Route::get('combo', 'DriverController@combo');
            //Route::get('moviles', 'DriverController@moviles');
     //   });
    });

    //ASOCIADOS
    Route::prefix('asociado')->group(function () {
      //  Route::middleware('auth:api')->group(function () {
        // ASOCIADOS
            Route::get('asociado', 'AsociadoController@index');
            Route::get('asociado/create', 'AsociadoController@create');
            Route::get('asociado/{id}', 'AsociadoController@show');
            Route::delete('asociado/{id}', 'AsociadoController@destroy');
            Route::post('asociado/borrar', 'AsociadoController@borrar');
            Route::put('asociado/{id}', 'AsociadoController@update');
            Route::post('asociado/store', 'AsociadoController@store');
            Route::get('asociado/{id}/edit', 'AsociadoController@edit');
            Route::post('asociado/upload', 'AsociadoController@upload');
            Route::get('asociado/documents/{id}', 'AsociadoController@documents');
            Route::get('asociado/document/{id}', 'AsociadoController@document');
            Route::get('combo', 'AsociadoController@combo');
       //  });
    });

    //CAR
    Route::prefix('car')->group(function () {
       // Route::middleware('auth:api')->group(function () {
        // CAR
            Route::get('car', 'CarController@index');
            Route::get('car/create', 'CarController@create');
            Route::get('car/{id}', 'CarController@show');
            Route::delete('car/{id}', 'CarController@destroy');
            Route::post('car/borrar', 'CarController@borrar');
            Route::put('car/{id}', 'CarController@update');
            Route::post('car/store', 'CarController@store');
            Route::get('car/{id}/edit', 'CarController@edit');
            Route::post('car/upload', 'CarController@upload');
            Route::get('car/documents/{id}', 'CarController@documents');
            Route::get('car/document/{id}', 'CarController@document');
            Route::get('cars', 'CarController@cars');
            Route::get('carsall', 'CarController@carsall');
            Route::get('combo', 'CarController@combo');
            // Route::get('cars', 'CarController@cars');
            // Route::get('moviles', 'DriverController@moviles');
      //  });
    });

    //TIPO DOCUMENTOS
    Route::prefix('tipodocumentos')->group(function () {
       // Route::middleware('auth:api')->group(function () {
      // TIPO DOCUMENTOS
          Route::get('tipodocumentos', 'TipoDocumentosController@index');
          Route::get('tipodocumentos/create', 'TipoDocumentosController@create');
          Route::get('tipodocumentos/{id}', 'TipoDocumentosController@show');
          Route::delete('tipodocumentos/{id}', 'TipoDocumentosController@destroy');
          Route::post('tipodocumentos/borrar', 'TipoDocumentosController@borrar');
          Route::put('tipodocumentos/{id}', 'TipoDocumentosController@update');
          Route::post('tipodocumentos/store', 'TipoDocumentosController@store');
          Route::get('tipodocumentos/{id}/edit', 'TipoDocumentosController@edit');
     
       //  });
  });    

    //TARIFAS
    Route::prefix('tarifas')->group(function () {
      //  Route::middleware('auth:api')->group(function () {

        // Servicio Pasajeros
        Route::get('pasajeros', 'ServiciosPasajerosController@index');
        Route::get('pasajeros/listado/{id}', 'ServiciosPasajerosController@listado');
        Route::get('pasajeros/create', 'ServiciosPasajerosController@create');
        Route::get('pasajeros/{id}', 'ServiciosPasajerosController@show');
        Route::delete('pasajeros/{id}', 'ServiciosPasajerosController@destroy');
        Route::post('pasajeros/borrar', 'ServiciosPasajerosController@borrar');
        Route::put('pasajeros/{id}', 'ServiciosPasajerosController@update');
        Route::post('pasajeros/store', 'ServiciosPasajerosController@store');
        Route::get('pasajeros/{id}/edit', 'ServiciosPasajerosController@edit');

        // Servicio KMS
        Route::get('kms', 'ServiciosKMSController@index');
        Route::get('kms/listado/{id}', 'ServiciosKMSController@listado');
        Route::get('kms/create', 'ServiciosKMSController@create');
        Route::get('kms/{id}', 'ServiciosKMSController@show');
        Route::delete('kms/{id}', 'ServiciosKMSController@destroy');
        Route::post('kms/borrar', 'ServiciosKMSController@borrar');
        Route::put('kms/{id}', 'ServiciosKMSController@update');
        Route::post('kms/store', 'ServiciosKMSController@store');
        Route::get('kms/{id}/edit', 'ServiciosKMSController@edit');

        // Servicio Plana
        Route::get('planas', 'ServiciosPlanasController@index');
        Route::get('planas/listado/{id}', 'ServiciosPlanasController@listado');
        Route::get('planas/create', 'ServiciosPlanasController@create');
        Route::get('planas/{id}', 'ServiciosPlanasController@show');
        Route::delete('planas/{id}', 'ServiciosPlanasController@destroy');
        Route::post('planas/borrar', 'ServiciosPlanasController@borrar');
        Route::put('planas/{id}', 'ServiciosPlanasController@update');
        Route::post('planas/store', 'ServiciosPlanasController@store');
        Route::get('planas/{id}/edit', 'ServiciosPlanasController@edit');
     
      //   });
  }); 


      //PATRONES
      Route::prefix('patrones')->group(function () {
          
       // Route::middleware('auth:api')->group(function () {
        // PATRONES
            Route::get('patrones', 'PatronesController@index');
            Route::get('patrones/create', 'PatronesController@create');
            Route::get('patrones/{id}', 'PatronesController@show');
            Route::delete('patrones/{id}', 'PatronesController@destroy');
            Route::post('patrones/borrar', 'PatronesController@borrar');
            Route::put('patrones/{id}', 'PatronesController@update');
            Route::post('patrones/store', 'PatronesController@store');
            Route::get('patrones/{id}/edit', 'PatronesController@edit');
            Route::get('patrones/combo/{id}', 'PatronesController@combo');
       // });

     //   Route::middleware('auth:api')->group(function () {
        // GRUPO PATRONES
            Route::get('grupos', 'GruposPatronesController@index');
            Route::get('grupos/create', 'GruposPatronesController@create');
            Route::get('grupos/{id}', 'GruposPatronesController@show');
            Route::delete('grupos/{id}', 'GruposPatronesController@destroy');
            Route::post('grupos/borrar', 'GruposPatronesController@borrar');
            Route::put('grupos/{id}', 'GruposPatronesController@update');
            Route::post('grupos/store', 'GruposPatronesController@store');
            Route::get('grupos/{id}/edit', 'GruposPatronesController@edit');
            Route::get('grupos/combo/{id}', 'GruposPatronesController@combo');
            Route::get('grupos/codigos/{id}', 'GruposPatronesController@codigos');

      //  });
    });

     //CODIFICACIONES
     Route::prefix('codificaciones')->group(function () {
          
      // Route::middleware('auth:api')->group(function () {
       // CODIFICACIONES
           Route::get('codificaciones', 'CodificacionesController@index');
           Route::get('codificaciones/create', 'CodificacionesController@create');
           Route::get('codificaciones/{id}', 'CodificacionesController@show');
           Route::delete('codificaciones/{id}', 'CodificacionesController@destroy');
           Route::post('codificaciones/borrar', 'CodificacionesController@borrar');
           Route::put('codificaciones/{id}', 'CodificacionesController@update');
           Route::post('codificaciones/store', 'CodificacionesController@store');
           Route::get('codificaciones/{id}/edit', 'CodificacionesController@edit');
           Route::post('codificaciones/importar', 'CodificacionesController@importar');
      //     Route::get('patrones/combo/{id}', 'CodificacionesController@combo');
      // });

      });

       //HORARIOS
     Route::prefix('horarios')->group(function () {
          
      // Route::middleware('auth:api')->group(function () {
       // HORARIOS
           Route::get('horarios', 'HorariosController@index');
           Route::get('horarios/create', 'HorariosController@create');
           Route::get('horarios/{id}', 'HorariosController@show');
           Route::delete('horarios/{id}', 'HorariosController@destroy');
           Route::post('horarios/borrar', 'HorariosController@borrar');
           Route::put('horarios/{id}', 'HorariosController@update');
           Route::post('horarios/store', 'HorariosController@store');
           Route::get('horarios/{id}/edit', 'HorariosController@edit');
           Route::post('horarios/importar', 'HorariosController@importar');
           Route::get('horarios/combo/{id}', 'HorariosController@combo');
      // });

      });

      //MATRIZ
     Route::prefix('matriz')->group(function () {
          
      // Route::middleware('auth:api')->group(function () {
       //MATRIZ
           Route::get('matriz', 'MatrizController@index');
           Route::get('matriz/create', 'MatrizController@create');
           Route::get('matriz/{id}', 'MatrizController@show');
           Route::delete('matriz/{id}', 'MatrizController@destroy');
           Route::post('matriz/borrar', 'MatrizController@borrar');
           Route::put('matriz/{id}', 'MatrizController@update');
           Route::post('matriz/store', 'MatrizController@store');
           Route::get('matriz/{id}/edit', 'MatrizController@edit');
           Route::post('matriz/importar', 'MatrizController@importar');
           Route::get('matriz/combo/{id}', 'MatrizController@combo');
      // });

      });

        

});
