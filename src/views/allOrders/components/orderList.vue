<template>
  <div id="myOrders">
    <div class="orderList">
      <div class="my-order-item" v-for="item in allOrders" :key="item._id">
        <OrderItem :orderItem="item"
                   @refresh="initData"
        />
      </div>
    </div>
    <Empty v-if="allOrders.length<=0"></Empty>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderButton from './orderButton.vue'
  import Empty from './empty.vue'
  import OrderItem from './orderItem'
  import {getOrderList} from '../service'

  export default {
    data () {
      return {
        allOrders: []
      }
    },
    components: {
      OrderButton,
      Empty,
      OrderItem
    },
    methods: {
      /**
       * 获取订单列表
       */
      initData () {
        let orderStatusCode = this.$route.query.type
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        getOrderList({customerGuid, orderStatusCode}).then(res => {
          this.allOrders = res
        })
      }
      // /**
      //  * 删除订单提示框
      //  * @param val 删除的对象
      //  */
      // delOrderAlert (val) {
      //   this.$message({
      //     description: '确认删除该订单？',
      //     onComfirm() {
      //       this.delOrder(val)
      //     }
      //   })
      // },
      // /**
      //  * 删除订单
      //  * @param val 删除的对象
      //  */
      // delOrder (val) {
      //   this.allOrders.removeAll(function (t) {
      //     return t.orderNo === val.orderNo
      //   })
      //   var res = {
      //     isUpdate: false,
      //     allOrders: this.allOrders
      //   }
      //   this.$store.commit('MY_ORDERS', res)
      // },
      // /**
      //  * 跳转到支付页面
      //  * @param val
      //  */
      // goToPay (val) {
      //   this.$store.commit('SUBMIT_ORDER', val)
      //   this.router.push({name: '支付订单'})
      // },
      // /**
      //  * 重新下单
      //  * @param val
      //  */
      // goToReOrder (reOrders) {
      //   // 将商品添加到购物车
      //   var carlist = this.$store.state.car.carList
      //   this.$message({
      //     description: `确认添加${reOrders.orderList.length}个商品到购物车？`,
      //     onComfirm() {
      //       // 设置默认选中
      //       reOrders.orderList.forEach(e => {
      //         e.checked = true
      //       })
      //       var newCarlist = reOrders.orderList.union(carlist)
      //       this.$store.commit('CAR_LIST', newCarlist)
      //       // 从我的订单中删除
      //       this.delOrder(reOrders)
      //       this.$router.push({path: '/car'})
      //     }
      //   })
      // },
      // /**
      //  * 确认收货
      //  * @param val
      //  */
      // goToComfirm(val) {
      //   this.$message({
      //     description: '是否确认收货？',
      //     onComfirm() {
      //       this.allOrders.forEach((t) => {
      //         if (t.orderNo === val.orderNo) {
      //           t.orderStatus = 'FS'
      //           t.orderStatusName = '交易完成'
      //         }
      //       })
      //       this.$store.commit('MY_ORDERS', {isUpdate: true, allOrders: val})
      //     }
      //   })
      // },
      // /**
      //  * 评价
      //  * @param val
      //  */
      // goToRate(val) {
      //   val.orderStatus = 'CLOSE'
      //   val.orderStatusName = '订单已关闭'
      //   this.$router.push({path: '/rate'})
      // }
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
