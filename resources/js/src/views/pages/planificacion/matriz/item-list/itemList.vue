<!-- =========================================================================================
  File Name: itemList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-item-list">

    <vx-card ref="filterCard" title="Filtros" class="items-list-filters mb-8" collapseAction refreshContentAction @refresh="resetColFilters" 
    @remove="resetColFilters">
      <div class="vx-row">

         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Empresa</label>
          <v-select :options="empresaOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="empresaFilter" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Sucursales</label>
          <v-select :options="sucursalOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="sucursalFilter" class="mb-4 md:mb-0" />
        </div>       
      </div>
    </vx-card>

    <div class="vx-card p-6">


      <div id="grid-wrapper" style="width:100%; height: 100%">
       <vs-table stripe pagination :max-items="10" search :data="gpatrones">
        <template slot="header">
        </template>

        <template slot="thead">
          <vs-th>Codigos</vs-th>
        <!--  <vs-th>Nombre</vs-th>
          <vs-th>Apellido</vs-th>
          <vs-th>Direccion</vs-th>
          <vs-th>Comuna</vs-th>-->
          <vs-th :sort-key="horario.id" v-for="horario in horarios" :key="horario.id">{{ horario.horario }}</vs-th>
        </template>

        <template slot-scope="{data}">
        <!--   <vs-tr :key="indextr" v-for="(tr, indextr) in data">
           <vs-td :data="tr.Rut">
              {{ tr.Rut }}
              <template slot="edit">
                <vs-input v-model="tr.Rut" class="inputx" placeholder="Rut" />
              </template>
            </vs-td>

             <vs-td :data="tr.Nombre">
              {{ tr.Nombre }}
              <template slot="edit">
                <vs-input v-model="tr.Nombre" class="inputx" placeholder="Nombre" />
              </template>
            </vs-td>

             <vs-td :data="tr.Apellido">
              {{ tr.Apellido }}
              <template slot="edit">
                <vs-input v-model="tr.Apellido" class="inputx" placeholder="Apellido" />
              </template>
            </vs-td>

             <vs-td :data="tr.Direccion">
              {{ tr.Direccion }}
              <template slot="edit">
                <vs-input v-model="tr.Direccion" class="inputx" placeholder="Direccion" />
              </template>
            </vs-td>

             <vs-td :data="tr.Comuna">
              {{ tr.Comuna }}
              <template slot="edit">
                <vs-input v-model="tr.Comuna" class="inputx" placeholder="Comuna" />
              </template>
            </vs-td>
            
          </vs-tr>-->
           <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="col" v-for="(col, indexcol) in data[indextr]" :key="indexcol + col">
              {{ col }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      </div>
    
    </div>
  </div>

</template>

<script>
import vSelect from 'vue-select'
import axios from "@/axios.js"

// Store Module
import moduleItemManagement from '@/store/items-management/moduleItemManagement.js'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      urlApi: "/matriz/matriz/",
      
      sucursalFilter: { label: 'Todos', value: 'all', id:0 },
      sucursalOptions: [
        { label: 'Todos', value: 'all', id:0 },
      ],
      empresaFilter: { label: 'Todos', value: 'all', id:0 },
      empresaOptions: [
        { label: 'Todos', value: 'all', id:0 },
      ],
      gpatrones: [],
      horarios: [],
      matriz: [],

    }
  },
  watch: {
     sucursalFilter(obj) {
       this.traeMatriz(obj.id);
    },
    empresaFilter(obj) {
      this.traeSucursales(obj.id);
    },
  },
  computed: {
    itemsData() {
        return this.$store.state.itemManagement.items
    },
  },
  methods: {
    resetColFilters() {
      // Reset Filter Options
      this.sucursalFilter = this.empresaFilter = { label: 'Todos', value: 'all', id:0 }

      this.$refs.filterCard.removeRefreshAnimation()
    },
    addRecord() {
            this.$router.push("../item-add/").catch(() => {})
    },
    traeSucursales(value) {
       
        if(value >  1)  {
          //Combo Sucursales
          axios.get(`/api/v1/sucursal/combo/` + value)
            .then((res) => {
              //console.log(res.data.items);
              var sucursales = res.data.items;  
              sucursales.push({label: 'Todos', value: 'all', id:0})   
              this.sucursalOptions = sucursales.reverse();


              //this.sucursalOptions = res.data.items;  
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

          this.sucursalFilter = { label: 'Todos', value: 'all', id:0 },
          this.sucursalOptions = [
            { label: 'Todos', value: 'all', id:0 },
          ]
        }
     
    },
    traeMatriz(value) {
       
        if(value >  1)  {
          //Combo Sucursales
          axios.get(`/api/v1`+ this.urlApi + value)
            .then((res) => {
           
              this.matriz = res.data.items;
              this.horarios = res.data.horarios;
              this.gpatrones = res.data.gpatrones;

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

          this.sucursalFilter = { label: 'Todos', value: 'all', id:0 },
          this.sucursalOptions = [
            { label: 'Todos', value: 'all', id:0 },
          ]
        }
     
    },
    traeOtrosDatos() {
      //Combo Empresa
      axios.get(`/api/v1/empresas/combo`)
        .then((res) => {
        
          var empresas = res.data.items;  
          empresas.push({label: 'Todos', value: 'all', id:0})   
          this.empresaOptions = empresas.reverse();
        
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
    }
  },
  mounted() {
    
    this.traeOtrosDatos();
    
  },
  created() {
    if(!moduleItemManagement.isRegistered) {
      this.$store.registerModule('itemManagement', moduleItemManagement)
      moduleItemManagement.isRegistered = true
    }

      this.$store.dispatch("itemManagement/traerItems", this.urlApi).catch(err => { 
        
        var textError = err.response.status == 300 ? err.response.data.message : err;
        this.$vs.notify({
                    title:'Error',
                    text: textError,
                    color:'danger',
                    iconPack: 'feather',
                    icon:'icon-alert-circle'})         
                

            
      })
  }
}

</script>

<style lang="scss">
#page-item-list {
  .items-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
  .ag-row-hover {
    /* putting in !important so it overrides the theme's styling as it hovers the row also */
    background-color: #dfdfff !important;
}

.ag-column-hover {
    background-color: #dfffdf;
}
}
</style>
