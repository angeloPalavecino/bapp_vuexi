<!-- =========================================================================================
  File Name: itemList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-item-list">

    <vx-card ref="filterCard" title="Filtros" class="items-list-filters mb-8" collapseAction refreshContentAction @refresh="resetColFilters" 
    @remove="resetColFilters">
      <div class="vx-row">

         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Empresa</label>
          <v-select :options="empresaOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="empresaFilter" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Sucursales</label>
          <v-select :options="sucursalOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="sucursalFilter" class="mb-4 md:mb-0" />
        </div>       
      </div>
    </vx-card>

     <vx-card  title="Matriz" class="items-list-filters mb-8" collapseAction>
       <div class="vx-row">
                <div class="vx-col w-full">
                  <div class="flex items-end px-3">
                    <feather-icon svgClasses="w-6 h-6" icon="InfoIcon" class="mr-2" />
                    <span class="font-medium text-lg leading-none">Detalle</span>
                  </div>
                  <vs-divider />
                </div>
              </div>
       <vs-table stripe pagination :max-items="10" search :data="gpatrones" v-if="gpatrones.length && horarios.length">
        <template slot="header">
        </template>

        <template slot="thead">
          <vs-th>Codigos</vs-th>
        <!--  <vs-th>Nombre</vs-th>
          <vs-th>Apellido</vs-th>
          <vs-th>Direccion</vs-th>
          <vs-th>Comuna</vs-th>-->
          <vs-th  v-for="horario in horarios" :key="horario.id">{{ horario.horario }}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
           <vs-td :data="tr.codigo">
              {{ tr.codigo }}
            </vs-td>
         

             <vs-td :key="indexth" v-for="(trh, indexth) in horarios">
                <span @click="selectedCell(trh,tr,matriz.filter(x => x.horario_id == trh.id && x.grupopatrones_id == tr.id))" class="td vs-table--td" style="cursor: pointer;">
                <vs-chip :color="getStatusColor(matriz.filter(x => x.horario_id == trh.id && x.grupopatrones_id == tr.id).length)" 
                  class="items-status">{{ matriz.filter(x => x.horario_id == trh.id && x.grupopatrones_id == tr.id).length  }}</vs-chip>
                  </span>
            </vs-td>
         
          </vs-tr>
        </template>
      </vs-table>
      

    </vx-card>

      <vs-popup :title="'HORARIO: ' + item.horario_text + ' | CODIGO: ' + item.grupopatrones_text" :active.sync="popupActivo" @close="popupClose">
          <vs-alert active="true" color="primary" icon-pack="feather" icon="icon-info" style="height: 100% !important;">
            <span>Debe seleccionar al menos <b>1</b> movil</span>
          </vs-alert>
           <br/>
           <div class="vx-row">

         <div class="vx-col sm:w-1/2 w-full">
           <vs-select autocomplete multiple v-model="item.moviles" label="Moviles" ref="moviles" name="moviles" class="w-full" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" 
            :danger="(errors.first('moviles') ? true : false)"
             :danger-text="(errors.first('moviles') ? errors.first('moviles') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.numero_movil" v-for="item in movilesOptions"  />
          </vs-select>
        </div>
        <div class="vx-col w-full"> 
          <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-3 flex flex-wrap items-center justify-end">
              <vx-tooltip color="primary" text="Guardar">
                  <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar</vs-button>
              </vx-tooltip>
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
import vSelect from 'vue-select'
import axios from "@/axios.js"

