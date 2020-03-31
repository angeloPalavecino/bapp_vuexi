<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-add">

    <!-- Content Row -->
    <div class="vx-row mt-6">
      <vs-divider color="primary"><h5>Datos Patron</h5></vs-divider>
      
        <div class="vx-col md:w-1/3 w-full mt-2">
      <vs-input label-placeholder="Codigo" v-model="data_local.codigo" class="w-full p-1" name="codigo" v-validate="'required'" 
      :danger="(errors.first('codigo') ? true : false)" :danger-text="(errors.first('codigo') ? errors.first('codigo') : '')" 
      val-icon-danger="clear" />
      </div>

      <div class="vx-col md:w-1/3 w-full mt-2">
      <vs-input label-placeholder="Descripcion" v-model="data_local.descripcion" class="w-full p-1" name="descripcion" v-validate="'required'" 
      :danger="(errors.first('descripcion') ? true : false)" :danger-text="(errors.first('descripcion') ? errors.first('descripcion') : '')" 
      val-icon-danger="clear" />
      </div>

      <div class="vx-col md:w-auto w-full mt-4">
                    <!-- COLOR -->
                    <span class=" text-sm" >Color </span>
                    <input v-validate="'required'" name="color" v-model="data_local.color" type="color" 
                    :danger="(errors.first('color') ? true : false)" val-icon-danger="clear" class="w-full" />
                    <span class="text-danger text-sm" v-show="errors.has('color')">{{ errors.first('color') }}</span>

      </div>
            
            <!-- LAT -->        
           <vs-input v-validate="'required'" type="hidden" name="lat" v-model="data_local.lat" />
            <!-- LNG -->
           <vs-input v-validate="'required'" type="hidden" name="lng" v-model="data_local.lng" />

             
      

        <!-- BUTTONS -->
        <div class="vx-col w-full mt-2">
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-3 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button v-if="$can('patrones.store')" class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'patrones'}">Volver</vs-button>
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

         
           
            <vs-select multiple autocomplete v-model="selectPatrones" label="Patrones" ref="patrones" name="patrones"  
             :dir="$vs.rtl ? 'rtl' : 'ltr'" @input="setSelected">
          <vs-select-item :key="item.id" :value="item.id" :text="item.codigo" v-for="item in patronesOptions"  />
          </vs-select>
               
          <vs-divider />
        
      </div>  
        </div>
      </div>
      <div class="block overflow-x-auto" >
          <span class="text-danger text-sm" v-show="errors.has('lat') || errors.has('lng')">{{ errors.first('lat') }}</span>
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
       codigo: {
            required: 'El codigo es requerido',
        },
        color: {
            required: 'El color es requerido',
        },
        descripcion: {
            required: 'La descripcion es requerida',
        },
        lat: {
            required: 'El patron es requerido',
        },
        lng: {
            required: 'El patron es requerido',
        },
    }
};
// register custom messages
Validator.localize('en', dict);
export default {
  components: {
    vSelect,
  },
  props: {
  },
  data() {
    return {
      urlApi: "/patrones/patrones/",
      data_local: {
        lat: '', 
        lng: '',
        color: '#ffff00'
      },
      center: { lat: -33.4533624, lng: -70.6642131 },
      zoom:11,
      map:null,
      marker:null,
      element: null,
      markersPat : [],
      patronesOptions: [],
      selectPatrones:[],
      tipObj : null,
      offset : {
          x: 10,
          y: 10
      }
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
      this.traeOtrosDatos();
      
      var center = this.center;
      var zoom = this.zoom;
      var lataux = "";
      var lngaux = "";
      var map = new google.maps.Map(document.getElementById('map'), {zoom: zoom, center: center});
      this.map = map;

      const thisIns = this;

         var drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYGON]
            },
            polygonOptions: {
                fillColor: '#ffff00',
                fillOpacity: 0.1,
                strokeWeight: 0.8,
                clickable: false,
                zIndex: 1,
                editable: true
            }

        });

      drawingManager.setMap(thisIns.map);


        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
            if (thisIns.element) {
                thisIns.element.setMap(null);
                thisIns.data_local.lat = '';
                thisIns.data_local.lng = '';
            }
            drawingManager.setDrawingMode(null);
            thisIns.element = event.overlay;
            if (event.type == google.maps.drawing.OverlayType.POLYGON) {
                lataux = "";
                lngaux = "";
                for (var i = 0; i < thisIns.element.getPath().getLength(); i++) {
                    lataux += thisIns.element.getPath().getAt(i).lat().toFixed(5) + ",";
                    lngaux += thisIns.element.getPath().getAt(i).lng().toFixed(5) + ",";
                }
                thisIns.data_local.lat = lataux.substring(0, lataux.length - 1);
                thisIns.data_local.lng = lngaux.substring(0, lngaux.length - 1);
              

                google.maps.event.addListener(thisIns.element, 'click', function (e) {
                    var path = thisIns.element.getPath();
                    path.removeAt(e.vertex);
                    lataux = "";
                    lngaux = "";
                    for (var i = 0; i < thisIns.element.getPath().getLength(); i++) {
                        lataux += thisIns.element.getPath().getAt(i).lat().toFixed(5) + ",";
                        lngaux += thisIns.element.getPath().getAt(i).lng().toFixed(5) + ",";
                    }
                   thisIns.data_local.lat = lataux.substring(0, lataux.length - 1);
                   thisIns.data_local.lng = lngaux.substring(0, lngaux.length - 1);

                });
                google.maps.event.addListener(thisIns.element.getPath(), 'set_at', function () {
                    lataux = "";
                    lngaux = "";
                    for (var i = 0; i < thisIns.element.getPath().getLength(); i++) {
                        lataux += thisIns.element.getPath().getAt(i).lat().toFixed(5) + ",";
                        lngaux += thisIns.element.getPath().getAt(i).lng().toFixed(5) + ",";
                    }

                    thisIns.data_local.lat = lataux.substring(0, lataux.length - 1);
                    thisIns.data_local.lng = lngaux.substring(0, lngaux.length - 1);

                });

                google.maps.event.addListener(thisIns.element.getPath(), 'insert_at', function () {
                    lataux = "";
                    lngaux = "";
                    for (var i = 0; i < thisIns.element.getPath().getLength(); i++) {
                        lataux += thisIns.element.getPath().getAt(i).lat().toFixed(5) + ",";
                        lngaux += thisIns.element.getPath().getAt(i).lng().toFixed(5) + ",";
                    }
                     thisIns.data_local.lat = lataux.substring(0, lataux.length - 1);
                     thisIns.data_local.lng = lngaux.substring(0, lngaux.length - 1);
                });



            }

        });

         google.maps.event.addListener(drawingManager, "drawingmode_changed", function() {
            if ((drawingManager.getDrawingMode() == google.maps.drawing.OverlayType.POLYGON) && 
                (thisIns.element != null))
                thisIns.element.setMap(null);
                thisIns.data_local.lat = '';
                thisIns.data_local.lng = '';
        });

        

  },
  methods: {
    setSelected(value) {
         
      this.clearOverlaysPat();
      this.cargaPatrones(this.selectPatrones);
    },
    traeOtrosDatos() {
      //Combo Patrones
      axios.get(`/api/v1/patrones/patrones/combo/0`)
        .then((res) => {
          //console.log(res.data.items);
          this.patronesOptions = res.data.items;  
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
    cargaPatrones(patrones){
           const thisIns = this;
           var latitud;
           var longitud;
           var color;
					 var paths = [];
           var marker;
           
      		 patrones.forEach((value, index) => {

                  
                  var item = this.patronesOptions.find((u) => u.id === value)
					        var auxlat = item['lat'];
                  var auxlng = item['lng'];
                  var color = item['color'];
                  var id = item['id'];
                  var descripcion = item['descripcion'];
              
                  var latitud = auxlat.split(",");
                  var longitud = auxlng.split(",");
  				        var paths = [];
                  //var bounds = new google.maps.LatLngBounds();

                for (var x = 0; x < latitud.length; x++) {
					    
					        var latcoord = parseFloat(latitud[x]);
                  var lngcoord = parseFloat(longitud[x]);
                  paths[x] = new google.maps.LatLng(latcoord.toFixed(5), lngcoord.toFixed(5));
                  //bounds.extend(paths[x]);
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
    save_changes() {
     this.$validator.validateAll().then(result =>{
        if (result) {
         this.$store.dispatch("itemManagement/agregarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'patrones'}); this.showDeleteSuccess() })
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
        lat: '', 
        lng: '',
        color: '#ffff00'
      }
     
      
      if (this.element) {
          this.element.setMap(null);
          this.errors.clear();
      }

      if (this.map) {
          this.map.setZoom(this.zoom);
          this.map.setCenter(this.center);
      }

      this.clearOverlaysPat();
      this.selectPatrones = [];

      this.errors.clear();


    },
  },
  
}
</script>
<style lang="scss">
</style>
