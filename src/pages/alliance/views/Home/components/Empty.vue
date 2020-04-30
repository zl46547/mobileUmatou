<template>
  <div id="empty">
    <i class="iconfont icon-empty-list"></i>
    <p>未查询到相关商品</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="less" scoped>
  #empty {
    text-align: center;
    margin-top: 40%;
    .iconfont {
      color: #c2c2c2;
      margin: auto;
      font-size: 6rem;
    }
    p{
      font-size: 1.6rem;
      white-space: nowrap;
      padding: 1.5vh;
      text-align: center;
    }
  }
</style>
