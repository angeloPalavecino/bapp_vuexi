(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"40PJ":function(e,t,i){var s=i("RF2/");"string"==typeof s&&(s=[[e.i,s,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};i("aET+")(s,r);s.locals&&(e.exports=s.locals)},"6kBQ":function(e,t,i){var s=i("rdzL");"string"==typeof s&&(s=[[e.i,s,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};i("aET+")(s,r);s.locals&&(e.exports=s.locals)},DF4V:function(e,t,i){"use strict";var s=i("40PJ");i.n(s).a},Ifml:function(e,t,i){"use strict";var s=i("6kBQ");i.n(s).a},"RF2/":function(e,t,i){(e.exports=i("I1BE")(!1)).push([e.i,"#page-item-list .items-list-filters .vs__actions {\n  position: absolute;\n  top: 50%;\n}[dir] #page-item-list .items-list-filters .vs__actions {\n  -webkit-transform: translateY(-58%);\n          transform: translateY(-58%);\n}[dir=ltr] #page-item-list .items-list-filters .vs__actions {\n  right: 0;\n}[dir=rtl] #page-item-list .items-list-filters .vs__actions {\n  left: 0;\n}",""])},"aeb+":function(e,t,i){"use strict";i.r(t);var s=i("QBvj"),r=(i("7emp"),i("Snq/")),a=i.n(r),n=i("bJaO"),o=i("6wlp"),l={name:"CellRendererLink",computed:{url:function(){return"../item-view/"+this.params.data.id}}},c=i("KHd+"),d=Object(c.a)(l,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"flex items-center"},[i("vs-avatar",{staticClass:"flex-shrink-0 mr-2",attrs:{src:e.params.data.imagen,size:"30px"},on:{click:function(t){return e.$router.push(e.url)}}}),e._v(" "),i("router-link",{staticClass:"text-inherit hover:text-primary",attrs:{to:e.url},on:{click:function(e){e.stopPropagation(),e.preventDefault()}}},[e._v(e._s(e.params.value))])],1)}),[],!1,null,null,null).exports,u={name:"CellRendererStatus",computed:{chipColor:function(){return function(e){return 1===e?"success":0===e?"danger":void 0}}}},p=(i("Ifml"),Object(c.a)(u,(function(){var e=this.$createElement,t=this._self._c||e;return t("vs-chip",{staticClass:"ag-grid-cell-chip",attrs:{color:this.chipColor(this.params.value)}},[t("span",[this._v(this._s(1===this.params.value?"Activo":"Inactivo"))])])}),[],!1,null,null,null).exports),m={name:"CellRendererActions",methods:{viewRecord:function(){this.$router.push("../item-view/"+this.params.data.id).catch((function(){}))},editRecord:function(){this.$router.push("../item-edit/"+this.params.data.id).catch((function(){}))},confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:'Este seguro que desea eliminar el siguiente usuario "'.concat(this.params.data.name,'"'),accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var e=this;this.$store.dispatch("itemManagement/borrarItem",{Id:this.params.data.id,Url:this.$parent.$parent.urlApi}).then((function(){e.showDeleteSuccess()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Usuario Eliminado",text:"El usuario seleccionado ya fue eliminado"})}}},v=Object(c.a)(m,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{style:{direction:this.$vs.rtl?"rtl":"ltr"}},[t("feather-icon",{attrs:{icon:"EyeIcon",svgClasses:"h-5 w-5 mr-4 hover:text-primary cursor-pointer"},on:{click:this.viewRecord}}),this._v(" "),t("feather-icon",{attrs:{icon:"Edit3Icon",svgClasses:"h-5 w-5 mr-4 hover:text-primary cursor-pointer"},on:{click:this.editRecord}}),this._v(" "),t("feather-icon",{attrs:{icon:"Trash2Icon",svgClasses:"h-5 w-5 hover:text-danger cursor-pointer"},on:{click:this.confirmDeleteRecord}})],1)}),[],!1,null,null,null).exports,h={components:{AgGridVue:s.AgGridVue,vSelect:a.a,CellRendererLink:d,CellRendererStatus:p,CellRendererActions:v},data:function(){return{urlApi:"/users/users/",roleFilter:{label:"Todos",value:"all"},roleOptions:[{label:"Todos",value:"all"}],statusFilter:{label:"Todos",value:"all"},statusOptions:[{label:"Todos",value:"all"},{label:"Activo",value:"1"},{label:"Inactivo",value:"0"}],empresaFilter:{label:"Todos",value:"all"},empresaOptions:[{label:"Todos",value:"all"}],searchQuery:"",gridApi:null,gridOptions:{},defaultColDef:{sortable:!0,resizable:!0,suppressMenu:!0},columnDefs:[{headerName:"ID",field:"id",minWidth:120,filter:!0,checkboxSelection:!0,headerCheckboxSelectionFilteredOnly:!0,headerCheckboxSelection:!0},{headerName:"Nombre",field:"name",filter:!0,minWidth:185,cellRendererFramework:"CellRendererLink"},{headerName:"Apellido",field:"lastname",filter:!0,minWidth:160},{headerName:"Email",field:"email",filter:!0,minWidth:170},{headerName:"Rol",field:"rol",filter:!0,minWidth:155},{headerName:"Estado",field:"habilitado",filter:!0,minWidth:110,cellRendererFramework:"CellRendererStatus"},{headerName:"Empresa",field:"razon_social",filter:!0,minWidth:140},{headerName:"Acciones",field:"transactions",minWidth:120,cellRendererFramework:"CellRendererActions"}],components:{CellRendererLink:d,CellRendererStatus:p,CellRendererActions:v}}},watch:{roleFilter:function(e){this.setColumnFilter("rol",e.value)},statusFilter:function(e){this.setColumnFilter("habilitado",e.value)},empresaFilter:function(e){this.setColumnFilter("razon_social",e.value)}},computed:{itemsData:function(){return this.$store.state.itemManagement.items},paginationPageSize:function(){return this.gridApi?this.gridApi.paginationGetPageSize():10},totalPages:function(){return this.gridApi?this.gridApi.paginationGetTotalPages():0},currentPage:{get:function(){return this.gridApi?this.gridApi.paginationGetCurrentPage()+1:1},set:function(e){this.gridApi.paginationGoToPage(e-1)}}},methods:{confirmMassiveDeleteRecord:function(){0!==this.gridApi.getSelectedRows().length?this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar los registros seleccionados",accept:this.massivedeleteRecord,acceptText:"Eliminar"}):this.$vs.dialog({color:"danger",title:"Error",text:"Debe seleccionar al menos un registro para realizar esta accion."})},massivedeleteRecord:function(){var e=this;this.$store.dispatch("itemManagement/borrarMasivoItem",{Items:this.gridApi.getSelectedRows(),Url:this.urlApi}).then((function(){e.showMassiveDeleteSuccess()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showMassiveDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Usuarios Eliminados",text:"Los registros ya fueron eliminados."})},setColumnFilter:function(e,t){var i=null;"all"!==t&&(i={type:"equals",filter:t}),this.gridApi.getFilterInstance(e).setModel(i),this.gridApi.onFilterChanged()},resetColFilters:function(){this.gridApi.setFilterModel(null),this.gridApi.onFilterChanged(),this.roleFilter=this.statusFilter=this.empresaFilter={label:"Todos",value:"all"},this.$refs.filterCard.removeRefreshAnimation()},updateSearchQuery:function(e){this.gridApi.setQuickFilter(e)},traeOtrosDatos:function(){var e=this;n.a.get("/api/v1/empresas/combo").then((function(t){var i=t.data.items;i.push({label:"Todos",value:"all"}),e.empresaOptions=i.reverse()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),n.a.get("/api/v1/roles/combo").then((function(t){var i=t.data.items;i.push({label:"Todos",value:"all"}),e.roleOptions=i.reverse()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},addRecord:function(){this.$router.push("../item-add/").catch((function(){}))}},mounted:function(){if(this.gridApi=this.gridOptions.api,this.$vs.rtl){var e=this.$refs.agGridTable.$el.querySelector(".ag-header-container");e.style.left="-"+String(Number(e.style.transform.slice(11,-3))+9)+"px"}this.gridOptions.api.sizeColumnsToFit(),this.traeOtrosDatos()},created:function(){var e=this;o.a.isRegistered||(this.$store.registerModule("itemManagement",o.a),o.a.isRegistered=!0),this.$store.dispatch("itemManagement/traerItems",this.urlApi).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},g=(i("DF4V"),Object(c.a)(h,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"page-item-list"}},[i("vx-card",{ref:"filterCard",staticClass:"items-list-filters mb-8",attrs:{title:"Filtros",collapseAction:"",refreshContentAction:""},on:{refresh:e.resetColFilters,remove:e.resetColFilters}},[i("div",{staticClass:"vx-row"},[i("div",{staticClass:"vx-col md:w-1/4 sm:w-1/2 w-full"},[i("label",{staticClass:"text-sm opacity-75"},[e._v("Roles")]),e._v(" "),i("v-select",{staticClass:"mb-4 md:mb-0",attrs:{options:e.roleOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.roleFilter,callback:function(t){e.roleFilter=t},expression:"roleFilter"}})],1),e._v(" "),i("div",{staticClass:"vx-col md:w-1/4 sm:w-1/2 w-full"},[i("label",{staticClass:"text-sm opacity-75"},[e._v("Estado")]),e._v(" "),i("v-select",{staticClass:"mb-4 md:mb-0",attrs:{options:e.statusOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.statusFilter,callback:function(t){e.statusFilter=t},expression:"statusFilter"}})],1),e._v(" "),i("div",{staticClass:"vx-col md:w-1/4 sm:w-1/2 w-full"},[i("label",{staticClass:"text-sm opacity-75"},[e._v("Empresa")]),e._v(" "),i("v-select",{attrs:{options:e.empresaOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.empresaFilter,callback:function(t){e.empresaFilter=t},expression:"empresaFilter"}})],1)])]),e._v(" "),i("div",{staticClass:"vx-card p-6"},[i("div",{staticClass:"flex flex-wrap items-center"},[i("div",{staticClass:"flex-grow"},[i("vs-dropdown",{staticClass:"cursor-pointer",attrs:{"vs-trigger-click":""}},[i("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[i("span",{staticClass:"mr-2"},[e._v(e._s(e.currentPage*e.paginationPageSize-(e.paginationPageSize-1))+" - "+e._s(e.itemsData.length-e.currentPage*e.paginationPageSize>0?e.currentPage*e.paginationPageSize:e.itemsData.length)+" of "+e._s(e.itemsData.length))]),e._v(" "),i("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),i("vs-dropdown-menu",[i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(10)}}},[i("span",[e._v("10")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(20)}}},[i("span",[e._v("20")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(25)}}},[i("span",[e._v("25")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(30)}}},[i("span",[e._v("30")])])],1)],1)],1),e._v(" "),i("vx-tooltip",{attrs:{color:"primary",text:"Agregar"}},[i("vs-button",{staticClass:"sm:mr-4 mb-4 md:mb-0",attrs:{"icon-pack":"feather",icon:"icon-plus"},on:{click:e.addRecord}},[e._v("AGREGAR")])],1),e._v(" "),i("vs-input",{staticClass:"sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4",attrs:{placeholder:"Buscar..."},on:{input:e.updateSearchQuery},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),e._v(" "),i("vs-dropdown",{staticClass:"cursor-pointer",attrs:{"vs-trigger-click":""}},[i("div",{staticClass:"p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32"},[i("span",{staticClass:"mr-2 leading-none"},[e._v("Acciones")]),e._v(" "),i("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),i("vs-dropdown-menu",[i("vs-dropdown-item",{on:{click:function(t){return e.confirmMassiveDeleteRecord()}}},[i("span",{staticClass:"flex items-center"},[i("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),e._v(" "),i("span",[e._v("Eliminar")])],1)]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.exportDataAsCsv()}}},[i("span",{staticClass:"flex items-center"},[i("feather-icon",{staticClass:"mr-2",attrs:{icon:"SaveIcon",svgClasses:"h-4 w-4"}}),e._v(" "),i("span",[e._v("Exportar")])],1)])],1)],1)],1),e._v(" "),i("ag-grid-vue",{ref:"agGridTable",staticClass:"ag-theme-material w-100 my-3 ag-grid-table",attrs:{components:e.components,gridOptions:e.gridOptions,columnDefs:e.columnDefs,defaultColDef:e.defaultColDef,rowData:e.itemsData,rowSelection:"multiple",colResizeDefault:"shift",animateRows:!0,floatingFilter:!0,pagination:!0,paginationPageSize:e.paginationPageSize,suppressPaginationPanel:!0,enableRtl:e.$vs.rtl}}),e._v(" "),i("vs-pagination",{attrs:{total:e.totalPages,max:7},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)}),[],!1,null,null,null));t.default=g.exports},rdzL:function(e,t,i){(e.exports=i("I1BE")(!1)).push([e.i,".ag-grid-cell-chip.vs-chip-success {\n  color: rgba(var(--vs-success), 1) !important;\n  font-weight: 500;\n}[dir] .ag-grid-cell-chip.vs-chip-success {\n  background: rgba(var(--vs-success), 0.15);\n}\n.ag-grid-cell-chip.vs-chip-warning {\n  color: rgba(var(--vs-warning), 1) !important;\n  font-weight: 500;\n}\n[dir] .ag-grid-cell-chip.vs-chip-warning {\n  background: rgba(var(--vs-warning), 0.15);\n}\n.ag-grid-cell-chip.vs-chip-danger {\n  color: rgba(var(--vs-danger), 1) !important;\n  font-weight: 500;\n}\n[dir] .ag-grid-cell-chip.vs-chip-danger {\n  background: rgba(var(--vs-danger), 0.15);\n}",""])}}]);