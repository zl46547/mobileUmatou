<template>
  <div id="submitOrder">
    <Header>
      <span slot="title">提交订单</span>
    </Header>
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
      <div class="submit-btn" @click="submitOrder">
        提交订单
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/navigator.vue'
  import Address from './components/address.vue'
  import OrderList from './components/orderList.vue'
  import Coupon from './components/coupon'
  import { Toast } from 'vant'
  import { submitOrder } from './service'

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
          order: {
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
              this.$router.replace({name: '支付订单', query: {orderNo: res}})
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
  @import "../../less/variables";

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
        background-color: @red;
        text-align: center;
        font-size: 1.3rem;
      }
    }
  }
</style>
