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

    <vs-alert color="danger" title="Empresa no encontrada" :active.sync="item_not_found">
      <span>La empresa con id: {{ $route.params.itemId }} no fue encontrado. </span>
      <span>
        <span>Mira  </span><router-link :to="{name:'pasajeros'}" class="text-inherit underline">Todas las empresas</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="item_data">
      <item-edit-section1 class="mt-4" :data="item_data"  />
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
      item_not_found: false,
      urlApi: "/tarifas/pasajeros/",
    }
  },
  watch: {
    activeTab() {
      this.fetch_item_data(this.$route.params.itemId)
    }
  },
  methods: {
    fetch_item_data(itemId) {
      
      this.$store.dispatch("itemManagement/traerItem", {	Id: itemId, Url: this.urlApi })
        .then(res => { 
          this.item_data = res.data.item[0]
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


    }
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
