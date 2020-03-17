<template>
   <vs-popup classContent="popup-example" title="Documentos" :active="this.popUpStatus" @close="close">
      <vs-tabs color="primary" ref="tabdocs" >
          <vs-tab label="Adjuntar"  icon-pack="feather" icon="icon-upload">
         
          <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2"> 
                <vs-select v-model="item_data.tipo_documento" v-validate="'required'" label="Tipo de Documento" name="tipo_documento"
                class="w-full" >
                  <vs-select-item :key="item.id" :value="item.id+'|'+item.name" :text="item.name" v-for="item in typoDocOptions"  />
                </vs-select>
                <span class="text-danger text-sm" v-show="errors.has('tipo_documento')">{{ errors.first('tipo_documento') }}</span> 
              </div>
              <div class="vx-col md:w-1/2 w-full mt-3">
              <flat-pickr v-model="item_data.fecha_vencimiento" v-validate="'required'" label="Fecha de Vencimiento" 
                class="w-full select-large mt-5" placeholder="Fecha de Vencimiento" name="fecha_vencimiento"/>
            
               
                <span class="text-danger text-sm">{{ errors.first('fecha_vencimiento') }}</span>                           
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
               <input
                  label="Documento"
                  type="file"
                  class="w-full"
                  name="file"
                  id="file"
                  @change="uploadData"
                  ref="fileupload"
                  accept="application/pdf,application/msword,application/image/png,image/jpeg"           
                />
                <span class="text-sm" >Fomatos permitidos: JPG - PNG - DOC - PDF</span>
                <br/>
                <span class="text-sm" ><i>Tamaño maximo 2 MB</i></span>
              
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-button  @click="upload()" color="primary" type="filled">Adjuntar</vs-button>
              </div>
            </div>  
            <div class="vx-row">
            </div>
          </vs-tab>
          <vs-tab label="Documentos" icon-pack="feather" icon="icon-file-text">

            <vs-table max-items="4" pagination  :data="item_data_documents" ref="tabledocs">
                  <template slot="header">
                    <h3>
                      Documentos Subidos
                    </h3>
                  </template>
                  <template slot="thead">
                    <vs-th colspan="2">
                       Documento
                    </vs-th>
                    <vs-th>
                       Vencimiento
                    </vs-th>
                    <vs-th>
                      Descarga
                    </vs-th>                                     
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :key="indextrdoc" v-for="(trdoc, indextrdoc) in data" >
                      <vs-td colspan="2">
                        {{ trdoc.name.split(/[.,\/-]/)[1] }}
                      </vs-td>
                      <vs-td>
                        <vs-chip :color="getStatusDocs(trdoc.fecha_vencimiento)">{{ trdoc.fecha_vencimiento }}</vs-chip>
                      </vs-td>                  
                      <vs-td :data="data[indextrdoc].url">
                        <a style="cursor: pointer;" rel="nofollow" @click="downloadDocument(data[indextrdoc].id, data[indextrdoc].name)">Descargar</a>                        
                      </vs-td>

                    </vs-tr>
                  </template>
                </vs-table>

          </vs-tab>
        </vs-tabs>

    
    </vs-popup>
</template>

