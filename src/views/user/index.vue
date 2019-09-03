<template>
  <div id="user">
    <div class="content">
      <TopInfo/>
      <OrderManage/>
      <AccountList/>
      <FunctionList/>
    </div>
    <Footer/>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderManage from './components/orderManage.vue'
  import AccountList from './components/accountList.vue'
  import FunctionList from './components/functionList.vue'
  import TopInfo from './components/topInfo.vue'
  import Footer from '../../common/footer/index.vue'
  export default {
    components: {
      OrderManage,
      TopInfo,
      AccountList,
      FunctionList,
      Footer
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #user {
    height: 100vh;
    .content {
      background-color: #f2f2f2;
      height: calc(100% - 5rem);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
