<template>
  <div class="content">
    <div>
      <v-header>
        <h1 slot="title">支付订单</h1>
      </v-header>
      <div class="content-body">
        <v-pay-way></v-pay-way>
      </div>
      <div class="footer">
        <div>
          <span>确认支付</span>
          <span>¥</span>
          <span>34.90</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PayWay from '@/components/pay/payWay.vue'
  import Header from '@/common/_header.vue'

  export default {
    components: {
      'VPayWay': PayWay,
      'VHeader': Header
    },
    data () {
      return {}
    },
    mounted () {
      var a = this.$store.state.orderList.submitOrder
      console.log(JSON.stringify(a))
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .content {
    background-color: #f2f2f2;
    width: 100%;
    h1 {
      font-size: 5vw;
    }
    .content-body {
      height: 82vh;
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .footer {
      position: fixed;
      bottom: 0;
      display: flex;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .23);
      align-items: center;
      height: 9vh;
      background-color: #ff3b00;
      width: 100vw;
      cursor: pointer;
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

  @media screen and (min-width: 768px) {
    .content {
      h1 {
        font-size: 28px;
      }
      .footer {
        width: 768px;
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
