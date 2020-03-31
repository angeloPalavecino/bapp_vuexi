<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Recupere su password</h4>
                                    <p>Ingrese su dirección de correo electrónico y le enviaremos instrucciones sobre cómo restablecer su contraseña.</p>
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
                                    class="w-full mt-6"/>
                                <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                                <div class="flex justify-between flex-wrap mt-6">
                                    <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Volver</vs-button>
                                    <vs-button :disabled="!validateForm" class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Recuperar Password</vs-button>
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
export default {
    data() {
        return {
             email: "",
        }
    },
    computed: {
    validateForm() {
      return !this.errors.any() && this.email != '';
    },
  },
}
</script>
