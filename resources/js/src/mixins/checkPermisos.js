  export default {
    methods: {
      $can(permissionName) {
	    var user = JSON.parse(window.localStorage.getItem('userInfo'));
    	var permisos = user['permisos'];
        return permisos.indexOf(permissionName) !== -1;
      },

      $canArray(permisos) {
       
        var user = JSON.parse(window.localStorage.getItem('userInfo'));
        var permisosUser = user['permisos'];
        var aux = -1;
        permisos.map(function(permiso) {
          
          if(permisosUser.indexOf(permiso) > -1){
            aux = permisosUser.indexOf(permiso);
          }      
        })
        
        return aux !== -1;

        },
    },
  };
  

  
