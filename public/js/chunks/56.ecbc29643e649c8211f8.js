(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{"6wlp":function(t,e,a){"use strict";var s=a("bJaO");function r(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var i={agregarItem:function(t,e){return r(t),new Promise((function(t,a){s.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},editarItem:function(t,e){return r(t),new Promise((function(t,a){var r="";r=e.item.id?e.Url+e.item.id:e.Url,s.a.put("/api/v1"+r,e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},traerItems:function(t,e){var a=t.commit;return new Promise((function(t,r){s.a.get("/api/v1"+e).then((function(e){a("SET_ITEMS",e.data.items),t(e)})).catch((function(t){r(t)}))}))},traerItem:function(t,e){return r(t),new Promise((function(t,a){s.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){a(t)}))}))},borrarItem:function(t,e){var a=t.commit;return new Promise((function(t,r){s.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(s){a("REMOVE_RECORD",e.Id),t(s)})).catch((function(t){r(t)}))}))},borrarMasivoItem:function(t,e){var a=t.commit;return new Promise((function(t,r){s.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(s){a("REMOVE_MASSIVE_RECORD",e.Items),t(s)})).catch((function(t){r(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var a=t.items.findIndex((function(t){return t.id==e}));t.items.splice(a,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var a=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(a,1)}))}},actions:i,getters:{}}},Ymv7:function(t,e){t.exports="/demo/vuexy-vuejs-laravel-admin-template/demo-1/images/sucursal7.png?b150aec62809e814bc49429efb22a978"},kUqM:function(t,e,a){"use strict";a.r(e);var s=a("Snq/"),r=a.n(s),i=a("bJaO");a("e7F3").a.localize("en",{custom:{codigo:{required:"El codigo es requerido"},descripcion:{required:"La descripcion es requerida"},fuerazona:{required:"La fuera de zona es requerido"},sucursal:{required:"La sucursal es requerida"},patrones:{required:"Debe seleccionar al menos un patron"}}});var o={components:{vSelect:r.a},props:{},data:function(){return{urlApi:"/patrones/grupos/",data_local:{fuerazona:0,patrones:[],sucursales:[]},empresa:1,center:{lat:-33.4533624,lng:-70.6642131},zoom:11,map:null,marker:null,markerSuc:null,markersPat:[],markersSuc:[],patronesOptions:[],empresasOptions:[],sucursalesOptions:[],fueraZonaOptions:[{id:0,text:"No"},{id:1,text:"Fuera de zona 1"},{id:2,text:"Fuera de zona 2"},{id:3,text:"Fuera de zona 3"}],tipObj:null,offset:{x:10,y:10}}},watch:{empresa:function(t){this.data_local.sucursales=[],this.clearOverlaysSuc(),this.traeSucursales(t)},patrones:function(t){this.clearOverlaysPat(),this.cargaPatrones(this.data_local.patrones)},sucursales:function(t){this.clearOverlaysSuc(),this.cargaSucursal(this.data_local.sucursales)}},computed:{validateForm:function(){return!this.errors.any()},patrones:function(){return this.data_local.patrones},sucursales:function(){return this.data_local.sucursales}},mounted:function(){this.traeOtrosDatos();var t=this.center,e=this.zoom,a=new google.maps.Map(document.getElementById("map"),{zoom:e,center:t});this.map=a},methods:{traeSucursales:function(t){var e=this;t>1?i.a.get("/api/v1/sucursal/combo/"+t).then((function(t){e.sucursalesOptions=t.data.items})).catch((function(t){var a=300==t.response.status?t.response.data.message:t;e.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})):(this.sucursalesOptions=[],this.data_local.sucursales=[])},traeOtrosDatos:function(){var t=this;i.a.get("/api/v1/patrones/patrones/combo/0").then((function(e){t.patronesOptions=e.data.items})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})),i.a.get("/api/v1/empresas/listemp").then((function(e){t.empresasOptions=e.data.items})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},cargaSucursal:function(t){var e=this,s=this,r=new google.maps.LatLngBounds;t.forEach((function(t,i){var o=e.sucursalesOptions.find((function(e){return e.id===t})),n=parseFloat(o.lat),l=parseFloat(o.lng),c=o.nombre;r.extend(new google.maps.LatLng(n.toFixed(5),l.toFixed(5)));var u=new google.maps.Marker({position:{lat:n,lng:l},infoText:c,title:c,draggable:!1,animation:google.maps.Animation.DROP,icon:{url:a("Ymv7")}});u.setMap(s.map),s.markersSuc.push(u)})),s.map.fitBounds(r)},cargaPatrones:function(t){var e,a=this,s=this,r=new google.maps.LatLngBounds;t.forEach((function(t,i){for(var o=a.patronesOptions.find((function(e){return e.id===t})),n=o.lat,l=o.lng,c=o.color,u=o.id,d=o.descripcion,p=n.split(","),m=l.split(","),f=[],v=0;v<p.length;v++){var h=parseFloat(p[v]),g=parseFloat(m[v]);f[v]=new google.maps.LatLng(h.toFixed(5),g.toFixed(5)),r.extend(f[v])}e=new google.maps.Polygon({paths:f,fillColor:c,fillOpacity:.1,strokeWeight:.8,id:u,name:d,map:s.map}),google.maps.event.addListener(e,"mouseover",(function(t){s.injectTooltip(t,this.name)})),google.maps.event.addListener(e,"mousemove",(function(t){s.moveTooltip(t)})),google.maps.event.addListener(e,"mouseout",(function(t){s.deleteTooltip(t)})),s.markersPat.push(e)})),s.map.fitBounds(r)},clearOverlaysPat:function(){this.markersPat.length>0&&this.markersPat.forEach((function(t,e){t.setMap(null)})),this.markersPat=[]},clearOverlaysSuc:function(){this.markersSuc.length>0&&this.markersSuc.forEach((function(t,e){t.setMap(null)})),this.markersSuc=[]},deleteTooltip:function(t){this.tipObj&&(document.body.removeChild(this.tipObj),this.tipObj=null)},moveTooltip:function(t){this.tipObj&&t&&(this.tipObj.style.top=t.ya.clientY+this.offset.y+"px",this.tipObj.style.left=t.ya.clientX+this.offset.x+"px")},injectTooltip:function(t,e){!this.tipObj&&t&&(this.tipObj=document.createElement("div"),this.tipObj.style.width="100px",this.tipObj.style.height="40px",this.tipObj.style.background="white",this.tipObj.style.borderRadius="5px",this.tipObj.style.padding="10px",this.tipObj.style.fontFamily="Arial,Helvetica",this.tipObj.style.textAlign="center",this.tipObj.style.zIndex="99999",this.tipObj.innerHTML=e,this.tipObj.style.position="fixed",this.tipObj.style.top=t.ya.clientY+this.offset.y+"px",this.tipObj.style.left=t.ya.clientX+this.offset.x+"px",document.body.appendChild(this.tipObj))},save_changes:function(){var t=this;this.$validator.validateAll().then((function(e){e&&t.$store.dispatch("itemManagement/agregarItem",{item:t.data_local,Url:t.urlApi}).then((function(){t.$router.push({name:"gpatrones"}),t.showDeleteSuccess()})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})},reset_data:function(){this.data_local={fuerazona:0,patrones:[],sucursales:[]},this.sucursalesOptions=[],this.empresa=1,this.clearOverlaysPat(),this.clearOverlaysSuc(),this.map&&(this.map.setZoom(this.zoom),this.map.setCenter(this.center)),this.errors.clear()}}},n=a("KHd+"),l=Object(n.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"item-add"}},[a("div",{staticClass:"vx-row mt-6"},[a("vs-divider",{attrs:{color:"primary"}},[a("h5",[t._v("Datos Grupo de patrones")])]),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Codigo",name:"codigo",danger:!!t.errors.first("codigo"),"danger-text":t.errors.first("codigo")?t.errors.first("codigo"):"","val-icon-danger":"clear"},model:{value:t.data_local.codigo,callback:function(e){t.$set(t.data_local,"codigo",e)},expression:"data_local.codigo"}})],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Descripcion",name:"descripcion",danger:!!t.errors.first("descripcion"),"danger-text":t.errors.first("descripcion")?t.errors.first("descripcion"):"","val-icon-danger":"clear"},model:{value:t.data_local.descripcion,callback:function(e){t.$set(t.data_local,"descripcion",e)},expression:"data_local.descripcion"}})],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[a("vs-select",{ref:"empresas",staticClass:"w-full p-1",attrs:{label:"Empresas",name:"empresa",dir:t.$vs.rtl?"rtl":"ltr"},model:{value:t.empresa,callback:function(e){t.empresa=e},expression:"empresa"}},t._l(t.empresasOptions,(function(t){return a("vs-select-item",{key:t.id,attrs:{value:t.id,text:t.razon_social}})})),1)],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[a("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"sucursal",staticClass:"w-full p-1",attrs:{autocomplete:"",multiple:"",label:"Sucursales",name:"sucursal",dir:t.$vs.rtl?"rtl":"ltr",disabled:!(t.empresa>1),danger:!!t.errors.first("sucursal"),"danger-text":t.errors.first("sucursal")?t.errors.first("sucursal"):""},model:{value:t.data_local.sucursales,callback:function(e){t.$set(t.data_local,"sucursales",e)},expression:"data_local.sucursales"}},t._l(t.sucursalesOptions,(function(t){return a("vs-select-item",{key:t.id,attrs:{value:t.id,text:t.nombre}})})),1)],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[a("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{label:"Fuera de Zona",name:"fuerazona",dir:t.$vs.rtl?"rtl":"ltr",danger:!!t.errors.first("fuerazona"),"danger-text":t.errors.first("fuerazon")?t.errors.first("fuerazona"):""},model:{value:t.data_local.fuerazona,callback:function(e){t.$set(t.data_local,"fuerazona",e)},expression:"data_local.fuerazona"}},t._l(t.fueraZonaOptions,(function(t){return a("vs-select-item",{key:t.id,attrs:{value:t.id,text:t.text}})})),1)],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full mt-2"},[a("vs-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"patrones",staticClass:"w-full p-1",attrs:{multiple:"",autocomplete:"",label:"Patrones",name:"patrones",dir:t.$vs.rtl?"rtl":"ltr",danger:!!t.errors.first("patrones"),"danger-text":t.errors.first("patrones")?t.errors.first("patrones"):""},model:{value:t.data_local.patrones,callback:function(e){t.$set(t.data_local,"patrones",e)},expression:"data_local.patrones"}},t._l(t.patronesOptions,(function(t){return a("vs-select-item",{key:t.id,attrs:{value:t.id,text:t.codigo}})})),1)],1),t._v(" "),a("div",{staticClass:"vx-col w-full mt-2"},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"mt-3 flex flex-wrap items-center justify-end"},[a("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[a("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!t.validateForm},on:{click:t.save_changes}},[t._v("Guardar Cambios")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[a("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"gpatrones"}}},[t._v("Volver")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[a("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:t.reset_data}},[t._v("Limpiar")])],1)],1)])])])],1),t._v(" "),a("vx-card",{staticClass:"mb-base mt-4",attrs:{title:"Mapa",collapseAction:""}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"flex flex-wrap items-center"},[a("div",{staticClass:"flex-grow mt-6"},[a("feather-icon",{staticClass:"mr-2 mt-2",attrs:{svgClasses:"w-6 h-6",icon:"MapIcon"}}),t._v(" "),a("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),a("vs-divider")],1)])]),t._v(" "),a("div",{staticClass:"block overflow-x-auto"},[a("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"map"}})])])],1)}),[],!1,null,null,null).exports,c=a("6wlp"),u={components:{itemAddSection1:l},data:function(){return{urlApi:"/patrones/grupos/"}},watch:{},methods:{},created:function(){c.a.isRegistered||(this.$store.registerModule("itemManagement",c.a),c.a.isRegistered=!0)}},d=Object(n.a)(u,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"page-item-add"}},[e("vx-card",[e("item-add-section1",{staticClass:"mt-4"})],1)],1)}),[],!1,null,null,null);e.default=d.exports}}]);