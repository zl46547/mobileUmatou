<template>
  <div class="addAddress">
    <div class="addressContent">
      <i class="iconfont icon-location"></i>
      <div class="address-info">
        <el-row style="padding: 1vh 0">
          <el-col :span="7"><p class="receiveMan-title">收货人：</p></el-col>
          <el-col :span="9"><p class="receiveMan-name">{{addressInfo.name}}</p></el-col>
          <el-col :span="8"><p class="receiveMan-tel" style="">{{addressInfo.tel}}</p></el-col>
        </el-row>
        <el-row style="padding: 1vh 0">
          <el-col :span="7"><p class="receiveAddr-title">收货地址：</p></el-col>
          <el-col :span="15"><p class="receiveAddr-detail">{{addressInfo.address}}</p></el-col>
        </el-row>
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
      display: table;
      width: 100%;
      cursor: pointer;
      .iconfont {
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        width: 10%;
      }
      .icon-location {
        font-size: 7vw;
      }
      .icon-right {
        font-size: 4vw;
      }
      .address-info {
        display: table-cell;
        padding: 2vh;
        padding-bottom: 0;
        width: 80%;
        .receiveMan-title {
          text-align: right;
        }
        .receiveMan-title, .receiveMan-name, .receiveMan-tel {
          font-size: 4.5vw;
        }
        .receiveAddr-title {
          text-align: right;
        }
        .receiveAddr-title, .receiveAddr-detail {
          font-size: 4vw;
        }
      }
    }
    .divider img {
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) {
    .addAddress {
      .addressContent {
        width: 100%;
        .iconfont {
          width: 10%;
        }
        .icon-location {
          font-size: 40px;
        }
        .icon-right {
          font-size: 25px;
        }
        .address-info {
          padding: 20px 0;
          width: 80%;
          .receiveMan-title, .receiveMan-name, .receiveMan-tel {
            font-size: 25px;
          }
          .receiveAddr-title, .receiveAddr-detail {
            font-size: 20px;
          }
        }
      }
      .divider img {
        width: 100%;
      }
    }
  }
</style>
