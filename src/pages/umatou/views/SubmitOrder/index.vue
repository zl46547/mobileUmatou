<template>
  <div id="submitOrder">
    <Navigator>
      <span slot="title">提交订单</span>
    </Navigator>
    <div class="content-body">
      <Address/>
      <OrderList/>
      <Coupon :totalPrice="totalPrice"/>
      <div class="form ammountCount">
        <div class="form-item van-hairline--bottom">
          <p class="sub-title">商品金额</p>
          <p class="sub-value">¥{{totalPrice}}</p>
        </div>
        <div class="form-item van-hairline--bottom"
             v-if="bounce.Amount"
        >
          <p class="sub-title">优惠</p>
          <p class="sub-value">- ¥{{bounce.Amount}}</p>
        </div>
        <div class="form-item">
          <p class="sub-title">运费</p>
          <p class="sub-value">+ ¥4.00</p>
        </div>
      </div>
    </div>
    <div class="footer van-hairline--top">
      <div class="final-price">
        <sub>¥</sub>
        <span>{{getFinalPrice}}</span>
      </div>
      <Button size="normal"
              :loading="loading"
              :disabled="loading"
              @click="submitOrder"
              loading-type="spinner"
      >
        提交订单
      </Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import Address from './components/Address'
  import OrderList from './components/OrderList'
  import Coupon from './components/Coupon'
  import { Toast, Button } from 'vant'
  import { submitOrder } from './service'

  export default {
    components: {
      Button,
      OrderList,
      Address,
      Navigator,
      Coupon
    },
    data () {
      return {
        totalPrice: 0,
        loading: false,
        bounce: ''
      }
    },
    created () {
      this.getTotalPrice()
    },
    computed: {
      getFinalPrice () {
        let {couponSelected} = this.$store.state.order
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
        let cartList = this.$store.state.cart.cartList
        if (cartList.length <= 0) {
          this.$router.replace('/cart')
        }
        let money = 0
        cartList.forEach(item => {
          money += item.productInfo.periodMoney * item.quantity
        })
        this.totalPrice = Number(money.toFixed(2))
      },
      /**
       * 提交订单
       */
      submitOrder () {
        let {
          cart: {
            cartList: orderProductInfos
          },
          order: {
            addressSelected,
            couponSelected
          }
        } = this.$store.state
        if (!addressSelected) {
          Toast('请选择地址')
          return false
        }
        let params = {
          orderProductInfos, // 订单列表
          orderStatusCode: 'OS', // OS:下单成功；OF:下单失败；PS：支付成功；PF：支付失败
          addressId: addressSelected._id,
          payment: this.getFinalPrice // 最终价格
        }
        if (couponSelected) {
          params.couponId = couponSelected._id
        }
        this.loading = true
        submitOrder(params).then(res => {
          if (res) {
            setTimeout(() => {
              this.$router.replace({name: '支付订单', query: {orderNo: res}})
            }, 2000)
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../less/variables";

  #submitOrder {
    height: 100%;
    overflow: hidden;
    .content-body {
      margin-top: 80rem/@baseFontSize;
      height: calc(100vh - 8.5rem);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .form {
        margin-top: 15rem/@baseFontSize;
        background-color: #fff;
        .form-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.3rem;
          padding: 20rem/@baseFontSize 25rem/@baseFontSize;
          .sub-title {
            width: 6rem;
            text-align: right;
            font-size: 1.3rem;
          }
          .sub-value {
            font-size: 1.4rem;
            color: #f05423;
          }
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      height: 90rem/@baseFontSize;
      background-color: #fff;
      width: 100%;
      .final-price {
        height: 100%;
        line-height: 90rem/@baseFontSize;
        width: 65%;
        margin-left: 5%;
        font-size: 1.8rem;
        color: #f05423;
        display: flex;
        align-items: baseline;
        sub {
          font-size: 1.4rem;
          margin-right: 10rem/@baseFontSize;
        }
      }
      .submit-btn {
        cursor: pointer;
        width: 35%;
        color: #fff;
        height: 100%;
        line-height: 90rem/@baseFontSize;
        text-align: center;
      }
    }
    .van-button--normal {
      flex: 1;
      font-size: 30rem/@baseFontSize;
      background-color: @red;
      height: 100%;
      color: #fff;
    }
    span.van-loading__spinner.van-loading__spinner--spinner {
      color: #fff !important;
    }
  }
</style>
