import { checkPermiso,getToken } from "./jwtHelper";
import * as jwt from 'jsonwebtoken';
import authConfig from '../../auth_config.json'

export function guard (to, from, next) { 
  if (to.meta.authRequired) {  
    if(to.meta.permiso == "home.index" || to.meta.permiso == "perfil.index" || checkPermiso(to.meta.permiso)){  
      const token = getToken(); 
        if (token) {
          try {
            jwt.verify(token, authConfig.VUE_APP_KEY_JWT)
          } catch (e) {
            if (e.name === 'TokenExpiredError') {
              return next({ name: 'page-lock-screen', query: { redirect: from.name === 'page-lock-screen' ? 'home' : 'page-lock-screen' } })
            }
          }

        } else {

          return next({ name: 'page-login' })
        }

    }else{

        return next({ name: 'page-not-authorized' })

    }

    
  }
  next()
}
