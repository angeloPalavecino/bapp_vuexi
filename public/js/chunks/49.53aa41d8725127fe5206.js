(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{"/xYX":function(a,e,t){"use strict";t.r(e);var i=t("Snq/"),r=t.n(i),s=t("bJaO");t("e7F3").a.localize("en",{custom:{name:{required:"El nombre es requerido",alpha:"El nombre solo puede contener letras"},lastname:{required:"El apellido es requerido",alpha:"El apellido solo puede contener letras"},rut:{required:"El rut es requerido",alpha_dash:"Ingrese un rut valido"},ciudad:{required:"La ciudad es requerida",email:"Ingrese una ciudad valida"},comuna:{required:"La comuna es requerida",email:"Ingrese una comuna valida"},direccion:{required:"La dirección es requerida",email:"Ingrese una dirección valida"},numeracion:{required:"La numeración es requerida",numeric:"Ingrese una numeración valida"},email:{required:"El email es requerido",email:"Ingrese un email valido"},telefono:{required:"El telefono es requerido",numeric:"El numero de telefono debe ser valido"},clase:{required:"La clase es requerida"},asociados:{required:"El asociado es requerido"},cars:{required:"El movil es requerido"}}});var l={components:{vSelect:r.a},props:{data:{type:Object,required:!0}},data:function(){return{urlApi:"/driver/driver/",data_local:{id:this.data.id?this.data.id:null,name:this.data.name?this.data.name:null,lastname:this.data.lastname?this.data.lastname:null,rut:this.data.rut?this.data.rut:null,email:this.data.email?this.data.email:null,habilitado:this.data.habilitado,telefono:this.data.telefono?this.data.telefono:null,ciudad:this.data.ciudad?this.data.ciudad:null,comuna:this.data.comuna?this.data.comuna:null,dueno:this.data.dueno,conductor:this.data.conductor,direccion:this.data.direccion?this.data.direccion:null,numeracion:this.data.numeracion?this.data.numeracion:null,clase:this.data.clase?this.data.clase:null,driver_default:this.data.driver_default?this.data.driver_default:null,car_id:this.data.car_id?this.data.car_id:null,driver_id:this.data.asociado_id?this.data.asociado_id:null},movilesOptions:[],asociadosOptions:[]}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){},methods:{save_changes:function(){var a=this;this.$validator.validateAll().then((function(e){e&&a.$store.dispatch("itemManagement/editarItem",{item:a.data_local,Url:a.urlApi}).then((function(){a.$router.push({name:"conductores"}),a.showDeleteSuccess()})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={id:this.data.id?this.data.id:null,name:this.data.name?this.data.name:null,lastname:this.data.lastname?this.data.lastname:null,rut:this.data.rut?this.data.rut:null,email:this.data.email?this.data.email:null,habilitado:this.data.habilitado,telefono:this.data.telefono?this.data.telefono:null,ciudad:this.data.ciudad?this.data.ciudad:null,comuna:this.data.comuna?this.data.comuna:null,dueno:this.data.dueno,conductor:this.data.conductor,direccion:this.data.direccion?this.data.direccion:null,numeracion:this.data.numeracion?this.data.numeracion:null,clase:this.data.clase?this.data.clase:null,driver_default:this.data.driver_default?this.data.driver_default:null,car_id:this.data.car_id?this.data.car_id:null,driver_id:this.data.asociado_id?this.data.asociado_id:null},this.errors.clear()},traeOtrosDatos:function(){var a=this;s.a.get("/api/v1/car/carsall/").then((function(e){a.movilesOptions=e.data.items})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),s.a.get("/api/v1/asociado/asociado/").then((function(e){a.asociadosOptions=e.data.items})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}},created:function(){this.traeOtrosDatos()}},n=t("KHd+"),o=Object(n.a)(l,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"item-edit"}},[t("div",{staticClass:"vx-row mt-6"},[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Datos Conductor")])]),a._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Moviles",name:"cars",dir:a.$vs.rtl?"rtl":"ltr"},model:{value:a.data_local.car_id,callback:function(e){a.$set(a.data_local,"car_id",e)},expression:"data_local.car_id"}},a._l(a.movilesOptions,(function(a){return t("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.numero_movil}})})),1),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("cars"),expression:"errors.has('cars')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("cars")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Asociados",name:"asociados",dir:a.$vs.rtl?"rtl":"ltr"},model:{value:a.data_local.driver_id,callback:function(e){a.$set(a.data_local,"driver_id",e)},expression:"data_local.driver_id"}},a._l(a.asociadosOptions,(function(a){return t("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.name}})})),1),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("asociados"),expression:"errors.has('asociados')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("asociados")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-auto w-full mt-6"},[t("label",{staticClass:"vs-input--label "},[a._v("Conductor por defecto?")]),a._v(" "),t("br"),a._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:a.data_local.driver_default,callback:function(e){a.$set(a.data_local,"driver_default",e)},expression:"data_local.driver_default"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Nombre",name:"name",danger:!!a.errors.first("name"),"danger-text":a.errors.first("name")?a.errors.first("name"):"","val-icon-danger":"clear"},model:{value:a.data_local.name,callback:function(e){a.$set(a.data_local,"name",e)},expression:"data_local.name"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Apellido",name:"lastname",danger:!!a.errors.first("lastname"),"danger-text":a.errors.first("lastname")?a.errors.first("lastname"):"","val-icon-danger":"clear"},model:{value:a.data_local.lastname,callback:function(e){a.$set(a.data_local,"lastname",e)},expression:"data_local.lastname"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full  p-1",attrs:{type:"Email","label-placeholder":"Email",name:"email",danger:!!a.errors.first("email"),"danger-text":a.errors.first("email")?a.errors.first("email"):"","val-icon-danger":"clear"},model:{value:a.data_local.email,callback:function(e){a.$set(a.data_local,"email",e)},expression:"data_local.email"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Telefono",name:"telefono",danger:!!a.errors.first("telefono"),"danger-text":a.errors.first("telefono")?a.errors.first("telefono"):"","val-icon-danger":"clear"},model:{value:a.data_local.telefono,callback:function(e){a.$set(a.data_local,"telefono",e)},expression:"data_local.telefono"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_dash",expression:"'required|alpha_dash'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Rut",name:"rut",danger:!!a.errors.first("rut"),"danger-text":a.errors.first("rut")?a.errors.first("rut"):"","val-icon-danger":"clear"},model:{value:a.data_local.rut,callback:function(e){a.$set(a.data_local,"rut",e)},expression:"data_local.rut"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Ciudad",name:"ciudad",danger:!!a.errors.first("ciudad"),"danger-text":a.errors.first("ciudad")?a.errors.first("ciudad"):"","val-icon-danger":"clear"},model:{value:a.data_local.ciudad,callback:function(e){a.$set(a.data_local,"ciudad",e)},expression:"data_local.ciudad"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Comuna",name:"comuna",danger:!!a.errors.first("comuna"),"danger-text":a.errors.first("comuna")?a.errors.first("comuna"):"","val-icon-danger":"clear"},model:{value:a.data_local.comuna,callback:function(e){a.$set(a.data_local,"comuna",e)},expression:"data_local.comuna"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Direccion",name:"direccion",danger:!!a.errors.first("direccion"),"danger-text":a.errors.first("direccion")?a.errors.first("direccion"):"","val-icon-danger":"clear"},model:{value:a.data_local.direccion,callback:function(e){a.$set(a.data_local,"direccion",e)},expression:"data_local.direccion"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Numeracion",name:"numeracion",danger:!!a.errors.first("numeracion"),"danger-text":a.errors.first("numeracion")?a.errors.first("numeracion"):"","val-icon-danger":"clear"},model:{value:a.data_local.numeracion,callback:function(e){a.$set(a.data_local,"numeracion",e)},expression:"data_local.numeracion"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Licencias",name:"clase",danger:!!a.errors.first("clase"),"danger-text":a.errors.first("clase")?a.errors.first("clase"):"","val-icon-danger":"clear"},model:{value:a.data_local.clase,callback:function(e){a.$set(a.data_local,"clase",e)},expression:"data_local.clase"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("label",{staticClass:"vs-input--label "},[a._v("Habilitado")]),a._v(" "),t("br"),a._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:a.data_local.habilitado,callback:function(e){a.$set(a.data_local,"habilitado",e)},expression:"data_local.habilitado"}})],1)],1),a._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[t("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[t("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!a.validateForm},on:{click:a.save_changes}},[a._v("Guardar Cambios")])],1),a._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"conductores"}}},[a._v("Volver")])],1),a._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:a.reset_data}},[a._v("Limpiar")])],1)],1)])])])}),[],!1,null,null,null).exports,d=t("6wlp"),c={components:{itemEditSection1:o},data:function(){return{item_data:null,item_not_found:!1,urlApi:"/driver/driver/"}},watch:{activeTab:function(){this.fetch_item_data(this.$route.params.itemId)}},methods:{fetch_item_data:function(a){var e=this;this.$store.dispatch("itemManagement/traerItem",{Id:a,Url:this.urlApi}).then((function(a){e.item_data=a.data.item[0]})).catch((function(a){404!==a.response.status?300==a.response.status?e.$vs.notify({title:"Error",text:a.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.item_not_found=!0}))}},created:function(){d.a.isRegistered||(this.$store.registerModule("itemManagement",d.a),d.a.isRegistered=!0),this.fetch_item_data(this.$route.params.itemId)}},u=Object(n.a)(c,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"page-item-edit"}},[t("vs-alert",{attrs:{color:"danger",title:"Conductor no encontrado",active:a.item_not_found},on:{"update:active":function(e){a.item_not_found=e}}},[t("span",[a._v("El conductor con id: "+a._s(a.$route.params.itemId)+" no fue encontrado. ")]),a._v(" "),t("span",[t("span",[a._v("Mira  ")]),t("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"conductores"}}},[a._v("Todos los conductores")])],1)]),a._v(" "),a.item_data?t("vx-card",[t("item-edit-section1",{staticClass:"mt-4",attrs:{data:a.item_data}})],1):a._e()],1)}),[],!1,null,null,null);e.default=u.exports},"6wlp":function(a,e,t){"use strict";var i=t("bJaO");function r(a){if(null==a)throw new TypeError("Cannot destructure undefined")}var s={agregarItem:function(a,e){return r(a),new Promise((function(a,t){i.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){a(e)})).catch((function(a){t(a)}))}))},editarItem:function(a,e){return r(a),new Promise((function(a,t){var r="";r=e.item.id?e.Url+e.item.id:e.Url,i.a.put("/api/v1"+r,e.item).then((function(e){a(e)})).catch((function(a){t(a)}))}))},traerItems:function(a,e){var t=a.commit;return new Promise((function(a,r){i.a.get("/api/v1"+e).then((function(e){t("SET_ITEMS",e.data.items),a(e)})).catch((function(a){r(a)}))}))},traerItem:function(a,e){return r(a),new Promise((function(a,t){i.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){a(e)})).catch((function(a){t(a)}))}))},borrarItem:function(a,e){var t=a.commit;return new Promise((function(a,r){i.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(i){t("REMOVE_RECORD",e.Id),a(i)})).catch((function(a){r(a)}))}))},borrarMasivoItem:function(a,e){var t=a.commit;return new Promise((function(a,r){i.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(i){t("REMOVE_MASSIVE_RECORD",e.Items),a(i)})).catch((function(a){r(a)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(a,e){a.items=e},REMOVE_RECORD:function(a,e){var t=a.items.findIndex((function(a){return a.id==e}));a.items.splice(t,1)},REMOVE_MASSIVE_RECORD:function(a,e){e.forEach((function(e){var t=a.items.findIndex((function(a){return a.id==e.id}));a.items.splice(t,1)}))}},actions:s,getters:{}}}}]);