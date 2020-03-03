<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-edit">

     <!-- Content Row -->
    <div class="vx-row mt-6">
      <vs-divider color="primary"><h5>Datos codificacion</h5></vs-divider>

      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Nombre" v-model="data_local.nombre" class="w-full p-1" name="nombre" v-validate="'required'" 
      :danger="(errors.first('nombre') ? true : false)" :danger-text="(errors.first('nombre') ? errors.first('nombre') : '')" 
      val-icon-danger="clear" />
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Apellido" v-model="data_local.apellido" class="w-full p-1" name="apellido" v-validate="'required'" 
      :danger="(errors.first('apellido') ? true : false)" :danger-text="(errors.first('apellido') ? errors.first('apellido') : '')" 
      val-icon-danger="clear" />
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Rut" disabled="true" v-model="data_local.rut" class="w-full p-1" name="rut" v-validate="'required'" 
      :danger="(errors.first('rut') ? true : false)" :danger-text="(errors.first('rut') ? errors.first('rut') : '')" 
      val-icon-danger="clear" />
      </div>

        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input type="email" label-placeholder="Email" v-model="data_local.email" class="w-full p-1" name="email" v-validate="'email|required'" 
      :danger="(errors.first('email') ? true : false)" :danger-text="(errors.first('email') ? errors.first('email') : '')" 
      val-icon-danger="clear" />
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Telefono" v-model="data_local.telefono" class="w-full p-1" name="telefono" v-validate="'required'" 
      :danger="(errors.first('telefono') ? true : false)" :danger-text="(errors.first('telefono') ? errors.first('telefono') : '')" 
      val-icon-danger="clear" />
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Centro Costo" v-model="data_local.centro_costo" class="w-full p-1" name="centro_costo" v-validate="'required'" 
      :danger="(errors.first('centro_costo') ? true : false)" :danger-text="(errors.first('centro_costo') ? errors.first('centro_costo') : '')" 
      val-icon-danger="clear" />
      </div>
      
      <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select v-model="empresa" label="Empresas" ref="empresas" name="empresa" class="w-full p-1" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
          </vs-select>
          
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select v-model="data_local.sucursal_id" label="Sucursales" ref="sucursal" name="sucursal" class="w-full p-1" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(empresa > 1 ? false : true)" v-validate="'required'"
            :danger="(errors.first('sucursal') ? true : false)"
             :danger-text="(errors.first('sucursal') ? errors.first('sucursal') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
          </vs-select>
      </div>

           <div class="vx-col md:w-1/2 w-full mt-2">

        <vs-input v-validate="'required'" type="hidden" name="direccion" v-model="data_local.direccion"/>
        
        <div class="vs-component vs-con-input-label vs-input mt-6 w-full vs-input-primary is-label-placeholder">
                <div class="vs-con-input">

                <input type="text" required ref="autocomplete"  name="direccion" v-model="data_local.direccion" 
                  :class="(data_local.direccion ? 'vs-inputx vs-input--input normal hasValue' : 'vs-inputx vs-input--input normal')" 
                 
                  :style="(errors.first('direccion') ? 'border: 1px solid rgba(var(--vs-danger),1)!important;' : 'border: 1px solid rgba(0, 0, 0, 0.2);')" 
                 placeholder=""  >

                   <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label">
        Direccion
      </span>
                  <span v-show="errors.has('direccion')" class="input-icon-validate vs-input--icon-validate" style="background: rgba(var(--vs-danger),.2);">
                    <i class="vs-icon notranslate icon-scale material-icons null" valiconpack="material-icons" style="color: rgba(var(--vs-danger),1);">clear</i></span>
                
               
                
                </div>
               <div v-show="errors.has('direccion')"  class="con-text-validation span-text-validation-danger 
                vs-input--text-validation-span v-enter-to" style="height: 20px;">
                <span class="span-text-validation">
                      {{ errors.first('direccion') }}
                      </span></div>
         </div>

        </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-input label-placeholder="Comuna" v-model="data_local.comuna" class="w-full p-1" name="comuna" v-validate="'required'" 
        :danger="(errors.first('comuna') ? true : false)" :danger-text="(errors.first('comuna') ? errors.first('comuna') : '')" 
        val-icon-danger="clear" />
      </div>



       <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-select v-model="data_local.codigo" label="Codigo" ref="codigo" name="codigo"  
             :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(data_local.sucursal_id > 0 ? false : true)" 
              class="w-full p-1" 
             :danger="(errors.first('codigo') ? true : false)"
             :danger-text="(errors.first('codigo') ? errors.first('codigo') : '')">  <!--v-validate="'required'"-->
          <vs-select-item :key="item.id" :value="item.id" :text="item.codigo" v-for="item in gpatronesOptions"  />
          </vs-select>
      </div>

        <div class="vx-col md:w-1/2 w-full mt-5">
             <label class="vs-input--label ">Habilitado</label>
              <br/>
             
               <vs-switch class="mt-2" @input="checkHabilitado" v-model="data_local.habilitado" />
           
        </div>
         <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-select v-model="data_local.comentario" label="Comentario" ref="comentario" name="comentario"  
             :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(data_local.habilitado == 0 ? false : true)" 
              class="w-full p-1">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in comentariosOptions"  />
          </vs-select>
      </div>

    
        <!-- BUTTONS -->
        <div class="vx-col  w-full mt-2">
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-3 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="confirmarEditar" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'codificaciones'}">Volver</vs-button>
          </vx-tooltip>
        
          <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
          </vx-tooltip>
          
        </div>
      </div>
    </div>
    </div>
     <!-- BUTTONS -->
   
     </div>
    <!-- Content Row -->
       <!-- MAPA -->
       <vx-card class="mb-base mt-4" title="Mapa" collapseAction>
        <div class="vx-row">
        <div class="vx-col w-full">
        <div class="flex flex-wrap items-center">
        <div class="flex-grow mt-6">
          <feather-icon svgClasses="w-6 h-6" icon="MapIcon" class="mr-2 mt-2" />
            <span class="font-medium text-lg leading-none">Detalle</span>
        </div>
        <vs-divider />
        
      </div>  
        </div>
      </div>
      <div class="block overflow-x-auto" >
         <div id="map" style="width: 100%; height: 400px"></div>
      </div>
        
    </vx-card>

    <!-- MAPA -->

  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
    custom: {
       nombre: {
            required: 'El nombre es requerido',
        },
         apellido: {
            required: 'El apellido es requerido',
        },
       comuna: {
            required: 'La comuna es requerida',
        },
        email: {
            required: 'El email es requerido',
            email: 'El email debe ser valido',
        },
        telefono: {
            required: 'El telefono es requerido',
        },
        centro_costo: {
            required: 'El centro de costo es requerido',
        },
       codigo: {
            required: 'El codigo es requerido',
        },
        rut: {
            required: 'El rut es requerida',
        },
        direccion: {
            required: 'La direccion es requerida',
        },
        sucursal: {
            required: 'La sucursal es requerida',
        },
    }
};

