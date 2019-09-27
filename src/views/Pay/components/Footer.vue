<template>
  <div class="footer" @click="confirmPay()">
    <div v-if="$store.state.order.remainTime>0"
         class="footer-btn enable">
      <span>确认支付</span>
    </div>
    <div v-else class="footer-btn disable">
      <span>订单已过期</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { payOrder } from '../service'

  export default {
    methods: {
      /**
       * 确认支付
       * @returns {boolean}
       */
      confirmPay () {
        if (this.$store.state.order.remainTime <= 0) {
          return false
        }
        let {
          order: {payWay}
        } = this.$store.state
        let {orderNo} = this.$route.query
        let params = {payWay, orderNo}
        payOrder(params).then(res => {
          if (res) {
            setTimeout(() => {
              this.$router.replace({name: '我的订单'})
            }, 1500)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgb(221, 221, 221);
    width: 100%;
    .footer-btn {
      height: 100rem/@baseFontSize;
      line-height: 100rem/@baseFontSize;
      color: #fff;
      text-align: center;
      font-size: 30rem/@baseFontSize;
    }
    .enable {
      background-color: @themeColor;
      cursor: pointer;
    }
    .disable {
      background-color: #c4c4c4;
      cursor: not-allowed;
    }
  }
</style>
