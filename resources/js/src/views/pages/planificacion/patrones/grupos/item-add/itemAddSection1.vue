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
      <vs-divider color="primary"><h5>Datos Grupo de patrones</h5></vs-divider>
      
        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Codigo" v-model="data_local.codigo" class="w-full p-1" name="codigo" v-validate="'required'" 
      :danger="(errors.first('codigo') ? true : false)" :danger-text="(errors.first('codigo') ? errors.first('codigo') : '')" 
      val-icon-danger="clear" />
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Descripcion" v-model="data_local.descripcion" class="w-full p-1" name="descripcion" v-validate="'required'" 
      :danger="(errors.first('descripcion') ? true : false)" :danger-text="(errors.first('descripcion') ? errors.first('descripcion') : '')" 
      val-icon-danger="clear" />
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select v-model="empresa" label="Empresas" ref="empresas" name="empresa" class="w-full p-1" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
          </vs-select>
          
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select autocomplete multiple v-model="data_local.sucursales" label="Sucursales" ref="sucursal" name="sucursal" class="w-full p-1" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(empresa > 1 ? false : true)" v-validate="'required'" 
            :danger="(errors.first('sucursal') ? true : false)"
             :danger-text="(errors.first('sucursal') ? errors.first('sucursal') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
          </vs-select>
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-select v-model="data_local.fuerazona" label="Fuera de Zona" name="fuerazona"  
             :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" class="w-full p-1" 
             :danger="(errors.first('fuerazona') ? true : false)"
             :danger-text="(errors.first('fuerazon') ? errors.first('fuerazona') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.text" v-for="item in fueraZonaOptions"  />
          </vs-select>
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-select multiple autocomplete v-model="data_local.patrones" label="Patrones" ref="patrones" name="patrones"  
             :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" class="w-full p-1"
             :danger="(errors.first('patrones') ? true : false)"
             :danger-text="(errors.first('patrones') ? errors.first('patrones') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.codigo" v-for="item in patronesOptions"  />
          </vs-select>
      </div>

            
          

             
      

        <!-- BUTTONS -->
        <div class="vx-col w-full mt-2">
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-3 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'gpatrones'}">Volver</vs-button>
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
       codigo: {
            required: 'El codigo es requerido',
        },
        descripcion: {
            required: 'La descripcion es requerida',
        },
        fuerazona: {
            required: 'La fuera de zona es requerido',
        },
        sucursal: {
            required: 'La sucursal es requerida',
        },
        patrones: {
            required: 'Debe seleccionar al menos un patron',
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
      urlApi: "/patrones/grupos/",
      data_local: {
        fuerazona:0,
        patrones:[],
        sucursales:[]
      },
      empresa:1,
      center: { lat: -33.4533624, lng: -70.6642131 },
      zoom:11,
      map:null,
      marker:null,
      markerSuc:null,
      markersPat : [],
      markersSuc : [],
      
      patronesOptions: [],
      empresasOptions:[],
      sucursalesOptions:[],
      fueraZonaOptions:[
       { id:0 , text:'No' },
       { id:1 , text:'Fuera de zona 1' },
       { id:2 , text:'Fuera de zona 2' },
       { id:3 , text:'Fuera de zona 3' },
      ],
      tipObj : null,
      offset : {
          x: 10,
          y: 10
      }
    }
  },
   watch: {
     empresa(obj) {
      this.data_local.sucursales = [];
      this.clearOverlaysSuc(); 
      this.traeSucursales(obj)
    },
    patrones(obj){
      this.clearOverlaysPat();
      this.cargaPatrones(this.data_local.patrones);
    },
    sucursales(obj){
      this.clearOverlaysSuc();
      this.cargaSucursal(this.data_local.sucursales)
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    },
    patrones() {
      return this.data_local.patrones;
    },
    sucursales() {
      return this.data_local.sucursales;
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

  },
  methods: {
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
      this.data_local.sucursales = [];
    }
     
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
    cargaSucursal(sucursales) {
          const thisIns = this;
          var bounds = new google.maps.LatLngBounds();

          sucursales.forEach((value, index) => {

          var item = this.sucursalesOptions.find((u) => u.id === value)
			    const lat = parseFloat(item['lat']);
          const lng = parseFloat(item['lng']);
          const nombre = item['nombre'];
          bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));

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
          thisIns.markersSuc.push(marker);

          });     
          
          thisIns.map.fitBounds(bounds);
				
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
    clearOverlaysSuc() {
            const thisIns = this;
            
            if(thisIns.markersSuc.length > 0){
              thisIns.markersSuc.forEach((value, index) => {
                  value.setMap(null);
              });
              
            }
            thisIns.markersSuc = [];

            
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
         .then(()   => { this.$router.push({name:'gpatrones'}); this.showDeleteSuccess() })
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
         fuerazona:0,
         patrones:[],
         sucursales:[]
       }
      this.sucursalesOptions = [];
      this.empresa = 1;
      
      this.clearOverlaysPat();
      this.clearOverlaysSuc();

      if (this.map) {
          this.map.setZoom(this.zoom);
          this.map.setCenter(this.center);
      }
      
    
      this.errors.clear();

    },
  },
  
}
</script>
<style lang="scss">
</style>
