<template>
  <div>
    <v-header>
      <h1 slot="title">分类页</h1>
    </v-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'

  export default {
    components: {
      'VHeader': Header
    },
    data () {
      return {
        datas: ''
      }
    },
    beforeCreate () {}
  }
</script>

<style scoped>

</style>
