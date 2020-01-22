(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"6wlp":function(a,e,r){"use strict";var t=r("bJaO");function s(a){if(null==a)throw new TypeError("Cannot destructure undefined")}var i={agregarItem:function(a,e){return s(a),new Promise((function(a,r){t.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){a(e)})).catch((function(a){r(a)}))}))},editarItem:function(a,e){return s(a),new Promise((function(a,r){var s="";s=e.item.id?e.Url+e.item.id:e.Url,t.a.put("/api/v1"+s,e.item).then((function(e){a(e)})).catch((function(a){r(a)}))}))},traerItems:function(a,e){var r=a.commit;return new Promise((function(a,s){t.a.get("/api/v1"+e).then((function(e){r("SET_ITEMS",e.data.items),a(e)})).catch((function(a){s(a)}))}))},traerItem:function(a,e){return s(a),new Promise((function(a,r){t.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){a(e)})).catch((function(a){r(a)}))}))},borrarItem:function(a,e){var r=a.commit;return new Promise((function(a,s){t.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(t){r("REMOVE_RECORD",e.Id),a(t)})).catch((function(a){s(a)}))}))},borrarMasivoItem:function(a,e){var r=a.commit;return new Promise((function(a,s){t.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(t){r("REMOVE_MASSIVE_RECORD",e.Items),a(t)})).catch((function(a){s(a)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(a,e){a.items=e},REMOVE_RECORD:function(a,e){var r=a.items.findIndex((function(a){return a.id==e}));a.items.splice(r,1)},REMOVE_MASSIVE_RECORD:function(a,e){e.forEach((function(e){var r=a.items.findIndex((function(a){return a.id==e.id}));a.items.splice(r,1)}))}},actions:i,getters:{}}},EkRj:function(a,e,r){"use strict";r.r(e);var t=r("Snq/"),s=r.n(t),i=r("bJaO");r("e7F3").a.localize("en",{custom:{empresas:{required:"La empresa es requerida"},num_psj_min:{required:"El campo es requerido"},num_psj_max:{required:"El campo es requerido"},fac_rang_min:{required:"El campo es requerido",decimal:"El valor debe ser numerico"},fac_rang_max:{required:"El campo es requerido",decimal:"El valor debe ser numerico"},valor:{required:"El campo es requerido",decimal:"El valor debe ser numerico"},fac_rang_fz1:{required:"El campo es requerido",decimal:"El valor debe ser numerico"},valor_fz1:{required:"El campo es requerido",decimal:"El valor debe ser numerico"},fac_rang_fz2:{required:"El campo es requerido",decimal:"El valor debe ser numerico"},valor_fz2:{required:"El campo es requerido",decimal:"El valor debe ser numerico"}}});var n={components:{vSelect:s.a},props:{},data:function(){return{urlApi:"/tarifas/pasajeros/",data_local:{num_psj_min:1,num_psj_max:1},empresasOptions:[]}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){},methods:{save_changes:function(){var a=this;this.$validator.validateAll().then((function(e){e&&a.$store.dispatch("itemManagement/agregarItem",{item:a.data_local,Url:a.urlApi}).then((function(){a.$router.push({name:"pasajeros"}),a.showDeleteSuccess()})).catch((function(e){var r=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:r,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={num_psj_min:1,num_psj_max:1},this.errors.clear()},traeOtrosDatos:function(){var a=this;i.a.get("/api/v1/empresas/empresas").then((function(e){a.empresasOptions=e.data.items})).catch((function(e){var r=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:r,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},created:function(){this.traeOtrosDatos()}},l=(r("ZGv/"),r("KHd+")),o=Object(l.a)(n,(function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{attrs:{id:"item-add"}},[r("div",{staticClass:"vx-row mt-6"},[r("vs-divider",{attrs:{color:"primary"}},[r("h5",[a._v("Datos Tarifa")])]),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full ",attrs:{label:"Empresas",name:"empresas",dir:a.$vs.rtl?"rtl":"ltr",danger:!!a.errors.first("empresas"),"danger-text":a.errors.first("empresas")?a.errors.first("empresas"):""},model:{value:a.data_local.empresa_id,callback:function(e){a.$set(a.data_local,"empresa_id",e)},expression:"data_local.empresa_id"}},a._l(a.empresasOptions,(function(a){return r("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.razon_social}})})),1)],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"}),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-4"},[r("span",{staticClass:" text-sm"},[a._v("N° Pasajeros Min.")]),a._v(" "),r("vs-input-number",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{name:"num_psj_min",min:"1","icon-inc":"expand_less","icon-dec":"expand_more"},model:{value:a.data_local.num_psj_min,callback:function(e){a.$set(a.data_local,"num_psj_min",e)},expression:"data_local.num_psj_min"}}),a._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("num_psj_min"),expression:"errors.has('num_psj_min')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("num_psj_min")))])],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-4"},[r("span",{staticClass:" text-sm"},[a._v("N° Pasajeros Max.")]),a._v(" "),r("vs-input-number",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{name:"num_psj_max",min:"1","icon-inc":"expand_less","icon-dec":"expand_more"},model:{value:a.data_local.num_psj_max,callback:function(e){a.$set(a.data_local,"num_psj_max",e)},expression:"data_local.num_psj_max"}}),a._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("num_psj_max"),expression:"errors.has('num_psj_max')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("num_psj_max")))])],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal",expression:"'required|decimal'"}],staticClass:"w-full",attrs:{"label-placeholder":"Factor Rango Min.",name:"fac_rang_min",danger:!!a.errors.first("fac_rang_min"),"danger-text":a.errors.first("fac_rang_min")?a.errors.first("fac_rang_min"):"","val-icon-danger":"clear"},model:{value:a.data_local.fac_rang_min,callback:function(e){a.$set(a.data_local,"fac_rang_min",e)},expression:"data_local.fac_rang_min"}})],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal",expression:"'required|decimal'"}],staticClass:"w-full",attrs:{"label-placeholder":"Factor Rango Max.",name:"fac_rang_max",danger:!!a.errors.first("fac_rang_max"),"danger-text":a.errors.first("fac_rang_max")?a.errors.first("fac_rang_max"):"","val-icon-danger":"clear"},model:{value:a.data_local.fac_rang_max,callback:function(e){a.$set(a.data_local,"fac_rang_max",e)},expression:"data_local.fac_rang_max"}})],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal",expression:"'required|decimal'"}],staticClass:"w-full",attrs:{"label-placeholder":"Valor","icon-pack":"feather",icon:"icon-dollar-sign","icon-no-border":"",name:"valor",danger:!!a.errors.first("valor"),"danger-text":a.errors.first("valor")?a.errors.first("valor"):"","val-icon-danger":"clear"},model:{value:a.data_local.valor,callback:function(e){a.$set(a.data_local,"valor",e)},expression:"data_local.valor"}})],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"}),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal",expression:"'required|decimal'"}],staticClass:"w-full",attrs:{"label-placeholder":"Factor Rango Fuera Zona 1",name:"fac_rang_fz1",danger:!!a.errors.first("fac_rang_fz1"),"danger-text":a.errors.first("fac_rang_fz1")?a.errors.first("fac_rang_fz1"):"","val-icon-danger":"clear"},model:{value:a.data_local.fac_rang_fz1,callback:function(e){a.$set(a.data_local,"fac_rang_fz1",e)},expression:"data_local.fac_rang_fz1"}})],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal",expression:"'required|decimal'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Valor Fuera Zona 1","icon-pack":"feather",icon:"icon-dollar-sign","icon-no-border":"",name:"valor_fz1",danger:!!a.errors.first("valor_fz1"),"danger-text":a.errors.first("valor_fz1")?a.errors.first("valor_fz1"):"","val-icon-danger":"clear"},model:{value:a.data_local.valor_fz1,callback:function(e){a.$set(a.data_local,"valor_fz1",e)},expression:"data_local.valor_fz1"}})],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal",expression:"'required|decimal'"}],staticClass:"w-full",attrs:{"label-placeholder":"Factor Rango Fuera Zona 2",name:"fac_rang_fz2",danger:!!a.errors.first("fac_rang_fz2"),"danger-text":a.errors.first("fac_rang_fz2")?a.errors.first("fac_rang_fz2"):"","val-icon-danger":"clear"},model:{value:a.data_local.fac_rang_fz2,callback:function(e){a.$set(a.data_local,"fac_rang_fz2",e)},expression:"data_local.fac_rang_fz2"}})],1),a._v(" "),r("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[r("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal",expression:"'required|decimal'"}],staticClass:"w-full",attrs:{"label-placeholder":"Valor Fuera Zona 2","icon-pack":"feather",icon:"icon-dollar-sign","icon-no-border":"",name:"valor_fz2",danger:!!a.errors.first("valor_fz2"),"danger-text":a.errors.first("valor_fz2")?a.errors.first("valor_fz2"):"","val-icon-danger":"clear"},model:{value:a.data_local.valor_fz2,callback:function(e){a.$set(a.data_local,"valor_fz2",e)},expression:"data_local.valor_fz2"}})],1)],1),a._v(" "),r("div",{staticClass:"vx-row"},[r("div",{staticClass:"vx-col w-full"},[r("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[r("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[r("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!a.validateForm},on:{click:a.save_changes}},[a._v("Guardar Cambios")])],1),a._v(" "),r("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[r("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"pasajeros"}}},[a._v("Volver")])],1),a._v(" "),r("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[r("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:a.reset_data}},[a._v("Limpiar")])],1)],1)])])])}),[],!1,null,null,null).exports,c=r("6wlp"),d={components:{itemAddSection1:o},data:function(){return{urlApi:"/tarifas/pasajeros/"}},watch:{},methods:{},created:function(){c.a.isRegistered||(this.$store.registerModule("itemManagement",c.a),c.a.isRegistered=!0)}},m=Object(l.a)(d,(function(){var a=this.$createElement,e=this._self._c||a;return e("div",{attrs:{id:"page-item-add"}},[e("vx-card",[e("item-add-section1",{staticClass:"mt-4"})],1)],1)}),[],!1,null,null,null);e.default=m.exports},UYwa:function(a,e,r){(a.exports=r("I1BE")(!1)).push([a.i,"[dir] .vs-input-number {\n  margin:0px !important;\n}\n",""])},XBK0:function(a,e,r){var t=r("UYwa");"string"==typeof t&&(t=[[a.i,t,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(t,s);t.locals&&(a.exports=t.locals)},"ZGv/":function(a,e,r){"use strict";var t=r("XBK0");r.n(t).a}}]);