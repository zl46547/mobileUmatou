<template>
  <div id="allOrders">
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
      margin-top: 60px;
    }
    header {
      box-shadow: none;
    }
    .menu{
      box-shadow: -1px 0.5px 20px #dddddd;
    }
  }
  @media screen and (min-width: 640px) {
  }
</style>
