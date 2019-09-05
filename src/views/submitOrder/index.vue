<template>
  <div id="submitOrder">
    <div>
      <Header>
        <span slot="title">提交订单</span>
      </Header>
      <div class="content-body">
        <Address/>
        <OrderList/>
        <Coupon :totalPrice="totalPrice"/>
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
            <p class="subValue">+ ¥4.00</p>
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
  import OrderList from './components/orderList.vue'
  import Coupon from './components/coupon'
  import {Toast} from 'vant'
  import {submitOrder} from './service'

  export default {
    components: {
      OrderList,
      Address,
      Header,
      Coupon
    },
    data () {
      return {
        totalPrice: 0,
        bounce: ''
      }
    },
    mounted () {
      this.getTotalPrice()
    },
    computed: {
      getFinalPrice () {
        let {couponSelected} = this.$store.state.orderList
        let couponAmount = 0
        if (couponSelected) {
          couponAmount = couponSelected.amount
        }
        return (parseFloat(this.totalPrice) + 4 - couponAmount).toFixed(2)
      }
    },
    methods: {
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
        this.totalPrice = Number(money.toFixed(2))
      },
      /**
       * 提交订单
       */
      submitOrder () {
        let {
          car: {
            carList: orderProductInfos
          },
          orderList: {
            addressSelected,
            couponSelected
          },
          login: {
            user: {customerGuid}
          }
        } = this.$store.state
        if (!customerGuid) {
          return false
        }
        if (!addressSelected) {
          Toast('请选择地址')
          return false
        }
        let params = {
          customerGuid,
          orderProductInfos, // 订单列表
          orderStatusCode: 'OS', // OS:下单成功；OF:下单失败；PS：支付成功；PF：支付失败
          addressId: addressSelected._id,
          payment: this.getFinalPrice // 最终价格
        }
        if (couponSelected) {
          params.couponId = couponSelected._id
        }
        submitOrder(params).then(res => {
          if (res) {
            Toast.success('提交订单成功')
            setTimeout(() => {
              // this.router.push({name: '支付订单', query: {orderNo: res}})
            }, 2000)
          }
        }).catch(err => {
          Toast.fail('提交订单失败')
          console.log(err)
        })
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
