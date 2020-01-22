(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"6wlp":function(t,e,a){"use strict";var n=a("bJaO");function i(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var o={agregarItem:function(t,e){return i(t),new Promise((function(t,a){n.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},editarItem:function(t,e){return i(t),new Promise((function(t,a){var i="";i=e.item.id?e.Url+e.item.id:e.Url,n.a.put("/api/v1"+i,e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},traerItems:function(t,e){var a=t.commit;return new Promise((function(t,i){n.a.get("/api/v1"+e).then((function(e){a("SET_ITEMS",e.data.items),t(e)})).catch((function(t){i(t)}))}))},traerItem:function(t,e){return i(t),new Promise((function(t,a){n.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){a(t)}))}))},borrarItem:function(t,e){var a=t.commit;return new Promise((function(t,i){n.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(n){a("REMOVE_RECORD",e.Id),t(n)})).catch((function(t){i(t)}))}))},borrarMasivoItem:function(t,e){var a=t.commit;return new Promise((function(t,i){n.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(n){a("REMOVE_MASSIVE_RECORD",e.Items),t(n)})).catch((function(t){i(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var a=t.items.findIndex((function(t){return t.id==e}));t.items.splice(a,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var a=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(a,1)}))}},actions:o,getters:{}}},"8lkN":function(t,e,a){var n=a("xpNB");"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(n,i);n.locals&&(t.exports=n.locals)},jrOf:function(t,e,a){"use strict";a.r(e);a("bJaO");var n=a("6wlp"),i={data:function(){return{item_data:null,item_not_found:!1,urlApi:"/fuerazonas/fuerazonas/"}},computed:{},methods:{confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:"Este seguro que desea eliminar el siguiente fuera de zona?",accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var t=this;this.$store.dispatch("itemManagement/borrarItem",{Id:this.item_data.id,Url:this.urlApi}).then((function(){t.$router.push({name:"fuerazonas"}),t.showDeleteSuccess()})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Fuera De Zona Eliminada",text:"La fuera de zona seleccionado ya fue eliminada"})}},mounted:function(){},created:function(){var t=this;n.a.isRegistered||(this.$store.registerModule("itemManagement",n.a),n.a.isRegistered=!0);var e=this.$route.params.itemId,a=this.urlApi;this.$store.dispatch("itemManagement/traerItem",{Id:e,Url:a}).then((function(e){t.item_data=e.data.item[0]})).catch((function(e){404!==e.response.status?300==e.response.status?t.$vs.notify({title:"Error",text:e.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},o=(a("jsoa"),a("KHd+")),r=Object(o.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"page-item-view"}},[a("vs-alert",{attrs:{color:"danger",title:"Fuera de zona no encontrado",active:t.item_not_found},on:{"update:active":function(e){t.item_not_found=e}}},[a("span",[t._v("La fuera de zona con id: "+t._s(t.$route.params.itemId)+" no fue encontrado. ")]),t._v(" "),a("span",[a("span",[t._v("Mira ")]),a("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"fuerazonas"}}},[t._v("Todas las fuera de zonas")])],1)]),t._v(" "),t.item_data?a("div",{attrs:{id:"item-data"}},[a("vx-card",{staticClass:"mb-base",attrs:{title:"Informacion"}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"flex items-end px-3"},[a("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"InfoIcon"}}),t._v(" "),a("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),a("vs-divider")],1)]),t._v(" "),a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-1"}},[a("table",[a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Empresa")]),t._v(" "),a("td",[t._v(t._s(t.item_data.empresa)+" ")])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Comuna")]),t._v(" "),a("td",[t._v(t._s(t.item_data.comuna)+" ")])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Tipo")]),t._v(" "),a("td",[t._v("Fuera de zona "+t._s(t.item_data.tipo)+" ")])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Distancia")]),t._v(" "),a("td",[t._v(t._s(t.item_data.distancia)+" ")])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Creado el")]),t._v(" "),a("td",[t._v(t._s(t.item_data.created_at))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Ultima Actualizacion")]),t._v(" "),a("td",[t._v(t._s(t.item_data.updated_at))])])])])])]),t._v(" "),a("div",{staticClass:"vx-col w-full flex mt-4",attrs:{id:"account-manage-buttons"}},[a("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[a("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit",to:{name:"fuerazonas-edit",params:{itemId:t.$route.params.itemId}}}},[t._v("Editar")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[a("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"fuerazonas"}}},[t._v("Volver")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[a("vs-button",{attrs:{type:"border",color:"danger","icon-pack":"feather",icon:"icon-trash"},on:{click:t.confirmDeleteRecord}},[t._v("Eliminar")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=r.exports},jsoa:function(t,e,a){"use strict";var n=a("8lkN");a.n(n).a},xpNB:function(t,e,a){(t.exports=a("I1BE")(!1)).push([t.i,"#avatar-col {\n  width: 10rem;\n}\n#page-item-view table {\n  /* &:not(.permissions-table) {\n     td {\n       @media screen and (max-width:370px) {\n         display: block;\n       }\n     }\n   }*/\n}\n#page-item-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  word-break: break-all;\n}\n[dir] #page-item-view table td {\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}",""])}}]);