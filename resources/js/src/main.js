/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'
import {
    refreshToken,
    checkJwtExpired,
    dialogBeforeJwtExpires,
    consoleLogForExpirationToken
  } from './utils/jwtHelper'



// Vuesax Component Framework
import Vuesax from 'vuesax'

Vue.use(Vuesax)

// axios
import axios from "./axios.js"
Vue.prototype.$http = axios


// Theme Configurations
import '../themeConfig.js'

// ACL
//import acl from './acl/acl'

// Globally Registered Components
import './globalComponents.js'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// i18n
import i18n from './i18n/i18n'

// Vuesax Admin Filters
import './filters/filters'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate);

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Feather font icon
require('@assets/css/iconfont.css')

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        // Add your API key here
        key: 'AIzaSyCk6Qet4uRb2EaiEoBgw-eOXedRMUuoudA',
        libraries: 'drawing,places', // This is required if you use the Auto complete plug-in
    },
})
// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

//Permisos
import Permissions from './mixins/checkPermisos';
Vue.mixin(Permissions);

import './plugins'



Vue.config.productionTip = false

Vue.prototype.$jwtEvents = new Vue();

export const authenticationModes = {
    autoRefreshToken: false, // auto refresh token before token expires automatically (nunca caduca la sesión)
    lockPageIfTokenExpired: true, // muestra una página de bloqueo si el token expira, no se refresca sólo
    dialogBeforeJwtExpires: false, // muestra una ventana modal antes de que el token expire para actualizar la sesión
    refreshTokenFromAuthorizationHeaderResponse: true // refresca el token automáticamente utilizando la respuesta de las cabeceras del servidor
  };
  
  // muestra un console.log cada segundo para saber cuánto falta para que expire el JWT
  setInterval(() => {
    consoleLogForExpirationToken()
  }, 1000);
  
  // aplicamos el sistema autoRefreshToken
  if (authenticationModes.autoRefreshToken) {
    refreshToken().then(() => {});
    // refresh the token each ttl - 10 (50 seconds)
    setInterval(async () => {
      await refreshToken()
    }, 50000)
  }
  
  // comprueba si el token ha expirado, y si es así, redirige a la página de lock
  if (
    authenticationModes.lockPageIfTokenExpired ||
    authenticationModes.refreshTokenFromAuthorizationHeaderResponse
  ) {
    // check if token is expired each 30 seconds
    setInterval(() => {
      checkJwtExpired()
    }, 30000)
  }
  
  // muestra una ventana modal unos segundos antes de que el token haya expirado
  if (authenticationModes.dialogBeforeJwtExpires) {
    // check each 10 seconds if token is near to expires
    setInterval(() => {
      dialogBeforeJwtExpires()
    }, 10000)
  }

 //Permisos
  /*Vue.directive('can', function (el, binding) {
    var user = JSON.parse(window.localStorage.getItem('userInfo'));
    var permisos = user['permisos'];
    var aux = permisos.indexOf(binding.value);
    if(aux == -1){
      
      el.disabled = true
      return true
      
    }else{
     
      el.disabled = false 
      return false
    }
    //return permisos.indexOf(binding.value) !== -1;
  })*/


new Vue({
    router,
    store,
    i18n,
   // acl,
    data () {
        return {
        authenticationModes
        }
    },
    render: h => h(App)
}).$mount('#app')
