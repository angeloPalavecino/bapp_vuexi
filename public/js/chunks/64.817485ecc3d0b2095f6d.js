(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{"6wlp":function(e,a,t){"use strict";var r=t("bJaO");function i(e){if(null==e)throw new TypeError("Cannot destructure undefined")}var l={agregarItem:function(e,a){return i(e),new Promise((function(e,t){r.a.post("/api/v1"+a.Url+"store",a.item).then((function(a){e(a)})).catch((function(e){t(e)}))}))},editarItem:function(e,a){return i(e),new Promise((function(e,t){var i="";i=a.item.id?a.Url+a.item.id:a.Url,r.a.put("/api/v1"+i,a.item).then((function(a){e(a)})).catch((function(e){t(e)}))}))},traerItems:function(e,a){var t=e.commit;return new Promise((function(e,i){r.a.get("/api/v1"+a).then((function(a){t("SET_ITEMS",a.data.items),e(a)})).catch((function(e){i(e)}))}))},traerItem:function(e,a){return i(e),new Promise((function(e,t){r.a.get("/api/v1"+a.Url+"".concat(a.Id)).then((function(a){e(a)})).catch((function(e){t(e)}))}))},borrarItem:function(e,a){var t=e.commit;return new Promise((function(e,i){r.a.delete("/api/v1"+a.Url+"".concat(a.Id)).then((function(r){t("REMOVE_RECORD",a.Id),e(r)})).catch((function(e){i(e)}))}))},borrarMasivoItem:function(e,a){var t=e.commit;return new Promise((function(e,i){r.a.post("/api/v1"+a.Url+"borrar",a.Items).then((function(r){t("REMOVE_MASSIVE_RECORD",a.Items),e(r)})).catch((function(e){i(e)}))}))}};a.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(e,a){e.items=a},REMOVE_RECORD:function(e,a){var t=e.items.findIndex((function(e){return e.id==a}));e.items.splice(t,1)},REMOVE_MASSIVE_RECORD:function(e,a){a.forEach((function(a){var t=e.items.findIndex((function(e){return e.id==a.id}));e.items.splice(t,1)}))}},actions:l,getters:{}}},OOpD:function(e,a,t){"use strict";t.r(a);var r=t("Snq/"),i=t.n(r),l=t("bJaO");t("e7F3").a.localize("en",{custom:{name:{required:"El nombre es requerido",alpha:"El nombre solo puede contener letras"},lastname:{required:"El apellido es requerido",alpha:"El apellido solo puede contener letras"},rut:{required:"El rut es requerido",alpha_dash:"Ingrese un rut valido"},ciudad:{required:"La ciudad es requerida",email:"Ingrese una ciudad valida"},comuna:{required:"La comuna es requerida",email:"Ingrese una comuna valida"},direccion:{required:"La dirección es requerida",email:"Ingrese una dirección valida"},numeracion:{required:"La numeración es requerida",numeric:"Ingrese una numeración valida"},email:{required:"El email es requerido",email:"Ingrese un email valido"},telefono:{required:"El telefono es requerido",numeric:"El numero de telefono debe ser valido"},clase:{required:"La clase es requerida"},asociados:{required:"El asociado es requerido"},cars:{required:"El movil es requerido"}}});var s={components:{vSelect:i.a},props:{},data:function(){return{urlApi:"/driver/driver/",data_local:{habilitado:1,conductor:!0,dueno:!1,driver_default:!1,car_id:"",driver_id:""},movilesOptions:[],asociadosOptions:[]}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){},methods:{save_changes:function(){var e=this;this.$validator.validateAll().then((function(a){a&&e.$store.dispatch("itemManagement/agregarItem",{item:e.data_local,Url:e.urlApi}).then((function(){e.$router.push({name:"conductores"}),e.showDeleteSuccess()})).catch((function(a){var t=300==a.response.status?a.response.data.message:a;e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={habilitado:1,conductor:!0,dueno:!1,driver_default:!1,car_id:"",driver_id:""},this.errors.clear()},traeOtrosDatos:function(){var e=this;l.a.get("/api/v1/car/carsall/").then((function(a){e.movilesOptions=a.data.items})).catch((function(a){var t=300==a.response.status?a.response.data.message:a;e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),l.a.get("/api/v1/asociado/asociado/").then((function(a){e.asociadosOptions=a.data.items})).catch((function(a){var t=300==a.response.status?a.response.data.message:a;e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},created:function(){this.traeOtrosDatos()}},o=t("KHd+"),n=Object(o.a)(s,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"item-add"}},[t("div",{staticClass:"vx-row mt-6"},[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[e._v("Datos Conductor")])]),e._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Moviles",name:"cars",dir:e.$vs.rtl?"rtl":"ltr",danger:!!e.errors.first("cars"),"danger-text":e.errors.first("cars")?e.errors.first("cars"):""},model:{value:e.data_local.car_id,callback:function(a){e.$set(e.data_local,"car_id",a)},expression:"data_local.car_id"}},e._l(e.movilesOptions,(function(e){return t("vs-select-item",{key:e.id,attrs:{value:e.id,text:e.numero_movil}})})),1)],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Asociados",name:"asociados",dir:e.$vs.rtl?"rtl":"ltr",danger:!!e.errors.first("asociados"),"danger-text":e.errors.first("asociados")?e.errors.first("asociados"):""},model:{value:e.data_local.driver_id,callback:function(a){e.$set(e.data_local,"driver_id",a)},expression:"data_local.driver_id"}},e._l(e.asociadosOptions,(function(e){return t("vs-select-item",{key:e.id,attrs:{value:e.id,text:e.name}})})),1)],1),e._v(" "),t("div",{staticClass:"vx-col md:w-auto w-full mt-6"},[t("label",{staticClass:"vs-input--label "},[e._v("Conductor por defecto?")]),e._v(" "),t("br"),e._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:e.data_local.driver_default,callback:function(a){e.$set(e.data_local,"driver_default",a)},expression:"data_local.driver_default"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Nombre",name:"name",danger:!!e.errors.first("name"),"danger-text":e.errors.first("name")?e.errors.first("name"):"","val-icon-danger":"clear"},model:{value:e.data_local.name,callback:function(a){e.$set(e.data_local,"name",a)},expression:"data_local.name"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Apellido",name:"lastname",danger:!!e.errors.first("lastname"),"danger-text":e.errors.first("lastname")?e.errors.first("lastname"):"","val-icon-danger":"clear"},model:{value:e.data_local.lastname,callback:function(a){e.$set(e.data_local,"lastname",a)},expression:"data_local.lastname"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full  p-1",attrs:{type:"Email","label-placeholder":"Email",name:"email",danger:!!e.errors.first("email"),"danger-text":e.errors.first("email")?e.errors.first("email"):"","val-icon-danger":"clear"},model:{value:e.data_local.email,callback:function(a){e.$set(e.data_local,"email",a)},expression:"data_local.email"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Telefono",name:"telefono",danger:!!e.errors.first("telefono"),"danger-text":e.errors.first("telefono")?e.errors.first("telefono"):"","val-icon-danger":"clear"},model:{value:e.data_local.telefono,callback:function(a){e.$set(e.data_local,"telefono",a)},expression:"data_local.telefono"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_dash",expression:"'required|alpha_dash'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Rut",name:"rut",danger:!!e.errors.first("rut"),"danger-text":e.errors.first("rut")?e.errors.first("rut"):"","val-icon-danger":"clear"},model:{value:e.data_local.rut,callback:function(a){e.$set(e.data_local,"rut",a)},expression:"data_local.rut"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Ciudad",name:"ciudad",danger:!!e.errors.first("ciudad"),"danger-text":e.errors.first("ciudad")?e.errors.first("ciudad"):"","val-icon-danger":"clear"},model:{value:e.data_local.ciudad,callback:function(a){e.$set(e.data_local,"ciudad",a)},expression:"data_local.ciudad"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Comuna",name:"comuna",danger:!!e.errors.first("comuna"),"danger-text":e.errors.first("comuna")?e.errors.first("comuna"):"","val-icon-danger":"clear"},model:{value:e.data_local.comuna,callback:function(a){e.$set(e.data_local,"comuna",a)},expression:"data_local.comuna"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Direccion",name:"direccion",danger:!!e.errors.first("direccion"),"danger-text":e.errors.first("direccion")?e.errors.first("direccion"):"","val-icon-danger":"clear"},model:{value:e.data_local.direccion,callback:function(a){e.$set(e.data_local,"direccion",a)},expression:"data_local.direccion"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Numeracion",name:"numeracion",danger:!!e.errors.first("numeracion"),"danger-text":e.errors.first("numeracion")?e.errors.first("numeracion"):"","val-icon-danger":"clear"},model:{value:e.data_local.numeracion,callback:function(a){e.$set(e.data_local,"numeracion",a)},expression:"data_local.numeracion"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Licencias",name:"clase",danger:!!e.errors.first("clase"),"danger-text":e.errors.first("clase")?e.errors.first("clase"):"","val-icon-danger":"clear"},model:{value:e.data_local.clase,callback:function(a){e.$set(e.data_local,"clase",a)},expression:"data_local.clase"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("label",{staticClass:"vs-input--label "},[e._v("Habilitado")]),e._v(" "),t("br"),e._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:e.data_local.habilitado,callback:function(a){e.$set(e.data_local,"habilitado",a)},expression:"data_local.habilitado"}})],1)],1),e._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[t("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[t("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!e.validateForm},on:{click:e.save_changes}},[e._v("Guardar Cambios")])],1),e._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"conductores"}}},[e._v("Volver")])],1),e._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:e.reset_data}},[e._v("Limpiar")])],1)],1)])])])}),[],!1,null,null,null).exports,c=t("6wlp"),d={components:{itemAddSection1:n},data:function(){return{urlApi:"/driver/driver/"}},watch:{},methods:{},created:function(){c.a.isRegistered||(this.$store.registerModule("itemManagement",c.a),c.a.isRegistered=!0)}},u=Object(o.a)(d,(function(){var e=this.$createElement,a=this._self._c||e;return a("div",{attrs:{id:"page-item-add"}},[a("vx-card",[a("item-add-section1",{staticClass:"mt-4"})],1)],1)}),[],!1,null,null,null);a.default=u.exports}}]);