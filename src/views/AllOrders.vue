<template>
  <div id="allOrders">
    <div>
      <v-header>
        <h1 slot="title">我的订单</h1>
      </v-header>
    </div>
    <div class="content">
      <v-order-list></v-order-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import OrderList from '@/components/allOrders/orderList.vue'

  export default {
    components: {
      'VHeader': Header,
      'VOrderList': OrderList
    },
    mounted () {
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
  #allOrders{
    overflow: hidden;
    .content {
      background-color: #f2f2f2;
      height: 92vh;
      margin-top: 8vh;
    }
  }
  @media screen and (min-width: 640px) {
  }
</style>
