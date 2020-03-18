<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewRecord" />
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
    export default {
      components: {
      },
       data() {
          return {
          }
        },
        name: 'CellRendererActions',
        methods: {
          diferencia_horas(dt2, dt1){

            var diff =(dt2.getTime() - dt1.getTime()) / 1000;
            diff /= 60;
            return Math.round(diff);
            
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
            
            var fecha_hoy = new Date();
            var fecha = new Date(this.params.data.fecha_inicio);
            fecha_hoy.setHours(0,0,0,0);
            //var diff = this.diferencia_horas(fecha_hoy,fecha);
            //fecha >= fecha_hoy diff <= 160
            if(fecha >= fecha_hoy){
            
              this.$router.push("../item-edit/" + this.params.data.id).catch(() => {})

            }else{

              this.$vs.dialog({
                color: 'danger',
                title: `Confirmar Eliminacion`,
                text: 'No se pueden eliminar registros que ya se encuentran cerrados.',
                acceptText: "Aceptar"
              })
            
            }

           

            /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
          },
          confirmDeleteRecord() {

           var fecha_hoy = new Date();
           var fecha = new Date(this.params.data.fecha_inicio);
           fecha_hoy.setHours(0,0,0,0);
           // var diff = this.diferencia_horas(fecha_hoy,fecha);
            //fecha >= fecha_hoy diff <= 160
            if(fecha >= fecha_hoy){
            
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Confirmar Eliminacion`,
              text: `Este seguro que desea eliminar el siguiente agendamiento "${this.params.data.rut}"`,
              accept: this.deleteRecord,
              acceptText: "Eliminar"
            })

            }else{

              this.$vs.dialog({
                color: 'danger',
                title: `Confirmar Eliminacion`,
                text: 'No se pueden eliminar registros que ya se encuentran cerrados.',
                acceptText: "Aceptar"
              })
            
            }
      
         
         },
          deleteRecord() {
            /* Below two lines are just for demo purpose */
            //this.showDeleteSuccess()
            
            /* UnComment below lines for enabling true flow if deleting user */
             this.$store.dispatch("itemManagement/borrarItem", {	Id: this.params.data.id, Url: this.$parent.$parent.urlApi  })
               .then(()   => { 
                 
                const filter = this.$parent.$parent.gridApi.getFilterInstance("estado")
                const val = this.$parent.$parent.estadoFilter.value
                let modelObj = null

                 if(val !== "all") {
                  modelObj = { type: "equals", filter: val }
                }
                filter.setModel(modelObj)
                this.$parent.$parent.gridApi.onFilterChanged()
                 
                this.showDeleteSuccess() 

               
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
          showDeleteSuccess() {
            this.$vs.notify({
              color: 'success',
              title: 'Agendamiento Eliminado',
              text: 'El agendamiento seleccionado ya fue eliminado'
            })
          }
        }
    }
</script>
