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
          <div v-if="parseInt(activeNavBar) === 0" class="navbarBody">
            <div v-if="usefulCoupon">
              <div v-for="(item,i) in usefulCoupon" :key="i" style="display: table;margin: 1.9vh auto" @click="checkCoupon(item)">
                <div style="display:table-cell;vertical-align:middle;padding-right: 2vw">
                  <i class="icon iconfont icon-round" style="font-size: 6vw;"
                     v-if="item.Id !== checkedItem.Id"></i>
                  <i class="icon iconfont icon-roundcheck" style="font-size: 6vw;color: #ff2b1c;"
                     v-if="item.Id === checkedItem.Id"></i>
                </div>
                <div style="display: table-cell;vertical-align:middle;">
                  <v-coupon-card :coupon="item"></v-coupon-card>
                </div>
              </div>
            </div>
          </div>
          <div v-if="parseInt(activeNavBar) === 1">
            <div v-for="(item,i) in unUsefulCoupon" :key="i" style="display: table;margin: 1.9vh auto">
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
        this.openModal = false
      },
      clickedNavBar (val) {
        this.activeNavBar = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .aspectration {
    position: relative;
  }

  .aspectration:after {
    content: "";
    display: block;
    padding-top: 56.25%;
  }

  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

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
      .navbarBody {
        height: 46vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
          display: none
        }
      }
    }
    .comfirm {
      position: absolute;
      bottom: 3vh;
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

</style>
