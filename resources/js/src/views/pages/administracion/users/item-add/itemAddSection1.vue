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

    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img src="/images/portrait/users/avatar.jpg" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">Seleccione una imagen para cambiar el avatar</p>
            <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*">

            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
            <vs-button class="mr-4 mb-4">Cambiar Avatar</vs-button>
            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->

            <vs-button type="border" color="danger">Eliminar Avatar</vs-button>
          </div>
        </div>
      </div>
    </div>
    <!-- Avatar Row -->

    <!-- Content Row -->
    <div class="vx-row mt-6">
      <vs-divider color="primary"><h5>Datos Usuarios</h5></vs-divider>
      
        <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Nombre" v-model="data_local.name" class="w-full p-1" name="name" v-validate="'required|alpha_spaces'" 
      :danger="(errors.first('name') ? true : false)" :danger-text="(errors.first('name') ? errors.first('name') : '')" val-icon-danger="clear" />
    <!--  <span class="text-danger text-sm">{{ errors.first('name') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input label-placeholder="Apellido"  v-model="data_local.lastname" class="w-full  p-1" name="lastname" v-validate="'required|alpha_spaces'" 
      :danger="(errors.first('lastname') ? true : false)" :danger-text="(errors.first('lastname') ? errors.first('lastname') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('lastname') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input type="Email" label-placeholder="Email"  v-model="data_local.email" class="w-full  p-1" name="email" v-validate="'required|email'" 
      :danger="(errors.first('email') ? true : false)" :danger-text="(errors.first('email') ? errors.first('email') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span>-->
      </div>
      <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input  label-placeholder="Rut"  v-model="data_local.rut" class="w-full  p-1" name="rut" v-validate="'required|alpha_dash'" 
      :danger="(errors.first('rut') ? true : false)" :danger-text="(errors.first('rut') ? errors.first('rut') : '')" val-icon-danger="clear" />
     <!-- <span class="text-danger text-sm">{{ errors.first('rut') }}</span>-->
      </div>
      
       <div class="vx-col md:w-1/2 w-full mt-2">
         <vs-input label-placeholder="Telefono" v-model="data_local.telefono" class="w-full p-1" name="telefono" 
       v-validate="'required|numeric'" :danger="(errors.first('telefono') ? true : false)" 
       :danger-text="(errors.first('telefono') ? errors.first('telefono') : '')" val-icon-danger="clear"/>
      <!--<span class="text-danger text-sm">{{ errors.first('telefono') }}</span>-->
      </div>
       
       <div class="vx-col md:w-1/2 w-full mt-2">
        <label class="vs-input--label ">Habilitado</label>
        <br/>
        <vs-switch class="mt-2" v-model="data_local.habilitado" />
        <!--<vs-radio color="success" v-model="data_local.habilitado" vs-value="1" class="mt-2">Activo</vs-radio>
        <vs-radio color="danger" v-model="data_local.habilitado" vs-value="0" class="mt-2">Inactivo</vs-radio>-->
       </div> 

      <div class="vx-col md:w-1/2 w-full mt-2">  
        <vs-select v-model="data_local.roles" label="Roles" name="roles" class="w-full p-1" v-validate="'required'" 
        :dir="$vs.rtl ? 'rtl' : 'ltr'" @input="setSelected"
        :danger="(errors.first('roles') ? true : false)"
             :danger-text="(errors.first('roles') ? errors.first('roles') : '')">
            <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in roleOptions"  />
        </vs-select>
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-select v-model="data_local.empresa_id" label="Empresa" ref="empresa" name="empresa" class="w-full p-1" 
            v-validate="'required'" :disabled="(data_local.roles > 2 ? false : true)" :dir="$vs.rtl ? 'rtl' : 'ltr'"
             :danger="(errors.first('empresa') ? true : false)"
             :danger-text="(errors.first('empresa') ? errors.first('empresa') : '')">
          <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresaOptions"  />
          </vs-select>
      </div>

       <div class="vx-col md:w-1/2 w-full mt-2">
      <vs-input type="password" v-validate="'required|min:8'" ref="password" label-placeholder="Password"
      name="password" v-model="data_local.password"  :danger-text="(errors.first('password') ? errors.first('password') : '')" class="w-full p-1" :danger="(errors.first('password') ? true : false)" 
      val-icon-danger="clear"/>
     <!-- <span class="text-danger text-sm" v-show="errors.has('password')" >{{ errors.first('password') }}</span>-->
      
      </div>

      <div class="vx-col md:w-1/2 w-full mt-2">
        <vs-input type="password" v-validate="'required|min:8|confirmed:password'" data-vv-as="password" label-placeholder="Confirmar Password" 
      name="password_confirmation"  class="w-full p-1"  :danger-text="(errors.first('password_confirmation') ? errors.first('password_confirmation') : '')" v-model="data_local.password_confirmation"
      :danger="(errors.first('password_confirmation') ? true : false)" val-icon-danger="clear"/>
     <!-- <span class="text-danger text-sm" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>-->
      </div>  
    
    </div>
    <!-- Content Row -->

    <!-- MOVILES -->
    <vx-card class="mt-base" no-shadow card-border v-show="data_local.roles === 2">

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="TruckIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Moviles</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <vs-input v-validate="(data_local.roles == 2 ? 'min_value:1' : '')" type="hidden" name="moviles" v-model="movilescount"/>
      <span class="text-danger text-sm">{{ errors.first('moviles') }}</span>

      <div class="block overflow-x-auto" >
        <vs-table ref="tablemoviles" max-items="10" @input="handleSelectedMoviles" multiple v-model="data_local.moviles" 
		      pagination search :data="movilesOptions">
           <template slot="header">
                  <span>
                      Seleccione al menos un movil
                  </span>
            </template>
          <template slot="thead">
            <vs-th >ID</vs-th>
            <vs-th >N° Movil</vs-th>
            <vs-th >Patente</vs-th>
          </template>
          <template slot-scope="{data}"> 
                <vs-tr :data="trmov" :key="indextrmov" v-for="(trmov, indextrmov) in data">
                  <vs-td>
                    <p>{{ trmov.id }}</p>
                  </vs-td>
                  <vs-td>
                    <p>{{ trmov.numero_movil }}</p>
                  </vs-td>
                  <vs-td>
                    <p>{{ trmov.patente }}</p>
                  </vs-td>             
                </vs-tr>  
            </template>
        </vs-table>
      </div>

    </vx-card>
    <!-- MOVILES -->
    <!-- BUTTONS -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'users'}">Volver</vs-button>
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
            alpha_spaces: "El nombre solo puede contener letras"
        },
        lastname: {
            required: 'El apellido es requerido',
            alpha_spaces: "El apellido solo puede contener letras"
        },
        rut: {
            required: 'El rut es requerido',
            alpha_dash: "Ingrese un rut valido"
        },
        email: {
            required: 'El email es requerido',
            email: "Ingrese un email valido"
        },
        roles: {
            required: 'El rol es requerido',
        },
        empresa: {
            required: 'La empresa es requerido',
        },
        telefono: {
            required: 'El telefono es requerido',
            numeric: "El numero de telefono debe ser valido"
        },
        password: {
            required: 'La password es requerida',
            min: "La password debe tener minimo 8 caracteres",
        },
        password_confirmation: {
            required: 'Debe ingresar la confirmacion de la password',
            min: "La confirmacion de la password debe tener minimo 8 caracteres",
            confirmed: "Las password debe ser iguales"
        },
        moviles: {
            min_value: "Debe seleccionar al menos 1 movil",
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
      urlApi: "/users/users/",
      data_local: {
          habilitado :  1,
          moviles: [],
          empresa_id: null,
          roles: null
      },
      roleOptions: [],
      empresaOptions: [],
      movilesOptions:[],
      movilescount:0
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
     setSelected(value) {
            if(value <= 2){
             this.data_local.empresa_id = 1;
              if(value != 2 ){//&& this.modoEditar == false
                 this.data_local.moviles = [];
                 this.movilescount = 0;
              }  
        }
    },
    handleSelectedMoviles(tr) {
      this.movilescount = tr.length;
    },
    save_changes() {
     this.$validator.validateAll().then(result =>{
        if (result) {
         this.$store.dispatch("itemManagement/agregarItem", {	item: this.data_local , Url: this.urlApi  })
         .then(()   => { this.$router.push({name:'users'}); this.showDeleteSuccess() })
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
        habilitado : 1,
        moviles: [],
        empresa_id: '',
        roles: ''
      }
       this.movilescount = 0;
       this.errors.clear();
    },
    update_avatar() {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    },
    traeOtrosDatos() {
      //Combo Empresa
      axios.get(`/api/v1/empresas/listemp`)
        .then((res) => {
          this.empresaOptions = res.data.items;  
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
      //Combo Roles
      axios.get(`/api/v1/roles/roles`)
        .then((res) => {
            this.roleOptions = res.data.items;  
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

       //Combo Moviles
       axios.get(`/api/v1/car/cars`)
        .then((res) => {
            this.movilesOptions = res.data.items;  
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
