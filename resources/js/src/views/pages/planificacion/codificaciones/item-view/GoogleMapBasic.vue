<!-- =========================================================================================
    File Name: GoogleMapBasic.vue
    Description: Google map Basic
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
   <vx-card class="mb-base" title="Mapa" collapseAction>
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
            <GmapMap
                :center="center"
                :zoom="11"
                map-type-id="roadmap"
                ref="map"
                id="map"
                style="width: 100%; height: 400px">
                <GmapMarker
                    :position="position"
                    :clickable="false"
                    :draggable="false"
                    @click="center=position"
                    :icon="icon"
                />
            </GmapMap>
      </div>
        
    </vx-card>

    
</template>

<script>
export default {
  props: {
    lat: String ,
    lng: String , 
    latsuc: String ,
    lngsuc: String , 
    sucursal: String , 
    data_patrones: Array,
  },
    data() {
        return {
          center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
          position: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
          icon:require("@assets/images/icons/usuario6.png"),
          bounds: null,                    
           
        }
    },
methods: {
      cargaPatrones(map) {
           const thisIns = this;
           var lataux = "";
           var lngaux = "";
           var bounds = new google.maps.LatLngBounds();
           

              this.data_patrones.forEach((value, index) => {

                var latitud =  value['lat'].split(",");
                var longitud = value['lng'].split(",");
                var color = value['color'];
                var paths = [];

                  for (var i = 0; i < latitud.length; i++) {

                        var latcoord = parseFloat(latitud[i]);
                        var lngcoord = parseFloat(longitud[i]);
                        paths[i] = new google.maps.LatLng(latcoord.toFixed(5), lngcoord.toFixed(5));
                        bounds.extend(paths[i]);
                  }
                        var poligono = new google.maps.Polygon({
                              paths: paths,
                              fillColor: color,
                              fillOpacity: 0.1,
                              strokeWeight: 0.8,
                              clickable: false,
                              zIndex: 1,
                              editable: false
                          });
      
                        poligono.setMap(map);
                        //map.fitBounds(bounds);
                        //map.setZoom(12);          
              });  
              
              thisIns.bounds = bounds;
				
    },
    cargaSucursal(map) {
           const thisIns = this;
        
                const lat = parseFloat(this.latsuc);
                const lng = parseFloat(this.lngsuc);
                const nombre = this.sucursal;

                if(this.bounds == null){
                  var bounds = new google.maps.LatLngBounds();
                  bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));
                  bounds.extend(new google.maps.LatLng(this.lat, this.lng));
                  thisIns.bounds = bounds;
                }else{
                  thisIns.bounds.extend(new google.maps.LatLng(lat.toFixed(5), lng.toFixed(5)));
                  thisIns.bounds.extend(new google.maps.LatLng(this.lat, this.lng));
                }
              
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
                    
                marker.setMap(map);
               // map.setZoom(12);    
              
              map.fitBounds(thisIns.bounds);                    
				
    },
},   
created() {
},
mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.map.$mapPromise.then((map) => {
      this.cargaPatrones(map);
      this.cargaSucursal(map);
    })
  }  
}
</script>
