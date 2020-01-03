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

    <vs-alert color="danger" title="Empresa no encontrada" :active.sync="item_not_found">
      <span>La empresa con id: {{ $route.params.itemId }} no fue encontrada. </span>
      <span>
        <span>Mira </span><router-link :to="{name:'kms'}" class="text-inherit underline">Todas las empresas</router-link>
      </span>
    </vs-alert>

    <div id="item-data" v-if="item_data">
     <!-- TARIFAS -->
    <vx-card class="mb-base" title="Tarifas">

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="DollarSignIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Detalle</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto" >
       
       <vs-table ref="tablepar" v-model="selected" multiple pagination search :data="item_data" class="tablaParametros">
         <template slot="header">

<!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer">

            <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32">
              <span class="mr-2 leading-none">Acciones</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item @click="confirmMassiveDeleteRecord()">
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Eliminar</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

  
       </template>

      <template slot="thead">
       <vs-th>ID</vs-th>
        <vs-th>T. Servicio</vs-th>
        <vs-th>N° Pasajeros</vs-th>
        <vs-th>Minima</vs-th>
        <vs-th>Kms</vs-th>
       
      <!--<vs-th sort-key="items-min">Minuto</vs-th>
        <vs-th sort-key="items-bajada_bandera">B. Bandera</vs-th>
        <vs-th sort-key="items-porticos">Porticos</vs-th>-->

        <vs-th sort-key="items-accion">Accion</vs-th>
      </template>

        <template slot-scope="{data}">
 
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="items-id font-medium">{{ tr.servicioskms[0].id }}</p>
              </vs-td>
              <vs-td>
                <p class="items-descripcion">{{ tr.servicioskms[0].descripcion }} </p>
              </vs-td>
              <vs-td>
                <p class="items-cant_psjs">{{ tr.servicioskms[0].cant_psjs }}</p>
              </vs-td>
              <vs-td>
                <p class="items-min_servicio">{{ tr.servicioskms[0].min_servicio }}</p>
              </vs-td>
              <vs-td>
                <p class="items-kms">{{ tr.servicioskms[0].kms }}</p>
              </vs-td>              
                
            <!--    <vs-td>
                <p class="items-min">{{ tr.servicioskms[0].min }}</p>
              </vs-td>
                <vs-td>
                <p class="items-bajada_bandera">{{ tr.servicioskms[0].bajada_bandera }}</p>
              </vs-td>
              <vs-td>
                <p class="items-porticos">{{ tr.servicioskms[0].porticos }}</p>
              </vs-td>-->
               

              <vs-td>
                   <div class="flex vx-col w-full sm:w-auto ml-auto mt-2 sm:mt-0" style="justify-content: center;">
                      <vx-tooltip color="primary" text="Eliminar">
                       <vs-button radius color="primary" type="border" icon-pack="feather" icon="icon-trash" size="small" class="ml-3" @click="confirmDeleteRecord(tr)"></vs-button>
                       </vx-tooltip>
                        <vx-tooltip color="primary" text="Editar">
                       <vs-button radius color="primary" type="border" icon-pack="feather" icon="icon-edit" size="small" class="ml-3" @click="editRecord(tr)"></vs-button>
                       </vx-tooltip>
                 </div>
            </vs-td>
            </vs-tr>
       
        </template>
    </vs-table>
      </div>

    </vx-card>
    <!-- TARIFAS -->
     
  
         <!-- Buttons -->
          <div class="vx-col w-full flex mt-4" id="account-manage-buttons">
          <!--  <vx-tooltip color="primary" text="Editar">
              <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'pasajeros-edit', params: { itemId: $route.params.itemId }}">Editar</vs-button>
            </vx-tooltip>-->
            <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="mr-4" :to="{name: 'kms'}">Volver</vs-button>
            </vx-tooltip>
           <!-- <vx-tooltip color="primary" text="Eliminar">
              <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Eliminar</vs-button> 
            </vx-tooltip>-->
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
      urlApi: "/tarifas/kms/",
      selected: [],
      tarifa:null
    }
  },
  computed: {
  },
  methods: {
   confirmDeleteRecord(tr) {
      
      this.tarifa = tr;
      
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirmar Eliminacion`,
        text: `Este seguro que desea eliminar la siguiente tarifa `,
        accept: this.deleteRecord,
        acceptText: "Eliminar"
      })
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      //this.$router.push({name:'users'});
      //this.showDeleteSuccess()
      const idTarifa = this.tarifa.id;
     
      /* UnComment below lines for enabling true flow if deleting user */
       this.$store.dispatch("itemManagement/borrarItem", {	Id: idTarifa, Url: this.urlApi  })
         .then(()   => { 
            //this.$router.push({name:'pasajeros'}); 
            this.item_data = this.$store.state.itemManagement.items;
            this.tarifa = null;
            this.showDeleteSuccess() 
         })
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
        title: 'Tarifa Eliminado',
        text: 'La tarifa seleccionada ya fue eliminada'
      })
    },
    confirmMassiveDeleteRecord() {
      if(this.selected.length === 0 ) {
        
           this.$vs.dialog({
                color:'danger',
                title: `Error`,
                text: 'Debe seleccionar al menos un registro para realizar esta accion.',
              })

        return;
      }

      this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Confirmar Eliminacion`,
              text: `Este seguro que desea eliminar los registros seleccionados`,
              accept: this.massivedeleteRecord,
              acceptText: "Eliminar"
      })

    },
     massivedeleteRecord() {
 
             this.$store.dispatch("itemManagement/borrarMasivoItem", {	Items: this.selected, Url: this.urlApi  })
               .then(()   => { 
                    
                    this.item_data = this.$store.state.itemManagement.items;
                    this.showMassiveDeleteSuccess() 
                 
                 })
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
    showMassiveDeleteSuccess() {
            this.$vs.notify({
              color: 'success',
              title: 'Usuarios Eliminados',
              text: 'Los registros ya fueron eliminados.'
            })
    },
     editRecord(tr) {
            this.$router.push("../item-edit/" + tr.id).catch(() => {})
      },  
  },
  created() {
    // Register Module UserManagement Module
    if(!moduleItemManagement.isRegistered) {
      this.$store.registerModule('itemManagement', moduleItemManagement)
      moduleItemManagement.isRegistered = true
    }

    //const itemId = 
    const urlApi = this.urlApi + 'listado/' + this.$route.params.itemId
    this.$store.dispatch("itemManagement/traerItems", urlApi)
      .then(res => { 

          this.item_data = res.data.items 
          
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

.tablaParametros {
   th .vs-table-text {
        justify-content: center !important;
  }

  tr {
    text-align: center;
  };
}

#page-item-view {
  table {
    td {
      vertical-align: top;
      //min-width: 140px;
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
