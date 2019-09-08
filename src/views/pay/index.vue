<template>
  <div id="pay">
    <div class="content-body">
      <PayWay :orderDetail="orderDetail"
              ref="payWay"
      />
    </div>
    <!--<div class="footer" @click="comfirmPay()"-->
         <!--:class="{'enable':remainTime>0,'disable':remainTime<=0}">-->
      <!--<div v-if="remainTime>0">-->
        <!--<span>确认支付</span>-->
        <!--<span>¥</span>-->
        <!--<span>{{submitOrder.finalPrice}}</span>-->
      <!--</div>-->
      <!--<div v-if="remainTime<=0">-->
        <!--<span>订单已过期</span>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import PayWay from './components/payWay'
  import {getOrderDetail} from './service'
  import { Toast } from 'vant'
  export default {
    components: {
      PayWay
    },
    data () {
      return {
        orderDetail: null,
        submitOrder: '',
        myOrders: '',
        remainTime: 1,
        dialogVisible: false
      }
    },
    mounted () {
      let {orderNo} = this.$route.query
      this.init(orderNo)
      // this.submitOrder = this.$store.state.orderList.submitOrder
      // this.myOrders = this.$store.state.orderList.myOrders
    },
    methods: {
      init(orderNo) {
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        getOrderDetail({customerGuid, orderNo}).then(res => {
          this.orderDetail = res
          // this.$ref.getRemainTime()
        })
      },
      /**
       * 获取剩余时间
       * @param val 剩余时间
       */
      getRemainTime (val) {
        this.remainTime = val
      },
      /**
       * 确认支付
       * @returns {boolean}
       */
      comfirmPay () {
        if (this.remainTime <= 0) {
          return
        }
        // 获取我的订单,并将提交的订单加入到我的订单中
        var index = 0
        for (var i = 0; i < this.myOrders.length; i++) {
          if (this.myOrders[i].orderNo === this.submitOrder.orderNo) {
            index = i
            break
          }
        }
        this.myOrders[index].orderStatus = 'PS'
        this.myOrders[index].orderStatusName = '支付成功'
        this.$store.commit('MY_ORDERS', {isUpdate: false, allOrders: this.myOrders})
        Toast({
          message: '订单支付成功'
        })
        setTimeout(() => {
          this.$router.replace({name: '我的订单', query: {type: 'ALL'}})
        }, 1500)
      }
    }
  }
</script>

<style lang="less" scoped>
  #pay {
    background-color: #f2f2f2;
    overflow: hidden;
    width: 100%;
    .content-body {
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .enable {
      background-color: #ff3b00;
      cursor: pointer;
    }
    .disable {
      background-color: #c4c4c4;
      cursor: not-allowed;
    }
    .footer {
      position: fixed;
      bottom: 0;
      display: flex;
      box-shadow: 0 0 5px 0 hsla(0, 6%, 50%, .23);
      align-items: center;
      height: 50px;
      max-width: 640px;
      width: 100%;
      > div {
        display: flex;
        margin: auto;
        color: #fff;
        align-items: baseline;
        white-space: nowrap;
        span:nth-of-type(1) {
          font-size: 1.35rem;
        }
        span:nth-of-type(2) {
          font-size: 1.4rem;
          padding: 0 2%;
        }
        span:nth-of-type(3) {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media screen and (min-width: 400px) {
    #pay {
      .footer {
        height: 60px;
        > div {
          span:nth-of-type(1) {
            font-size: 1.55rem;
          }
          span:nth-of-type(2) {
            font-size: 1.6rem;
          }
          span:nth-of-type(3) {
            font-size: 1.7rem;
          }
        }
      }
    }
  }
</style>
