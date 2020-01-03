(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{"8bDd":function(a,e,t){"use strict";t.r(e);var s=t("Snq/"),i=t.n(s),r=(t("bJaO"),t("e7F3")),c=t("LuQd"),o=(t("2pMc"),t("w48C")),l=t.n(o);t("CVKz");function n(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}r.a.localize("en",{custom:{razon_social:{required:"El nombre es requerido"},rut:{required:"El rut es requerido",numeric:"Debe ingresar solo numeros"},dv:{required:"El digito verificador es requerido",max:"Debe ingresar solo 1 caracter"},fecha_incorporacion:{required:"La fecha de incorporacion es requerido"},responsable_nombre:{required:"El nombre es requerido"},responsable_telefono:{required:"El telefono es requerido",numeric:"El numero de telefono debe ser valido"},responsable_email:{required:"El email es requerido",email:"Ingrese un email valido"},responsable_cantidad:{required:"Debe ingresar al menos un responsable",min:"Debe ingresar al menos un responsable"},sucursal_nombre:{required:"El nombre es requerido"},sucursal_direccion:{required:"La direccion es requerido"},sucursal_cantidad:{required:"Debe ingresar al menos una sucursal",min:"Debe ingresar al menos una sucursal"},cicprod_tipo:{required:"El tipo es requerido"},cicprod_desde:{required:"El campo es requerido",numeric:"Debe ingresar solo numeros"},cicprod_hasta:{required:"El campo es requerido",numeric:"Debe ingresar solo numeros"},cicfac_tipo:{required:"El tipo es requerido"},cicfac_desde:{required:"El campo es requerido",numeric:"Debe ingresar solo numeros"},cicfac_hasta:{required:"El campo es requerido",numeric:"Debe ingresar solo numeros"}}});var d={components:{vSelect:i.a,FormWizard:c.FormWizard,TabContent:c.TabContent,flatPickr:l.a},props:{data:{type:Object,required:!0},data_responsables:{type:Array,required:!0},data_sucursales:{type:Array,required:!0},data_cicfacturacion:{type:Object,required:!0},data_cicproduccion:{type:Object,required:!0}},data:function(){var a;return{urlApi:"/empresas/empresas/",email:null,telefono:null,data_local:(a={rut:this.data.rut?this.data.rut:null,dv:this.data.dv?this.data.dv:null,razon_social:this.data.razon_social?this.data.razon_social:null},n(a,"rut",this.data.rut?this.data.rut:null),n(a,"giro",this.data.giro?this.data.giro:null),n(a,"habilitado",this.data.habilitado),n(a,"fecha_incorporacion",this.data.fecha_incorporacion?this.data.fecha_incorporacion:null),n(a,"id",this.data.id?this.data.id:null),a),cicloProduccionOptions:[{text:"Por defecto (Mes Completo)",value:31},{text:"Personalizado",value:0}],ciclofacturacionOptions:[{text:"Por 15 dias",value:15},{text:"Por 30 dias",value:30},{text:"Por 90 dias",value:90},{text:"Personalizado",value:0}],responsable:{},responsables:this.data_responsables,cantidadResponsables:this.data_responsables.length,sucursal:{matriz:0},sucursales:this.data_sucursales,cantidadSucursales:this.data_sucursales.length,ciclofacturacion:{id:this.data_cicfacturacion.id?this.data_cicfacturacion.id:null,empresa_id:this.data_cicfacturacion.empresa_id?this.data_cicfacturacion.empresa_id:null,inicio:this.data_cicfacturacion.inicio?this.data_cicfacturacion.inicio:null,fin:this.data_cicfacturacion.fin?this.data_cicfacturacion.fin:null,dias:this.data_cicfacturacion.dias},disabledcicfac:0!==this.data_cicfacturacion.dias,cicloproduccion:{id:this.data_cicproduccion.id?this.data_cicproduccion.id:null,empresa_id:this.data_cicproduccion.empresa_id?this.data_cicproduccion.empresa_id:null,inicio:this.data_cicproduccion.inicio?this.data_cicproduccion.inicio:null,fin:this.data_cicproduccion.fin?this.data_cicproduccion.fin:null,dias:this.data_cicproduccion.dias},disabledcicpro:0!==this.data_cicproduccion.dias}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){this.autocomplete=new google.maps.places.Autocomplete(this.$refs.autocomplete,{types:["geocode"]}),this.autocomplete.addListener("place_changed",this.asignaDireccion)},methods:{asignaDireccion:function(){this.sucursal.direccion=this.autocomplete.getPlace().formatted_address},eliminarSucursal:function(a,e){this.sucursales.splice(a,1)},editarSucursal:function(a,e){this.sucursal={id:e.id,empresa_id:e.empresa_id,nombre:e.nombre,direccion:e.direccion,matriz:e.matriz,lat:e.lat,lng:e.lng}},limpiarSucursal:function(){this.sucursal={},this.errors.clear()},guardarSucursal:function(){var a=this;this.$validator.validateAll("suc").then((function(e){if(e){if(1===a.sucursal.matriz||!0===a.sucursal.matriz)for(var t in a.sucursales)a.sucursales[t].matriz=!1;if(a.sucursal.id>=0){var s=a.sucursales.findIndex((function(e){return e.id==a.sucursal.id}));a.sucursales.splice(s,1,a.sucursal),a.cantidadSucursales=a.sucursales.length,a.sucursal={matriz:0}}else a.sucursales.push(a.sucursal),a.cantidadSucursales=a.sucursales.length,a.sucursal={matriz:0}}}))},editarResponsable:function(a,e){this.responsable={id:e.id,empresa_id:e.empresa_id,name:e.name,email:e.email,telefono:e.telefono}},eliminarResponsable:function(a,e){this.responsables.splice(a,1)},limpiarResponsable:function(){this.responsable={},this.errors.clear()},guardarResponsable:function(){var a=this;this.$validator.validateAll("res").then((function(e){if(e)if(a.responsable.id>=0){var t=a.responsables.findIndex((function(e){return e.id==a.responsable.id}));a.responsables.splice(t,1,a.responsable),a.cantidadResponsables=a.responsables.length,a.responsable={}}else a.responsables.push(a.responsable),a.cantidadResponsables=a.responsables.length,a.responsable={}}))},changecicprod:function(a){0===this.cicloproduccion.dias?this.disabledcicpro=!1:(this.disabledcicpro=!0,this.cicloproduccion.inicio=1,this.cicloproduccion.fin=1,this.errors.clear())},changecicfac:function(a){0===this.ciclofacturacion.dias?this.disabledcicfac=!1:(this.disabledcicfac=!0,this.ciclofacturacion.inicio=1,this.ciclofacturacion.fin=1,this.errors.clear())},validateStep1:function(){var a=this;return new Promise((function(e,t){a.$validator.validateAll("step-1").then((function(a){a?e(!0):t("correct all values")}))}))},validateStep2:function(){var a=this;return new Promise((function(e,t){a.$validator.validateAll("step-2").then((function(a){a?e(!0):t("correct all values")}))}))},validateStep3:function(){var a=this;return new Promise((function(e,t){a.$validator.validateAll("step-3").then((function(a){a?e(!0):t("correct all values")}))}))},validateStep4:function(){var a=this;return new Promise((function(e,t){a.$validator.validateAll("step-4").then((function(s){s?(a.save_changes(),e(!0)):t("correct all values")}))}))},save_changes:function(){var a=this;this.$validator.validateAll().then((function(e){e&&(a.datos=[],a.datos.push(a.data_local),a.datos.push(a.responsables),a.datos.push(a.sucursales),a.datos.push(a.ciclofacturacion),a.datos.push(a.cicloproduccion),a.$store.dispatch("itemManagement/editarItem",{item:a.datos,Url:a.urlApi+a.data_local.id}).then((function(){a.$router.push({name:"empresas"}),a.showDeleteSuccess()})).catch((function(e){var t=300==e.response.status?e.response.data.message:e;a.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){var a;this.data_local=(n(a={rut:this.data.rut?this.data.rut:null,dv:this.data.dv?this.data.dv:null,razon_social:this.data.razon_social?this.data.razon_social:null},"rut",this.data.rut?this.data.rut:null),n(a,"giro",this.data.giro?this.data.giro:null),n(a,"habilitado",this.data.habilitado),n(a,"fecha_incorporacion",this.data.fecha_incorporacion?this.data.fecha_incorporacion:null),n(a,"id",this.data.id?this.data.id:null),a),this.responsable={},this.responsables=this.data_responsables,this.cantidadResponsables=this.data_responsables.length,this.sucursal={matriz:0},this.sucursales=this.data_sucursales,this.cantidadSucursales=this.data_sucursales.length,this.ciclofacturacion={id:this.data_cicfacturacion.id?this.data_cicfacturacion.id:null,empresa_id:this.data_cicfacturacion.empresa_id?this.data_cicfacturacion.empresa_id:null,inicio:this.data_cicfacturacion.inicio?this.data_cicfacturacion.inicio:null,fin:this.data_cicfacturacion.fin?this.data_cicfacturacion.fin:null,dias:this.data_cicfacturacion.dias},this.disabledcicfac=0!==this.data_cicfacturacion.dias,this.cicloproduccion={id:this.data_cicproduccion.id?this.data_cicproduccion.id:null,empresa_id:this.data_cicproduccion.empresa_id?this.data_cicproduccion.empresa_id:null,inicio:this.data_cicproduccion.inicio?this.data_cicproduccion.inicio:null,fin:this.data_cicproduccion.fin?this.data_cicproduccion.fin:null,dias:this.data_cicproduccion.dias},this.disabledcicpro=0!==this.data_cicproduccion.dias,this.$refs.wizard.reset(),this.errors.clear()}}},u=t("KHd+"),v=Object(u.a)(d,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"item-edit"}},[t("div",{staticClass:"mt-6 mb-5"},[t("form-wizard",{ref:"wizard",staticClass:"mt-6 ",attrs:{color:"rgba(var(--vs-primary), 1)",errorColor:"rgba(var(--vs-danger), 1)",title:"ACTUALIZAR EMPRESA",subtitle:"Ingrese todos los campos para actualizar la empresa",finishButtonText:"Actualizar"},scopedSlots:a._u([{key:"footer",fn:function(e){return[t("div",{staticClass:"wizard-footer-left"},[e.activeTabIndex>0?t("vs-button",{style:e.fillButtonStyle,nativeOn:{click:function(a){return e.prevTab()}}},[a._v("Anterior")]):a._e()],1),a._v(" "),t("div",{staticClass:"wizard-footer-right"},[e.isLastStep?t("vs-button",{staticClass:"wizard-footer-right finish-button",style:e.fillButtonStyle,nativeOn:{click:function(a){return e.nextTab()}}},[a._v("\n          Actualizar")]):t("vs-button",{staticClass:"wizard-footer-right",style:e.fillButtonStyle,nativeOn:{click:function(a){return e.nextTab()}}},[a._v("Siguiente")])],1)]}}])},[t("tab-content",{staticClass:"mb-1 mt-2",attrs:{title:"Paso 1",icon:"feather icon-home","before-change":a.validateStep1}},[t("form",{attrs:{"data-vv-scope":"step-1"}},[t("div",[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Datos comerciales")])])],1),a._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{"label-placeholder":"Razon social",name:"razon_social",danger:!!a.errors.first("step-1.razon_social"),"val-icon-danger":"clear","danger-text":a.errors.first("step-1.razon_social")?a.errors.first("step-1.razon_social"):""},model:{value:a.data_local.razon_social,callback:function(e){a.$set(a.data_local,"razon_social",e)},expression:"data_local.razon_social"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{staticClass:"w-full ",attrs:{"label-placeholder":"Giro",name:"giro"},model:{value:a.data_local.giro,callback:function(e){a.$set(a.data_local,"giro",e)},expression:"data_local.giro"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full ",attrs:{"label-placeholder":"Rut",name:"rut",danger:!!a.errors.first("step-1.rut"),"val-icon-danger":"clear","danger-text":a.errors.first("step-1.rut")?a.errors.first("step-1.rut"):""},model:{value:a.data_local.rut,callback:function(e){a.$set(a.data_local,"rut",e)},expression:"data_local.rut"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|max:1",expression:"'required|max:1'"}],staticClass:"w-full md:w-1/2",attrs:{"label-placeholder":"Digito verificador",name:"dv",danger:!!a.errors.first("step-1.dv"),"val-icon-danger":"clear","danger-text":a.errors.first("step-1.dv")?a.errors.first("step-1.dv"):""},model:{value:a.data_local.dv,callback:function(e){a.$set(a.data_local,"dv",e)},expression:"data_local.dv"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-6"},[t("flat-pickr",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full select-large",attrs:{placeholder:"Fecha Incorporacion",name:"fecha_incorporacion"},model:{value:a.data_local.fecha_incorporacion,callback:function(e){a.$set(a.data_local,"fecha_incorporacion",e)},expression:"data_local.fecha_incorporacion"}}),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-1.fecha_incorporacion")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1 w-full mt-2"},[t("label",{staticClass:"vs-input--label "},[a._v("Habilitado")]),a._v(" "),t("br"),a._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:a.data_local.habilitado,callback:function(e){a.$set(a.data_local,"habilitado",e)},expression:"data_local.habilitado"}})],1)])])]),a._v(" "),t("tab-content",{staticClass:"mb-1",attrs:{title:"Paso 2",icon:"feather icon-home","before-change":a.validateStep2}},[t("form",{attrs:{"data-vv-scope":"step-2"}},[t("div",[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Datos responsable")])])],1),a._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col md:w-auto w-full mt-2"},[t("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[t("vs-button",{attrs:{color:"primary","icon-pack":"feather",icon:"icon-user-plus","data-vv-scope":"res"},on:{click:function(e){return e.preventDefault(),a.guardarResponsable()}}})],1)],1),a._v(" "),t("div",{staticClass:"vx-col md:w-auto w-full mt-2"},[t("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[t("vs-button",{attrs:{color:"primary","icon-pack":"feather",icon:"icon-trash"},on:{click:function(e){return e.preventDefault(),a.limpiarResponsable()}}})],1)],1)]),a._v(" "),t("div",{staticClass:"vx-row mt-4"},[t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{"label-placeholder":"Responsable",name:"responsable_nombre","data-vv-scope":"res",danger:!!a.errors.first("res.responsable_nombre"),"val-icon-danger":"clear","danger-text":a.errors.first("res.responsable_nombre")?a.errors.first("res.responsable_nombre"):""},model:{value:a.responsable.name,callback:function(e){a.$set(a.responsable,"name",e)},expression:"responsable.name"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"}],staticClass:"w-full ",attrs:{"label-placeholder":"Telefono",name:"responsable_telefono","data-vv-scope":"res",danger:!!a.errors.first("res.responsable_telefono"),"val-icon-danger":"clear","danger-text":a.errors.first("res.responsable_telefono")?a.errors.first("res.responsable_telefono"):""},model:{value:a.responsable.telefono,callback:function(e){a.$set(a.responsable,"telefono",e)},expression:"responsable.telefono"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full",attrs:{"label-placeholder":"Email",name:"responsable_email","data-vv-scope":"res",danger:!!a.errors.first("res.responsable_email"),"val-icon-danger":"clear","danger-text":a.errors.first("res.responsable_email")?a.errors.first("res.responsable_email"):""},model:{value:a.responsable.email,callback:function(e){a.$set(a.responsable,"email",e)},expression:"responsable.email"}})],1)]),a._v(" "),t("div",{staticClass:"vx-row mt-6"},[t("div",[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Responsables")])])],1),a._v(" "),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:1",expression:"'required|min:1'"}],attrs:{type:"hidden",name:"responsable_cantidad"},model:{value:a.cantidadResponsables,callback:function(e){a.cantidadResponsables=e},expression:"cantidadResponsables"}}),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("step-2.responsable_cantidad"),expression:"errors.has('step-2.responsable_cantidad')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-2.responsable_cantidad")))]),a._v(" "),t("div",{staticClass:"vx-col w-full mt-3"},[t("vs-table",{attrs:{"max-items":"4",pagination:"",data:a.responsables},scopedSlots:a._u([{key:"default",fn:function(e){var s=e.data;return a._l(s,(function(e,s){return t("vs-tr",{key:s},[t("vs-td",[a._v("\n                      "+a._s(e.name)+"\n                    ")]),a._v(" "),t("vs-td",[a._v("\n                       "+a._s(e.email)+"\n                    ")]),a._v(" "),t("vs-td",[a._v("\n                       "+a._s(e.telefono)+"\n                    ")]),a._v(" "),t("vs-td",[t("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[t("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-edit",size:"small"},on:{click:function(t){return a.editarResponsable(s,e)}}})],1)],1),a._v(" "),t("vs-td",[t("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[t("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-trash",size:"small"},on:{click:function(t){return a.eliminarResponsable(s,e)}}})],1)],1)],1)}))}}])},[t("template",{slot:"header"}),a._v(" "),t("template",{slot:"thead"},[t("vs-th",[a._v("\n                     Nombre\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                     Email\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                    Telefono\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                    Editar\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                    Borrar\n                  ")])],1)],2)],1)],1)])]),a._v(" "),t("tab-content",{staticClass:"mb-5",attrs:{title:"Paso 3",icon:"feather icon-map-pin","before-change":a.validateStep3}},[t("form",{attrs:{"data-vv-scope":"step-3"}},[t("div",[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Datos sucursal_direccion")])])],1),a._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col md:w-auto w-full mt-2"},[t("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[t("vs-button",{attrs:{color:"primary","icon-pack":"feather",icon:"icon-plus","data-vv-scope":"suc"},on:{click:function(e){return e.preventDefault(),a.guardarSucursal()}}})],1)],1),a._v(" "),t("div",{staticClass:"vx-col md:w-auto w-full mt-2"},[t("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[t("vs-button",{attrs:{color:"primary","icon-pack":"feather",icon:"icon-trash"},on:{click:function(e){return e.preventDefault(),a.limpiarSucursal()}}})],1)],1)]),a._v(" "),t("div",{staticClass:"vx-row mt-4"},[t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{"label-placeholder":"Nombre",name:"sucursal_nombre","data-vv-scope":"suc",danger:!!a.errors.first("suc.sucursal_nombre"),"val-icon-danger":"clear","danger-text":a.errors.first("suc.sucursal_nombre")?a.errors.first("suc.sucursal_nombre"):""},model:{value:a.sucursal.nombre,callback:function(e){a.$set(a.sucursal,"nombre",e)},expression:"sucursal.nombre"}})],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-4"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"hidden","data-vv-scope":"suc",name:"sucursal_direccion"},model:{value:a.sucursal.direccion,callback:function(e){a.$set(a.sucursal,"direccion",e)},expression:"sucursal.direccion"}}),a._v(" "),t("div",{staticClass:"vs-component vs-con-input-label vs-input mt-3 w-full vs-input-primary is-label-placeholder"},[t("div",{staticClass:"vs-con-input"},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.sucursal.direccion,expression:"sucursal.direccion"}],ref:"autocomplete",class:a.sucursal.direccion?"vs-inputx vs-input--input normal hasValue":"vs-inputx vs-input--input normal",style:a.errors.first("suc.sucursal_direccion")?"border: 1px solid rgba(var(--vs-danger),1)!important;":"border: 1px solid rgba(0, 0, 0, 0.2);",attrs:{type:"text",required:"",name:"sucursal_direccion",placeholder:""},domProps:{value:a.sucursal.direccion},on:{input:function(e){e.target.composing||a.$set(a.sucursal,"direccion",e.target.value)}}}),a._v(" "),t("span",{staticClass:"input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"},[a._v("\n      Direccion\n    ")]),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.first("suc.sucursal_direccion"),expression:"errors.first('suc.sucursal_direccion')"}],staticClass:"input-icon-validate vs-input--icon-validate",staticStyle:{background:"rgba(var(--vs-danger),.2)"}},[t("i",{staticClass:"vs-icon notranslate icon-scale material-icons null",staticStyle:{color:"rgba(var(--vs-danger),1)"},attrs:{valiconpack:"material-icons"}},[a._v("clear")])])]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.errors.first("suc.sucursal_direccion"),expression:"errors.first('suc.sucursal_direccion')"}],staticClass:"con-text-validation span-text-validation-danger \n              vs-input--text-validation-span v-enter-to",staticStyle:{height:"20px"}},[t("span",{staticClass:"span-text-validation"},[a._v("\n                    "+a._s(a.errors.first("suc.sucursal_direccion"))+"\n                    ")])])])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[t("label",{staticClass:"vs-input--label "},[a._v("Matriz")]),a._v(" "),t("vs-switch",{staticClass:"mt-2",model:{value:a.sucursal.matriz,callback:function(e){a.$set(a.sucursal,"matriz",e)},expression:"sucursal.matriz"}})],1)]),a._v(" "),t("div",{staticClass:"vx-row mt-6"},[t("div",[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Sucursales")])])],1),a._v(" "),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:1",expression:"'required|min:1'"}],attrs:{type:"hidden",name:"sucursal_cantidad"},model:{value:a.cantidadSucursales,callback:function(e){a.cantidadSucursales=e},expression:"cantidadSucursales"}}),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("step-3.sucursal_cantidad"),expression:"errors.has('step-3.sucursal_cantidad')"}],staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-3.sucursal_cantidad")))]),a._v(" "),t("div",{staticClass:"vx-col w-full mt-3"},[t("vs-table",{attrs:{"max-items":"4",pagination:"",data:a.sucursales},scopedSlots:a._u([{key:"default",fn:function(e){var s=e.data;return a._l(s,(function(e,s){return t("vs-tr",{key:s},[t("vs-td",[a._v("\n                      "+a._s(e.nombre)+"\n                   ")]),a._v(" "),t("vs-td",[a._v("\n                       "+a._s(e.direccion)+"\n                    ")]),a._v(" "),t("vs-td",[a._v("\n                       "+a._s(1===e.matriz||!0===e.matriz?"Si":"No")+"\n                    ")]),a._v(" "),t("vs-td",[t("vx-tooltip",{attrs:{color:"primary",text:"Editar"}},[t("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-edit",size:"small"},on:{click:function(t){return a.editarSucursal(s,e)}}})],1)],1),a._v(" "),t("vs-td",[t("vx-tooltip",{attrs:{color:"primary",text:"Eliminar"}},[t("vs-button",{staticClass:"ml-3",attrs:{radius:"",color:"primary",type:"border","icon-pack":"feather",icon:"icon-trash",size:"small"},on:{click:function(t){return a.eliminarSucursal(s,e)}}})],1)],1)],1)}))}}])},[t("template",{slot:"header"}),a._v(" "),t("template",{slot:"thead"},[t("vs-th",[a._v("\n                     Nombre\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                     Direccion\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                    Matriz\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                    Editar\n                  ")]),a._v(" "),t("vs-th",[a._v("\n                    Borrar\n                  ")])],1)],2)],1)],1)])]),a._v(" "),t("tab-content",{staticClass:"mb-5",attrs:{title:"Paso 4",icon:"feather icon-refresh-cw","before-change":a.validateStep4}},[t("form",{attrs:{"data-vv-scope":"step-4"}},[t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("div",[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Ciclo produccion")])])],1),a._v(" "),t("div",{staticClass:"vx-col w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full select-large",attrs:{label:"Tipo",name:"cicprod_tipo"},on:{input:a.changecicprod},model:{value:a.cicloproduccion.dias,callback:function(e){a.$set(a.cicloproduccion,"dias",e)},expression:"cicloproduccion.dias"}},a._l(a.cicloProduccionOptions,(function(a,e){return t("vs-select-item",{key:e,staticClass:"w-full",attrs:{value:a.value,text:a.text}})})),1),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-4.cicprod_tipo")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2  w-full mt-2"},[t("span",{staticClass:" text-sm"},[a._v("Desde")]),a._v(" "),t("vs-input-number",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"cicprod_desde",min:"1",max:"31","icon-inc":"expand_less","icon-dec":"expand_more",disabled:a.disabledcicpro},model:{value:a.cicloproduccion.inicio,callback:function(e){a.$set(a.cicloproduccion,"inicio",e)},expression:"cicloproduccion.inicio"}}),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-4.cicprod_desde")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("span",{staticClass:" text-sm"},[a._v("Hasta")]),a._v(" "),t("vs-input-number",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"cicprod_hasta",min:"1",max:"31","icon-inc":"expand_less","icon-dec":"expand_more",disabled:a.disabledcicpro},model:{value:a.cicloproduccion.fin,callback:function(e){a.$set(a.cicloproduccion,"fin",e)},expression:"cicloproduccion.fin"}}),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-4.cicprod_hasta")))])],1)]),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("div",[t("vs-divider",{attrs:{color:"primary"}},[t("h5",[a._v("Ciclo facturacion")])])],1),a._v(" "),t("div",{staticClass:"vx-col  w-full mt-2"},[t("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full select-large",attrs:{label:"Tipo",name:"cicfac_tipo"},on:{input:a.changecicfac},model:{value:a.ciclofacturacion.dias,callback:function(e){a.$set(a.ciclofacturacion,"dias",e)},expression:"ciclofacturacion.dias"}},a._l(a.ciclofacturacionOptions,(function(a,e){return t("vs-select-item",{key:e,staticClass:"w-full",attrs:{value:a.value,text:a.text}})})),1),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-4.cicfac_tipo")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2  w-full mt-2"},[t("span",{staticClass:" text-sm"},[a._v("Desde")]),a._v(" "),t("vs-input-number",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"cicfac_desde",min:"1",max:"31","icon-inc":"expand_less","icon-dec":"expand_more",disabled:a.disabledcicfac},model:{value:a.ciclofacturacion.inicio,callback:function(e){a.$set(a.ciclofacturacion,"inicio",e)},expression:"ciclofacturacion.inicio"}}),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-5.cicfac_desde")))])],1),a._v(" "),t("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[t("span",{staticClass:" text-sm"},[a._v("Hasta")]),a._v(" "),t("vs-input-number",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"cicfac_hasta",min:"1",max:"31","icon-inc":"expand_less","icon-dec":"expand_more",disabled:a.disabledcicfac},model:{value:a.ciclofacturacion.fin,callback:function(e){a.$set(a.ciclofacturacion,"fin",e)},expression:"ciclofacturacion.fin"}}),a._v(" "),t("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("step-5.cicfac_hasta")))])],1)])])])])],1)],1),a._v(" "),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-full"},[t("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[t("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"empresas"}}},[a._v("Volver")])],1),a._v(" "),t("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[t("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:a.reset_data}},[a._v("Limpiar")])],1)],1)])])])}),[],!1,null,null,null).exports,p=t("6wlp"),m={components:{itemEditSection1:v},data:function(){return{item_data:null,item_data_responsables:null,item_data_sucursales:null,item_data_ciclo_facturacion:null,item_data_ciclo_produccion:null,item_not_found:!1,urlApi:"/empresas/empresas/"}},watch:{activeTab:function(){this.fetch_item_data(this.$route.params.itemId)}},methods:{fetch_item_data:function(a){var e=this;this.$store.dispatch("itemManagement/traerItem",{Id:a,Url:this.urlApi}).then((function(a){e.item_data=a.data.item,e.item_data_responsables=a.data.responsables,e.item_data_sucursales=a.data.sucursales,e.item_data_ciclo_facturacion=a.data.cicfac[0],e.item_data_ciclo_produccion=a.data.cicpro[0]})).catch((function(a){404!==a.response.status?300==a.response.status?e.$vs.notify({title:"Error",text:a.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.item_not_found=!0}))}},created:function(){p.a.isRegistered||(this.$store.registerModule("itemManagement",p.a),p.a.isRegistered=!0),this.fetch_item_data(this.$route.params.itemId)}},_=Object(u.a)(m,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"page-item-edit"}},[t("vs-alert",{attrs:{color:"danger",title:"Empresa no encontrada",active:a.item_not_found},on:{"update:active":function(e){a.item_not_found=e}}},[t("span",[a._v("La empresa con id: "+a._s(a.$route.params.itemId)+" no fue encontrada. ")]),a._v(" "),t("span",[t("span",[a._v("Mira  ")]),t("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"empresas"}}},[a._v("Todos las empresas")])],1)]),a._v(" "),a.item_data?t("vx-card",[t("item-edit-section1",{staticClass:"mt-4",attrs:{data:a.item_data,data_responsables:a.item_data_responsables,data_sucursales:a.item_data_sucursales,data_cicfacturacion:a.item_data_ciclo_facturacion,data_cicproduccion:a.item_data_ciclo_produccion}})],1):a._e()],1)}),[],!1,null,null,null);e.default=_.exports}}]);