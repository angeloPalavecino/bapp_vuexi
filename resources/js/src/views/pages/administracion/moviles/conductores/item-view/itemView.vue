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

    <vs-alert color="danger" title="Conductor no encontrado" :active.sync="item_not_found">
      <span>El conductor con id: {{ $route.params.itemId }} no fue encontrado. </span>
      <span>
        <span>Mira </span><router-link :to="{name:'conductores'}" class="text-inherit underline">Todos los conductores</router-link>
      </span>
    </vs-alert>

    <div id="item-data" v-if="item_data">

      <!-- DATOS CONDUCTORES -->
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
                <td class="font-semibold">Nombre</td>
                <td>{{ item_data.name }} </td>
              </tr>
              <tr>
                <td class="font-semibold">Apellido</td>
                <td>{{ item_data.lastname }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Rut</td>
                <td>{{ item_data.rut }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ item_data.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Telefono</td>
                <td>{{ item_data.telefono }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Licencias</td>
                <td>{{ item_data.clase }}</td>
              </tr>
              <tr>
                <td class="font-semibold">N° Movil</td>
                <td>{{ item_data.numero_movil }}</td>
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
                <td class="font-semibold">Ciudad</td>
                <td>{{ item_data.ciudad }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Comuna</td>
                <td>{{ item_data.comuna }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Direccion</td>
                <td>{{ item_data.direccion }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Numeracion</td>
                <td>{{ item_data.numeracion }}</td>
              </tr>
                <tr>
                <td class="font-semibold">Habilitado</td>
                <td>{{ item_data.habilitado === 1 ? 'Si' : 'No' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Asociado</td>
                <td>{{ item_data.second_name }} {{ item_data.second_lastname }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Conductor por defecto?</td>
                <td>{{ item_data.driver_default === 1 ? 'Si' : 'No'  }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Ultima Actualizacion</td>
                <td>{{ item_data.updated_at }}</td>
              </tr>
            </table>
          </div>
          <!-- Information - Col 2 -->
       </div>

      </vx-card> 
       <!-- DATOS CONDUCTORES -->

            
     <!-- DOCUMENTOS -->
    <vx-card class="mb-base" title="Documentos" collapseAction>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="FileIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Detalle</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto" >
        <vs-table max-items="4" pagination  :data="item_data_documents">
                  <template slot="header">
                  </template>
                  <template slot="thead">
                    <vs-th colspan="2">
                       Documento
                    </vs-th>
                    <vs-th>
                       Vencimiento
                    </vs-th>
                    <vs-th>
                      Descarga
                    </vs-th>                                     
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :key="indextrdoc" v-for="(trdoc, indextrdoc) in data" >
                      <vs-td colspan="2">
                        {{ trdoc.name.split(/[.,\/-]/)[1] }}
                      </vs-td>
                      <vs-td>
                        <vs-chip :color="getStatusDocs(trdoc.fecha_vencimiento)">{{ trdoc.fecha_vencimiento }}</vs-chip>
                      </vs-td>                  
                      <vs-td :data="data[indextrdoc].url">
                        <a style="cursor: pointer;" rel="nofollow" @click="downloadDocument(data[indextrdoc].id, data[indextrdoc].name)">Descargar</a>                        
                      </vs-td>

                    </vs-tr>
                  </template>
                </vs-table>
      </div>

    </vx-card>
    <!-- DOCUMENTOS -->
     
  
         <!-- Buttons -->
          <div class="vx-col w-full flex mt-4" id="account-manage-buttons">
            <vx-tooltip color="primary" text="Editar">
              <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'conductores-edit', params: { itemId: $route.params.itemId }}">Editar</vs-button>
            </vx-tooltip>
            <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="mr-4" :to="{name: 'conductores'}">Volver</vs-button>
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
      item_data_documents:null,
      item_not_found: false,
      urlApi: "/driver/driver/",
    }
  },
  computed: {
  },
  methods: {
    downloadDocument(id, name){
    
      axios.get(`/api/v1/driver/driver/document/`+id, {responseType: 'blob'})
        .then((res) => {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(res.data);
            a.href = url;
            a.download = name;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        
        })
        .catch((err) => { 

        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})  

      })
    },
     getStatusDocs(fecha) {
      var factual = new Date();
      var fvencimiento = new Date(fecha);  
      if (fvencimiento.getTime() >= factual.getTime()) return "success";
      if (fvencimiento.getTime() <= factual.getTime()) return "danger";
      return "danger";
    },
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirmar Eliminacion`,
        text: `Este seguro que desea eliminar el siguiente conductor "${this.item_data.name}"`,
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
         .then(()   => { this.$router.push({name:'conductores'}); this.showDeleteSuccess() })
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
        title: 'Conductor Eliminado',
        text: 'El conductor seleccionado ya fue eliminado'
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

          this.item_data = res.data.item[0]
          this.item_data_documents = res.data.documents 
          
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
