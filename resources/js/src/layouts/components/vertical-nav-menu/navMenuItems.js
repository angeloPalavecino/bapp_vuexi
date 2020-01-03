/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [ 
  {
  header: "Administracion",
  icon: "OthersIcon",
  i18n: "Others",
  items: [
  {
    url: "/pages/administracion/users/item-list/itemlist",
    name: "Usuarios",
    slug: "users",
    icon: "UsersIcon",
    i18n: "UsersIcon",
    permiso: "users.index"

  },
  {
    url: "/pages/administracion/roles/item-list/itemlist",
    name: "Roles",
    slug: "roles",
    icon: "UserCheckIcon",
    i18n: "UserCheckIcon",
    permiso: "roles.index"
  
  },
  {
    url: null,
    name: "Config. Planificacion",
    icon: "SettingsIcon",
    i18n: "SettingsIcon",
    submenu: [
      {
        url: "/pages/administracion/excepciones/item-list/itemlist",
        name: "Excepciones",
        slug: "excepciones",
        icon: "AlertCircleIcon",
        i18n: "AlertCircleIcon",
        permiso: "excepciones.index"
      },
      {
        url: "/pages/administracion/observaciones/item-list/itemlist",
        name: "Observaciones",
        slug: "observaciones",
        icon: "ListIcon",
        i18n: "ListIcon",
        permiso: "observaciones.index"
      },
      {
        url: "/pages/administracion/obsinternas/item-list/itemlist",
        name: "Obs. Internas",
        slug: "obsinternas",
        icon: "ListIcon",
        i18n: "ListIcon",
        permiso: "obsinternas.index"
      },
      {
        url: "/pages/administracion/fuerazonas/item-list/itemlist",
        name: "Fuera de zona",
        slug: "fuerazonas",
        icon: "MapIcon",
        i18n: "MapIcon",
        permiso: "fuerazona.index"
      },
    ]
  },
  {
    url: null,
    name: "Config. Baptner", 
    icon: "TruckIcon",
    i18n: "TruckIcon",
    submenu: [
      {
        url: "/pages/administracion/moviles/asociados/item-list/itemlist",
        name: "Asociados",
        slug: "asociados",
        icon: "TruckIcon",
        i18n: "TruckIcon",
        permiso: "moviles.index"
    
      },
      {
        url: "/pages/administracion/moviles/moviles/item-list/itemlist",
        name: "Moviles",
        slug: "moviles",
        icon: "TruckIcon",
        i18n: "TruckIcon",
        permiso: "moviles.index"
    
      },
      {
        url: "/pages/administracion/moviles/conductores/item-list/itemlist",
        name: "Conductores",
        slug: "conductores",
        icon: "TruckIcon",
        i18n: "TruckIcon",
        permiso: "moviles.index"
    
      },
    ]
  },
  {
    url: "/pages/administracion/empresas/item-list/itemlist",
    name: "Config. Cuenta",
    slug: "empresas",
    icon: "GlobeIcon",
    i18n: "GlobeIcon",
    permiso: "empresas.index"
  },
  {
    url: null,
    name: "Tarifario", 
    icon: "DollarSignIcon",
    i18n: "DollarSignIcon",
    submenu: [
      {
        url: "/pages/administracion/tarifas/pasajeros/item-list/itemlist",
        name: "Tarifa Pasajero",
        slug: "pasajeros",
        icon: "DollarSignIcon",
        i18n: "DollarSignIcon",
        permiso: "servpasajeros.index"
      },
      {
        url: "/pages/administracion/tarifas/planas/item-list/itemlist",
        name: "Tarifa Plana",
        slug: "planas",
        icon: "DollarSignIcon",
        i18n: "DollarSignIcon",
        permiso: "servplanas.index"
      },
      {
        url: "/pages/administracion/tarifas/kms/item-list/itemlist",
        name: "Tarifa Kms",
        slug: "kms",
        icon: "DollarSignIcon",
        i18n: "DollarSignIcon",
        permiso: "servkms.index"
      },
    ]
  }],
  },
  {
  header: "Planificacion",
  icon: "OthersIcon",
  i18n: "Others",
  items: [
  {
    url: null,
    name: "Patrones", 
    icon: "ClipboardIcon",
    i18n: "ClipboardIcon",
    submenu: [
      {
        url: "/pages/planificacion/patrones/patrones/item-list/itemlist",
        name: "Patrones",
        slug: "patrones",
        icon: "MapIcon",
        i18n: "MapIcon",
        permiso: "patrones.index"
      },
      {
        url: "/pages/planificacion/patrones/grupos/item-list/itemlist",
        name: "Grupo de Patrones",
        slug: "gpatrones",
        icon: "LayersIcon",
        i18n: "LayersIcon",
        permiso: "grupopatrones.index"
      },
      
    ]
  },
  {
    url: "/pages/planificacion/horarios/item-list/itemlist",
    slug: "horarios",
    name: "Horarios", 
    icon: "ClockIcon",
    i18n: "ClockIcon",
    permiso: "horarios.index"
  },
  {
    url: "/pages/planificacion/matriz/item-list/itemlist",
    slug: "matriz",
    name: "Matriz codificacion", 
    icon: "GridIcon",
    i18n: "GridIcon",
    permiso: "matriz.index"
  },
  {
    url: "/pages/planificacion/codificaciones/item-list/itemlist",
    slug: "codificaciones",
    name: "Codificaciones", 
    icon: "TagIcon",
    i18n: "TagIcon",
    permiso: "codificaciones.index"
  },
  ]
}
  
  
]

