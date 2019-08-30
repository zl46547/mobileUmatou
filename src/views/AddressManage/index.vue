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
        let {user: {customerGuid}} = this.$store.state.login
        let {addressSelected} = this.$store.state.orderList
        if (!customerGuid) {
          return false
        }
        try {
          getAddressList({customerGuid}).then(res => {
            if (addressSelected) {
              res = res.map(item => {
                item.isDefault = item._id === addressSelected._id
                return item
              })
            }
            this.addressList = res
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
    .add-address {
      border-radius: 6px;
      background-color: #49aa34;
      color: #fff;
      text-align: center;
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
</style>