// register custom messages
Validator.localize('en', dict);
export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      urlApi: "/codificaciones/codificaciones/",
      data_local: {
        id : this.data.id ? this.data.id: null,
        rut : this.data.rut ? this.data.rut: null,
        codigo : this.data.grupo_patron_id ? this.data.grupo_patron_id: null,
        nombre : this.data.nombre ? this.data.nombre: null,
        apellido : this.data.apellido ? this.data.apellido: null,
        direccion : this.data.direccion ? this.data.direccion: null,
        comuna : this.data.comuna ? this.data.comuna: null,
        email : this.data.email ? this.data.email: null,
        telefono : this.data.telefono ? this.data.telefono: null,
        centro_costo : this.data.centro_costo ? this.data.centro_costo: null,
        sucursal_id : this.data.sucursal_id ? this.data.sucursal_id: null,
        lat: this.data.lat ? parseFloat(this.data.lat): null,
        lng: this.data.lng ? parseFloat(this.data.lng): null,
        habilitado: this.data.habilitado,
        comentario: this.data.comentario ? this.data.comentario: null,
      },
      empresa:this.data.empresa_id,
      center: { lat: -33.4533624, lng: -70.6642131 },
      zoom:11,
      map:null,
      marker:null,
      markerSuc:null,
      markersPat : [],
      boundsMarker : null,
      boundsSucursal : null,
      autocomplete:null,
      
      gpatronesOptions: [],
      empresasOptions:[],
      sucursalesOptions:[],

      comentariosOptions: [
        {text: "Comentario 1", value: 1},
        {text: "Comentario 2", value: 2},
        {text: "Comentario 3", value: 3},
        {text: "Comentario 4", value: 4},
       
      ],
      
      patrones:[],

      tipObj : null,
      offset : {
          x: 10,
          y: 10
      },

      positionStart:null,
      positionStartNew:null,

    }
  },
   watch: {
    empresa(obj) {
      this.clearOverlaysPat();
      this.data_local.sucursal_id = null;
      if(this.markerSuc != null){
        var marksuc = this.markerSuc;
        marksuc.setMap(null);
        this.markerSuc = null;
      }

      this.traeSucursales(obj)
    },
    sucursal(obj){
      this.traeCodigos(obj);
      this.data_local.codigo = null;
      this.clearOverlaysPat();

      if(this.markerSuc != null){
        var marksuc = this.markerSuc;
        marksuc.setMap(null);
        this.markerSuc = null;
      }
      
      this.cargaSucursal(obj);
    },
    codigo(obj){
      this.patrones = [];      
      this.traePatrones(obj);

      setTimeout(() => {
                 if(this.patrones.length > 0){
                    this.cargaPatrones(this.patrones);
                }
      }, 500);
     
    },
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    },
    sucursal() {
      return this.data_local.sucursal_id;
    },
    codigo() {
      return this.data_local.codigo;
    },
  },
   mounted() {

      this.traeOtrosDatos();
      this.traeSucursales(this.data.empresa_id);
      this.traeCodigos(this.data.sucursal_id);
    
      this.autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete),{
      types: ['geocode']
      
      });
      this.autocomplete.addListener('place_changed', this.asignaDireccion);

      var center = this.center;
      var zoom = this.zoom;
      var lataux = "";
      var lngaux = "";
      var map = new google.maps.Map(document.getElementById('map'), {zoom: zoom, center: center});
      this.map = map;
      
      this.traePatrones(this.data.grupo_patron_id);
      this.agregarMarker();
      

      setTimeout(() => {

                this.cargaSucursal(this.data.sucursal_id);

                if(this.patrones.length > 0){
                    this.cargaPatrones(this.patrones);
                }
                
      }, 600);
     
  },
  created(){
    
  },
  methods: { 
    checkHabilitado(){
      if(this.data_local.habilitado == true){
        this.data_local.comentario = null;
      }

    },
    asignaDireccion() {
      var place = this.autocomplete.getPlace();
      this.data_local.direccion = place.name;//this.autocomplete.getPlace().formatted_address;
      this.data_local.lat = this.autocomplete.getPlace().geometry.location.lat().toFixed(5);
      this.data_local.lng = this.autocomplete.getPlace().geometry.location.lng().toFixed(5);

      for(var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if(addressType == "locality" || addressType == "administrative_area_level_3"){
          this.data_local.comuna = place.address_components[i]['long_name'];
        }
      }


      this.agregarMarker();
    },
    agregarMarker() {
           const thisIns = this;
          
          if(this.data_local.lat && this.data_local.lng){

           const lat = parseFloat(this.data_local.lat);
           const lng = parseFloat(this.data_local.lng);
           const direccion = this.data_local.direccion;
           
           var map =  this.map;
           
           if(this.marker != null){
                var mark = this.marker;
                mark.setMap(null);
                this.marker = null;
              }

              var bounds = new google.maps.LatLngBounds();
              bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));
              thisIns.boundsMarker = bounds;

              if(this.boundsSucursal !== null){
                  bounds = this.boundsSucursal;
                  bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));
              }
              
              var marker = new google.maps.Marker({
                    position: { lat: lat, lng: lng }, 
                    infoText: direccion,
                    title: direccion,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    icon: {
                      url: require("@assets/images/icons/usuario6.png") 
                    }
                
                });

                marker.setMap(map);

                google.maps.event.addListener(marker, 'dragstart', function() {
                  thisIns.positionStart = this.position;
                  
                });
                google.maps.event.addListener(marker, 'dragend', function() {
                  thisIns.positionStartNew = this.position;
                 
                 thisIns.$vs.dialog({
                      type: 'confirm',
                      color: 'danger',
                      title: `Confirmar`,
                      text: 'Esta seguro que desea mover el marcador?.',
                      accept: thisIns.ConfirmDialog,
                      cancel: thisIns.CancelDialog
                    })
                });

                //google.maps.event.addListener(marker, 'dragend', function() {
                  //thisIns.geocodePosition(marker.getPosition());
                //});
                
                var latlng = new google.maps.LatLng(lat, lng);
                //map.setCenter(latlng);
                //map.setZoom(15);
                thisIns.map.fitBounds(bounds);
              
                this.marker = marker;

            }else{

              this.$vs.notify({
                title:'Error',
                text: 'Debe ingresar una direccion',
                color:'danger',
                iconPack: 'feather',
                icon:'icon-alert-circle'})

            }
    },
    ConfirmDialog() {
      this.geocodePosition(this.positionStartNew);
    },
    CancelDialog(value) {
      this.marker.setPosition(this.positionStart)
    },
    geocodePosition(pos){
               const thisIns = this;
               var geocoder = new google.maps.Geocoder();
               geocoder.geocode({
                    latLng: pos
                }, 
                    function(results, status) 
                    {
                        if (status == google.maps.GeocoderStatus.OK){
                            var place = results[0];
                            var aux = results[0].formatted_address.split(',');
                            thisIns.data_local.direccion = aux[0];//results[0].formatted_address;     
                            thisIns.data_local.lat = results[0].geometry.location.lat().toFixed(5);
                            thisIns.data_local.lng = results[0].geometry.location.lng().toFixed(5);
                            thisIns.data_local.comuna = place.vicinity;

                            for (var i = 0; i < place.address_components.length; i++) {
                              var addressType = place.address_components[i].types[0];
                              if(addressType == "locality" || addressType == "administrative_area_level_3"){
                                thisIns.data_local.comuna = place.address_components[i]['long_name'];
                              }
                            }

                            
                            thisIns.map.setCenter(pos);      

                        }else{
                          
                             this.$vs.notify({
                            title:'Error',
                            text: 'No se puede determinar la direccion. ' + status,
                            color:'danger',
                            iconPack: 'feather',
                            icon:'icon-alert-circle'}) 
                                                      
                        }
                    }
                );
    },
     traePatrones(value) {
      
    if(value >  0)  {
      //Combo Patrones del grupo
      axios.get(`/api/v1/patrones/grupos/` + value)
        .then((res) => {
          this.patrones = res.data.patrones;  
        })
        .catch((err) => { 

        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})  

       

      })  
    }
     
    },
     traeCodigos(value){
      //Combo Grupo de patrones
      axios.get(`/api/v1/patrones/grupos/codigos/` + value)
        .then((res) => {
          //console.log(res.data.items);
          this.gpatronesOptions = res.data.items;  
      
        })
        .catch((err) => { 

        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})  

      })  
    },
    traeSucursales(value) {
      
       if(value >  1)  {
      //Combo Sucursales
          axios.get(`/api/v1/sucursal/combo/` + value)
            .then((res) => {
              //console.log(res.data.items);
              this.sucursalesOptions = res.data.items;  
            })
            .catch((err) => { 

            var textError = err.response.status == 300 ? err.response.data.message : err;
            this.$vs.notify({
                        title:'Error',
                        text: textError,
                        color:'danger',
                        iconPack: 'feather',
                        icon:'icon-alert-circle'})  

          })  
      }else{

          this.sucursalesOptions = [];
          this.gpatronesOptions = [];
          this.patrones = [];
          this.data_local.codigo = null;
          this.data_local.sucursal_id = null;
  
      }
     
    },
    traeOtrosDatos() {    
      //Combo Empresa
      axios.get(`/api/v1/empresas/listemp`)
        .then((res) => {
          this.empresasOptions = res.data.items;  
        })
        .catch((err) => { 

        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})  

      })    

      

    },
    cargaSucursal(sucursal) {
          const thisIns = this;
          //var bounds = new google.maps.LatLngBounds();
          if(sucursal > 0){
              var item = this.sucursalesOptions.find((u) => u.id === sucursal)
              const lat = parseFloat(item['lat']);
              const lng = parseFloat(item['lng']);
              const nombre = item['nombre'];

              var bounds = new google.maps.LatLngBounds();
              bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));
              thisIns.boundsSucursal = bounds;
            
              if(this.boundsMarker !== null){
                  bounds = this.boundsMarker;
                  bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));
              }

            // bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));

              var marker = new google.maps.Marker({
                    position: { lat: lat, lng: lng }, 
                    infoText: nombre,
                    title: nombre,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    icon: {
                      url: require("@assets/images/icons/sucursal7.png") 
                    }        
              });
              
              marker.setMap(thisIns.map);
              thisIns.markerSuc = marker;         
              thisIns.map.fitBounds(bounds);
          }
				
    },
    cargaPatrones(patrones){
           const thisIns = this;
           var latitud;
           var longitud;
           var color;
					 var paths = [];
           var marker;
           var bounds = new google.maps.LatLngBounds();
           
      		 patrones.forEach((value, index) => {

					        var auxlat = value['lat'];
                  var auxlng = value['lng'];
                  var color = value['color'];
                  var id = value['id'];
                  var descripcion = value['descripcion'];
              
                  var latitud = auxlat.split(",");
                  var longitud = auxlng.split(",");
  				        var paths = [];
                  //var bounds = new google.maps.LatLngBounds();

                for (var x = 0; x < latitud.length; x++) {
					    
					        var latcoord = parseFloat(latitud[x]);
                  var lngcoord = parseFloat(longitud[x]);
                  paths[x] = new google.maps.LatLng(latcoord.toFixed(5), lngcoord.toFixed(5));
                  bounds.extend(paths[x]);
                }
					      
					      marker = new google.maps.Polygon({
                    paths: paths,
                    fillColor: color,
                    fillOpacity: 0.1,
                    strokeWeight: 0.8,
                    //clickable:true,
                    id: id,
                    name: descripcion,
                    map: thisIns.map
                });

      
                   google.maps.event.addListener(marker, 'mouseover', function (e) {
                      thisIns.injectTooltip(e, this.name);
                  });


                  google.maps.event.addListener(marker, 'mousemove', function (e) {
                          thisIns.moveTooltip(e);
                      });

                      google.maps.event.addListener(marker, 'mouseout', function (e) {
                          thisIns.deleteTooltip(e);
                      });
              
                    thisIns.markersPat.push(marker);  
					     
            });
            
            thisIns.map.fitBounds(bounds);

    },
    clearOverlaysPat() {
            const thisIns = this;
            
            if(thisIns.markersPat.length > 0){
              thisIns.markersPat.forEach((value, index) => {
                  value.setMap(null);
              });
              
            }
            thisIns.markersPat = [];

            
    },
    deleteTooltip(event) {
      if (this.tipObj) {
          //delete the tooltip if it exists in the DOM
          document.body.removeChild(this.tipObj);
          this.tipObj = null;
      }
    },
    moveTooltip(event) {
      if (this.tipObj && event) {
          //position it
          this.tipObj.style.top = event.ya.clientY  + this.offset.y + "px";
          this.tipObj.style.left = event.ya.clientX + this.offset.x + "px";
      }
    },
    injectTooltip(event, data) {
      if (!this.tipObj && event) {
          //create the tooltip object
          this.tipObj = document.createElement("div");
          this.tipObj.style.width = '100px';
          this.tipObj.style.height = '40px';
          this.tipObj.style.background = "white";
          this.tipObj.style.borderRadius = "5px";
          this.tipObj.style.padding = "10px";
          this.tipObj.style.fontFamily = "Arial,Helvetica";
          this.tipObj.style.textAlign = "center";
          this.tipObj.style.zIndex = "99999";
          this.tipObj.innerHTML = data;
          
          //position it
          this.tipObj.style.position = "fixed";
          this.tipObj.style.top = event.ya.clientY + this.offset.y + "px";
          this.tipObj.style.left = event.ya.clientX + this.offset.x + "px";

          //add it to the body
          document.body.appendChild(this.tipObj);
        }
    },
     clearOverlaysPat() {
            const thisIns = this;
            
            if(thisIns.markersPat.length > 0){
              thisIns.markersPat.forEach((value, index) => {
                  value.setMap(null);
              });
              
            }
            thisIns.markersPat = [];

            
    },
    confirmarEditar(){
       
       if(this.data_local.habilitado == 0 ){
       
          this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Confirmar`,
              text: 'Esta seguro que desea dejar deshabilitado el pasajero?. Al realizar esta accion, se eliminaran los agendamientos activos que tenga asociado.',
              accept: this.save_changes
          })

      }else{

          this.save_changes();

      }

    },
    save_changes() {
      this.$validator.validateAll().then(result =>{
        if (result) {
  
      this.$store.dispatch("itemManagement/editarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'codificaciones'}); this.showDeleteSuccess() })
         .catch(err => { 
           
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                title:'Error',
                text: textError,
                color:'danger',
                iconPack: 'feather',
                icon:'icon-alert-circle'})  
        })
       }
      })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Guardar registros',
        text: 'Los registros se han guardado exitosamente.'
      })
    },
    reset_data() {
     this.data_local = {
        id : this.data.id ? this.data.id: null,
        rut : this.data.rut ? this.data.rut: null,
        codigo : this.data.grupo_patron_id ? this.data.grupo_patron_id: null,
        nombre : this.data.nombre ? this.data.nombre: null,
        apellido : this.data.apellido ? this.data.apellido: null,
        direccion : this.data.direccion ? this.data.direccion: null,
        comuna : this.data.comuna ? this.data.comuna: null,
        email : this.data.email ? this.data.email: null,
        telefono : this.data.telefono ? this.data.telefono: null,
        centro_costo : this.data.centro_costo ? this.data.centro_costo: null,
        sucursal_id : this.data.sucursal_id ? this.data.sucursal_id: null,
        lat: this.data.lat ? this.data.lat: null,
        lng: this.data.lng ? this.data.lng: null,
        habilitado: this.data.habilitado,
        comentario: this.data.comentario ? this.data.comentario: null,
      }

      this.empresa = this.data.empresa_id;

      this.traeSucursales(this.data.empresa_id);
      this.traeCodigos(this.data.sucursal_id);
     
      if (this.map) {
          this.map.setZoom(this.zoom);
          this.map.setCenter(this.center);
      }
      
      if(this.marker != null){
          var mark = this.marker;
          mark.setMap(null);
          this.marker = null;
      }

      if(this.markerSuc != null){
        var marksuc = this.markerSuc;
        marksuc.setMap(null);
        this.markerSuc = null;
      }

      this.clearOverlaysPat();
      
      this.traePatrones(this.data.grupo_patron_id);
      this.agregarMarker();

      setTimeout(() => {
                 if(this.patrones.length > 0){
                    this.cargaPatrones(this.patrones);
                }
      }, 500);
    
      this.errors.clear();

      
    
    },
  },
}
</script>
<style lang="scss">
</style>
