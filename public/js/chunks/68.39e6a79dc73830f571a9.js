(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{"6wlp":function(t,e,i){"use strict";var r=i("bJaO");function a(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var n={agregarItem:function(t,e){return a(t),new Promise((function(t,i){r.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){i(t)}))}))},editarItem:function(t,e){return a(t),new Promise((function(t,i){var a="";a=e.item.id?e.Url+e.item.id:e.Url,r.a.put("/api/v1"+a,e.item).then((function(e){t(e)})).catch((function(t){i(t)}))}))},traerItems:function(t,e){var i=t.commit;return new Promise((function(t,a){r.a.get("/api/v1"+e).then((function(e){i("SET_ITEMS",e.data.items),t(e)})).catch((function(t){a(t)}))}))},traerItem:function(t,e){return a(t),new Promise((function(t,i){r.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){i(t)}))}))},borrarItem:function(t,e){var i=t.commit;return new Promise((function(t,a){r.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(r){i("REMOVE_RECORD",e.Id),t(r)})).catch((function(t){a(t)}))}))},borrarMasivoItem:function(t,e){var i=t.commit;return new Promise((function(t,a){r.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(r){i("REMOVE_MASSIVE_RECORD",e.Items),t(r)})).catch((function(t){a(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var i=t.items.findIndex((function(t){return t.id==e}));t.items.splice(i,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var i=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(i,1)}))}},actions:n,getters:{}}},pQj4:function(t,e,i){"use strict";i.r(e);var r=i("Snq/"),a=i.n(r);i("bJaO");i("e7F3").a.localize("en",{custom:{descripcion:{required:"La descripcion es requerido"}}});var n={components:{vSelect:a.a},props:{},data:function(){return{urlApi:"/observaciones/observaciones/",data_local:{}}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){},methods:{save_changes:function(){var t=this;this.$validator.validateAll().then((function(e){e&&t.$store.dispatch("itemManagement/agregarItem",{item:t.data_local,Url:t.urlApi}).then((function(){t.$router.push({name:"observaciones"}),t.showDeleteSuccess()})).catch((function(e){var i=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:i,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={},this.errors.clear()}}},o=i("KHd+"),s=Object(o.a)(n,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"item-add"}},[i("div",{staticClass:"vx-row mt-6"},[i("vs-divider",{attrs:{color:"primary"}},[i("h5",[t._v("Datos Observacion")])]),t._v(" "),i("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[i("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Descripcion",name:"descripcion",danger:!!t.errors.first("descripcion"),"danger-text":t.errors.first("descripcion")?t.errors.first("descripcion"):"","val-icon-danger":"clear"},model:{value:t.data_local.descripcion,callback:function(e){t.$set(t.data_local,"descripcion",e)},expression:"data_local.descripcion"}})],1)],1),t._v(" "),i("div",{staticClass:"vx-row"},[i("div",{staticClass:"vx-col w-full"},[i("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[i("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[i("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!t.validateForm},on:{click:t.save_changes}},[t._v("Guardar Cambios")])],1),t._v(" "),i("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[i("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"observaciones"}}},[t._v("Volver")])],1),t._v(" "),i("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[i("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:t.reset_data}},[t._v("Limpiar")])],1)],1)])])])}),[],!1,null,null,null).exports,c=i("6wlp"),l={components:{itemAddSection1:s},data:function(){return{urlApi:"/observaciones/observaciones/"}},watch:{},methods:{},created:function(){c.a.isRegistered||(this.$store.registerModule("itemManagement",c.a),c.a.isRegistered=!0)}},u=Object(o.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"page-item-add"}},[e("vx-card",[e("item-add-section1",{staticClass:"mt-4"})],1)],1)}),[],!1,null,null,null);e.default=u.exports}}]);