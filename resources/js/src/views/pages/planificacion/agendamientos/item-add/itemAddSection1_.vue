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
    <div class="mt-6 mb-5">
      
   <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" 
      title="AGREGAR AGENDAMIENTO" 
      subtitle="Ingrese todos los campos para ingresar el agendamiento" 
      finishButtonText="Agregar" ref="wizard" class="mt-6 ">

        <tab-content title="Paso 1" class="mb-1 " icon="feather icon-clock" :before-change="validateStep1">
          <!-- tab 1 content -->
          <form data-vv-scope="step-1">
           <div>
               <vs-divider color="primary"><h5>Datos Agendamiento</h5></vs-divider>
          </div>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-select v-model="empresa" label="Empresas" ref="empresas" name="empresa" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'">
              <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
              </vs-select>
            </div>

          <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-select v-model="sucursal" label="Sucursales" ref="sucursal" name="sucursal" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'">
              <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
              </vs-select>
          </div>

          <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-select v-model="data_local.horario" label="Horarios" ref="horario" name="horario" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(sucursal > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('step-1.horario') ? true : false)"
                :danger-text="(errors.first('step-1.horario') ? errors.first('step-1.horario') : '')">
              <vs-select-item :key="item.id" :value="item.id" :text="item.label" v-for="item in horariosOptions"  />
              </vs-select>
          </div>

           <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-select v-model="data_local.tipo" label="Tipo" ref="tipo" name="tipo" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'"
                :danger="(errors.first('step-1.tipo') ? true : false)"
                :danger-text="(errors.first('step-1.tipo') ? errors.first('step-1.tipo') : '')">
              <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipoOptions"  />
              </vs-select>
          </div>

           <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-select v-model="data_local.tipo_fecha" label="Periodo" ref="tipo_fecha" name="tipo_fecha" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" :danger="(errors.first('step-1.tipo_fecha') ? true : false)"
                :danger-text="(errors.first('step-1.tipo_fecha') ? errors.first('step-1.tipo_fecha') : '')" @input="limpiarFechas">
                <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipofechaOptions"  />
                </vs-select>
          </div>

          <div v-if="data_local.tipo_fecha === 1" class="vx-col md:w-1/2 w-full mt-3">
               <span class="text-sm" >Fechas</span>
              <flat-pickr :config="configDiasdateTimePicker" v-model="data_local.fechas" 
              placeholder="Seleccione los dias" v-validate="'required'" class="w-full" name="periodos_fecha_dias"/>

              <span class="text-danger text-sm" >{{ errors.first('step-1.periodos_fecha_dias') }}</span>
          </div>
           

         

              <div v-if="data_local.tipo_fecha === 2"  class="vx-col md:w-1/4 w-full mt-2">
                <vs-select v-model="data_local.ano" label="Año" ref="ano" name="ano" 
                class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'"
                  :danger="(errors.first('step-1.ano') ? true : false)"
                  :danger-text="(errors.first('step-1.ano') ? errors.first('step-1.ano') : '')">
                <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in anosOptions"  />
                </vs-select>
              </div>


              <div v-if="data_local.tipo_fecha === 2" class="vx-col md:w-1/4 w-full mt-2">
                <vs-select autocomplete multiple v-model="data_local.meses" label="Meses" 
                ref="meses" name="meses" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" 
                  :danger="(errors.first('step-1.meses') ? true : false)"
                  :danger-text="(errors.first('step-1.meses') ? errors.first('step-1.meses') : '')">
                <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in mesesOptions"  />
                </vs-select>
              </div>



        
          </div>
             
          </form>
        </tab-content> 
        <!-- tab 2 content -->
         <tab-content title="Paso 2" class="mb-5" icon="feather icon-list" :before-change="validateStep2">
          <form data-vv-scope="step-2">
          <div>
               <vs-divider color="primary"><h5>Codificaciones</h5></vs-divider>
          </div>
           <vs-input v-validate="'required|min_value:1'" type="hidden" name="codificaciones_cantidad" v-model="cantidadCodificaciones"/>
           <span class="text-danger text-sm" v-show="errors.has('step-2.codificaciones_cantidad')" >{{ errors.first('step-2.codificaciones_cantidad') }}</span>
  
           <div class="vx-col w-full mt-3">

             <vs-table
                multiple
                v-model="selected"
                :data="codificacionesOptions"  @selected="handleSelected">
                <template slot="header">
                  <h3>
                    Codificaciones
                  </h3>
                  <br/>
                </template>
                <template slot="thead">
                  <vs-th>
                    Rut
                  </vs-th>
                  <vs-th>
                    Nombre
                  </vs-th>
                  <vs-th>
                    Direccion
                  </vs-th>
                  <vs-th>
                    Comuna
                  </vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                    <vs-td :data="data[indextr].rut">
                      {{data[indextr].rut}}
                    </vs-td>

                    <vs-td :data="data[indextr].nombre">
                      {{data[indextr].nombre}} {{data[indextr].apellido}}
                    </vs-td>

                    <vs-td :data="data[indextr].direccion">
                      {{data[indextr].direccion}}
                    </vs-td>

                    <vs-td :data="data[indextr].comuna">
                      {{data[indextr].comuna}}
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
          </div>

  
          </form>
        </tab-content>
        <template slot="footer" slot-scope="props">
       <div class="wizard-footer-left">
           <vs-button v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Anterior</vs-button>
        </div>
        <div class="wizard-footer-right">
          <vs-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Siguiente</vs-button>

          <vs-button v-else  @click.native="props.nextTab()" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">
            Agregar</vs-button>
          
       
        </div>
      </template>
      </form-wizard>
    
    </div>
    <!-- Content Row -->

    <!-- BUTTONS -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
       <!--   <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>-->
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'agendamientos'}">Volver</vs-button>
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
        codificaciones_cantidad:{
            required: 'Debe seleccionar al menos un codificado',
            min_value: 'Debe seleccionar al menos un codificado'
        }

    }
};
// register custom messages
Validator.localize('en', dict);
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import flatPickr from 'vue-flatpickr-component';
//import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
import 'flatpickr/dist/flatpickr.css';
//import 'flatpickr/dist/plugins/monthSelect/style.css';


