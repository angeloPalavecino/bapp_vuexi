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
  },
    data() {
        return {
            center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
            position: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
            icon: require("@assets/images/icons/usuario6.png")
        }
    },
}
</script>
