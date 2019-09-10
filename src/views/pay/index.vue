<template>
  <div id="pay">
    <OrderInfo/>
    <PayWay/>
    <Footer/>
  </div>
</template>

<script type="text/ecmascript-6">
  import PayWay from './components/payWay'
  import OrderInfo from './components/OrderInfo'
  import Footer from './components/Footer'

  export default {
    components: {
      PayWay,
      OrderInfo,
      Footer
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #pay {
    background-color: @backgroundColor;
    height: 100vh;
    &::-webkit-scrollbar {
      display: none
    }
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
