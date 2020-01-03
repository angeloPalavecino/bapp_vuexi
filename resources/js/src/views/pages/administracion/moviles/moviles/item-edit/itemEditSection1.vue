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
      <vs-divider color="primary"><h5>Datos Movil</h5></vs-divider>
         
         <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-select v-model="data_local.empresa_id" label="Empresas" name="empresas" class="w-full p-1" v-validate="'required'" 
        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        :danger="(errors.first('empresas') ? true : false)"
             :danger-text="(errors.first('empresas') ? errors.first('empresas') : '')">
            <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
        </vs-select>
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-select v-model="data_local.driver_id" label="Asociados" name="asociados" class="w-full p-1" v-validate="'required'" 
        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        :danger="(errors.first('asociados') ? true : false)"
             :danger-text="(errors.first('asociados') ? errors.first('asociados') : '')">
            <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in asociadosOptions"  />
        </vs-select>
      </div>

        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="N° Movil" v-model="data_local.numero_movil" class="w-full p-1" name="numero_movil" v-validate="'required|numeric'" 
      :danger="(errors.first('numero_movil') ? true : false)" :danger-text="(errors.first('numero_movil') ? errors.first('numero_movil') : '')" val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Tipo"  v-model="data_local.tipo" class="w-full  p-1" name="tipo" v-validate="'required'" 
      :danger="(errors.first('tipo') ? true : false)" :danger-text="(errors.first('tipo') ? errors.first('tipo') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('lastname') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Marca"  v-model="data_local.marca" class="w-full  p-1" name="marca" v-validate="'required'" 
      :danger="(errors.first('marca') ? true : false)" :danger-text="(errors.first('marca') ? errors.first('marca') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input  label-placeholder="Modelo"  v-model="data_local.modelo" class="w-full  p-1" name="modelo" v-validate="'required'" 
      :danger="(errors.first('modelo') ? true : false)" :danger-text="(errors.first('modelo') ? errors.first('modelo') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('rut') }}</span>-->
      </div>
      
       <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Año" v-model="data_local.ano" class="w-full p-1" name="ano" 
       v-validate="'required|numeric'" :danger="(errors.first('ano') ? true : false)" 
       :danger-text="(errors.first('ano') ? errors.first('ano') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="N° Motor" v-model="data_local.motor" class="w-full p-1" name="motor" 
       v-validate="'required|numeric'" :danger="(errors.first('motor') ? true : false)" 
       :danger-text="(errors.first('motor') ? errors.first('motor') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>
       
       
        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Patente" v-model="data_local.patente" class="w-full p-1" name="patente" 
       v-validate="'required'" :danger="(errors.first('patente') ? true : false)" 
       :danger-text="(errors.first('patente') ? errors.first('patente') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Color" v-model="data_local.color" class="w-full p-1" name="color" 
       v-validate="'required'" :danger="(errors.first('color') ? true : false)" 
       :danger-text="(errors.first('color') ? errors.first('color') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
         <span class=" text-sm" >N° Asientos</span>
          <vs-input-number v-model="data_local.asientos" name="asientos" v-validate="'required'"  min="1" 
          icon-inc="expand_less" icon-dec="expand_more" />
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
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'moviles'}">Volver</vs-button>
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
    tipo: {
      required: "El tipo es requerido"
    },
    marca: {
      required: "La marca es requerida"
    },
     modelo: {
       required: "El modelo es requerido"
     },
     ano: {
       required: "El año es requerido",
       numeric: "El año debe ser numerico"
     },
     motor: {
       required: "El motor es requerido",
       numeric: "El n° de motor debe ser numerico"
     },
     patente: {
       required: "La patente es requerida"
     },
     color: {
       required: "El color es requerido"
     },
     asientos: {
       required: "Los asientos son requerido",
     },
     numero_movil: {
       required: "Los asientos son requerido",
       numeric: "El n° de movil debe ser numerico"
     },
     asociados: {
       required: "El asociado es requerido"
     },
     empresas: {
       required: "La empresa es requerida"
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
      urlApi: "/car/car/",
      data_local: {
        empresa_id : this.data.empresa_id ? this.data.empresa_id: null,
        tipo : this.data.tipo ? this.data.tipo: null,
        marca : this.data.marca ? this.data.marca: null,
        modelo : this.data.modelo ? this.data.modelo: null,
        ano : this.data.ano ? this.data.ano: null,
        habilitado : this.data.habilitado,
        motor : this.data.motor ? this.data.motor: null,
        patente : this.data.patente ? this.data.patente: null,
        color : this.data.color ? this.data.color: null,
        asientos : this.data.asientos ? this.data.asientos: 1,
        numero_movil : this.data.numero_movil ? this.data.numero_movil: null,
        id : this.data.id ? this.data.id: null,
        driver_id : this.data.driver_id ? this.data.driver_id: null,
      },
       empresasOptions: [],
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
  
      this.$store.dispatch("itemManagement/editarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'moviles'}); this.showDeleteSuccess() })
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
        empresa_id : this.data.empresa_id ? this.data.empresa_id: null,
        tipo : this.data.tipo ? this.data.tipo: null,
        marca : this.data.marca ? this.data.marca: null,
        modelo : this.data.modelo ? this.data.modelo: null,
        ano : this.data.ano ? this.data.ano: null,
        habilitado : this.data.habilitado,
        motor : this.data.motor ? this.data.motor: null,
        patente : this.data.patente ? this.data.patente: null,
        color : this.data.color ? this.data.color: null,
        asientos : this.data.asientos ? this.data.asientos: 1,
        numero_movil : this.data.numero_movil ? this.data.numero_movil: null,
        id : this.data.id ? this.data.id: null,
        driver_id : this.data.driver_id ? this.data.driver_id: null,
      }
      
      this.errors.clear();
    },
    traeOtrosDatos() {

      //Empresa
      axios.get(`/api/v1/empresas/listemp/`)
        .then((res) => {
            this.empresasOptions =  res.data.items;
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
