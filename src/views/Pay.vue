<template>
  <div class="content">
    <div>
      <v-header :typeName="'用户页'">
        <h1 slot="title" >支付订单</h1>
      </v-header>
      <div class="content-body">
        <v-pay-way @remain-time="getRemainTime"></v-pay-way>
      </div>
    </div>
    <div class="footer" @click="showSupport()"
         :class="{'enable':parseInt(remainTime)>0,'disable':parseInt(remainTime)<=0}">
      <div v-if="parseInt(remainTime)>0">
        <span>确认支付</span>
        <span>¥</span>
        <span>{{submitOrder.finalPrice}}</span>
      </div>
      <div v-if="parseInt(remainTime)<=0">
        <span>订单已过期</span>
      </div>
    </div>
    <v-support :modal="dialogVisible" @close-modal="closeModal"></v-support>
  </div>
</template>

<script type="text/ecmascript-6">
  import PayWay from '@/components/pay/payWay.vue'
  import Support from '@/components/pay/support.vue'
  import Header from '@/common/_header.vue'

  export default {
    components: {
      'VPayWay': PayWay,
      'VHeader': Header,
      'VSupport': Support
    },
    data () {
      return {
        submitOrder: '',
        myOrders: '',
        remainTime: 1,
        dialogVisible: false
      }
    },
    mounted () {
      this.submitOrder = this.$store.state.orderList.submitOrder
      this.myOrders = this.$store.state.orderList.myOrders
    },
    methods: {
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
        // 获取我的订单,并将提交的订单加入到我的订单中
        var index = 0
        for (var i = 0; i < this.myOrders.length; i++) {
          if (this.myOrders[i].orderNo === this.submitOrder.orderNo) {
            index = i
            break
          }
        }
        this.myOrders[index].orderStatus = 'PS'
        this.$notify({
          title: '交易完成',
          message: '订单支付成功',
          type: 'success',
          duration: 1000
        })
        var router = this.$router
        setTimeout(function () {
          router.replace({name: '我的订单', params: {type: 'PS'}})
        }, 1000)
      },
      /**
       * 显示赞赏码对话框
       * @returns {boolean}
       */
      showSupport () {
        if (parseInt(this.remainTime) <= 0) {
          return false
        }
        this.dialogVisible = true
      },
      /**
       * 关闭赞赏码对话框
       * @param val
       */
      closeModal (val) {
        this.dialogVisible = false
        this.comfirmPay()
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    background-color: #f2f2f2;
    overflow: hidden;
    width: 100%;
    h1 {
      font-size: 5vw;
    }
    .content-body {
      height: 84vh;
      margin-top: 8vh;
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
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .23);
      align-items: center;
      height: 8vh;
      width: 100vw;
      > div {
        display: flex;
        margin: auto;
        color: #fff;
        align-items: baseline;
        span:nth-of-type(1) {
          font-size: 5vw;
        }
        span:nth-of-type(2) {
          font-size: 8vw;
          padding: 0 2vw;
        }
        span:nth-of-type(3) {
          font-size: 8vw;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .content {
      h1 {
        font-size: 28px;
      }
      .footer {
        width: 640px;
        > div {
          span:nth-of-type(1) {
            font-size: 22px;
          }
          span:nth-of-type(2) {
            font-size: 28px;
            padding: 0 12px;
          }
          span:nth-of-type(3) {
            font-size: 32px;
          }
        }
      }
    }
  }
</style>
