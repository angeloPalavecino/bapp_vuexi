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
      <vs-divider color="primary"><h5>Datos Agendamiento</h5></vs-divider>
      
     <!-- DATOS AGENDAMIENTO -->
        
           
          <!-- Information - Col 1 -->
          <div class="vx-col w-full mt-2" id="account-info-col-1">
           <vs-table hoverFlat noDataText="">
                    <vs-tr>
                        <vs-th>Rut</vs-th>
                        <vs-td>{{ data_local.rut }}</vs-td>
                        <vs-th>Email</vs-th>
                        <vs-td>{{ data_local.email }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th>Nombre</vs-th>
                        <vs-td>{{ data_local.nombre }} {{ data_local.apellido }}</vs-td>
                        <vs-th>Telefono</vs-th>
                        <vs-td>{{ data_local.telefono }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <th>Direccion</th>
                        <td>{{ data_local.direccion }} {{ data_local.comuna }}</td>
                        <th>Centro de costo</th>
                        <td>{{ data_local.centro_costo }}</td>
                    </vs-tr>
            </vs-table>
          </div>
          <!-- /Information - Col 1 -->         
      
       <!-- DATOS AGENDAMIENTO -->
        <br/>


      <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-select v-model="data_local.empresa_id" label="Empresas" ref="empresas" name="empresa" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" disabled="true">
              <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
              </vs-select>
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-select v-model="data_local.sucursal_id" label="Sucursales" ref="sucursal" name="sucursal" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" disabled="true">
              <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
              </vs-select>

      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
               <vs-select v-model="data_local.horario" label="Horarios" ref="horario" name="horario" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(sucursal > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('horario') ? true : false)" 
                :danger-text="(errors.first('horario') ? errors.first('horario') : '')">
              <vs-select-item :key="item.id" :value="item.id" :text="item.label" v-for="item in horariosOptions"  />
              </vs-select>
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
                 <vs-select v-model="data_local.tipo" label="Tipo" ref="tipo" name="tipo" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'"
                :danger="(errors.first('tipo') ? true : false)"
                :danger-text="(errors.first('tipo') ? errors.first('tipo') : '')">
              <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipoOptions"  />
              </vs-select>
      </div>
      
       <div class="vx-col md:w-1/2 w-full mt-2">
            <vs-select v-model="data_local.tipo_fecha" label="Periodo" ref="tipo_fecha" name="tipo_fecha" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" :danger="(errors.first('tipo_fecha') ? true : false)"
                :danger-text="(errors.first('tipo_fecha') ? errors.first('tipo_fecha') : '')" disabled="true">
                <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipofechaOptions"  />
                </vs-select>
      </div>
       
          <div v-if="data_local.tipo_fecha === 1" class="vx-col md:w-1/2 w-full mt-3">
               <span class="text-sm" >Fecha</span>
              <flat-pickr :config="configDiasdateTimePicker" v-model="data_local.fecha" 
              placeholder="Seleccione los dias" v-validate="'required'" class="w-full" name="periodos_fecha_dias"/>

              <span class="text-danger text-sm" >{{ errors.first('periodos_fecha_dias') }}</span>
          </div>

           <div v-if="data_local.tipo_fecha === 2"  class="vx-col md:w-1/4 w-full mt-2">
                <vs-select v-model="data_local.ano" label="Año" ref="ano" name="ano" 
                class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'"
                  :danger="(errors.first('ano') ? true : false)"
                  :danger-text="(errors.first('ano') ? errors.first('ano') : '')">
                <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in anosOptions"  />
                </vs-select>
              </div>


              <div v-if="data_local.tipo_fecha === 2" class="vx-col md:w-1/4 w-full mt-2">
                <vs-select autocomplete v-model="data_local.mes" label="Meses" 
                ref="meses" name="meses" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" 
                  :danger="(errors.first('meses') ? true : false)"
                  :danger-text="(errors.first('meses') ? errors.first('meses') : '')">
                <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in mesesOptions"  />
                </vs-select>
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
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'agendamientos'}">Volver</vs-button>
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
import flatPickr from 'vue-flatpickr-component';
//import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
import 'flatpickr/dist/flatpickr.css';
//import 'flatpickr/dist/plugins/monthSelect/style.css';

const dict = {
    custom: {
        horario: {
            required: 'El horario es requerido',
        },
        tipo: {
            required: 'El tipo es requerido',
        },
        tipo_fecha: {
            required: 'El periodo es requerido',
        },
        meses: {
            required: 'Debe seleccionar al menos un mes',
        },
        ano: {
            required: 'Debe seleccionar el año',
        },
        periodos_fecha_dias:{
            required: 'Debe seleccionar al menos un dia',
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
  },
  data() {
    return {
      urlApi: "/agendamientos/agendamientos/",
      data_local: {
        id : this.data.id ? this.data.id: null,
        codificacion_id : this.data.codificacion_id ? this.data.codificacion_id: null,
        empresa_id : this.data.empresa_id ? this.data.empresa_id: null,
        sucursal_id : this.data.sucursal_id ? this.data.sucursal_id: null,
        mes : this.data.mes ? this.data.mes: null,
        ano : this.data.ano ? this.data.ano: null,
        tipo : this.data.tipo ? this.data.tipo: null,
        fecha : this.data.fecha_inicio ? this.data.fecha_inicio: null,
        tipo_fecha : this.data.tipo_fecha ? this.data.tipo_fecha: null,
        horario : this.data.horario_id ? this.data.horario_id: null,

        rut : this.data.rut ? this.data.rut: null,
        nombre : this.data.nombre ? this.data.nombre: null,
        apellido : this.data.apellido ? this.data.apellido: null,
        comuna : this.data.comuna ? this.data.comuna: null,
        direccion : this.data.direccion ? this.data.direccion: null,
        email : this.data.email ? this.data.email: null,
        telefono : this.data.telefono ? this.data.telefono: null,
        centro_costo : this.data.centro_costo ? this.data.centro_costo: null,

      },
      empresasOptions:[],
      sucursalesOptions:[],
      horariosOptions:[],
       tipoOptions: [
        { label: 'Zarpe', value: 'Zarpe' },
        { label: 'Recogida', value: 'Recogida' },
      ],
      
      tipofechaOptions: [
        { label: 'Diario', value: 1 },
        { label: 'Mensual', value: 2 },
        { label: 'Permanente', value: 3 },
      ],

      anosOptions: [
        { label: '2020', value: 2020 },
        { label: '2021', value: 2021 },
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
        { label: '2026', value: 2026 },
        { label: '2027', value: 2027 },
        { label: '2028', value: 2028 },
        { label: '2029', value: 2029 },
        { label: '2030', value: 2030 },
        { label: '2031', value: 2031 },
        { label: '2032', value: 2032 },
        { label: '2033', value: 2033 },
        { label: '2034', value: 2034 },
        { label: '2035', value: 2035 },
        { label: '2036', value: 2036 },
        { label: '2037', value: 2037 },
      ],

       mesesOptions: [
        { label: 'Enero', value: 1 },
        { label: 'Febrero', value: 2 },
        { label: 'Marzo', value: 3 },
        { label: 'Abril', value: 4 },
        { label: 'Mayo', value: 5 },
        { label: 'Junio', value: 6 },
        { label: 'Julio', value: 7 },
        { label: 'Agosto', value: 8 },
        { label: 'Septiembre', value: 9 },
        { label: 'Octubre', value: 10 },
        { label: 'Noviembre', value: 11 },
        { label: 'Diciembre', value: 12 },
      ],
      
      configDiasdateTimePicker: {
          //minDate: new Date(),
          maxDate: '2037-12-31',
          dateFormat: "Y/m/d",
          mode: "single",
      },

    }
  },
   watch: {
    empresa(obj) {
      
      this.data_local.sucursal_id = null,
      this.data_local.horario = null,
      this.sucursalesOptions = [],
      this.horariosOptions = [],      

      this.traeSucursales(obj)
    },
    sucursal(obj){  
      this.data_local.horario = null,
      this.horariosOptions = [],  
      this.traeHorarios(obj);
    },
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    },
    sucursal() {
      return this.data_local.sucursal_id;
    },
    empresa() {
      return this.data_local.empresa_id;
    }
  },
  mounted() {
    this.traeOtrosDatos();

    this.traeSucursales(this.data_local.empresa_id);

    this.traeHorarios(this.data_local.sucursal_id);
  },
  methods: {
    save_changes() {
      this.$validator.validateAll().then(result =>{
        if (result) {
  
      this.$store.dispatch("itemManagement/editarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'agendamientos'}); this.showDeleteSuccess() })
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
        codificacion_id : this.data.codificacion_id ? this.data.codificacion_id: null,
        empresa_id : this.data.empresa_id ? this.data.empresa_id: null,
        sucursal_id : this.data.sucursal_id ? this.data.sucursal_id: null,
        mes : this.data.mes ? this.data.mes: null,
        ano : this.data.ano ? this.data.ano: null,
        tipo : this.data.tipo ? this.data.tipo: null,
        fecha : this.data.fecha_inicio ? this.data.fecha_inicio: null,
        tipo_fecha : this.data.tipo_fecha ? this.data.tipo_fecha: null,
        horario : this.data.horario_id ? this.data.horario_id: null,

        rut : this.data.rut ? this.data.rut: null,
        nombre : this.data.nombre ? this.data.nombre: null,
        apellido : this.data.apellido ? this.data.apellido: null,
        comuna : this.data.comuna ? this.data.comuna: null,
        direccion : this.data.direccion ? this.data.direccion: null,
        email : this.data.email ? this.data.email: null,
        telefono : this.data.telefono ? this.data.telefono: null,
        centro_costo : this.data.centro_costo ? this.data.centro_costo: null,
      }
  
       this.errors.clear();
    },
    traeHorarios(value) {
      
      if(value >  0)  {
        //Combo Horarios
        axios.get(`/api/v1/horarios/combo/` + value)
          .then((res) => {
            //console.log(res.data.items);
            this.horariosOptions = res.data.items;  
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

        this.horariosOptions = [];

      }
     
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
     

    }
  },
}
</script>
