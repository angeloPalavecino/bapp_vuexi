(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ "./resources/js/src/store/calendar/moduleCalendar.js":
/*!***********************************************************!*\
  !*** ./resources/js/src/store/calendar/moduleCalendar.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moduleCalendarState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduleCalendarState.js */ "./resources/js/src/store/calendar/moduleCalendarState.js");
/* harmony import */ var _moduleCalendarMutations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moduleCalendarMutations.js */ "./resources/js/src/store/calendar/moduleCalendarMutations.js");
/* harmony import */ var _moduleCalendarActions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moduleCalendarActions.js */ "./resources/js/src/store/calendar/moduleCalendarActions.js");
/* harmony import */ var _moduleCalendarGetters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moduleCalendarGetters.js */ "./resources/js/src/store/calendar/moduleCalendarGetters.js");
/*=========================================================================================
  File Name: moduleCalendar.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/




/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: _moduleCalendarState_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  mutations: _moduleCalendarMutations_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  actions: _moduleCalendarActions_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  getters: _moduleCalendarGetters_js__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./resources/js/src/store/calendar/moduleCalendarActions.js":
/*!******************************************************************!*\
  !*** ./resources/js/src/store/calendar/moduleCalendarActions.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/axios.js */ "./resources/js/src/axios.js");
/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

/* harmony default export */ __webpack_exports__["default"] = ({
  addEvent: function addEvent(_ref, event) {
    var commit = _ref.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/v1/agendamientos/agendamientos/store", {
        event: event
      }).then(function (response) {
        commit('ADD_EVENT', Object.assign(event, {
          id: response.data.id
        }));
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  fetchEvents: function fetchEvents(_ref2, id) {
    var commit = _ref2.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/v1/agendamientos/agendamientos/eventos/" + id).then(function (response) {
        commit('SET_EVENTS', response.data.items);
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  editEvent: function editEvent(_ref3, event) {
    var commit = _ref3.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].put("/api/v1/agendamientos/agendamientos/".concat(event.id), {
        event: event
      }).then(function (response) {
        commit('UPDATE_EVENT', event);
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  removeEvent: function removeEvent(_ref4, eventId) {
    var commit = _ref4.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].delete("/api/v1/agendamientos/agendamientos/".concat(eventId)).then(function (response) {
        commit('REMOVE_EVENT', eventId);
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  eventDragged: function eventDragged(_ref5, event) {
    var commit = _ref5.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].put("/api/v1/agendamientos/agendamientos/".concat(event.id), {
        event: event
      }).then(function (response) {
        commit('UPDATE_EVENT', event);
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
});

/***/ }),

/***/ "./resources/js/src/store/calendar/moduleCalendarGetters.js":
/*!******************************************************************!*\
  !*** ./resources/js/src/store/calendar/moduleCalendarGetters.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*=========================================================================================
  File Name: moduleCalendarGetters.js
  Description: Calendar Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
/* harmony default export */ __webpack_exports__["default"] = ({
  getEvent: function getEvent(state) {
    return function (eventId) {
      return state.events.find(function (event) {
        return event.id == eventId;
      });
    };
  }
});

/***/ }),

/***/ "./resources/js/src/store/calendar/moduleCalendarMutations.js":
/*!********************************************************************!*\
  !*** ./resources/js/src/store/calendar/moduleCalendarMutations.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
/* harmony default export */ __webpack_exports__["default"] = ({
  ADD_EVENT: function ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS: function SET_EVENTS(state, events) {
    state.events = events;
  },
  UPDATE_EVENT: function UPDATE_EVENT(state, event) {
    var eventIndex = state.events.findIndex(function (e) {
      return e.id == event.id;
    });
    Object.assign(state.events[eventIndex], event);
  },
  REMOVE_EVENT: function REMOVE_EVENT(state, eventId) {
    var eventIndex = state.events.findIndex(function (e) {
      return e.id == eventId;
    });
    state.events.splice(eventIndex, 1);
  }
});

/***/ }),

/***/ "./resources/js/src/store/calendar/moduleCalendarState.js":
/*!****************************************************************!*\
  !*** ./resources/js/src/store/calendar/moduleCalendarState.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*=========================================================================================
  File Name: moduleCalendarState.js
  Description: Calendar Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
/* harmony default export */ __webpack_exports__["default"] = ({
  // Calendar Labels
  eventLabels: [],
  // Simple Calendar State
  events: []
});

/***/ }),

