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
          <v-menu-select style="margin-top: 8vh" @menu-selected="clickedNavBar" :menuItems="navBarList"
                         :selected="activeNavBar" class="menuSelect"></v-menu-select>
          <!--<v-nav-bar @clicked-nav-bar="clickedNavBar" :nav_bar_list="navBarList"></v-nav-bar>-->
          <!-- 可使用的优惠券 -->
          <div v-if="parseInt(activeNavBar) === 1" class="navbarBody-one">
            <div class="usefulCoupon" v-for="(item,i) in usefulCoupon" :key="i" @click="checkCoupon(item)"
                 v-if="usefulCoupon">
              <div class="checkbox">
                <i class="icon iconfont icon-round" v-if="item.Id !== checkedItem.Id"></i>
                <i class="icon iconfont icon-roundcheck" v-if="item.Id === checkedItem.Id"></i>
              </div>
              <div class="couponCard">
                <v-coupon-card :coupon="item"></v-coupon-card>
              </div>
            </div>
          </div>
          <div v-if="parseInt(activeNavBar) === 1" class="comfirm" @click="comfirm">
            <p>确定</p>
          </div>
          <!-- 不可使用的优惠券 -->
          <div v-if="parseInt(activeNavBar) === 0" class="navbarBody-two">
            <div v-for="(item,i) in unUsefulCoupon" :key="i" v-if="unUsefulCoupon">
              <v-coupon-card :coupon="item"></v-coupon-card>
            </div>
          </div>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/common/_modal.vue'
  import MenuSelect from '@/common/_menuSelect.vue'
  import CouponCard from '@/components/submitOrder/couponCard.vue'

  export default {
    data () {
      return {
        openModal: false,
        activeNavBar: 1,
        usefulCoupon: [],
        unUsefulCoupon: [],
        checkedItem: '', // 选中的优惠券
        comfirmSelectedItem: '', // 确认选中的优惠券
        navBarList: [
          {
            name: '可用优惠券',
            label: 1
          },
          {
            name: '不可用优惠券',
            label: 0
          }
        ]
      }
    },
    components: {
      'VModal': Modal,
      'VMenuSelect': MenuSelect,
      'VCouponCard': CouponCard
    },
    computed: {},
    mounted () {
      this.getCouponData()
    },
    methods: {
      /**
       * 设置默认勾选的优惠券
       */
      initCheckCoupon () {
        var vm = this
        if (vm.usefulCoupon.length > 0) {
          // 获取最大的优惠券
          var maxAmount = vm.usefulCoupon.max(function (t) {
            return t.Amount
          })
          this.checkedItem = vm.usefulCoupon.where(function (t) {
            return t.Amount === maxAmount
          })[0]
        }
      },
      /**
       * 勾选优惠券
       * @param val
       */
      checkCoupon (val) {
        this.checkedItem = val
      },
      /**
       * 获取订单总金额
       * @returns {number}
       */
      getTotalAmmount () {
        var submitOrderList = this.$store.state.car.selectedCarList
        var money = 0
        if (submitOrderList.length > 0) {
          submitOrderList.forEach(function (e) {
            money += e.totalMoney
          })
        }
        return money.toFixed(2)
      },
      /**
       * 获取优惠券列表
       */
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
            vm.usefulCoupon = usefulCoupon
            vm.unUsefulCoupon = unUsefulCoupon
            this.initCheckCoupon()
            this.comfirm()
          }
        }).catch((error) => {
          console.log(error)
        })
      },
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
       * 确认按钮事件
       */
      comfirm () {
        if (this.checkedItem === '') {
          this.comfirmSelectedItem = {Description: '无可用优惠券'}
        } else {
          this.comfirmSelectedItem = this.checkedItem
        }
        this.$emit('comfirm-selected-item', this.comfirmSelectedItem)
        this.openModal = false
      },
      /**
       * navbar切换事件
       * @param val
       */
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
      font-size: 1.4rem;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .bounceSelected {
        font-weight: bold;
        font-size: 1.5rem;
      }
      .iconfont {
        cursor: pointer;
        font-size: 1.5rem;
      }
    }
    .modalContent {
      .navbarBody-one {
        margin-top: 60px;
        height: calc(62vh - 60px - 60px); // 60px为navbar切换的高度，60px为确认按钮的高度+margin
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
              font-size: 1.6rem;
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
      .comfirm {
        cursor: pointer;
        width: 60vw;
        height: 40px;
        background-color: #ff2b1c;
        display: flex;
        margin: 10px auto;
        border-radius: 90px;
        p {
          margin: auto;
          color: #fff;
        }
      }
      .navbarBody-two {
        margin-top: 60px;
        height: calc(62vh - 60px - 10px); // 60px为navbar切换的高度，10px为距底部的距离
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
  }

  @media screen and (min-width: 640px) {
    /*.bounce {*/
      /*padding: 20px 25px;*/
      /*p {*/
        /*font-size: 1.6rem;*/
        /*margin-bottom: 15px;*/
      /*}*/
      /*> div {*/
        /*.bounceSelected {*/
          /*font-size: 1.7rem;*/
        /*}*/
        /*.iconfont {*/
          /*font-size: 1.7rem;*/
        /*}*/
      /*}*/
      /*.modalContent {*/
        /*.navbarBody-one {*/
          /*height: 250px;*/
          /*.usefulCoupon {*/
            /*margin: 15px auto;*/
            /*.checkbox {*/
              /*padding-right: 10px;*/
              /*.iconfont {*/
                /*font-size: 1.8rem;*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
        /*.navbarBody-two {*/
          /*height: 250px;*/
          /*> div {*/
            /*margin: 15px auto;*/
          /*}*/
        /*}*/
      /*}*/
      /*.comfirm {*/
        /*bottom: 20px;*/
        /*width: 300px;*/
        /*height: 50px;*/
      /*}*/
    /*}*/
    .bounce {
      padding: 20px 25px;;
      p {
        font-size: 1.6rem;
      }
      > div {
        .bounceSelected {
          font-size: 1.7rem;
        }
        .iconfont {
          font-size: 1.7rem;
        }
      }
      .modalContent {
        .navbarBody-one {
          .usefulCoupon {
            .checkbox {
              padding-right: 10px;
              .iconfont {
                font-size: 1.8rem;
              }
            }
          }
        }
        .comfirm {
          width: 200px;
        }
      }
    }
  }
</style>
