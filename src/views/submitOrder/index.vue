<template>
  <div id="submitOrder">
    <div>
      <v-header>
        <span slot="title">提交订单</span>
      </v-header>
      <div class="content-body">
        <Address/>
        <OrderList/>
        <v-pay-way @pay-way-selected="payWaySelected"></v-pay-way>
        <!--<v-ticket @selected-ticket="selectedTicket"></v-ticket>-->
        <!--<v-bounce @comfirm-selected-item="selectedBounce"></v-bounce>-->
        <div class="pannelMargin ammountCount">
          <div>
            <p class="subtitle">商品金额</p>
            <p class="subValue">¥{{totalPrice}}</p>
          </div>
          <div v-if="bounce.Amount">
            <p class="subtitle">优惠</p>
            <p class="subValue">- ¥{{bounce.Amount}}</p>
          </div>
          <div>
            <p class="subtitle">运费</p>
            <p class="subValue">+ ¥10.00</p>
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
  import Header from '@/common/navigator.vue'
  import Address from './components/address.vue'
  import PayWay from './components/payWay.vue'
  import OrderList from './components/orderList.vue'
  import Ticket from './components/ticket.vue'
  import Bounce from './components/bounce.vue'
  import moment from 'moment'
  import * as actionTypes from '../../vuex/types'
  export default {
    components: {
      OrderList,
      Address,
      'VPayWay': PayWay,
      'VTicket': Ticket,
      'VHeader': Header,
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
        return (parseFloat(this.totalPrice) + 10 - (parseFloat(this.bounce.Amount) || 0)).toFixed(2)
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
      /**
       * 获取订单总金额
       */
      getTotalPrice () {
        let carList = this.$store.state.car.carList
        if (carList.length <= 0) {
          this.$router.replace('/car')
        }
        let money = 0
        carList.forEach(item => {
          money += item.productInfo.periodMoney * item.quantity
        })
        this.totalPrice = money.toFixed(2)
      },
      /**
       * 提交订单
       */
      submitOrder () {
        var vm = this
        var params = {
          orderList: vm.$store.state.car.selectedCarList, // 订单列表
          finalPrice: this.getFinalPrice, // 最终价格
          submitTime: moment().format('YYYY年MM月DD日 HH:mm:ss'), // 订单提交时间
          deadTime: moment().add(1, 'minute')._d.getTime(), // 截止日期
          bounce: this.bounce.Amount, // 优惠券
          payWay: this.payWay, // 支付方式
          ticket: this.ticket, // 发票
          orderNo: `UMT${new Date().getTime()}`, // 订单号
          orderStatus: 'OS', // OS:下单成功；OF:下单失败；PS：支付成功；PF：支付失败
          orderStatusName: '下单成功'
        }
        vm.$store.commit(actionTypes.SUBMIT_ORDER, params)
        // 从购物车中删除已经提交的订单
        vm.delCarList(params.orderList)
        vm.$router.replace({name: '支付订单'})
      },
      /**
       * 删除已下单成功的商品
       * @param orderList 支付成功的商品
       */
      delCarList (orderList) {
        var vm = this
        if (orderList.length > 0) {
          var submitOrderIdList = orderList.select(function (t) {
            return t.ProductId
          })
          var carlist = vm.$store.state.car.carList
          submitOrderIdList.forEach(function (e) {
            carlist.removeAll(function (t) {
              return parseInt(t.ProductId) === parseInt(e)
            })
          })
          vm.$store.commit(actionTypes.CAR_LIST, carlist)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #submitOrder {
    background-color: #f2f2f2;
    overflow: hidden;
    width: 100%;
    .content-body {
      margin-top: 45px;
      height: calc(100vh - 95px);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .pannelMargin {
        margin-top: 15px;
        background-color: #fff;
        box-shadow: 0 2px 6px #dedede;
      }
      .ammountCount {
        padding: 10px 15px;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.3rem;
          margin: 1vh 0;
          .subtitle {
            font-size: 1.3rem;
          }
          .subValue {
            font-size: 1.4rem;
            color: #f05423;
          }
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      display: flex;
      box-shadow: 0 0 10px 0 hsla(0, 6%, 50%, .23);
      align-items: center;
      height: 50px;
      background-color: #fff;
      max-width:640px;
      width: 100%;
      > div:nth-of-type(1) {
        width: 65%;
        margin-left: 5%;
        font-size: 1.4rem;
        color: #f05423;
        display: flex;
        align-items: baseline;
        sub {
          font-size: 1.4rem;
          padding-right: 5px;
        }
      }
      > div:nth-of-type(2) {
        cursor: pointer;
        height: 50px;
        display: flex;
        width: 35%;
        color: #fff;
        background-color: rgb(255, 92, 34);
        .submit-btn {
          margin: auto;
          font-size: 1.3rem;
        }
      }
    }
  }
  @media screen and (min-width: 400px) {
    #submitOrder {
      .content-body {
        margin-top: 50px;
        height: calc(100vh - 100px);
        .ammountCount {
          padding: 10px 25px;
          > div {
            font-size: 1.5rem;
            .subtitle {
              font-size: 1.5rem;
            }
            .subValue {
              font-size: 1.6rem;
            }
          }
        }
      }
      .footer {
        > div:nth-of-type(1) {
          font-size: 1.6rem;
          sub {
            font-size: 1.6rem;
          }
        }
        > div:nth-of-type(2) {
          .submit-btn {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
</style>
