<template>
  <div id="myOrders">
    <div class="orderList">
      <div class="my-order-item" v-for="item in allOrders" :key="item._id">
        <OrderItem :orderItem="item"
                   @refresh="refresh"
        />
      </div>
    </div>
    <Empty v-if="allOrders.length<=0"></Empty>
  </div>
</template>

<script type="text/ecmascript-6">
  import Empty from './empty.vue'
  import OrderItem from './orderItem'
  import {getOrderList} from '../service'

  export default {
    data () {
      return {
        allOrders: [],
        orderStatusCode: null
      }
    },
    components: {
      Empty,
      OrderItem
    },
    methods: {
      /**
       * 获取订单列表
       */
      initData (orderStatusCode) {
        this.orderStatusCode = orderStatusCode
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        getOrderList({customerGuid, orderStatusCode}).then(res => {
          this.allOrders = res
        })
      },
      /**
       * 刷新
       * @returns {boolean}
       */
      refresh() {
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        getOrderList({
          customerGuid,
          orderStatusCode: this.orderStatusCode
        }).then(res => {
          this.allOrders = res
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #myOrders {
    margin-top: 80rem/@baseFontSize;
    .orderList {
      height: calc(100vh - 4rem);
      &::-webkit-scrollbar {
        display: none;
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .my-order-item {
        margin-bottom: 20rem/@baseFontSize;
      }
    }
  }
</style>
