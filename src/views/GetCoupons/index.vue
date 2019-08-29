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
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        try {
          addCoupons({
            customerGuid,
            couponName: '测试优惠券',
            amount: 10,
            limitMinMoney: 1,
            description: '无门槛优惠券',
            beginTime: '2019-8-22',
            endTime: '2019-9-22'
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
      background-color: #f2f2f2;
      height: calc(100vh - 55px);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
