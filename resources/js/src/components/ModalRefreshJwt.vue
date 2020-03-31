<template>
 <vs-popup background-color="rgba(255,255,255,.6)" title="Sesion" :active="this.dialog" >
       <vx-card ref="filterCard" title="Sesión a punto de expirar" class="items-list-filters mb-8">
      <div class="vx-row">
         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
		  Refresca el token para continuar identificado en la aplicación
          <p v-html="timeComputed"></p>
        </div>
		
		<div class="vx-col md:w-1/4 sm:w-1/2 w-full">
		  <vs-button  color="primary" type="filled" @click="refresh">Seguir en la aplicación</vs-button>
		  <vs-button  color="primary" type="filled" @click="logout">Cerrar sesión</vs-button>
        </div>
      
     </div>
 </vx-card>    
</vs-popup>

</template>

<script>
  import {refreshToken} from "../utils/jwtHelper";
  import checkJwtExpiration from "../mixins/checkJwtExpiration";
  export default {
    name: 'ModalRefreshJwt',
    mixins: [checkJwtExpiration],
    data () {
      return {
        dialog: false,
        time: 0,
        interval: null
      }
    },
    computed: {
      timeComputed () {
        return `Quedan <b>${this.time} segundos</b> para que la sesión expire`
      }
    },
    methods: {
      async refresh () {
        await refreshToken();
        clearInterval(this.interval);
        this.dialog = false;
      },
      logout () {
        clearInterval(this.interval);
        this.$jwtEvents.$emit('logout');
        this.dialog = false;
      }
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>
