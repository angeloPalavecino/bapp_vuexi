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
      <vs-divider color="primary"><h5>Datos Fuera de Zona</h5></vs-divider>
      
      <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select v-model="empresa" label="Empresa" ref="empresa" name="empresa" class="w-full p-1" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" >
          <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresaOptions"  />
          </vs-select>
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select autocomplete v-model="data_local.sucursal_id" label="Sucursal" ref="sucursal" name="sucursal" class="w-full p-1" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(empresa > 1 ? false : true)" v-validate="'required'" 
            :danger="(errors.first('sucursal') ? true : false)"
             :danger-text="(errors.first('sucursal') ? errors.first('sucursal') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
          </vs-select>
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select v-model="data_local.tipo" label="Tipo" ref="tipo" name="tipo" class="w-full p-1" 
            v-validate="'required'" :dir="$vs.rtl ? 'rtl' : 'ltr'" 
            :danger="(errors.first('tipo') ? true : false)"
             :danger-text="(errors.first('tipo') ? errors.first('tipo') : '')">
          <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in typeOptions"  />
          </vs-select>
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Comuna" v-model="data_local.comuna" class="w-full p-1" name="comuna" v-validate="'required'" 
      :danger="(errors.first('comuna') ? true : false)" :danger-text="(errors.first('comuna') ? errors.first('comuna') : '')" 
      val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
      </div>
   
   <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Distancia" v-model="data_local.distancia" class="w-full p-1" name="distancia" v-validate="'required|decimal'" 
      :danger="(errors.first('distancia') ? true : false)" :danger-text="(errors.first('distancia') ? errors.first('distancia') : '')" 
      val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
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
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'fuerazonas'}">Volver</vs-button>
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
        comuna: {
            required: 'La comuna es requerida',
        },
        distancia: {
            required: 'La distancia es requerida',
            decimal: 'El valor debe ser numerico',
        },
        tipo: {
            required: 'El tipo es requerido',
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
      urlApi: "/fuerazonas/fuerazonas/",
      data_local: {
        id : this.data.id ? this.data.id: null,
        distancia : this.data.distancia ? this.data.distancia: null,
        comuna : this.data.comuna ? this.data.comuna: null,
        sucursal_id : this.data.sucursal_id ? this.data.sucursal_id: null,
        tipo : this.data.tipo ? this.data.tipo: null,
      },
       typeOptions: [
        { label: 'Fuera zona 1', value: '1' },
        { label: 'Fuera zona 2', value: '2' },
        { label: 'Fuera zona 3', value: '3' },
      ],
      empresa:this.data.empresa_id,
      empresaOptions: [],
      sucursalesOptions:[],
    }
  },
   watch: {
    empresa(obj) {
      this.data_local.sucursal_id = null;
      this.traeSucursales(obj)
    },
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
    this.traeOtrosDatos();
    this.traeSucursales(this.data.empresa_id);
    
  },
  methods: {
    save_changes() {
      this.$validator.validateAll().then(result =>{
        if (result) {
  
      this.$store.dispatch("itemManagement/editarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'fuerazonas'}); this.showDeleteSuccess() })
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
        distancia : this.data.distancia ? this.data.distancia: null,
        comuna : this.data.comuna ? this.data.comuna: null,
        sucursal_id : this.data.sucursal_id ? this.data.sucursal_id: null,
        tipo : this.data.tipo ? this.data.tipo: null,
      }
      
      this.empresa = this.data.empresa_id;

      this.traeSucursales(this.data.empresa_id);

      //this.data_local.sucursal_id = this.data.sucursal_id;
      
      this.errors.clear();
    },
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
      this.data_local.sucursal_id = null;
    }
     
    },
     traeOtrosDatos() {
      //Combo Empresa
      axios.get(`/api/v1/empresas/empresas`)
        .then((res) => {
          this.empresaOptions = res.data.items;  
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
    }
  },
}
</script>
<style lang="scss">
</style>
