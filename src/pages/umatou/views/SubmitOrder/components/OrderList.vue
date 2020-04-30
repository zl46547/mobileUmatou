<template>
  <div class="order-list">
    <div class="order"
         v-for="(groupItem,groupIndex) in groupOrderList"
         :key="groupIndex">
      <OrderItem :groupItem="groupItem"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderItem from './OrderItem'

  export default {
    components: {
      OrderItem
    },
    mounted () {
      this.getGroupOrderList()
    },
    data () {
      return {
        groupOrderList: []
      }
    },
    methods: {
      /**
       * 获取分组后的购物车列表
       */
      getGroupOrderList () {
        let orderList = this.$store.state.cart.cartList
        this.groupOrderList = orderList.groupBy(item => {
          return item.productInfo.financeCName
        }).map(groupItemList => {
          return {
            groupItemList,
            groupName: groupItemList[0].productInfo.financeCName,
            groupSum: this.getGroupSum(groupItemList)
          }
        })
      },
      /**
       * 获取分组后的总金额
       * @param groupItemList
       */
      getGroupSum (groupItemList) {
        let sum = 0
        if (groupItemList) {
          groupItemList.forEach(item => {
            sum = sum + item.productInfo.periodMoney * item.quantity
          })
        }
        return sum.toFixed(2)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  .order-list {
    .order{
      margin: 0 auto 1rem;
      width: 95%;
      box-shadow: 0 .1rem 5rem #d7d7d7;
      background-color: #fff;
      border-radius: .5rem;
      &:first-of-type {
        margin-top: 1rem;
      }
    }
  }
</style>
