<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-item-edit">

    <vs-alert color="danger" title="Grupo de patrones no encontrado" :active.sync="item_not_found">
      <span>El grupos de patrones con id: {{ $route.params.itemId }} no fue encontrado. </span>
      <span>
        <span>Mira  </span><router-link :to="{name:'gpatrones'}" class="text-inherit underline">Todos los grupos de patrones</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="item_data">
      <item-edit-section1 class="mt-4" :data="item_data" :data_patrones="item_data_patrones" :data_sucursales="item_data_sucursales"/>
    </vx-card>
  </div>
</template>

<script>
import itemEditSection1     from "./itemEditSection1.vue"

// Store Module
import moduleItemManagement from '@/store/items-management/moduleItemManagement.js'

export default {
  components: {
    itemEditSection1,
  },
  data() {
    return {
      item_data: null,
      item_data_patrones: null,
      item_data_sucursales: null,
      item_not_found: false,
      urlApi: "/patrones/grupos/",
    }
  },
  watch: {
    activeTab() {
      this.fetch_item_data(this.$route.params.itemId)
    }
  },
  methods: {
    fetch_item_data(itemId) {
      
      this.$store.dispatch("itemManagement/traerItem", {	Id: itemId, Url: this.urlApi  })
        .then(res => { 
          this.item_data = res.data.item[0]
          this.item_data_patrones = res.data.patrones
          this.item_data_sucursales = res.data.sucursales
          this.item_data.empresa_id = res.data.sucursales[0].empresa_id
          })
        .catch(err => {
          if(err.response.status === 404) {
            this.item_not_found = true
            return
          }else if(err.response.status == 300){
      
            this.$vs.notify({
              title:'Error',
              text: err.response.data.message,
              color:'danger',
              iconPack: 'feather',
              icon:'icon-alert-circle'}) 

        }else{
          
          this.$vs.notify({
              title:'Error',
              text: err,
              color:'danger',
              iconPack: 'feather',
              icon:'icon-alert-circle'}) 
        }
      })


    },
  },
  created() {
    // Register Module UserManagement Module
    if(!moduleItemManagement.isRegistered) {
      this.$store.registerModule('itemManagement', moduleItemManagement)
      moduleItemManagement.isRegistered = true
    }
    this.fetch_item_data(this.$route.params.itemId)
  }
}

</script>
