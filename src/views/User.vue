<template>
  <div>
    <div class="content">
      <div style="position: relative">
        <img v-if="hour>17 || (hour>=0 && hour<6)" src="../assets/images/user_bg_night.png" style="width: 100vw;"/>
        <img src="../assets/images/user_bg_day.png" v-else style="width: 100vw;"/>
        <div
          style="width: 100vw;margin: 0 auto;text-align: center;position: absolute;top: 50%;transform: translate(0,-50%);color: #fff;">
          <div>
            <img src="../assets/images/face.png" style="border-radius: 50%;width: 15vw;height: 15vw;"/>
          </div>
          <p style="margin: 1vh 0 ">15606130737</p>
          <div style="vertical-align: middle;height: 3vh;line-height: 3vh;">
            <img src="../assets/images/vip.png" style="width: 5vw;"/>
            <span style="font-size: 1.2vw;">出入码头</span>
          </div>
        </div>
      </div>
      <div class="section-two">
        <div class="orderService" v-for="item in orderServiceList" :key="item.name">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="section-three" style="margin: 2vh 0;display: flex;align-items: center;justify-content: space-around">
        <div v-for="item in myAccountList" :key="item.id">
            <p>{{item.value}}</p>
            <p>{{item.name}}</p>
        </div>
      </div>
      <!--<div class="section-four"></div>-->
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import Footer from '@/common/_footer.vue'

  export default {
    components: {
      'VHeader': Header,
      'VFooter': Footer
    },
    mounted () {
      this.hour = new Date().getHours()
    },
    data () {
      return {
        hour: 0,
        orderServiceList: [
          {
            name: '全部订单',
            icon: 'icon-single'
          },
          {
            name: '待发货',
            icon: 'icon-icon2'
          },
          {
            name: '待收货',
            icon: 'icon-deliver'
          },
          {
            name: '待评价',
            icon: 'icon-daipingjia20'
          },
          {
            name: '轻松退',
            icon: 'icon-tianmaojisutuikuan'
          }
        ],
        myAccountList: [
          {
            id: '0',
            name: '码头币',
            value: '520'
          },
          {
            id: '1',
            name: '积分',
            value: '1314'
          },
          {
            id: '2',
            name: '码头花呗',
            value: '20000'
          },
          {
            id: '3',
            name: '优惠券',
            value: '2'
          },
        ]
      }
    },
    beforeCreate () {}
  }
</script>

<style scoped>
  .section-two {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2vh 0 1vh 0
  }

  .section-two .orderService {
    text-align: center;
  }

  .section-two .orderService .iconfont {
    font-size: 7vw;
  }

  .section-two .orderService p {
    margin-top: 1vh;
    font-size: 2vw;
  }
</style>
