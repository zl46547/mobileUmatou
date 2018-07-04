<template>
  <div class="content">
    <div>
      <v-header>
        <h1 slot="title">提交订单</h1>
      </v-header>
      <div class="content-body">
        <v-address></v-address>
        <div class="pannelMargin">
          <v-pay-way @pay-way-selected="payWaySelected"></v-pay-way>
        </div>
        <v-order-list></v-order-list>
        <div class="pannelMargin">
          <v-ticket @selected-ticket="selectedTicket"></v-ticket>
          <v-bounce @comfirm-selected-item="selectedBounce"></v-bounce>
        </div>
        <div class="pannelMargin ammountCount">
          <div>
            <p class="subtitle">商品金额</p>
            <p class="subValue">¥{{totalPrice}}</p>
          </div>
          <div v-if="bounce.Amount">
            <p class="subtitle">优惠</p>
            <p class="subValue" style="color: #ff2b1c;">- ¥{{bounce.Amount}}</p>
          </div>
          <div>
            <p class="subtitle">运费</p>
            <p class="subValue" style="color: #ff2b1c;">+ ¥10.00</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div>
          <sub>¥</sub>{{getFinalPrice}}
        </div>
        <div @click="submitOrder">
          <div class="submit-btn">提交订单</div>
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
  import utils from '../util/common.js'

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
        totalPrice: 0,
        bounce: '', // 选择的优惠券
        payWay: '', // 选择的支付方式
        ticket: ''// 选择的发票
      }
    },
    mounted () {
      this.getTotalPrice()
    },
    computed: {
      getFinalPrice () {
        var finalPrice = (this.totalPrice + 10 - (this.bounce.Amount || 0)).toFixed(2)
        return finalPrice
      }
    },
    methods: {
      /**
       * 确认选择的发票
       **/
      selectedTicket (val) {
        this.ticket = val
      },
      /**
       * 确认选择的优惠券
       **/
      selectedBounce (val) {
        this.bounce = val
      },
      /**
       * 确认选择的支付方式
       **/
      payWaySelected (val) {
        this.payWay = val
      },
      getTotalPrice () {
        var checkedcarsList = this.$store.state.car.selectedCarList
        var money = 0
        checkedcarsList.forEach(function (e) {
          money += e.totalMoney
        })
        this.totalPrice = Math.round(money * 10) / 10
      },
      /**
       * 提交订单
       */
      submitOrder () {
        var params = {
          orderList: this.$store.state.car.selectedCarList, // 订单列表
          finalPrice: this.getFinalPrice, // 最终价格
          submitTime: utils.dateFormate(new Date(), 'yyyy-MM-dd HH:mm:ss'), // 订单提交时间
          deadTime: utils.timestampToTime(new Date().getTime() + 15 * 60 * 1000, 'yyyy-MM-dd HH:mm:ss'), // 截止日期
          bounce: this.bounce.Amount, // 优惠券
          payWay: this.payWay, // 支付方式
          ticket: this.ticket, // 发票
          orderNo: `UMT${new Date().getTime()}`, // 订单号
          orderStatus: 'OS' // OS:下单成功；OF:下单失败；PS：支付成功；PF：支付失败
        }
        this.$store.commit('SUBMIT_ORDER', params)
        // 从购物车中删除已经提交的订单
        this.delCarList(params.orderList)
        this.$router.push({name: '支付订单'})
      },
      /**
       * 删除已下单成功的商品
       * @param orderList 支付成功的商品
       */
      delCarList (orderList) {
        if (orderList.length > 0) {
          var submitOrderIdList = orderList.select(function (t) {
            return t.ProductId
          })
          var carlist = this.$store.state.car.carList
          submitOrderIdList.forEach(function (e) {
            carlist.removeAll(function (t) {
              return parseInt(t.ProductId) === parseInt(e)
            })
          })
          this.$store.commit('CAR_LIST', carlist)
        }
      }
    }
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
      .pannelMargin {
        margin: 2vh 0;
        background-color: #fff;
        box-shadow: 0 2px 6px #bfbfbf;
      }
      .ammountCount {
        padding: 2vh 3vw;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 4vw;
          margin: 1vh 0;
          .subtitle {
            font-size: 4vw;
          }
          .subValue {
            font-size: 4.5vw;
            font-weight: bold;
          }
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      display: flex;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .23);
      align-items: center;
      height: 9vh;
      background-color: #fff;
      > div:nth-of-type(1) {
        width: 65vw;
        margin-left: 5vw;
        font-size: 8vw;
        color: #ff3e5e;
        display: flex;
        align-items: baseline;
        sub {
          font-size: 6vw;
          padding-right: 5px;
        }
      }
      > div:nth-of-type(2) {
        cursor: pointer;
        height: 9vh;
        display: flex;
        width: 35vw;
        color: #fff;
        background-color: rgb(255, 92, 34);
        .submit-btn {
          margin: auto;
          font-size: 4vw;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      background-color: #f2f2f2;
      width: 768px;
      h1 {
        font-size: 28px;
      }
      .content-body {
        .pannelMargin {
          margin: 15px 0;
        }
        .ammountCount {
          padding: 15px 28px;
          > div {
            font-size: 20px;
            margin: 8px 0;
            .subtitle {
              font-size: 22px;
            }
            .subValue {
              font-size: 28px;
              font-weight: bold;
            }
          }
        }
      }
      .footer {
        > div:nth-of-type(1) {
          width: 570px;
          margin-left: 30px;
          font-size: 40px;
          sub {
            font-size: 30px;
          }
        }
        > div:nth-of-type(2) {
          width: 168px;
          .submit-btn {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
