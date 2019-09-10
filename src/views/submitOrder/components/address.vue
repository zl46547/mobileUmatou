<template>
  <div id="addAddress">
    <div class="addressContent" @click="handleAddressChange" v-if="addressInfo">
      <span class="iconfont icon-location"></span>
      <div>
        <div class="address-info">
          <p class="receiveMan-title">收货人：</p>
          <div>
            <p class="receiveMan-name">{{addressInfo.contactName}}</p>
            <p class="receiveMan-tel">{{addressInfo.contactTel}}</p>
          </div>
        </div>
        <div class="address-info">
          <p class="receiveMan-title">收货地址：</p>
          <div>
            <p class="receiveMan-tel">{{formatArea(addressInfo.area)}}{{addressInfo.addressDetail}}</p>
          </div>
        </div>
      </div>
      <span class="iconfont icon-arrow-right"></span>
    </div>
    <div v-else class="add-address" @click="handleAddressChange">
      <i class="iconfont icon-add"></i>
      <span>添加地址</span>
    </div>
    <div class="divider">
      <img src="../../../assets/images/divider.png" alt="分割线" mode="widthFix"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDefaultAddress} from '../service'
  import {ADDRESS_SELECTED} from '../../../vuex/types'

  export default {
    mounted() {
      this.init()
    },
    data() {
      return {
        addressInfo: null
      }
    },
    methods: {
      init() {
        let {login: {user: {customerGuid}}, order: {addressSelected}} = this.$store.state
        if (!customerGuid) {
          return false
        }
        if (addressSelected) {
          this.addressInfo = addressSelected
          return false
        }
        getDefaultAddress(customerGuid).then(res => {
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
      handleAddressChange() {
        this.$router.push('/addressManage/0')
      }
    }
  }
</script>

<style lang="less" scoped>
  #addAddress {
    background-color: #fff;
    margin-top: 1px;

    .addressContent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 1vh 0;
      cursor: pointer;

      .icon-location, .icon-arrow-right {
        font-size: 1.8rem;
        margin: 0 10px 0 10px;
      }

      > div {
        width: 100%;

        .iconfont {
          text-align: center;
          display: table-cell;
          vertical-align: middle;
          width: 10%;
        }

        .address-info {
          display: flex;
          width: 100%;
          padding: 1vh 0;
          font-size: 1.3rem;

          .receiveMan-title {
            width: 6rem;
            text-align: right;
            white-space: nowrap;
          }

          > div {
            width: 70%;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
    .add-address{
      text-align: center;
      font-size: 1.4rem;
      padding: 20px 0;
      .icon-add{
        font-size: 1.6rem;
      }
    }
    .divider img {
      width: 100%;
    }
  }

  @media screen and (min-width: 400px) {
    #addAddress {
      .addressContent {
        .icon-location, .icon-arrow {
          font-size: 2rem;
          margin: 0 10px 0 20px;
        }

        > div {
          .address-info {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
</style>
