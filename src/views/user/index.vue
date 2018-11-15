<template>
  <div id="user">
    <div class="content">
      <v-top-info></v-top-info>
      <v-order-manage></v-order-manage>
      <v-account-list></v-account-list>
      <v-function-list></v-function-list>
    </div>
    <v-footer></v-footer>
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
      'VOrderManage': OrderManage,
      'VTopInfo': TopInfo,
      'VAccountList': AccountList,
      'VFunctionList': FunctionList,
      'VFooter': Footer
    }
  }
</script>

<style lang="less" scoped>
  #user {
    .content {
      background-color: #f2f2f2;
      height: calc(100vh - 55px);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
