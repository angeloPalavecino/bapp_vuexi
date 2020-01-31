<template>
  <div id="simple-calendar-app">
    <div class="vx-card no-scroll-content">
      <calendar-view
        ref="calendar"
        :displayPeriodUom="calendarView"
        :show-date="showDate"
        :events="simpleCalendarEvents"
        enableDragDrop
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
            <div class="vx-col w-full items-center sm:flex hidden">
              <h1><em>{{ nombre }}  {{ apellido }} - {{ rut }}</em></h1>
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

        <div class="p-1">
            <small class="date-label">Fecha</small>
            <datepicker :language="langEn" name="start-date" v-model="fecha" :disabled="disabledFrom"></datepicker>
        </div>

        <vs-select v-model="tipo" label="Tipo" ref="tipo" name="tipo" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('step-1.tipo') ? true : false)"
                :danger-text="(errors.first('step-1.tipo') ? errors.first('step-1.tipo') : '')">
              <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipoOptions"  />
        </vs-select>

        <vs-select v-model="horario" label="Horarios" ref="horario" name="horario" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('step-1.horario') ? true : false)"
                :danger-text="(errors.first('step-1.horario') ? errors.first('step-1.horario') : '')">
              <vs-select-item :key="item.id" :value="item.id" :text="item.label" v-for="item in horariosOptions"  />
        </vs-select>
        
        
      
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
     <div class="p-1">
            <small class="date-label">Fecha</small>
            <datepicker :language="langEn" name="start-date" v-model="fecha" :disabled="disabledFrom"></datepicker>
        </div>

        <vs-select v-model="tipo" label="Tipo" ref="tipo" name="tipo" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('step-1.tipo') ? true : false)"
                :danger-text="(errors.first('step-1.tipo') ? errors.first('step-1.tipo') : '')">
              <vs-select-item :key="item.value" :value="item.value" :text="item.label" v-for="item in tipoOptions"  />
        </vs-select>

        <vs-select v-model="horario" label="Horarios" ref="horario" name="horario" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" :disabled="(codificacion > 0 ? false : true)" v-validate="'required'"
                :danger="(errors.first('step-1.horario') ? true : false)"
                :danger-text="(errors.first('step-1.horario') ? errors.first('step-1.horario') : '')">
              <vs-select-item :key="item.id" :value="item.id" :text="item.label" v-for="item in horariosOptions"  />
        </vs-select>

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
export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDate: new Date(),
      disabledFrom: false,
      langEn: en,
      id: 0,
      codificacion: '',
      tipo:'',
      horario:'',
      fecha: '',
      nombre: 'Mauricio',
      apellido: 'Riquelme',
      rut:'16.370.505-2',
      calendarView: 'month',

      activePromptAddEvent: false,
      activePromptEditEvent: false,
      
      tipoOptions: [
        { label: 'Zarpe', value: 'Zarpe' },
        { label: 'Recogida', value: 'Recogida' },
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
  },
  computed: {
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
  mounted() {
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
    addEvent() {
            var horario = this.horariosOptions.find(element => element.id == this.horario); 
            const obj = {  startDate: this.fecha,  endDate: this.fecha, title: horario.label, tipo: this.tipo, fecha: this.fecha, 
            codificacion: this.codificacion, horario_id: this.horario, classes: "event-primary" }
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
        this.disabledFrom = true;
        this.addNewEventDialog(date);
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
      const obj = {  id: this.id, startDate: this.fecha,  endDate: this.fecha, title: horario.label, tipo: this.tipo, fecha: this.fecha, 
      codificacion: this.codificacion, horario_id: this.horario, classes: "event-primary" }
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
    this.codificacion = this.data.codificacion;
    this.nombre = this.data.nombre;
    this.apellido = this.data.apellido;
    this.rut = this.data.rut;
    this.traeHorarios(this.data.sucursal_id);
    this.$store.dispatch('calendar/fetchEvents', this.data.codificacion);
  },
  beforeDestroy() {
    this.$store.unregisterModule('calendar')
  }
}
</script>
<style lang="scss">
@import "@sass/vuexy/apps/simple-calendar.scss";
</style>
