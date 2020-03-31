<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-item-view">

    <vs-alert color="danger" title="Observacion interna no encontrado" :active.sync="item_not_found">
      <span>La observacion interna con id: {{ $route.params.itemId }} no fue encontrado. </span>
      <span>
        <span>Mira </span><router-link :to="{name:'obsinternas'}" class="text-inherit underline">Todas las observaciones internas</router-link>
      </span>
    </vs-alert>

    <div id="item-data" v-if="item_data">

      <!-- DATOS OBS INTERNAS -->
      <vx-card title="Informacion" class="mb-base">
      <div class="vx-row">
              <div class="vx-col w-full">
                <div class="flex items-end px-3">
                  <feather-icon svgClasses="w-6 h-6" icon="InfoIcon" class="mr-2" />
                  <span class="font-medium text-lg leading-none">Detalle</span>
                </div>
                <vs-divider />
              </div>
            </div>
        <div class="vx-row">          
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Descripcion</td>
                <td>{{ item_data.descripcion }} </td>
              </tr>
              <tr>
                <td class="font-semibold">Creado el</td>
                <td>{{ item_data.created_at }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Ultima Actualizacion</td>
                <td>{{ item_data.updated_at }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 --> 
       </div>

      </vx-card> 
       <!-- DATOS OBS INTERNAS -->
    
         <!-- Buttons -->
          <div class="vx-col w-full flex mt-4" id="account-manage-buttons">
            <vx-tooltip color="primary" text="Editar">
              <vs-button v-if="$can('obsinternas.edit')" icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'obsinternas-edit', params: { itemId: $route.params.itemId }}">Editar</vs-button>
            </vx-tooltip>
            <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="mr-4" :to="{name: 'obsinternas'}">Volver</vs-button>
            </vx-tooltip>
            <vx-tooltip color="primary" text="Eliminar">
              <vs-button v-if="$can('obsinternas.destroy')" type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Eliminar</vs-button>
            </vx-tooltip>
          </div>
           <!-- Buttons -->



    </div>
  </div>
</template>

<script>
import axios from "@/axios.js"

import moduleItemManagement from '@/store/items-management/moduleItemManagement.js'


export default {
  data() {
    return {
      item_data:null,
      item_not_found: false,
      urlApi: "/observacionesinternas/observacionesinternas/",
    }
  },
  computed: {
  },
  methods: {
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirmar Eliminacion`,
        text: `Este seguro que desea eliminar la siguiente observacion interna "${this.item_data.descripcion}"`,
        accept: this.deleteRecord,
        acceptText: "Eliminar"
      })
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      //this.$router.push({name:'users'});
      //this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
       this.$store.dispatch("itemManagement/borrarItem", {	Id: this.item_data.id, Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'obsinternas'}); this.showDeleteSuccess() })
         .catch(err => { 
           
          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  
          })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Observacion Interna Eliminada',
        text: 'La observacion interna seleccionada ya fue eliminada'
      })
    },
  },
  mounted() {
  },
  created() {
    // Register Module UserManagement Module
    if(!moduleItemManagement.isRegistered) {
      this.$store.registerModule('itemManagement', moduleItemManagement)
      moduleItemManagement.isRegistered = true
    }

    const itemId = this.$route.params.itemId
    const urlApi = this.urlApi
    this.$store.dispatch("itemManagement/traerItem", {	Id: itemId, Url: urlApi  })
      .then(res => { 

          this.item_data = res.data.item
          
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
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-item-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

   /* &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }*/
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
