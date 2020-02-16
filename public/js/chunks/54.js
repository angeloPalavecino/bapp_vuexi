(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _itemEditSection1_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./itemEditSection1.vue */ "./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue");
/* harmony import */ var _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/items-management/moduleItemManagement.js */ "./resources/js/src/store/items-management/moduleItemManagement.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    itemEditSection1: _itemEditSection1_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      item_data: null,
      item_data_movil: null,
      item_not_found: false,
      urlApi: "/users/users/"
    };
  },
  watch: {
    activeTab: function activeTab() {
      this.fetch_item_data(this.$route.params.itemId);
    }
  },
  methods: {
    fetch_item_data: function fetch_item_data(itemId) {
      var _this = this;

      this.$store.dispatch("itemManagement/traerItem", {
        Id: itemId,
        Url: this.urlApi
      }).then(function (res) {
        _this.item_data = res.data.item[0];
        _this.item_data_movil = res.data.itemcars;
      }).catch(function (err) {
        if (err.response.status === 404) {
          _this.item_not_found = true;
          return;
        } else if (err.response.status == 300) {
          _this.$vs.notify({
            title: 'Error',
            text: err.response.data.message,
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });
        } else {
          _this.$vs.notify({
            title: 'Error',
            text: err,
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });
        }
      });
    }
  },
  created: function created() {
    // Register Module UserManagement Module
    if (!_store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_1__["default"].isRegistered) {
      this.$store.registerModule('itemManagement', _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
      _store_items_management_moduleItemManagement_js__WEBPACK_IMPORTED_MODULE_1__["default"].isRegistered = true;
    }

    this.fetch_item_data(this.$route.params.itemId);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _axios_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/axios.js */ "./resources/js/src/axios.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
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



var dict = {
  custom: {
    name: {
      required: 'El nombre es requerido',
      alpha_spaces: "El nombre solo puede contener letras"
    },
    lastname: {
      required: 'El apellido es requerido',
      alpha_spaces: "El apellido solo puede contener letras"
    },
    rut: {
      required: 'El rut es requerido',
      alpha_dash: "Ingrese un rut valido"
    },
    email: {
      required: 'El email es requerido',
      email: "Ingrese un email valido"
    },
    roles: {
      required: 'El rol es requerido'
    },
    empresa: {
      required: 'La empresa es requerido'
    },
    telefono: {
      required: 'El telefono es requerido',
      numeric: "El numero de telefono debe ser valido"
    },
    password: {
      required: 'La password es requerida',
      min: "La password debe tener minimo 8 caracteres"
    },
    password_confirmation: {
      required: 'Debe ingresar la confirmacion de la password',
      min: "La confirmacion de la password debe tener minimo 8 caracteres",
      confirmed: "Las password debe ser iguales"
    },
    moviles: {
      min_value: "Debe seleccionar al menos 1 movil"
    }
  }
}; // register custom messages

vee_validate__WEBPACK_IMPORTED_MODULE_2__["Validator"].localize('en', dict);
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    data_movil: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      urlApi: "/users/users/",
      data_local: {
        empresa_id: this.data.empresa_id ? this.data.empresa_id : null,
        email: this.data.email ? this.data.email : null,
        name: this.data.name ? this.data.name : null,
        lastname: this.data.lastname ? this.data.lastname : null,
        rut: this.data.rut ? this.data.rut : null,
        telefono: this.data.telefono ? this.data.telefono : null,
        habilitado: this.data.habilitado ? this.data.habilitado : true,
        roles: this.data.roles[0].id ? this.data.roles[0].id : null,
        id: this.data.id ? this.data.id : null,
        moviles: []
      },
      data_local_movil: this.data_movil,
      roleOptions: [],
      empresaOptions: [],
      movilesOptions: [],
      movilescount: 0
    };
  },
  computed: {
    validateForm: function validateForm() {
      return !this.errors.any();
    }
  },
  mounted: function mounted() {
    this.traeOtrosDatos();
  },
  methods: {
    setSelected: function setSelected(value) {
      if (value <= 2) {
        this.data_local.empresa_id = 1;

        if (value != 2) {
          //&& this.modoEditar == false
          this.data_local.moviles = [];
          this.movilescount = 0;
        }
      }
    },
    handleSelectedMoviles: function handleSelectedMoviles(tr) {
      this.movilescount = tr.length;
    },
    save_changes: function save_changes() {
      var _this = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this.$store.dispatch("itemManagement/editarItem", {
            item: _this.data_local,
            Url: _this.urlApi
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
        }
      });
    },
    showDeleteSuccess: function showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Guardar registros',
        text: 'Los registros se han guardado exitosamente.'
      });
    },
    reset_data: function reset_data() {
      this.data_local = {
        empresa_id: this.data.empresa_id ? this.data.empresa_id : null,
        email: this.data.email ? this.data.email : null,
        name: this.data.name ? this.data.name : null,
        lastname: this.data.lastname ? this.data.lastname : null,
        rut: this.data.rut ? this.data.rut : null,
        telefono: this.data.telefono ? this.data.telefono : null,
        habilitado: this.data.habilitado ? this.data.habilitado : true,
        roles: this.data.roles[0].id ? this.data.roles[0].id : null,
        id: this.data.id ? this.data.id : null,
        moviles: []
      };
      this.movilescount = 0;

      if (this.data_local_movil.length > 0) {
        var thisIns = this;
        var aux = this.movilesOptions;
        this.data_local_movil.forEach(function (element) {
          thisIns.data_local.moviles.push(aux.find(function (x) {
            return x.id === element.id;
          }));
        });
        this.movilescount = this.data_local_movil.length;
      }

      this.errors.clear();
    },
    update_avatar: function update_avatar() {// You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    },
    traeOtrosDatos: function traeOtrosDatos() {
      var _this2 = this;

      //Combo Empresa
      _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/v1/empresas/listemp").then(function (res) {
        _this2.empresaOptions = res.data.items;
      }).catch(function (err) {
        var textError = err.response.status == 300 ? err.response.data.message : err;

        _this2.$vs.notify({
          title: 'Error',
          text: textError,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        });
      }); //Combo Roles

      _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/v1/roles/roles").then(function (res) {
        _this2.roleOptions = res.data.items;
      }).catch(function (err) {
        var textError = err.response.status == 300 ? err.response.data.message : err;

        _this2.$vs.notify({
          title: 'Error',
          text: textError,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        });
      }); //Combo Moviles

      _axios_js__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/v1/car/cars").then(function (res) {
        _this2.movilesOptions = res.data.items;

        if (_this2.data_local_movil.length > 0) {
          var thisIns = _this2;
          var aux = _this2.movilesOptions;

          _this2.data_local_movil.forEach(function (element) {
            thisIns.data_local.moviles.push(aux.find(function (x) {
              return x.id === element.id;
            }));
          });

          _this2.movilescount = _this2.data_local_movil.length;
        }
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
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=template&id=7533a46a&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=template&id=7533a46a& ***!
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
    { attrs: { id: "page-item-edit" } },
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
              _c("span", [_vm._v("Mira  ")]),
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
            "vx-card",
            [
              _c("item-edit-section1", {
                staticClass: "mt-4",
                attrs: { data: _vm.item_data, data_movil: _vm.item_data_movil }
              })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=template&id=58aee314&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=template&id=58aee314& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "item-edit" } },
    [
      _c("div", { staticClass: "vx-row" }, [
        _c("div", { staticClass: "vx-col w-full" }, [
          _c("div", { staticClass: "flex items-start flex-col sm:flex-row" }, [
            _c("img", {
              staticClass: "mr-8 rounded h-24 w-24",
              attrs: { src: _vm.data.imagen }
            }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "p",
                  { staticClass: "text-lg font-medium mb-2 mt-4 sm:mt-0" },
                  [_vm._v(_vm._s(_vm.data.name))]
                ),
                _vm._v(" "),
                _c("input", {
                  ref: "update_avatar_input",
                  staticClass: "hidden",
                  attrs: { type: "file", accept: "image/*" },
                  on: { change: _vm.update_avatar }
                }),
                _vm._v(" "),
                _c("vs-button", { staticClass: "mr-4 mb-4" }, [
                  _vm._v("Cambiar Avatar")
                ]),
                _vm._v(" "),
                _c(
                  "vs-button",
                  { attrs: { type: "border", color: "danger" } },
                  [_vm._v("Eliminar Avatar")]
                )
              ],
              1
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vx-row mt-6" },
        [
          _c("vs-divider", { attrs: { color: "primary" } }, [
            _c("h5", [_vm._v("Datos Usuarios")])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("vs-input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|alpha_spaces",
                    expression: "'required|alpha_spaces'"
                  }
                ],
                staticClass: "w-full p-1",
                attrs: {
                  "label-placeholder": "Nombre",
                  name: "name",
                  danger: _vm.errors.first("name") ? true : false,
                  "danger-text": _vm.errors.first("name")
                    ? _vm.errors.first("name")
                    : "",
                  "val-icon-danger": "clear"
                },
                model: {
                  value: _vm.data_local.name,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "name", $$v)
                  },
                  expression: "data_local.name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("vs-input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|alpha_spaces",
                    expression: "'required|alpha_spaces'"
                  }
                ],
                staticClass: "w-full  p-1",
                attrs: {
                  "label-placeholder": "Apellido",
                  name: "lastname",
                  danger: _vm.errors.first("lastname") ? true : false,
                  "danger-text": _vm.errors.first("lastname")
                    ? _vm.errors.first("lastname")
                    : "",
                  "val-icon-danger": "clear"
                },
                model: {
                  value: _vm.data_local.lastname,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "lastname", $$v)
                  },
                  expression: "data_local.lastname"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("vs-input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|email",
                    expression: "'required|email'"
                  }
                ],
                staticClass: "w-full  p-1",
                attrs: {
                  type: "Email",
                  "label-placeholder": "Email",
                  name: "email",
                  danger: _vm.errors.first("email") ? true : false,
                  "danger-text": _vm.errors.first("email")
                    ? _vm.errors.first("email")
                    : "",
                  "val-icon-danger": "clear"
                },
                model: {
                  value: _vm.data_local.email,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "email", $$v)
                  },
                  expression: "data_local.email"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("vs-input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|alpha_dash",
                    expression: "'required|alpha_dash'"
                  }
                ],
                staticClass: "w-full  p-1",
                attrs: {
                  "label-placeholder": "Rut",
                  name: "rut",
                  danger: _vm.errors.first("rut") ? true : false,
                  "danger-text": _vm.errors.first("rut")
                    ? _vm.errors.first("rut")
                    : "",
                  "val-icon-danger": "clear"
                },
                model: {
                  value: _vm.data_local.rut,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "rut", $$v)
                  },
                  expression: "data_local.rut"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("vs-input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|numeric",
                    expression: "'required|numeric'"
                  }
                ],
                staticClass: "w-full p-1",
                attrs: {
                  "label-placeholder": "Telefono",
                  name: "telefono",
                  danger: _vm.errors.first("telefono") ? true : false,
                  "danger-text": _vm.errors.first("telefono")
                    ? _vm.errors.first("telefono")
                    : "",
                  "val-icon-danger": "clear"
                },
                model: {
                  value: _vm.data_local.telefono,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "telefono", $$v)
                  },
                  expression: "data_local.telefono"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("label", { staticClass: "vs-input--label " }, [
                _vm._v("Habilitado")
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("vs-switch", {
                staticClass: "mt-2",
                model: {
                  value: _vm.data_local.habilitado,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "habilitado", $$v)
                  },
                  expression: "data_local.habilitado"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
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
                  staticClass: "w-full p-1",
                  attrs: {
                    label: "Roles",
                    name: "roles",
                    dir: _vm.$vs.rtl ? "rtl" : "ltr",
                    danger: _vm.errors.first("roles") ? true : false,
                    "danger-text": _vm.errors.first("roles")
                      ? _vm.errors.first("roles")
                      : ""
                  },
                  on: { input: _vm.setSelected },
                  model: {
                    value: _vm.data_local.roles,
                    callback: function($$v) {
                      _vm.$set(_vm.data_local, "roles", $$v)
                    },
                    expression: "data_local.roles"
                  }
                },
                _vm._l(_vm.roleOptions, function(item) {
                  return _c("vs-select-item", {
                    key: item.id,
                    attrs: { value: item.id, text: item.name }
                  })
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
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
                  ref: "empresa",
                  staticClass: "w-full p-1",
                  attrs: {
                    label: "Empresa",
                    name: "empresa",
                    disabled: _vm.data_local.roles > 2 ? false : true,
                    dir: _vm.$vs.rtl ? "rtl" : "ltr",
                    danger: _vm.errors.first("empresa") ? true : false,
                    "danger-text": _vm.errors.first("empresa")
                      ? _vm.errors.first("empresa")
                      : ""
                  },
                  model: {
                    value: _vm.data_local.empresa_id,
                    callback: function($$v) {
                      _vm.$set(_vm.data_local, "empresa_id", $$v)
                    },
                    expression: "data_local.empresa_id"
                  }
                },
                _vm._l(_vm.empresaOptions, function(item) {
                  return _c("vs-select-item", {
                    key: item.id,
                    attrs: { value: item.id, text: item.razon_social }
                  })
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("vs-input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "min:8",
                    expression: "'min:8'"
                  }
                ],
                ref: "password",
                staticClass: "w-full p-1",
                attrs: {
                  type: "password",
                  "label-placeholder": "Password",
                  name: "password",
                  "danger-text": _vm.errors.first("password")
                    ? _vm.errors.first("password")
                    : "",
                  danger: _vm.errors.first("password") ? true : false,
                  "val-icon-danger": "clear"
                },
                model: {
                  value: _vm.data_local.password,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "password", $$v)
                  },
                  expression: "data_local.password"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vx-col md:w-1/2 w-full mt-2" },
            [
              _c("vs-input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "min:8|confirmed:password",
                    expression: "'min:8|confirmed:password'"
                  }
                ],
                staticClass: "w-full p-1",
                attrs: {
                  type: "password",
                  "data-vv-as": "password",
                  "label-placeholder": "Confirmar Password",
                  name: "password_confirmation",
                  "danger-text": _vm.errors.first("password_confirmation")
                    ? _vm.errors.first("password_confirmation")
                    : "",
                  danger: _vm.errors.first("password_confirmation")
                    ? true
                    : false,
                  "val-icon-danger": "clear"
                },
                model: {
                  value: _vm.data_local.password_confirmation,
                  callback: function($$v) {
                    _vm.$set(_vm.data_local, "password_confirmation", $$v)
                  },
                  expression: "data_local.password_confirmation"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vx-card",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.data_local.roles === 2,
              expression: "data_local.roles === 2"
            }
          ],
          staticClass: "mt-base",
          attrs: { "no-shadow": "", "card-border": "" }
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
                      attrs: { svgClasses: "w-6 h-6", icon: "TruckIcon" }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "font-medium text-lg leading-none" },
                      [_vm._v("Moviles")]
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
          _c("vs-input", {
            directives: [
              {
                name: "validate",
                rawName: "v-validate",
                value: _vm.data_local.roles == 2 ? "min_value:1" : "",
                expression: "(data_local.roles == 2 ? 'min_value:1' : '')"
              }
            ],
            attrs: { type: "hidden", name: "moviles" },
            model: {
              value: _vm.movilescount,
              callback: function($$v) {
                _vm.movilescount = $$v
              },
              expression: "movilescount"
            }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "text-danger text-sm" }, [
            _vm._v(_vm._s(_vm.errors.first("moviles")))
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
                    multiple: "",
                    pagination: "",
                    search: "",
                    data: _vm.movilesOptions
                  },
                  on: { input: _vm.handleSelectedMoviles },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(ref) {
                        var data = ref.data
                        return _vm._l(data, function(trmov, indextrmov) {
                          return _c(
                            "vs-tr",
                            { key: indextrmov, attrs: { data: trmov } },
                            [
                              _c("vs-td", [
                                _c("p", [_vm._v(_vm._s(trmov.id))])
                              ]),
                              _vm._v(" "),
                              _c("vs-td", [
                                _c("p", [_vm._v(_vm._s(trmov.numero_movil))])
                              ]),
                              _vm._v(" "),
                              _c("vs-td", [
                                _c("p", [_vm._v(_vm._s(trmov.patente))])
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
                  ]),
                  model: {
                    value: _vm.data_local.moviles,
                    callback: function($$v) {
                      _vm.$set(_vm.data_local, "moviles", $$v)
                    },
                    expression: "data_local.moviles"
                  }
                },
                [
                  _c("template", { slot: "header" }, [
                    _c("span", [
                      _vm._v(
                        "\n                      Seleccione al menos un movil\n                  "
                      )
                    ])
                  ]),
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
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "vx-row" }, [
        _c("div", { staticClass: "vx-col w-full" }, [
          _c(
            "div",
            { staticClass: "mt-8 flex flex-wrap items-center justify-end" },
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
                    [_vm._v("Guardar Cambios")]
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
                { attrs: { color: "primary", text: "Limpiar" } },
                [
                  _c(
                    "vs-button",
                    {
                      staticClass: "ml-4 mt-2",
                      attrs: { type: "border", color: "warning" },
                      on: { click: _vm.reset_data }
                    },
                    [_vm._v("Limpiar")]
                  )
                ],
                1
              )
            ],
            1
          )
        ])
      ])
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

/***/ "./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _itemEdit_vue_vue_type_template_id_7533a46a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./itemEdit.vue?vue&type=template&id=7533a46a& */ "./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=template&id=7533a46a&");
/* harmony import */ var _itemEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./itemEdit.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _itemEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _itemEdit_vue_vue_type_template_id_7533a46a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _itemEdit_vue_vue_type_template_id_7533a46a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemEdit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=template&id=7533a46a&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=template&id=7533a46a& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEdit_vue_vue_type_template_id_7533a46a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemEdit.vue?vue&type=template&id=7533a46a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEdit.vue?vue&type=template&id=7533a46a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEdit_vue_vue_type_template_id_7533a46a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEdit_vue_vue_type_template_id_7533a46a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _itemEditSection1_vue_vue_type_template_id_58aee314___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./itemEditSection1.vue?vue&type=template&id=58aee314& */ "./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=template&id=58aee314&");
/* harmony import */ var _itemEditSection1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./itemEditSection1.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _itemEditSection1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _itemEditSection1_vue_vue_type_template_id_58aee314___WEBPACK_IMPORTED_MODULE_0__["render"],
  _itemEditSection1_vue_vue_type_template_id_58aee314___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEditSection1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemEditSection1.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEditSection1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=template&id=58aee314&":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=template&id=58aee314& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEditSection1_vue_vue_type_template_id_58aee314___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./itemEditSection1.vue?vue&type=template&id=58aee314& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/users/item-edit/itemEditSection1.vue?vue&type=template&id=58aee314&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEditSection1_vue_vue_type_template_id_58aee314___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_itemEditSection1_vue_vue_type_template_id_58aee314___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);