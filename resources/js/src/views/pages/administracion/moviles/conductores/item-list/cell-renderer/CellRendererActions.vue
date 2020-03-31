<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon v-if="$can('moviles.show')" icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewRecord" />
      <feather-icon v-if="$can('moviles.edit')" icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      <feather-icon v-if="$can('moviles.destroy')" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
      <feather-icon icon="FileIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="popUpDocs=true" />
      
      <!-- POP UP DOCUMENTOS -->
      <pop-up-documents :popUpStatus="popUpDocs" @close-popup="closepopup" :data="this.params.data" :tipo="1" :url="this.$parent.$parent.urlApi"></pop-up-documents>

    </div>
</template>

<script>
import PopUpDocuments from "../../../utils/PopUpDocuments.vue"

    export default {
      components: {
         PopUpDocuments
      },
       data() {
          return {
            popUpDocs: false,
          }
        },
        name: 'CellRendererActions',
        methods: {
          closepopup(status) {
            this.popUpDocs = status;
          },
          viewRecord() {
            this.$router.push("../item-view/" + this.params.data.id).catch(() => {})

            /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
          },
          editRecord() {
            this.$router.push("../item-edit/" + this.params.data.id).catch(() => {})

            /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
          },
          confirmDeleteRecord() {
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Confirmar Eliminacion`,
              text: `Este seguro que desea eliminar el siguiente movil "${this.params.data.name}"`,
              accept: this.deleteRecord,
              acceptText: "Eliminar"
            })
          },
          deleteRecord() {
            /* Below two lines are just for demo purpose */
            //this.showDeleteSuccess()
            
            /* UnComment below lines for enabling true flow if deleting user */
             this.$store.dispatch("itemManagement/borrarItem", {	Id: this.params.data.id, Url: this.$parent.$parent.urlApi  })
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
              title: 'Conductor Eliminado',
              text: 'El conductor seleccionado ya fue eliminado'
            })
          }
        }
    }
</script>
