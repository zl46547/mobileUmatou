<template>
  <div id="allOrders" style="width: 100%;">
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
  .content {
    background-color: #f2f2f2;
    height: 91vh;
  }
  @media screen and (min-width: 768px) {
  }
</style>
