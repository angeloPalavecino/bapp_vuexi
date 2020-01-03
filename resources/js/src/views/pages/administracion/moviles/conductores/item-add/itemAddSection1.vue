<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-add">

    <!-- Content Row -->
    <div class="vx-row mt-6">
      <vs-divider color="primary"><h5>Datos Conductor</h5></vs-divider>
      
      <div class="vx-col md:w-1/3 w-full mt-2">
        <vs-select v-model="data_local.car_id" label="Moviles" name="cars" class="w-full p-1" v-validate="'required'" 
        :dir="$vs.rtl ? 'rtl' : 'ltr'" :danger="(errors.first('cars') ? true : false)"
             :danger-text="(errors.first('cars') ? errors.first('cars') : '')">
            <vs-select-item :key="item.id" :value="item.id" :text="item.numero_movil" v-for="item in movilesOptions"  />
        </vs-select>
      </div>

       <div class="vx-col md:w-1/3 w-full mt-2">
      <vs-select v-model="data_local.driver_id" label="Asociados" name="asociados" class="w-full p-1" v-validate="'required'" 
        :dir="$vs.rtl ? 'rtl' : 'ltr'" :danger="(errors.first('asociados') ? true : false)"
             :danger-text="(errors.first('asociados') ? errors.first('asociados') : '')">
            <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in asociadosOptions"  />
        </vs-select>
      </div>
      <div class="vx-col md:w-auto w-full mt-6">
          <label class="vs-input--label ">Conductor por defecto?</label>
          <br/>
          <vs-switch class="mt-2" v-model="data_local.driver_default" />
      </div>

        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Nombre" v-model="data_local.name" class="w-full p-1" name="name" v-validate="'required'" 
      :danger="(errors.first('name') ? true : false)" :danger-text="(errors.first('name') ? errors.first('name') : '')" val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Apellido"  v-model="data_local.lastname" class="w-full  p-1" name="lastname" v-validate="'required'" 
      :danger="(errors.first('lastname') ? true : false)" :danger-text="(errors.first('lastname') ? errors.first('lastname') : '')" 
      val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('lastname') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input type="Email" label-placeholder="Email"  v-model="data_local.email" class="w-full  p-1" name="email" v-validate="'required|email'" 
      :danger="(errors.first('email') ? true : false)" :danger-text="(errors.first('email') ? errors.first('email') : '')" 
      val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input  label-placeholder="Telefono"  v-model="data_local.telefono" class="w-full  p-1" name="telefono" v-validate="'required|numeric'" 
      :danger="(errors.first('telefono') ? true : false)" :danger-text="(errors.first('telefono') ? errors.first('telefono') : '')" 
      val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('rut') }}</span>-->
      </div>
      
       <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Rut" v-model="data_local.rut" class="w-full p-1" name="rut" 
       v-validate="'required|alpha_dash'" :danger="(errors.first('rut') ? true : false)" 
       :danger-text="(errors.first('rut') ? errors.first('rut') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Ciudad" v-model="data_local.ciudad" class="w-full p-1" name="ciudad" 
       v-validate="'required'" :danger="(errors.first('ciudad') ? true : false)" 
       :danger-text="(errors.first('ciudad') ? errors.first('ciudad') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>
       
       
        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Comuna" v-model="data_local.comuna" class="w-full p-1" name="comuna" 
       v-validate="'required'" :danger="(errors.first('comuna') ? true : false)" 
       :danger-text="(errors.first('comuna') ? errors.first('comuna') : '')" val-icon-danger="clear"/>
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

    <!-- BUTTONS -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'conductores'}">Volver</vs-button>
          </vx-tooltip>
        
          <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
          </vx-tooltip>
          
        </div>
      </div>
    </div>
     <!-- BUTTONS -->
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
      email: "Ingrese una ciudad valida"
    },
    comuna: {
      required: "La comuna es requerida",
      email: "Ingrese una comuna valida"
    },
    direccion: {
      required: "La dirección es requerida",
      email: "Ingrese una dirección valida"
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
    },
    asociados: {
      required: "El asociado es requerido"
    },
    cars: {
      required: "El movil es requerido"
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
  },
  data() {
    return {
      urlApi: "/driver/driver/",
      data_local: {
        habilitado: 1,
        conductor: true,
        dueno: false,
        driver_default:false,
        car_id:'',
        driver_id:''
      },
      movilesOptions: [],
      asociadosOptions: [],
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
         this.$store.dispatch("itemManagement/agregarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'conductores'}); this.showDeleteSuccess() })
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
          habilitado: 1,
          conductor: true,
          dueno: false,
          driver_default:false,
          car_id:'',
          driver_id:''
      }
      
       this.errors.clear();
    },
    traeOtrosDatos() {

      //Moviles
      axios.get(`/api/v1/car/carsall/`)
        .then((res) => {
            this.movilesOptions =  res.data.items;
        })
        .catch((err) => { 
          
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})  

      })     
      
      //Asociados
      axios.get(`/api/v1/asociado/asociado/`)
        .then((res) => {
            this.asociadosOptions = res.data.items;  
        })
        .catch((err) => { 
          
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})  

         })

        
    },
  },
  created() {
    this.traeOtrosDatos()
  }
}
</script>
