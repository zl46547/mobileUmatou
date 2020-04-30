<template>
  <div id="collectios">
    <Navigator>
      <span slot="title">收藏</span>
    </Navigator>
    <div class="content-body">
      <OrderList/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import OrderList from './components/OrderList'

  export default {
    components: {
      Navigator,
      OrderList
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../less/variables";

  #collectios {
    height: 100%;
    overflow: hidden;
    .content-body {
      margin-top: 80rem/@baseFontSize;
      height: calc(100vh - 4rem);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
