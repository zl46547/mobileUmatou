<template>
  <div class="content">
    <div>
      <v-header>
        <h1 slot="title">提交订单</h1>
      </v-header>
      <div class="content-body">
        <v-address></v-address>
        <div class="pannelMargin">
          <v-pay-way></v-pay-way>
        </div>
        <v-order-list></v-order-list>
        <div class="pannelMargin">
          <v-ticket></v-ticket>
          <v-bounce></v-bounce>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import Address from '@/components/submitOrder/address.vue'
  import OrderList from '@/components/submitOrder/orderList.vue'
  import PayWay from '@/components/submitOrder/payWay.vue'
  import Ticket from '@/components/submitOrder/ticket.vue'
  import Bounce from '@/components/submitOrder/bounce.vue'

  export default {
    components: {
      'VHeader': Header,
      'VAddress': Address,
      'VOrderList': OrderList,
      'VPayWay': PayWay,
      'VTicket': Ticket,
      'VBounce': Bounce
    },
    data () {
      return {
      }
    },
    mounted () {
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
      height: 80vh;
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .pannelMargin{
        margin: 2vh 0;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      h1 {
        font-size: 30px;
      }
    }
  }
</style>
