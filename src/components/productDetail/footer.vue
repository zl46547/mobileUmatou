<template>
  <div class="footer">
    <div class="icon">
      <i class="iconfont icon-kefu"></i>
      <p>客服</p>
    </div>
    <div class="icon">
      <i class="iconfont icon-favor"></i>
      <p>收藏</p>
    </div>
    <div class="icon">
      <i class="iconfont icon-cart"></i>
      <p>购物车</p>
    </div>
    <div class="addCart">
      <p>加入购物车</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['response'],
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .footer{
    display: flex;
    width:100%;
    height:18vw;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    .icon{
      flex: 1 1 auto;
      margin: auto;
      text-align: center;
      padding: 10px;
      i{
        font-size:7vw;
      }
    }
    .addCart{
      height:100%;
      width:40vw;
      background-color: #f05423;
      display: flex;
      p{
        margin: auto;
        color: #fff;
        font-weight:bold;
      }
    }
  }
</style>
