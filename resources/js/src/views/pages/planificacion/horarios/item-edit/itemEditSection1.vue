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
     <vs-divider color="primary"><h5>Datos Horario</h5></vs-divider>
      
      <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select v-model="empresa" label="Empresas" ref="empresas" name="empresa" class="w-full" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
          </vs-select>
          
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select autocomplete multiple v-model="data_local.sucursales" label="Sucursales" ref="sucursal" name="sucursal" class="w-full" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(empresa > 1 ? false : true)" v-validate="'required'" 
            :danger="(errors.first('sucursal') ? true : false)"
             :danger-text="(errors.first('sucursal') ? errors.first('sucursal') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
          </vs-select>
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
          <label class="vs-input--label ">Horario</label>
          <br/>  
           <flat-pickr :config="configdateTimePicker" v-model="data_local.horario" label-placeholder="Horario" placeholder="Seleccione un horario" 
            name="horario" v-validate="'required'"/>
             <span class="text-danger text-sm" v-show="errors.has('horario')">{{ errors.first('horario') }}</span>
      </div>

          <div class="vx-col md:w-1/2 w-full mt-2">
              <label class="vs-input--label ">Habilitado</label>
              <br/>      
               <vs-switch class="mt-2" v-model="data_local.habilitado" />
           
          </div>

    
        <!-- BUTTONS -->
        <div class="vx-col  w-full mt-2">
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-3 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button v-if="$can('horarios.update')" class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'horarios'}">Volver</vs-button>
          </vx-tooltip>
        
          <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
          </vx-tooltip>
          
        </div>
      </div>
    </div>
    </div>
     <!-- BUTTONS -->
   
     </div>
    <!-- Content Row -->

  </div>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
    custom: {
       horario: {
            required: 'El horario es requerido',
        },
        habilitado: {
            required: 'La descripcion es requerida',
        },
        sucursal: {
            required: 'La sucursal es requerida',
        },
      
    }
};
// register custom messages
Validator.localize('en', dict);
export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    data_sucursales: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      urlApi: "/horarios/horarios/",
      data_local: {
        id : this.data.id ? this.data.id: null,
        horario : this.data.horario ? this.data.horario: null,
        habilitado: this.data.habilitado ? this.data.habilitado: null,
        sucursales: [],
      },
      configdateTimePicker: {
              enableTime: true,
              enableSeconds: true,
              noCalendar: true,
              time_24hr:true
      },
      empresa:this.data.empresa_id,
      empresasOptions:[],
      sucursalesOptions:[],
    
    }
  },
   watch: {
    empresa(obj) {
      this.data_local.sucursales = [];
      this.traeSucursales(obj)
    },
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    },
  },
   mounted() {

      this.traeSucursales(this.data.empresa_id);
      this.traeOtrosDatos();
    
      setTimeout(() => {
                 var ids = this.data_sucursales.map(x => x['id']); 
                 this.data_local.sucursales = ids
      }, 500);
     
  },
  created(){
    
  },
  methods: {
    traeSucursales(value) {
      
      if(value >  1)  {
      //Combo Sucursales
      axios.get(`/api/v1/sucursal/combo/` + value)
        .then((res) => {
          //console.log(res.data.items);
          this.sucursalesOptions = res.data.items;  
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
    }else{
      this.sucursalesOptions = [];
      this.data_local.sucursales = [];
    }
     
    },
    traeOtrosDatos() {
      //Combo Empresa
      axios.get(`/api/v1/empresas/listemp`)
        .then((res) => {
          this.empresasOptions = res.data.items;  
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
    save_changes() {
      this.$validator.validateAll().then(result =>{
        if (result) {
  
      this.$store.dispatch("itemManagement/editarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'horarios'}); this.showDeleteSuccess() })
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
        id : this.data.id ? this.data.id: null,
        horario : this.data.horario ? this.data.horario: null,
        habilitado: this.data.habilitado ? this.data.habilitado: null,
        sucursales: [],
      }

      this.empresa = this.data.empresa_id;

      this.traeSucursales(this.data.empresa_id);
      
      setTimeout(() => {
                 var ids = this.data_sucursales.map(x => x['id']); 
                 this.data_local.sucursales = ids
      }, 500);
    
      this.errors.clear();
    
    },
  },
}
</script>
<style lang="scss">
</style>
