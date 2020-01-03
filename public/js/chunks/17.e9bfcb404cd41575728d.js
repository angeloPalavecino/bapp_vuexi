(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"6wlp":function(a,e,t){"use strict";var s=t("bJaO");function i(a){if(null==a)throw new TypeError("Cannot destructure undefined")}var r={agregarItem:function(a,e){return i(a),new Promise((function(a,t){s.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){a(e)})).catch((function(a){t(a)}))}))},editarItem:function(a,e){return i(a),new Promise((function(a,t){s.a.put("/api/v1"+e.Url+e.item.id,e.item).then((function(e){a(e)})).catch((function(a){t(a)}))}))},traerItems:function(a,e){var t=a.commit;return new Promise((function(a,i){s.a.get("/api/v1"+e).then((function(e){t("SET_ITEMS",e.data.items),a(e)})).catch((function(a){i(a)}))}))},traerItem:function(a,e){return i(a),new Promise((function(a,t){s.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){a(e)})).catch((function(a){t(a)}))}))},borrarItem:function(a,e){var t=a.commit;return new Promise((function(a,i){s.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(s){t("REMOVE_RECORD",e.Id),a(s)})).catch((function(a){i(a)}))}))},borrarMasivoItem:function(a,e){var t=a.commit;return new Promise((function(a,i){s.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(s){t("REMOVE_MASSIVE_RECORD",e.Items),a(s)})).catch((function(a){i(a)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(a,e){a.items=e},REMOVE_RECORD:function(a,e){var t=a.items.findIndex((function(a){return a.id==e}));a.items.splice(t,1)},REMOVE_MASSIVE_RECORD:function(a,e){e.forEach((function(e){var t=a.items.findIndex((function(a){return a.id==e.id}));a.items.splice(t,1)}))}},actions:r,getters:{}}},s4ed:function(a,e,t){"use strict";t.r(e);var s=t("Snq/"),i=t.n(s),r=t("bJaO");t("e7F3").a.localize("en",{custom:{name:{required:"El nombre es requerido",alpha_spaces:"El nombre solo puede contener letras"},lastname:{required:"El apellido es requerido",alpha_spaces:"El apellido solo puede contener letras"},rut:{required:"El rut es requerido",alpha_dash:"Ingrese un rut valido"},email:{required:"El email es requerido",email:"Ingrese un email valido"},roles:{required:"El rol es requerido"},empresa:{required:"La empresa es requerido"},telefono:{required:"El telefono es requerido",numeric:"El numero de telefono debe ser valido"},password:{required:"La password es requerida",min:"La password debe tener minimo 8 caracteres"},password_confirmation:{required:"Debe ingresar la confirmacion de la password",min:"La confirmacion de la password debe tener minimo 8 caracteres",confirmed:"Las password debe ser iguales"},moviles:{min_value:"Debe seleccionar al menos 1 movil"}}});var l={components:{vSelect:i.a},props:{data:{type:Object,required:!0},data_movil:{type:Array,required:!0}},data:function(){return{urlApi:"/users/users/",data_local:{empresa_id:this.data.empresa_id?this.data.empresa_id:null,email:this.data.email?this.data.email:null,name:this.data.name?this.data.name:null,lastname:this.data.lastname?this.data.lastname:null,rut:this.data.rut?this.data.rut:null,telefono:this.data.telefono?this.data.telefono:null,habilitado:!this.data.habilitado||this.data.habilitado,roles:this.data.roles[0].id?this.data.roles[0].id:null,id:this.data.id?this.data.id:null,moviles:[]},data_local_movil:this.data_movil,roleOptions:[],empresaOptions:[],movilesOptions:[],movilescount:0}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){this.traeOtrosDatos()},methods:{setSelected:function(a){a<=2&&(this.data_local.empresa_id=1,2!=a&&(this.data_local.moviles=[],this.movilescount=0))},handleSelectedMoviles:function(a){this.movilescount=a.length},save_changes:function(){var a=this;this.$validator.validateAll().then((function(e){e&&a.$store.dispatch("itemManagement/editarItem",{item:a.data_local,Url:a.urlApi}).then((function(){a.$router.push({name:"users"}),a.showDeleteSuccess()})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){if(this.data_local={empresa_id:this.data.empresa_id?this.data.empresa_id:null,email:this.data.email?this.data.email:null,name:this.data.name?this.data.name:null,lastname:this.data.lastname?this.data.lastname:null,rut:this.data.rut?this.data.rut:null,telefono:this.data.telefono?this.data.telefono:null,habilitado:!this.data.habilitado||this.data.habilitado,roles:this.data.roles[0].id?this.data.roles[0].id:null,id:this.data.id?this.data.id:null,moviles:[]},this.movilescount=0,this.data_local_movil.length>0){var a=this,e=this.movilesOptions;this.data_local_movil.forEach((function(t){a.data_local.moviles.push(e.find((function(a){return a.id===t.id})))})),this.movilescount=this.data_local_movil.length}this.errors.clear()},update_avatar:function(){},traeOtrosDatos:function(){var a=this;r.a.get("/api/v1/empresas/listemp").then((function(e){a.empresaOptions=e.data.items})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),r.a.get("/api/v1/roles/roles").then((function(e){a.roleOptions=e.data.items})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),r.a.get("/api/v1/car/cars").then((function(e){if(a.movilesOptions=e.data.items,a.data_local_movil.length>0){var t=a,s=a.movilesOptions;a.data_local_movil.forEach((function(a){t.data_local.moviles.push(s.find((function(e){return e.id===a.id})))})),a.movilescount=a.data_local_movil.length}})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}}},o=t("KHd+"),n=Object(o.a)(l,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"item-edit"}},[t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"flex items-start flex-col sm:flex-row"},[t("img",{staticClass:"mr-8 rounded h-24 w-24",attrs:{src:a.data.imagen}}),a._v(" "),t("div",[t("p",{staticClass:"text-lg font-medium mb-2 mt-4 sm:mt-0"},[a._v(a._s(a.data.name))]),a._v(" "),t("input",{ref:"update_avatar_input",staticClass:"hidden",attrs:{type:"file",accept:"image/*"},on:{change:a.update_avatar}}),a._v(" "),t("vs-button",{staticClass:"mr-4 mb-4"},[a._v("Cambiar Avatar")]),a._v(" "),t("vs-button",{attrs:{type:"border",color:"danger"}},[a._v("Eliminar Avatar")])],1)])])]),a._v(" "),t("div",{staticClass:"vx-row mt-6"},[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Datos Usuarios")])]),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_spaces",expression:"'required|alpha_spaces'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Nombre",name:"name",danger:!!a.errors.first("name"),"danger-text":a.errors.first("name")?a.errors.first("name"):"","val-icon-danger":"clear"},model:{value:a.data_local.name,callback:function(e){a.$set(a.data_local,"name",e)},expression:"data_local.name"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_spaces",expression:"'required|alpha_spaces'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Apellido",name:"lastname",danger:!!a.errors.first("lastname"),"danger-text":a.errors.first("lastname")?a.errors.first("lastname"):"","val-icon-danger":"clear"},model:{value:a.data_local.lastname,callback:function(e){a.$set(a.data_local,"lastname",e)},expression:"data_local.lastname"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full  p-1",attrs:{type:"Email","label-placeholder":"Email",name:"email",danger:!!a.errors.first("email"),"danger-text":a.errors.first("email")?a.errors.first("email"):"","val-icon-danger":"clear"},model:{value:a.data_local.email,callback:function(e){a.$set(a.data_local,"email",e)},expression:"data_local.email"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_dash",expression:"'required|alpha_dash'"}],staticClass:"w-full  p-1",attrs:{"label-placeholder":"Rut",name:"rut",danger:!!a.errors.first("rut"),"danger-text":a.errors.first("rut")?a.errors.first("rut"):"","val-icon-danger":"clear"},model:{value:a.data_local.rut,callback:function(e){a.$set(a.data_local,"rut",e)},expression:"data_local.rut"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Telefono",name:"telefono",danger:!!a.errors.first("telefono"),"danger-text":a.errors.first("telefono")?a.errors.first("telefono"):"","val-icon-danger":"clear"},model:{value:a.data_local.telefono,callback:function(e){a.$set(a.data_local,"telefono",e)},expression:"data_local.telefono"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("label",{staticClass:"vs-input--label "},[a._v("Habilitado")]),a._v(" "),t("br"),a._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:a.data_local.habilitado,callback:function(e){a.$set(a.data_local,"habilitado",e)},expression:"data_local.habilitado"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Roles",name:"roles",dir:a.$vs.rtl?"rtl":"ltr"},on:{input:a.setSelected},model:{value:a.data_local.roles,callback:function(e){a.$set(a.data_local,"roles",e)},expression:"data_local.roles"}},a._l(a.roleOptions,(function(a){return t("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.name}})})),1),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("roles"),expression:"errors.has('roles')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("roles")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"empresa",staticClass:"w-full p-1",attrs:{label:"Empresa",name:"empresa",disabled:!(a.data_local.roles>2),dir:a.$vs.rtl?"rtl":"ltr"},model:{value:a.data_local.empresa_id,callback:function(e){a.$set(a.data_local,"empresa_id",e)},expression:"data_local.empresa_id"}},a._l(a.empresaOptions,(function(a){return t("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.razon_social}})})),1),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("empresa"),expression:"errors.has('empresa')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("empresa")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"min:8",expression:"'min:8'"}],ref:"password",staticClass:"w-full p-1",attrs:{type:"password","label-placeholder":"Password",name:"password","danger-text":a.errors.first("password")?a.errors.first("password"):"",danger:!!a.errors.first("password"),"val-icon-danger":"clear"},model:{value:a.data_local.password,callback:function(e){a.$set(a.data_local,"password",e)},expression:"data_local.password"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"min:8|confirmed:password",expression:"'min:8|confirmed:password'"}],staticClass:"w-full p-1",attrs:{type:"password","data-vv-as":"password","label-placeholder":"Confirmar Password",name:"password_confirmation","danger-text":a.errors.first("password_confirmation")?a.errors.first("password_confirmation"):"",danger:!!a.errors.first("password_confirmation"),"val-icon-danger":"clear"},model:{value:a.data_local.password_confirmation,callback:function(e){a.$set(a.data_local,"password_confirmation",e)},expression:"data_local.password_confirmation"}})],1)],1),a._v(" "),t("vx-card",{directives:[{name:"show",rawName:"v-show",value:2===a.data_local.roles,expression:"data_local.roles === 2"}],staticClass:"mt-base",attrs:{"no-shadow":"","card-border":""}},[t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"flex items-end px-3"},[t("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"TruckIcon"}}),a._v(" "),t("span",{staticClass:"font-medium text-lg leading-none"},[a._v("Moviles")])],1),a._v(" "),t("vs-divider")],1)]),a._v(" "),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:2==a.data_local.roles?"min_value:1":"",expression:"(data_local.roles == 2 ? 'min_value:1' : '')"}],attrs:{type:"hidden",name:"moviles"},model:{value:a.movilescount,callback:function(e){a.movilescount=e},expression:"movilescount"}}),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("moviles")))]),a._v(" "),t("div",{staticClass:"block overflow-x-auto"},[t("vs-table",{ref:"tablemoviles",attrs:{"max-items":"10",multiple:"",pagination:"",search:"",data:a.movilesOptions},on:{input:a.handleSelectedMoviles},scopedSlots:a._u([{key:"default",fn:function(e){var s=e.data;return a._l(s,(function(e,s){return t("vs-tr",{key:s,attrs:{data:e}},[t("vs-td",[t("p",[a._v(a._s(e.id))])]),a._v(" "),t("vs-td",[t("p",[a._v(a._s(e.numero_movil))])]),a._v(" "),t("vs-td",[t("p",[a._v(a._s(e.patente))])]),a._v(" "),t("vs-td",[t("p",[a._v(a._s(e.tipo))])])],1)}))}}]),model:{value:a.data_local.moviles,callback:function(e){a.$set(a.data_local,"moviles",e)},expression:"data_local.moviles"}},[t("template",{slot:"header"},[t("span",[a._v("\n                      Seleccione al menos un movil\n                  ")])]),a._v(" "),t("template",{slot:"thead"},[t("vs-th",[a._v("ID")]),a._v(" "),t("vs-th",[a._v("N° Movil")]),a._v(" "),t("vs-th",[a._v("Patente")]),a._v(" "),t("vs-th",[a._v("Tipo")])],1)],2)],1)],1),a._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[t("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[t("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!a.validateForm},on:{click:a.save_changes}},[a._v("Guardar Cambios")])],1),a._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"users"}}},[a._v("Volver")])],1),a._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:a.reset_data}},[a._v("Limpiar")])],1)],1)])])],1)}),[],!1,null,null,null).exports,d=t("6wlp"),c={components:{itemEditSection1:n},data:function(){return{item_data:null,item_data_movil:null,item_not_found:!1,urlApi:"/users/users/"}},watch:{activeTab:function(){this.fetch_item_data(this.$route.params.itemId)}},methods:{fetch_item_data:function(a){var e=this;this.$store.dispatch("itemManagement/traerItem",{Id:a,Url:this.urlApi}).then((function(a){e.item_data=a.data.item[0],e.item_data_movil=a.data.itemcars})).catch((function(a){404!==a.response.status?300==a.response.status?e.$vs.notify({title:"Error",text:a.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.item_not_found=!0}))}},created:function(){d.a.isRegistered||(this.$store.registerModule("itemManagement",d.a),d.a.isRegistered=!0),this.fetch_item_data(this.$route.params.itemId)}},m=Object(o.a)(c,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"page-item-edit"}},[t("vs-alert",{attrs:{color:"danger",title:"Usuario no encontrado",active:a.item_not_found},on:{"update:active":function(e){a.item_not_found=e}}},[t("span",[a._v("El usuario con id: "+a._s(a.$route.params.itemId)+" no fue encontrado. ")]),a._v(" "),t("span",[t("span",[a._v("Mira  ")]),t("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"users"}}},[a._v("Todos los usuario")])],1)]),a._v(" "),a.item_data?t("vx-card",[t("item-edit-section1",{staticClass:"mt-4",attrs:{data:a.item_data,data_movil:a.item_data_movil}})],1):a._e()],1)}),[],!1,null,null,null);e.default=m.exports}}]);