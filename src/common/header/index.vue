<template>
  <header  @click="handleCityChange">
    <div class="address">
      苏州市
    </div>
    <i class="iconfont icon-arrow-down"></i>
    <div class="search">
      <img src="../../assets/images/search.png"/>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  export default {
    methods: {
      handleCityChange() {
        Toast({
          message: '该功能暂未开发'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  header {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-color: #fff;
    max-width:640px;
    min-width: 320px;
    width:100%;
    height: 100rem/@baseFontSize;
    display: flex;
    align-items: center;
    z-index: 999;
    border-bottom: 1px solid rgba(219, 219, 219, 0.48);
    .address{
      margin-left: 10rem/@baseFontSize;
      font-size: 30rem/@baseFontSize;
      white-space: nowrap;
    }
    .icon-arrow-down {
      padding-left: 7rem/@baseFontSize;
      font-size: 34rem/@baseFontSize;
    }
    .search {
      margin-left: 10rem/@baseFontSize;
      margin-right: 10rem/@baseFontSize;
      cursor: text;
      border-radius: 90rem/@baseFontSize;
      background-color: #eee;
      flex: 1;
      height: 70%;
      display: flex;
      align-items: center;
      img{
        margin: auto;
        width: 35%;
        display: block;
      }
    }
  }
</style>
