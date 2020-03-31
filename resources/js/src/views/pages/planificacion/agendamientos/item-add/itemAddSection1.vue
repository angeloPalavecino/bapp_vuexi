<template>
<div id="simple-calendar-app">
   <div slot="header" class="mb-4">
          <div class="vx-row no-gutter">
            <!-- Month Name -->
             <div class="vx-col w-1/3 items-center sm:flex hidden">
             <div class="con-select w-full p-1" name="empresa" dir="ltr">
               <label for="" class="vs-select--label">Empresa</label>
                <v-select :options="empresasOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="empresa" label="razon_social" 
                ref="empresas" name="empresa" :reduce="razon_social => razon_social.id" class="w-full p-1" 
                placeholder="Seleccione un empresa"/>

              <!--<vs-select v-model="empresa" label="Empresas" ref="empresas" name="empresa" class="w-full p-1" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'">
              <vs-select-item :key="item.id" :value="item.id" :text="item.razon_social" v-for="item in empresasOptions"  />
              </vs-select>-->
              </div>
              </div>

               <div class="vx-col w-1/3 items-center sm:flex hidden">
                 <div class="con-select w-full p-1" name="sucursal" dir="ltr">
               <label for="" class="vs-select--label">Sucursal</label>
                <v-select :options="sucursalesOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="sucursal" label="nombre" 
                ref="sucursales" name="sucursales" :reduce="nombre => nombre.id" class="w-full p-1" 
                placeholder="Seleccione una sucursal"/>

              </div>
                <!--<vs-select v-model="sucursal" label="Sucursales" ref="sucursal" name="sucursal" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'">
                <vs-select-item :key="item.id" :value="item.id" :text="item.nombre" v-for="item in sucursalesOptions"  />
                </vs-select>-->
              </div>

               <div class="vx-col w-1/3 items-center sm:flex hidden">
                 <div class="con-select w-full p-1" name="sucursal" dir="ltr">
               <label for="" class="vs-select--label">Centro Costo</label>

                <v-select :options="centrocostoOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="centrocosto" 
               class="w-full p-1"  placeholder="Seleccione un centro costo" ref="centrocosto" name="centrocosto" 
               />
              

              </div>
              </div>

               <div class="vx-col w-1/3 items-center sm:flex hidden">

               <div class="con-select w-full p-1" name="codificacion" dir="ltr">
               <label for="" class="vs-select--label">Tripulante</label>

               <v-select :options="codificacionesOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="codificacion" 
               class="w-full p-1" label="label" :reduce="label => label.value"  placeholder="Seleccione un tripulante" ref="codificaciones" name="codificaciones" 
               />

               <!-- <v-select :options="codificacionesOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                v-model="codificacion" label="nombre" 
                ref="codificaciones" name="codificaciones" :reduce="nombre => nombre.id" class="w-full p-1" 
                placeholder="Seleccione un tripulante">
                 <template v-slot:option="option">
                   {{ option.filter }}
                  </template>
                </v-select>-->

              </div>

              <!--<vs-select v-model="codificacion" label="Codificaciones" ref="codificaciones" name="codificaciones" class="w-full p-1" 
                  :dir="$vs.rtl ? 'rtl' : 'ltr'">
                <vs-select-item :key="item.id" :value="item.id" :text="item.nombre + ' ' + item.apellido" v-for="item in codificacionesOptions"  />
                </vs-select>-->
              </div>
             
               <div class="vx-col sm:w-1/3 mt-6 w-full flex">
              <vx-tooltip color="primary" text="Agendar">
              <vs-button v-if="$can('agendamientos.create')" icon-pack="feather" icon="icon-plus" class="mt-2 mr-3" @click="promptAddNewEvent(new Date())">AGENDAR</vs-button>
              </vx-tooltip>
               <vx-tooltip color="primary" text="Volver">
              <vs-button icon-pack="feather" icon="icon-arrow-left" class="mt-2 mr-4" @click="volver()">Volver</vs-button>
            </vx-tooltip>
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

          </div>

          <div class="vx-row no-gutter">
           
          <!-- 
             <div class="vx-col sm:w-1/3 mt-6 w-full flex">
            <label class="vs-input--label mt-1 mr-2">Ver eventos?</label>
               <vs-switch v-model="eventos" />
            </div>-->

          </div>
        </div>


    <div class="w-full mb-4 mt-4">
       
    <FullCalendar
      class='calendar'
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :buttonText="buttonText"
      :validRange="validRange"
      :plugins="calendarPlugins"
      :allDaySlot="allDaySlot"
      :weekends="calendarWeekends"
      :events="CalendarEvents"
      :editable="editable"
      :disableResizing="aux"
      :locale="locale"
      :firstDay="firstDay"
      @dateClick="handleDateClick"
      @eventClick="openEditEvent"
      @eventDrop="eventDragged"
      @eventResize="eventResize"

      />
    </div> 

        <!-- :buttonText="{
        today:    'hoy',
        month:    'mes',
        week:     'semana',
        day:      'dia',
      }" -->

     <!-- ADD EVENT -->
   <vs-prompt
        class="calendar-event-dialog"
        title="Agregar Agendamiento"
        accept-text= "Guardar"
        @accept="addEvent"
        :is-valid="validFormAdd"
        :active.sync="activePromptAddEvent">
        <div class="calendar__label-container flex">
            <vs-chip  v-if="tipo != ''" class="text-white" :class="'bg-' + tipoColor(tipo)">{{ tipo }}</vs-chip>
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
        :is-valid="validFormEdit"
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
    </vs-prompt>  
  </div>
  
