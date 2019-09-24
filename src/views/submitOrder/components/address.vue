<template>
  <div class="add-address">
    <div class="address-content"
         @click="handleAddressChange"
         v-if="addressInfo"
    >
      <i class="iconfont icon-location"></i>
      <div class="address-form">
        <div class="address-form-item">
          <p class="address-form-item-label">收货人：</p>
          <div class="address-form-item-value">
            <span>{{addressInfo.contactName}}</span>
            <span>{{addressInfo.contactTel}}</span>
          </div>
        </div>
        <div class="address-form-item">
          <p class="address-form-item-label">收货地址：</p>
          <p class="address-form-item-value">{{formatArea(addressInfo.area)}}{{addressInfo.addressDetail}}</p>
        </div>
      </div>
      <i class="iconfont icon-arrow-right"></i>
    </div>
    <div v-else class="add-address" @click="handleAddressChange">
      <i class="iconfont icon-add"></i>
      <span>添加地址</span>
    </div>
    <img class="divider" src="../../../assets/images/divider.png" alt="分割线" mode="widthFix"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getDefaultAddress } from '../service'
  import { ADDRESS_SELECTED } from '../../../vuex/types'

  export default {
    mounted () {
      this.init()
    },
    data () {
      return {
        addressInfo: null
      }
    },
    methods: {
      init () {
        let {order: {addressSelected}} = this.$store.state
        if (addressSelected) {
          this.addressInfo = addressSelected
          return false
        }
        getDefaultAddress().then(res => {
          if (res) {
            this.addressInfo = res
            this.$store.commit(ADDRESS_SELECTED, res)
          }
        })
      },
      /**
       * 格式化地区
       */
      formatArea (area) {
        if (!area) {
          return null
        }
        return area.map(item => item.name).join('')
      },

      /**
       * 选择地址
       */
      handleAddressChange () {
        this.$router.push('/addressManage/0')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .add-address {
    background-color: #fff;
    .address-content {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 20rem/@baseFontSize 0;
      cursor: pointer;

      .icon-location, .icon-arrow-right {
        display: block;
        width: 4rem;
        text-align: center;
        font-size: 1.8rem;
      }
      .address-form {
        flex: 1;
      }
      .address-form-item {
        display: flex;
        width: 100%;
        padding: 10rem/@baseFontSize 0;
        font-size: 1.3rem;

        .address-form-item-label {
          width: 6rem;
          text-align: right;
          white-space: nowrap;
        }

        .address-form-item-value {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .add-address {
      text-align: center;
      font-size: 1.4rem;
      padding: 20rem/@baseFontSize 0;
      .icon-add {
        font-size: 1.6rem;
      }
    }
    .divider {
      display: block;
      width: 100%;
    }
  }
</style>
