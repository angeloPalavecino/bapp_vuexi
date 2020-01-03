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
      <vs-divider color="primary"><h5>Datos Tarifa</h5></vs-divider>
        
       
     
      <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-select v-model="data_local.empresa_id" label="Empresas" name="empresas" class="w-full " v-validate="'required'" 
        :dir="$vs.rtl ? 'rtl' : 'ltr'" :danger="(errors.first('empresas') ? true : false)"
             :danger-text="(errors.first('empresas') ? errors.first('empresas') : '')">
            <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
        </vs-select>
      </div>
       <div class="vx-col md:w-1/2 w-full mt-2">
      </div>
      <div class="vx-col md:w-1/2 w-full mt-4">
      <span class=" text-sm" >N° Pasajeros Min.</span>
      <vs-input-number v-model="data_local.num_psj_min" 
                 name="num_psj_min" v-validate="'required'"  class="w-full p-1" min="1" 
                 icon-inc="expand_less" icon-dec="expand_more" />
              <span class="text-danger text-sm" v-show="errors.has('num_psj_min')">{{ errors.first('num_psj_min') }}</span>
     </div>

      <div class="vx-col md:w-1/2 w-full mt-4">
      <span class=" text-sm" >N° Pasajeros Max.</span>
        <vs-input-number v-model="data_local.num_psj_max" 
                 name="num_psj_max" v-validate="'required'"  class="w-full p-1" min="1" 
                 icon-inc="expand_less" icon-dec="expand_more" />
              <span class="text-danger text-sm" v-show="errors.has('num_psj_max')">{{ errors.first('num_psj_max') }}</span>
     </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input  label-placeholder="Minima"  icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border
      v-model="data_local.minima" class="w-full" name="minima" v-validate="'required|decimal'" 
      :danger="(errors.first('minima') ? true : false)" :danger-text="(errors.first('minima') ? errors.first('minima') : '')" 
      val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('rut') }}</span>-->
      </div>
      
       <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Px Adicional" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.psj_adicional" class="w-full" name="psj_adicional" 
       v-validate="'required|decimal'" :danger="(errors.first('psj_adicional') ? true : false)" 
       :danger-text="(errors.first('psj_adicional') ? errors.first('psj_adicional') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Fuera Zona 1" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.fuera_zona_1" 
         class="w-full" name="fuera_zona_1" 
       v-validate="'required|decimal'" :danger="(errors.first('fuera_zona_1') ? true : false)" 
       :danger-text="(errors.first('fuera_zona_1') ? errors.first('fuera_zona_1') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>
       
      
        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Fuera Zona 2" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.fuera_zona_2" class="w-full" name="fuera_zona_2" 
       v-validate="'required|decimal'" :danger="(errors.first('fuera_zona_2') ? true : false)" 
       :danger-text="(errors.first('fuera_zona_2') ? errors.first('fuera_zona_2') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
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
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'planas'}">Volver</vs-button>
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
       minima: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
        },
        num_psj_min: {
            required: 'El campo es requerido',
        },
        num_psj_max: {
            required: 'El campo es requerido',
        },
        psj_adicional: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
        },
        fuera_zona_1: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
        },
        fuera_zona_2: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
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
      urlApi: "/tarifas/planas/",
      data_local: {
          num_psj_min: 1,
          num_psj_max: 1,
      },
      empresasOptions: [],
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
         .then(()   => { this.$router.push({name:'planas'}); this.showDeleteSuccess() })
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
          num_psj_min: 1,
          num_psj_max: 1,
      }
      
       this.errors.clear();
    },
      traeOtrosDatos() {

      //Empresa
      axios.get(`/api/v1/empresas/empresas`)
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
    },
  },
  created() {
    this.traeOtrosDatos()
  }
}
</script>
<style>
.vs-input-number {
  margin:0px !important;
 }
</style>