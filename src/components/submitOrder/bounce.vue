<template>
  <div class="bounce">
    <p>优惠券</p>
    <div>
      <div class="bounceSelected">{{comfirmSelectedItem.Description}}</div>
      <i class="iconfont icon-more" @click="showModal()"></i>
    </div>
    <v-modal v-if="openModal" @close-modal="closeMoadl">
      <span slot="title">优惠券</span>
      <div slot="content">
        <div class="modalContent">
          <v-nav-bar @clicked-nav-bar="clickedNavBar" :nav_bar_list="navBarList"></v-nav-bar>
          <div v-if="parseInt(activeNavBar) === 0" class="navbarBody-one">
            <!-- 可使用的优惠券 -->
            <div v-if="usefulCoupon">
              <div class="usefulCoupon" v-for="(item,i) in usefulCoupon" :key="i" @click="checkCoupon(item)">
                <div class="checkbox">
                  <i class="icon iconfont icon-round" v-if="item.Id !== checkedItem.Id"></i>
                  <i class="icon iconfont icon-roundcheck" v-if="item.Id === checkedItem.Id"></i>
                </div>
                <div class="couponCard">
                  <v-coupon-card :coupon="item"></v-coupon-card>
                </div>
              </div>
            </div>
          </div>
          <div v-if="parseInt(activeNavBar) === 1" class="navbarBody-two">
            <div v-for="(item,i) in unUsefulCoupon" :key="i">
              <!-- 不可使用的优惠券 -->
              <div v-if="unUsefulCoupon">
                <v-coupon-card :coupon="item"></v-coupon-card>
              </div>
            </div>
          </div>
        </div>
        <div class="comfirm" @click="comfirm">
          <p>确定</p>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/common/_modal.vue'
  import NavBar from '@/components/submitOrder/navBar.vue'
  import CouponCard from '@/components/submitOrder/couponCard.vue'

  export default {
    data () {
      return {
        openModal: false,
        activeNavBar: 0,
        usefulCoupon: [],
        unUsefulCoupon: [],
        checkedItem: '', // 选中的优惠券
        comfirmSelectedItem: '', // 确认选中的优惠券
        navBarList: []
      }
    },
    components: {
      'VModal': Modal,
      'VNavBar': NavBar,
      'VCouponCard': CouponCard
    },
    computed: {},
    mounted () {
      this.getCouponData()
    },
    methods: {
      /**
       * 初始化NavBarList
       */
      initNavBarList () {
        var navBarList = [
          {
            name: '可用优惠券',
            num: this.usefulCoupon.length
          },
          {
            name: '不可用优惠券',
            num: this.unUsefulCoupon.length
          }
        ]
        this.navBarList = navBarList
      },
      /**
       * 设置默认勾选的优惠券
       */
      initCheckCoupon () {
        if (this.usefulCoupon.length > 0) {
          this.checkedItem = this.usefulCoupon[0]
        }
      },
      checkCoupon (val) {
        this.checkedItem = val
      },
      getTotalAmmount () {
        var submitOrderList = this.$store.state.car.selectedCarList
        var money = 0
        if (submitOrderList.length > 0) {
          submitOrderList.forEach(function (e) {
            money += e.totalMoney
          })
        }
        return parseInt(money * 100) / 100
      },
      getCouponData () {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/user/couponList.json'
        }).then((res) => {
          var totalAmmount = this.getTotalAmmount()
          var couponList = res.data.Data.CouponList
          var usefulCoupon = []
          var unUsefulCoupon = []
          if (couponList.length > 0) {
            couponList.forEach(function (e) {
              if (totalAmmount > e.LimitMinMoney) {
                e.backgroundColor = '#D24161'
                usefulCoupon.push(e)
              } else {
                e.backgroundColor = '#c1c1c1'
                unUsefulCoupon.push(e)
              }
            })
            this.usefulCoupon = usefulCoupon
            this.unUsefulCoupon = unUsefulCoupon
            this.initCheckCoupon()
            this.initNavBarList()
            this.comfirm()
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      showModal () {
        this.openModal = true
      },
      closeMoadl (val) {
        this.openModal = val
      },
      comfirm () {
        if (this.checkedItem === '') {
          this.comfirmSelectedItem = {Description: '无可用优惠券'}
        } else {
          this.comfirmSelectedItem = this.checkedItem
        }
        this.$emit('comfirm-selected-item', this.comfirmSelectedItem)
        this.openModal = false
      },
      clickedNavBar (val) {
        this.activeNavBar = val
      }
    }
  }
</script>

<style lang="less" scoped>

  .bounce {
    padding: 3vw;
    background-color: #fff;
    position: relative;
    p {
      font-size: 4vw;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .bounceSelected {
        font-weight: bold;
        font-size: 5vw;
      }
      .iconfont {
        cursor: pointer;
        font-size: 5vw;
      }
    }
    .modalContent {
      .navbarBody-one {
        height: 46vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
          display: none
        }
        .usefulCoupon {
          display: table;
          margin: 1.9vh auto;
          transform: translate(-3%);
          .checkbox {
            display: table-cell;
            vertical-align: middle;
            padding-right: 2vw;
            font-weight: bold;
            .iconfont {
              font-size: 6vw;
            }
            .icon-roundcheck {
              color: #ff2b1c;
            }
          }
          .couponCard {
            display: table-cell;
            vertical-align: middle;
          }
        }
      }
      .navbarBody-two {
        height: 46vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
          display: none
        }
        > div {
          display: table;
          margin: 1.9vh auto;
        }
      }
    }
    .comfirm {
      position: absolute;
      bottom: 2vh;
      left: 50%;
      transform: translate(-50%);
      cursor: pointer;
      width: 60vw;
      height: 7vh;
      background-color: #ff2b1c;
      display: flex;
      border-radius: 90px;
      align-self: flex-end;
      p {
        margin: auto;
        color: #fff;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .bounce {
      padding: 20px 25px;
      p {
        font-size: 24px;
        margin-bottom: 15px;
      }
      > div {
        .bounceSelected {
          font-size: 24px;
        }
        .iconfont {
          font-size: 24px;
        }
      }
      .modalContent {
        .navbarBody-one {
          height: 335px;
          .usefulCoupon {
            margin: 15px auto;
            .checkbox {
              padding-right: 10px;
              .iconfont {
                font-size: 30px;
              }
            }
          }
        }
        .navbarBody-two {
          height: 335px;
          > div {
            margin: 15px auto;
          }
        }
      }
      .comfirm {
        bottom: 20px;
        width: 300px;
        height: 50px;
      }
    }
  }
</style>
