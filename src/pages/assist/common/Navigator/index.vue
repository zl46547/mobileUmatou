<template>
  <header>
    <i class="icon iconfont icon-arrow-left" @click="goBack"></i>
    <div class="title">
      <slot name="title"></slot>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../less/variables";

  header {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    width:100%;
    height: 80rem/@baseFontSize;
    line-height:80rem/@baseFontSize ;
    z-index: 999;
    border-bottom: 1px solid rgba(219, 219, 219, 0.48);
    .icon-arrow-left{
      position: absolute;
      top: 50%;
      left:0;
      transform: translateY(-50%);
      width:60rem/@baseFontSize;
      text-align: center;
      cursor: pointer;
      display: block;
      font-size:32rem/@baseFontSize;
    }
    .title{
      text-align: center;
      font-size:26rem/@baseFontSize;
    }
  }
</style>
