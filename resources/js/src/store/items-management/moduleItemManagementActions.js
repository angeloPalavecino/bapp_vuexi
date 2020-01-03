/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "@/axios.js"

export default {
   agregarItem({}, data) { //commit
     return new Promise((resolve, reject) => {
       axios.post("/api/v1" + data.Url + "store", data.item)
         .then((res) => {
           //commit('ADD_ITEM', Object.assign(data.item, {id: res.data.id}))
           resolve(res)
         })
         .catch((err) => { reject(err) })
     })
   },
   editarItem({}, data) { //commit
    return new Promise((resolve, reject) => {
      var url = ""
      if(data.item.id){
        url = data.Url + data.item.id;
      }else{
        url = data.Url;
      }

      axios.put("/api/v1" + url, data.item)
        .then((res) => {
         // commit('ADD_ITEM', Object.assign(data.item, {id: res.data.id}))
          resolve(res)
        })
        .catch((err) => { reject(err) })
    })
  },
  traerItems({ commit }, Url) {
    return new Promise((resolve, reject) => {
      axios.get("/api/v1" + Url)
        .then((res) => {
          commit('SET_ITEMS', res.data.items)
          resolve(res)
        })
        .catch((err) => { reject(err) }) 
    })
  },
  traerItem({}, data) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1` + data.Url + `${data.Id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => { reject(err) })
    })
  },
  borrarItem({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/v1` + data.Url + `${data.Id}`)
        .then((res) => {
          commit('REMOVE_RECORD', data.Id)
          resolve(res)
        })
        .catch((err) => { reject(err) })
    })
  },
  borrarMasivoItem({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/v1` + data.Url + "borrar", data.Items)
        .then((res) => {
          commit('REMOVE_MASSIVE_RECORD', data.Items)
          resolve(res)
        })
        .catch((err) => { reject(err) })
    })
  }


}
