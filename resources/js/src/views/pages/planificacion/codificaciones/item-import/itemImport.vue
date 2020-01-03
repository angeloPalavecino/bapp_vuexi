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
                  <vs-button icon-pack="feather" icon="icon-upload" @click="importar" :disabled="!validateForm" 
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

      <vs-table multiple @input="handleSelectedCodificaciones"
      v-model="selected" pagination :max-items="10" search :data="tableData">
        <template slot="header">
          <h4>{{ sheetName }}</h4>
        </template>

        <template slot="thead">
        <!--  <vs-th>Rut</vs-th>
          <vs-th>Nombre</vs-th>
          <vs-th>Apellido</vs-th>
          <vs-th>Direccion</vs-th>
          <vs-th>Comuna</vs-th>-->
          <vs-th :sort-key="heading" v-for="heading in header" :key="heading">{{ heading }}</vs-th>
        </template>

        <template slot-scope="{data}">
        <!--   <vs-tr :key="indextr" v-for="(tr, indextr) in data">
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
            
          </vs-tr>-->
           <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="col" v-for="(col, indexcol) in data[indextr]" :key="indexcol + col">
              {{ col }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
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
            min_value: 'Debes seleccionar al menos un registro'
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
    handleSelectedCodificaciones(tr) {
      this.cantCodificaciones = this.selected.length;
    },
    loadDataInTable({ results, header, meta }) {
     
      this.cantCodificaciones = 0
      this.header = header
      this.tableData = results
      this.sheetName = meta.sheetName

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

          this.sucursalFilter = { label: 'Todos', value: 'all', id:0 },
          this.sucursalOptions = [
            { label: 'Todos', value: 'all', id:0 },
          ]
        }
     
    },
    importar() {
     this.$validator.validateAll().then(result =>{
        if (result) {

          this.item.codificaciones = this.selected;
          this.item.sucursal = this.sucursalFilter;

          this.$vs.loading();

          axios.post("/api/v1/codificaciones/codificaciones/importar", this.item)
          .then((res) => {
            
            setTimeout( ()=> {
              
              this.$vs.loading.close();
              this.$router.push({name:'codificaciones'});

               this.$vs.notify({
                color: 'success',
                title: 'Codificaciones Guardadas',
                text: 'Los registros fueron guardados exitosamente.'
              })

            }, 500);        
             
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

      this.sucursalFilter = null;
      this.empresaFilter = null;

      this.errors.clear();


    },
  }
}
</script>
