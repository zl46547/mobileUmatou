<template>
  <header>
    <i class="iconfont icon-back" @click="$router.go(-1)"></i>
    <h1>购物车</h1>
    <p>编辑</p>
  </header>
</template>

<script type="text/ecmascript-6">

  export default {
  }
</script>

<style lang="less" scoped>
/*@import "../../assets/index/style.css";*/
@import "../../assets/fz";

  header{
    background-color: #fdfdfd;
    text-align: center;
    position:fixed;
    top: 0px;
    width:100%;
    z-index: 9999;
    height: 12vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*padding: 0 4vw;*/
    .iconfont{
      margin-left: 2vw;
    }
    h1 {
      .fz(font-size,34);
      letter-spacing: .2vw;
      font-weight: 600;
    }
    p{
      margin-right: 3vw;
      font-size:4vw;
    }
  }

@media screen and (min-width: 768px) {
}
</style>
