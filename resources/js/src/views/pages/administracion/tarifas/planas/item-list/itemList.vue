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
          <vx-tooltip color="primary" text="Agregar">
            <vs-button icon-pack="feather" icon="icon-plus" class="sm:mr-4 mb-4 md:mb-0" @click="addRecord">AGREGAR</vs-button>
          </vx-tooltip>
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Buscar..." />
         <!--  <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

       
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
import CustomLoadingOverlay from "../../../../utils/customLoadingOverlay.js";
import CustomNoRowsOverlay from "../../../../utils/customNoRowsOverlay.js";

export default {
  components: {
    AgGridVue,
    vSelect,

    // Cell Renderer
    CellRendererStatus,
    CellRendererActions,

  },
  data() {
    return {
      urlApi: "/tarifas/planas/",
      
      searchQuery: "",

      // AgGrid
      gridApi: null,
      frameworkComponents : {
        customLoadingOverlay: CustomLoadingOverlay,
        customNoRowsOverlay: CustomNoRowsOverlay
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
          headerName: 'Razon social',
          field: 'razon_social',
          filter: true,
          minWidth: 160,
        },
        {
          headerName: 'Rut',
          field: 'rut',
          filter: true,
          minWidth: 135,
        },
        {
          headerName: 'Parametros',
          field: 'cantidad',
          filter: true,
          minWidth: 145,
          cellRendererFramework: 'CellRendererStatus',
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
     onGridSizeChanged(params) {
        var allColumns = params.columnApi.getAllColumns();
        params.columnApi.setColumnsVisible(allColumns, true);
        params.api.sizeColumnsToFit();
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    },
    addRecord() {
            this.$router.push("../item-add/").catch(() => {})
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
