<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-add">

    <!-- Content Row -->
    <div class="vx-row mt-6">
      <vs-divider color="primary"><h5>Datos Rol</h5></vs-divider>
      
        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Nombre" v-model="data_local.name" class="w-full p-1" name="name" v-validate="'required'" 
      :danger="(errors.first('name') ? true : false)" :danger-text="(errors.first('name') ? errors.first('name') : '')" val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
      </div>
   
     </div>
    <!-- Content Row -->

    <!-- PERMISOS -->
    <vx-card class="mt-base" no-shadow card-border>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Permisos</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <span class="text-danger text-sm" v-show="errors.has('permisos')">{{ errors.first('permisos') }}</span>
    
      <div class="block overflow-x-auto" >
           <vs-table :data="permisosOptions" pagination   max-items="10" class="permisos">

                      <template slot="thead">
                        <vs-th>Modulo</vs-th>
                        <vs-th>Agregar</vs-th>
                        <vs-th>Crear</vs-th>
                        <vs-th>Inicio</vs-th>
                        <vs-th>Actualizar</vs-th>
                        <vs-th>Ver</vs-th>
                        <vs-th>Eliminar</vs-th>
                        <vs-th>Editar</vs-th>
                      </template>

                      <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                          
                          <vs-td :data="data[indextr].modulos">
                            {{ data[indextr].modulos }}
                          </vs-td>
                                                              
                            <vs-td v-for="(td, index) in data[indextr].roles" :key="index">
                              <vs-checkbox name="permisos" v-validate="'required'" icon-pack="feather" icon="icon-check" v-model="data_local.permisos" :vs-value="td.id"/>
                            </vs-td>
                     
                        </vs-tr>
                      </template>

                    </vs-table>
      </div>

    </vx-card>
    <!-- PERMISOS -->
    
    <!-- BUTTONS -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button v-if="$can('roles.store')"  class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'roles'}">Volver</vs-button>
          </vx-tooltip>
        
          <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
          </vx-tooltip>
          
        </div>
      </div>
    </div>
     <!-- BUTTONS -->
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
    custom: {
        name: {
            required: 'El nombre es requerido',
        },
        permisos: {
            required: "Debe seleccionar al menos 1 permiso",
        }
    }
};

// register custom messages
Validator.localize('en', dict);
export default {
  components: {
    vSelect
  },
  props: {
  },
  data() {
    return {
      urlApi: "/roles/roles/",
      data_local: {
        permisos:[],
      },
      permisosOptions: []
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
    this.traeOtrosDatos();
  },
  methods: {
    save_changes() {
     this.$validator.validateAll().then(result =>{
        if (result) {
         this.$store.dispatch("itemManagement/agregarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'roles'}); this.showDeleteSuccess() })
         .catch(err => { 
           
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                title:'Error',
                text: textError,
                color:'danger',
                iconPack: 'feather',
                icon:'icon-alert-circle'})  
        })
        }
      })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Guardar registros',
        text: 'Los registros se han guardado exitosamente.'
      })
    },
    reset_data() {
      this.data_local = {
          permisos:[]
      }
      
      this.errors.clear();
    },
    traeOtrosDatos() {
      //Trae Permisos
      axios.get(`/api/v1/permisos/permisos`)
        .then((res) => {
          this.permisosOptions = res.data.permisos_aux;  
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
    }
  },
}
</script>
<style lang="scss">

.permisos {
  .vs-checkbox {
      justify-content: center !important; 
    }
      th .vs-table-text {
        justify-content: center !important;
  }

  td {
    padding: 4px !important;
}
}

</style>
