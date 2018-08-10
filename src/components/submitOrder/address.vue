<template>
  <div class="addAddress">
    <div class="addressContent">
      <i class="iconfont icon-location"></i>
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
      <i class="iconfont icon-right"></i>
    </div>
    <div class="divider">
      <img src="../../assets/images/divider.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

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
    methods: {}
  }
</script>

<style lang="less" scoped>
  .addAddress {
    background-color: #fff;
    margin-top: 2px;
    .addressContent {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 1vh 0;
      cursor: pointer;
      .icon-location {
        font-size: 1.7rem;
        margin: 10px;
      }
      .icon-right {
        font-size: 1.7rem;
        margin: 10px;
      }
      >div{
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
          font-size: 1.5rem;
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
  }

  @media screen and (min-width: 640px) {
    .addAddress {
      .addressContent {
        .icon-location {
          font-size: 2.5rem;
        }
        .icon-right {
          font-size: 2.5rem;
        }
        >div{
          .address-info {
            font-size: 1.8rem;
          }
        }
      }
      .divider img {
        width: 100%;
      }
    }
  }
</style>
