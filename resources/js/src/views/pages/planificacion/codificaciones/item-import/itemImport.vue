<!-- =========================================================================================
    File Name: i18n.vue
    Description: I18n demo
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== 
v-if="tableData.length && header.length"
-->

<template>
  <div>
    <div class="mb-8">
      <import-excel :onSuccess="loadDataInTable" />
    </div>
    <vx-card >
      <div class="vx-row">
        <div class="vx-col w-full">
           <div class="flex flex-wrap items-center">

       
         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
            <vs-select v-model="empresaFilter" label="Empresas" ref="empresas" name="empresa" class="w-full p-1 mr-4" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'"
                 :danger="(errors.first('empresa') ? true : false)"
                  :danger-text="(errors.first('empresa') ? errors.first('empresa') : '')">
              <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
              </vs-select>  
          </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full mr-4">
           <vs-select v-model="sucursalFilter" label="Sucursales" ref="sucursal" name="sucursal" class="w-full p-1 mr-4" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(empresaFilter > 1 ? false : true)" v-validate="'required'"
            :danger="(errors.first('sucursal') ? true : false)"
             :danger-text="(errors.first('sucursal') ? errors.first('sucursal') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
          </vs-select>
        </div>
       <div class="vx-col md:w-auto sm:w-auto w-full">
        <vx-tooltip color="primary" text="Importar">
                  <vs-button v-if="$can('codificaciones.store')" icon-pack="feather" icon="icon-upload" @click="importar" :disabled="!validateForm" 
                  class="mt-6 mr-4 mb-4 md:mb-0">Importar</vs-button>
                </vx-tooltip>
         </div>
         <div class="vx-col md:w-auto sm:w-auto w-full">
              <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="mt-6 mr-4 mb-4 md:mb-0" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
              </vx-tooltip>
          </div>

         <div class="vx-col md:w-auto sm:w-auto w-full">
              <vx-tooltip color="primary" text="Volver">
                <vs-button  icon-pack="feather" icon="icon-arrow-left" class="mt-6 mb-4 md:mb-0" :to="{name: 'codificaciones'}" >Volver</vs-button>
              </vx-tooltip>
          </div>
         
                       
            </div> 
               
        </div>
      </div>

    <br/>
     
     <vs-input v-validate="'min_value:1'" type="hidden" name="codificaciones" v-model="cantCodificaciones"/>
     <span class="text-danger text-sm">{{ errors.first('codificaciones') }}</span>
        <h3>{{ sheetName }}</h3>
        
      <vs-table  v-if="tableData.length"
       pagination :max-items="10" search :data="tableData">  <!--@input="handleSelectedCodificaciones"-->
        <template slot="header">      
          <br/>
          <h4>Registros cargados: {{ tableData.length }}</h4>
        </template>

        <template slot="thead">
          <vs-th>Rut</vs-th>
          <vs-th>Nombre</vs-th>
          <vs-th>Apellido</vs-th>
          <vs-th>Direccion</vs-th>
          <vs-th>Comuna</vs-th>
          <vs-th>Email</vs-th>
          <vs-th>Telefono</vs-th>
          <vs-th>Centro Costo</vs-th>
         <!-- <vs-th :sort-key="heading" v-for="heading in header" :key="heading">{{ heading }}</vs-th>-->
        </template>

        <template slot-scope="{data}">
           <vs-tr :key="indextr" v-for="(tr, indextr) in data">
           <vs-td :data="tr.Rut">
              {{ tr.Rut }}
              <template slot="edit">
                <vs-input v-model="tr.Rut" class="inputx" placeholder="Rut" />
              </template>
            </vs-td>

             <vs-td :data="tr.Nombre">
              {{ tr.Nombre }}
              <template slot="edit">
                <vs-input v-model="tr.Nombre" class="inputx" placeholder="Nombre" />
              </template>
            </vs-td>

             <vs-td :data="tr.Apellido">
              {{ tr.Apellido }}
              <template slot="edit">
                <vs-input v-model="tr.Apellido" class="inputx" placeholder="Apellido" />
              </template>
            </vs-td>

             <vs-td :data="tr.Direccion">
              {{ tr.Direccion }}
              <template slot="edit">
                <vs-input v-model="tr.Direccion" class="inputx" placeholder="Direccion" />
              </template>
            </vs-td>

             <vs-td :data="tr.Comuna">
              {{ tr.Comuna }}
              <template slot="edit">
                <vs-input v-model="tr.Comuna" class="inputx" placeholder="Comuna" />
              </template>
            </vs-td>

            <vs-td :data="tr.Email">
              {{ tr.Email }}
              <template slot="edit">
                <vs-input v-model="tr.Email" class="inputx" placeholder="Email" />
              </template>
            </vs-td>

            <vs-td :data="tr.Telefono">
              {{ tr.Telefono }}
              <template slot="edit">
                <vs-input v-model="tr.Telefono" class="inputx" placeholder="Telefono" />
              </template>
            </vs-td>

            <vs-td :data="tr.Centro_costo">
              {{ tr.Centro_costo }}
              <template slot="edit">
                <vs-input v-model="tr.Centro_costo" class="inputx" placeholder="Centro Costo" />
              </template>
            </vs-td>
            
          </vs-tr>
          <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="col" v-for="(col, indexcol) in data[indextr]" :key="indexcol + col">
              {{ col }}
            </vs-td>
          </vs-tr>-->
        </template>
      </vs-table>
    </vx-card>
    <vs-popup title="Error Codificados" :active.sync="popupErrores" @close="popupClose">
          <vs-alert active="true" color="danger" icon-pack="feather" icon="icon-info" style="height: 100% !important;">
            <span>Los siguientes <b>{{ this.errores.length }} </b> registros tiene error</span>
          </vs-alert>
           <br/>
           <div class="vx-row">

         <div class="vx-col w-full">
        <vs-table pagination :max-items="10" search :data="errores"> 
        <template slot="header">     
        </template>
        <template slot="thead">
          <vs-th>N° Registro</vs-th>
          <vs-th>Rut</vs-th>
          <vs-th>Direccion</vs-th>
          <vs-th>Comuna</vs-th>
          <vs-th>Centro Costo</vs-th>
        </template>

        <template slot-scope="{data}">
           <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td >
              {{ tr.id }}          
          </vs-td>
           <vs-td>
              {{ tr.rut }}
          </vs-td>
           <vs-td>
              {{ tr.direccion }}
          </vs-td>
           <vs-td>
              {{ tr.comuna }}
          </vs-td>
           <vs-td>
              {{ tr.centro_costo }}
          </vs-td>
          
          <template class="expand-user" slot="expand">
            <div class="con-expand-users">
              <vs-list :key="i" v-for="(error, i) in tr.observaciones">
                <vs-list-item icon="check" :title="error" ></vs-list-item>
              </vs-list>
            </div>
          </template>
          </vs-tr>
        </template>
      </vs-table>
        </div>
        <div class="vx-col w-full"> 
          <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-3 flex flex-wrap items-center justify-end">
              <vx-tooltip color="primary" text="Volver">
                  <vs-button icon-pack="feather" icon="icon-x" class="ml-4 mt-2" @click="popupClose">Cerrar</vs-button>
              </vx-tooltip>          
            </div>
          </div>
        </div>
      
        </div>       
      </div>
        </vs-popup>

  </div>  
