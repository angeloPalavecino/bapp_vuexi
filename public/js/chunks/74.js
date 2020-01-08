(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[74],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _axios_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/axios.js */ "./resources/js/src/axios.js");
/* harmony import */ var _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/items-management/moduleItemManagement.js */ "./resources/js/src/store/items-management/moduleItemManagement.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
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

 // Store Module



var dict = {
  custom: {
    moviles: {
      required: 'Los moviles son requeridos'
    }
  }
}; // register custom messages

vee_validate__WEBPACK_IMPORTED_MODULE_3__["Validator"].localize('en', dict);
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      urlApi: "/matriz/matriz/",
      sucursalFilter: {
        label: 'Sin sucursal',
        value: 'all',
        id: 0
      },
      sucursalOptions: [],
      empresaFilter: {
        label: 'Sin empresa',
        value: 'all',
        id: 0
      },
      empresaOptions: [],
      movilesOptions: [],
      gpatrones: [],
      horarios: [],
      matriz: [],
      popupActivo: false,
      item: {
        horario_text: null,
        horario_id: null,
        grupopatrones_id: null,
        grupopatrones_text: null,
        sucursal_id: null,
        moviles: []
      }
    };
  },
  watch: {
    sucursalFilter: function sucursalFilter(obj) {
      this.gpatrones = [];
      this.horarios = [];
      this.matriz = [];
      this.traeMatriz(obj.id);
    },
    empresaFilter: function empresaFilter(obj) {
      this.gpatrones = [];
      this.horarios = [];
      this.matriz = [];
      this.traeSucursales(obj.id);
      this.traeMoviles(obj.id);
    }
  },
  computed: {
    itemsData: function itemsData() {
      return this.$store.state.itemManagement.items;
    },
    validateForm: function validateForm() {
      return !this.errors.any();
    }
  },
  methods: {
    popupClose: function popupClose() {
      this.item = {
        horario_text: null,
        horario_id: null,
        grupopatrones_id: null,
        grupopatrones_text: null,
        moviles: []
      };
      this.errors.clear();
      this.popupActivo = false;
    },
    selectedCell: function selectedCell(horario, grupopatron, moviles) {
      this.item.horario_id = horario.id;
      this.item.horario_text = horario.horario;
      this.item.grupopatrones_id = grupopatron.id;
      this.item.grupopatrones_text = grupopatron.codigo;
      this.item.sucursal_id = this.sucursalFilter.id;

      if (moviles.length > 0) {
        this.item.moviles = moviles.map(function (value, index) {
          return value['car_id'];
        });
      }

      this.errors.clear();
      this.popupActivo = true;
    },
    getStatusColor: function getStatusColor(status) {
      if (status > 0) return "success";
      if (status == 0) return "danger";
      return "danger";
    },
    resetColFilters: function resetColFilters() {
      // Reset Filter Options
      this.sucursalFilter = {
        label: 'Sin sucursal',
        value: 'all',
        id: 0
      };
      this.empresaFilter = {
        label: 'Sin empresa',
        value: 'all',
        id: 0
      };
      this.$refs.filterCard.removeRefreshAnimation();
    },
    addRecord: function addRecord() {
      this.$router.push("../item-add/").catch(function () {});
    },
    traeSucursales: function traeSucursales(value) {
      var _this = this;

      if (value > 1) {
        //Combo Sucursales
        _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/v1/sucursal/combo/" + value).then(function (res) {
          //console.log(res.data.items);
          _this.sucursalOptions = res.data.items; //this.sucursalOptions = res.data.items;  
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
      } else {
        this.sucursalFilter = {
          label: 'Sin sucursal',
          value: 'all',
          id: 0
        }, this.sucursalOptions = [];
      }
    },
    traeMoviles: function traeMoviles(value) {
      var _this2 = this;

      if (value > 1) {
        //Combo Moviles
        _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/v1/car/matriz/" + value).then(function (res) {
          _this2.movilesOptions = res.data.items;
        }).catch(function (err) {
          var textError = err.response.status == 300 ? err.response.data.message : err;

          _this2.$vs.notify({
            title: 'Error',
            text: textError,
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });
        });
      } else {
        this.movilesOptions = [];
      }
    },
    traeMatriz: function traeMatriz(value) {
      var _this3 = this;

      if (value > 0) {
        //Combo Sucursales
        _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/v1" + this.urlApi + value).then(function (res) {
          _this3.matriz = res.data.items;
          _this3.horarios = res.data.horarios;
          _this3.gpatrones = res.data.gpatrones;
        }).catch(function (err) {
          var textError = err.response.status == 300 ? err.response.data.message : err;

          _this3.$vs.notify({
            title: 'Error',
            text: textError,
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });
        });
      } else {
        this.matriz = [];
      }
    },
    traeOtrosDatos: function traeOtrosDatos() {
      var _this4 = this;

      //Combo Empresa
      _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/v1/empresas/combo").then(function (res) {
        _this4.empresaOptions = res.data.items;
      }).catch(function (err) {
        var textError = err.response.status == 300 ? err.response.data.message : err;

        _this4.$vs.notify({
          title: 'Error',
          text: textError,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        });
      });
    },
    save_changes: function save_changes() {
      var _this5 = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/v1" + _this5.urlApi + "store", _this5.item).then(function (res) {
            _this5.item = {
              horario_text: null,
              horario_id: null,
              grupopatrones_id: null,
              grupopatrones_text: null,
              sucursal_id: res.data.sucursal,
              moviles: []
            };

            _this5.errors.clear();

            _this5.traeMatriz(res.data.sucursal);

            _this5.popupActivo = false;

            _this5.$vs.notify({
              color: 'success',
              title: 'Guardar registros',
              text: 'Los registros se han guardado exitosamente.'
            });
          }).catch(function (err) {
            var textError = err.response.status == 300 ? err.response.data.message : err;

            _this5.$vs.notify({
              title: 'Error',
              text: textError,
              color: 'danger',
              iconPack: 'feather',
              icon: 'icon-alert-circle'
            });
          });
        }
      });
    }
  },
  mounted: function mounted() {
    this.traeOtrosDatos();
  },
  created: function created() {
    var _this6 = this;

    if (!_store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_2__["default"].isRegistered) {
      this.$store.registerModule('itemManagement', _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
      _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_2__["default"].isRegistered = true;
    }

    this.$store.dispatch("itemManagement/traerItems", this.urlApi).catch(function (err) {
      var textError = err.response.status == 300 ? err.response.data.message : err;

      _this6.$vs.notify({
        title: 'Error',
        text: textError,
        color: 'danger',
        iconPack: 'feather',
        icon: 'icon-alert-circle'
      });
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#page-item-list .items-list-filters .vs__actions {\n  position: absolute;\n  top: 50%;\n}[dir] #page-item-list .items-list-filters .vs__actions {\n  -webkit-transform: translateY(-58%);\n          transform: translateY(-58%);\n}[dir=ltr] #page-item-list .items-list-filters .vs__actions {\n  right: 0;\n}[dir=rtl] #page-item-list .items-list-filters .vs__actions {\n  left: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemList.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=template&id=08ac2586&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=template&id=08ac2586& ***!
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
    { attrs: { id: "page-item-list" } },
    [
      _c(
        "vx-card",
        {
          ref: "filterCard",
          staticClass: "items-list-filters mb-8",
          attrs: {
            title: "Filtros",
            collapseAction: "",
            refreshContentAction: ""
          },
          on: { refresh: _vm.resetColFilters, remove: _vm.resetColFilters }
        },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "vx-col md:w-1/4 sm:w-1/2 w-full" },
              [
                _c("label", { staticClass: "text-sm opacity-75" }, [
                  _vm._v("Empresa")
                ]),
                _vm._v(" "),
                _c("v-select", {
                  attrs: {
                    options: _vm.empresaOptions,
                    clearable: false,
                    dir: _vm.$vs.rtl ? "rtl" : "ltr"
                  },
                  model: {
                    value: _vm.empresaFilter,
                    callback: function($$v) {
                      _vm.empresaFilter = $$v
                    },
                    expression: "empresaFilter"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-col md:w-1/4 sm:w-1/2 w-full" },
              [
                _c("label", { staticClass: "text-sm opacity-75" }, [
                  _vm._v("Sucursales")
                ]),
                _vm._v(" "),
                _c("v-select", {
                  staticClass: "mb-4 md:mb-0",
                  attrs: {
                    options: _vm.sucursalOptions,
                    clearable: false,
                    dir: _vm.$vs.rtl ? "rtl" : "ltr"
                  },
                  model: {
                    value: _vm.sucursalFilter,
                    callback: function($$v) {
                      _vm.sucursalFilter = $$v
                    },
                    expression: "sucursalFilter"
                  }
                })
              ],
              1
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "vx-card",
        {
          staticClass: "items-list-filters mb-8",
          attrs: { title: "Matriz", collapseAction: "" }
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
                      attrs: { svgClasses: "w-6 h-6", icon: "InfoIcon" }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "font-medium text-lg leading-none" },
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
          _vm.gpatrones.length && _vm.horarios.length
            ? _c(
                "vs-table",
                {
                  attrs: {
                    stripe: "",
                    pagination: "",
                    "max-items": 10,
                    search: "",
                    data: _vm.gpatrones
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function(ref) {
                          var data = ref.data
                          return _vm._l(data, function(tr, indextr) {
                            return _c(
                              "vs-tr",
                              { key: indextr },
                              [
                                _c("vs-td", { attrs: { data: tr.codigo } }, [
                                  _vm._v(
                                    "\n            " +
                                      _vm._s(tr.codigo) +
                                      "\n          "
                                  )
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.horarios, function(trh, indexth) {
                                  return _c("vs-td", { key: indexth }, [
                                    _c(
                                      "span",
                                      {
                                        staticClass: "td vs-table--td",
                                        staticStyle: { cursor: "pointer" },
                                        on: {
                                          click: function($event) {
                                            _vm.selectedCell(
                                              trh,
                                              tr,
                                              _vm.matriz.filter(function(x) {
                                                return (
                                                  x.horario_id == trh.id &&
                                                  x.grupopatrones_id == tr.id
                                                )
                                              })
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "vs-chip",
                                          {
                                            staticClass: "items-status",
                                            attrs: {
                                              color: _vm.getStatusColor(
                                                _vm.matriz.filter(function(x) {
                                                  return (
                                                    x.horario_id == trh.id &&
                                                    x.grupopatrones_id == tr.id
                                                  )
                                                }).length
                                              )
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.matriz.filter(function(x) {
                                                  return (
                                                    x.horario_id == trh.id &&
                                                    x.grupopatrones_id == tr.id
                                                  )
                                                }).length
                                              )
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ])
                                })
                              ],
                              2
                            )
                          })
                        }
                      }
                    ],
                    null,
                    false,
                    3166219761
                  )
                },
                [
                  _c("template", { slot: "header" }),
                  _vm._v(" "),
                  _c(
                    "template",
                    { slot: "thead" },
                    [
                      _c("vs-th", [_vm._v("Codigos")]),
                      _vm._v(" "),
                      _vm._l(_vm.horarios, function(horario) {
                        return _c("vs-th", { key: horario.id }, [
                          _vm._v(_vm._s(horario.horario))
                        ])
                      })
                    ],
                    2
                  )
                ],
                2
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: {
            title:
              "HORARIO: " +
              _vm.item.horario_text +
              " | CODIGO: " +
              _vm.item.grupopatrones_text,
            active: _vm.popupActivo
          },
          on: {
            "update:active": function($event) {
              _vm.popupActivo = $event
            },
            close: _vm.popupClose
          }
        },
        [
          _c(
            "vs-alert",
            {
              staticStyle: { height: "100% !important" },
              attrs: {
                active: "true",
                color: "primary",
                "icon-pack": "feather",
                icon: "icon-info"
              }
            },
            [
              _c("span", [
                _vm._v("Debe seleccionar al menos "),
                _c("b", [_vm._v("1")]),
                _vm._v(" movil")
              ])
            ]
          ),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "vx-col sm:w-1/2 w-full" },
              [
                _c(
                  "vs-select",
                  {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    ref: "moviles",
                    staticClass: "w-full",
                    attrs: {
                      autocomplete: "",
                      multiple: "",
                      label: "Moviles",
                      name: "moviles",
                      dir: _vm.$vs.rtl ? "rtl" : "ltr",
                      danger: _vm.errors.first("moviles") ? true : false,
                      "danger-text": _vm.errors.first("moviles")
                        ? _vm.errors.first("moviles")
                        : ""
                    },
                    model: {
                      value: _vm.item.moviles,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "moviles", $$v)
                      },
                      expression: "item.moviles"
                    }
                  },
                  _vm._l(_vm.movilesOptions, function(item) {
                    return _c("vs-select-item", {
                      key: item.id,
                      attrs: { value: item.id, text: item.numero_movil }
                    })
                  }),
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-full" }, [
              _c("div", { staticClass: "vx-row" }, [
                _c("div", { staticClass: "vx-col w-full" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "mt-3 flex flex-wrap items-center justify-end"
                    },
                    [
                      _c(
                        "vx-tooltip",
                        { attrs: { color: "primary", text: "Guardar" } },
                        [
                          _c(
                            "vs-button",
                            {
                              staticClass: "ml-auto mt-2",
                              attrs: { disabled: !_vm.validateForm },
                              on: { click: _vm.save_changes }
                            },
                            [_vm._v("Guardar")]
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
                              staticClass: "ml-4 mt-2",
                              attrs: { "icon-pack": "feather", icon: "icon-x" },
                              on: { click: _vm.popupClose }
                            },
                            [_vm._v("Cerrar")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              ])
            ])
          ])
        ],
        1
      )
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

/***/ "./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _itemList_vue_vue_type_template_id_08ac2586___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./itemList.vue?vue&type=template&id=08ac2586& */ "./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=template&id=08ac2586&");
/* harmony import */ var _itemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./itemList.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _itemList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./itemList.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _itemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _itemList_vue_vue_type_template_id_08ac2586___WEBPACK_IMPORTED_MODULE_0__["render"],
  _itemList_vue_vue_type_template_id_08ac2586___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/style-loader!../../../../../../../../node_modules/css-loader!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemList.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=template&id=08ac2586&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=template&id=08ac2586& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_template_id_08ac2586___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemList.vue?vue&type=template&id=08ac2586& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/planificacion/matriz/item-list/itemList.vue?vue&type=template&id=08ac2586&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_template_id_08ac2586___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemList_vue_vue_type_template_id_08ac2586___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);