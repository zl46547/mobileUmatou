<template>
  <div id="orderManage" v-if="orderStatusNum">
    <div class="order-service" @click="toMyOrders()">
      <i class="iconfont icon-orders"></i>
      <p>全部订单</p>
    </div>
    <div class="order-service" @click="toMyOrders('OS')">
      <i class="iconfont icon-wait-pay"></i>
      <p>待付款</p>
      <p class="bage"
         v-if="orderStatusNum.os>0">
        {{orderStatusNum.os}}
      </p>
    </div>
    <div class="order-service" @click="toMyOrders('PS')">
      <i class="iconfont icon-receive-goods"></i>
      <p>待收货</p>
      <p class="bage"
         v-if="orderStatusNum.ps>0">
        {{orderStatusNum.ps}}
      </p>
    </div>
    <div class="order-service" @click="toMyOrders('FS')">
      <i class="iconfont icon-rate"></i>
      <p>待评价</p>
      <p class="bage"
         v-if="orderStatusNum.fs>0">
        {{orderStatusNum.fs}}
      </p>
    </div>
    <div class="order-service" @click="toMyOrders('RF')">
      <i class="iconfont icon-refund"></i>
      <p>轻松退</p>
      <p class="bage"
         v-if="orderStatusNum.rf>0">
        {{orderStatusNum.rf}}
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getOrderStatusNum } from '../service'

  export default {
    components: {},
    mounted () {
      this.getOrderServiceNum()
    },
    data () {
      return {
        orderStatusNum: null
      }
    },
    methods: {
      /**
       * 获取订单数量
       */
      getOrderServiceNum () {
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        getOrderStatusNum(customerGuid).then(res => {
          this.orderStatusNum = res
        })
      },
      /**
       * 跳转到我的订单
       * @param type 订单类型（ALL：全部订单；OS：下单成功，待付款；PS：支付成功，待收货；FS：交易完成，待评价；RF：退货中）
       */
      toMyOrders (type) {
        this.$router.push({name: '我的订单', query: {type}})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #orderManage {
    margin-top: 10rem/@baseFontSize;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20rem/@baseFontSize 0 10rem/@baseFontSize 0;
    background-color: #fff;
    .order-service {
      position: relative;
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 50rem/@baseFontSize;
      }
      p {
        margin-top: 10rem/@baseFontSize;
        font-size: 26rem/@baseFontSize;
      }
      .bage {
        font-size: 20rem/@baseFontSize;
        height: 27rem/@baseFontSize;
        width: 27rem/@baseFontSize;
        text-align: center;
        line-height: 28rem/@baseFontSize;
        position: absolute;
        top: -17rem/@baseFontSize;
        right: -13rem/@baseFontSize;
        background-color: #ec2828;
        border-radius: 50%;
        color: #fff;
      }
    }
  }
</style>
