(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"6r6H":function(t,a,e){"use strict";e.r(a);e("bJaO");var n=e("6wlp"),i={props:{data_mapa:Array,data_sucursales:Array},data:function(){return{center:{lat:-33.4573876,lng:-70.6440017},bounds:null}},methods:{poligono:function(t){var a=new google.maps.LatLngBounds;this.data_mapa.forEach((function(e,n){for(var i=e.lat.split(","),s=e.lng.split(","),o=e.color,r=e.codigo,c=[],l=0;l<i.length;l++){var d=parseFloat(i[l]),u=parseFloat(s[l]);c[l]=new google.maps.LatLng(d.toFixed(5),u.toFixed(5)),a.extend(c[l])}new google.maps.Polygon({paths:c,fillColor:o,fillOpacity:.1,strokeWeight:.8,clickable:!1,zIndex:1,editable:!1,infoText:r,title:r}).setMap(t)})),this.bounds=a},sucursales:function(t){var a=this;this.data_sucursales.forEach((function(n,i){var s=parseFloat(n.lat),o=parseFloat(n.lng),r=n.nombre;a.bounds.extend(new google.maps.LatLng(s.toFixed(5),o.toFixed(5))),new google.maps.Marker({position:{lat:s,lng:o},infoText:r,title:r,draggable:!1,animation:google.maps.Animation.DROP,icon:{url:e("Ymv7")}}).setMap(t)})),t.fitBounds(a.bounds)}},created:function(){},mounted:function(){var t=this;this.$refs.map.$mapPromise.then((function(a){t.poligono(a),t.sucursales(a)}))}},s=e("KHd+"),o={components:{GoogleMapBasic:Object(s.a)(i,(function(){var t=this.$createElement,a=this._self._c||t;return a("vx-card",{staticClass:"mb-base",attrs:{title:"Mapa",collapseAction:""}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"flex items-end px-3"},[a("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"MapIcon"}}),this._v(" "),a("span",{staticClass:"font-medium text-lg leading-none"},[this._v("Detalle")])],1),this._v(" "),a("vs-divider")],1)]),this._v(" "),a("div",{staticClass:"block overflow-x-auto"},[a("GmapMap",{ref:"map",staticStyle:{width:"100%",height:"400px"},attrs:{center:this.center,zoom:11,"map-type-id":"roadmap",id:"map"}})],1)])}),[],!1,null,null,null).exports},data:function(){return{item_data:null,item_data_patrones:null,item_data_sucursales:null,item_not_found:!1,urlApi:"/patrones/grupos/"}},computed:{},methods:{confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirmar Eliminacion",text:'Este seguro que desea eliminar el siguiente grupo de patrones "'.concat(this.item_data.codigo,'"'),accept:this.deleteRecord,acceptText:"Eliminar"})},deleteRecord:function(){var t=this;this.$store.dispatch("itemManagement/borrarItem",{Id:this.item_data.id,Url:this.urlApi}).then((function(){t.$router.push({name:"gpatrones"}),t.showDeleteSuccess()})).catch((function(a){var e=300==a.response.status?a.response.data.message:a;t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Grupo Eliminado",text:"El grupo de patrones seleccionado ya fue eliminada"})}},mounted:function(){},created:function(){var t=this;n.a.isRegistered||(this.$store.registerModule("itemManagement",n.a),n.a.isRegistered=!0);var a=this.$route.params.itemId,e=this.urlApi;this.$store.dispatch("itemManagement/traerItem",{Id:a,Url:e}).then((function(a){t.item_data=a.data.item[0],t.item_data_patrones=a.data.patrones,t.item_data_sucursales=a.data.sucursales})).catch((function(a){404!==a.response.status?300==a.response.status?t.$vs.notify({title:"Error",text:a.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},r=(e("pKvE"),Object(s.a)(o,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"page-item-view"}},[e("vs-alert",{attrs:{color:"danger",title:"Grupo de patrones no encontrada",active:t.item_not_found},on:{"update:active":function(a){t.item_not_found=a}}},[e("span",[t._v("El grupo de patrones con id: "+t._s(t.$route.params.itemId)+" no fue encontrada. ")]),t._v(" "),e("span",[e("span",[t._v("Mira ")]),e("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"gpatrones"}}},[t._v("Todas los grupos de patrones")])],1)]),t._v(" "),t.item_data?e("div",{attrs:{id:"item-data"}},[e("vx-card",{staticClass:"mb-base",attrs:{title:"Informacion"}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col w-full"},[e("div",{staticClass:"flex items-end px-3"},[e("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"InfoIcon"}}),t._v(" "),e("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),e("vs-divider")],1)]),t._v(" "),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-1"}},[e("table",[e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Codigo")]),t._v(" "),e("td",[t._v(t._s(t.item_data.codigo)+" ")])]),t._v(" "),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Fuera de zona")]),t._v(" "),e("td",[t._v("Fuera de zona "+t._s(t.item_data.fuerazona))])]),t._v(" "),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Creado el")]),t._v(" "),e("td",[t._v(t._s(t.item_data.created_at))])])])]),t._v(" "),e("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-2"}},[e("table",[e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Descripcion")]),t._v(" "),e("td",[t._v(t._s(t.item_data.descripcion))])]),t._v(" "),e("tr",[e("td",{staticClass:"font-semibold"},[t._v(" ")]),t._v(" "),e("td",[t._v(" ")])]),t._v(" "),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Ultima Actualizacion")]),t._v(" "),e("td",[t._v(t._s(t.item_data.updated_at))])])])])])]),t._v(" "),e("vx-card",{staticClass:"mb-base",attrs:{title:"Sucursales",collapseAction:""}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col w-full"},[e("div",{staticClass:"flex items-end px-3"},[e("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"HomeIcon"}}),t._v(" "),e("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),e("vs-divider")],1)]),t._v(" "),e("div",{staticClass:"block overflow-x-auto mt-4"},[e("vs-table",{attrs:{"max-items":"4",pagination:"",data:t.item_data_sucursales},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.data;return t._l(n,(function(a,n){return e("vs-tr",{key:n},[e("vs-td",{attrs:{colspan:"2"}},[t._v("\n                    "+t._s(a.nombre)+"\n                    ")]),t._v(" "),e("vs-td",[t._v("\n                      "+t._s(a.direccion)+"\n                   ")]),t._v(" "),e("vs-td",[t._v("\n                     "+t._s(1==a.matriz?"Si":"No")+"\n                   ")])],1)}))}}],null,!1,279050758)},[e("template",{slot:"header"},[e("h2",{staticClass:"mb-4"},[t._v(" Empresa : "+t._s(t.item_data_sucursales[0].razon_social))])]),t._v(" "),e("template",{slot:"thead"},[e("vs-th",{attrs:{colspan:"2"}},[t._v("\n                     Nombre\n                  ")]),t._v(" "),e("vs-th",[t._v("\n                    Direccion\n                  ")]),t._v(" "),e("vs-th",[t._v("\n                    Matriz\n                  ")])],1)],2)],1)]),t._v(" "),e("google-map-basic",{attrs:{data_mapa:t.item_data_patrones,data_sucursales:t.item_data_sucursales}}),t._v(" "),e("div",{staticClass:"vx-col w-full flex mt-4",attrs:{id:"account-manage-buttons"}},[e("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[e("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit",to:{name:"gpatrones-edit",params:{itemId:t.$route.params.itemId}}}},[t._v("Editar")])],1),t._v(" "),e("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[e("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"gpatrones"}}},[t._v("Volver")])],1),t._v(" "),e("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[e("vs-button",{attrs:{type:"border",color:"danger","icon-pack":"feather",icon:"icon-trash"},on:{click:t.confirmDeleteRecord}},[t._v("Eliminar")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null));a.default=r.exports},"6wlp":function(t,a,e){"use strict";var n=e("bJaO");function i(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var s={agregarItem:function(t,a){return i(t),new Promise((function(t,e){n.a.post("/api/v1"+a.Url+"store",a.item).then((function(a){t(a)})).catch((function(t){e(t)}))}))},editarItem:function(t,a){return i(t),new Promise((function(t,e){var i="";i=a.item.id?a.Url+a.item.id:a.Url,n.a.put("/api/v1"+i,a.item).then((function(a){t(a)})).catch((function(t){e(t)}))}))},traerItems:function(t,a){var e=t.commit;return new Promise((function(t,i){n.a.get("/api/v1"+a).then((function(a){e("SET_ITEMS",a.data.items),t(a)})).catch((function(t){i(t)}))}))},traerItem:function(t,a){return i(t),new Promise((function(t,e){n.a.get("/api/v1"+a.Url+"".concat(a.Id)).then((function(a){t(a)})).catch((function(t){e(t)}))}))},borrarItem:function(t,a){var e=t.commit;return new Promise((function(t,i){n.a.delete("/api/v1"+a.Url+"".concat(a.Id)).then((function(n){e("REMOVE_RECORD",a.Id),t(n)})).catch((function(t){i(t)}))}))},borrarMasivoItem:function(t,a){var e=t.commit;return new Promise((function(t,i){n.a.post("/api/v1"+a.Url+"borrar",a.Items).then((function(n){e("REMOVE_MASSIVE_RECORD",a.Items),t(n)})).catch((function(t){i(t)}))}))}};a.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,a){t.items=a},REMOVE_RECORD:function(t,a){var e=t.items.findIndex((function(t){return t.id==a}));t.items.splice(e,1)},REMOVE_MASSIVE_RECORD:function(t,a){a.forEach((function(a){var e=t.items.findIndex((function(t){return t.id==a.id}));t.items.splice(e,1)}))}},actions:s,getters:{}}},DrKm:function(t,a,e){var n=e("LK2W");"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e("aET+")(n,i);n.locals&&(t.exports=n.locals)},LK2W:function(t,a,e){(t.exports=e("I1BE")(!1)).push([t.i,"#avatar-col {\n  width: 10rem;\n}\n#page-item-view table {\n  /* &:not(.permissions-table) {\n     td {\n       @media screen and (max-width:370px) {\n         display: block;\n       }\n     }\n   }*/\n}\n#page-item-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  word-break: break-all;\n}\n[dir] #page-item-view table td {\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}",""])},Ymv7:function(t,a){t.exports="/demo/vuexy-vuejs-laravel-admin-template/demo-1/images/sucursal7.png?b150aec62809e814bc49429efb22a978"},pKvE:function(t,a,e){"use strict";var n=e("DrKm");e.n(n).a}}]);