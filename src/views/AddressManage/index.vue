<template>
  <div id="address-manage">
    <Navigator>
      <span slot="title">选择地址</span>
    </Navigator>
    <div class="content">
    </div>
    <div class="add-address" @click="handleAddAddress()">
      +新增地址
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/navigator.vue'
  import {Button} from 'vant'
  import {addCoupons} from './service'

  export default {
    components: {
      Button,
      Navigator
    },
    methods: {
      handleAddAddress() {
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
  #address-manage {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .content {
      margin-top: 45px;
      background-color: #f2f2f2;
      flex: 1;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .add-address{
      border-radius: 6px;
      background-color: #49aa34;
      color: #fff;
      text-align: center;
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
</style>
