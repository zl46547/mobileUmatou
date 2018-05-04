<template>
  <div>
    <div>
      <v-header></v-header>
    </div>
    <v-car-list></v-car-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/car/header.vue'
  import CarList from '@/components/car/carList.vue'

  export default {
    components: {
      'VHeader': Header,
      'VCarList': CarList
    },
    data() {
      return {
        datas: ''
      }
    },
    beforeCreate() {
    }
  }
</script>

<style scoped>

</style>
