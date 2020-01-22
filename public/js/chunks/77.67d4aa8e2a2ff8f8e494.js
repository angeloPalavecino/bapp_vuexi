(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{"6wlp":function(a,t,e){"use strict";var i=e("bJaO");function s(a){if(null==a)throw new TypeError("Cannot destructure undefined")}var l={agregarItem:function(a,t){return s(a),new Promise((function(a,e){i.a.post("/api/v1"+t.Url+"store",t.item).then((function(t){a(t)})).catch((function(a){e(a)}))}))},editarItem:function(a,t){return s(a),new Promise((function(a,e){var s="";s=t.item.id?t.Url+t.item.id:t.Url,i.a.put("/api/v1"+s,t.item).then((function(t){a(t)})).catch((function(a){e(a)}))}))},traerItems:function(a,t){var e=a.commit;return new Promise((function(a,s){i.a.get("/api/v1"+t).then((function(t){e("SET_ITEMS",t.data.items),a(t)})).catch((function(a){s(a)}))}))},traerItem:function(a,t){return s(a),new Promise((function(a,e){i.a.get("/api/v1"+t.Url+"".concat(t.Id)).then((function(t){a(t)})).catch((function(a){e(a)}))}))},borrarItem:function(a,t){var e=a.commit;return new Promise((function(a,s){i.a.delete("/api/v1"+t.Url+"".concat(t.Id)).then((function(i){e("REMOVE_RECORD",t.Id),a(i)})).catch((function(a){s(a)}))}))},borrarMasivoItem:function(a,t){var e=a.commit;return new Promise((function(a,s){i.a.post("/api/v1"+t.Url+"borrar",t.Items).then((function(i){e("REMOVE_MASSIVE_RECORD",t.Items),a(i)})).catch((function(a){s(a)}))}))}};t.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(a,t){a.items=t},REMOVE_RECORD:function(a,t){var e=a.items.findIndex((function(a){return a.id==t}));a.items.splice(e,1)},REMOVE_MASSIVE_RECORD:function(a,t){t.forEach((function(t){var e=a.items.findIndex((function(a){return a.id==t.id}));a.items.splice(e,1)}))}},actions:l,getters:{}}},aMxY:function(a,t,e){"use strict";e.r(t);var i=e("Snq/"),s=e.n(i),l=e("bJaO"),r=e("e7F3"),o=e("w48C"),n=e.n(o);e("CVKz");r.a.localize("en",{custom:{horario:{required:"El horario es requerido"},tipo:{required:"El tipo es requerido"},tipo_fecha:{required:"El periodo es requerido"},meses:{required:"Debe seleccionar al menos un mes"},ano:{required:"Debe seleccionar el año"},periodos_fecha_dias:{required:"Debe seleccionar al menos un dia"}}});var c={components:{vSelect:s.a,flatPickr:n.a},props:{data:{type:Object,required:!0}},data:function(){return{urlApi:"/agendamientos/agendamientos/",data_local:{id:this.data.id?this.data.id:null,codificacion_id:this.data.codificacion_id?this.data.codificacion_id:null,empresa_id:this.data.empresa_id?this.data.empresa_id:null,sucursal_id:this.data.sucursal_id?this.data.sucursal_id:null,mes:this.data.mes?this.data.mes:null,ano:this.data.ano?this.data.ano:null,tipo:this.data.tipo?this.data.tipo:null,fecha:this.data.fecha_inicio?this.data.fecha_inicio:null,tipo_fecha:this.data.tipo_fecha?this.data.tipo_fecha:null,horario:this.data.horario_id?this.data.horario_id:null,rut:this.data.rut?this.data.rut:null,nombre:this.data.nombre?this.data.nombre:null,apellido:this.data.apellido?this.data.apellido:null,comuna:this.data.comuna?this.data.comuna:null,direccion:this.data.direccion?this.data.direccion:null,email:this.data.email?this.data.email:null,telefono:this.data.telefono?this.data.telefono:null,centro_costo:this.data.centro_costo?this.data.centro_costo:null},empresasOptions:[],sucursalesOptions:[],horariosOptions:[],tipoOptions:[{label:"Zarpe",value:"Zarpe"},{label:"Recogida",value:"Recogida"}],tipofechaOptions:[{label:"Diario",value:1},{label:"Mensual",value:2},{label:"Permanente",value:3}],anosOptions:[{label:"2020",value:2020},{label:"2021",value:2021},{label:"2022",value:2022},{label:"2023",value:2023},{label:"2024",value:2024},{label:"2025",value:2025},{label:"2026",value:2026},{label:"2027",value:2027},{label:"2028",value:2028},{label:"2029",value:2029},{label:"2030",value:2030},{label:"2031",value:2031},{label:"2032",value:2032},{label:"2033",value:2033},{label:"2034",value:2034},{label:"2035",value:2035},{label:"2036",value:2036},{label:"2037",value:2037}],mesesOptions:[{label:"Enero",value:1},{label:"Febrero",value:2},{label:"Marzo",value:3},{label:"Abril",value:4},{label:"Mayo",value:5},{label:"Junio",value:6},{label:"Julio",value:7},{label:"Agosto",value:8},{label:"Septiembre",value:9},{label:"Octubre",value:10},{label:"Noviembre",value:11},{label:"Diciembre",value:12}],configDiasdateTimePicker:{maxDate:"2037-12-31",dateFormat:"Y/m/d",mode:"single"}}},watch:{empresa:function(a){this.data_local.sucursal_id=null,this.data_local.horario=null,this.sucursalesOptions=[],this.horariosOptions=[],this.traeSucursales(a)},sucursal:function(a){this.data_local.horario=null,this.horariosOptions=[],this.traeHorarios(a)}},computed:{validateForm:function(){return!this.errors.any()},sucursal:function(){return this.data_local.sucursal_id},empresa:function(){return this.data_local.empresa_id}},mounted:function(){this.traeOtrosDatos(),this.traeSucursales(this.data_local.empresa_id),this.traeHorarios(this.data_local.sucursal_id)},methods:{save_changes:function(){var a=this;this.$validator.validateAll().then((function(t){t&&a.$store.dispatch("itemManagement/editarItem",{item:a.data_local,Url:a.urlApi}).then((function(){a.$router.push({name:"agendamientos"}),a.showDeleteSuccess()})).catch((function(t){var e=300==t.response.status?t.response.data.message:t;a.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={id:this.data.id?this.data.id:null,codificacion_id:this.data.codificacion_id?this.data.codificacion_id:null,empresa_id:this.data.empresa_id?this.data.empresa_id:null,sucursal_id:this.data.sucursal_id?this.data.sucursal_id:null,mes:this.data.mes?this.data.mes:null,ano:this.data.ano?this.data.ano:null,tipo:this.data.tipo?this.data.tipo:null,fecha:this.data.fecha_inicio?this.data.fecha_inicio:null,tipo_fecha:this.data.tipo_fecha?this.data.tipo_fecha:null,horario:this.data.horario_id?this.data.horario_id:null,rut:this.data.rut?this.data.rut:null,nombre:this.data.nombre?this.data.nombre:null,apellido:this.data.apellido?this.data.apellido:null,comuna:this.data.comuna?this.data.comuna:null,direccion:this.data.direccion?this.data.direccion:null,email:this.data.email?this.data.email:null,telefono:this.data.telefono?this.data.telefono:null,centro_costo:this.data.centro_costo?this.data.centro_costo:null},this.errors.clear()},traeHorarios:function(a){var t=this;a>0?l.a.get("/api/v1/horarios/combo/"+a).then((function(a){t.horariosOptions=a.data.items})).catch((function(a){var e=300==a.response.status?a.response.data.message:a;t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})):this.horariosOptions=[]},traeSucursales:function(a){var t=this;a>1?l.a.get("/api/v1/sucursal/combo/"+a).then((function(a){t.sucursalesOptions=a.data.items})).catch((function(a){var e=300==a.response.status?a.response.data.message:a;t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})):this.sucursalesOptions=[]},traeOtrosDatos:function(){var a=this;l.a.get("/api/v1/empresas/listemp").then((function(t){a.empresasOptions=t.data.items})).catch((function(t){var e=300==t.response.status?t.response.data.message:t;a.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}}},d=e("KHd+"),u=Object(d.a)(c,(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"item-edit"}},[e("div",{staticClass:"vx-row mt-6"},[e("vs-divider",{attrs:{color:"primary"}},[e("h5",[a._v("Datos Agendamiento")])]),a._v(" "),e("div",{staticClass:"vx-col w-full mt-2",attrs:{id:"account-info-col-1"}},[e("vs-table",{attrs:{hoverFlat:"",noDataText:""}},[e("vs-tr",[e("vs-th",[a._v("Rut")]),a._v(" "),e("vs-td",[a._v(a._s(a.data_local.rut))]),a._v(" "),e("vs-th",[a._v("Email")]),a._v(" "),e("vs-td",[a._v(a._s(a.data_local.email))])],1),a._v(" "),e("vs-tr",[e("vs-th",[a._v("Nombre")]),a._v(" "),e("vs-td",[a._v(a._s(a.data_local.nombre)+" "+a._s(a.data_local.apellido))]),a._v(" "),e("vs-th",[a._v("Telefono")]),a._v(" "),e("vs-td",[a._v(a._s(a.data_local.telefono))])],1),a._v(" "),e("vs-tr",[e("th",[a._v("Direccion")]),a._v(" "),e("td",[a._v(a._s(a.data_local.direccion)+" "+a._s(a.data_local.comuna))]),a._v(" "),e("th",[a._v("Centro de costo")]),a._v(" "),e("td",[a._v(a._s(a.data_local.centro_costo))])])],1)],1),a._v(" "),e("br"),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-select",{ref:"empresas",staticClass:"w-full p-1",attrs:{label:"Empresas",name:"empresa",dir:a.$vs.rtl?"rtl":"ltr",disabled:"true"},model:{value:a.data_local.empresa_id,callback:function(t){a.$set(a.data_local,"empresa_id",t)},expression:"data_local.empresa_id"}},a._l(a.empresasOptions,(function(a){return e("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.razon_social}})})),1)],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-select",{ref:"sucursal",staticClass:"w-full p-1",attrs:{label:"Sucursales",name:"sucursal",dir:a.$vs.rtl?"rtl":"ltr",disabled:"true"},model:{value:a.data_local.sucursal_id,callback:function(t){a.$set(a.data_local,"sucursal_id",t)},expression:"data_local.sucursal_id"}},a._l(a.sucursalesOptions,(function(a){return e("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.nombre}})})),1)],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"horario",staticClass:"w-full p-1",attrs:{label:"Horarios",name:"horario",dir:a.$vs.rtl?"rtl":"ltr",disabled:!(a.sucursal>0),danger:!!a.errors.first("horario"),"danger-text":a.errors.first("horario")?a.errors.first("horario"):""},model:{value:a.data_local.horario,callback:function(t){a.$set(a.data_local,"horario",t)},expression:"data_local.horario"}},a._l(a.horariosOptions,(function(a){return e("vs-select-item",{key:a.id,attrs:{value:a.id,text:a.label}})})),1)],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"tipo",staticClass:"w-full p-1",attrs:{label:"Tipo",name:"tipo",dir:a.$vs.rtl?"rtl":"ltr",danger:!!a.errors.first("tipo"),"danger-text":a.errors.first("tipo")?a.errors.first("tipo"):""},model:{value:a.data_local.tipo,callback:function(t){a.$set(a.data_local,"tipo",t)},expression:"data_local.tipo"}},a._l(a.tipoOptions,(function(a){return e("vs-select-item",{key:a.value,attrs:{value:a.value,text:a.label}})})),1)],1),a._v(" "),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[e("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"tipo_fecha",staticClass:"w-full p-1",attrs:{label:"Periodo",name:"tipo_fecha",dir:a.$vs.rtl?"rtl":"ltr",danger:!!a.errors.first("tipo_fecha"),"danger-text":a.errors.first("tipo_fecha")?a.errors.first("tipo_fecha"):"",disabled:"true"},model:{value:a.data_local.tipo_fecha,callback:function(t){a.$set(a.data_local,"tipo_fecha",t)},expression:"data_local.tipo_fecha"}},a._l(a.tipofechaOptions,(function(a){return e("vs-select-item",{key:a.value,attrs:{value:a.value,text:a.label}})})),1)],1),a._v(" "),1===a.data_local.tipo_fecha?e("div",{staticClass:"vx-col md:w-1/2 w-full mt-3"},[e("span",{staticClass:"text-sm"},[a._v("Fecha")]),a._v(" "),e("flat-pickr",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{config:a.configDiasdateTimePicker,placeholder:"Seleccione los dias",name:"periodos_fecha_dias"},model:{value:a.data_local.fecha,callback:function(t){a.$set(a.data_local,"fecha",t)},expression:"data_local.fecha"}}),a._v(" "),e("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("periodos_fecha_dias")))])],1):a._e(),a._v(" "),2===a.data_local.tipo_fecha?e("div",{staticClass:"vx-col md:w-1/4 w-full mt-2"},[e("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"ano",staticClass:"w-full p-1",attrs:{label:"Año",name:"ano",dir:a.$vs.rtl?"rtl":"ltr",danger:!!a.errors.first("ano"),"danger-text":a.errors.first("ano")?a.errors.first("ano"):""},model:{value:a.data_local.ano,callback:function(t){a.$set(a.data_local,"ano",t)},expression:"data_local.ano"}},a._l(a.anosOptions,(function(a){return e("vs-select-item",{key:a.value,attrs:{value:a.value,text:a.label}})})),1)],1):a._e(),a._v(" "),2===a.data_local.tipo_fecha?e("div",{staticClass:"vx-col md:w-1/4 w-full mt-2"},[e("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"meses",staticClass:"w-full p-1",attrs:{autocomplete:"",label:"Meses",name:"meses",dir:a.$vs.rtl?"rtl":"ltr",danger:!!a.errors.first("meses"),"danger-text":a.errors.first("meses")?a.errors.first("meses"):""},model:{value:a.data_local.mes,callback:function(t){a.$set(a.data_local,"mes",t)},expression:"data_local.mes"}},a._l(a.mesesOptions,(function(a){return e("vs-select-item",{key:a.value,attrs:{value:a.value,text:a.label}})})),1)],1):a._e()],1),a._v(" "),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col w-full"},[e("div",{staticClass:"mt-8 flex flex-wrap items-center justify-end"},[e("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[e("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!a.validateForm},on:{click:a.save_changes}},[a._v("Guardar Cambios")])],1),a._v(" "),e("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[e("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"agendamientos"}}},[a._v("Volver")])],1),a._v(" "),e("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[e("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:a.reset_data}},[a._v("Limpiar")])],1)],1)])])])}),[],!1,null,null,null).exports,v=e("6wlp"),m={components:{itemEditSection1:u},data:function(){return{item_data:null,item_not_found:!1,urlApi:"/agendamientos/agendamientos/"}},watch:{activeTab:function(){this.fetch_item_data(this.$route.params.itemId)}},methods:{fetch_item_data:function(a){var t=this;this.$store.dispatch("itemManagement/traerItem",{Id:a,Url:this.urlApi}).then((function(a){if(t.item_data=a.data.item,2===t.item_data.tipo_fecha){var e=new Date(a.data.item.fecha_inicio);t.item_data.ano=e.getFullYear(),t.item_data.mes=e.getMonth()+1}})).catch((function(a){404!==a.response.status?300==a.response.status?t.$vs.notify({title:"Error",text:a.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):t.item_not_found=!0}))}},created:function(){v.a.isRegistered||(this.$store.registerModule("itemManagement",v.a),v.a.isRegistered=!0),this.fetch_item_data(this.$route.params.itemId)}},h=Object(d.a)(m,(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"page-item-edit"}},[e("vs-alert",{attrs:{color:"danger",title:"Empresa no encontrada",active:a.item_not_found},on:{"update:active":function(t){a.item_not_found=t}}},[e("span",[a._v("La empresa con id: "+a._s(a.$route.params.itemId)+" no fue encontrada. ")]),a._v(" "),e("span",[e("span",[a._v("Mira  ")]),e("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"empresas"}}},[a._v("Todos las empresas")])],1)]),a._v(" "),a.item_data?e("vx-card",[e("item-edit-section1",{staticClass:"mt-4",attrs:{data:a.item_data}})],1):a._e()],1)}),[],!1,null,null,null);t.default=h.exports}}]);