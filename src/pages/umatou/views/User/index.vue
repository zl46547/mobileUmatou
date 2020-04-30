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
  import OrderManage from './components/OrderManage.vue'
  import AccountList from './components/AccountList.vue'
  import FunctionList from './components/FunctionList.vue'
  import TopInfo from './components/TopInfo.vue'
  import Footer from '../../common/TabBar/index.vue'
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
  @import "../../../../less/variables";

  #user {
    overflow: hidden;
    height: 100vh;
    .content {
      height: calc(100% - 5rem);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
