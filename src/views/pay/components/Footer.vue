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
  import { Toast } from 'vant'
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
          login: {user: {customerGuid}},
          order: {payWay}
        } = this.$store.state
        let {orderNo} = this.$route.query
        if (!customerGuid) {
          return false
        }
        let params = {customerGuid, payWay, orderNo}
        payOrder(params).then(res => {
          Toast.success('订单支付成功')
          setTimeout(() => {
            this.$router.replace({name: '我的订单'})
          }, 1500)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-top: 1px solid rgb(221, 221, 221);
    width: 100%;
    max-width: 640px;
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
