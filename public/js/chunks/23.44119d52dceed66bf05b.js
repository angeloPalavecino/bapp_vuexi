(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"+rdy":function(t,e,i){(t.exports=i("I1BE")(!1)).push([t.i,"#avatar-col {\n  width: 10rem;\n}\n.tablaParametros th .vs-table-text {\n  -webkit-box-pack: center !important;\n          justify-content: center !important;\n}\n[dir] .tablaParametros tr {\n  text-align: center;\n}\n#page-item-view table {\n  /* &:not(.permissions-table) {\n     td {\n       @media screen and (max-width:370px) {\n         display: block;\n       }\n     }\n   }*/\n}\n#page-item-view table td {\n  vertical-align: top;\n  word-break: break-all;\n}\n[dir] #page-item-view table td {\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}",""])},"6wlp":function(t,e,i){"use strict";var a=i("bJaO");function s(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var n={agregarItem:function(t,e){return s(t),new Promise((function(t,i){a.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){i(t)}))}))},editarItem:function(t,e){return s(t),new Promise((function(t,i){var s="";s=e.item.id?e.Url+e.item.id:e.Url,a.a.put("/api/v1"+s,e.item).then((function(e){t(e)})).catch((function(t){i(t)}))}))},traerItems:function(t,e){var i=t.commit;return new Promise((function(t,s){a.a.get("/api/v1"+e).then((function(e){i("SET_ITEMS",e.data.items),t(e)})).catch((function(t){s(t)}))}))},traerItem:function(t,e){return s(t),new Promise((function(t,i){a.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){i(t)}))}))},borrarItem:function(t,e){var i=t.commit;return new Promise((function(t,s){a.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(a){i("REMOVE_RECORD",e.Id),t(a)})).catch((function(t){s(t)}))}))},borrarMasivoItem:function(t,e){var i=t.commit;return new Promise((function(t,s){a.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(a){i("REMOVE_MASSIVE_RECORD",e.Items),t(a)})).catch((function(t){s(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var i=t.items.findIndex((function(t){return t.id==e}));t.items.splice(i,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var i=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(i,1)}))}},actions:n,getters:{}}},DXEz:function(t,e,i){var a=i("+rdy");"string"==typeof a&&(a=[[t.i,a,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};i("aET+")(a,s);a.locals&&(t.exports=a.locals)},MxoB:function(t,e,i){"use strict";i.r(e);i("bJaO");var a=i("6wlp"),s={data:function(){return{item_data:null,item_not_found:!1,urlApi:"/tarifas/kms/",selected:[],tarifa:null}},computed:{},methods:{confirmDeleteRecord:function(t){this.tarifa=t,this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar la siguiente tarifa ",accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var t=this,e=this.tarifa.id;this.$store.dispatch("itemManagement/borrarItem",{Id:e,Url:this.urlApi}).then((function(){t.item_data=t.$store.state.itemManagement.items,t.tarifa=null,t.showDeleteSuccess()})).catch((function(e){var i=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Tarifa Eliminado",text:"La tarifa seleccionada ya fue eliminada"})},confirmMassiveDeleteRecord:function(){0!==this.selected.length?this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar los registros seleccionados",accept:this.massivedeleteRecord,acceptText:"Eliminar"}):this.$vs.dialog({color:"danger",title:"Error",text:"Debe seleccionar al menos un registro para realizar esta accion."})},massivedeleteRecord:function(){var t=this;this.$store.dispatch("itemManagement/borrarMasivoItem",{Items:this.selected,Url:this.urlApi}).then((function(){t.item_data=t.$store.state.itemManagement.items,t.showMassiveDeleteSuccess()})).catch((function(e){var i=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showMassiveDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Usuarios Eliminados",text:"Los registros ya fueron eliminados."})},editRecord:function(t){this.$router.push("../item-edit/"+t.id).catch((function(){}))}},created:function(){var t=this;a.a.isRegistered||(this.$store.registerModule("itemManagement",a.a),a.a.isRegistered=!0);var e=this.urlApi+"listado/"+this.$route.params.itemId;this.$store.dispatch("itemManagement/traerItems",e).then((function(e){t.item_data=e.data.items})).catch((function(e){404!==e.response.status?300==e.response.status?t.$vs.notify({title:"Error",text:e.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},n=(i("dc3k"),i("KHd+")),r=Object(n.a)(s,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"page-item-view"}},[i("vs-alert",{attrs:{color:"danger",title:"Empresa no encontrada",active:t.item_not_found},on:{"update:active":function(e){t.item_not_found=e}}},[i("span",[t._v("La empresa con id: "+t._s(t.$route.params.itemId)+" no fue encontrada. ")]),t._v(" "),i("span",[i("span",[t._v("Mira ")]),i("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"kms"}}},[t._v("Todas las empresas")])],1)]),t._v(" "),t.item_data?i("div",{attrs:{id:"item-data"}},[i("vx-card",{staticClass:"mb-base",attrs:{title:"Tarifas"}},[i("div",{staticClass:"vx-row"},[i("div",{staticClass:"vx-col w-full"},[i("div",{staticClass:"flex items-end px-3"},[i("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"DollarSignIcon"}}),t._v(" "),i("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),i("vs-divider")],1)]),t._v(" "),i("div",{staticClass:"block overflow-x-auto"},[i("vs-table",{ref:"tablepar",staticClass:"tablaParametros",attrs:{multiple:"",pagination:"",search:"",data:t.item_data},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data;return t._l(a,(function(e,a){return i("vs-tr",{key:a,attrs:{data:e}},[i("vs-td",[i("p",{staticClass:"items-id font-medium"},[t._v(t._s(e.servicioskms[0].id))])]),t._v(" "),i("vs-td",[i("p",{staticClass:"items-descripcion"},[t._v(t._s(e.servicioskms[0].descripcion)+" ")])]),t._v(" "),i("vs-td",[i("p",{staticClass:"items-cant_psjs"},[t._v(t._s(e.servicioskms[0].cant_psjs))])]),t._v(" "),i("vs-td",[i("p",{staticClass:"items-min_servicio"},[t._v(t._s(e.servicioskms[0].min_servicio))])]),t._v(" "),i("vs-td",[i("p",{staticClass:"items-kms"},[t._v(t._s(e.servicioskms[0].kms))])]),t._v(" "),i("vs-td",[i("div",{staticClass:"flex vx-col w-full sm:w-auto ml-auto mt-2 sm:mt-0",staticStyle:{"justify-content":"center"}},[i("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[i("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-trash",size:"small"},on:{click:function(i){return t.confirmDeleteRecord(e)}}})],1),t._v(" "),i("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[i("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-edit",size:"small"},on:{click:function(i){return t.editRecord(e)}}})],1)],1)])],1)}))}}],null,!1,1169796227),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[i("template",{slot:"header"},[i("vs-dropdown",{staticClass:"cursor-pointer",attrs:{"vs-trigger-click":""}},[i("div",{staticClass:"p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32"},[i("span",{staticClass:"mr-2 leading-none"},[t._v("Acciones")]),t._v(" "),i("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),t._v(" "),i("vs-dropdown-menu",[i("vs-dropdown-item",{on:{click:function(e){return t.confirmMassiveDeleteRecord()}}},[i("span",{staticClass:"flex items-center"},[i("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),t._v(" "),i("span",[t._v("Eliminar")])],1)])],1)],1)],1),t._v(" "),i("template",{slot:"thead"},[i("vs-th",[t._v("ID")]),t._v(" "),i("vs-th",[t._v("T. Servicio")]),t._v(" "),i("vs-th",[t._v("N° Pasajeros")]),t._v(" "),i("vs-th",[t._v("Minima")]),t._v(" "),i("vs-th",[t._v("Kms")]),t._v(" "),i("vs-th",{attrs:{"sort-key":"items-accion"}},[t._v("Accion")])],1)],2)],1)]),t._v(" "),i("div",{staticClass:"vx-col w-full flex mt-4",attrs:{id:"account-manage-buttons"}},[i("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[i("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"kms"}}},[t._v("Volver")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=r.exports},dc3k:function(t,e,i){"use strict";var a=i("DXEz");i.n(a).a}}]);