(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{"6wlp":function(e,a,t){"use strict";var s=t("bJaO");function r(e){if(null==e)throw new TypeError("Cannot destructure undefined")}var i={agregarItem:function(e,a){return r(e),new Promise((function(e,t){s.a.post("/api/v1"+a.Url+"store",a.item).then((function(a){e(a)})).catch((function(e){t(e)}))}))},editarItem:function(e,a){return r(e),new Promise((function(e,t){s.a.put("/api/v1"+a.Url+a.item.id,a.item).then((function(a){e(a)})).catch((function(e){t(e)}))}))},traerItems:function(e,a){var t=e.commit;return new Promise((function(e,r){s.a.get("/api/v1"+a).then((function(a){t("SET_ITEMS",a.data.items),e(a)})).catch((function(e){r(e)}))}))},traerItem:function(e,a){return r(e),new Promise((function(e,t){s.a.get("/api/v1"+a.Url+"".concat(a.Id)).then((function(a){e(a)})).catch((function(e){t(e)}))}))},borrarItem:function(e,a){var t=e.commit;return new Promise((function(e,r){s.a.delete("/api/v1"+a.Url+"".concat(a.Id)).then((function(s){t("REMOVE_RECORD",a.Id),e(s)})).catch((function(e){r(e)}))}))},borrarMasivoItem:function(e,a){var t=e.commit;return new Promise((function(e,r){s.a.post("/api/v1"+a.Url+"borrar",a.Items).then((function(s){t("REMOVE_MASSIVE_RECORD",a.Items),e(s)})).catch((function(e){r(e)}))}))}};a.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(e,a){e.items=a},REMOVE_RECORD:function(e,a){var t=e.items.findIndex((function(e){return e.id==a}));e.items.splice(t,1)},REMOVE_MASSIVE_RECORD:function(e,a){a.forEach((function(a){var t=e.items.findIndex((function(e){return e.id==a.id}));e.items.splice(t,1)}))}},actions:i,getters:{}}},W2FI:function(e,a,t){"use strict";t.r(a);var s=t("Snq/"),r=t.n(s),i=t("bJaO");t("e7F3").a.localize("en",{custom:{name:{required:"El nombre es requerido",alpha_spaces:"El nombre solo puede contener letras"},lastname:{required:"El apellido es requerido",alpha_spaces:"El apellido solo puede contener letras"},rut:{required:"El rut es requerido",alpha_dash:"Ingrese un rut valido"},email:{required:"El email es requerido",email:"Ingrese un email valido"},roles:{required:"El rol es requerido"},empresa:{required:"La empresa es requerido"},telefono:{required:"El telefono es requerido",numeric:"El numero de telefono debe ser valido"},password:{required:"La password es requerida",min:"La password debe tener minimo 8 caracteres"},password_confirmation:{required:"Debe ingresar la confirmacion de la password",min:"La confirmacion de la password debe tener minimo 8 caracteres",confirmed:"Las password debe ser iguales"},moviles:{min_value:"Debe seleccionar al menos 1 movil"}}});var l={components:{vSelect:r.a},props:{},data:function(){return{urlApi:"/users/users/",data_local:{habilitado:1,moviles:[],empresa_id:null,roles:null},roleOptions:[],empresaOptions:[],movilesOptions:[],movilescount:0}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){this.traeOtrosDatos()},methods:{setSelected:function(e){e<=2&&(this.data_local.empresa_id=1,2!=e&&(this.data_local.moviles=[],this.movilescount=0))},handleSelectedMoviles:function(e){this.movilescount=e.length},save_changes:function(){var e=this;this.$validator.validateAll().then((function(a){a&&e.$store.dispatch("itemManagement/agregarItem",{item:e.data_local,Url:e.urlApi}).then((function(){e.$router.push({name:"users"}),e.showDeleteSuccess()})).catch((function(a){var t=300==a.response.status?a.response.data.message:a;e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={habilitado:1,moviles:[],empresa_id:"",roles:""},this.movilescount=0,this.errors.clear()},update_avatar:function(){},traeOtrosDatos:function(){var e=this;i.a.get("/api/v1/empresas/listemp").then((function(a){e.empresaOptions=a.data.items})).catch((function(a){var t=300==a.response.status?a.response.data.message:a;e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),i.a.get("/api/v1/roles/roles").then((function(a){e.roleOptions=a.data.items})).catch((function(a){var t=300==a.response.status?a.response.data.message:a;e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),i.a.get("/api/v1/car/cars").then((function(a){e.movilesOptions=a.data.items})).catch((function(a){var t=300==a.response.status?a.response.data.message:a;e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}}},o=t("KHd+"),n=Object(o.a)(l,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"item-add"}},[t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"flex items-start flex-col sm:flex-row"},[t("img",{staticClass:"mr-8 rounded h-24 w-24",attrs:{src:"/images/portrait/users/avatar.jpg"}}),e._v(" "),t("div",[t("p",{staticClass:"text-lg font-medium mb-2 mt-4 sm:mt-0"},[e._v("Seleccione una imagen para cambiar el avatar")]),e._v(" "),t("input",{ref:"update_avatar_input",staticClass:"hidden",attrs:{type:"file",accept:"image/*"},on:{change:e.update_avatar}}),e._v(" "),t("vs-button",{staticClass:"mr-4 mb-4"},[e._v("Cambiar Avatar")]),e._v(" "),t("vs-button",{attrs:{type:"border",color:"danger"}},[e._v("Eliminar Avatar")])],1)])])]),e._v(" "),t("div",{staticClass:"vx-row mt-6"},[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[e._v("Datos Usuarios")])]),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_spaces",expression:"'required|alpha_spaces'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Nombre",name:"name",danger:!!e.errors.first("name"),"danger-text":e.errors.first("name")?e.errors.first("name"):"","val-icon-danger":"clear"},model:{value:e.data_local.name,callback:function(a){e.$set(e.data_local,"name",a)},expression:"data_local.name"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_spaces",expression:"'required|alpha_spaces'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Apellido",name:"lastname",danger:!!e.errors.first("lastname"),"danger-text":e.errors.first("lastname")?e.errors.first("lastname"):"","val-icon-danger":"clear"},model:{value:e.data_local.lastname,callback:function(a){e.$set(e.data_local,"lastname",a)},expression:"data_local.lastname"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full  p-1",attrs:{type:"Email","label-placeholder":"Email",name:"email",danger:!!e.errors.first("email"),"danger-text":e.errors.first("email")?e.errors.first("email"):"","val-icon-danger":"clear"},model:{value:e.data_local.email,callback:function(a){e.$set(e.data_local,"email",a)},expression:"data_local.email"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_dash",expression:"'required|alpha_dash'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Rut",name:"rut",danger:!!e.errors.first("rut"),"danger-text":e.errors.first("rut")?e.errors.first("rut"):"","val-icon-danger":"clear"},model:{value:e.data_local.rut,callback:function(a){e.$set(e.data_local,"rut",a)},expression:"data_local.rut"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Telefono",name:"telefono",danger:!!e.errors.first("telefono"),"danger-text":e.errors.first("telefono")?e.errors.first("telefono"):"","val-icon-danger":"clear"},model:{value:e.data_local.telefono,callback:function(a){e.$set(e.data_local,"telefono",a)},expression:"data_local.telefono"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("label",{staticClass:"vs-input--label "},[e._v("Habilitado")]),e._v(" "),t("br"),e._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:e.data_local.habilitado,callback:function(a){e.$set(e.data_local,"habilitado",a)},expression:"data_local.habilitado"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Roles",name:"roles",dir:e.$vs.rtl?"rtl":"ltr"},on:{input:e.setSelected},model:{value:e.data_local.roles,callback:function(a){e.$set(e.data_local,"roles",a)},expression:"data_local.roles"}},e._l(e.roleOptions,(function(e){return t("vs-select-item",{key:e.id,attrs:{value:e.id,text:e.name}})})),1),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("roles"),expression:"errors.has('roles')"}],staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("roles")))])],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"empresa",staticClass:"w-full p-1",attrs:{label:"Empresa",name:"empresa",disabled:!(e.data_local.roles>2),dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.data_local.empresa_id,callback:function(a){e.$set(e.data_local,"empresa_id",a)},expression:"data_local.empresa_id"}},e._l(e.empresaOptions,(function(e){return t("vs-select-item",{key:e.id,attrs:{value:e.id,text:e.razon_social}})})),1),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("empresa"),expression:"errors.has('empresa')"}],staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("empresa")))])],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:8",expression:"'required|min:8'"}],ref:"password",staticClass:"w-full p-1",attrs:{type:"password","label-placeholder":"Password",name:"password","danger-text":e.errors.first("password")?e.errors.first("password"):"",danger:!!e.errors.first("password"),"val-icon-danger":"clear"},model:{value:e.data_local.password,callback:function(a){e.$set(e.data_local,"password",a)},expression:"data_local.password"}})],1),e._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:8|confirmed:password",expression:"'required|min:8|confirmed:password'"}],staticClass:"w-full p-1",attrs:{type:"password","data-vv-as":"password","label-placeholder":"Confirmar Password",name:"password_confirmation","danger-text":e.errors.first("password_confirmation")?e.errors.first("password_confirmation"):"",danger:!!e.errors.first("password_confirmation"),"val-icon-danger":"clear"},model:{value:e.data_local.password_confirmation,callback:function(a){e.$set(e.data_local,"password_confirmation",a)},expression:"data_local.password_confirmation"}})],1)],1),e._v(" "),t("vx-card",{directives:[{name:"show",rawName:"v-show",value:2===e.data_local.roles,expression:"data_local.roles === 2"}],staticClass:"mt-base",attrs:{"no-shadow":"","card-border":""}},[t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"flex items-end px-3"},[t("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"TruckIcon"}}),e._v(" "),t("span",{staticClass:"font-medium text-lg leading-none"},[e._v("Moviles")])],1),e._v(" "),t("vs-divider")],1)]),e._v(" "),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:2==e.data_local.roles?"min_value:1":"",expression:"(data_local.roles == 2 ? 'min_value:1' : '')"}],attrs:{type:"hidden",name:"moviles"},model:{value:e.movilescount,callback:function(a){e.movilescount=a},expression:"movilescount"}}),e._v(" "),t("span",{staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("moviles")))]),e._v(" "),t("div",{staticClass:"block overflow-x-auto"},[t("vs-table",{ref:"tablemoviles",attrs:{"max-items":"10",multiple:"",pagination:"",search:"",data:e.movilesOptions},on:{input:e.handleSelectedMoviles},scopedSlots:e._u([{key:"default",fn:function(a){var s=a.data;return e._l(s,(function(a,s){return t("vs-tr",{key:s,attrs:{data:a}},[t("vs-td",[t("p",[e._v(e._s(a.id))])]),e._v(" "),t("vs-td",[t("p",[e._v(e._s(a.numero_movil))])]),e._v(" "),t("vs-td",[t("p",[e._v(e._s(a.patente))])])],1)}))}}]),model:{value:e.data_local.moviles,callback:function(a){e.$set(e.data_local,"moviles",a)},expression:"data_local.moviles"}},[t("template",{slot:"header"},[t("span",[e._v("\n                      Seleccione al menos un movil\n                  ")])]),e._v(" "),t("template",{slot:"thead"},[t("vs-th",[e._v("ID")]),e._v(" "),t("vs-th",[e._v("N° Movil")]),e._v(" "),t("vs-th",[e._v("Patente")])],1)],2)],1)],1),e._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[t("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[t("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!e.validateForm},on:{click:e.save_changes}},[e._v("Guardar Cambios")])],1),e._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"users"}}},[e._v("Volver")])],1),e._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:e.reset_data}},[e._v("Limpiar")])],1)],1)])])],1)}),[],!1,null,null,null).exports,c=t("6wlp"),d={components:{itemAddSection1:n},data:function(){return{urlApi:"/users/users/"}},watch:{},methods:{},created:function(){c.a.isRegistered||(this.$store.registerModule("itemManagement",c.a),c.a.isRegistered=!0)}},v=Object(o.a)(d,(function(){var e=this.$createElement,a=this._self._c||e;return a("div",{attrs:{id:"page-item-add"}},[a("vx-card",[a("item-add-section1",{staticClass:"mt-4"})],1)],1)}),[],!1,null,null,null);a.default=v.exports}}]);