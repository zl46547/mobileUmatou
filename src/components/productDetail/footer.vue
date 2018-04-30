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
      <mt-badge size="small" type="error">10</mt-badge>
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
    height:10vh;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0px -1px 10px #cccccc;
    .icon{
      flex: 1 1 auto;
      margin: auto;
      text-align: center;
      padding: 10px;
      i{
        font-size:5vw;
      }
      span.mint-badge.is-error.is-size-small {
        position: absolute;
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

  @media screen and (min-width: 768px) {
    .footer{
      width:768px;
      height:65px;
      .icon{
        i{
          font-size:28px;
        }
      }
      .addCart{
        height:100%;
        width:268px;
        background-color: #f05423;
        display: flex;
        p{
          margin: auto;
          color: #fff;
          font-weight:bold;
        }
      }
    }
  }
</style>
