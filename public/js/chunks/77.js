(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[77],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/store/items-management/moduleItemManagement.js */ "./resources/js/src/store/items-management/moduleItemManagement.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      item_data: null,
      item_data_movil: null,
      item_not_found: false,
      urlApi: "/users/users/"
    };
  },
  computed: {},
  methods: {
    confirmDeleteRecord: function confirmDeleteRecord() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirmar Eliminacion",
        text: "Este seguro que desea eliminar el siguiente usuario \"".concat(this.item_data.name, "\""),
        accept: this.deleteRecord,
        acceptText: "Eliminar"
      });
    },
    deleteRecord: function deleteRecord() {
      var _this = this;

      /* Below two lines are just for demo purpose */
      //this.$router.push({name:'users'});
      //this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      this.$store.dispatch("itemManagement/borrarItem", {
        Id: this.item_data.id,
        Url: this.urlApi
      }).then(function () {
        _this.$router.push({
          name: 'users'
        });

        _this.showDeleteSuccess();
      }).catch(function (err) {
        var textError = err.response.status == 300 ? err.response.data.message : err;

        _this.$vs.notify({
          title: 'Error',
          text: textError,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        });
      });
    },
    showDeleteSuccess: function showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Usuario Eliminado',
        text: 'El usuario seleccionado ya fue eliminado'
      });
    }
  },
  created: function created() {
    var _this2 = this;

    // Register Module UserManagement Module
    if (!_store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegistered) {
      this.$store.registerModule('itemManagement', _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
      _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegistered = true;
    }

    var itemId = this.$route.params.itemId;
    var urlApi = this.urlApi;
    this.$store.dispatch("itemManagement/traerItem", {
      Id: itemId,
      Url: urlApi
    }).then(function (res) {
      _this2.item_data = res.data.item[0];
      _this2.item_data_movil = res.data.itemcars;
    }).catch(function (err) {
      if (err.response.status === 404) {
        _this2.item_not_found = true;
        return;
      } else if (err.response.status == 300) {
        _this2.$vs.notify({
          title: 'Error',
          text: err.response.data.message,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        });
      } else {
        _this2.$vs.notify({
          title: 'Error',
          text: err,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        });
      }
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatar-col {\n  width: 10rem;\n}\n#page-item-view table {\n  /* &:not(.permissions-table) {\n     td {\n       @media screen and (max-width:370px) {\n         display: block;\n       }\n     }\n   }*/\n}\n#page-item-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  word-break: break-all;\n}\n[dir] #page-item-view table td {\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemView.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=template&id=5e4a72ca&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=template&id=5e4a72ca& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "page-item-view" } },
    [
      _c(
        "vs-alert",
        {
          attrs: {
            color: "danger",
            title: "Usuario no encontrado",
            active: _vm.item_not_found
          },
          on: {
            "update:active": function($event) {
              _vm.item_not_found = $event
            }
          }
        },
        [
          _c("span", [
            _vm._v(
              "El usuario con id: " +
                _vm._s(_vm.$route.params.itemId) +
                " no fue encontrado. "
            )
          ]),
          _vm._v(" "),
          _c(
            "span",
            [
              _c("span", [_vm._v("Mira ")]),
              _c(
                "router-link",
                {
                  staticClass: "text-inherit underline",
                  attrs: { to: { name: "users" } }
                },
                [_vm._v("Todos los usuario")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _vm.item_data
        ? _c(
            "div",
            { attrs: { id: "item-data" } },
            [
              _c(
                "vx-card",
                { staticClass: "mb-base", attrs: { title: "Informacion" } },
                [
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col w-full" },
                      [
                        _c(
                          "div",
                          { staticClass: "flex items-end px-3" },
                          [
                            _c("feather-icon", {
                              staticClass: "mr-2",
                              attrs: { svgClasses: "w-6 h-6", icon: "InfoIcon" }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "font-medium text-lg leading-none"
                              },
                              [_vm._v("Detalle")]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("vs-divider")
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col", attrs: { id: "avatar-col" } },
                      [
                        _c("div", { staticClass: "img-container mb-4" }, [
                          _c("img", {
                            staticClass: "rounded w-full",
                            attrs: { src: _vm.item_data.imagen }
                          })
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "vx-col flex-1",
                        attrs: { id: "account-info-col-1" }
                      },
                      [
                        _c("table", [
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Nombre")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.item_data.name) + " ")])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Apellido")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.item_data.lastname))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("RUT")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.item_data.rut))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Email")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.item_data.email))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Creado el")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.item_data.created_at))])
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "vx-col flex-1",
                        attrs: { id: "account-info-col-2" }
                      },
                      [
                        _c("table", [
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Telefono")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.item_data.telefono))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Estado")
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(
                                _vm._s(
                                  _vm.item_data.habilitado === 1
                                    ? "Activo"
                                    : "Inactivo"
                                )
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Rol")
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(_vm._s(_vm.item_data.roles[0].name))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Empresa")
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(
                                _vm._s(_vm.item_data.empresas[0].razon_social)
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Ultima Actualizacion")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.item_data.updated_at))])
                          ])
                        ])
                      ]
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "vx-card",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.item_data.roles[0].id === 2,
                      expression: "item_data.roles[0].id === 2"
                    }
                  ],
                  staticClass: "mb-base",
                  attrs: { title: "Moviles", collapseAction: "" }
                },
                [
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col w-full" },
                      [
                        _c(
                          "div",
                          { staticClass: "flex items-end px-3" },
                          [
                            _c("feather-icon", {
                              staticClass: "mr-2",
                              attrs: {
                                svgClasses: "w-6 h-6",
                                icon: "TruckIcon"
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "font-medium text-lg leading-none"
                              },
                              [_vm._v("Detalle")]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("vs-divider")
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "block overflow-x-auto" },
                    [
                      _c(
                        "vs-table",
                        {
                          ref: "tablemoviles",
                          attrs: {
                            "max-items": "10",
                            pagination: "",
                            search: "",
                            data: _vm.item_data_movil
                          },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "default",
                                fn: function(ref) {
                                  var data = ref.data
                                  return _vm._l(data, function(
                                    trmov,
                                    indextrmov
                                  ) {
                                    return _c(
                                      "vs-tr",
                                      {
                                        key: indextrmov,
                                        attrs: { data: trmov }
                                      },
                                      [
                                        _c("vs-td", [
                                          _c("p", [_vm._v(_vm._s(trmov.id))])
                                        ]),
                                        _vm._v(" "),
                                        _c("vs-td", [
                                          _c("p", [
                                            _vm._v(_vm._s(trmov.numero_movil))
                                          ])
                                        ]),
                                        _vm._v(" "),
                                        _c("vs-td", [
                                          _c("p", [
                                            _vm._v(_vm._s(trmov.patente))
                                          ])
                                        ]),
                                        _vm._v(" "),
                                        _c("vs-td", [
                                          _c("p", [_vm._v(_vm._s(trmov.tipo))])
                                        ])
                                      ],
                                      1
                                    )
                                  })
                                }
                              }
                            ],
                            null,
                            false,
                            4219483791
                          )
                        },
                        [
                          _c("template", { slot: "header" }),
                          _vm._v(" "),
                          _c(
                            "template",
                            { slot: "thead" },
                            [
                              _c("vs-th", [_vm._v("ID")]),
                              _vm._v(" "),
                              _c("vs-th", [_vm._v("N° Movil")]),
                              _vm._v(" "),
                              _c("vs-th", [_vm._v("Patente")]),
                              _vm._v(" "),
                              _c("vs-th", [_vm._v("Tipo")])
                            ],
                            1
                          )
                        ],
                        2
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "vx-col w-full flex mt-4",
                  attrs: { id: "account-manage-buttons" }
                },
                [
                  _c(
                    "vx-tooltip",
                    { attrs: { color: "primary", text: "Editar" } },
                    [
                      _c(
                        "vs-button",
                        {
                          staticClass: "mr-4",
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-edit",
                            to: {
                              name: "user-edit",
                              params: { itemId: _vm.$route.params.itemId }
                            }
                          }
                        },
                        [_vm._v("Editar")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "vx-tooltip",
                    { attrs: { color: "primary", text: "Volver" } },
                    [
                      _c(
                        "vs-button",
                        {
                          staticClass: "mr-4",
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-arrow-left",
                            to: { name: "users" }
                          }
                        },
                        [_vm._v("Volver")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "vx-tooltip",
                    { attrs: { color: "primary", text: "Eliminar" } },
                    [
                      _c(
                        "vs-button",
                        {
                          attrs: {
                            type: "border",
                            color: "danger",
                            "icon-pack": "feather",
                            icon: "icon-trash"
                          },
                          on: { click: _vm.confirmDeleteRecord }
                        },
                        [_vm._v("Eliminar")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



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

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-view/itemView.vue":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-view/itemView.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _itemView_vue_vue_type_template_id_5e4a72ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./itemView.vue?vue&type=template&id=5e4a72ca& */ "./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=template&id=5e4a72ca&");
/* harmony import */ var _itemView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./itemView.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _itemView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./itemView.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _itemView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _itemView_vue_vue_type_template_id_5e4a72ca___WEBPACK_IMPORTED_MODULE_0__["render"],
  _itemView_vue_vue_type_template_id_5e4a72ca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/administracion/users/item-view/itemView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/style-loader!../../../../../../../../node_modules/css-loader!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemView.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=template&id=5e4a72ca&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=template&id=5e4a72ca& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_template_id_5e4a72ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemView.vue?vue&type=template&id=5e4a72ca& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-view/itemView.vue?vue&type=template&id=5e4a72ca&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_template_id_5e4a72ca___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemView_vue_vue_type_template_id_5e4a72ca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);