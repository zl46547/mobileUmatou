<template>
  <div id="address-manage">
    <Navigator>
      <span slot="title">选择地址</span>
    </Navigator>
    <div class="content">
      <div v-for="item in addressList" :key="item._id">
        <AddressItem :addressItem="item"/>
      </div>
    </div>
    <div class="add-address" @click="handleAddAddress()">
      +新增地址
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/navigator.vue'
  import { Button } from 'vant'
  import { getAddressList } from './service'
  import AddressItem from './components/addressItem'

  export default {
    components: {
      Button,
      Navigator,
      AddressItem
    },
    data () {
      return {
        addressList: []
      }
    },
    mounted () {
      this.initAddressList()
    },
    methods: {
      /**
       * 跳转添加地址
       */
      handleAddAddress() {
        this.$router.push({name: '添加地址'})
      },
      /**
       * 初始化地址列表
       * @returns {boolean}
       */
      initAddressList () {
        let {addressSelected} = this.$store.state.order
        getAddressList().then(res => {
          if (addressSelected) {
            res = res.map(item => {
              item.isDefault = item._id === addressSelected._id
              return item
            })
          }
          this.addressList = res
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #address-manage {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    .content {
      margin-top: 80rem/@baseFontSize;
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .add-address {
      cursor: pointer;
      height: 70rem/@baseFontSize;;
      line-height: 70rem/@baseFontSize;;
      border-radius: 5rem/@baseFontSize;
      background-color: @themeColor;
      color: #fff;
      text-align: center;
      font-size: 22rem/@baseFontSize;;
    }
  }
</style>
