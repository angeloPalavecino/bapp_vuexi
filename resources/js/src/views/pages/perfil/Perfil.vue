<!-- =========================================================================================
    File Name: Profile.vue
    Description: Profile Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
    <div id="profile-page">

        <!-- PROFILE HEADER -->
         <div class="profile-header">
            <div class="relative">
                <div class="cover-container rounded-t-lg">
                   <!-- <img src="../../../../../../assets/images/profile/cover/cover.jpg" alt="user-profile-cover"  class="responsive block">-->
                    <img :src="cover_img" alt="user-profile-cover" class="responsive block">
                </div>
                <div class="profile-img-container pointer-events-none">
                    <div>
                        <vs-avatar class="user-profile-img" :src="item_data.imagen" size="120px" />
                    <!--    <vs-avatar class="user-profile-img" :src="require(`../../../../../../assets/images/portrait/users/${item_data.imagen}`)" size="120px" />-->
                    </div>
                   <!--  <div class="profile-actions pointer-events-auto flex">
                          <vs-button icon-pack="feather" radius icon="icon-edit-2"></vs-button>
                        <vs-button icon-pack="feather" radius icon="icon-settings" class="ml-2 lg:ml-2"></vs-button>
                    </div>-->
                </div>
            </div>
            <div class="flex items-center justify-end flex-wrap profile-header-nav">

                <div class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                    <div class="text-sm sm:flex-grow">
                    <!--      <ul class="sm:flex justify-around mt-8 w-full md:mt-0 md:ml-auto md:w-3/4">
                            <li class="p-2 sm:p-0"><router-link to="/pages/profile">Link</router-link></li>
                            <li class="p-2 sm:p-0"><router-link to="/pages/profile">Link</router-link></li>
                            <li class="p-2 sm:p-0"><router-link to="/pages/profile">Link</router-link></li>
                            <li class="p-2 sm:p-0"><router-link to="/pages/profile">Link</router-link></li>
                            <li class="p-2 sm:p-0"><router-link to="/pages/profile">Link</router-link></li>
                            <li class="p-2 sm:p-0"><router-link to="/pages/profile">Link</router-link></li>
                        </ul>-->
                    </div>
                </div>
            </div>
            <!-- <vx-navbar> -->
            <!-- </vx-navbar> -->
        </div>

                <!-- COL AREA -->
        <div class="vx-row mt-6">
            <!-- COL 1 -->
            <div class="vx-col w-full">
         <vx-card class="mt-base">
              <template slot="actions">
                      <!--  <feather-icon icon="MoreHorizontalIcon"></feather-icon>-->
                    </template>
          <div class="vx-row flex-col-reverse lg:flex-row">

            <!-- LEFT COL -->
            <div class="vx-col w-full lg:w-1/2 xl:w-1/2 flex flex-col justify-between">
              <div>
                <h2 class="mb-1 font-bold">Perfil</h2>
                
                <vs-chip color="primary mt-2" >
                    <vs-avatar icon-pack="user" icon="icon-mail" />
                    <span class="font-medium">Datos usuario</span>
                </vs-chip>
              </div>
              
            </div>

            <!-- RIGHT COL -->
            <div class="vx-col w-full lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 mb-base" style="margin:auto;align-items: flex-end;">
                 <div class="social-links flex mt-6">
                    <vx-tooltip color="primary" text="Enviar correo">
                        <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="MailIcon"></feather-icon>
                    </vx-tooltip>
                    <vx-tooltip color="primary" text="Cambiar password">
                        <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="KeyIcon"
                         @click="popupActivo=true"></feather-icon>
                    </vx-tooltip>
                    </div>
            </div>

          </div>
          <vs-divider class="my-6"></vs-divider>
         
          <div class="vx-row">
              <!-- Nombre -->
            <div class="vx-col w-1/2 mb-3 mt-4">
               
               <vs-divider position="left" color="primary"  >NOMBRE</vs-divider>
               <h4 style="margin-left: 50px;"> {{ activeUserInfo.name }}</h4>
               
             </div>
             <!-- Apellido -->
            <div class="vx-col w-1/2 mb-3 mt-4" >
               <vs-divider position="left" color="primary" >APELLIDO</vs-divider>
               <h4 style="margin-left: 50px;"> {{ activeUserInfo.lastname }}</h4>
              
            </div>
             <!-- Rut -->
            <div class="vx-col w-1/2 mb-3 mt-4">
             <vs-divider position="left" color="primary">RUT</vs-divider>
             <h4 style="margin-left: 50px;">  {{ activeUserInfo.rut }}</h4>
            </div>
            <!-- Empresa -->
            <div class="vx-col w-1/2 mb-3 mt-4">
              <vs-divider position="left" color="primary">EMPRESA</vs-divider>
              <h4 style="margin-left: 50px;"> {{ activeUserInfo.empresa }}</h4>
            </div>
            <!-- Rol -->
            <div class="vx-col w-1/2 mb-3 mt-4">
              <vs-divider position="left" color="primary">ROL</vs-divider>
              <h4 style="margin-left: 50px;"> {{ activeUserInfo.rol  }}</h4>
            </div>
             <!-- Email -->
            <div class="vx-col w-1/2 mb-3 mt-4">
              <vs-divider position="left" color="primary">EMAIL</vs-divider>
              <h4 style="margin-left: 50px;"> {{ activeUserInfo.email }}</h4>
            </div>
            <!-- Telefono -->
            <div class="vx-col w-1/2 mb-3 mt-4">
              <vs-divider position="left" color="primary">TELEFONO</vs-divider>
              <h4 style="margin-left: 50px;"> {{ activeUserInfo.telefono }}</h4>
            </div>
             <div class="vx-col w-1/2 mb-3 mt-4">
            </div>
             <!-- Creado -->
            <div class="vx-col w-1/2 mb-3 mt-4">
              <vs-divider position="left" color="primary">CREADO</vs-divider>
              <h4 style="margin-left: 50px;"> {{ activeUserInfo.creado }}</h4>
            </div>
            <!-- Actualizado -->
            <div class="vx-col w-1/2 mb-3 mt-4">
              <vs-divider position="left" color="primary">ACTUALIZADO</vs-divider>
              <h4 style="margin-left: 50px;"> {{ activeUserInfo.actualizado }}</h4>
            </div>
            
          </div>
           
         
        </vx-card>
        
        </div>

       
        </div>

        <vs-popup classContent="popup-example"  title="Cambiar Password" :active.sync="popupActivo">
            <div class="p-5">
            <h3>
                Ingresa la nueva clave
            </h3>
            <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full mt-2">
                  <vs-input type="password" v-validate="'required|min:8'" ref="password" label-placeholder="Password" name="password" 
                  v-model="credendial.password"  class="w-full" 
                  :danger="(errors.first('password') ? true : false)" val-icon-danger="clear"/>
                  <span class="text-danger text-sm" v-show="errors.has('password')" >{{ errors.first('password') }}</span>
                </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                  <vs-input type="password" v-validate="'required|min:8|confirmed:password'" data-vv-as="password" label-placeholder="Confirmar Password" 
                  name="password_confirmation"  class="w-full" v-model="credendial.password_confirmation"
                  :danger="(errors.first('password_confirmation') ? true : false)" val-icon-danger="clear"/>
                  <span class="text-danger text-sm" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
           
                </div>
                 </div> 
                  <br/>
                 <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
                        <vs-button class="mr-3" @click.prevent="cambiarPassword()">GUARDAR</vs-button>
                    
                        <vs-button type="border" color="danger" ref="btncancelar"  @click="popupActivo=false">CANCELAR</vs-button>
                        </div>
            </div>
        </vs-popup>




    </div>
