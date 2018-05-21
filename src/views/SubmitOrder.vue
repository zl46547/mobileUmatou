<template>
  <div class="content">
    <div>
      <v-header>
        <h1 slot="title">提交订单</h1>
      </v-header>
      <div class="content-body">
        <v-address></v-address>
        <v-pannel :selectObj="payWayObj"></v-pannel>
        <v-order-list></v-order-list>
        <v-pannel :selectObj="ticketObj"></v-pannel>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import Address from '@/components/submitOrder/address.vue'
  import OrderList from '@/components/submitOrder/orderList.vue'
  import Pannel from '@/components/submitOrder/pannel.vue'

  export default {
    components: {
      'VHeader': Header,
      'VAddress': Address,
      'VOrderList': OrderList,
      'VPannel': Pannel
    },
    data () {
      return {
        payWayObj: {
          title: '支付方式',
          selected: '在线支付',
          type: 'PW'
        },
        ticketObj: {
          title: '发票',
          selected: '普票',
          type: 'FP'
        }
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
