<template>
  <div id="addAddress">
    <div class="addressContent" @click="handleAddressChange">
      <span class="iconfont icon-location"></span>
      <div>
        <div class="address-info">
          <p class="receiveMan-title">收货人：</p>
          <div>
            <p class="receiveMan-name">{{addressInfo.name}}</p>
            <p class="receiveMan-tel">{{addressInfo.tel}}</p>
          </div>
        </div>
        <div class="address-info">
          <p class="receiveMan-title">收货地址：</p>
          <div>
            <p class="receiveMan-tel">{{addressInfo.address}}</p>
          </div>
        </div>
      </div>
      <span class="iconfont icon-arrow-right"></span>
    </div>
    <div class="divider">
      <img src="../../../assets/images/divider.png" alt="分割线" mode="widthFix"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  export default {
    data () {
      return {
        addressInfo: {
          name: '张磊',
          tel: '15606130737',
          address: '江苏省苏州市工业园区曼哈顿广场'
        }
      }
    },
    computed: {},
    methods: {
      handleAddressChange() {
        Toast({
          message: '该功能暂未开发'
        })
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
          font-size:1.3rem;
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
            font-size:1.5rem;
          }
        }
      }
    }
  }
</style>
