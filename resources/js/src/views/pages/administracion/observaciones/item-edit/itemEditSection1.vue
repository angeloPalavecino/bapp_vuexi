<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-edit">

    <!-- Content Row -->
    
    <div class="vx-row mt-6">
      <vs-divider color="primary"><h5>Datos Observacion</h5></vs-divider>
      
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Descripcion" v-model="data_local.descripcion" class="w-full p-1" name="descripcion" v-validate="'required'" 
      :danger="(errors.first('descripcion') ? true : false)" :danger-text="(errors.first('descripcion') ? errors.first('descripcion') : '')" 
      val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
      </div>
    
    </div>
    <!-- Content Row -->

    <!-- Buttons -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'observaciones'}">Volver</vs-button>
          </vx-tooltip>
        
          <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
          </vx-tooltip>
          
        </div>
      </div>
    </div>
    <!-- Buttons -->
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
    custom: {
        descripcion: {
            required: 'La descripcion es requerido',
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
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      urlApi: "/observaciones/observaciones/",
      data_local: {
        id : this.data.id ? this.data.id: null,
        descripcion : this.data.descripcion ? this.data.descripcion: null,
      },
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
  },
  methods: {
    save_changes() {
      this.$validator.validateAll().then(result =>{
        if (result) {
  
      this.$store.dispatch("itemManagement/editarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'observaciones'}); this.showDeleteSuccess() })
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
        id : this.data.id ? this.data.id: null,
        descripcion : this.data.descripcion ? this.data.descripcion: null,
      }
          
      this.errors.clear();
    },
  },
}
</script>
<style lang="scss">
</style>