<script>
import axios from "@/axios.js"
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import { Validator } from 'vee-validate';
const dict = {
  custom: {
     tipo_documento: {
      required: "El tipo de documento es requerido",
    },
    fecha_vencimiento: {
      required: "La fecha de vencimiento es requerida"
    },
  }
};
// register custom messages
Validator.localize('en', dict);
export default {
  name: 'PopUpDocuments',
  props: {
    popUpStatus: Boolean ,
    data: Object ,
    tipo: Number ,
    url: String
  },
  components: {
    flatPickr
  },
  data() {
        return {
           item_data: {
              tipo_documento:'',
              fecha_vencimiento:''
           },
           item_data_documents:null,
           typoDocOptions: [],
        }
    },
  watch:{
    popUpStatus(){
      if(this.popUpStatus == true){
          this.traeOtrosDatos();

          let myElement = document.querySelector(".line-vs-tabs");
          myElement.style.width = "95px";
          myElement.style.left = "0px";
      }
    }
  },
  mounted() {
  },
  methods: {
     close() {

      let myElement = document.querySelector(".line-vs-tabs");
      myElement.style.width = "95px";
      myElement.style.left = "0px";

      this.$refs.tabdocs.activeChild(0);
      //this.$refs.tabdocs.changePositionLine(0);

      this.item_data = {
         tipo_documento:'',
         fecha_vencimiento:''
      }

      if(this.$refs.fileupload.value) {
        this.$refs.fileupload.value = ''
      }
      
      this.errors.clear();

      this.$emit("close-popup", false);
    },
    getStatusDocs(fecha) {
      var factual = new Date();
      var fvencimiento = new Date(fecha);  
      if (fvencimiento.getTime() >= factual.getTime()) return "success";
      if (fvencimiento.getTime() <= factual.getTime()) return "danger";
      return "danger";
    },
     uploadData(e) {
       const thisIns = this;
      const tipo = e.target.files[0].type;
      const size = e.target.files[0].size;
      //console.log(e);
     if(tipo == "image/png" || tipo == "image/jpeg" || tipo == "application/msword" || 
      tipo == "application/pdf" ){
        //|| tipo == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        if(size <= 2000000){ //2097152
            
            this.item_data.file = e.target.files[0];
            this.item_data.filename = e.target.files[0].name;
            
            }else{
            
             if(this.$refs.fileupload.value) {
              this.$refs.fileupload.value = ''
            }
            thisIns.$vs.notify({
                title: "Error",
                text: "El archivo no tiene el tamañano adecuado (Max. 2 MB)",
                color: "danger",
                iconPack: "feather",
                icon: "icon-alert-circle"
            });


          }
      }else{
           if(this.$refs.fileupload.value) {
              this.$refs.fileupload.value = ''
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
    upload(){
      
       this.$validator.validateAll().then(result =>{
         
        if (result) { 
               
          const formData = new FormData();     
          formData.append('file', (this.item_data.file));
          formData.append('tipo_documento_id', (this.item_data.tipo_documento.split("|")[0])); 
          formData.append('tipo_documento', (this.item_data.tipo_documento.split("|")[1])); 
          formData.append('fecha_vencimiento', (this.item_data.fecha_vencimiento));  

          //0 Moviles
          //1 Conductores
          //2 Asociados

          /*if(this.tipo === 0){
            formData.append('car_id', (this.data.id));
            formData.append('numero_movil', (this.data.numero_movil));
          }else{
            formData.append('driver_id', (this.data.id));
            formData.append('rut', (this.data.rut));
          }*/
          
          formData.append('id', (this.data.id));
          
          this.enviaData(formData);
        }
      })
      
    },  
    enviaData(formData) {
        const thisIns = this;
   if (this.item_data.file.size > 0) {
        axios.post(`/api/v1` + this.url + `upload`, formData, {headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json"
        }})
        .then((res) =>{
          
          thisIns.$vs.notify({
            title:'Exito',
            text: 'El documento se ha subido con exito!.',
            color:'success',
            iconPack: 'feather',
            icon:'icon-alert-circle'
          })
          
           this.close();
        })
        .catch(function (err) {
            var textError = err.response.status == 300 ? err.response.data.message : err;
            thisIns.$vs.notify({
                        title:'Error',
                        text: textError,
                        color:'danger',
                        iconPack: 'feather',
                        icon:'icon-alert-circle'})        
        });
      }
    },
    downloadDocument(id, name){
      
      axios.get(`/api/v1` + this.url + `document/`+ id, {responseType: 'blob'})
        .then((res) => {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(res.data);
            a.href = url;
            a.download = name;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        
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
     traeOtrosDatos() {

      //Documentos Asociado
      axios.get(`/api/v1` + this.url + `documents/` + this.data.id)
        .then((res) => {
            this.item_data_documents = res.data.items;  
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
      
      //Tipo de documentos
      axios.get(`/api/v1/tipodocumentos/tipodocumentos/` + this.tipo)
        .then((res) => {
            this.typoDocOptions = res.data.items;  
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
  },
  created() {
    this.traeOtrosDatos()
  }
}
</script>
<style>

</style>