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
            </GmapMap>
      </div>
        
    </vx-card>

    
</template>

<script>
export default {
  props: {
    lat: String ,
    lng: String , 
    color: String , 
  },
    data() {
        return {
            center: { lat: -33.4573876, lng: -70.6440017 },
           
        }
    },
methods: {
    poligono(map) {
           const thisIns = this;
           var lataux = "";
           var lngaux = "";
           var bounds = new google.maps.LatLngBounds();
           var latitud =  this.lat.split(",");
           var longitud = this.lng.split(",");
           var color = this.color;
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
                  map.fitBounds(bounds);
                  map.setZoom(12);
                     
					 
    }

},   
created() {
},
mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.map.$mapPromise.then((map) => {
      this.poligono(map);
    })
  }  
}
</script>
