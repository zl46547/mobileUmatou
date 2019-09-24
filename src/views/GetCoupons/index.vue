<template>
  <div id="get-coupons">
    <div class="content">
      <Button type="primary" @click="addCoupons">添加优惠券</Button>
    </div>
    <Footer/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from '../../common/footer/index.vue'
  import {Button} from 'vant'
  import {addCoupons} from './service'

  export default {
    components: {
      Footer,
      Button
    },
    methods: {
      addCoupons() {
        try {
          addCoupons({
            couponName: '满199减150',
            amount: 150,
            limitMinMoney: 190,
            description: '测试优惠券',
            beginTime: '2019-7-22',
            endTime: '2019-8-1'
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #get-coupons {
    .content {
      /*background-color: #f2f2f2;*/
      height: calc(100vh - 55px);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
