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
  addEvent({ commit }, event) {
    return new Promise((resolve, reject) => {
      axios.post("/api/v1/agendamientos/agendamientos/store", {event: event})
        .then((response) => {
          //commit('ADD_EVENT', Object.assign(event, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchEvents({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get("/api/v1/agendamientos/agendamientos/eventos/" + id)
        .then((response) => {
          commit('SET_EVENTS', response.data.items)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  editEvent({ commit }, event) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/v1/agendamientos/agendamientos/${event.id}`, {event: event})
        .then((response) => {
          event.start = response.data.fecha.date;
          event.end = response.data.fecha.date;
          commit('UPDATE_EVENT', event)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeEvent({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/v1/agendamientos/agendamientos/${eventId}`)
        .then((response) => {
          commit('REMOVE_EVENT', eventId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  eventDragged({ commit }, event) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/v1/agendamientos/agendamientos/drag/${event.id}`, {event: event})
        .then((response) => {
          event.start = response.data.fecha.date;
          event.end = response.data.fecha.date;
          commit('UPDATE_EVENT', event)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
