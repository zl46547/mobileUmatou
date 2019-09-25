<template>
  <div id="accountList">
    <div class="my-account" v-for="item in myAccountList" :key="item.id">
      <p class="my-account-count">{{item.value}}</p>
      <p class="my-account-name">{{item.name}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        myAccountList: [
          {
            id: '0',
            name: '码头币',
            value: '200'
          },
          {
            id: '1',
            name: '积分',
            value: '1314'
          },
          {
            id: '2',
            name: '红包',
            value: '40.5'
          },
          {
            id: '3',
            name: '优惠券',
            value: '2'
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #accountList {
    margin-top:10rem/@baseFontSize;
    padding: 20rem/@baseFontSize 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 26rem/@baseFontSize;
    background-color: #fff;
    .my-account {
      cursor: pointer;
      .my-account-count{
        font-size: 35rem/@baseFontSize;
        text-align: center;
      }
      .my-account-name{
        font-size: 28rem/@baseFontSize;
        text-align: center;
      }
    }
  }
</style>
