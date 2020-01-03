<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-edit">

 

     <!-- Content Row -->
    <div class="mt-6 mb-5">
      
   <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" 
      title="ACTUALIZAR EMPRESA" 
      subtitle="Ingrese todos los campos para actualizar la empresa" 
      finishButtonText="Actualizar" ref="wizard" class="mt-6 ">

        <tab-content title="Paso 1" class="mb-1 mt-2" icon="feather icon-home" :before-change="validateStep1">
          <!-- tab 1 content -->
          <form data-vv-scope="step-1">
           <div>
               <vs-divider color="primary"><h5>Datos comerciales</h5></vs-divider>
          </div>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-2">
              
              <vs-input label-placeholder="Razon social" v-model="data_local.razon_social" class="w-full" 
              name="razon_social" v-validate="'required'" 
             :danger="(errors.first('step-1.razon_social') ? true : false)" val-icon-danger="clear" 
             :danger-text="(errors.first('step-1.razon_social') ? errors.first('step-1.razon_social') : '')"/>
              
            </div>
            <div class="vx-col md:w-1/2 w-full mt-2">
              <vs-input label-placeholder="Giro"  v-model="data_local.giro" class="w-full " name="giro" />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-2">
            
              <vs-input label-placeholder="Rut"  v-model="data_local.rut" class="w-full " name="rut" v-validate="'required|numeric'" 
              :danger="(errors.first('step-1.rut') ? true : false)" val-icon-danger="clear" 
              :danger-text="(errors.first('step-1.rut') ? errors.first('step-1.rut') : '')"/>
          
            </div>
            <div class="vx-col md:w-1/2 w-full mt-2">
            
                <vs-input  label-placeholder="Digito verificador"  v-model="data_local.dv" class="w-full md:w-1/2" name="dv" v-validate="'required|max:1'" 
                :danger="(errors.first('step-1.dv') ? true : false)" val-icon-danger="clear" 
                :danger-text="(errors.first('step-1.dv') ? errors.first('step-1.dv') : '')"/>
          
            </div>

             <div class="vx-col md:w-1/2 w-full mt-6">
               
               <flat-pickr v-model="data_local.fecha_incorporacion" class="w-full select-large" placeholder="Fecha Incorporacion" 
                  name="fecha_incorporacion" v-validate="'required'" 
                  />
                  <span class="text-danger text-sm" >{{ errors.first('step-1.fecha_incorporacion') }}</span>
            
              </div>
               <div class="vx-col md:w-1 w-full mt-2">
             <label class="vs-input--label ">Habilitado</label>
              <br/>
             
               <vs-switch class="mt-2" v-model="data_local.habilitado" />
           
              </div>
          
          </div>
             
          </form>
        </tab-content>

        <tab-content title="Paso 2" class="mb-1" icon="feather icon-home" :before-change="validateStep2">
          <!-- tab 2 content -->
          <form data-vv-scope="step-2">
           <div>
               <vs-divider color="primary"><h5>Datos responsable</h5></vs-divider>
          </div>
           <div class="vx-row">
             <div class="vx-col md:w-auto w-full mt-2">
             <vx-tooltip color="primary" text="Guardar">
                <vs-button color="primary"  icon-pack="feather" icon="icon-user-plus" data-vv-scope="res" @click.prevent="guardarResponsable()"></vs-button>
              </vx-tooltip>
             </div>
             <div class="vx-col md:w-auto w-full mt-2">
             <vx-tooltip color="primary" text="Limpiar">
                <vs-button color="primary"  icon-pack="feather" icon="icon-trash"  @click.prevent="limpiarResponsable()"></vs-button>
              </vx-tooltip>
              </div>
          </div>
          <div class="vx-row mt-4">
            <div class="vx-col md:w-1/3 w-full mt-2">
              <vs-input label-placeholder="Responsable" v-model="responsable.name" class="w-full" 
              name="responsable_nombre" v-validate="'required'"   data-vv-scope="res"
             :danger="(errors.first('res.responsable_nombre') ? true : false)" val-icon-danger="clear" 
             :danger-text="(errors.first('res.responsable_nombre') ? errors.first('res.responsable_nombre') : '')"/>
              
            </div>
            <div class="vx-col md:w-1/3 w-full mt-2">
              <vs-input label-placeholder="Telefono"  v-model="responsable.telefono" class="w-full " name="responsable_telefono" 
              v-validate="'required|numeric'"   data-vv-scope="res"
              :danger="(errors.first('res.responsable_telefono') ? true : false)" val-icon-danger="clear" 
              :danger-text="(errors.first('res.responsable_telefono') ? errors.first('res.responsable_telefono') : '')"/>
          
            </div>
            <div class="vx-col md:w-1/3 w-full mt-2">
                <vs-input  label-placeholder="Email"  v-model="responsable.email" class="w-full" name="responsable_email" 
                v-validate="'required|email'"   data-vv-scope="res"
                :danger="(errors.first('res.responsable_email') ? true : false)" val-icon-danger="clear" 
                :danger-text="(errors.first('res.responsable_email') ? errors.first('res.responsable_email') : '')"/>
          
            </div>
          
          </div>
         <div class="vx-row mt-6">
              <div>
               <vs-divider color="primary"><h5>Responsables</h5></vs-divider>
            </div>

           <vs-input v-validate="'required|min:1'" type="hidden" name="responsable_cantidad" v-model="cantidadResponsables"/>
           <span class="text-danger text-sm" v-show="errors.has('step-2.responsable_cantidad')" >{{ errors.first('step-2.responsable_cantidad') }}</span>
  

            <div class="vx-col w-full mt-3">
              <vs-table max-items="4" pagination  :data="responsables">
                  <template slot="header">
                  </template>
                  <template slot="thead">
                    <vs-th>
                       Nombre
                    </vs-th>
                    <vs-th>
                       Email
                    </vs-th>
                    <vs-th>
                      Telefono
                    </vs-th>
                     <vs-th>
                      Editar
                    </vs-th>    
                    <vs-th>
                      Borrar
                    </vs-th>                                     
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr :key="indextrres" v-for="(trres, indextrres) in data" >
                      <vs-td>
                        {{ trres.name }}
                      </vs-td>
                      <vs-td>
                         {{ trres.email }}
                      </vs-td>                  
                      <vs-td>
                         {{ trres.telefono }}
                      </vs-td>
                      <vs-td>
                        <vx-tooltip color="primary" text="Editar">
                          <vs-button radius color="primary" type="border" icon-pack="feather" icon="icon-edit" size="small" 
                          class="ml-3" @click="editarResponsable(indextrres,trres)"></vs-button>
                       </vx-tooltip>
                       </vs-td>
                       <vs-td>
                       <vx-tooltip color="primary" text="Eliminar">
                          <vs-button radius color="primary" type="border" icon-pack="feather" icon="icon-trash" size="small" 
                          class="ml-3" @click="eliminarResponsable(indextrres,trres)"></vs-button>
                       </vx-tooltip>
                  
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
            </div>
          </div>

          </form>
        </tab-content>


   
       
        
        
        <!-- tab 3 content -->
         <tab-content title="Paso 3" class="mb-5" icon="feather icon-map-pin" :before-change="validateStep3">
          <form data-vv-scope="step-3">
          <div>
               <vs-divider color="primary"><h5>Datos sucursal_direccion</h5></vs-divider>
          </div>
           <div class="vx-row">
             <div class="vx-col md:w-auto w-full mt-2">
             <vx-tooltip color="primary" text="Guardar">
                <vs-button color="primary"  icon-pack="feather" icon="icon-plus" data-vv-scope="suc" @click.prevent="guardarSucursal()"></vs-button>
              </vx-tooltip>
             </div>
             <div class="vx-col md:w-auto w-full mt-2">
             <vx-tooltip color="primary" text="Limpiar">
                <vs-button color="primary"  icon-pack="feather" icon="icon-trash"  @click.prevent="limpiarSucursal()"></vs-button>
              </vx-tooltip>
              </div>
          </div>
          <div class="vx-row mt-4">
            <div class="vx-col md:w-1/3 w-full mt-2">
              <vs-input label-placeholder="Nombre" v-model="sucursal.nombre" class="w-full" 
              name="sucursal_nombre" v-validate="'required'"   data-vv-scope="suc"
             :danger="(errors.first('suc.sucursal_nombre') ? true : false)" val-icon-danger="clear" 
             :danger-text="(errors.first('suc.sucursal_nombre') ? errors.first('suc.sucursal_nombre') : '')"/>
              
            </div>
            <div class="vx-col md:w-1/3 w-full mt-4">

             <vs-input v-model="sucursal.direccion" type="hidden" data-vv-scope="suc" name="sucursal_direccion" v-validate="'required'" />


                   <div class="vs-component vs-con-input-label vs-input mt-3 w-full vs-input-primary is-label-placeholder">
                <div class="vs-con-input">

                <input type="text" required ref="autocomplete"  name="sucursal_direccion" v-model="sucursal.direccion" 
                  :class="(sucursal.direccion ? 'vs-inputx vs-input--input normal hasValue' : 'vs-inputx vs-input--input normal')" 
                 
                  :style="(errors.first('suc.sucursal_direccion') ? 'border: 1px solid rgba(var(--vs-danger),1)!important;' : 'border: 1px solid rgba(0, 0, 0, 0.2);')" 
                 placeholder=""  >

                   <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label">
        Direccion
      </span>
                  <span v-show="errors.first('suc.sucursal_direccion')" class="input-icon-validate vs-input--icon-validate" style="background: rgba(var(--vs-danger),.2);">
                    <i class="vs-icon notranslate icon-scale material-icons null" valiconpack="material-icons" style="color: rgba(var(--vs-danger),1);">clear</i></span>
              
                
                </div>
               <div v-show="errors.first('suc.sucursal_direccion')"  class="con-text-validation span-text-validation-danger 
                vs-input--text-validation-span v-enter-to" style="height: 20px;">
                <span class="span-text-validation">
                      {{ errors.first('suc.sucursal_direccion') }}
                      </span></div>
         </div>
          
            </div>
            <div class="vx-col md:w-1/3 w-full mt-2">
                <label class="vs-input--label ">Matriz</label>
                <vs-switch class="mt-2" v-model="sucursal.matriz" />
               

            </div>
          
          </div>
         <div class="vx-row mt-6">
              <div>
               <vs-divider color="primary"><h5>Sucursales</h5></vs-divider>
            </div>

           <vs-input v-validate="'required|min:1'" type="hidden" name="sucursal_cantidad" v-model="cantidadSucursales"/>
           <span class="text-danger text-sm" v-show="errors.has('step-3.sucursal_cantidad')" >{{ errors.first('step-3.sucursal_cantidad') }}</span>
  

            <div class="vx-col w-full mt-3">
              <vs-table max-items="4" pagination  :data="sucursales">
                  <template slot="header">
                  </template>
                  <template slot="thead">
                    <vs-th>
                       Nombre
                    </vs-th>
                    <vs-th>
                       Direccion
                    </vs-th>
                    <vs-th>
                      Matriz
                    </vs-th> 
                    <vs-th>
                      Editar
                    </vs-th>   
                    <vs-th>
                      Borrar
                    </vs-th>                                     
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr :key="indextrsuc" v-for="(trsuc, indextrsuc) in data" >
                      <vs-td>
                        {{ trsuc.nombre }}
                     </vs-td>
                      <vs-td >
                         {{ trsuc.direccion }}
                      </vs-td>                  
                      <vs-td>
                         {{ trsuc.matriz === 1 || trsuc.matriz === true ? 'Si' : 'No' }}
                      </vs-td>
                       <vs-td>
                       <vx-tooltip color="primary" text="Editar">
                          <vs-button radius color="primary" type="border" icon-pack="feather" icon="icon-edit" size="small" 
                          class="ml-3" @click="editarSucursal(indextrsuc,trsuc)"></vs-button>
                       </vx-tooltip>
                  
                      </vs-td>
                       <vs-td>
                       <vx-tooltip color="primary" text="Eliminar">
                          <vs-button radius color="primary" type="border" icon-pack="feather" icon="icon-trash" size="small" 
                          class="ml-3" @click="eliminarSucursal(indextrsuc,trsuc)"></vs-button>
                       </vx-tooltip>
                  
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
            </div>
          </div>
          
  
          </form>
        </tab-content>
          <!-- tab 4 content -->
         <tab-content title="Paso 4" class="mb-5" icon="feather icon-refresh-cw" :before-change="validateStep4">
          <form data-vv-scope="step-4">
               <div class="vx-row" >
                <div class="vx-col md:w-1/2 w-full mt-2">
                   <div>
                    <vs-divider color="primary" ><h5>Ciclo produccion</h5></vs-divider>
                  </div>
              <div class="vx-col w-full mt-2">
                
                <vs-select v-model="cicloproduccion.dias" class="w-full select-large" label="Tipo" name="cicprod_tipo" v-validate="'required'" 
                @input="changecicprod" 
                :danger="(errors.first('step-4.cicprod_tipo') ? true : false)"
             :danger-text="(errors.first('step-4.cicprod_tipo') ? errors.first('step-4.cicprod_tipo') : '')">
                  <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cicloProduccionOptions" class="w-full" />
                </vs-select>                
            </div>

            <div class="vx-col md:w-1/2  w-full mt-2">
              <span class=" text-sm" >Desde</span>
                 <vs-input-number v-model="cicloproduccion.inicio" 
                 name="cicprod_desde" v-validate="'required'"  min="1" max="31" 
                 icon-inc="expand_less" icon-dec="expand_more" :disabled="disabledcicpro"/>
  
                  <span class="text-danger text-sm" >{{ errors.first('step-4.cicprod_desde') }}</span>
              </div>
             <div class="vx-col md:w-1/2 w-full mt-2">
             <span class=" text-sm" >Hasta</span>
              <vs-input-number v-model="cicloproduccion.fin" 
                 name="cicprod_hasta" v-validate="'required'"  min="1" max="31"
                 icon-inc="expand_less" icon-dec="expand_more" :disabled="disabledcicpro"/>
          
                  <span class="text-danger text-sm" >{{ errors.first('step-4.cicprod_hasta') }}</span>
              </div>

              </div>    

                 <div class="vx-col md:w-1/2 w-full mt-2">  
                     <div>
                    <vs-divider color="primary" ><h5>Ciclo facturacion</h5></vs-divider>
                    </div>
                <div class="vx-col  w-full mt-2">

                  <vs-select v-model="ciclofacturacion.dias" class="w-full select-large" label="Tipo" name="cicfac_tipo" 
                  v-validate="'required'" @input="changecicfac" :danger="(errors.first('step-4.cicfac_tipo') ? true : false)"
             :danger-text="(errors.first('step-4.cicfac_tipo') ? errors.first('step-4.cicfac_tipo') : '')">
                  <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in ciclofacturacionOptions" class="w-full" />
                </vs-select>

              </div>
            <div class="vx-col md:w-1/2  w-full mt-2">
                  <span class=" text-sm" >Desde</span>
                 <vs-input-number v-model="ciclofacturacion.inicio" 
                 name="cicfac_desde" v-validate="'required'"  min="1" max="31"
                 icon-inc="expand_less" icon-dec="expand_more" :disabled="disabledcicfac"/>

                  <span class="text-danger text-sm" >{{ errors.first('step-5.cicfac_desde') }}</span>
              </div>
             <div class="vx-col md:w-1/2 w-full mt-2">
                  <span class=" text-sm" >Hasta</span>
                   <vs-input-number v-model="ciclofacturacion.fin" 
                 name="cicfac_hasta" v-validate="'required'"  min="1" max="31"
                 icon-inc="expand_less" icon-dec="expand_more" :disabled="disabledcicfac"/>

                  <span class="text-danger text-sm" >{{ errors.first('step-5.cicfac_hasta') }}</span>
              </div>

                </div>  
             </div>   

          </form>
        </tab-content>
             <template slot="footer" slot-scope="props">
       <div class="wizard-footer-left">
           <vs-button v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Anterior</vs-button>
        </div>
        <div class="wizard-footer-right">
          <vs-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Siguiente</vs-button>

          <vs-button v-else  @click.native="props.nextTab()" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">
            Actualizar</vs-button>
          
       
        </div>
      </template>
      </form-wizard>
    
    </div>
    <!-- Content Row -->
    
    <!-- Buttons -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
       <!--   <vx-tooltip color="primary" text="Guardar">
              <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar Cambios</vs-button>
          </vx-tooltip>-->
          <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="ml-4 mt-2" :to="{name: 'empresas'}">Volver</vs-button>
          </vx-tooltip>
        
          <vx-tooltip color="primary" text="Limpiar">
               <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Limpiar</vs-button>
          </vx-tooltip>
          
        </div>
      </div>
    </div>
    <!-- Buttons -->
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from "@/axios.js"
import { Validator } from 'vee-validate';
const dict = {
    custom: {
        razon_social: {
            required: 'El nombre es requerido',
        },
        rut: {
            required: 'El rut es requerido',
            numeric: 'Debe ingresar solo numeros'
        },
        dv: {
            required: 'El digito verificador es requerido',
            max: 'Debe ingresar solo 1 caracter',
        },
        fecha_incorporacion: {
            required: 'La fecha de incorporacion es requerido',
        },
         responsable_nombre: {
            required: 'El nombre es requerido'
        },
         responsable_telefono: {
            required: 'El telefono es requerido',
            numeric: 'El numero de telefono debe ser valido'
        },
         responsable_email: {
            required: 'El email es requerido',
            email: 'Ingrese un email valido'
        },
        responsable_cantidad :{
            required: 'Debe ingresar al menos un responsable',
            min: 'Debe ingresar al menos un responsable'
        },
        sucursal_nombre : {
            required: 'El nombre es requerido',
        },
        sucursal_direccion : {
            required: 'La direccion es requerido',
        },
        sucursal_cantidad :{
            required: 'Debe ingresar al menos una sucursal',
            min: 'Debe ingresar al menos una sucursal'
        },
        cicprod_tipo:{
            required: 'El tipo es requerido',
        },
        cicprod_desde:{
            required: 'El campo es requerido',
            numeric: 'Debe ingresar solo numeros'
        },
        cicprod_hasta:{
            required: 'El campo es requerido',
            numeric: 'Debe ingresar solo numeros'
        },
        cicfac_tipo:{
            required: 'El tipo es requerido',
        },
        cicfac_desde:{
            required: 'El campo es requerido',
            numeric: 'Debe ingresar solo numeros'
        },
        cicfac_hasta:{
            required: 'El campo es requerido',
            numeric: 'Debe ingresar solo numeros'
        }
    }
};
// register custom messages
Validator.localize('en', dict);
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
  components: {
    vSelect,
    FormWizard,
    TabContent,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    data_responsables: {
      type: Array,
      required: true,
    },
    data_sucursales: {
      type: Array,
      required: true,
    },
    data_cicfacturacion: {
      type: Object,
      required: true,
    },
    data_cicproduccion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      urlApi: "/empresas/empresas/",
      email: null,
      telefono: null,
      data_local: {
        rut : this.data.rut ? this.data.rut: null,
        dv : this.data.dv ? this.data.dv: null,
        razon_social : this.data.razon_social ? this.data.razon_social: null,
        rut : this.data.rut ? this.data.rut: null,
        giro : this.data.giro ? this.data.giro: null,
        habilitado : this.data.habilitado,
        fecha_incorporacion : this.data.fecha_incorporacion ? this.data.fecha_incorporacion: null,
        id : this.data.id ? this.data.id: null,
      },

      cicloProduccionOptions: [
        {text: "Por defecto (Mes Completo)", value: 31},
        {text: "Personalizado", value: 0},       
      ],

      ciclofacturacionOptions: [
        {text: "Por 15 dias", value: 15},
        {text: "Por 30 dias", value: 30},
        {text: "Por 90 dias", value: 90},
        {text: "Personalizado", value: 0},
       
      ],
      responsable:{},
      responsables : this.data_responsables,
      cantidadResponsables: this.data_responsables.length,

      sucursal:{
         matriz :  0,
      },
      sucursales : this.data_sucursales,
      cantidadSucursales: this.data_sucursales.length,
      
      ciclofacturacion : { 
          id : this.data_cicfacturacion.id ? this.data_cicfacturacion.id: null,
          empresa_id : this.data_cicfacturacion.empresa_id ? this.data_cicfacturacion.empresa_id: null,
          inicio: this.data_cicfacturacion.inicio ? this.data_cicfacturacion.inicio: null,
          fin: this.data_cicfacturacion.fin ? this.data_cicfacturacion.fin: null,
          dias: this.data_cicfacturacion.dias,
      },
      disabledcicfac: this.data_cicfacturacion.dias === 0 ? false : true,
      cicloproduccion : {
          id : this.data_cicproduccion.id ? this.data_cicproduccion.id: null,
          empresa_id : this.data_cicproduccion.empresa_id ? this.data_cicproduccion.empresa_id: null,
          inicio: this.data_cicproduccion.inicio ? this.data_cicproduccion.inicio: null,
          fin: this.data_cicproduccion.fin ? this.data_cicproduccion.fin: null,
          dias: this.data_cicproduccion.dias,
      },
      disabledcicpro: this.data_cicproduccion.dias === 0 ? false : true,

    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete),{
      types: ['geocode']
      
      });
    this.autocomplete.addListener('place_changed', this.asignaDireccion);
  },
  methods: {
    asignaDireccion() {
      this.sucursal.direccion = this.autocomplete.getPlace().formatted_address;
    },
    eliminarSucursal(index, data){
        this.sucursales.splice(index, 1)
    },
    editarSucursal(index, data){
    
         this.sucursal = {
            id: data.id,
            empresa_id: data.empresa_id,
            nombre: data.nombre,
            direccion: data.direccion,
            matriz: data.matriz,
            lat: data.lat,
            lng: data.lng,
         }

    },
    limpiarSucursal(){
        this.sucursal = {};
        this.errors.clear();
    },
    guardarSucursal() {
           this.$validator.validateAll("suc").then(result => {
                    if (result) {   
                      
                      if(this.sucursal.matriz === 1 || this.sucursal.matriz === true) {
                          for (var x in this.sucursales) { 
                              this.sucursales[x].matriz = false;
                          }

                      }
                      
                      if(this.sucursal.id >= 0){

                        var itemIndex = this.sucursales.findIndex((u) => u.id == this.sucursal.id)
                        this.sucursales.splice(itemIndex, 1 , this.sucursal)   
                        this.cantidadSucursales = this.sucursales.length;
                        this.sucursal = {
                            matriz:0,
                        };


                        }else{

                        this.sucursales.push(this.sucursal);
                        this.cantidadSucursales = this.sucursales.length;
                        this.sucursal = {
                            matriz:0,
                        };


                        }

                     

                      //resolve(true);
                   
                   } else {
                      //  reject("correct all values");
                    }
            })
     },
    editarResponsable(index, data){
    
         this.responsable = {
            id: data.id,
            empresa_id: data.empresa_id,
            name: data.name,
            email: data.email,
            telefono: data.telefono,
         }

    },
    eliminarResponsable(index, data){
        this.responsables.splice(index, 1)
    },
    limpiarResponsable(){
        this.responsable = {};
        this.errors.clear();
    },
    guardarResponsable() {
           this.$validator.validateAll("res").then(result => {
                    if (result) {          

                      if(this.responsable.id >= 0){
                        
                        var itemIndex = this.responsables.findIndex((u) => u.id == this.responsable.id)
                        this.responsables.splice(itemIndex, 1 , this.responsable)   
                        this.cantidadResponsables = this.responsables.length;
                        this.responsable = {};

                      }else{
                      
                        this.responsables.push(this.responsable);
                        this.cantidadResponsables = this.responsables.length;
                        this.responsable = {};
                      }
                     // resolve(true);
                   
                   } else {
                       // reject("correct all values");
                    }
            })
     },
   
    changecicprod(event) {
      if(this.cicloproduccion.dias === 0) {
          this.disabledcicpro = false;
      }else{
          this.disabledcicpro = true;
          this.cicloproduccion.inicio = 1;
          this.cicloproduccion.fin = 1;
          this.errors.clear();
      }
      

    },
    changecicfac(event) {
     
       if(this.ciclofacturacion.dias === 0) {
          this.disabledcicfac = false;
      }else{
          this.disabledcicfac = true;
          this.ciclofacturacion.inicio = 1;
          this.ciclofacturacion.fin = 1;
          this.errors.clear();
      }
    
    },
    validateStep1() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll('step-1').then(result => {
                    if (result) {
                        resolve(true)
                    } else {
                        reject("correct all values");
                    }
                })
            })
        },
    validateStep2() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll("step-2").then(result => {
                    if (result) {          
                        resolve(true)
                    } else {
                        reject("correct all values");
                    }
                })
            })
        }, 
    validateStep3() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll("step-3").then(result => {
                     if (result) {          
                        resolve(true)
                    } else {
                        reject("correct all values");
                    }
                })
            })
        },
    validateStep4() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll("step-4").then(result => {
                    if (result) {
                        this.save_changes();
                        resolve(true)
                    } else {
                        reject("correct all values");
                    }
                })
            })
      },
    save_changes() {
      this.$validator.validateAll().then(result =>{
        if (result) {
          this.datos = [];
          this.datos.push(this.data_local);
          this.datos.push(this.responsables);
          this.datos.push(this.sucursales);
          this.datos.push(this.ciclofacturacion);
          this.datos.push(this.cicloproduccion);
   
      this.$store.dispatch("itemManagement/editarItem", {	item: this.datos , Url: this.urlApi + this.data_local.id })
         .then(()   => { this.$router.push({name:'empresas'}); this.showDeleteSuccess() })
         .catch(err => { 
           
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                title:'Error',
                text: textError,
                color:'danger',
                iconPack: 'feather',
                icon:'icon-alert-circle'})  
        })
       }
      })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Guardar registros',
        text: 'Los registros se han guardado exitosamente.'
      })
    },
    reset_data() {
       this.data_local = {
        rut : this.data.rut ? this.data.rut: null,
        dv : this.data.dv ? this.data.dv: null,
        razon_social : this.data.razon_social ? this.data.razon_social: null,
        rut : this.data.rut ? this.data.rut: null,
        giro : this.data.giro ? this.data.giro: null,
        habilitado : this.data.habilitado,
        fecha_incorporacion : this.data.fecha_incorporacion ? this.data.fecha_incorporacion: null,
        id : this.data.id ? this.data.id: null,
      },

      this.responsable = {},
      this.responsables = this.data_responsables,
      this.cantidadResponsables = this.data_responsables.length,

      this.sucursal = {
         matriz :  0,
      },
      this.sucursales = this.data_sucursales,
      this.cantidadSucursales = this.data_sucursales.length,
      
      this.ciclofacturacion = { 
          id : this.data_cicfacturacion.id ? this.data_cicfacturacion.id: null,
          empresa_id : this.data_cicfacturacion.empresa_id ? this.data_cicfacturacion.empresa_id: null,
          inicio: this.data_cicfacturacion.inicio ? this.data_cicfacturacion.inicio: null,
          fin: this.data_cicfacturacion.fin ? this.data_cicfacturacion.fin: null,
          dias: this.data_cicfacturacion.dias,
      },
      this.disabledcicfac = this.data_cicfacturacion.dias === 0 ? false : true,
      this.cicloproduccion = {
          id : this.data_cicproduccion.id ? this.data_cicproduccion.id: null,
          empresa_id : this.data_cicproduccion.empresa_id ? this.data_cicproduccion.empresa_id: null,
          inicio: this.data_cicproduccion.inicio ? this.data_cicproduccion.inicio: null,
          fin: this.data_cicproduccion.fin ? this.data_cicproduccion.fin: null,
          dias: this.data_cicproduccion.dias,
      },
      this.disabledcicpro = this.data_cicproduccion.dias === 0 ? false : true,
      
      this.$refs.wizard.reset();
      this.errors.clear();
    },
  },
}
</script>
