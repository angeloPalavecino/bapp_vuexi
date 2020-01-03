<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-item-add">

    <vx-card>
     <item-add-section1 class="mt-4" />
    </vx-card>
  </div>
</template>

<script>
import itemAddSection1    from "./itemAddSection1.vue"

// Store Module
import moduleItemManagement from '@/store/items-management/moduleItemManagement.js'

export default {
  components: {
    itemAddSection1,
  },
  data() {
    return {
      urlApi: "/roles/roles/",
    }
  },
  watch: {
  },
  methods: {
  },
  created() {
    // Register Module UserManagement Module
    if(!moduleItemManagement.isRegistered) {
      this.$store.registerModule('itemManagement', moduleItemManagement)
      moduleItemManagement.isRegistered = true
    }
  }
}

</script>
