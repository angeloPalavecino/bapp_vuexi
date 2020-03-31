<!-- =========================================================================================
    File Name: LockScreen.vue
    Description: Lock Screen Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter justify-center items-center">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@assets/images/pages/lock-screen.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Tu sesion ha expirado</h4>
                                    <span class="text-sm">Escriba su password si quiere ingresar nuevamente.</span>
                                </div>
                                <vs-input
                                        v-validate="'required|email|min:3'"
                                        data-vv-validate-on="blur"
                                        name="email"
                                        icon-no-border
                                        icon="icon icon-user"
                                        icon-pack="feather"
                                        label-placeholder="Email"
                                        v-model="email"
                                        class="w-full mt-6"
                                        :disabled="true" />
                                    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                                <vs-input
                                        data-vv-validate-on="blur"
                                        v-validate="'required'"
                                        type="password"
                                        name="password"
                                        icon-no-border
                                        icon="icon icon-lock"
                                        icon-pack="feather"
                                        label-placeholder="Password"
                                        v-model="password"
                                        class="w-full mt-6" />
                                    <span class="text-danger text-sm mt-6">{{ errors.first('password') }}</span>

                                <div class="flex justify-between flex-wrap mt-6">
                                    <router-link to="/pages/login" class="mb-4">No es uds?</router-link>
                                    <vs-button :disabled="!validateForm" @click="submit" class="ml-2">Desbloquear</vs-button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
 import { getEmail, setToken} from "../../utils/jwtHelper";
 import axios from "@/axios.js"
export default {
    mounted () {
      this.email = getEmail();
    },
    data() {
        return {
             email: "",
             password: "",
        }
    },
    computed: {
        validateForm() {
        return !this.errors.any() && this.email != '' && this.password != '';
        },
  },
     methods: {
      async submit () {

         this.$vs.loading()

           axios.post('/api/auth/login', {
            email: this.email,
            password: this.password
          })
            .then((res) => {
            
            this.$vs.loading.close() 
            setToken(res.data);
            this.$jwtEvents.$emit('login');
            this.$store.commit('UPDATE_USER_INFO',  res.data.userData)   
            if (this.$route.query.redirect) {
              return this.$router.replace(
                this.$route.query.redirect !== 'page-lock-screen' ? this.$route.query.redirect : 'home'
              )
            }
            return this.$router.replace({ name: 'home' })

            })
            .catch((err) => { 
            
            this.$vs.loading.close()
            var textError = err.response.status == 300 ? err.response.data.message : err;
            this.$vs.notify({
                        title:'Error',
                        text: textError,
                        color:'danger',
                        iconPack: 'feather',
                        icon:'icon-alert-circle'})  

        })  
        
        /*this.$http.post('/api/auth/login', {
            email: this.email,
            password: this.password
          })

        .then((res) => { 
          this.$vs.loading.close() 
          setToken(res.data);
          this.$jwtEvents.$emit('login');
          if (this.$route.query.redirect) {
            return this.$router.replace(
              this.$route.query.redirect !== 'page-lock-screen' ? this.$route.query.redirect : 'home'
            )
          }
          return this.$router.replace({ name: 'home' })
       
          })

        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })*/
      
        /*try {
          const { data } = await this.$http.post('auth/login', {
            email: this.form.email,
            password: this.form.password
          });
          setToken(data);
          this.$jwtEvents.$emit('login');
          if (this.$route.query.redirect) {
            return this.$router.replace(
              this.$route.query.redirect !== 'lock' ? this.$route.query.redirect : 'products'
            )
          }
          return this.$router.replace({ name: 'ProductsList' })
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }*/
      }
    }
}
</script>
