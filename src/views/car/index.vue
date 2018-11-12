<template>
  <div id="car">
    <v-navigator>
      <span slot="title">购物车</span>
    </v-navigator>
    <v-car-list></v-car-list>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/navigator.vue'
  import CarList from './components/carList.vue'
  import Footer from '../../common/footer/index.vue'
  export default {
    components: {
      'VCarList': CarList,
      'VNavigator': Navigator,
      'VFooter': Footer
    }
  }
</script>

<style scoped>
  #car {
    background-color: #f2f2f2;
    overflow: hidden;
    width: 100%;
  }
</style>
