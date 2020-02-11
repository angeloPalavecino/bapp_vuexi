<template>
  <div id="simple-calendar-app">
    <div class="vx-card no-scroll-content">
      <calendar-view
        ref="calendar"
        :displayPeriodUom="calendarView"
        :show-date="showDate"
        :events="simpleCalendarEvents"
        enableDragDrop
        selectable
        :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
        eventBorderHeight="0px"
        eventContentHeight="1.65rem"
        class="theme-default"
        @click-date="openAddNewEvent"
        @click-event="openEditEvent"
        @drop-on-date="eventDragged">

        <div slot="header" class="mb-4">

          <div class="vx-row no-gutter">

            <!-- Month Name -->
              
             <div class="vx-col w-1/4 items-center sm:flex hidden">
             <div class="con-select w-full p-1" name="empresa" dir="ltr">
               <label for="" class="vs-select--label">Empresas</label>
                <v-select :options="empresasOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="empresa" label="razon_social" 
                ref="empresas" name="empresa" :reduce="razon_social => razon_social.id" class="w-full p-1" 
                placeholder="Seleccione un empresa"/>

              <!--<vs-select v-model="empresa" label="Empresas" ref="empresas" name="empresa" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'">
              <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
              </vs-select>-->
              </div>
              </div>

               <div class="vx-col w-1/4 items-center sm:flex hidden">
                 <div class="con-select w-full p-1" name="sucursal" dir="ltr">
               <label for="" class="vs-select--label">Sucursales</label>
                <v-select :options="sucursalesOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="sucursal" label="nombre" 
                ref="sucursales" name="sucursales" :reduce="nombre => nombre.id" class="w-full p-1" 
                placeholder="Seleccione una sucursal"/>

              </div>
                <!--<vs-select v-model="sucursal" label="Sucursales" ref="sucursal" name="sucursal" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'">
                <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
                </vs-select>-->
              </div>

               <div class="vx-col w-1/4 items-center sm:flex hidden">

               <div class="con-select w-full p-1" name="codificacion" dir="ltr">
               <label for="" class="vs-select--label">Codificaciones</label>
                <v-select :options="codificacionesOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                v-model="codificacion" label="nombre" 
                ref="codificaciones" name="codificaciones" :reduce="nombre => nombre.id" class="w-full p-1" 
                placeholder="Seleccione una persona">
                 <template v-slot:option="option">
                      {{ option.nombre }} {{ option.apellido }}
                  </template>
                </v-select>

              </div>

              <!--<vs-select v-model="codificacion" label="Codificaciones" ref="codificaciones" name="codificaciones" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'">
                <vs-select-item :key="item.id" :value="item.id" :text="item.nombre + ' ' + item.apellido" v-for="item in codificacionesOptions"  />
                </vs-select>-->
              </div>
              
              <div class="vx-col w-1/4 items-center sm:flex hidden mt-6">
                <div class="vx-col w-full flex ml-4">
                  <!-- Labels -->
                  <div class="flex flex-wrap sm:justify-start justify-center">
                    <div class="flex items-center mr-2 mb-2">
                          <div class="h-3 w-3 inline-block rounded-full mr-2 bg-success"></div>
                          <span>Recogida</span>
                      </div>
                    
                      <div class="flex items-center mb-2">
                          <div class="h-3 w-3 inline-block rounded-full mr-2 bg-primary"></div>
                          <span>Zarpe</span>
                      </div>
                  </div>
                </div>
              </div>




            <!-- Current Month -->
            <div class="vx-col sm:w-1/3 mt-4 w-full flex">
              <vx-tooltip color="primary" text="Agendar">
              <vs-button icon-pack="feather" icon="icon-plus" class="mr-3" @click="promptAddNewEvent(new Date())">AGENDAR</vs-button>
              </vx-tooltip>
               <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="mr-4" :to="{name: 'agendamientos'}">Volver</vs-button>
            </vx-tooltip>
            </div>
             <div class="vx-col sm:w-1/3 mt-4 w-full flex sm:justify-end justify-center order-last">
              <div class="flex items-center">
                <feather-icon
                  :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                  @click="updateMonth(-1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />

                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate | month }}</span>

                <feather-icon
                  :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                  @click="updateMonth(1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />
              </div>
            </div>

           <div class="vx-col sm:w-1/3 mt-4 w-full flex justify-center">
              <template v-for="(view, index) in calendarViewTypes">
                <vs-button
                  v-if="calendarView === view.val"
                  :key="String(view.val) + 'filled'"
                  type="filled"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                  >{{ view.label }}</vs-button>
                <vs-button
                  v-else
                  :key="String(view.val) + 'border'"
                  type="border"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                  >{{ view.label }}</vs-button>
              </template>

            </div>

          


          </div>
          
        </div>
      </calendar-view>
    </div>

    <!-- ADD EVENT -->
   <vs-prompt
        class="calendar-event-dialog"
        title="Agregar Agendamiento"
        accept-text= "Guardar"
        @accept="addEvent"
        :is-valid="validForm"
        :active.sync="activePromptAddEvent">
        <div class="calendar__label-container flex">
            <vs-chip  v-if="tipo != ''" class="text-white" :class="'bg-' + tipoColor(tipo)">{{ tipo }}</vs-chip>
        </div>
            <div class="p-1">
                <small class="date-label">Fecha</small>
                <datepicker :language="langEn" name="start-date" v-model="fecha" :disabled="disabledFrom" class="w-full"></datepicker>
            </div>

            <div class="con-select w-full" name="tipo" dir="ltr">
               <label for="" class="vs-select--label">Tipo</label>
                <v-select :options="tipoOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                v-model="tipo" label="label" :disabled="(codificacion > 0 ? false : true)" 
                ref="tipo" name="tipo" :reduce="label => label.value" class="w-full p-1" 
                placeholder="Seleccione un tipo" />  
              </div>

               <div class="con-select w-full" name="horario" dir="ltr">
               <label for="" class="vs-select--label">Horario</label>
                <v-select :options="horariosOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                v-model="horario" label="label" :disabled="(codificacion > 0 ? false : true)" 
                ref="horario" name="horario" :reduce="label => label.id" class="w-full p-1" 
                placeholder="Seleccione un horario" />  
              </div>

           <!-- <vs-select v-model="tipo" label="Tipo" ref="tipo" name="tipo" class="w-full p-1" 
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                    :danger="(errors.first('tipo') ? true : false)"
                    :danger-text="(errors.first('tipo') ? errors.first('tipo') : '')">
                  <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipoOptions"  />
            </vs-select>

            <vs-select v-model="horario" label="Horarios" ref="horario" name="horario" class="w-full p-1" 
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                    :danger="(errors.first('horario') ? true : false)"
                    :danger-text="(errors.first('horario') ? errors.first('horario') : '')">
                  <vs-select-item :key="item.id" :value="item.id" :text="item.label" v-for="item in horariosOptions"  />
            </vs-select>-->
        
        
      
    </vs-prompt>

    <!-- EDIT EVENT -->
    <vs-prompt
        class="calendar-event-dialog"
        title="Editar Agendamiento"
        accept-text= "Guardar"
        cancel-text = "Eliminar"
        button-cancel = "border"
        @cancel="removeEvent"
        @accept="editEvent"
        :is-valid="validForm"
        :active.sync="activePromptEditEvent">
        <div class="calendar__label-container flex">
            <vs-chip  v-if="tipo != ''" class="text-white" :class="'bg-' + tipoColor(tipo)">{{ tipo }}</vs-chip>
        </div>
     <div class="p-1">
            <small class="date-label">Fecha</small>
            <datepicker :language="langEn" name="start-date" v-model="fecha" :disabled="disabledFrom" class="w-full"></datepicker>
        </div>

          <div class="con-select w-full" name="tipo" dir="ltr">
               <label for="" class="vs-select--label">Tipo</label>
                <v-select :options="tipoOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                v-model="tipo" label="label" :disabled="(codificacion > 0 ? false : true)" 
                ref="tipo" name="tipo" :reduce="label => label.value" class="w-full p-1" 
                placeholder="Seleccione un tipo" />  
              </div>

               <div class="con-select w-full" name="horario" dir="ltr">
               <label for="" class="vs-select--label">Horario</label>
                <v-select :options="horariosOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                v-model="horario" label="label" :disabled="(codificacion > 0 ? false : true)" 
                ref="horario" name="horario" :reduce="label => label.id" class="w-full p-1" 
                placeholder="Seleccione un horario" />  
              </div>

      <!--  <vs-select v-model="tipo" label="Tipo" ref="tipo" name="tipo" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('tipo') ? true : false)"
                :danger-text="(errors.first('tipo') ? errors.first('tipo') : '')">
              <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipoOptions"  />
        </vs-select>

        <vs-select v-model="horario" label="Horarios" ref="horario" name="horario" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('horario') ? true : false)"
                :danger-text="(errors.first('horario') ? errors.first('horario') : '')">
              <vs-select-item :key="item.id" :value="item.id" :text="item.label" v-for="item in horariosOptions"  />
        </vs-select>-->

    </vs-prompt>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
