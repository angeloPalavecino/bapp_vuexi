(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{"06xB":function(t,e,a){"use strict";a.r(e);var i,n=a("Snq/"),o=a.n(n),s=a("bJaO");function l(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}a("e7F3").a.localize("en",{custom:{codigo:{required:"El codigo es requerido"},color:{required:"El color es requerido"},descripcion:{required:"La descripcion es requerida"},lat:{required:"El patron es requerido"},lng:{required:"El patron es requerido"}}});var r={components:{vSelect:o.a},props:{data:{type:Object,required:!0}},data:function(){return{urlApi:"/patrones/patrones/",data_local:{id:this.data.id?this.data.id:null,codigo:this.data.codigo?this.data.codigo:null,descripcion:this.data.descripcion?this.data.descripcion:null,color:this.data.color?this.data.color:null,lat:this.data.lat?this.data.lat:null,lng:this.data.lng?this.data.lng:null},autocomplete:null,center:{lat:-33.4533624,lng:-70.6642131},zoom:11,map:null,marker:null,markersPat:[],patronesOptions:[],selectPatrones:[],tipObj:null,offset:{x:10,y:10}}},computed:{validateForm:function(){return!this.errors.any()}},mounted:function(){this.traeOtrosDatos();var t=this.center,e=this.zoom,a="",i="",n=new google.maps.Map(document.getElementById("map"),{zoom:e,center:t});this.map=n;var o=this,s=new google.maps.drawing.DrawingManager({drawingControl:!0,drawingControlOptions:{position:google.maps.ControlPosition.TOP_CENTER,drawingModes:[google.maps.drawing.OverlayType.POLYGON]},polygonOptions:{fillColor:"#ffff00",fillOpacity:.1,strokeWeight:.8,clickable:!1,zIndex:1,editable:!0}});s.setMap(o.map),google.maps.event.addListener(s,"overlaycomplete",(function(t){if(o.element&&(o.element.setMap(null),o.data_local.lat="",o.data_local.lng=""),s.setDrawingMode(null),o.element=t.overlay,t.type==google.maps.drawing.OverlayType.POLYGON){a="",i="";for(var e=0;e<o.element.getPath().getLength();e++)a+=o.element.getPath().getAt(e).lat().toFixed(5)+",",i+=o.element.getPath().getAt(e).lng().toFixed(5)+",";o.data_local.lat=a.substring(0,a.length-1),o.data_local.lng=i.substring(0,i.length-1),google.maps.event.addListener(o.element,"click",(function(t){o.element.getPath().removeAt(t.vertex),a="",i="";for(var e=0;e<o.element.getPath().getLength();e++)a+=o.element.getPath().getAt(e).lat().toFixed(5)+",",i+=o.element.getPath().getAt(e).lng().toFixed(5)+",";o.data_local.lat=a.substring(0,a.length-1),o.data_local.lng=i.substring(0,i.length-1)})),google.maps.event.addListener(o.element.getPath(),"set_at",(function(){a="",i="";for(var t=0;t<o.element.getPath().getLength();t++)a+=o.element.getPath().getAt(t).lat().toFixed(5)+",",i+=o.element.getPath().getAt(t).lng().toFixed(5)+",";o.data_local.lat=a.substring(0,a.length-1),o.data_local.lng=i.substring(0,i.length-1)})),google.maps.event.addListener(o.element.getPath(),"insert_at",(function(){a="",i="";for(var t=0;t<o.element.getPath().getLength();t++)a+=o.element.getPath().getAt(t).lat().toFixed(5)+",",i+=o.element.getPath().getAt(t).lng().toFixed(5)+",";o.data_local.lat=a.substring(0,a.length-1),o.data_local.lng=i.substring(0,i.length-1)}))}})),google.maps.event.addListener(s,"drawingmode_changed",(function(){s.getDrawingMode()==google.maps.drawing.OverlayType.POLYGON&&null!=o.element&&o.element.setMap(null),o.data_local.lat="",o.data_local.lng=""})),this.poligono()},methods:(i={setSelected:function(t){this.clearOverlaysPat(),this.cargaPatrones(this.selectPatrones)},traeOtrosDatos:function(){var t=this;s.a.get("/api/v1/patrones/patrones/combo/"+this.data_local.id).then((function(e){t.patronesOptions=e.data.items})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))},cargaPatrones:function(t){var e,a=this,i=this;t.forEach((function(t,n){for(var o=a.patronesOptions.find((function(e){return e.id===t})),s=o.lat,l=o.lng,r=o.color,c=o.id,d=o.descripcion,u=s.split(","),g=l.split(","),m=[],p=0;p<u.length;p++){var h=parseFloat(u[p]),v=parseFloat(g[p]);m[p]=new google.maps.LatLng(h.toFixed(5),v.toFixed(5))}e=new google.maps.Polygon({paths:m,fillColor:r,fillOpacity:.1,strokeWeight:.8,id:c,name:d,map:i.map}),google.maps.event.addListener(e,"mouseover",(function(t){i.injectTooltip(t,this.name)})),google.maps.event.addListener(e,"mousemove",(function(t){i.moveTooltip(t)})),google.maps.event.addListener(e,"mouseout",(function(t){i.deleteTooltip(t)})),i.markersPat.push(e)}))},clearOverlaysPat:function(){this.markersPat.length>0&&this.markersPat.forEach((function(t,e){t.setMap(null)})),this.markersPat=[]},deleteTooltip:function(t){this.tipObj&&(document.body.removeChild(this.tipObj),this.tipObj=null)},moveTooltip:function(t){this.tipObj&&t&&(this.tipObj.style.top=t.ya.clientY+this.offset.y+"px",this.tipObj.style.left=t.ya.clientX+this.offset.x+"px")},injectTooltip:function(t,e){!this.tipObj&&t&&(this.tipObj=document.createElement("div"),this.tipObj.style.width="100px",this.tipObj.style.height="40px",this.tipObj.style.background="white",this.tipObj.style.borderRadius="5px",this.tipObj.style.padding="10px",this.tipObj.style.fontFamily="Arial,Helvetica",this.tipObj.style.textAlign="center",this.tipObj.style.zIndex="99999",this.tipObj.innerHTML=e,this.tipObj.style.position="fixed",this.tipObj.style.top=t.ya.clientY+this.offset.y+"px",this.tipObj.style.left=t.ya.clientX+this.offset.x+"px",document.body.appendChild(this.tipObj))},poligono:function(){for(var t=this,e="",a="",i=new google.maps.LatLngBounds,n=this.data.lat.split(","),o=this.data.lng.split(","),s=this.data.color,l=[],r=0;r<n.length;r++){var c=parseFloat(n[r]),d=parseFloat(o[r]);l[r]=new google.maps.LatLng(c.toFixed(5),d.toFixed(5)),i.extend(l[r])}t.element=new google.maps.Polygon({paths:l,fillColor:s,fillOpacity:.1,strokeWeight:.8,clickable:!1,zIndex:1,editable:!0}),google.maps.event.addListener(t.element,"click",(function(i){t.element.getPath().removeAt(i.vertex),e="",a="";for(var n=0;n<t.element.getPath().getLength();n++)e+=t.element.getPath().getAt(n).lat().toFixed(5)+",",a+=t.element.getPath().getAt(n).lng().toFixed(5)+",";t.data_local.lat=e.substring(0,e.length-1),t.data_local.lng=a.substring(0,a.length-1)})),google.maps.event.addListener(t.element.getPath(),"set_at",(function(){e="",a="";for(var i=0;i<t.element.getPath().getLength();i++)e+=t.element.getPath().getAt(i).lat().toFixed(5)+",",a+=t.element.getPath().getAt(i).lng().toFixed(5)+",";t.data_local.lat=e.substring(0,e.length-1),t.data_local.lng=a.substring(0,a.length-1)})),google.maps.event.addListener(t.element.getPath(),"insert_at",(function(){e="",a="";for(var i=0;i<t.element.getPath().getLength();i++)e+=t.element.getPath().getAt(i).lat().toFixed(5)+",",a+=t.element.getPath().getAt(i).lng().toFixed(5)+",";t.data_local.lat=e.substring(0,e.length-1),t.data_local.lng=a.substring(0,a.length-1)})),t.element.setMap(t.map),t.map.fitBounds(i)}},l(i,"clearOverlaysPat",(function(){this.markersPat.length>0&&this.markersPat.forEach((function(t,e){t.setMap(null)})),this.markersPat=[]})),l(i,"save_changes",(function(){var t=this;this.$validator.validateAll().then((function(e){e&&t.$store.dispatch("itemManagement/editarItem",{item:t.data_local,Url:t.urlApi}).then((function(){t.$router.push({name:"patrones"}),t.showDeleteSuccess()})).catch((function(e){var a=300==e.response.status?e.response.data.message:e;t.$vs.notify({title:"Error",text:a,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}))}))})),l(i,"showDeleteSuccess",(function(){this.$vs.notify({color:"success",title:"Guardar registros",text:"Los registros se han guardado exitosamente."})})),l(i,"reset_data",(function(){this.data_local={id:this.data.id?this.data.id:null,codigo:this.data.codigo?this.data.codigo:null,descripcion:this.data.descripcion?this.data.descripcion:null,color:this.data.color?this.data.color:null,lat:this.data.lat?this.data.lat:null,lng:this.data.lng?this.data.lng:null},this.element&&(this.element.setMap(null),this.poligono(),this.errors.clear()),this.clearOverlaysPat(),this.selectPatrones=[],this.errors.clear()})),i)},c=a("KHd+"),d=Object(c.a)(r,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"item-edit"}},[a("div",{staticClass:"vx-row mt-6"},[a("vs-divider",{attrs:{color:"primary"}},[a("h5",[t._v("Datos Patron")])]),t._v(" "),a("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Codigo",name:"codigo",danger:!!t.errors.first("codigo"),"danger-text":t.errors.first("codigo")?t.errors.first("codigo"):"","val-icon-danger":"clear"},model:{value:t.data_local.codigo,callback:function(e){t.$set(t.data_local,"codigo",e)},expression:"data_local.codigo"}})],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/3 w-full mt-2"},[a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full p-1",attrs:{"label-placeholder":"Descripcion",name:"descripcion",danger:!!t.errors.first("descripcion"),"danger-text":t.errors.first("descripcion")?t.errors.first("descripcion"):"","val-icon-danger":"clear"},model:{value:t.data_local.descripcion,callback:function(e){t.$set(t.data_local,"descripcion",e)},expression:"data_local.descripcion"}})],1),t._v(" "),a("div",{staticClass:"vx-col md:w-auto w-full mt-4"},[a("span",{staticClass:" text-sm"},[t._v("Color ")]),t._v(" "),a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:t.data_local.color,expression:"data_local.color"}],staticClass:"w-full",attrs:{name:"color",type:"color",danger:!!t.errors.first("color"),"val-icon-danger":"clear"},domProps:{value:t.data_local.color},on:{input:function(e){e.target.composing||t.$set(t.data_local,"color",e.target.value)}}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.errors.has("color"),expression:"errors.has('color')"}],staticClass:"text-danger text-sm"},[t._v(t._s(t.errors.first("color")))])]),t._v(" "),a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"hidden",name:"lat"},model:{value:t.data_local.lat,callback:function(e){t.$set(t.data_local,"lat",e)},expression:"data_local.lat"}}),t._v(" "),a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"hidden",name:"lng"},model:{value:t.data_local.lng,callback:function(e){t.$set(t.data_local,"lng",e)},expression:"data_local.lng"}}),t._v(" "),a("div",{staticClass:"vx-col  w-full mt-2"},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"mt-3 flex flex-wrap items-center justify-end"},[a("vx-tooltip",{attrs:{color:"primary",text:"Guardar"}},[a("vs-button",{staticClass:"ml-auto mt-2",attrs:{disabled:!t.validateForm},on:{click:t.save_changes}},[t._v("Guardar Cambios")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Volver"}},[a("vs-button",{staticClass:"ml-4 mt-2",attrs:{"icon-pack":"feather",icon:"icon-arrow-left",to:{name:"patrones"}}},[t._v("Volver")])],1),t._v(" "),a("vx-tooltip",{attrs:{color:"primary",text:"Limpiar"}},[a("vs-button",{staticClass:"ml-4 mt-2",attrs:{type:"border",color:"warning"},on:{click:t.reset_data}},[t._v("Limpiar")])],1)],1)])])])],1),t._v(" "),a("vx-card",{staticClass:"mb-base mt-4",attrs:{title:"Mapa",collapseAction:""}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("div",{staticClass:"flex flex-wrap items-center"},[a("div",{staticClass:"flex-grow mt-6"},[a("feather-icon",{staticClass:"mr-2 mt-2",attrs:{svgClasses:"w-6 h-6",icon:"MapIcon"}}),t._v(" "),a("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Detalle")])],1),t._v(" "),a("vs-select",{ref:"patrones",attrs:{multiple:"",autocomplete:"",label:"Patrones",name:"patrones",dir:t.$vs.rtl?"rtl":"ltr"},on:{input:t.setSelected},model:{value:t.selectPatrones,callback:function(e){t.selectPatrones=e},expression:"selectPatrones"}},t._l(t.patronesOptions,(function(t){return a("vs-select-item",{key:t.id,attrs:{value:t.id,text:t.codigo}})})),1),t._v(" "),a("vs-divider")],1)])]),t._v(" "),a("div",{staticClass:"block overflow-x-auto"},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.errors.has("lat")||t.errors.has("lng"),expression:"errors.has('lat') || errors.has('lng')"}],staticClass:"text-danger text-sm"},[t._v(t._s(t.errors.first("lat")))]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"map"}})])])],1)}),[],!1,null,null,null).exports,u=a("6wlp"),g={components:{itemEditSection1:d},data:function(){return{item_data:null,item_not_found:!1,urlApi:"/patrones/patrones/"}},watch:{activeTab:function(){this.fetch_item_data(this.$route.params.itemId)}},methods:{fetch_item_data:function(t){var e=this;this.$store.dispatch("itemManagement/traerItem",{Id:t,Url:this.urlApi}).then((function(t){e.item_data=t.data.item})).catch((function(t){404!==t.response.status?300==t.response.status?e.$vs.notify({title:"Error",text:t.response.data.message,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.$vs.notify({title:"Error",text:t,color:"danger",iconPack:"feather",icon:"icon-alert-circle"}):e.item_not_found=!0}))}},created:function(){u.a.isRegistered||(this.$store.registerModule("itemManagement",u.a),u.a.isRegistered=!0),this.fetch_item_data(this.$route.params.itemId)}},m=Object(c.a)(g,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"page-item-edit"}},[a("vs-alert",{attrs:{color:"danger",title:"Patron no encontrado",active:t.item_not_found},on:{"update:active":function(e){t.item_not_found=e}}},[a("span",[t._v("El patron con id: "+t._s(t.$route.params.itemId)+" no fue encontrado. ")]),t._v(" "),a("span",[a("span",[t._v("Mira  ")]),a("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"patrones"}}},[t._v("Todas los patrones")])],1)]),t._v(" "),t.item_data?a("vx-card",[a("item-edit-section1",{staticClass:"mt-4",attrs:{data:t.item_data}})],1):t._e()],1)}),[],!1,null,null,null);e.default=m.exports},"6wlp":function(t,e,a){"use strict";var i=a("bJaO");function n(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var o={agregarItem:function(t,e){return n(t),new Promise((function(t,a){i.a.post("/api/v1"+e.Url+"store",e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},editarItem:function(t,e){return n(t),new Promise((function(t,a){var n="";n=e.item.id?e.Url+e.item.id:e.Url,i.a.put("/api/v1"+n,e.item).then((function(e){t(e)})).catch((function(t){a(t)}))}))},traerItems:function(t,e){var a=t.commit;return new Promise((function(t,n){i.a.get("/api/v1"+e).then((function(e){a("SET_ITEMS",e.data.items),t(e)})).catch((function(t){n(t)}))}))},traerItem:function(t,e){return n(t),new Promise((function(t,a){i.a.get("/api/v1"+e.Url+"".concat(e.Id)).then((function(e){t(e)})).catch((function(t){a(t)}))}))},borrarItem:function(t,e){var a=t.commit;return new Promise((function(t,n){i.a.delete("/api/v1"+e.Url+"".concat(e.Id)).then((function(i){a("REMOVE_RECORD",e.Id),t(i)})).catch((function(t){n(t)}))}))},borrarMasivoItem:function(t,e){var a=t.commit;return new Promise((function(t,n){i.a.post("/api/v1"+e.Url+"borrar",e.Items).then((function(i){a("REMOVE_MASSIVE_RECORD",e.Items),t(i)})).catch((function(t){n(t)}))}))}};e.a={isRegistered:!1,namespaced:!0,state:{items:[]},mutations:{SET_ITEMS:function(t,e){t.items=e},REMOVE_RECORD:function(t,e){var a=t.items.findIndex((function(t){return t.id==e}));t.items.splice(a,1)},REMOVE_MASSIVE_RECORD:function(t,e){e.forEach((function(e){var a=t.items.findIndex((function(t){return t.id==e.id}));t.items.splice(a,1)}))}},actions:o,getters:{}}}}]);