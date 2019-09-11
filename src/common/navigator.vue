<template>
  <header>
    <i class="icon iconfont icon-arrow-left" @click="goBack"></i>
    <div class="title">
      <slot name="title"></slot>
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
      },
      goBack() {
        console.log(this.$router)
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../less/variables";

  header {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-color: #fff;
    max-width:640px;
    width:100%;
    height: 80rem/@baseFontSize;
    display: flex;
    align-items: center;
    z-index: 999;
    border-bottom: 1px solid rgba(219, 219, 219, 0.48);
    .icon-arrow-left{
      width:60rem/@baseFontSize;
      text-align: center;
      cursor: pointer;
      display: block;
      font-size:40rem/@baseFontSize;
    }
    .title{
      margin-left: -60rem/@baseFontSize;
      flex: 1;
      text-align: center;
      font-size:30rem/@baseFontSize;
    }
  }
</style>
