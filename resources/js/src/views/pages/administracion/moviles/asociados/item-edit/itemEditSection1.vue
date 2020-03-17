<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-edit">

 

    <!-- Content Row -->
    
    <div class="vx-row mt-6">
      <vs-divider color="primary"><h5>Datos Asociado</h5></vs-divider>
         <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-checkbox name="conductor"  icon-pack="feather" icon="icon-check" v-model="data_local.conductor">Conductor</vs-checkbox>
        </div>
        <div class="vx-col md:w-1/2 w-full mt-2">
        </div>
        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Nombre" v-model="data_local.name" class="w-full p-1" name="name" v-validate="'required|alpha_spaces'" 
      :danger="(errors.first('name') ? true : false)" :danger-text="(errors.first('name') ? errors.first('name') : '')" val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Apellido"  v-model="data_local.lastname" class="w-full  p-1" name="lastname" v-validate="'required|alpha_spaces'" 
      :danger="(errors.first('lastname') ? true : false)" :danger-text="(errors.first('lastname') ? errors.first('lastname') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('lastname') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input type="Email" label-placeholder="Email"  v-model="data_local.email" class="w-full  p-1" name="email" v-validate="'required|email'" 
      :danger="(errors.first('email') ? true : false)" :danger-text="(errors.first('email') ? errors.first('email') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input  label-placeholder="Rut"  v-model="data_local.rut" class="w-full  p-1" name="rut" v-validate="'required|alpha_dash'" 
      :danger="(errors.first('rut') ? true : false)" :danger-text="(errors.first('rut') ? errors.first('rut') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('rut') }}</span>-->
      </div>
      
       <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Telefono" v-model="data_local.telefono" class="w-full p-1" name="telefono" 
       v-validate="'required|numeric'" :danger="(errors.first('telefono') ? true : false)" 
       :danger-text="(errors.first('telefono') ? errors.first('telefono') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Direccion" v-model="data_local.direccion" class="w-full p-1" name="direccion" 
       v-validate="'required'" :danger="(errors.first('direccion') ? true : false)" 
       :danger-text="(errors.first('direccion') ? errors.first('direccion') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Numeracion" v-model="data_local.numeracion" class="w-full p-1" name="numeracion" 
       v-validate="'required|numeric'" :danger="(errors.first('numeracion') ? true : false)" 
       :danger-text="(errors.first('numeracion') ? errors.first('numeracion') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

       
        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Comuna" v-model="data_local.comuna" class="w-full p-1" name="comuna" 
       v-validate="'required'" :danger="(errors.first('comuna') ? true : false)" 
       :danger-text="(errors.first('comuna') ? errors.first('comuna') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Ciudad" v-model="data_local.ciudad" class="w-full p-1" name="ciudad" 
       v-validate="'required'" :danger="(errors.first('ciudad') ? true : false)" 
       :danger-text="(errors.first('ciudad') ? errors.first('ciudad') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Licencias" v-model="data_local.clase" class="w-full p-1" name="clase" 
       v-validate="'required'" :danger="(errors.first('clase') ? true : false)" 
       :danger-text="(errors.first('clase') ? errors.first('clase') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>
       
     <div class="vx-col md:w-1/2 w-full mt-2">
        <label class="vs-input--label ">Habilitado</label>
        <br/>
        <vs-switch class="mt-2" v-model="data_local.habilitado" />
        <!--<vs-radio color="success" v-model="data_local.habilitado" vs-value="1" class="mt-2">Activo</vs-radio>
        <vs-radio color="danger" v-model="data_local.habilitado" vs-value="0" class="mt-2">Inactivo</vs-radio>-->
       </div> 
   
    
    </div>
    <!-- Content Row -->
    
    <!-- Buttons -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'asociados'}">Volver</vs-button>
          </vx-tooltip>
        
          <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
          </vx-tooltip>
          
        </div>
      </div>
    </div>
    <!-- Buttons -->
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
   custom: {
    name: {
      required: "El nombre es requerido",
      alpha: "El nombre solo puede contener letras"
    },
    lastname: {
      required: "El apellido es requerido",
      alpha: "El apellido solo puede contener letras"
    },
    rut: {
      required: "El rut es requerido",
      alpha_dash: "Ingrese un rut valido"
    },
    ciudad: {
      required: "La ciudad es requerida",
    },
    comuna: {
      required: "La comuna es requerida",
    },
    direccion: {
      required: "La dirección es requerida",
    },
    numeracion: {
      required: "La numeración es requerida",
      numeric: "Ingrese una numeración valida"
    },
    email: {
      required: "El email es requerido",
      email: "Ingrese un email valido"
    },
    telefono: {
      required: "El telefono es requerido",
      numeric: "El numero de telefono debe ser valido"
    },
     clase: {
      required: "La clase es requerida",
    }
  }
};

// register custom messages
Validator.localize('en', dict);
export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      urlApi: "/asociado/asociado/",
      data_local: {
        email : this.data.email ? this.data.email: null,
        name : this.data.name ? this.data.name: null,
        lastname : this.data.lastname ? this.data.lastname: null,
        rut : this.data.rut ? this.data.rut: null,
        telefono : this.data.telefono ? this.data.telefono: null,
        habilitado : this.data.habilitado,
        comuna : this.data.comuna ? this.data.comuna: null,
        ciudad : this.data.ciudad ? this.data.ciudad: null,
        direccion : this.data.direccion ? this.data.direccion: null,
        numeracion : this.data.numeracion ? this.data.numeracion: null,
        clase : this.data.clase ? this.data.clase: null,
        conductor : this.data.conductor ? this.data.conductor: null,
        id : this.data.id ? this.data.id: null,
      },
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
  },
  methods: {
    save_changes() {
      this.$validator.validateAll().then(result =>{
        if (result) {
  
      this.$store.dispatch("itemManagement/editarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'asociados'}); this.showDeleteSuccess() })
         .catch(err => { 
           
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                title:'Error',
                text: textError,
                color:'danger',
                iconPack: 'feather',
                icon:'icon-alert-circle'})  
        })
       }
      })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Guardar registros',
        text: 'Los registros se han guardado exitosamente.'
      })
    },
    reset_data() {
      this.data_local = {
        email : this.data.email ? this.data.email: null,
        name : this.data.name ? this.data.name: null,
        lastname : this.data.lastname ? this.data.lastname: null,
        rut : this.data.rut ? this.data.rut: null,
        telefono : this.data.telefono ? this.data.telefono: null,
        habilitado : this.data.habilitado,
        comuna : this.data.comuna ? this.data.comuna: null,
        ciudad : this.data.ciudad ? this.data.ciudad: null,
        direccion : this.data.direccion ? this.data.direccion: null,
        numeracion : this.data.numeracion ? this.data.numeracion: null,
        clase : this.data.clase ? this.data.clase: null,
        conductor : this.data.conductor ? this.data.conductor: null,
        id : this.data.id ? this.data.id: null,
      }
      
      this.errors.clear();
    },
  },
}
</script>