// Store Module
import moduleItemManagement from '@/store/items-management/moduleItemManagement.js'
import { Validator } from 'vee-validate';
const dict = {
    custom: {
        moviles: {
            required: 'Los moviles son requeridos',
        },
      
    }
};
// register custom messages
Validator.localize('en', dict);
export default {
  components: {
    vSelect,
  },
  data() {
    return {
      urlApi: "/matriz/matriz/",
      
      sucursalFilter: {label: 'Sin sucursal', value: 'all', id:0 },
      sucursalOptions: [],

      empresaFilter: {label: 'Sin empresa', value: 'all', id:0 },
      empresaOptions: [],

      movilesOptions: [],

      gpatrones: [],
      horarios: [],
      matriz: [],
      popupActivo : false,

      item:{
        horario_text:null,
        horario_id:null,
        grupopatrones_id:null,
        grupopatrones_text:null,
        sucursal_id:null,
        moviles:[]
      }
    }
  },
  watch: {
     sucursalFilter(obj) {
       this.gpatrones = [];
       this.horarios = [];
       this.matriz = [];
       this.traeMatriz(obj.id);
    },
    empresaFilter(obj) {
      this.gpatrones = [];
      this.horarios = [];
      this.matriz = [];

      this.traeSucursales(obj.id);
      this.traeMoviles(obj.id);
            
    },
  },
  computed: {
    itemsData() {
        return this.$store.state.itemManagement.items
    },
    validateForm() {
      return !this.errors.any()
    },
    
  },
  methods: {
    popupClose(){

      this.item = {
        horario_text:null,
        horario_id:null,
        grupopatrones_id:null,
        grupopatrones_text:null,
        moviles:[]
      }
       this.errors.clear();
       this.popupActivo = false;
    },
    selectedCell(horario, grupopatron,moviles) {


      this.item.horario_id = horario.id;
      this.item.horario_text = horario.horario;

      this.item.grupopatrones_id = grupopatron.id;
      this.item.grupopatrones_text = grupopatron.codigo;

      this.item.sucursal_id = this.sucursalFilter.id;

      if(moviles.length > 0){
        this.item.moviles = moviles.map(function(value,index) {
          return value['car_id'];
        });
      }      

      this.errors.clear();
      this.popupActivo = true;
      
    },
    getStatusColor(status) {
      if(status > 0) return "success"
      if(status == 0) return "danger"
      return "danger"
    },
    resetColFilters() {
      // Reset Filter Options
      this.sucursalFilter = {label: 'Sin sucursal', value: 'all', id:0}
      this.empresaFilter = {label: 'Sin empresa', value: 'all', id:0}

      this.$refs.filterCard.removeRefreshAnimation()
    },
    addRecord() {
            this.$router.push("../item-add/").catch(() => {})
    },
    traeSucursales(value) {
       
        if(value >  1)  {
          //Combo Sucursales
          axios.get(`/api/v1/sucursal/combo/` + value)
            .then((res) => {
              //console.log(res.data.items);
              this.sucursalOptions = res.data.items; 
              //this.sucursalOptions = res.data.items;  
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

          this.sucursalFilter = {label: 'Sin sucursal', value: 'all', id:0},
          this.sucursalOptions = []
        }
     
    },
    traeMoviles(value) {
       
        if(value >  1)  {
          //Combo Moviles
          axios.get(`/api/v1/car/matriz/` + value)
            .then((res) => {
              this.movilesOptions = res.data.items; 
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

          this.movilesOptions = []
        }
     
    },
    traeMatriz(value) {
       
        if(value > 0)  {
          //Combo Sucursales
          axios.get(`/api/v1`+ this.urlApi + value)
            .then((res) => {
           
              this.matriz = res.data.items;
              this.horarios = res.data.horarios;
              this.gpatrones = res.data.gpatrones;

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
          this.matriz = []
        }
     
    },
    traeOtrosDatos() {
      //Combo Empresa
      axios.get(`/api/v1/empresas/combo`)
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
    },
    save_changes() {
     this.$validator.validateAll().then(result =>{
        if (result) {
          axios.post("/api/v1" + this.urlApi + "store", this.item)
            .then((res) => {
              this.item = {
                horario_text:null,
                horario_id:null,
                grupopatrones_id:null,
                grupopatrones_text:null,
                sucursal_id:res.data.sucursal,
                moviles:[]
              }
              this.errors.clear();

              this.traeMatriz(res.data.sucursal);
              this.popupActivo = false;
              this.$vs.notify({
                color: 'success',
                title: 'Guardar registros',
                text: 'Los registros se han guardado exitosamente.'
              })
           
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
    }
  },
  mounted() {
    
    this.traeOtrosDatos();
    
  },
  created() {
    if(!moduleItemManagement.isRegistered) {
      this.$store.registerModule('itemManagement', moduleItemManagement)
      moduleItemManagement.isRegistered = true
    }

      this.$store.dispatch("itemManagement/traerItems", this.urlApi).catch(err => { 
        
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})         
                

            
      })
  }
}

</script>

<style lang="scss">
#page-item-list {
  .items-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
  }
</style>
