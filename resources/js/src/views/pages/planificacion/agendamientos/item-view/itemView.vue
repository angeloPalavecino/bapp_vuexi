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

    <vs-alert color="danger" title="Agendamiento no encontrada" :active.sync="item_not_found">
      <span>El agendamiento con id: {{ $route.params.itemId }} no fue encontrado. </span>
      <span>
        <span>Mira </span><router-link :to="{name:'agendamientos'}" class="text-inherit underline">Todos los agendamientos</router-link>
      </span>
    </vs-alert>

    <div id="item-data" v-if="item_data">

      <!-- DATOS AGENDAMIENTO -->
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
                <td class="font-semibold">Rut : </td>
                <td>{{ item_data.rut }} </td>
              </tr>
              <tr>
                <td class="font-semibold">Nombre : </td>
                <td>{{ item_data.nombre }}  {{ item_data.apellido }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Direccion : </td>
                <td>{{ item_data.direccion }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Comuna : </td>
                <td>{{ item_data.comuna }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Empresa : </td>
                <td>{{ item_data.razon_social }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Creado el : </td>
                <td>{{ item_data.created_at }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Email : </td>
                <td>{{ item_data.email }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Telefono : </td>
                <td>{{ item_data.telefono }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Centro de costo : </td>
                <td>{{ item_data.centro_costo }}</td>
              </tr>
              <tr>
                <td class="font-semibold">&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
               <tr>
                <td class="font-semibold">Sucursal : </td>
                <td>{{ item_data.sucursal }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Ultima Actualizacion : </td>
                <td>{{ item_data.updated_at }}</td>
              </tr>
            </table>
          </div>
          <!-- Information - Col 2 -->
       </div>

        <div class="vx-row">   
          <vs-divider color="primary" ><h5>Agendamiento</h5></vs-divider>
         <!-- Information - Col 3 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            
            <table>
              <tr>
                <td class="font-semibold">Fecha Inicio : </td>
                <td>{{ new Date(item_data.fecha_inicio).toLocaleDateString('en-GB') }}</td>
              </tr>
                <tr>
                <td class="font-semibold">Horario Plan : </td>
                <td>{{ item_data.horario_plan }}</td>
              </tr>
                 <tr>
                <td class="font-semibold">Estado : </td>
                <td>
                  <vs-chip class="ag-grid-cell-chip mt-2" :color="chipColor(item_data.estado)">
                  <span>{{ item_data.estado == false ? 'Vencido':'Activo' }}</span>
                  </vs-chip>    
                </td>
              </tr>
              
            </table>
          </div>
          <!-- Information - Col 3 -->

          <!-- Information - Col 4 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
             <tr>
                <td class="font-semibold">Fecha Termino : </td>
                <td>{{ new Date(item_data.fecha_fin).toLocaleDateString('en-GB') }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Tipo : </td>
                <td>{{ item_data.tipo }}</td>
              </tr>
            </table>
          </div>
          <!-- Information - Col 4 -->
        </div>
      
      </vx-card> 
       <!-- DATOS AGENDAMIENTO -->
 
         <!-- Buttons -->
          <div class="vx-col w-full flex mt-4" id="account-manage-buttons">
            <vx-tooltip color="primary" text="Editar">
              <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'agendamientos-edit', params: { itemId: $route.params.itemId }}">Editar</vs-button>
            </vx-tooltip>
            <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="mr-4" :to="{name: 'agendamientos'}">Volver</vs-button>
            </vx-tooltip>
            <vx-tooltip color="primary" text="Eliminar">
              <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Eliminar</vs-button>
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
      urlApi: "/agendamientos/agendamientos/",
    }
  },
  computed: {
  },
  methods: {
    chipColor(value) {
        if(value === true) return "success"
        else if(value === false) return "danger"
        else return "success"
  
    },
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirmar Eliminacion`,
        text: `Este seguro que desea eliminar el siguiente agendamiento "${this.item_data.rut}"`,
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
         .then(()   => { this.$router.push({name:'agendamientos'}); this.showDeleteSuccess() })
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
        title: 'Agendamiento Eliminado',
        text: 'El agendamiento seleccionado ya fue eliminada'
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

            var fecha = new Date();
            var fecha_fin = new Date(res.data.item.fecha_fin);
              
            if(fecha > fecha_fin){
               this.item_data.estado = false;
            }else{
               this.item_data.estado = true;
            }
          
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

.ag-grid-cell-chip {
  &.vs-chip-success {
    background: rgba(var(--vs-success),.15);
    color: rgba(var(--vs-success),1) !important;
    font-weight: 500;
  }
  &.vs-chip-warning {
    background: rgba(var(--vs-warning),.15);
    color: rgba(var(--vs-warning),1) !important;
    font-weight: 500;
  }
  &.vs-chip-danger {
    background: rgba(var(--vs-danger),.15);
    color: rgba(var(--vs-danger),1) !important;
    font-weight: 500;
  }
}

</style>
