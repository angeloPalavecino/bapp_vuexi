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
                <vs-button  icon-pack="feather" icon="icon-arrow-left" class="mt-6 mb-4 md:mb-0" :to="{name: 'agendamientos'}" >Volver</vs-button>
              </vx-tooltip>
          </div>
         
                       
            </div> 
               
        </div>
      </div>

    <br/>
     
     <vs-input v-validate="'min_value:1'" type="hidden" name="agendamientos" v-model="cantAgendamientos"/>
     <span class="text-danger text-sm">{{ errors.first('agendamientos') }}</span>

      <vs-table @input="handleSelectedAgendamientos" v-if="tableData.length"
       pagination :max-items="10" search :data="tableData"> 
        <template slot="header">
          <h4>{{ sheetName }}</h4>
        </template>

        <template slot="thead">
          <vs-th>Rut</vs-th>
          <vs-th>Horario</vs-th>
          <vs-th>Tipo</vs-th>
          <vs-th>Periodo</vs-th>
          <vs-th>Fecha</vs-th>
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

             <vs-td :data="tr.Horario">
              {{ tr.Horario }}
              <template slot="edit">
                <vs-input v-model="tr.Horario" class="inputx" placeholder="Horario" />
              </template>
            </vs-td>

             <vs-td :data="tr.Tipo">
              {{ tr.Tipo }}
              <template slot="edit">
                <vs-input v-model="tr.Tipo" class="inputx" placeholder="Tipo" />
              </template>
            </vs-td>

             <vs-td :data="tr.Periodo">
              {{ tr.Periodo }}
              <template slot="edit">
                <vs-input v-model="tr.Periodo" class="inputx" placeholder="Periodo" />
              </template>
            </vs-td>

             <vs-td :data="tr.Fecha">
              {{ tr.Fecha }}
              <template slot="edit">
                <vs-input v-model="tr.Fecha" class="inputx" placeholder="Fecha" />
              </template>
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
        agendamientos:{
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
        agendamientos : [],
      },

      sucursalFilter: null,
      sucursalesOptions: [],
      empresaFilter: null,
      empresasOptions: [],
      cantAgendamientos:0,

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
    handleSelectedAgendamientos(tr) {
      this.cantAgendamientos = this.selected.length;
    },
    loadDataInTable({ results, header, meta }) {
     
      
      this.header = header
      this.tableData = results
      this.sheetName = meta.sheetName
      this.cantAgendamientos = results.length

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

          this.item.agendamientos = this.tableData;
          this.item.sucursal = this.sucursalFilter;

          this.$vs.loading();

          axios.post("/api/v1/agendamientos/agendamientos/importar", this.item)
          .then((res) => {
            
            setTimeout( ()=> {
              
              this.$vs.loading.close();
              this.$router.push({name:'agendamientos'});

               this.$vs.notify({
                color: 'success',
                title: 'Agendamientos Guardados',
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

      this.cantAgendamientos = 0;

      this.sucursalFilter = null;
      this.empresaFilter = null;

      this.errors.clear();


    },
  }
}
</script>