export default {
  components: {
    vSelect,
    FormWizard,
    TabContent,
    flatPickr
  },
  data() {
    return {
      urlApi: "/agendamientos/agendamientos/",
      data_local: {
        meses:[]
      },
      empresa:1,
      sucursal:null,
      tipo_fecha:0,
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
          minDate: new Date(),
          maxDate: '2037-12-31',
          dateFormat: "Y/m/d",
          mode: "multiple",
      },

      codificacionesOptions:[],
      cantidadCodificaciones:null,
      selected:[],

    }
  },
  watch: {
    empresa(obj) {

      this.sucursal = null,
      this.data_local.horario = null,
      this.sucursalesOptions = [],
      this.horariosOptions = [],      

      this.traeSucursales(obj)
    },
    sucursal(obj){     
   
      this.data_local.horario = null,
      this.horariosOptions = [],  
      
      this.codificacionesOptions = [],
      this.cantidadCodificaciones = null,
      this.selected = [], 

      this.traeHorarios(obj);
      this.traecodificaciones(obj);
    },
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
    this.traeOtrosDatos();
  },
  methods: {
     handleSelected(){
        this.cantidadCodificaciones = this.selected.length;
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
    traecodificaciones(value) {
      
      if(value >  0)  {
        //Combo Codificaciones
        axios.get(`/api/v1/codificaciones/combo/` + value)
          .then((res) => {
            //console.log(res.data.items);
            this.codificacionesOptions = res.data.items;  
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

        this.codificacionesOptions = [];
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
    limpiarFechas(){
        
     
        this.data_local.fechas = null;
        this.data_local.meses = [];
        this.data_local.ano = null;
    
    },  
    validateStep1() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll('step-1').then(result => {
                    if (result) {
                        resolve(true)
                    } else {
                        reject("correct all values");
                    }
                })
            })
        },
    validateStep2() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll("step-2").then(result => {
                     if (result) {     
                       this.save_changes();     
                        resolve(true)
                    } else {
                        reject("correct all values");
                    }
                })
            })
    },
    save_changes() {
     this.$validator.validateAll().then(result =>{
        if (result) {
          this.datos = [];
          this.datos.push(this.data_local);
          this.datos.push(this.selected);                  
  
         this.$store.dispatch("itemManagement/agregarItem", {	item: this.datos , Url: this.urlApi  })
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
        meses:[]
      },

      this.codificaciones = [],
      this.codificacionesOptions = [],
      this.cantidadCodificaciones =null,


      this.$refs.wizard.reset();
      this.errors.clear();

    },
  },
}
</script>