</template>

<script>
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
    custom: {
        password: {
            required: 'La password es requerida',
            min: "La password debe tener minimo 8 caracteres",
        },
        password_confirmation: {
            required: 'Debe ingresar la confirmacion de la password',
            min: "La confirmacion de la password debe tener minimo 8 caracteres",
            confirmed: "Las password debe ser iguales"
        }
    }
};

// register custom messages
Validator.localize('en', dict);
export default {
  data() {
    return {
      item_data : {
            imagen: require("@assets/images/portrait/users/avatar.jpg"),           
            },
            cover_img: require("@assets/images/profile/cover/cover.jpg"),
            ruta:'/users/',
            popupActivo:false,
            credendial: {
                password: "",
                password_confirmation : ""
        },
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
       //Cambiar Password
     cambiarPassword() {

      const thisIns = this;
      const url = thisIns.ruta + 'cambiarpass';

      this.$validator.validateAll().then(result =>{
        if (result) {

         axios.post(`/api/v1` + url, this.credendial)
        // this.$http.post() //this.item
            .then((res) =>{

              this.$vs.loading({ type: 'radius' , scale: 0.6 });
              this.popupActivo=false;
                setTimeout(() => {
                  this.$vs.loading.close()
                }, 500);

              thisIns.$vs.notify({
                title:'Exito',
                text: 'La password se ha cambiado con exito!.',
                color:'success',
                iconPack: 'feather',
                icon:'icon-alert-circle'}) 
                
                
                
            })
            .catch(function (err) {
              
                var textError = err.response.status == 300 ? err.response.data.message : err;
                thisIns.$vs.notify({
                            title:'Error',
                            text: textError,
                            color:'danger',
                            iconPack: 'feather',
                            icon:'icon-alert-circle'})           

            });
        } else {
        }
      })
    },
  },
  created() {

    //this.item_data.name = activeUserInfo.name;
    //this.item_data.lastname = activeUserInfo.lastname;
    //this.item_data.rut = activeUserInfo.rut;
    this.item_data.imagen = this.$store.state.AppActiveUser.photoURL;
    //this.item_data.telefono = activeUserInfo.telefono;
    //this.item_data.email = activeUserInfo.email;
    //this.item_data.rol = activeUserInfo.userRole;
    //this.item_data.empresa = activeUserInfo.empresa;
    //this.item_data.created_at = activeUserInfo.creado;
    //this.item_data.updated_at = activeUserInfo.actualizado;

  }
}

</script>

<style lang="scss">
@import "@sass/vuexy/pages/profile.scss";
</style>

