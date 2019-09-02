<template>
  <div id="orderManage" @click="toMyOrders" v-if="orderStatusNum">
    <div class="orderService">
      <i class="iconfont icon-orders"></i>
      <p>全部订单</p>
    </div>
    <div class="orderService">
      <i class="iconfont icon-wait-pay"></i>
      <p>待付款</p>
      <p class="bage"
         v-if="orderStatusNum.os>0">
        {{orderStatusNum.os}}
      </p>
    </div>
    <div class="orderService">
      <i class="iconfont icon-receive-goods"></i>
      <p>待收货</p>
      <p class="bage"
         v-if="orderStatusNum.ps>0">
        {{orderStatusNum.ps}}
      </p>
    </div>
    <div class="orderService">
      <i class="iconfont icon-rate"></i>
      <p>待评价</p>
      <p class="bage"
         v-if="orderStatusNum.fs>0">
        {{orderStatusNum.fs}}
      </p>
    </div>
    <div class="orderService">
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
        // let allOrders = this.$store.state.orderList.myOrders
        // let allNum = allOrders.length
        // if (allNum > 0) {
        //   let ps = allOrders.where(function (t) {
        //     return t.orderStatus === 'PS'
        //   })
        //   let psNum = ps.length
        //   let fs = allOrders.where(function (t) {
        //     return t.orderStatus === 'FS'
        //   })
        //   let fsNum = fs.length
        //   let rf = allOrders.where(function (t) {
        //     return t.orderStatus === 'FS'
        //   })
        //   let rfNum = rf.length
        //   let os = allOrders.where(function (t) {
        //     return t.orderStatus === 'OS'
        //   })
        //   this.orderServiceList[1].num = os.length
        //   this.orderServiceList[2].num = psNum
        //   this.orderServiceList[3].num = fsNum
        //   this.orderServiceList[4].num = rfNum
      },
      /**
       * 跳转到我的订单
       * @param val 订单类型（ALL：全部订单；OS：下单成功，待付款；PS：支付成功，待收货；FS：交易完成，待评价；RF：退货中）
       */
      toMyOrders (val) {
        let {type} = val
        this.$router.push({name: '我的订单', query: {type}})
      }
    }
  }
</script>

<style lang="less" scoped>
  #orderManage {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2vh 0 1vh 0;
    background-color: #fff;
    .orderService {
      position: relative;
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 2.2rem;
      }
      p {
        margin-top: 1vh;
        font-size: 1.2rem;
      }
      .bage {
        font-size: 1rem;
        height: 17px;
        width: 17px;
        text-align: center;
        line-height: 18px;
        position: absolute;
        top: -7px;
        right: -13px;
        background-color: #ec2828;
        border-radius: 90px;
        color: #fff;
      }
    }
  }

  @media screen and (min-width: 400px) {
    #orderManage {
      .orderService {
        .iconfont {
          font-size: 2.4rem;
        }
        p {
          font-size: 1.4rem;
        }
      }
    }
  }
</style>
