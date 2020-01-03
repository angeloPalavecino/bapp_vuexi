(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"6wlp":function(t,e,a){"use strict";var n=a("bJaO");function i(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var o={agregarItem:function(t,e){return i(t),new Promise((function(t,a){n.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},editarItem:function(t,e){return i(t),new Promise((function(t,a){n.a.put("/api/v1"+e.Url+e.item.id,e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},traerItems:function(t,e){var a=t.commit;return new Promise((function(t,i){n.a.get("/api/v1"+e).then((function(e){a("SET_ITEMS",e.data.items),t(e)})).catch((function(t){i(t)}))}))},traerItem:function(t,e){return i(t),new Promise((function(t,a){n.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){a(t)}))}))},borrarItem:function(t,e){var a=t.commit;return new Promise((function(t,i){n.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(n){a("REMOVE_RECORD",e.Id),t(n)})).catch((function(t){i(t)}))}))},borrarMasivoItem:function(t,e){var a=t.commit;return new Promise((function(t,i){n.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(n){a("REMOVE_MASSIVE_RECORD",e.Items),t(n)})).catch((function(t){i(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var a=t.items.findIndex((function(t){return t.id==e}));t.items.splice(a,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var a=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(a,1)}))}},actions:o,getters:{}}},"8+4t":function(t,e,a){(t.exports=a("I1BE")(!1)).push([t.i,"#avatar-col {\n  width: 10rem;\n}\n#page-item-view table {\n  /* &:not(.permissions-table) {\n     td {\n       @media screen and (max-width:370px) {\n         display: block;\n       }\n     }\n   }*/\n}\n#page-item-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  word-break: break-all;\n}\n[dir] #page-item-view table td {\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}",""])},N3R4:function(t,e,a){"use strict";var n=a("uDIh");a.n(n).a},OneU:function(t,e,a){"use strict";a.r(e);var n=a("bJaO"),i=a("6wlp"),o={data:function(){return{item_data:null,item_data_documents:null,item_not_found:!1,urlApi:"/driver/driver/"}},computed:{},methods:{downloadDocument:function(t,e){var a=this;n.a.get("/api/v1/driver/driver/document/"+t,{responseType:"blob"}).then((function(t){var a=document.createElement("a"),n=window.URL.createObjectURL(t.data);a.href=n,a.download=e,document.body.append(a),a.click(),a.remove(),window.URL.revokeObjectURL(n)})).catch((function(t){var e=300==t.response.status?t.response.data.message:t;a.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},getStatusDocs:function(t){var e=new Date,a=new Date(t);return a.getTime()>=e.getTime()?"success":(a.getTime(),e.getTime(),"danger")},confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:'Este seguro que desea eliminar el siguiente conductor "'.concat(this.item_data.name,'"'),accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var t=this;this.$store.dispatch("itemManagement/borrarItem",{Id:this.item_data.id,Url:this.urlApi}).then((function(){t.$router.push({name:"conductores"}),t.showDeleteSuccess()})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Conductor Eliminado",text:"El conductor seleccionado ya fue eliminado"})}},created:function(){var t=this;i.a.isRegistered||(this.$store.registerModule("itemManagement",i.a),i.a.isRegistered=!0);var e=this.$route.params.itemId,a=this.urlApi;this.$store.dispatch("itemManagement/traerItem",{Id:e,Url:a}).then((function(e){t.item_data=e.data.item[0],t.item_data_documents=e.data.documents})).catch((function(e){404!==e.response.status?300==e.response.status?t.$vs.notify({title:"Error",text:e.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},s=(a("N3R4"),a("KHd+")),r=Object(s.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"page-item-view"}},[a("vs-alert",{attrs:{color:"danger",title:"Conductor no encontrado",active:t.item_not_found},on:{"update:active":function(e){t.item_not_found=e}}},[a("span",[t._v("El conductor con id: "+t._s(t.$route.params.itemId)+" no fue encontrado. ")]),t._v(" "),a("span",[a("span",[t._v("Mira ")]),a("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"conductores"}}},[t._v("Todos los conductores")])],1)]),t._v(" "),t.item_data?a("div",{attrs:{id:"item-data"}},[a("vx-card",{staticClass:"mb-base",attrs:{title:"Detalle"}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-1"}},[a("table",[a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Nombre")]),t._v(" "),a("td",[t._v(t._s(t.item_data.name)+" ")])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Apellido")]),t._v(" "),a("td",[t._v(t._s(t.item_data.lastname))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Rut")]),t._v(" "),a("td",[t._v(t._s(t.item_data.rut))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Email")]),t._v(" "),a("td",[t._v(t._s(t.item_data.email))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Telefono")]),t._v(" "),a("td",[t._v(t._s(t.item_data.telefono))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Licencias")]),t._v(" "),a("td",[t._v(t._s(t.item_data.clase))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("N° Movil")]),t._v(" "),a("td",[t._v(t._s(t.item_data.numero_movil))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Creado el")]),t._v(" "),a("td",[t._v(t._s(t.item_data.created_at))])])])]),t._v(" "),a("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-2"}},[a("table",[a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Ciudad")]),t._v(" "),a("td",[t._v(t._s(t.item_data.ciudad))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Comuna")]),t._v(" "),a("td",[t._v(t._s(t.item_data.comuna))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Direccion")]),t._v(" "),a("td",[t._v(t._s(t.item_data.direccion))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Numeracion")]),t._v(" "),a("td",[t._v(t._s(t.item_data.numeracion))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Habilitado")]),t._v(" "),a("td",[t._v(t._s(1===t.item_data.habilitado?"Si":"No"))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Asociado")]),t._v(" "),a("td",[t._v(t._s(t.item_data.second_name)+" "+t._s(t.item_data.second_lastname))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Conductor por defecto?")]),t._v(" "),a("td",[t._v(t._s(1===t.item_data.driver_default?"Si":"No"))])]),t._v(" "),a("tr",[a("td",{staticClass:"font-semibold"},[t._v("Ultima Actualizacion")]),t._v(" "),a("td",[t._v(t._s(t.item_data.updated_at))])])])])])]),t._v(" "),a("vx-card",{staticClass:"mb-base",attrs:{title:"Documentos",collapseAction:""}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"flex items-end px-3"},[a("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"FileIcon"}}),t._v(" "),a("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),a("vs-divider")],1)]),t._v(" "),a("div",{staticClass:"block overflow-x-auto"},[a("vs-table",{attrs:{"max-items":"4",pagination:"",data:t.item_data_documents},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.data;return t._l(n,(function(e,i){return a("vs-tr",{key:i},[a("vs-td",{attrs:{colspan:"2"}},[t._v("\n                      "+t._s(e.name.split(/[.,\/-]/)[1])+"\n                    ")]),t._v(" "),a("vs-td",[a("vs-chip",{attrs:{color:t.getStatusDocs(e.fecha_vencimiento)}},[t._v(t._s(e.fecha_vencimiento))])],1),t._v(" "),a("vs-td",{attrs:{data:n[i].url}},[a("a",{staticStyle:{cursor:"pointer"},attrs:{rel:"nofollow"},on:{click:function(e){return t.downloadDocument(n[i].id,n[i].name)}}},[t._v("Descargar")])])],1)}))}}],null,!1,3612295370)},[a("template",{slot:"header"}),t._v(" "),a("template",{slot:"thead"},[a("vs-th",{attrs:{colspan:"2"}},[t._v("\n                     Documento\n                  ")]),t._v(" "),a("vs-th",[t._v("\n                     Vencimiento\n                  ")]),t._v(" "),a("vs-th",[t._v("\n                    Descarga\n                  ")])],1)],2)],1)]),t._v(" "),a("div",{staticClass:"vx-col w-full flex mt-4",attrs:{id:"account-manage-buttons"}},[a("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[a("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit",to:{name:"conductores-edit",params:{itemId:t.$route.params.itemId}}}},[t._v("Editar")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[a("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"conductores"}}},[t._v("Volver")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[a("vs-button",{attrs:{type:"border",color:"danger","icon-pack":"feather",icon:"icon-trash"},on:{click:t.confirmDeleteRecord}},[t._v("Eliminar")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=r.exports},uDIh:function(t,e,a){var n=a("8+4t");"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(n,i);n.locals&&(t.exports=n.locals)}}]);