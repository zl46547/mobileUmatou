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
      <span class="iconfont icon-arrow"></span>
    </div>
    <div class="divider">
      <img src="../../../assets/images/divider.png" alt="分割线" mode="widthFix"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
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
      .icon-location, .icon-arrow {
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
            width: 100px;
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
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family: "iconfont";
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-location:before {
      content: "\e620";
    }

    .icon-arrow:before {
      content: "\e627";
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
