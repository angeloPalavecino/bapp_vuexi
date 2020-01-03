(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"373s":function(e,t,i){"use strict";var s=i("QLD6");i.n(s).a},QLD6:function(e,t,i){var s=i("xpBF");"string"==typeof s&&(s=[[e.i,s,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};i("aET+")(s,r);s.locals&&(e.exports=s.locals)},SRWr:function(e,t,i){"use strict";i.r(t);var s=i("QBvj"),r=(i("7emp"),i("Snq/")),n=i.n(r),a=(i("bJaO"),i("6wlp")),o={name:"CellRendererActions",methods:{viewRecord:function(){this.$router.push("../item-view/"+this.params.data.id).catch((function(){}))},editRecord:function(){this.$router.push("../item-edit/"+this.params.data.id).catch((function(){}))},confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:'Este seguro que desea eliminar la siguiente observacion "'.concat(this.params.data.name,'"'),accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var e=this;this.$store.dispatch("itemManagement/borrarItem",{Id:this.params.data.id,Url:this.$parent.$parent.urlApi}).then((function(){e.showDeleteSuccess()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Observacion Eliminado",text:"La observacion seleccionado ya fue eliminado"})}}},c=i("KHd+"),l=Object(c.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{style:{direction:this.$vs.rtl?"rtl":"ltr"}},[t("feather-icon",{attrs:{icon:"EyeIcon",svgClasses:"h-5 w-5 mr-4 hover:text-primary cursor-pointer"},on:{click:this.viewRecord}}),this._v(" "),t("feather-icon",{attrs:{icon:"Edit3Icon",svgClasses:"h-5 w-5 mr-4 hover:text-primary cursor-pointer"},on:{click:this.editRecord}}),this._v(" "),t("feather-icon",{attrs:{icon:"Trash2Icon",svgClasses:"h-5 w-5 hover:text-danger cursor-pointer"},on:{click:this.confirmDeleteRecord}})],1)}),[],!1,null,null,null).exports,d={components:{AgGridVue:s.AgGridVue,vSelect:n.a,CellRendererActions:l},data:function(){return{urlApi:"/observaciones/observaciones/",searchQuery:"",gridApi:null,gridOptions:{},defaultColDef:{sortable:!0,resizable:!0,suppressMenu:!0},columnDefs:[{headerName:"ID",field:"id",minWidth:120,filter:!0,checkboxSelection:!0,headerCheckboxSelectionFilteredOnly:!0,headerCheckboxSelection:!0,suppressSizeToFit:!0},{headerName:"Descripcion",field:"descripcion",filter:!0,minWidth:185},{headerName:"Acciones",field:"transactions",minWidth:120,cellRendererFramework:"CellRendererActions"}],components:{CellRendererActions:l}}},watch:{},computed:{itemsData:function(){return this.$store.state.itemManagement.items},paginationPageSize:function(){return this.gridApi?this.gridApi.paginationGetPageSize():10},totalPages:function(){return this.gridApi?this.gridApi.paginationGetTotalPages():0},currentPage:{get:function(){return this.gridApi?this.gridApi.paginationGetCurrentPage()+1:1},set:function(e){this.gridApi.paginationGoToPage(e-1)}}},methods:{confirmMassiveDeleteRecord:function(){0!==this.gridApi.getSelectedRows().length?this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar los registros seleccionados",accept:this.massivedeleteRecord,acceptText:"Eliminar"}):this.$vs.dialog({color:"danger",title:"Error",text:"Debe seleccionar al menos un registro para realizar esta accion."})},massivedeleteRecord:function(){var e=this;this.$store.dispatch("itemManagement/borrarMasivoItem",{Items:this.gridApi.getSelectedRows(),Url:this.urlApi}).then((function(){e.showMassiveDeleteSuccess()})).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showMassiveDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Observaciones Eliminadas",text:"Los registros ya fueron eliminados."})},updateSearchQuery:function(e){this.gridApi.setQuickFilter(e)},addRecord:function(){this.$router.push("../item-add/").catch((function(){}))}},mounted:function(){if(this.gridApi=this.gridOptions.api,this.$vs.rtl){var e=this.$refs.agGridTable.$el.querySelector(".ag-header-container");e.style.left="-"+String(Number(e.style.transform.slice(11,-3))+9)+"px"}this.gridOptions.api.sizeColumnsToFit()},created:function(){var e=this;a.a.isRegistered||(this.$store.registerModule("itemManagement",a.a),a.a.isRegistered=!0),this.$store.dispatch("itemManagement/traerItems",this.urlApi).catch((function(t){var i=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},u=(i("373s"),Object(c.a)(d,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"page-item-list"}},[i("div",{staticClass:"vx-card p-6"},[i("div",{staticClass:"flex flex-wrap items-center"},[i("div",{staticClass:"flex-grow"},[i("vs-dropdown",{staticClass:"cursor-pointer",attrs:{"vs-trigger-click":""}},[i("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[i("span",{staticClass:"mr-2"},[e._v(e._s(e.currentPage*e.paginationPageSize-(e.paginationPageSize-1))+" - "+e._s(e.itemsData.length-e.currentPage*e.paginationPageSize>0?e.currentPage*e.paginationPageSize:e.itemsData.length)+" of "+e._s(e.itemsData.length))]),e._v(" "),i("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),i("vs-dropdown-menu",[i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(10)}}},[i("span",[e._v("10")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(20)}}},[i("span",[e._v("20")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(25)}}},[i("span",[e._v("25")])]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(30)}}},[i("span",[e._v("30")])])],1)],1)],1),e._v(" "),i("vx-tooltip",{attrs:{color:"primary",text:"Agregar"}},[i("vs-button",{staticClass:"sm:mr-4 mb-4 md:mb-0",attrs:{"icon-pack":"feather",icon:"icon-plus"},on:{click:e.addRecord}},[e._v("AGREGAR")])],1),e._v(" "),i("vs-input",{staticClass:"sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4",attrs:{placeholder:"Buscar..."},on:{input:e.updateSearchQuery},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),e._v(" "),i("vs-dropdown",{staticClass:"cursor-pointer",attrs:{"vs-trigger-click":""}},[i("div",{staticClass:"p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32"},[i("span",{staticClass:"mr-2 leading-none"},[e._v("Acciones")]),e._v(" "),i("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),i("vs-dropdown-menu",[i("vs-dropdown-item",{on:{click:function(t){return e.confirmMassiveDeleteRecord()}}},[i("span",{staticClass:"flex items-center"},[i("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),e._v(" "),i("span",[e._v("Eliminar")])],1)]),e._v(" "),i("vs-dropdown-item",{on:{click:function(t){return e.gridApi.exportDataAsCsv()}}},[i("span",{staticClass:"flex items-center"},[i("feather-icon",{staticClass:"mr-2",attrs:{icon:"SaveIcon",svgClasses:"h-4 w-4"}}),e._v(" "),i("span",[e._v("Exportar")])],1)])],1)],1)],1),e._v(" "),i("ag-grid-vue",{ref:"agGridTable",staticClass:"ag-theme-material w-100 my-3 ag-grid-table",attrs:{components:e.components,gridOptions:e.gridOptions,columnDefs:e.columnDefs,defaultColDef:e.defaultColDef,rowData:e.itemsData,rowSelection:"multiple",colResizeDefault:"shift",animateRows:!0,floatingFilter:!0,pagination:!0,paginationPageSize:e.paginationPageSize,suppressPaginationPanel:!0,enableRtl:e.$vs.rtl}}),e._v(" "),i("vs-pagination",{attrs:{total:e.totalPages,max:7},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)])}),[],!1,null,null,null));t.default=u.exports},xpBF:function(e,t,i){(e.exports=i("I1BE")(!1)).push([e.i,"#page-item-list .items-list-filters .vs__actions {\n  position: absolute;\n  top: 50%;\n}[dir] #page-item-list .items-list-filters .vs__actions {\n  -webkit-transform: translateY(-58%);\n          transform: translateY(-58%);\n}[dir=ltr] #page-item-list .items-list-filters .vs__actions {\n  right: 0;\n}[dir=rtl] #page-item-list .items-list-filters .vs__actions {\n  left: 0;\n}",""])}}]);