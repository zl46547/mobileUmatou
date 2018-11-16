<template>
  <div id="bounce">
    <p>优惠券</p>
    <div>
      <div class="bounceSelected">{{checkedItem.Description}}</div>
      <span class="iconfont icon-more" @click="showModal()"></span>
    </div>
    <v-modal v-if="openModal" @close-modal="closeMoadl">
      <div slot="content">
        <v-bounce-content
          :usefulCoupon="usefulCoupon"
          :unUsefulCoupon="unUsefulCoupon"
          :checkedItem="checkedItem"
          @comfirm-selected-item="comfirmSelectedItem"
        ></v-bounce-content>
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/common/modal.vue'
  import BounceContent from './bounceContent.vue'
  import store from '@/vuex/store.js'
  export default {
    data () {
      return {
        openModal: false,
        usefulCoupon: [],
        unUsefulCoupon: [],
        checkedItem: '' // 选中的优惠券
      }
    },
    components: {
      'VModal': Modal,
      'VBounceContent': BounceContent
    },
    computed: {},
    mounted () {
      let vm = this
      vm.getCouponData()
    },
    methods: {
      /**
       * 显示对话框
       */
      showModal () {
        this.openModal = true
      },
      /**
       * 关闭对话框
       */
      closeMoadl (val) {
        this.openModal = val
      },
      /**
       * 确认选择的优惠券
       */
      comfirmSelectedItem(val) {
        let vm = this
        vm.checkedItem = val
        vm.openModal = false
        vm.$emit('comfirm-selected-item', val)
      },
      /**
       * 获取优惠券列表
       */
      getCouponData () {
        let vm = this
        let totalAmmount = this.getTotalAmmount()
        let couponList = []
        vm.$api({
          method: 'get',
          url: '/shihang/user/couponList.json'
        }).then((res) => {
          couponList = res.data.Data.CouponList
          let usefulCoupon = []
          let unUsefulCoupon = []
          if (couponList.length > 0) {
            couponList.forEach((e) => {
              if (totalAmmount > e.LimitMinMoney) {
                e.backgroundColor = '#D24161'
                usefulCoupon.push(e)
              } else {
                e.backgroundColor = '#c1c1c1'
                unUsefulCoupon.push(e)
              }
            })
            vm.usefulCoupon = usefulCoupon
            vm.unUsefulCoupon = unUsefulCoupon
            this.initCheckCoupon()
          }
        }).catch((error) => {
          console.error(error)
        })
      },
      /**
       * 获取订单总金额
       * @returns {number}
       */
      getTotalAmmount () {
        let submitOrderList = store.state.car.selectedCarList
        let money = 0
        if (submitOrderList.length > 0) {
          submitOrderList.forEach(function (e) {
            money = money + parseFloat(e.totalMoney)
          })
        }
        return money.toFixed(2)
      },
      /**
       * 设置默认勾选的优惠券
       */
      initCheckCoupon () {
        let vm = this
        if (vm.usefulCoupon.length > 0) {
          // 获取最大的优惠券
          let maxAmount = vm.usefulCoupon.max(function (t) {
            return t.Amount
          })
          vm.checkedItem = vm.usefulCoupon.where(function (t) {
            return t.Amount === maxAmount
          })[0]
        }
        if (this.checkedItem === '') {
          this.checkedItem = {Description: '无可用优惠券'}
        }
        vm.$emit('comfirm-selected-item', vm.checkedItem)
      }
    }
  }
</script>

<style lang="less" scoped>

  #bounce {
    padding: 15px 20px;
    background-color: #fff;
    position: relative;
    p {
      font-size: 1.3rem;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .bounceSelected {
        font-weight: bold;
        font-size: 1.3rem;
      }
      .iconfont {
        cursor: pointer;
        font-size: 1.3rem;
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
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-uncheck:before {
      content: "\e70f";
    }

    .icon-more:before {
      content: "\e675";
    }

    .icon-checked:before {
      content: "\e626";
    }
  }

  @media screen and (min-width: 400px) {
    #bounce {
      p {
        font-size: 1.5rem;
      }
      > div {
        .bounceSelected {
          font-size: 1.5rem;
        }
        .iconfont {
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
