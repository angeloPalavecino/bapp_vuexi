(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{"6wlp":function(a,t,e){"use strict";var r=e("bJaO");function i(a){if(null==a)throw new TypeError("Cannot destructure undefined")}var o={agregarItem:function(a,t){return i(a),new Promise((function(a,e){r.a.post("/api/v1"+t.Url+"store",t.item).then((function(t){a(t)})).catch((function(a){e(a)}))}))},editarItem:function(a,t){return i(a),new Promise((function(a,e){var i="";i=t.item.id?t.Url+t.item.id:t.Url,r.a.put("/api/v1"+i,t.item).then((function(t){a(t)})).catch((function(a){e(a)}))}))},traerItems:function(a,t){var e=a.commit;return new Promise((function(a,i){r.a.get("/api/v1"+t).then((function(t){e("SET_ITEMS",t.data.items),a(t)})).catch((function(a){i(a)}))}))},traerItem:function(a,t){return i(a),new Promise((function(a,e){r.a.get("/api/v1"+t.Url+"".concat(t.Id)).then((function(t){a(t)})).catch((function(a){e(a)}))}))},borrarItem:function(a,t){var e=a.commit;return new Promise((function(a,i){r.a.delete("/api/v1"+t.Url+"".concat(t.Id)).then((function(r){e("REMOVE_RECORD",t.Id),a(r)})).catch((function(a){i(a)}))}))},borrarMasivoItem:function(a,t){var e=a.commit;return new Promise((function(a,i){r.a.post("/api/v1"+t.Url+"borrar",t.Items).then((function(r){e("REMOVE_MASSIVE_RECORD",t.Items),a(r)})).catch((function(a){i(a)}))}))}};t.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(a,t){a.items=t},REMOVE_RECORD:function(a,t){var e=a.items.findIndex((function(a){return a.id==t}));a.items.splice(e,1)},REMOVE_MASSIVE_RECORD:function(a,t){t.forEach((function(t){var e=a.items.findIndex((function(a){return a.id==t.id}));a.items.splice(e,1)}))}},actions:o,getters:{}}},FIRa:function(a,t,e){"use strict";e.r(t);var r=e("Snq/"),i=e.n(r),o=e("bJaO");e("e7F3").a.localize("en",{custom:{tipo:{required:"El tipo es requerido"},marca:{required:"La marca es requerida"},modelo:{required:"El modelo es requerido"},ano:{required:"El año es requerido",numeric:"El año debe ser numerico"},motor:{required:"El motor es requerido",numeric:"El n° de motor debe ser numerico"},patente:{required:"La patente es requerida"},color:{required:"El color es requerido"},asientos:{required:"Los asientos son requerido"},numero_movil:{required:"Los asientos son requerido",numeric:"El n° de movil debe ser numerico"},asociados:{required:"El asociado es requerido"},empresas:{required:"La empresa es requerida"}}});var s={components:{vSelect:i.a},props:{data:{type:Object,required:!0}},data:function(){return{urlApi:"/car/car/",data_local:{empresa_id:this.data.empresa_id?this.data.empresa_id:null,tipo:this.data.tipo?this.data.tipo:null,marca:this.data.marca?this.data.marca:null,modelo:this.data.modelo?this.data.modelo:null,ano:this.data.ano?this.data.ano:null,habilitado:this.data.habilitado,motor:this.data.motor?this.data.motor:null,patente:this.data.patente?this.data.patente:null,color:this.data.color?this.data.color:null,asientos:this.data.asientos?this.data.asientos:1,numero_movil:this.data.numero_movil?this.data.numero_movil:null,id:this.data.id?this.data.id:null,driver_id:this.data.driver_id?this.data.driver_id:null},empresasOptions:[],asociadosOptions:[]}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){},methods:{save_changes:function(){var a=this;this.$validator.validateAll().then((function(t){t&&a.$store.dispatch("itemManagement/editarItem",{item:a.data_local,Url:a.urlApi}).then((function(){a.$router.push({name:"moviles"}),a.showDeleteSuccess()})).catch((function(t){var e=300==t.response.status?t.response.data.message:t;a.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={empresa_id:this.data.empresa_id?this.data.empresa_id:null,tipo:this.data.tipo?this.data.tipo:null,marca:this.data.marca?this.data.marca:null,modelo:this.data.modelo?this.data.modelo:null,ano:this.data.ano?this.data.ano:null,habilitado:this.data.habilitado,motor:this.data.motor?this.data.motor:null,patente:this.data.patente?this.data.patente:null,color:this.data.color?this.data.color:null,asientos:this.data.asientos?this.data.asientos:1,numero_movil:this.data.numero_movil?this.data.numero_movil:null,id:this.data.id?this.data.id:null,driver_id:this.data.driver_id?this.data.driver_id:null},this.errors.clear()},traeOtrosDatos:function(){var a=this;o.a.get("/api/v1/empresas/listemp/").then((function(t){a.empresasOptions=t.data.items})).catch((function(t){var e=300==t.response.status?t.response.data.message:t;a.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),o.a.get("/api/v1/asociado/asociado/").then((function(t){a.asociadosOptions=t.data.items})).catch((function(t){var e=300==t.response.status?t.response.data.message:t;a.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},created:function(){this.traeOtrosDatos()}},l=e("KHd+"),n=Object(l.a)(s,(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"item-edit"}},[e("div",{staticClass:"vx-row mt-6"},[e("vs-divider",{attrs:{color:"primary"}},[e("h5",[a._v("Datos Movil")])]),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Empresas",name:"empresas",dir:a.$vs.rtl?"rtl":"ltr",danger:!!a.errors.first("empresas"),"danger-text":a.errors.first("empresas")?a.errors.first("empresas"):""},model:{value:a.data_local.empresa_id,callback:function(t){a.$set(a.data_local,"empresa_id",t)},expression:"data_local.empresa_id"}},a._l(a.empresasOptions,(function(a){return e("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.razon_social}})})),1)],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Asociados",name:"asociados",dir:a.$vs.rtl?"rtl":"ltr",danger:!!a.errors.first("asociados"),"danger-text":a.errors.first("asociados")?a.errors.first("asociados"):""},model:{value:a.data_local.driver_id,callback:function(t){a.$set(a.data_local,"driver_id",t)},expression:"data_local.driver_id"}},a._l(a.asociadosOptions,(function(a){return e("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.name}})})),1)],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"N° Movil",name:"numero_movil",danger:!!a.errors.first("numero_movil"),"danger-text":a.errors.first("numero_movil")?a.errors.first("numero_movil"):"","val-icon-danger":"clear"},model:{value:a.data_local.numero_movil,callback:function(t){a.$set(a.data_local,"numero_movil",t)},expression:"data_local.numero_movil"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Tipo",name:"tipo",danger:!!a.errors.first("tipo"),"danger-text":a.errors.first("tipo")?a.errors.first("tipo"):"","val-icon-danger":"clear"},model:{value:a.data_local.tipo,callback:function(t){a.$set(a.data_local,"tipo",t)},expression:"data_local.tipo"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Marca",name:"marca",danger:!!a.errors.first("marca"),"danger-text":a.errors.first("marca")?a.errors.first("marca"):"","val-icon-danger":"clear"},model:{value:a.data_local.marca,callback:function(t){a.$set(a.data_local,"marca",t)},expression:"data_local.marca"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Modelo",name:"modelo",danger:!!a.errors.first("modelo"),"danger-text":a.errors.first("modelo")?a.errors.first("modelo"):"","val-icon-danger":"clear"},model:{value:a.data_local.modelo,callback:function(t){a.$set(a.data_local,"modelo",t)},expression:"data_local.modelo"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Año",name:"ano",danger:!!a.errors.first("ano"),"danger-text":a.errors.first("ano")?a.errors.first("ano"):"","val-icon-danger":"clear"},model:{value:a.data_local.ano,callback:function(t){a.$set(a.data_local,"ano",t)},expression:"data_local.ano"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"N° Motor",name:"motor",danger:!!a.errors.first("motor"),"danger-text":a.errors.first("motor")?a.errors.first("motor"):"","val-icon-danger":"clear"},model:{value:a.data_local.motor,callback:function(t){a.$set(a.data_local,"motor",t)},expression:"data_local.motor"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Patente",name:"patente",danger:!!a.errors.first("patente"),"danger-text":a.errors.first("patente")?a.errors.first("patente"):"","val-icon-danger":"clear"},model:{value:a.data_local.patente,callback:function(t){a.$set(a.data_local,"patente",t)},expression:"data_local.patente"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Color",name:"color",danger:!!a.errors.first("color"),"danger-text":a.errors.first("color")?a.errors.first("color"):"","val-icon-danger":"clear"},model:{value:a.data_local.color,callback:function(t){a.$set(a.data_local,"color",t)},expression:"data_local.color"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("span",{staticClass:" text-sm"},[a._v("N° Asientos")]),a._v(" "),e("vs-input-number",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"asientos",min:"1","icon-inc":"expand_less","icon-dec":"expand_more"},model:{value:a.data_local.asientos,callback:function(t){a.$set(a.data_local,"asientos",t)},expression:"data_local.asientos"}})],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("label",{staticClass:"vs-input--label "},[a._v("Habilitado")]),a._v(" "),e("br"),a._v(" "),e("vs-switch",{staticClass:"mt-2",model:{value:a.data_local.habilitado,callback:function(t){a.$set(a.data_local,"habilitado",t)},expression:"data_local.habilitado"}})],1)],1),a._v(" "),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col w-full"},[e("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[e("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[e("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!a.validateForm},on:{click:a.save_changes}},[a._v("Guardar Cambios")])],1),a._v(" "),e("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[e("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"moviles"}}},[a._v("Volver")])],1),a._v(" "),e("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[e("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:a.reset_data}},[a._v("Limpiar")])],1)],1)])])])}),[],!1,null,null,null).exports,d=e("6wlp"),c={components:{itemEditSection1:n},data:function(){return{item_data:null,item_not_found:!1,urlApi:"/car/car/"}},watch:{activeTab:function(){this.fetch_item_data(this.$route.params.itemId)}},methods:{fetch_item_data:function(a){var t=this;this.$store.dispatch("itemManagement/traerItem",{Id:a,Url:this.urlApi}).then((function(a){t.item_data=a.data.item[0]})).catch((function(a){404!==a.response.status?300==a.response.status?t.$vs.notify({title:"Error",text:a.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},created:function(){d.a.isRegistered||(this.$store.registerModule("itemManagement",d.a),d.a.isRegistered=!0),this.fetch_item_data(this.$route.params.itemId)}},u=Object(l.a)(c,(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"page-item-edit"}},[e("vs-alert",{attrs:{color:"danger",title:"Movil no encontrado",active:a.item_not_found},on:{"update:active":function(t){a.item_not_found=t}}},[e("span",[a._v("El movil con id: "+a._s(a.$route.params.itemId)+" no fue encontrado. ")]),a._v(" "),e("span",[e("span",[a._v("Mira  ")]),e("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"moviles"}}},[a._v("Todos los moviles")])],1)]),a._v(" "),a.item_data?e("vx-card",[e("item-edit-section1",{staticClass:"mt-4",attrs:{data:a.item_data}})],1):a._e()],1)}),[],!1,null,null,null);t.default=u.exports}}]);