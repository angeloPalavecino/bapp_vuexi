import Vue from 'vue'
import VueJwtDecode from 'vue-jwt-decode'
import * as jwt from 'jsonwebtoken'
import router from '../router'
import authConfig from '../../auth_config.json'


export function checkPermiso (permissionName) {
  var user = JSON.parse(window.localStorage.getItem('userInfo'));
 	var permisos = user['permisos'];
  
  return permisos.indexOf(permissionName) !== -1;
}

export function getToken () {
  return window.localStorage.getItem('token')
}

export function setToken (token) {
  if (!token) {
    window.localStorage.removeItem('token')
  } else {
    if (typeof token === 'string') {
      window.localStorage.setItem('token', token)
    } else {
      window.localStorage.setItem('token', token['access_token'])
    }
  }
}

export function isLogged () {
  const token = getToken();
  if (token) {
    try {
      jwt.verify(token, authConfig.VUE_APP_KEY_JWT);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export function getUser () {
  const logged = isLogged();
  const token = getToken();
  if (logged) {
    return VueJwtDecode.decode(token)
  }
  return null;
}

export function getEmail () {
  const token = getToken();
  if (token) {
    try {
      //console.log(VueJwtDecode.decode(token));
      return VueJwtDecode.decode(token).email
    } catch (e) {
      // eslint-disable-next-line no-console
      //console.log('ERROR', e.message)
    }
  }
}

export function checkJwtExpired () {
  const token = window.localStorage.getItem('token')
  if (token) {
    try {
      jwt.verify(token, authConfig.VUE_APP_KEY_JWT)
      // eslint-disable-next-line no-console
      //console.log('logged!')
    } catch (e) {
      // eslint-disable-next-line no-console
      //console.log('Not logged: %j', e)
      if (e.name === 'TokenExpiredError') {
        if (router.history.current.name !== 'page-lock-screen') {
          Vue.prototype.$jwtEvents.$emit('tokenExpired')
          router.replace({ name: 'page-lock-screen', query: { redirect: router.history.current.path } })
        }
      }
    }
  } else {
    const guestRoutes = ['page-login']
    if (!guestRoutes.includes(router.history.current.name)) {
      Vue.prototype.$jwtEvents.$emit('tokenExpired')
      router.replace({ name: 'page-login' })
    }
  }
}

export async function refreshToken () {
  try {
    const token = window.localStorage.getItem('token')
    if (token) {
      try {
        jwt.verify(token, authConfig.VUE_APP_KEY_JWT)
        const { body } = await Vue.http.post('/api/auth/refresh')
        setToken(body)
      } catch (e) {
        // eslint-disable-next-line no-console
        //console.log(e)
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
   // console.log(e)
  }
}

export function dialogBeforeJwtExpires () {
  const user = getUser()
  if (user) {
    const exp = user.exp * 1000
    const now = Date.now()
    const diff = (exp - now) / 1000
    if (diff > 0) {
      // eslint-disable-next-line no-console
     // console.log('Seconds to expire:', diff)
      if (diff < 20) {
        Vue.prototype.$jwtEvents.$emit('tokenExpiring', diff)
      }
    }
  } else {
    const token = getToken()
    if (token) {
      if (router.history.current.name !== 'page-lock-screen') {
        Vue.prototype.$jwtEvents.$emit('tokenExpired')
        router.replace({ name: 'page-lock-screen', query: { redirect: router.history.current.path } })
      }
    }
  }
  // eslint-disable-next-line no-console
  //console.log('lockPageIfTokenExpired')
}

export function consoleLogForExpirationToken () {
  const user = getUser()
  if (user) {
    const exp = user.exp * 1000
    const now = Date.now()
    const diff = (exp - now) / 1000
    if (diff > 0) {
      // eslint-disable-next-line no-console
     // console.log('Second to expire:', Math.floor(diff))
    }
  }
}
