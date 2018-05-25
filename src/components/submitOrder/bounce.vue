<template>
  <div class="bounce">
    <p>优惠券</p>
    <div>
      <div class="bounceSelected">aaa</div>
      <i class="iconfont icon-more" @click="showModal()"></i>
    </div>
    <v-modal v-if="openModal" @close-modal="closeMoadl">
      <span slot="title">优惠券</span>
      <div slot="content">
        <div class="modalContent">
          <v-nav-bar @clicked-nav-bar="clickedNavBar"></v-nav-bar>
          <div v-if="parseInt(activeNavBar) === 0" class="navbarBody">
            <div v-if="couponList">
              <div v-for="(item,i) in couponList" :key="i" style="display: table;margin: 1.9vh auto">
                <div style="display:table-cell;vertical-align:middle;padding-right: 2vw">
                  <i class="icon iconfont icon-round" style="font-size: 6vw;" v-if="!checkStatus"></i>
                  <i class="icon iconfont icon-roundcheck" style="font-size: 6vw;color: #ff2b1c;" v-if="checkStatus"></i>
                </div>
                <div style="display: table-cell;vertical-align:middle;">
                  <v-coupon-card :coupon="item"></v-coupon-card>
                </div>
              </div>
            </div>
          </div>
          <div v-if="parseInt(activeNavBar) === 1">
            1
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
        couponList: [],
        checkStatus: false
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
      getCouponData () {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/user/couponList.json'
        }).then((res) => {
          vm.couponList = res.data.Data.CouponList
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
      .navbarBody{
        height:46vh;
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
