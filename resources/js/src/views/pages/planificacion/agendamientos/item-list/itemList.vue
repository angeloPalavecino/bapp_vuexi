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
     <vx-card ref="filterCard" title="Filtros" class="items-list-filters mb-8" collapseAction refreshContentAction @refresh="resetColFilters" >
      <div class="vx-row">
         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Empresa</label>
          <v-select :options="empresaOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="empresaFilter" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Sucursales</label>
          <v-select :options="sucursalOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="sucursalFilter" class="mb-4 md:mb-0" />
        </div> 
         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Horario</label>
          <v-select :options="horarioOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="horarioFilter" class="mb-4 md:mb-0" />
        </div>

         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Tipo</label>
          <v-select :options="tipoOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="tipoFilter" class="mb-4 md:mb-0" />
        </div>

      </div>

      <div class="vx-row mt-2">
         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Estado</label>
          <v-select :options="estadoOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="estadoFilter" class="mb-4 md:mb-0" />
        </div>

     <!--    <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Periodo</label>
          <v-select :options="periodoOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="periodoFilter" class="mb-4 md:mb-0" />
        </div>-->

      </div>
    </vx-card>

    <div class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown   class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ itemsData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : itemsData.length }} of {{ itemsData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
         <vx-tooltip color="primary" text="Importar">
            <vs-button icon-pack="feather" icon="icon-upload" class="sm:mr-4 mb-4 md:mb-0" @click="importRecord">IMPORTAR</vs-button>
          </vx-tooltip>

          <vx-tooltip color="primary" text="Agregar">
            <vs-button icon-pack="feather" icon="icon-plus" class="sm:mr-4 mb-4 md:mb-0" @click="addRecord">AGREGAR</vs-button>
          </vx-tooltip>
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" 
          @input="updateSearchQuery" placeholder="Buscar..." />
         <!--  <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown class="cursor-pointer">

            <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32">
              <span class="mr-2 leading-none">Acciones</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item @click="confirmMassiveDeleteRecord()">
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Eliminar</span>
                </span>
              </vs-dropdown-item>

             <!-- <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Archive</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Print</span>
                </span>
              </vs-dropdown-item>-->

              <vs-dropdown-item @click="gridApi.exportDataAsCsv()">
                <span class="flex items-center">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Exportar</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>
      </div>

      <div id="grid-wrapper" style="width:100%; height: 100%">
      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-3 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="itemsData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
        
        @grid-size-changed="onGridSizeChanged"
                  
        :frameworkComponents="frameworkComponents"
        :loadingOverlayComponent="loadingOverlayComponent"
        :loadingOverlayComponentParams="loadingOverlayComponentParams"
        :noRowsOverlayComponent="noRowsOverlayComponent"
        :noRowsOverlayComponentParams="noRowsOverlayComponentParams"
        @row-selected="onRowSelected"
        
        >
      </ag-grid-vue>
      </div>
      <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import { AgGridVue } from "ag-grid-vue"
import '@sass/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import axios from "@/axios.js"

// Store Module
import moduleItemManagement from '@/store/items-management/moduleItemManagement.js'

// Cell Renderer

import CellRendererActions from "./cell-renderer/CellRendererActions.vue"
import CellRendererStatus from "./cell-renderer/CellRendererStatus.vue"

//Loading
import CustomLoadingOverlay from "../../../utils/customLoadingOverlay.js";
import CustomNoRowsOverlay from "../../../utils/customNoRowsOverlay.js";
import CustomDateComponent from '../../../utils/customDateComponentVue.js';

export default {
  components: {
    AgGridVue,
    vSelect,

    // Cell Renderer
    CellRendererActions,
    CellRendererStatus

  },
  data() {
    return {
      urlApi: "/agendamientos/agendamientos/",
      
      // Filter Options
      tipoFilter: { label: 'Todos', value: 'all' },
      tipoOptions: [
        { label: 'Todos', value: 'all' }, 
        { label: 'Zarpe', value: 'Zarpe' },
        { label: 'Recogida', value: 'Recogida' },
      ],

      estadoFilter: { label: 'Activo', value: true },
      estadoOptions: [
        { label: 'Todos', value: 'all' }, 
        { label: 'Abierto', value: true },
        { label: 'Cerrado', value: false },
      ],

     /* periodoFilter: { label: 'Todos', value: 'all' },
      periodoOptions: [
        { label: 'Todos', value: 'all' }, 
        { label: 'Diario', value: 'Diario' },
        { label: 'Mensual', value: 'Mensual' },
        { label: 'Permanente', value: 'Permanente' },
      ],*/


      sucursalFilter: { label: 'Todos', value: 'all', id:0 },
      sucursalOptions: [
        { label: 'Todos', value: 'all', id:0 },
      ],
      empresaFilter: { label: 'Todos', value: 'all', id:0 },
      empresaOptions: [
        { label: 'Todos', value: 'all', id:0 },
      ],

      horarioFilter: { label: 'Todos', value: 'all' },
      horarioOptions: [
        { label: 'Todos', value: 'all' }, 
      ],

      searchQuery: "",

      // AgGrid
      gridApi: null,
      frameworkComponents : {
        customLoadingOverlay: CustomLoadingOverlay,
        customNoRowsOverlay: CustomNoRowsOverlay,
        agDateInput: CustomDateComponent
      },
      loadingOverlayComponent : "customLoadingOverlay",
      loadingOverlayComponentParams : { loadingMessage: "Un momento, por favor espere..." },
      noRowsOverlayComponent : "customNoRowsOverlay",
      noRowsOverlayComponentParams : {
        noRowsMessageFunc: function() {
          return "No hay registros disponibles  " //+ new Date();
        }
      },
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
          minWidth: 120,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true,
        },
        {
          headerName: 'Estado',
          colId: 'estado',
          filter: true,
          minWidth: 110,
          valueGetter: function(params) {
            var fecha_hoy = new Date();
            var fecha = new Date(params.data.fecha_inicio);
            fecha_hoy.setHours(0,0,0,0);

            if(fecha >= fecha_hoy){
               return true;
            }else{
               return false;
            }

          },
          cellRendererFramework: 'CellRendererStatus',     
          
        },
        /*{
          headerName: 'Periodo',
          field: 'periodo',
          filter: true,
          minWidth: 140,
            valueGetter: function(params) {
            
            if(params.data.tipo_fecha == 1){
              var periodo = "Diario";
            }else if(params.data.tipo_fecha == 2){
              var periodo = "Mensual";
            }else{
              var periodo = "Permanente";
            }

            return periodo;
          },
        },*/
         {
          headerName: 'Fecha',
          field: 'fecha_inicio',
          filter: 'agDateColumnFilter',
          //filter: true,
          minWidth: 200,
            valueGetter: function(params) {
            var fecha_inicio = new Date(params.data.fecha_inicio).toLocaleDateString('en-GB');
            return fecha_inicio;
          },
          filterParams: {
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            var dateAsString = cellValue;
            if (dateAsString == null) return -1;
            var dateParts = dateAsString.split('/');
            var cellDate = new Date(
              Number(dateParts[2]),
              Number(dateParts[1]) - 1,
              Number(dateParts[0])
            );
            if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
              return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          },
          browserDatePicker: true,
        },
        },
       /*  {
          headerName: 'Termino',
          field: 'fecha_fin',
          filter: true,
          minWidth: 130,
            valueGetter: function(params) {
            var fecha_fin = new Date(params.data.fecha_fin).toLocaleDateString('en-GB');
            return fecha_fin;
          },
        },*/
        {
          headerName: 'Rut',
          field: 'rut',
          filter: true,
          minWidth: 140,
        },
        {
          headerName: 'Nombre',
          filter: true,
          colId: "nombre",
          minWidth: 140,
          valueGetter: function(params) {
            return params.data.nombre + " " + params.data.apellido;
        }
          
        },
        {
          headerName: 'Centro Costo',
          field: 'centro_costo',
          filter: true,
          minWidth: 150,
        },
        {
          headerName: 'Tipo',
          field: 'tipo',
          filter: true,
          minWidth: 135,
        },
        {
          headerName: 'Horario',
          field: 'horario_plan',
          filter: true,
          minWidth: 135,
        },
        {
          headerName: 'Acciones',
          field: 'transactions',
          minWidth: 155,
          cellRendererFramework: 'CellRendererActions',
        },
      ],


      // Cell Renderer Components
      components: {
        CellRendererActions,
        CellRendererStatus
      }
    }
  },
  watch: {
    /*periodoFilter(obj){
      this.setColumnFilter("periodo",obj.value)
    },*/
    estadoFilter(obj){
      this.setColumnFilter("estado",obj.value)
    },
    tipoFilter(obj) {
      this.setColumnFilter("tipo", obj.value)
    },
    horarioFilter(obj) {
      this.setColumnFilter("horario", obj.value)
    },
    sucursalFilter(obj) {
      this.traeHorarios(obj.id);
    },
    empresaFilter(obj) {
      this.traeSucursales(obj.id);
    },
  },
  computed: {
    itemsData() {
           return this.$store.state.itemManagement.items
    },
    paginationPageSize() {
      if(this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages() {
      if(this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get() {
        if(this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  methods: {
    onRowSelected(params) {

      var fecha_hoy = new Date();
      var fecha = new Date(params.data.fecha_inicio);
      fecha_hoy.setHours(0,0,0,0);

      if(fecha >= fecha_hoy){
            


      }else{

      /*  this.$vs.dialog({
            color: 'danger',
            title: `Confirmar Eliminacion`,
            text: 'No se pueden eliminar registros que ya se encuentran vencidos.',
            acceptText: "Aceptar"
        })*/

        params.node.setSelected(false);
            
      }

    },
     onGridSizeChanged(params) {
        var allColumns = params.columnApi.getAllColumns();
        params.columnApi.setColumnsVisible(allColumns, true);
        params.api.sizeColumnsToFit();
    },
    confirmMassiveDeleteRecord() {
     
      if(this.gridApi.getSelectedRows().length === 0 ) {
        
           this.$vs.dialog({
                color:'danger',
                title: `Error`,
                text: 'Debe seleccionar al menos un registro para realizar esta accion.',
              })

        return;
      }

      this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Confirmar Eliminacion`,
              text: `Este seguro que desea eliminar los registros seleccionados`,
              accept: this.massivedeleteRecord,
              acceptText: "Eliminar"
      })

    },
     massivedeleteRecord() {
 
             this.$store.dispatch("itemManagement/borrarMasivoItem", {	Items: this.gridApi.getSelectedRows(), Url: this.urlApi  })
               .then(()   => { 

                const filter = this.gridApi.getFilterInstance("estado")
                const val = this.estadoFilter.value
                let modelObj = null

                 if(val !== "all") {
                  modelObj = { type: "equals", filter: val }
                }
                filter.setModel(modelObj)
                this.gridApi.onFilterChanged()
                 
                this.showMassiveDeleteSuccess() 
                 
                 })
               .catch(err => { 

              var textError = err.response.status == 300 ? err.response.data.message : err;
              this.$vs.notify({
                  title:'Error',
                  text: textError,
                  color:'danger',
                  iconPack: 'feather',
                  icon:'icon-alert-circle'})     

              })
    },
    showMassiveDeleteSuccess() {
            this.$vs.notify({
              color: 'success',
              title: 'Agendamientos Eliminados',
              text: 'Los registros ya fueron eliminados.'
            })
    },
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if(val !== "all") {
        modelObj = { type: "equals", filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    resetColFilters() {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null)
      this.gridApi.onFilterChanged()

      // Reset Filter Options
      this.horarioFilter =  this.tipoFilter = this.sucursalFilter = this.empresaFilter = this.estadoFilter   = { label: 'Todos', value: 'all' }
      //= this.periodoFilter

      this.$refs.filterCard.removeRefreshAnimation()
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    },
    importRecord() {
            this.$router.push("../item-import/").catch(() => {})
    },
    addRecord() {
            this.$router.push("../item-add/").catch(() => {})
      },
    traeHorarios(value) {
       
        if(value >  1)  {
          //Combo Horarios
          axios.get(`/api/v1/horarios/combo/` + value)
            .then((res) => {
              //console.log(res.data.items);
              var horarios = res.data.items;  
              horarios.push({label: 'Todos', value: 'all', id:0})   
              this.horarioOptions = horarios.reverse();
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

          this.horarioFilter = { label: 'Todos', value: 'all', id:0 },
          this.horarioOptions = [
            { label: 'Todos', value: 'all', id:0 },
          ]
        }
     
    },
    traeSucursales(value) {
       
        if(value >  1)  {
          //Combo Sucursales
          axios.get(`/api/v1/sucursal/combo/` + value)
            .then((res) => {
              //console.log(res.data.items);
              var sucursales = res.data.items;  
              sucursales.push({label: 'Todos', value: 'all', id:0})   
              this.sucursalOptions = sucursales.reverse();
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

          this.sucursalFilter = { label: 'Todos', value: 'all', id:0 },
          this.sucursalOptions = [
            { label: 'Todos', value: 'all', id:0 },
          ]
        }
     
    },
    traeOtrosDatos() {
      //Combo Empresa
      axios.get(`/api/v1/empresas/combo`)
        .then((res) => {
        
          var empresas = res.data.items;  
          empresas.push({label: 'Todos', value: 'all', id:0})   
          this.empresaOptions = empresas.reverse();
        
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
  mounted() {
    this.gridApi = this.gridOptions.api

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if(this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(".ag-header-container")
      header.style.left = "-" + String(Number(header.style.transform.slice(11,-3)) + 9) + "px"
    }

    this.traeOtrosDatos();
    
    
    
  },
  created() {
    if(!moduleItemManagement.isRegistered) {
      this.$store.registerModule('itemManagement', moduleItemManagement)
      moduleItemManagement.isRegistered = true
    }
    this.$store.dispatch("itemManagement/traerItems", this.urlApi)
    .then((res) => {
        
      const filter = this.gridApi.getFilterInstance("estado")
      filter.setModel({ type: "equals", filter: true })
      this.gridApi.onFilterChanged()
        
     })
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
