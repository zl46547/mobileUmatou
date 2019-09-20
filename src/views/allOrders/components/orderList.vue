<template>
  <div class="my-orders">
    <div class="order-list">
      <div class="my-order-item"
           v-for="item in allOrders"
           :key="item._id"
      >
        <OrderItem :orderItem="item" @refresh="refresh"/>
      </div>
    </div>
    <Empty v-if="allOrders.length<=0"></Empty>
  </div>
</template>

<script type="text/ecmascript-6">
  import Empty from './empty.vue'
  import OrderItem from './orderItem'

  export default {
    props: {
      allOrders: {
        type: Array,
        required: true
      },
      orderStatusCode: {
        required: true
      }
    },
    components: {
      Empty,
      OrderItem
    },
    methods: {
      refresh() {
        this.$emit('refresh', this.orderStatusCode)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .my-orders {
    margin-top: 80rem/@baseFontSize;
    .order-list {
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
