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
      
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input  label-placeholder="Descripcion" v-model="data_local.descripcion" class="w-full" name="descripcion" v-validate="'required'" 
      :danger="(errors.first('descripcion') ? true : false)" :danger-text="(errors.first('descripcion') ? errors.first('descripcion') : '')" 
      val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('rut') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-4">
      <span class=" text-sm" >N° Pasajeros</span>
      <vs-input-number v-model="data_local.cant_psjs" 
                 name="cant_psjs" v-validate="'required'"  class="w-full p-1" min="1" 
                 icon-inc="expand_less" icon-dec="expand_more" />
              <span class="text-danger text-sm" v-show="errors.has('cant_psjs')">{{ errors.first('cant_psjs') }}</span>
     </div>

      
       <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Minima" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.min_servicio" class="w-full" name="min_servicio" 
       v-validate="'required|decimal'" :danger="(errors.first('min_servicio') ? true : false)" 
       :danger-text="(errors.first('min_servicio') ? errors.first('min_servicio') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="KMS" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.kms" 
         class="w-full" name="kms" 
       v-validate="'required|decimal'" :danger="(errors.first('kms') ? true : false)" 
       :danger-text="(errors.first('kms') ? errors.first('kms') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>
       
      
        <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Minuto" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.min" class="w-full" name="min" 
       v-validate="'required|decimal'" :danger="(errors.first('min') ? true : false)" 
       :danger-text="(errors.first('min') ? errors.first('min') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Baja Bandera" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.bajada_bandera" class="w-full" name="bajada_bandera" 
       v-validate="'required|decimal'" :danger="(errors.first('bajada_bandera') ? true : false)" 
       :danger-text="(errors.first('bajada_bandera') ? errors.first('bajada_bandera') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Porticos" icon-pack="feather" icon="icon-dollar-sign" 
              icon-no-border v-model="data_local.porticos" class="w-full" name="porticos" 
       v-validate="'required|decimal'" :danger="(errors.first('porticos') ? true : false)" 
       :danger-text="(errors.first('porticos') ? errors.first('porticos') : '')" val-icon-danger="clear"/>
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
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'kms'}">Volver</vs-button>
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
       descripcion: {
            required: 'El campo es requerido',
        },
        cant_psjs: {
            required: 'El campo es requerido',
        },
        min_servicio: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
        },
        kms: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
        },
        min: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
        },
        bajada_bandera: {
            required: 'El campo es requerido',
            decimal: 'El valor debe ser numerico',
        },
        porticos: {
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
      urlApi: "/tarifas/kms/",
      data_local: {
          cant_psjs: 1,
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
         .then(()   => { this.$router.push({name:'kms'}); this.showDeleteSuccess() })
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
          cant_psjs: 1,
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