</template>
 
<script>
import moduleCalendar from '@/store/calendar/moduleCalendar.js'
import axios from "@/axios.js"
import Datepicker from 'vuejs-datepicker'
import { en } from "vuejs-datepicker/src/locale"
import vSelect from 'vue-select'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    Datepicker,
    vSelect,
  },
  data: function() {
    return {
      showDate: new Date(),
      disabledFrom: true,
      editable:true,
      aux:true,
      eventos:true,
      langEn: en,
      locale: 'es',
      firstDay: 1,
      validRange:{ start: new Date() },
      buttonText:{
        today:    'hoy',
        month:    'mes',
        week:     'semana',
        day:      'día',
        list:     'lista'
      },
      selectable:true,
      id: 0,
      tipo:'',
      horario:'',
      fecha: '',
    
      activePromptAddEvent: false,
      activePromptEditEvent: false,

      empresa:1,
      sucursal:null,
      codificacion: null,
      centrocosto:null,

      empresasOptions:[],
      sucursalesOptions:[],
      codificacionesOptions:[],
      centrocostoOptions:[],

      tipoOptions: [
        { label: 'Zarpe', value: 'ZARPE' },
        { label: 'Recogida', value: 'RECOGIDA' },
      ],

      horariosOptions:[],

      fechas: [],
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      allDaySlot: false,

      //calendarEvents: []
    }
  },
  watch: {
    empresa(obj) {
      this.sucursal = null;
      this.codificacion = null;
      this.centrocosto =  null;
      var item = this.empresasOptions.find((u) => u.id === obj)  
      
      if(item.id == 1){      
        
        var fecha = new Date();
       
      }else{
          
        var fecha_hoy = new Date(); 
        var fecha_max = new Date();
        var fecha = new Date();
        var horas = item.hora_max_agendamiento.split(':');
        fecha_max.setHours(horas[0],horas[1],horas[2]);

        if(Date.parse(fecha_max) < Date.parse(fecha_hoy)){
          fecha.setDate(fecha.getDate() + 1);      
        }
        
      }

      var validRange = { start: fecha };    
      let calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.setOption('validRange', validRange);
      
     // this.$store.state.calendar.events = null,
      this.traeSucursales(obj);
    },
    sucursal(obj){    
      this.centrocosto =  null;
      this.codificacion = null;
      //this.$store.state.calendar.events = null,
      this.traeHorarios(obj);
      this.traecentrocostos(obj);
    },
    centrocosto(obj){    
     
      this.codificacion = null;
      //this.$store.state.calendar.events = null,
      //this.traeHorarios(obj);
      if(obj.value != null){
        this.traecodificaciones(obj.value);
      }
    },
    codificacion(obj){    
     
      this.$store.dispatch('calendar/fetchEvents', obj);
    },
  },
  computed: {
    tipoColor() {
        return (label) => {
            if (label == "RECOGIDA") return "success"
            else if (label == "ZARPE") return "primary"
        }
    },
    CalendarEvents() {
          return this.$store.state.calendar.events
    },
    validFormAdd() {
        return this.tipo != '' && this.horario != '' && this.fechas != '';
    },
    validFormEdit() {
        return this.tipo != '' && this.horario != '' && this.fecha != '';
    },
  },
  methods: {
    volver(){
        this.$store.state.calendar.events = null
        this.$router.push({name:'agendamientos'});
    },
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
    traecentrocostos(value) {
      
      if(value >  0)  {
        //Combo Centro Costo
        axios.get(`/api/v1/codificaciones/combocentro/` + value)
          .then((res) => {
            this.centrocostoOptions = res.data.items;  
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

        this.centrocostoOptions = [];
      }
     
    },
     traecodificaciones(value) {
      
      if(value !=  null)  {
        //Combo Codificaciones
        axios.get(`/api/v1/codificaciones/combocodificaciones/` + value)
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
       
        if(this.$can('agendamientos.store')){

            var horario = this.horariosOptions.find(element => element.id == this.horario); 
      
            const obj = {  tipo: this.tipo, fechas: this.fechas,codificacion: this.codificacion, horario_id: this.horario}
            this.$store.dispatch('calendar/addEvent', obj)
            .then(()   => { 

              this.$store.dispatch('calendar/fetchEvents', this.codificacion);
              this.clearFields();
              this.fechas = [];
              let calendarApi = this.$refs.fullCalendar.getApi()
              calendarApi.render();
            
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

          }else{

              this.$vs.notify({
                          title:'Error',
                          text: 'No tiene permisos para agregar agendamientos',
                          color:'danger',
                          iconPack: 'feather',
                          icon:'icon-alert-circle'})  

          }
    },
     openEditEvent(event) {
      // console.log(event.event);
      const e = this.$store.getters['calendar/getEvent'](event.event.id)
      this.id = e.id
      this.horario = e.horario_id
      this.tipo = e.tipo
      this.fecha = e.start
      this.activePromptEditEvent = true;
    },
    editEvent() {

      if(this.$can('agendamientos.update')){

      var horario = this.horariosOptions.find(element => element.id == this.horario); 
      var color = ""
      if(this.tipo == 'ZARPE'){
          color = "#1AA1C8" ;
      }else{
          color = "#28C76F" ;
      }
      const obj = {  id: this.id, start: this.fecha,  end: this.fecha, title: horario.label, tipo: this.tipo, fecha: this.fecha, 
      codificacion: this.codificacion, horario_id: this.horario, color: color }
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
        
        }else{

              this.$vs.notify({
                          title:'Error',
                          text: 'No tiene permisos para editar el agendamiento',
                          color:'danger',
                          iconPack: 'feather',
                          icon:'icon-alert-circle'})  

        }

    },
    removeEvent() {

      if(this.$can('agendamientos.destroy')){

          this.$vs.dialog({
            type: 'confirm',
            color: 'danger',
            title: `Confirmar Eliminacion`,
            text: `Este seguro que desea eliminar el siguiente agendamiento`,
            accept: this.deleteRecord,
            acceptText: "Eliminar"
          })

       }else{

              this.$vs.notify({
                          title:'Error',
                          text: 'No tiene permisos para eliminar el agendamiento',
                          color:'danger',
                          iconPack: 'feather',
                          icon:'icon-alert-circle'})  

        }
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
    eventResize(event) {
      event.revert();
    },
     eventDragged(event) {

      if(this.$can('agendamientos.update')){

      var agendamiento = event.event;
      const obj = {  id: agendamiento.id, start: agendamiento.start, end: agendamiento.start, title: agendamiento.title, 
      tipo: agendamiento.extendedProps.tipo, fecha: agendamiento.start, codificacion: this.codificacion, horario_id: agendamiento.extendedProps.horario_id, 
      color: agendamiento.borderColor }
      
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
         
         }else{

              this.$vs.notify({
                          title:'Error',
                          text: 'No tiene permisos para editar el agendamiento',
                          color:'danger',
                          iconPack: 'feather',
                          icon:'icon-alert-circle'})  

        }

    },
    clearFields() {
        this.horario = "";
        this.id = 0;
        this.tipo = "";
    },
    promptAddNewEvent(date) {
        //this.disabledFrom = false;
        this.addNewEventDialog(date);
    },
    addNewEventDialog(date) {
        this.clearFields();
        this.activePromptAddEvent = true;

    },
    handleDateClick(info) {
      

      if(info.dayEl.style.backgroundColor == 'rgb(163, 73, 164)' ){
        const index = this.fechas.indexOf(info.dateStr);
        if (index > -1) {
            this.fechas.splice(index, 1);
         }
         info.dayEl.style.backgroundColor = '';
      } else {
        this.fechas.push(info.dateStr);
        info.dayEl.style.backgroundColor = 'rgb(163, 73, 164)';
      }
       
 
       /* if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      }¨*/
    }
  },
 created() {
    
    this.$store.registerModule('calendar', moduleCalendar)    
  },
  mounted() {
    this.traeOtrosDatos();
  },
  beforeDestroy() {
    this.$store.state.calendar.events = null;
    this.$store.unregisterModule('calendar')
  }

}
</script>
 
<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
.calendar {
  margin: 0 auto;
  max-width: 100%;
}

.fc-button-primary {
  background-color: rgba(var(--vs-primary),1)!important;
  border-color: rgba(var(--vs-primary),1)!important;
  //opacity: 0.65!important;
}
.fc-button-active {
  opacity: 0.65!important;
}

.fc-sun { background-color:RGB(239, 220 , 239) } //RGB(230, 240, 241)
.fc-sat { background-color:RGB(239, 220 , 239) } //RGB(230, 240, 241)

td.fc-today {  background:RGB(255 , 174  , 201 ) }
.fc-disabled-day {  background:RGB(196, 196, 255) !important }

</style>