/***/ "./resources/js/src/store/items-management/moduleItemManagement.js":
/*!*************************************************************************!*\
  !*** ./resources/js/src/store/items-management/moduleItemManagement.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moduleItemManagementState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduleItemManagementState.js */ "./resources/js/src/store/items-management/moduleItemManagementState.js");
/* harmony import */ var _moduleItemManagementMutations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moduleItemManagementMutations.js */ "./resources/js/src/store/items-management/moduleItemManagementMutations.js");
/* harmony import */ var _moduleItemManagementActions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moduleItemManagementActions.js */ "./resources/js/src/store/items-management/moduleItemManagementActions.js");
/* harmony import */ var _moduleItemManagementGetters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moduleItemManagementGetters.js */ "./resources/js/src/store/items-management/moduleItemManagementGetters.js");
/*=========================================================================================
  File Name: moduleItemManagement.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/




/* harmony default export */ __webpack_exports__["default"] = ({
  isRegistered: false,
  namespaced: true,
  state: _moduleItemManagementState_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  mutations: _moduleItemManagementMutations_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  actions: _moduleItemManagementActions_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  getters: _moduleItemManagementGetters_js__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./resources/js/src/store/items-management/moduleItemManagementActions.js":
/*!********************************************************************************!*\
  !*** ./resources/js/src/store/items-management/moduleItemManagementActions.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/axios.js */ "./resources/js/src/axios.js");
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

/* harmony default export */ __webpack_exports__["default"] = ({
  agregarItem: function agregarItem(_ref, data) {
    _objectDestructuringEmpty(_ref);

    //commit
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/v1" + data.Url + "store", data.item).then(function (res) {
        //commit('ADD_ITEM', Object.assign(data.item, {id: res.data.id}))
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  editarItem: function editarItem(_ref2, data) {
    _objectDestructuringEmpty(_ref2);

    //commit
    return new Promise(function (resolve, reject) {
      var url = "";

      if (data.item.id) {
        url = data.Url + data.item.id;
      } else {
        url = data.Url;
      }

      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].put("/api/v1" + url, data.item).then(function (res) {
        // commit('ADD_ITEM', Object.assign(data.item, {id: res.data.id}))
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  traerItems: function traerItems(_ref3, Url) {
    var commit = _ref3.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/v1" + Url).then(function (res) {
        commit('SET_ITEMS', res.data.items);
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  traerItem: function traerItem(_ref4, data) {
    _objectDestructuringEmpty(_ref4);

    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/v1" + data.Url + "".concat(data.Id)).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  borrarItem: function borrarItem(_ref5, data) {
    var commit = _ref5.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].delete("/api/v1" + data.Url + "".concat(data.Id)).then(function (res) {
        commit('REMOVE_RECORD', data.Id);
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  borrarMasivoItem: function borrarMasivoItem(_ref6, data) {
    var commit = _ref6.commit;
    return new Promise(function (resolve, reject) {
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/v1" + data.Url + "borrar", data.Items).then(function (res) {
        commit('REMOVE_MASSIVE_RECORD', data.Items);
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
});

/***/ }),

/***/ "./resources/js/src/store/items-management/moduleItemManagementGetters.js":
/*!********************************************************************************!*\
  !*** ./resources/js/src/store/items-management/moduleItemManagementGetters.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*=========================================================================================
  File Name: moduleCalendarGetters.js
  Description: Calendar Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./resources/js/src/store/items-management/moduleItemManagementMutations.js":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/store/items-management/moduleItemManagementMutations.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
/* harmony default export */ __webpack_exports__["default"] = ({
  SET_ITEMS: function SET_ITEMS(state, items) {
    state.items = items;
  },
  REMOVE_RECORD: function REMOVE_RECORD(state, itemId) {
    var itemIndex = state.items.findIndex(function (u) {
      return u.id == itemId;
    });
    state.items.splice(itemIndex, 1);
  },
  REMOVE_MASSIVE_RECORD: function REMOVE_MASSIVE_RECORD(state, itemsDelete) {
    itemsDelete.forEach(function (element) {
      var itemIndex = state.items.findIndex(function (u) {
        return u.id == element.id;
      });
      state.items.splice(itemIndex, 1);
    });
  }
});

/***/ }),

/***/ "./resources/js/src/store/items-management/moduleItemManagementState.js":
/*!******************************************************************************!*\
  !*** ./resources/js/src/store/items-management/moduleItemManagementState.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*=========================================================================================
  File Name: moduleCalendarState.js
  Description: Calendar Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
/* harmony default export */ __webpack_exports__["default"] = ({
  items: []
});

/***/ })

}]);