import moduleCalendar from '@/store/calendar/moduleCalendar.js'
require("vue-simple-calendar/static/css/default.css")
import axios from "@/axios.js"
import Datepicker from 'vuejs-datepicker'
import { en } from "vuejs-datepicker/src/locale"
import vSelect from 'vue-select'

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker,
    vSelect
  },
  data() {
    return {
      showDate: new Date(),
      disabledFrom: false,
      langEn: en,
      id: 0,
      tipo:'',
      horario:'',
      fecha: '',
    
      calendarView: 'month',

      activePromptAddEvent: false,
      activePromptEditEvent: false,

      empresa:1,
      sucursal:null,
      codificacion: null,
      
      empresasOptions:[],
      sucursalesOptions:[],
      codificacionesOptions:[],

      tipoOptions: [
        { label: 'Zarpe', value: 'Zarpe' },
        { label: 'Recogida', value: 'Recogida' },
      ],

      labelsOptions: [
        { text: 'Business' ,value : 'business', color: 'success' },
        { text: 'Work', value: 'work', color: 'warning'},
        { text: 'Personal', value: 'personal', color: 'danger'},
      ],

      horariosOptions:[],
      
      calendarViewTypes: [
        {
          label: "Mensual",
          val: "month"
        },
        {
          label: "Semanal",
          val: "week"
        },
        /*{
          label: "Year",
          val: "year"
        },*/
      ]
    }
  },
   watch: {
    empresa(obj) {
      this.sucursal = null,
      this.codificacion =  null,
      this.traeSucursales(obj);
    },
    sucursal(obj){    
      this.codificacion =  null, 
      this.traeHorarios(obj);
      this.traecodificaciones(obj);
    },
    codificacion(obj){     
      this.$store.dispatch('calendar/fetchEvents', obj);
    },
  },
  computed: {
     tipoColor() {
        return (label) => {
            if (label == "Recogida") return "success"
            else if (label == "Zarpe") return "primary"
        }
    },
    simpleCalendarEvents() {
        return this.$store.state.calendar.events
    },
    validForm() {
        return this.tipo != '' && this.horario != '' && this.fecha != '';
    },
    disabledDatesTo() {
        return { to: new Date(this.fecha) }
    },
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    traeHorarios(value) {
      
      if(value >  0)  {
        //Combo Horarios
        axios.get(`/api/v1/horarios/combo/` + value)
          .then((res) => {
            this.horariosOptions = res.data.items;  
          })
          .catch((err) => { 

          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  

        })  

      }else{

        this.horariosOptions = [];

      }
     
    },
    traeOtrosDatos() {
     //Combo Empresa
      axios.get(`/api/v1/empresas/listemp`)
        .then((res) => {
          this.empresasOptions = res.data.items;  
        })
        .catch((err) => { 

        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})  

      })

    },
    traeSucursales(value) {
      
      if(value >  1)  {
        //Combo Sucursales
        axios.get(`/api/v1/sucursal/combo/` + value)
          .then((res) => {
            this.sucursalesOptions = res.data.items;  
          })
          .catch((err) => { 

          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  

        })  

      }else{

        this.sucursalesOptions = [];
      }
     
    },
    traecodificaciones(value) {
      
      if(value >  0)  {
        //Combo Codificaciones
        axios.get(`/api/v1/codificaciones/combo/` + value)
          .then((res) => {
            this.codificacionesOptions = res.data.items;  
          })
          .catch((err) => { 

          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  

        })  

      }else{

        this.codificacionesOptions = [];
      }
     
    },
    addEvent() {

        var horario = this.horariosOptions.find(element => element.id == this.horario); 
        var clase = ""
        if(this.tipo == 'Zarpe'){
            clase = "event-primary" ;
        }else{
            clase = "event-success" ;
        }
        const obj = {  startDate: this.fecha,  endDate: this.fecha, title: horario.label, tipo: this.tipo, fecha: this.fecha, 
        codificacion: this.codificacion, horario_id: this.horario, classes: clase }
        this.$store.dispatch('calendar/addEvent', obj)
         .then(()   => { 
           this.$vs.notify({
              color: 'success',
              title: 'Agendamiento Ingresado',
              text: 'El agendamiento ya fue ingresado'
            })

          })
         .catch(err => { 
           
          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  
          })
    },
    updateMonth(val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val);
    },
    clearFields() {
        this.horario = this.fecha = "";
        this.id = 0;
        this.tipo = "";
    },
    promptAddNewEvent(date) {
        this.disabledFrom = false;
        this.addNewEventDialog(date);
    },
    addNewEventDialog(date) {
        this.clearFields();
        this.fecha = date;
        this.activePromptAddEvent = true;
    },
    openAddNewEvent(date) {
       this.$refs.calendar.fullCalendar('addEventSource', [{
        start: date,
        end: date,
        rendering: 'background',
        block: true,
      }, ]);

      //$("#calendar").fullCalendar("unselect");
        //this.disabledFrom = true;
        //this.addNewEventDialog(date);
    },
    openEditEvent(event) {
      const e = this.$store.getters['calendar/getEvent'](event.id)
      this.id = e.id
      this.horario = e.horario_id
      this.tipo = e.tipo
      this.fecha = e.startDate
      this.activePromptEditEvent = true;
    },
    editEvent() {
      var horario = this.horariosOptions.find(element => element.id == this.horario); 
      var clase = ""
      if(this.tipo == 'Zarpe'){
          clase = "event-primary" ;
      }else{
          clase = "event-success" ;
      }
      const obj = {  id: this.id, startDate: this.fecha,  endDate: this.fecha, title: horario.label, tipo: this.tipo, fecha: this.fecha, 
      codificacion: this.codificacion, horario_id: this.horario, classes: clase }
      this.$store.dispatch('calendar/editEvent', obj)
       .then(()   => { 
           this.$vs.notify({
              color: 'success',
              title: 'Agendamiento Actualizado',
              text: 'El agendamiento ya fue actualizado'
            })

          })
         .catch(err => { 
           
          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  
          })

    },
    removeEvent() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirmar Eliminacion`,
        text: `Este seguro que desea eliminar el siguiente agendamiento`,
        accept: this.deleteRecord,
        acceptText: "Eliminar"
      })
    },
    eventDragged(event, date) {
      var agendamiento = event.originalEvent;
      const obj = {  id: agendamiento.id, startDate: date,  endDate: date, title: agendamiento.title, 
      tipo: agendamiento.tipo, fecha: date, codificacion: this.codificacion, horario_id: agendamiento.horario_id, 
      classes: "event-primary" }
      
      this.$store.dispatch('calendar/eventDragged', obj)
      .then(()   => { 
           this.$vs.notify({
              color: 'success',
              title: 'Agendamiento Actualizado',
              text: 'El agendamiento ya fue actualizado'
            })

          })
         .catch(err => { 
           
          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  
          })

    },
    deleteRecord() {
      
      /* UnComment below lines for enabling true flow if deleting user */
      this.$store.dispatch('calendar/removeEvent', this.id)
         .then(()   => { this.showDeleteSuccess() })
         .catch(err => { 
           
          var textError = err.response.status == 300 ? err.response.data.message : err;
          this.$vs.notify({
                      title:'Error',
                      text: textError,
                      color:'danger',
                      iconPack: 'feather',
                      icon:'icon-alert-circle'})  
          })
    },
     showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Agendamiento Eliminado',
        text: 'El agendamiento ya fue eliminado'
      })
    },
  },
  created() {
    this.$store.registerModule('calendar', moduleCalendar)
    
  },
  mounted() {
    this.traeOtrosDatos();
  },
  beforeDestroy() {
    this.$store.unregisterModule('calendar')
  }
}
</script>

<style lang="scss">
@import "@sass/vuexy/apps/simple-calendar.scss";
</style>
