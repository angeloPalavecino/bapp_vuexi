(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{"1KOn":function(t,e,a){(t.exports=a("I1BE")(!1)).push([t.i,"#avatar-col {\n  width: 10rem;\n}\n.tablaParametros th .vs-table-text {\n  -webkit-box-pack: center !important;\n          justify-content: center !important;\n}\n[dir] .tablaParametros tr {\n  text-align: center;\n}\n#page-item-view table {\n  /* &:not(.permissions-table) {\n     td {\n       @media screen and (max-width:370px) {\n         display: block;\n       }\n     }\n   }*/\n}\n#page-item-view table td {\n  vertical-align: top;\n  word-break: break-all;\n}\n[dir] #page-item-view table td {\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}",""])},"6wlp":function(t,e,a){"use strict";var i=a("bJaO");function s(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var n={agregarItem:function(t,e){return s(t),new Promise((function(t,a){i.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},editarItem:function(t,e){return s(t),new Promise((function(t,a){var s="";s=e.item.id?e.Url+e.item.id:e.Url,i.a.put("/api/v1"+s,e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},traerItems:function(t,e){var a=t.commit;return new Promise((function(t,s){i.a.get("/api/v1"+e).then((function(e){a("SET_ITEMS",e.data.items),t(e)})).catch((function(t){s(t)}))}))},traerItem:function(t,e){return s(t),new Promise((function(t,a){i.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){a(t)}))}))},borrarItem:function(t,e){var a=t.commit;return new Promise((function(t,s){i.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(i){a("REMOVE_RECORD",e.Id),t(i)})).catch((function(t){s(t)}))}))},borrarMasivoItem:function(t,e){var a=t.commit;return new Promise((function(t,s){i.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(i){a("REMOVE_MASSIVE_RECORD",e.Items),t(i)})).catch((function(t){s(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var a=t.items.findIndex((function(t){return t.id==e}));t.items.splice(a,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var a=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(a,1)}))}},actions:n,getters:{}}},H4xa:function(t,e,a){var i=a("1KOn");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(i,s);i.locals&&(t.exports=i.locals)},mCBF:function(t,e,a){"use strict";var i=a("H4xa");a.n(i).a},rZxe:function(t,e,a){"use strict";a.r(e);a("bJaO");var i=a("6wlp"),s={data:function(){return{item_data:null,item_not_found:!1,urlApi:"/tarifas/pasajeros/",selected:[],tarifa:null}},computed:{},methods:{getFactorPromedio:function(t,e){var a=parseFloat(t),i=parseFloat(e),s=0;return a>0&&i>0&&(s=(a+i)/2),s.toFixed(2)},confirmDeleteRecord:function(t){this.tarifa=t,this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar la siguiente tarifa ",accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var t=this,e=this.tarifa.id;this.$store.dispatch("itemManagement/borrarItem",{Id:e,Url:this.urlApi}).then((function(){t.item_data=t.$store.state.itemManagement.items,t.tarifa=null,t.showDeleteSuccess()})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Tarifa Eliminado",text:"La tarifa seleccionada ya fue eliminada"})},confirmMassiveDeleteRecord:function(){0!==this.selected.length?this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar los registros seleccionados",accept:this.massivedeleteRecord,acceptText:"Eliminar"}):this.$vs.dialog({color:"danger",title:"Error",text:"Debe seleccionar al menos un registro para realizar esta accion."})},massivedeleteRecord:function(){var t=this;this.$store.dispatch("itemManagement/borrarMasivoItem",{Items:this.selected,Url:this.urlApi}).then((function(){t.item_data=t.$store.state.itemManagement.items,t.showMassiveDeleteSuccess()})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showMassiveDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Usuarios Eliminados",text:"Los registros ya fueron eliminados."})},editRecord:function(t){this.$router.push("../item-edit/"+t.id).catch((function(){}))}},created:function(){var t=this;i.a.isRegistered||(this.$store.registerModule("itemManagement",i.a),i.a.isRegistered=!0);var e=this.urlApi+"listado/"+this.$route.params.itemId;this.$store.dispatch("itemManagement/traerItems",e).then((function(e){t.item_data=e.data.items})).catch((function(e){404!==e.response.status?300==e.response.status?t.$vs.notify({title:"Error",text:e.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},n=(a("mCBF"),a("KHd+")),r=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"page-item-view"}},[a("vs-alert",{attrs:{color:"danger",title:"Empresa no encontrada",active:t.item_not_found},on:{"update:active":function(e){t.item_not_found=e}}},[a("span",[t._v("La empresa con id: "+t._s(t.$route.params.itemId)+" no fue encontrada. ")]),t._v(" "),a("span",[a("span",[t._v("Mira ")]),a("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"pasajeros"}}},[t._v("Todas las empresas")])],1)]),t._v(" "),t.item_data?a("div",{attrs:{id:"item-data"}},[a("vx-card",{staticClass:"mb-base",attrs:{title:"Tarifas"}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"flex items-end px-3"},[a("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"DollarSignIcon"}}),t._v(" "),a("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),a("vs-divider")],1)]),t._v(" "),a("div",{staticClass:"block overflow-x-auto"},[a("vs-table",{ref:"tablepar",staticClass:"tablaParametros",attrs:{multiple:"",pagination:"",search:"",data:t.item_data},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.data;return t._l(i,(function(e,i){return a("vs-tr",{key:i,attrs:{data:e}},[a("vs-td",[a("p",{staticClass:"items-id font-medium"},[t._v(t._s(e.serviciospasajeros[0].id))])]),t._v(" "),a("vs-td",[a("p",{staticClass:"items-num-pasajeros"},[t._v(t._s(e.serviciospasajeros[0].num_psj_min)+" - "+t._s(e.serviciospasajeros[0].num_psj_max))])]),t._v(" "),a("vs-td",[a("p",{staticClass:"items-factor"},[t._v(t._s(e.serviciospasajeros[0].fac_rang_min)+" - "+t._s(e.serviciospasajeros[0].fac_rang_max))])]),t._v(" "),a("vs-td",[a("p",{staticClass:"items-factor-promedio"},[t._v(t._s(t.getFactorPromedio(e.serviciospasajeros[0].fac_rang_min,e.serviciospasajeros[0].fac_rang_max)))])]),t._v(" "),a("vs-td",[a("p",{staticClass:"items-valor"},[t._v(t._s(e.serviciospasajeros[0].valor))])]),t._v(" "),a("vs-td",[a("div",{staticClass:"flex vx-col w-full sm:w-auto ml-auto mt-2 sm:mt-0",staticStyle:{"justify-content":"center"}},[a("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[a("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-trash",size:"small"},on:{click:function(a){return t.confirmDeleteRecord(e)}}})],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[a("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-edit",size:"small"},on:{click:function(a){return t.editRecord(e)}}})],1)],1)])],1)}))}}],null,!1,1976779036),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[a("template",{slot:"header"},[a("vs-dropdown",{staticClass:"cursor-pointer"},[a("div",{staticClass:"p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32"},[a("span",{staticClass:"mr-2 leading-none"},[t._v("Acciones")]),t._v(" "),a("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),t._v(" "),a("vs-dropdown-menu",[a("vs-dropdown-item",{on:{click:function(e){return t.confirmMassiveDeleteRecord()}}},[a("span",{staticClass:"flex items-center"},[a("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),t._v(" "),a("span",[t._v("Eliminar")])],1)])],1)],1)],1),t._v(" "),a("template",{slot:"thead"},[a("vs-th",[t._v("ID")]),t._v(" "),a("vs-th",[t._v("N° Pasajeros")]),t._v(" "),a("vs-th",[t._v("Factor")]),t._v(" "),a("vs-th",[t._v("Factor Promedio")]),t._v(" "),a("vs-th",[t._v("Valor")]),t._v(" "),a("vs-th",[t._v("Accion")])],1)],2)],1)]),t._v(" "),a("div",{staticClass:"vx-col w-full flex mt-4",attrs:{id:"account-manage-buttons"}},[a("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[a("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"pasajeros"}}},[t._v("Volver")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=r.exports}}]);