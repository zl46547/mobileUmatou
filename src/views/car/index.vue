<template>
  <div id="cart">
    <Navigator>
      <span slot="title">购物车</span>
    </Navigator>
    <CarList></CarList>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/navigator'
  import CarList from './components/carList'
  import Footer from '../../common/footer'
  export default {
    components: {
      CarList,
      Navigator,
      Footer
    }
  }
</script>

<style scoped>
  #cart{
    height: 100vh;
    overflow: hidden;
  }
</style>
