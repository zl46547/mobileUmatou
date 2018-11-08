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
  import Header from '@/common/header/index.vue'
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
      var vm = this
      // 模拟请求数据
      vm.$store.commit('SET_LOADING', true)
      setTimeout(function () {
        vm.$store.commit('SET_LOADING', false)
      }, 500)
    },
    methods: {}
  }
</script>

<style scoped>
  .content {
    background-color: #f2f2f2;
    overflow: hidden;
    width: 100%;
  }
</style>
