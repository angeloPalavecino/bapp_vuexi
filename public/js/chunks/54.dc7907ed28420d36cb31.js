(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{BW3U:function(e,t,i){"use strict";var s=i("RrjP");i.n(s).a},RrjP:function(e,t,i){var s=i("UxFk");"string"==typeof s&&(s=[[e.i,s,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};i("aET+")(s,r);s.locals&&(e.exports=s.locals)},UxFk:function(e,t,i){(e.exports=i("I1BE")(!1)).push([e.i,"#page-item-list .items-list-filters .vs__actions {\n  position: absolute;\n  top: 50%;\n}[dir] #page-item-list .items-list-filters .vs__actions {\n  -webkit-transform: translateY(-58%);\n          transform: translateY(-58%);\n}[dir=ltr] #page-item-list .items-list-filters .vs__actions {\n  right: 0;\n}[dir=rtl] #page-item-list .items-list-filters .vs__actions {\n  left: 0;\n}",""])},x7N0:function(e,t,i){"use strict";i.r(t);var s=i("QBvj"),r=(i("7emp"),i("Snq/")),a=i.n(r),o=i("bJaO"),n=i("6wlp"),l={name:"CellRendererActions",methods:{viewRecord:function(){this.$router.push("../item-view/"+this.params.data.id).catch((function(){}))},editRecord:function(){this.$router.push("../item-edit/"+this.params.data.id).catch((function(){}))},confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:'Este seguro que desea eliminar el siguiente horario  "'.concat(this.params.data.horario,'"'),accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var e=this;this.$store.dispatch("itemManagement/borrarItem",{Id:this.params.data.id,Url:this.$parent.$parent.urlApi}).then((function(){e.showDeleteSuccess()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Horario Eliminado",text:"El horario seleccionado ya fue eliminada"})}}},c=i("KHd+"),d=Object(c.a)(l,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{style:{direction:this.$vs.rtl?"rtl":"ltr"}},[t("feather-icon",{attrs:{icon:"EyeIcon",svgClasses:"h-5 w-5 mr-4 hover:text-primary cursor-pointer"},on:{click:this.viewRecord}}),this._v(" "),t("feather-icon",{attrs:{icon:"Edit3Icon",svgClasses:"h-5 w-5 mr-4 hover:text-primary cursor-pointer"},on:{click:this.editRecord}}),this._v(" "),t("feather-icon",{attrs:{icon:"Trash2Icon",svgClasses:"h-5 w-5 hover:text-danger cursor-pointer"},on:{click:this.confirmDeleteRecord}})],1)}),[],!1,null,null,null).exports,u=i("BsVO"),m=i("xxRG"),p={components:{AgGridVue:s.AgGridVue,vSelect:a.a,CellRendererActions:d},data:function(){return{urlApi:"/horarios/horarios/",sucursalFilter:{label:"Todos",value:"all",id:0},sucursalOptions:[{label:"Todos",value:"all",id:0}],empresaFilter:{label:"Todos",value:"all",id:0},empresaOptions:[{label:"Todos",value:"all",id:0}],searchQuery:"",gridApi:null,gridOptions:{},frameworkComponents:{customLoadingOverlay:u.a,customNoRowsOverlay:m.a},loadingOverlayComponent:"customLoadingOverlay",loadingOverlayComponentParams:{loadingMessage:"Un momento, por favor espere..."},noRowsOverlayComponent:"customNoRowsOverlay",noRowsOverlayComponentParams:{noRowsMessageFunc:function(){return"No hay registros disponibles "}},defaultColDef:{sortable:!0,resizable:!0,suppressMenu:!0},columnDefs:[{headerName:"ID",field:"id",minWidth:120,filter:!0,checkboxSelection:!0,headerCheckboxSelectionFilteredOnly:!0,headerCheckboxSelection:!0,suppressSizeToFit:!0},{headerName:"Horario",field:"horario",filter:!0,minWidth:185},{headerName:"Empresa",field:"razon_social",filter:!0,minWidth:200},{headerName:"Sucursal",field:"sucursal",filter:!0,minWidth:200},{headerName:"Acciones",field:"transactions",minWidth:120,cellRendererFramework:"CellRendererActions"}],components:{CellRendererActions:d}}},watch:{sucursalFilter:function(e){this.setColumnFilter("sucursal",e.value)},empresaFilter:function(e){this.setColumnFilter("razon_social",e.value),this.traeSucursales(e.id)}},computed:{itemsData:function(){return this.$store.state.itemManagement.items},paginationPageSize:function(){return this.gridApi?this.gridApi.paginationGetPageSize():10},totalPages:function(){return this.gridApi?this.gridApi.paginationGetTotalPages():0},currentPage:{get:function(){return this.gridApi?this.gridApi.paginationGetCurrentPage()+1:1},set:function(e){this.gridApi.paginationGoToPage(e-1)}}},methods:{onGridSizeChanged:function(e){var t=e.columnApi.getAllColumns();e.columnApi.setColumnsVisible(t,!0),e.api.sizeColumnsToFit()},confirmMassiveDeleteRecord:function(){0!==this.gridApi.getSelectedRows().length?this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar los registros seleccionados",accept:this.massivedeleteRecord,acceptText:"Eliminar"}):this.$vs.dialog({color:"danger",title:"Error",text:"Debe seleccionar al menos un registro para realizar esta accion."})},massivedeleteRecord:function(){var e=this;this.$store.dispatch("itemManagement/borrarMasivoItem",{Items:this.gridApi.getSelectedRows(),Url:this.urlApi}).then((function(){e.showMassiveDeleteSuccess()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showMassiveDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Horarios Eliminados",text:"Los registros ya fueron eliminados."})},setColumnFilter:function(e,t){var i=null;"all"!==t&&(i={type:"equals",filter:t}),this.gridApi.getFilterInstance(e).setModel(i),this.gridApi.onFilterChanged()},resetColFilters:function(){this.gridApi.setFilterModel(null),this.gridApi.onFilterChanged(),this.sucursalFilter=this.empresaFilter={label:"Todos",value:"all",id:0},this.$refs.filterCard.removeRefreshAnimation()},updateSearchQuery:function(e){this.gridApi.setQuickFilter(e)},addRecord:function(){this.$router.push("../item-add/").catch((function(){}))},traeSucursales:function(e){var t=this;e>1?o.a.get("/api/v1/sucursal/combo/"+e).then((function(e){var i=e.data.items;i.push({label:"Todos",value:"all",id:0}),t.sucursalOptions=i.reverse()})).catch((function(e){var i=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})):(this.sucursalFilter={label:"Todos",value:"all",id:0},this.sucursalOptions=[{label:"Todos",value:"all",id:0}])},traeOtrosDatos:function(){var e=this;o.a.get("/api/v1/empresas/combo").then((function(t){var i=t.data.items;i.push({label:"Todos",value:"all",id:0}),e.empresaOptions=i.reverse()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},mounted:function(){if(this.gridApi=this.gridOptions.api,this.$vs.rtl){var e=this.$refs.agGridTable.$el.querySelector(".ag-header-container");e.style.left="-"+String(Number(e.style.transform.slice(11,-3))+9)+"px"}this.traeOtrosDatos()},created:function(){var e=this;n.a.isRegistered||(this.$store.registerModule("itemManagement",n.a),n.a.isRegistered=!0),this.$store.dispatch("itemManagement/traerItems",this.urlApi).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},h=(i("BW3U"),Object(c.a)(p,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"page-item-list"}},[i("vx-card",{ref:"filterCard",staticClass:"items-list-filters mb-8",attrs:{title:"Filtros",collapseAction:"",refreshContentAction:""},on:{refresh:e.resetColFilters,remove:e.resetColFilters}},[i("div",{staticClass:"vx-row"},[i("div",{staticClass:"vx-col md:w-1/4 sm:w-1/2 w-full"},[i("label",{staticClass:"text-sm opacity-75"},[e._v("Empresa")]),e._v(" "),i("v-select",{attrs:{options:e.empresaOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.empresaFilter,callback:function(t){e.empresaFilter=t},expression:"empresaFilter"}})],1),e._v(" "),i("div",{staticClass:"vx-col md:w-1/4 sm:w-1/2 w-full"},[i("label",{staticClass:"text-sm opacity-75"},[e._v("Sucursales")]),e._v(" "),i("v-select",{staticClass:"mb-4 md:mb-0",attrs:{options:e.sucursalOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.sucursalFilter,callback:function(t){e.sucursalFilter=t},expression:"sucursalFilter"}})],1)])]),e._v(" "),i("div",{staticClass:"vx-card p-6"},[i("div",{staticClass:"flex flex-wrap items-center"},[i("div",{staticClass:"flex-grow"},[i("vs-dropdown",{staticClass:"cursor-pointer"},[i("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[i("span",{staticClass:"mr-2"},[e._v(e._s(e.currentPage*e.paginationPageSize-(e.paginationPageSize-1))+" - "+e._s(e.itemsData.length-e.currentPage*e.paginationPageSize>0?e.currentPage*e.paginationPageSize:e.itemsData.length)+" of "+e._s(e.itemsData.length))]),e._v(" "),i("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),i("vs-dropdown-menu",[i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(10)}}},[i("span",[e._v("10")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(20)}}},[i("span",[e._v("20")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(25)}}},[i("span",[e._v("25")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(30)}}},[i("span",[e._v("30")])])],1)],1)],1),e._v(" "),i("vx-tooltip",{attrs:{color:"primary",text:"Agregar"}},[i("vs-button",{staticClass:"sm:mr-4 mb-4 md:mb-0",attrs:{"icon-pack":"feather",icon:"icon-plus"},on:{click:e.addRecord}},[e._v("AGREGAR")])],1),e._v(" "),i("vs-input",{staticClass:"sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4",attrs:{placeholder:"Buscar..."},on:{input:e.updateSearchQuery},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),e._v(" "),i("vs-dropdown",{staticClass:"cursor-pointer"},[i("div",{staticClass:"p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32"},[i("span",{staticClass:"mr-2 leading-none"},[e._v("Acciones")]),e._v(" "),i("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),i("vs-dropdown-menu",[i("vs-dropdown-item",{on:{click:function(t){return e.confirmMassiveDeleteRecord()}}},[i("span",{staticClass:"flex items-center"},[i("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),e._v(" "),i("span",[e._v("Eliminar")])],1)]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.exportDataAsCsv()}}},[i("span",{staticClass:"flex items-center"},[i("feather-icon",{staticClass:"mr-2",attrs:{icon:"SaveIcon",svgClasses:"h-4 w-4"}}),e._v(" "),i("span",[e._v("Exportar")])],1)])],1)],1)],1),e._v(" "),i("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"grid-wrapper"}},[i("ag-grid-vue",{ref:"agGridTable",staticClass:"ag-theme-material w-100 my-3 ag-grid-table",attrs:{components:e.components,gridOptions:e.gridOptions,columnDefs:e.columnDefs,defaultColDef:e.defaultColDef,rowData:e.itemsData,rowSelection:"multiple",colResizeDefault:"shift",animateRows:!0,floatingFilter:!0,pagination:!0,paginationPageSize:e.paginationPageSize,suppressPaginationPanel:!0,enableRtl:e.$vs.rtl,frameworkComponents:e.frameworkComponents,loadingOverlayComponent:e.loadingOverlayComponent,loadingOverlayComponentParams:e.loadingOverlayComponentParams,noRowsOverlayComponent:e.noRowsOverlayComponent,noRowsOverlayComponentParams:e.noRowsOverlayComponentParams},on:{"grid-size-changed":e.onGridSizeChanged}})],1),e._v(" "),i("vs-pagination",{attrs:{total:e.totalPages,max:7},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)}),[],!1,null,null,null));t.default=h.exports}}]);