<template>
  <div class="order-list">
    <div class="my-order-item"
         v-for="item in allOrders"
         :key="item._id"
    >
      <OrderItem :orderItem="item"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderItem from './OrderItem'

  export default {
    props: {
      allOrders: {
        type: Array,
        required: true
      }
    },
    components: {
      OrderItem
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  .order-list {
    .my-order-item {
      margin-bottom: 20rem/@baseFontSize;
    }
  }
</style>
