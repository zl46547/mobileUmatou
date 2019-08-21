<template>
  <div id="orderList">
    <div class="groupOrderList">
      <div class="orderList"
           v-for="(groupItem,groupIndex) in groupOrderList"
           :key="groupIndex">
        <OrderItem :groupItem="groupItem"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import OrderItem from './orderItem'

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
      getGroupOrderList() {
        let orderList = this.$store.state.car.carList
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
      getGroupSum(groupItemList) {
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
  #orderList {
    overflow: hidden;
    .groupOrderList {
      margin: 0 10px;
    }
    .orderList {
      width: 100%;
      box-shadow: 0 1px 6px #d7d7d7;
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      &:first-of-type {
        margin-top: 10px;
      }
    }
  }

  @media screen and (min-width: 400px) {
    #orderList {
      .groupOrderList {
        margin: 0 18px;
      }
      .orderList {
        margin-bottom: 18px;
        &:first-of-type {
          margin-top: 18px;
        }
      }
    }
  }
</style>
