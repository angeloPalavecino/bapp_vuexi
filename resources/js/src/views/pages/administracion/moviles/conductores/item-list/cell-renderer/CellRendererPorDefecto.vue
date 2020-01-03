<template>
      <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
          <feather-icon icon="CheckCircleIcon" :style="{'visibility': params.value === 1 ? 'visible' : 'hidden'}" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" />
      </div>
</template>

<script>
    export default {
        name: 'CellRendererPorDefecto',
        computed: {
        }
    }
</script>

<style lang="scss" scpoped>
</style>
