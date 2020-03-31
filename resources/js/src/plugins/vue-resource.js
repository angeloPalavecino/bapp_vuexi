import axios from "@/axios.js"
import { setToken } from '../utils/jwtHelper'
import { authenticationModes } from '../main'
//import authConfig from '../../auth_config.json'

//axios.defaults.baseURL = authConfig.VUE_APP_API_URL;
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
//axios.defaults.headers.common['Accept'] = 'application/json';


/*axios.post(authConfig.VUE_APP_API_URL, {
  headers: {
      'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
      'Accept' :  'application/json'
  }
})
.then((response) => {
  if (authenticationModes.refreshTokenFromAuthorizationHeaderResponse) {
    let header;
    for (header in response.headers.map) {
      if (header === 'authorization') {
        const bearer = response.headers.map[header][0];
        const split = bearer.split(' ');
        const token = split[1];
        setToken(token);
        // eslint-disable-next-line no-console
        console.log('token updated!', token)
      }
    }
  }
})*/

axios.interceptors.request.use(function (config) {
    config.headers = { Authorization: 'Bearer ' + window.localStorage.getItem('token') , 'Accept': 'application/json' };
    return config;
});

axios.interceptors.response.use(function (response) {
  if (authenticationModes.refreshTokenFromAuthorizationHeaderResponse) {
    let header;
    for (header in response.headers.map) {
      //console.log(header);
      if (header === 'authorization') {
        const bearer = response.headers.map[header][0];
        const split = bearer.split(' ');
        const token = split[1];
        setToken(token);
        // eslint-disable-next-line no-console
        //console.log('token updated!', token)
      }
    }
  }
  return response
});