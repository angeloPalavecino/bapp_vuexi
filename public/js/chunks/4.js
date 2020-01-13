(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/axios.js */ "./resources/js/src/axios.js");
/* harmony import */ var vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-flatpickr-component */ "./node_modules/vue-flatpickr-component/dist/vue-flatpickr.min.js");
/* harmony import */ var vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flatpickr_dist_flatpickr_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flatpickr/dist/flatpickr.css */ "./node_modules/flatpickr/dist/flatpickr.css");
/* harmony import */ var flatpickr_dist_flatpickr_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flatpickr_dist_flatpickr_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    tipo_documento: {
      required: "El tipo de documento es requerido"
    },
    fecha_vencimiento: {
      required: "La fecha de vencimiento es requerida"
    }
  }
}; // register custom messages

vee_validate__WEBPACK_IMPORTED_MODULE_3__["Validator"].localize('en', dict);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PopUpDocuments',
  props: {
    popUpStatus: Boolean,
    data: Object,
    tipo: Number,
    url: String
  },
  components: {
    flatPickr: vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      item_data: {
        tipo_documento: '',
        fecha_vencimiento: ''
      },
      item_data_documents: null,
      typoDocOptions: []
    };
  },
  watch: {
    popUpStatus: function popUpStatus() {
      if (this.popUpStatus == true) {
        this.traeOtrosDatos();
        var myElement = document.querySelector(".line-vs-tabs");
        myElement.style.width = "95px";
        myElement.style.left = "0px";
      }
    }
  },
  mounted: function mounted() {},
  methods: {
    close: function close() {
      var myElement = document.querySelector(".line-vs-tabs");
      myElement.style.width = "95px";
      myElement.style.left = "0px";
      this.$refs.tabdocs.activeChild(0);
      this.$refs.tabdocs.changePositionLine(0);
      this.item_data = {
        tipo_documento: '',
        fecha_vencimiento: ''
      };

      if (this.$refs.fileupload.value) {
        this.$refs.fileupload.value = '';
      }

      this.errors.clear();
      this.$emit("close-popup", false);
    },
    getStatusDocs: function getStatusDocs(fecha) {
      var factual = new Date();
      var fvencimiento = new Date(fecha);
      if (fvencimiento.getTime() >= factual.getTime()) return "success";
      if (fvencimiento.getTime() <= factual.getTime()) return "danger";
      return "danger";
    },
    uploadData: function uploadData(e) {
      var thisIns = this;
      var tipo = e.target.files[0].type;
      var size = e.target.files[0].size; //console.log(e);

      if (tipo == "image/png" || tipo == "image/jpeg" || tipo == "application/msword" || tipo == "application/pdf") {
        //|| tipo == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        if (size <= 2000000) {
          //2097152
          this.item_data.file = e.target.files[0];
          this.item_data.filename = e.target.files[0].name;
        } else {
          if (this.$refs.fileupload.value) {
            this.$refs.fileupload.value = '';
          }

          thisIns.$vs.notify({
            title: "Error",
            text: "El archivo no tiene el tamañano adecuado (Max. 2 MB)",
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        }
      } else {
        if (this.$refs.fileupload.value) {
          this.$refs.fileupload.value = '';
        }

        thisIns.$vs.notify({
          title: "Error",
          text: "El archivo no tiene el formato correcto",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-circle"
        });
      }
    },
    upload: function upload() {
      var _this = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          var formData = new FormData();
          formData.append('file', _this.item_data.file);
          formData.append('tipo_documento_id', _this.item_data.tipo_documento.split("|")[0]);
          formData.append('tipo_documento', _this.item_data.tipo_documento.split("|")[1]);
          formData.append('fecha_vencimiento', _this.item_data.fecha_vencimiento); //0 Moviles
          //1 Conductores
          //2 Asociados

          /*if(this.tipo === 0){
            formData.append('car_id', (this.data.id));
            formData.append('numero_movil', (this.data.numero_movil));
          }else{
            formData.append('driver_id', (this.data.id));
            formData.append('rut', (this.data.rut));
          }*/

          formData.append('id', _this.data.id);

          _this.enviaData(formData);
        }
      });
    },
    enviaData: function enviaData(formData) {
      var _this2 = this;

      var thisIns = this;

      if (this.item_data.file.size > 0) {
        _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/v1" + this.url + "upload", formData, {
          headers: _defineProperty({
            "Content-Type": "multipart/form-data"
          }, "Content-Type", "application/json")
        }).then(function (res) {
          thisIns.$vs.notify({
            title: 'Exito',
            text: 'El documento se ha subido con exito!.',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });

          _this2.close();
        }).catch(function (err) {
          var textError = err.response.status == 300 ? err.response.data.message : err;
          thisIns.$vs.notify({
            title: 'Error',
            text: textError,
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });
        });
      }
    },
    downloadDocument: function downloadDocument(id, name) {
      var _this3 = this;

      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/v1" + this.url + "document/" + id, {
        responseType: 'blob'
      }).then(function (res) {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(res.data);
        a.href = url;
        a.download = name;
        document.body.append(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
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
    },
    traeOtrosDatos: function traeOtrosDatos() {
      var _this4 = this;

      //Documentos Asociado
      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/v1" + this.url + "documents/" + this.data.id).then(function (res) {
        _this4.item_data_documents = res.data.items;
      }).catch(function (err) {
        var textError = err.response.status == 300 ? err.response.data.message : err;

        _this4.$vs.notify({
          title: 'Error',
          text: textError,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        });
      }); //Tipo de documentos

      _axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/v1/tipodocumentos/tipodocumentos/" + this.tipo).then(function (res) {
        _this4.typoDocOptions = res.data.items;
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
    }
  },
  created: function created() {
    this.traeOtrosDatos();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=template&id=54e4924f&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=template&id=54e4924f& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
    "vs-popup",
    {
      attrs: {
        classContent: "popup-example",
        title: "Documentos",
        active: this.popUpStatus
      },
      on: { close: _vm.close }
    },
    [
      _c(
        "vs-tabs",
        { ref: "tabdocs", attrs: { color: "primary" } },
        [
          _c(
            "vs-tab",
            {
              attrs: {
                label: "Adjuntar",
                "icon-pack": "feather",
                icon: "icon-upload"
              }
            },
            [
              _c("div", { staticClass: "vx-row" }, [
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
                        staticClass: "w-full",
                        attrs: {
                          label: "Tipo de Documento",
                          name: "tipo_documento"
                        },
                        model: {
                          value: _vm.item_data.tipo_documento,
                          callback: function($$v) {
                            _vm.$set(_vm.item_data, "tipo_documento", $$v)
                          },
                          expression: "item_data.tipo_documento"
                        }
                      },
                      _vm._l(_vm.typoDocOptions, function(item) {
                        return _c("vs-select-item", {
                          key: item.id,
                          attrs: {
                            value: item.id + "|" + item.name,
                            text: item.name
                          }
                        })
                      }),
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("tipo_documento"),
                            expression: "errors.has('tipo_documento')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("tipo_documento")))]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col md:w-1/2 w-full mt-3" },
                  [
                    _c("flat-pickr", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required",
                          expression: "'required'"
                        }
                      ],
                      staticClass: "w-full select-large mt-5",
                      attrs: {
                        label: "Fecha de Vencimiento",
                        placeholder: "Fecha de Vencimiento",
                        name: "fecha_vencimiento"
                      },
                      model: {
                        value: _vm.item_data.fecha_vencimiento,
                        callback: function($$v) {
                          _vm.$set(_vm.item_data, "fecha_vencimiento", $$v)
                        },
                        expression: "item_data.fecha_vencimiento"
                      }
                    }),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-danger text-sm" }, [
                      _vm._v(_vm._s(_vm.errors.first("fecha_vencimiento")))
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col md:w-1/2 w-full mt-5" }, [
                  _c("input", {
                    ref: "fileupload",
                    staticClass: "w-full",
                    attrs: {
                      label: "Documento",
                      type: "file",
                      name: "file",
                      id: "file",
                      accept:
                        "application/pdf,application/msword,application/image/png,image/jpeg"
                    },
                    on: { change: _vm.uploadData }
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "text-sm" }, [
                    _vm._v("Fomatos permitidos: JPG - PNG - DOC - PDF")
                  ]),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c("span", { staticClass: "text-sm" }, [
                    _c("i", [_vm._v("Tamaño maximo 2 MB")])
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col md:w-1/2 w-full mt-5" },
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: { color: "primary", type: "filled" },
                        on: {
                          click: function($event) {
                            return _vm.upload()
                          }
                        }
                      },
                      [_vm._v("Adjuntar")]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row" })
            ]
          ),
          _vm._v(" "),
          _c(
            "vs-tab",
            {
              attrs: {
                label: "Documentos",
                "icon-pack": "feather",
                icon: "icon-file-text"
              }
            },
            [
              _c(
                "vs-table",
                {
                  ref: "tabledocs",
                  attrs: {
                    "max-items": "4",
                    pagination: "",
                    data: _vm.item_data_documents
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(ref) {
                        var data = ref.data
                        return _vm._l(data, function(trdoc, indextrdoc) {
                          return _c(
                            "vs-tr",
                            { key: indextrdoc },
                            [
                              _c("vs-td", { attrs: { colspan: "2" } }, [
                                _vm._v(
                                  "\n                     " +
                                    _vm._s(trdoc.name.split(/[.,\/-]/)[1]) +
                                    "\n                   "
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                [
                                  _c(
                                    "vs-chip",
                                    {
                                      attrs: {
                                        color: _vm.getStatusDocs(
                                          trdoc.fecha_vencimiento
                                        )
                                      }
                                    },
                                    [_vm._v(_vm._s(trdoc.fecha_vencimiento))]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextrdoc].url } },
                                [
                                  _c(
                                    "a",
                                    {
                                      staticStyle: { cursor: "pointer" },
                                      attrs: { rel: "nofollow" },
                                      on: {
                                        click: function($event) {
                                          return _vm.downloadDocument(
                                            data[indextrdoc].id,
                                            data[indextrdoc].name
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("Descargar")]
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        })
                      }
                    }
                  ])
                },
                [
                  _c("template", { slot: "header" }, [
                    _c("h3", [
                      _vm._v(
                        "\n                   Documentos Subidos\n                 "
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "template",
                    { slot: "thead" },
                    [
                      _c("vs-th", { attrs: { colspan: "2" } }, [
                        _vm._v(
                          "\n                    Documento\n                 "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [
                        _vm._v(
                          "\n                    Vencimiento\n                 "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [
                        _vm._v(
                          "\n                   Descarga\n                 "
                        )
                      ])
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PopUpDocuments_vue_vue_type_template_id_54e4924f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PopUpDocuments.vue?vue&type=template&id=54e4924f& */ "./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=template&id=54e4924f&");
/* harmony import */ var _PopUpDocuments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PopUpDocuments.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PopUpDocuments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PopUpDocuments_vue_vue_type_template_id_54e4924f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PopUpDocuments_vue_vue_type_template_id_54e4924f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PopUpDocuments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PopUpDocuments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PopUpDocuments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=template&id=54e4924f&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=template&id=54e4924f& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PopUpDocuments_vue_vue_type_template_id_54e4924f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PopUpDocuments.vue?vue&type=template&id=54e4924f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/administracion/moviles/utils/PopUpDocuments.vue?vue&type=template&id=54e4924f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PopUpDocuments_vue_vue_type_template_id_54e4924f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PopUpDocuments_vue_vue_type_template_id_54e4924f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);