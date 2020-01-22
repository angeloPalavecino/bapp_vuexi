/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
                
              },
              
              // =============================================================================
              // PERFIL
              // =============================================================================
              {
                path: '/pages/perfil/:itemId',
                name: 'perfil',
                component: () => import('@/views/pages/perfil/Perfil.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Perfil' },
                        { title: 'Ver perfil', active: true },
                    ],
                    pageTitle: 'Ver perfil',
                    authRequired: true,
                    
                },
              },

              // =============================================================================
              // ADMINISTRACION
              // =============================================================================
              
              //Usuarios
              {
                path: '/pages/administracion/users/item-list/itemlist',
                name: 'users',
                component: () => import('./views/pages/administracion/users/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de usuario'},
                    { title: 'Lista de usuario', active: true },
                    ],
                    pageTitle: 'Lista de usuario',
                    authRequired: true
                }
              },     
              {
                path: '/pages/administracion/users/item-view/:itemId',
                name: 'user-view',
                component: () => import('@/views/pages/administracion/users/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Usuario' },
                        { title: 'Ver usuario', active: true },
                    ],
                    pageTitle: 'Ver usuario',
                    authRequired: true,
                    parent: 'users'
                    
                },
              },
              {
                path: '/pages/administracion/users/item-edit/:itemId',
                name: 'user-edit',
                component: () => import('@/views/pages/administracion/users/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Usuario' },
                        { title: 'Editar usuario', active: true },
                    ],
                    pageTitle: 'Editar usuario',
                    authRequired: true,
                    parent: 'users'
                },
              },
              {
              path: '/pages/administracion/users/item-add/',
              name: 'user-add',
              component: () => import('@/views/pages/administracion/users/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Usuario' },
                      { title: 'Agregar usuario', active: true },
                  ],
                  pageTitle: 'Agregar usuario',
                  authRequired: true,
                  parent: 'users'
              },
              },
              //Roles
              {
                path: '/pages/administracion/roles/item-list/itemlist',
                name: 'roles',
                component: () => import('./views/pages/administracion/roles/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de roles'},
                    { title: 'Lista de roles', active: true },
                    ],
                    pageTitle: 'Lista de roles',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/roles/item-view/:itemId',
                name: 'roles-view',
                component: () => import('@/views/pages/administracion/roles/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Rol' },
                        { title: 'Ver rol', active: true },
                    ],
                    pageTitle: 'Ver rol',
                    authRequired: true,
                    parent: 'roles'
                },
              },
              {
                path: '/pages/administracion/roles/item-edit/:itemId',
                name: 'roles-edit',
                component: () => import('@/views/pages/administracion/roles/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Rol' },
                        { title: 'Editar rol', active: true },
                    ],
                    pageTitle: 'Editar rol',
                    authRequired: true,
                    parent: 'roles'
                },
              },
              {
              path: '/pages/administracion/roles/item-add/',
              name: 'roles-add',
              component: () => import('@/views/pages/administracion/roles/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Rol' },
                      { title: 'Agregar rol', active: true },
                  ],
                  pageTitle: 'Agregar rol',
                  authRequired: true,
                  parent: 'roles'
              },
              },
              //Observaciones
              {
                path: '/pages/administracion/observaciones/item-list/itemlist',
                name: 'observaciones',
                component: () => import('./views/pages/administracion/observaciones/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de observaciones'},
                    { title: 'Lista de observaciones', active: true },
                    ],
                    pageTitle: 'Lista de observaciones',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/observaciones/item-view/:itemId',
                name: 'observaciones-view',
                component: () => import('@/views/pages/administracion/observaciones/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Observacion' },
                        { title: 'Ver observacion', active: true },
                    ],
                    pageTitle: 'Ver observacion',
                    authRequired: true,
                    parent: 'observaciones'
                },
              },
              {
                path: '/pages/administracion/observaciones/item-edit/:itemId',
                name: 'observaciones-edit',
                component: () => import('@/views/pages/administracion/observaciones/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Observacion' },
                        { title: 'Editar observacion', active: true },
                    ],
                    pageTitle: 'Editar observacion',
                    authRequired: true,
                    parent: 'observaciones'
                },
              },
              {
              path: '/pages/administracion/observaciones/item-add/',
              name: 'observaciones-add',
              component: () => import('@/views/pages/administracion/observaciones/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Observacion' },
                      { title: 'Agregar observacion', active: true },
                  ],
                  pageTitle: 'Agregar observacion',
                  authRequired: true,
                  parent: 'observaciones'
              },
              },
                //Observaciones internas
              {
                path: '/pages/administracion/obsinternas/item-list/itemlist',
                name: 'obsinternas',
                component: () => import('./views/pages/administracion/obsinternas/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de observaciones internas'},
                    { title: 'Lista de observaciones internas', active: true },
                    ],
                    pageTitle: 'Lista de observaciones internas',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/obsinternas/item-view/:itemId',
                name: 'obsinternas-view',
                component: () => import('@/views/pages/administracion/obsinternas/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Observacion interna' },
                        { title: 'Ver observacion interna', active: true },
                    ],
                    pageTitle: 'Ver observacion interna',
                    authRequired: true,
                    parent: 'obsinternas'
                },
              },
              {
                path: '/pages/administracion/obsinternas/item-edit/:itemId',
                name: 'obsinternas-edit',
                component: () => import('@/views/pages/administracion/obsinternas/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Observacion interna' },
                        { title: 'Editar observacion interna', active: true },
                    ],
                    pageTitle: 'Editar observacion interna',
                    authRequired: true,
                    parent: 'obsinternas'
                },
              },
              {
              path: '/pages/administracion/obsinternas/item-add/',
              name: 'obsinternas-add',
              component: () => import('@/views/pages/administracion/obsinternas/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Observacion interna' },
                      { title: 'Agregar obervacion interna', active: true },
                  ],
                  pageTitle: 'Agregar observacion interna',
                  authRequired: true,
                  parent: 'obsinternas'
              },
              },
                //Fuera de zona
              {
                path: '/pages/administracion/fuerazonas/item-list/itemlist',
                name: 'fuerazonas',
                component: () => import('./views/pages/administracion/fuerazonas/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de fuera de zona'},
                    { title: 'Lista de fuera de zona', active: true },
                    ],
                    pageTitle: 'Lista de fuera de zona',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/fuerazonas/item-view/:itemId',
                name: 'fuerazonas-view',
                component: () => import('@/views/pages/administracion/fuerazonas/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Fuera de zona' },
                        { title: 'Ver fuera de zona', active: true },
                    ],
                    pageTitle: 'Ver fuera de zona',
                    authRequired: true,
                    parent: 'fuerazonas'
                },
              },
              {
                path: '/pages/administracion/fuerazonas/item-edit/:itemId',
                name: 'fuerazonas-edit',
                component: () => import('@/views/pages/administracion/fuerazonas/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Fuera de zona' },
                        { title: 'Editar fuera de zona', active: true },
                    ],
                    pageTitle: 'Editar fuera de zona',
                    authRequired: true,
                    parent: 'fuerazonas'
                },
              },
              {
              path: '/pages/administracion/fuerazonas/item-add/',
              name: 'fuerazonas-add',
              component: () => import('@/views/pages/administracion/fuerazonas/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Fuera de zona' },
                      { title: 'Agregar fuera de zona', active: true },
                  ],
                  pageTitle: 'Agregar fuera de zona',
                  authRequired: true,
                  parent: 'fuerazonas'
              },
              },
                //Excepciones
              {
                path: '/pages/administracion/excepciones/item-list/itemlist',
                name: 'excepciones',
                component: () => import('./views/pages/administracion/excepciones/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de excepciones'},
                    { title: 'Lista de excepciones', active: true },
                    ],
                    pageTitle: 'Lista de excepciones',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/excepciones/item-view/:itemId',
                name: 'excepciones-view',
                component: () => import('@/views/pages/administracion/excepciones/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Excepcion' },
                        { title: 'Ver excepcion', active: true },
                    ],
                    pageTitle: 'Ver excepcion',
                    authRequired: true,
                    parent: 'excepciones'
                },
              },
              {
                path: '/pages/administracion/excepciones/item-edit/:itemId',
                name: 'excepciones-edit',
                component: () => import('@/views/pages/administracion/excepciones/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Excepcion' },
                        { title: 'Editar excepcion', active: true },
                    ],
                    pageTitle: 'Editar excepcion',
                    authRequired: true,
                    parent: 'excepciones'
                },
              },
              {
              path: '/pages/administracion/excepciones/item-add/',
              name: 'excepciones-add',
              component: () => import('@/views/pages/administracion/excepciones/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Excepcion' },
                      { title: 'Agregar excepcion', active: true },
                  ],
                  pageTitle: 'Agregar excecpion',
                  authRequired: true,
                  parent: 'excepciones'
              },
              },
              //Empresas
                {
                  path: '/pages/administracion/empresas/item-list/itemlist',
                  name: 'empresas',
                  component: () => import('./views/pages/administracion/empresas/item-list/itemList.vue'),
                  meta: {
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Lista de empresas'},
                      { title: 'Lista de empresas', active: true },
                      ],
                      pageTitle: 'Lista de empresas',
                      authRequired: true
                  }
                },
                {
                  path: '/pages/administracion/empresas/item-view/:itemId',
                  name: 'empresas-view',
                  component: () => import('@/views/pages/administracion/empresas/item-view/itemView.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Empresa' },
                          { title: 'Ver empresa', active: true },
                      ],
                      pageTitle: 'Ver empresa',
                      authRequired: true,
                      parent: 'empresas'
                  },
                },
                {
                  path: '/pages/administracion/empresas/item-edit/:itemId',
                  name: 'empresas-edit',
                  component: () => import('@/views/pages/administracion/empresas/item-edit/itemEdit.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Empresa' },
                          { title: 'Editar empresa', active: true },
                      ],
                      pageTitle: 'Editar empresa',
                      authRequired: true,
                      parent: 'empresas'
                  },
                },
                {
                path: '/pages/administracion/empresas/item-add/',
                name: 'empresas-add',
                component: () => import('@/views/pages/administracion/empresas/item-add/itemAdd.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Empresa' },
                        { title: 'Agregar empresa', active: true },
                    ],
                    pageTitle: 'Agregar empresa',
                    authRequired: true,
                    parent: 'empresas'
                },
                },

                 //Asociados
              {
                path: '/pages/administracion/moviles/asociados/item-list/itemlist',
                name: 'asociados',
                component: () => import('./views/pages/administracion/moviles/asociados/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de asociados'},
                    { title: 'Lista de asociados', active: true },
                    ],
                    pageTitle: 'Lista de asociados',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/moviles/asociados/item-view/:itemId',
                name: 'asociados-view',
                component: () => import('@/views/pages/administracion/moviles/asociados/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Asociado' },
                        { title: 'Ver asociado', active: true },
                    ],
                    pageTitle: 'Ver asociado',
                    authRequired: true,
                    parent: 'asociados'
                },
              },
              {
                path: '/pages/administracion/moviles/asociados/item-edit/:itemId',
                name: 'asociados-edit',
                component: () => import('@/views/pages/administracion/moviles/asociados/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Asociado' },
                        { title: 'Editar asociado', active: true },
                    ],
                    pageTitle: 'Editar asociado',
                    authRequired: true,
                    parent: 'asociados'
                },
              },
              {
              path: '/pages/administracion/moviles/asociados/item-add/',
              name: 'asociados-add',
              component: () => import('@/views/pages/administracion/moviles/asociados/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Asociado' },
                      { title: 'Agregar asociado', active: true },
                  ],
                  pageTitle: 'Agregar asociado',
                  authRequired: true,
                  parent: 'asociados'
              },
              },

              //Moviles
              {
                path: '/pages/administracion/moviles/moviles/item-list/itemlist',
                name: 'moviles',
                component: () => import('./views/pages/administracion/moviles/moviles/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de moviles'},
                    { title: 'Lista de moviles', active: true },
                    ],
                    pageTitle: 'Lista de moviles',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/moviles/moviles/item-view/:itemId',
                name: 'moviles-view',
                component: () => import('@/views/pages/administracion/moviles/moviles/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Movil' },
                        { title: 'Ver movil', active: true },
                    ],
                    pageTitle: 'Ver movil',
                    authRequired: true,
                    parent: 'moviles'
                },
              },
              {
                path: '/pages/administracion/moviles/moviles/item-edit/:itemId',
                name: 'moviles-edit',
                component: () => import('@/views/pages/administracion/moviles/moviles/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Movil' },
                        { title: 'Editar movil', active: true },
                    ],
                    pageTitle: 'Editar movil',
                    authRequired: true,
                     parent: 'moviles'
                },
              },
              {
              path: '/pages/administracion/moviles/moviles/item-add/',
              name: 'moviles-add',
              component: () => import('@/views/pages/administracion/moviles/moviles/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Movil' },
                      { title: 'Agregar movil', active: true },
                  ],
                  pageTitle: 'Agregar movil',
                  authRequired: true,
                   parent: 'moviles'
              },
              },

               //Conductores
               {
                path: '/pages/administracion/moviles/conductores/item-list/itemlist',
                name: 'conductores',
                component: () => import('./views/pages/administracion/moviles/conductores/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de conductores'},
                    { title: 'Lista de conductores', active: true },
                    ],
                    pageTitle: 'Lista de conductores',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/moviles/conductores/item-view/:itemId',
                name: 'conductores-view',
                component: () => import('@/views/pages/administracion/moviles/conductores/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Conductor' },
                        { title: 'Ver conductor', active: true },
                    ],
                    pageTitle: 'Ver conductor',
                    authRequired: true,
                     parent: 'conductores'
                },
              },
              {
                path: '/pages/administracion/moviles/conductores/item-edit/:itemId',
                name: 'conductores-edit',
                component: () => import('@/views/pages/administracion/moviles/conductores/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Conductor' },
                        { title: 'Editar conductor', active: true },
                    ],
                    pageTitle: 'Editar conductor',
                    authRequired: true,
                    parent: 'conductores'
                },
              },
              {
              path: '/pages/administracion/moviles/conductores/item-add/',
              name: 'conductores-add',
              component: () => import('@/views/pages/administracion/moviles/conductores/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Conductor' },
                      { title: 'Agregar conductor', active: true },
                  ],
                  pageTitle: 'Agregar conductor',
                  authRequired: true,
                  parent: 'conductores'
              },
              },

             //Tarifa pasajeros
               {
                path: '/pages/administracion/tarifas/pasajeros/item-list/itemlist',
                name: 'pasajeros',
                component: () => import('./views/pages/administracion/tarifas/pasajeros/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de tarifa pasajeros'},
                    { title: 'Lista de tarifa pasajeros', active: true },
                    ],
                    pageTitle: 'Lista de tarifa pasajeros',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/tarifas/pasajeros/item-view/:itemId',
                name: 'pasajeros-view',
                component: () => import('@/views/pages/administracion/tarifas/pasajeros/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Tarifa pasajero' },
                        { title: 'Ver tarifa pasajero', active: true },
                    ],
                    pageTitle: 'Ver tarifa pasajero',
                    authRequired: true,
                    parent: 'pasajeros'
                },
              },
              {
                path: '/pages/administracion/tarifas/pasajeros/item-edit/:itemId',
                name: 'pasajeros-edit',
                component: () => import('@/views/pages/administracion/tarifas/pasajeros/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Tarifa pasajero' },
                        { title: 'Editar tarifa pasajero', active: true },
                    ],
                    pageTitle: 'Editar tarifa pasajero',
                    authRequired: true,
                    parent: 'pasajeros'
                },
              },
              {
              path: '/pages/administracion/tarifas/pasajeros/item-add/',
              name: 'pasajeros-add',
              component: () => import('@/views/pages/administracion/tarifas/pasajeros/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Tarifa pasajero' },
                      { title: 'Agregar tarifa pasajero', active: true },
                  ],
                  pageTitle: 'Agregar tarifa pasajero',
                  authRequired: true,
                  parent: 'pasajeros'
              },
              },
              
                 //Tarifa plana
               {
                path: '/pages/administracion/tarifas/planas/item-list/itemlist',
                name: 'planas',
                component: () => import('./views/pages/administracion/tarifas/planas/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de tarifas planas'},
                    { title: 'Lista de tarifas planas', active: true },
                    ],
                    pageTitle: 'Lista de tarifas planas',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/tarifas/planas/item-view/:itemId',
                name: 'planas-view',
                component: () => import('@/views/pages/administracion/tarifas/planas/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Tarifa plana' },
                        { title: 'Ver tarifa plana', active: true },
                    ],
                    pageTitle: 'Ver tarifa plana',
                    authRequired: true,
                    parent: 'planas'
                },
              },
              {
                path: '/pages/administracion/tarifas/planas/item-edit/:itemId',
                name: 'planas-edit',
                component: () => import('@/views/pages/administracion/tarifas/planas/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Tarifa plana' },
                        { title: 'Editar tarifa plana', active: true },
                    ],
                    pageTitle: 'Editar tarifa plana',
                    authRequired: true,
                    parent: 'planas'
                },
              },
              {
              path: '/pages/administracion/tarifas/planas/item-add/',
              name: 'planas-add',
              component: () => import('@/views/pages/administracion/tarifas/planas/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Tarifa plana' },
                      { title: 'Agregar tarifa plana', active: true },
                  ],
                  pageTitle: 'Agregar tarifa plana',
                  authRequired: true,
                  parent: 'planas'
              },
              },

             //Tarifa kms
              {
                path: '/pages/administracion/tarifas/kms/item-list/itemlist',
                name: 'kms',
                component: () => import('./views/pages/administracion/tarifas/kms/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de tarifas kms'},
                    { title: 'Lista de tarifas kms', active: true },
                    ],
                    pageTitle: 'Lista de tarifas kms',
                    authRequired: true
                }
              },
              {
                path: '/pages/administracion/tarifas/kms/item-view/:itemId',
                name: 'kms-view',
                component: () => import('@/views/pages/administracion/tarifas/kms/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Tarifa kms' },
                        { title: 'Ver tarifa kms', active: true },
                    ],
                    pageTitle: 'Ver tarifa kms',
                    authRequired: true,
                    parent: 'kms'
                },
              },
              {
                path: '/pages/administracion/tarifas/kms/item-edit/:itemId',
                name: 'kms-edit',
                component: () => import('@/views/pages/administracion/tarifas/kms/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Tarifa kms' },
                        { title: 'Editar tarifa kms', active: true },
                    ],
                    pageTitle: 'Editar tarifa kms',
                    authRequired: true,
                    parent: 'kms'
                },
              },
              {
              path: '/pages/administracion/tarifas/kms/item-add/',
              name: 'kms-add',
              component: () => import('@/views/pages/administracion/tarifas/kms/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Tarifa kms' },
                      { title: 'Agregar tarifa kms', active: true },
                  ],
                  pageTitle: 'Agregar tarifa kms',
                  authRequired: true,
                  parent: 'kms'
              },
              },
              // =============================================================================
              // PLANIFICACION
              // =============================================================================
              
               //Patrones
               {
                path: '/pages/planificacion/patrones/patrones/item-list/itemlist',
                name: 'patrones',
                component: () => import('./views/pages/planificacion/patrones/patrones/item-list/itemList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Lista de patrones'},
                    { title: 'Lista de patrones', active: true },
                    ],
                    pageTitle: 'Lista de patrones',
                    authRequired: true
                }
              },
              {
                path: '/pages/planificacion/patrones/patrones/item-view/:itemId',
                name: 'patrones-view',
                component: () => import('@/views/pages/planificacion/patrones/patrones/item-view/itemView.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Patron' },
                        { title: 'Ver patron', active: true },
                    ],
                    pageTitle: 'Ver patron',
                    authRequired: true,
                    parent: 'patrones'
                },
              },
              {
                path: '/pages/planificacion/patrones/patrones/item-edit/:itemId',
                name: 'patrones-edit',
                component: () => import('@/views/pages/planificacion/patrones/patrones/item-edit/itemEdit.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Patron' },
                        { title: 'Editar patron', active: true },
                    ],
                    pageTitle: 'Editar patron',
                    authRequired: true,
                    parent: 'patrones'
                },
              },
              {
              path: '/pages/planificacion/patrones/patrones/item-add/',
              name: 'patrones-add',
              component: () => import('@/views/pages/planificacion/patrones/patrones/item-add/itemAdd.vue'),
              meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Patron' },
                      { title: 'Agregar patron', active: true },
                  ],
                  pageTitle: 'Agregar patron',
                  authRequired: true,
                  parent: 'patrones'
              },
              },

                //Grupo de patrones
                {
                  path: '/pages/planificacion/patrones/grupos/item-list/itemlist',
                  name: 'gpatrones',
                  component: () => import('./views/pages/planificacion/patrones/grupos/item-list/itemList.vue'),
                  meta: {
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Lista de grupos de patrones'},
                      { title: 'Lista de grupos de patrones', active: true },
                      ],
                      pageTitle: 'Lista de grupos de patrones',
                      authRequired: true
                  }
                },
                {
                  path: '/pages/planificacion/patrones/grupos/item-view/:itemId',
                  name: 'gpatrones-view',
                  component: () => import('@/views/pages/planificacion/patrones/grupos/item-view/itemView.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Grupo de patron' },
                          { title: 'Ver grupo de patron', active: true },
                      ],
                      pageTitle: 'Ver grupo de patron',
                      authRequired: true,
                      parent: 'gpatrones'
                  },
                },
                {
                  path: '/pages/planificacion/patrones/grupos/item-edit/:itemId',
                  name: 'gpatrones-edit',
                  component: () => import('@/views/pages/planificacion/patrones/grupos/item-edit/itemEdit.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Grupo de patron' },
                          { title: 'Editar grupo de patron', active: true },
                      ],
                      pageTitle: 'Editar grupo de patron',
                      authRequired: true,
                      parent: 'gpatrones'
                  },
                },
                {
                path: '/pages/planificacion/patrones/grupos/item-add/',
                name: 'gpatrones-add',
                component: () => import('@/views/pages/planificacion/patrones/grupos/item-add/itemAdd.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Grupo de patron' },
                        { title: 'Agregar grupo de patron', active: true },
                    ],
                    pageTitle: 'Agregar grupo de patron',
                    authRequired: true,
                    parent: 'gpatrones'
                },
                },

                 //Codificaciones
                 {
                  path: '/pages/planificacion/codificaciones/item-list/itemlist',
                  name: 'codificaciones',
                  component: () => import('./views/pages/planificacion/codificaciones/item-list/itemList.vue'),
                  meta: {
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Lista de codificaciones'},
                      { title: 'Lista de codificaciones', active: true },
                      ],
                      pageTitle: 'Lista de codificaciones',
                      authRequired: true
                  }
                },
                {
                  path: '/pages/planificacion/codificaciones/item-view/:itemId',
                  name: 'codificaciones-view',
                  component: () => import('@/views/pages/planificacion/codificaciones/item-view/itemView.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Codificacion' },
                          { title: 'Ver codificacion', active: true },
                      ],
                      pageTitle: 'Ver codificacion',
                      authRequired: true,
                      parent: 'codificaciones'
                  },
                },
                {
                  path: '/pages/planificacion/codificaciones/item-edit/:itemId',
                  name: 'codificaciones-edit',
                  component: () => import('@/views/pages/planificacion/codificaciones/item-edit/itemEdit.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Codificacion' },
                          { title: 'Editar codificacion', active: true },
                      ],
                      pageTitle: 'Editar codificacion',
                      authRequired: true,
                      parent: 'codificaciones'
                  },
                },
                {
                path: '/pages/planificacion/codificaciones/item-add/',
                name: 'codificaciones-add',
                component: () => import('@/views/pages/planificacion/codificaciones/item-add/itemAdd.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Codificacion' },
                        { title: 'Agregar codificacion', active: true },
                    ],
                    pageTitle: 'Agregar codificacion',
                    authRequired: true,
                    parent: 'codificaciones'
                },
                },
                {
                  path: '/pages/planificacion/codificaciones/item-import/',
                  name: 'codificaciones-import',
                  component: () => import('@/views/pages/planificacion/codificaciones/item-import/itemImport.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Codificacion' },
                          { title: 'Importar codificaciones', active: true },
                      ],
                      pageTitle: 'Importar codificaciones',
                      authRequired: true,
                      parent: 'codificaciones'
                  },
                  },

                  //Horarios
                 {
                  path: '/pages/planificacion/horarios/item-list/itemlist',
                  name: 'horarios',
                  component: () => import('./views/pages/planificacion/horarios/item-list/itemList.vue'),
                  meta: {
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Lista de horarios'},
                      { title: 'Lista de horarios', active: true },
                      ],
                      pageTitle: 'Lista de horarios',
                      authRequired: true
                  }
                },
                {
                  path: '/pages/planificacion/horarios/item-view/:itemId',
                  name: 'horarios-view',
                  component: () => import('@/views/pages/planificacion/horarios/item-view/itemView.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Horario' },
                          { title: 'Ver horario', active: true },
                      ],
                      pageTitle: 'Ver horario',
                      authRequired: true,
                      parent: 'horarios'
                  },
                },
                {
                  path: '/pages/planificacion/horarios/item-edit/:itemId',
                  name: 'horarios-edit',
                  component: () => import('@/views/pages/planificacion/horarios/item-edit/itemEdit.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Horario' },
                          { title: 'Editar horario', active: true },
                      ],
                      pageTitle: 'Editar horario',
                      authRequired: true,
                      parent: 'horarios'
                  },
                },
                {
                path: '/pages/planificacion/horarios/item-add/',
                name: 'horarios-add',
                component: () => import('@/views/pages/planificacion/horarios/item-add/itemAdd.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Horario' },
                        { title: 'Agregar horario', active: true },
                    ],
                    pageTitle: 'Agregar horario',
                    authRequired: true,
                    parent: 'horarios'
                },
                },

                  //Matriz
                  {
                    path: '/pages/planificacion/matriz/item-list/itemlist',
                    name: 'matriz',
                    component: () => import('./views/pages/planificacion/matriz/item-list/itemList.vue'),
                    meta: {
                      breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Matriz de codificacion'},
                        { title: 'Matriz de codificacion', active: true },
                        ],
                        pageTitle: 'Matriz de codificacion',
                        authRequired: true
                    }
                  },

                //Agendamientos
                 {
                  path: '/pages/planificacion/agendamientos/item-list/itemlist',
                  name: 'agendamientos',
                  component: () => import('./views/pages/planificacion/agendamientos/item-list/itemList.vue'),
                  meta: {
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Lista de agendamientos'},
                      { title: 'Lista de agendamientos', active: true },
                      ],
                      pageTitle: 'Lista de agendamientos',
                      authRequired: true
                  }
                },
                {
                  path: '/pages/planificacion/agendamientos/item-view/:itemId',
                  name: 'agendamientos-view',
                  component: () => import('@/views/pages/planificacion/agendamientos/item-view/itemView.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Agendamiento' },
                          { title: 'Ver agendamiento', active: true },
                      ],
                      pageTitle: 'Ver agendamiento',
                      authRequired: true,
                      parent: 'agendamientos'
                  },
                },
                {
                  path: '/pages/planificacion/agendamientos/item-edit/:itemId',
                  name: 'agendamientos-edit',
                  component: () => import('@/views/pages/planificacion/agendamientos/item-edit/itemEdit.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Agendamiento' },
                          { title: 'Editar agendamiento', active: true },
                      ],
                      pageTitle: 'Editar agendamiento',
                      authRequired: true,
                      parent: 'agendamientos'
                  },
                },
                {
                path: '/pages/planificacion/agendamientos/item-add/',
                name: 'agendamientos-add',
                component: () => import('@/views/pages/planificacion/agendamientos/item-add/itemAdd.vue'),
                meta: {
                    breadcrumb: [
                        { title: 'Home', url: '/' },
                        { title: 'Agendamiento' },
                        { title: 'Agregar agendamiento', active: true },
                    ],
                    pageTitle: 'Agregar agendamiento',
                    authRequired: true,
                    parent: 'agendamientos'
                },
                },
                {
                  path: '/pages/planificacion/agendamientos/item-import/',
                  name: 'agendamientos-import',
                  component: () => import('@/views/pages/planificacion/agendamientos/item-import/itemImport.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Agendamientos' },
                          { title: 'Importar agendamientos', active: true },
                      ],
                      pageTitle: 'Importar agendamientos',
                      authRequired: true,
                      parent: 'agendamientos'
                  },
                  },
              

              {
                path: '/page2',
                name: 'page-2',
                component: () => import('./views/Page2.vue')
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/pages/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue'),
                meta: {
                  //rule: '*'
                }
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue'),
                meta: {
                  //rule: '*'
                }
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404',
            meta: {
              //rule: '*'
            }
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