</template>

<script>
import ImportExcel from "@/components/excel/ImportExcel.vue"
import vSelect from 'vue-select'
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
    custom: {
        empresa: {
            required: 'La empresa es requerida',
        },
        sucursal: {
            required: 'La sucursal es requerida',
        },
        codificaciones:{
            min_value: 'Debe cargar al menos un registro'
        }
    }
};
// register custom messages
Validator.localize('en', dict);
export default {
  components: {
    ImportExcel,
    vSelect
  },
  data() {
    return {
      tableData: [],
      header: [],
      sheetName: "",
      selected:[],

      item:{
        sucursal : null,
        codificaciones : [],
      },

      sucursalFilter: null,
      sucursalesOptions: [],
      empresaFilter: null,
      empresasOptions: [],
      cantCodificaciones:0,

      errores : [],
      popupErrores:false,

    }
  },
  watch: {
    empresaFilter(obj) {
      this.traeSucursales(obj);
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    },
  },
  mounted() {

    this.traeOtrosDatos();
    
  },
  methods: {
    popupClose(){
       this.popupErrores = false;
    },
    handleSelectedCodificaciones(tr) {
      this.cantCodificaciones = this.tableData.length;
    },
    loadDataInTable({ results, header, meta }) {
     
      
      this.header = header
      this.tableData = results
      this.sheetName = meta.sheetName
      this.cantCodificaciones = results.length

    },
    traeOtrosDatos() {
      //Combo Empresa
      axios.get(`/api/v1/empresas/empresas`)
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
   traeSucursales(value) {
       
        if(value >  1)  {
          //Combo Sucursales
          axios.get(`/api/v1/sucursal/combo/` + value)
            .then((res) => {
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

          this.sucursalFilter = null,
          this.sucursalOptions = []
        }
     
    },
    importar() {
     this.$validator.validateAll().then(result =>{
        if (result) {

          this.item.codificaciones = this.tableData;
          this.item.sucursal = this.sucursalFilter;

          this.$vs.loading();

          axios.post("/api/v1/codificaciones/codificaciones/importar", this.item)
          .then((res) => {
         
            if(res.data.errores.length > 0 ){
                this.errores = res.data.errores;
      
                setTimeout( ()=> {
                    this.$vs.loading.close();
                    
                    this.$vs.notify({
                      color: 'danger',
                      title: 'Error Codificaciones',
                      text: 'Algunos registros estan con errores.'
                    })

                  }, 500); 

                this.popupErrores = true;

            }else{
               
                  setTimeout( ()=> {
                    this.$vs.loading.close();
                    this.$router.push({name:'codificaciones'});

                    this.$vs.notify({
                      color: 'success',
                      title: 'Codificaciones Guardadas',
                      text: 'Los registros fueron guardados exitosamente.'
                    })

                  }, 500); 
            }
                 
             
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
      })
    },
    reset_data() {

      this.tableData = [];
      this.header = [];
      this.sheetName = "";
      this.selected = [];

      this.cantCodificaciones = 0;

      this.sucursalFilter = null,
      this.sucursalesOptions = [],
      this.empresaFilter = null,
      //this.empresasOptions = [],

      this.errors.clear();


    },
  }
}
</script>
<style lang="stylus">
.con-expand-users
  .list-icon
    i
      font-size .9rem !important
.vs-list--item {
    padding: 2px !important;
}
.vs-list {
    padding: 2px !important;
}
</style>
