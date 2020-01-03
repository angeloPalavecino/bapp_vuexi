(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"/23w":function(t,e,n){"use strict";var i=n("qTQN");n.n(i).a},"6wlp":function(t,e,n){"use strict";var i=n("bJaO");function a(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var o={agregarItem:function(t,e){return a(t),new Promise((function(t,n){i.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){n(t)}))}))},editarItem:function(t,e){return a(t),new Promise((function(t,n){i.a.put("/api/v1"+e.Url+e.item.id,e.item).then((function(e){t(e)})).catch((function(t){n(t)}))}))},traerItems:function(t,e){var n=t.commit;return new Promise((function(t,a){i.a.get("/api/v1"+e).then((function(e){n("SET_ITEMS",e.data.items),t(e)})).catch((function(t){a(t)}))}))},traerItem:function(t,e){return a(t),new Promise((function(t,n){i.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){n(t)}))}))},borrarItem:function(t,e){var n=t.commit;return new Promise((function(t,a){i.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(i){n("REMOVE_RECORD",e.Id),t(i)})).catch((function(t){a(t)}))}))},borrarMasivoItem:function(t,e){var n=t.commit;return new Promise((function(t,a){i.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(i){n("REMOVE_MASSIVE_RECORD",e.Items),t(i)})).catch((function(t){a(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var n=t.items.findIndex((function(t){return t.id==e}));t.items.splice(n,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var n=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(n,1)}))}},actions:o,getters:{}}},KVhi:function(t,e,n){(t.exports=n("I1BE")(!1)).push([t.i,"#avatar-col {\n  width: 10rem;\n}\n#page-item-view table {\n  /* &:not(.permissions-table) {\n     td {\n       @media screen and (max-width:370px) {\n         display: block;\n       }\n     }\n   }*/\n}\n#page-item-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  word-break: break-all;\n}\n[dir] #page-item-view table td {\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}",""])},SfJz:function(t,e,n){"use strict";n.r(e);n("bJaO");var i=n("6wlp"),a={data:function(){return{item_data:null,item_not_found:!1,urlApi:"/observaciones/observaciones/"}},computed:{},methods:{confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:'Este seguro que desea eliminar la siguiente observacion "'.concat(this.item_data.descripcion,'"'),accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var t=this;this.$store.dispatch("itemManagement/borrarItem",{Id:this.item_data.id,Url:this.urlApi}).then((function(){t.$router.push({name:"observaciones"}),t.showDeleteSuccess()})).catch((function(e){var n=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:n,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Observacion Eliminada",text:"La observacion seleccionado ya fue eliminado"})}},mounted:function(){},created:function(){var t=this;i.a.isRegistered||(this.$store.registerModule("itemManagement",i.a),i.a.isRegistered=!0);var e=this.$route.params.itemId,n=this.urlApi;this.$store.dispatch("itemManagement/traerItem",{Id:e,Url:n}).then((function(e){t.item_data=e.data.item})).catch((function(e){404!==e.response.status?300==e.response.status?t.$vs.notify({title:"Error",text:e.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},o=(n("/23w"),n("KHd+")),r=Object(o.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"page-item-view"}},[n("vs-alert",{attrs:{color:"danger",title:"Observacion no encontrado",active:t.item_not_found},on:{"update:active":function(e){t.item_not_found=e}}},[n("span",[t._v("La observacion con id: "+t._s(t.$route.params.itemId)+" no fue encontrado. ")]),t._v(" "),n("span",[n("span",[t._v("Mira ")]),n("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"observaciones"}}},[t._v("Todas las observaciones")])],1)]),t._v(" "),t.item_data?n("div",{attrs:{id:"item-data"}},[n("vx-card",{staticClass:"mb-base",attrs:{title:"Detalle"}},[n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-1"}},[n("table",[n("tr",[n("td",{staticClass:"font-semibold"},[t._v("Descripcion")]),t._v(" "),n("td",[t._v(t._s(t.item_data.descripcion)+" ")])]),t._v(" "),n("tr",[n("td",{staticClass:"font-semibold"},[t._v("Creado el")]),t._v(" "),n("td",[t._v(t._s(t.item_data.created_at))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-semibold"},[t._v("Ultima Actualizacion")]),t._v(" "),n("td",[t._v(t._s(t.item_data.updated_at))])])])])])]),t._v(" "),n("div",{staticClass:"vx-col w-full flex mt-4",attrs:{id:"account-manage-buttons"}},[n("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[n("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit",to:{name:"observaciones-edit",params:{itemId:t.$route.params.itemId}}}},[t._v("Editar")])],1),t._v(" "),n("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[n("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"observaciones"}}},[t._v("Volver")])],1),t._v(" "),n("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[n("vs-button",{attrs:{type:"border",color:"danger","icon-pack":"feather",icon:"icon-trash"},on:{click:t.confirmDeleteRecord}},[t._v("Eliminar")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=r.exports},qTQN:function(t,e,n){var i=n("KVhi");"string"==typeof i&&(i=[[t.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,a);i.locals&&(t.exports=i.locals)}}]);