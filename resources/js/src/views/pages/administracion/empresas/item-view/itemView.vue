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
      <span>La empresa con id: {{ $route.params.itemId }} no fue encontrado. </span>
      <span>
        <span>Mira </span><router-link :to="{name:'empresas'}" class="text-inherit underline">Todos las empresas</router-link>
      </span>
    </vs-alert>

    <div id="item-data" v-if="item_data">

      <!-- DATOS EMPRESAS -->
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
                <td class="font-semibold">Razon social</td>
                <td>{{ item_data.razon_social }} </td>
              </tr>
              <tr>
                <td class="font-semibold">Rut</td>
                <td>{{ item_data.rut }} - {{ item_data.dv }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Giro</td>
                <td>{{ item_data.giro }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Creado el</td>
                <td>{{ item_data.created_at }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Fecha Incorporacion</td>
                <td>{{ item_data.fecha_incorporacion }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Habilitado</td>
                <td>{{ item_data.habilitado === 1 ? 'Si' : 'No' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Hora Max. Agendamiento</td>
                <td>{{ item_data.hora_max_agendamiento  }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Ultima Actualizacion</td>
                <td>{{ item_data.updated_at }}</td>
              </tr>
            </table>
          </div>
          <!-- Information - Col 2 -->
       </div>

        <div class="vx-row">   
         <!-- Information - Col 3 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <vs-divider color="primary" ><h5>Ciclo produccion</h5></vs-divider>
            <table>
              <tr>
                <td class="font-semibold">Tipo</td>
                <td>{{ item_data_ciclo_produccion.dias === 0 ? 'Personalizado' : 'Por defecto (Mes Completo)' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Desde</td>
                <td>{{ item_data_ciclo_produccion.dias === 0 ?  'Dia ' + item_data_ciclo_produccion.inicio : '-' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Hasta</td>
                <td>{{ item_data_ciclo_produccion.dias === 0 ?  'Dia ' + item_data_ciclo_produccion.fin : '-' }}</td>
              </tr>
            </table>
          </div>
          <!-- Information - Col 3 -->

          <!-- Information - Col 4 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <vs-divider color="primary" ><h5>Ciclo facturacion</h5></vs-divider>
            <table>
              <tr>
                <td class="font-semibold">Tipo</td>
                <td>{{ item_data_ciclo_facturacion.dias === 0 ? 'Personalizado' : 'Por ' + item_data_ciclo_facturacion.dias + ' dias' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Desde</td>
                <td>{{ item_data_ciclo_facturacion.dias === 0 ? 'Dia ' + item_data_ciclo_facturacion.inicio : '-' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Hasta</td>
                <td>{{ item_data_ciclo_facturacion.dias === 0 ? 'Dia ' + item_data_ciclo_facturacion.fin : '-' }}</td>
              </tr>
            </table>
          </div>
          <!-- Information - Col 4 -->
        </div>
      
      </vx-card> 
       <!-- DATOS ASOCIADOS -->

  <!-- RESPONSABLES -->
    <vx-card class="mb-base" title="Responsables" collapseAction>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="UsersIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Detalle</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto" >
        <vs-table max-items="4" pagination  :data="item_data_responsables">
                  <template slot="header">
                  </template>
                  <template slot="thead">
                    <vs-th>
                       Nombre
                    </vs-th>
                    <vs-th>
                       Email
                    </vs-th>
                    <vs-th>
                      Telefono
                    </vs-th>                                     
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr :key="indextrres" v-for="(trres, indextrres) in data" >
                      <vs-td>
                        {{ trres.name }}
                      </vs-td>
                      <vs-td>
                         {{ trres.email }}
                      </vs-td>                  
                      <vs-td>
                         {{ trres.telefono }}
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
      </div>

    </vx-card>
    <!-- RESPONSABLES -->
            
     <!-- SUCURSALES -->
    <vx-card class="mb-base" title="Sucursales" collapseAction>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="MapPinIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Detalle</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto" >
        <vs-table max-items="4" pagination  :data="item_data_sucursales">
                  <template slot="header">
                  </template>
                  <template slot="thead">
                    <vs-th>
                       Nombre
                    </vs-th>
                    <vs-th>
                       Direccion
                    </vs-th>
                    <vs-th>
                      Matriz
                    </vs-th>                                     
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :key="indextrsuc" v-for="(trsuc, indextrsuc) in data" >
                      <vs-td>
                        {{ trsuc.nombre }}
                      </vs-td>
                      <vs-td>
                        {{ trsuc.direccion }}
                      </vs-td>                  
                      <vs-td>
                        {{ trsuc.matriz === 1 ? 'Si' : 'No' }}
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
      </div>

    </vx-card>
    <!-- SUCURSALES -->
     
  
         <!-- Buttons -->
          <div class="vx-col w-full flex mt-4" id="account-manage-buttons">
            <vx-tooltip color="primary" text="Editar">
              <vs-button v-if="$can('empresas.edit')" icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'empresas-edit', params: { itemId: $route.params.itemId }}">Editar</vs-button>
            </vx-tooltip>
            <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="mr-4" :to="{name: 'empresas'}">Volver</vs-button>
            </vx-tooltip>
            <vx-tooltip color="primary" text="Eliminar">
              <vs-button v-if="$can('empresas.destroy')" type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Eliminar</vs-button>
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
      item_data_responsables:null,
      item_data_sucursales:null,
      item_data_ciclo_facturacion:null,
      item_data_ciclo_produccion:null,
      item_not_found: false,
      urlApi: "/empresas/empresas/",
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
        text: `Este seguro que desea eliminar la siguiente empresa "${this.item_data.razon_social}"`,
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
         .then(()   => { this.$router.push({name:'empresas'}); this.showDeleteSuccess() })
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
        title: 'Empresa Eliminada',
        text: 'La empresa seleccionada ya fue eliminada'
      })
    }
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
            this.item_data_responsables =res.data.responsables
            this.item_data_sucursales = res.data.sucursales
            this.item_data_ciclo_facturacion = res.data.cicfac[0]
            this.item_data_ciclo_produccion = res.data.cicpro[0]
          
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
