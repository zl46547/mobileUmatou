<template>
  <div id="orderManage">
    <div class="orderService" v-for="item in orderServiceList" :key="item.name"
         @click="toMyOrders(item)">
      <i class="iconfont" :class="item.icon"></i>
      <p>{{item.name}}</p>
      <div class="bage" v-if="item.num>0">{{item.num}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    components: {},
    mounted () {
      let vm = this
      vm.getOrderServiceNum()
    },
    data () {
      return {
        orderServiceList: [
          {
            name: '全部订单',
            type: 'ALL',
            icon: 'icon-orderList',
            num: 0
          },
          {
            name: '待付款',
            icon: 'icon-pay',
            type: 'OS',
            num: 0
          },
          {
            name: '待收货',
            icon: 'icon-daishouhuo',
            type: 'PS',
            num: 0
          },
          {
            name: '待评价',
            type: 'FS',
            icon: 'icon-rate',
            num: 0
          },
          {
            name: '轻松退',
            icon: 'icon-refund',
            type: 'RF',
            num: 0
          }
        ]
      }
    },
    methods: {
      /**
       * 获取订单数量
       */
      getOrderServiceNum () {
        let vm = this
        let allOrders = vm.$store.state.orderList.myOrders
        let allNum = allOrders.length
        if (allNum > 0) {
          let ps = allOrders.where(function (t) {
            return t.orderStatus === 'PS'
          })
          let psNum = ps.length
          let fs = allOrders.where(function (t) {
            return t.orderStatus === 'FS'
          })
          let fsNum = fs.length
          let rf = allOrders.where(function (t) {
            return t.orderStatus === 'FS'
          })
          let rfNum = rf.length
          let os = allOrders.where(function (t) {
            return t.orderStatus === 'OS'
          })
          vm.orderServiceList[1].num = os.length
          vm.orderServiceList[2].num = psNum
          vm.orderServiceList[3].num = fsNum
          vm.orderServiceList[4].num = rfNum
        }
      },
      /**
       * 跳转到我的订单
       * @param val 订单类型（ALL：全部订单；OS：下单成功，待付款；PS：支付成功，待收货；FS：交易完成，待评价；RF：退货中）
       */
      toMyOrders (val) {
        let vm = this
        let {type} = val
        vm.$router.push({name: '我的订单', query: {type}})
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
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    .iconfont {
      font-family: "iconfont";
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-daishouhuo:before {
      content: "\e601";
    }

    .icon-rate:before {
      content: "\e63f";
    }

    .icon-pay:before {
      content: "\e668";
    }

    .icon-orderList:before {
      content: "\e60e";
    }

    .icon-refund:before {
      content: "\e608";
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
