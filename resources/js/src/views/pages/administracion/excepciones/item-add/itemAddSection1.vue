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
      <vs-divider color="primary"><h5>Datos Excepcion</h5></vs-divider>
      
        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Rut" v-model="data_local.rut" class="w-full p-1" name="rut" v-validate="'required'" 
      :danger="(errors.first('rut') ? true : false)" :danger-text="(errors.first('rut') ? errors.first('rut') : '')" 
      val-icon-danger="clear" />
      </div>
       <!-- DIRECCION -->
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
          <div class="vx-row">
                   <div class="vx-col md:w-auto w-full mt-1">
                        <div class="p-2 mt-4 rounded-lg cursor-pointer flex items-center justify-between font-small text-base 
                    text-primary border border-solid border-primary" @click="agregarMarker()" > <!-- @click="addNewDataSidebar = true" -->
                        <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4" />
                        <span class="ml-2 text-base text-primary">MARCAR EN MAPA</span>
						        </div>
                   </div>
				   
              <!--     <div class="vx-col md:w-3/4 w-full mt-1">
						<div class="mt-5">
							<div id="map"></div>
						</div>
					</div>-->
                </div>

        </div>

        <!-- BUTTONS -->
        <div class="vx-col md:w-1/2 w-full mt-2">
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-3 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'excepciones'}">Volver</vs-button>
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
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="MapIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Detalle</span>
          </div>
          <vs-divider />
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
        rut: {
            required: 'El rut es requerido',
        },
        direccion: {
            required: 'La direccion es requerida',
        }
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
      urlApi: "/excepciones/excepciones/",
      data_local: {},
      autocomplete:null,
      center: { lat: -33.4533624, lng: -70.6642131 },
      zoom:11,
      map:null,
      marker:null,
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
      this.autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete),{
      types: ['geocode']
      
      });
      this.autocomplete.addListener('place_changed', this.asignaDireccion);

      var center = this.center;
      var zoom = this.zoom;
      var map = new google.maps.Map(document.getElementById('map'), {zoom: zoom, center: center});
      this.map = map;
  },
  methods: {
    asignaDireccion() {
      this.data_local.direccion = this.autocomplete.getPlace().formatted_address;
    },
    agregarMarker() {
           const thisIns = this;
          
          if(this.data_local.direccion){

           const lat = this.autocomplete.getPlace().geometry.location.lat();
           const lng = this.autocomplete.getPlace().geometry.location.lng();
           const direccion = this.autocomplete.getPlace().formatted_address;
           
           var map =  this.map;
           
           if(this.marker != null){
                var mark = this.marker;
                mark.setMap(null);
                this.marker = null;
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

                google.maps.event.addListener(marker, 'dragend', function() {
                thisIns.geocodePosition(marker.getPosition());
                });
                
                var latlng = new google.maps.LatLng(lat, lng);
                map.setCenter(latlng);
                map.setZoom(15);
              
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
     geocodePosition(pos){
               const thisIns = this;
               var geocoder = new google.maps.Geocoder();
               geocoder.geocode({
                    latLng: pos
                }, 
                    function(results, status) 
                    {
                        if (status == google.maps.GeocoderStatus.OK){
                            thisIns.data_local.direccion = results[0].formatted_address;   
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
    save_changes() {
     this.$validator.validateAll().then(result =>{
        if (result) {
         this.$store.dispatch("itemManagement/agregarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'excepciones'}); this.showDeleteSuccess() })
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
      this.data_local = {}
      this.errors.clear();
      
      if(this.marker != null){
          var mark = this.marker;
          mark.setMap(null);
          this.marker = null;
      }

      var center = this.center;
      var zoom = this.zoom;
      var map = this.map;
      map.setCenter(center);
      map.setZoom(zoom);

    },
  },
  
}
</script>
<style lang="scss">
</style>
