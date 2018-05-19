<template>
  <div class="content">
    <div>
      <v-header>
        <h1 slot="title">购物车</h1>
      </v-header>
    </div>
    <v-car-list></v-car-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import CarList from '@/components/car/carList.vue'

  export default {
    components: {
      'VHeader': Header,
      'VCarList': CarList
    },
    data () {
      return {
        datas: ''
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style scoped>
  .content {
    background-color: #f2f2f2;
    width: 100%;
  }
</style>
