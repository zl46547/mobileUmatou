<template>
  <header>
    <div class="address">
      苏州
    </div>
    <i class="iconfont icon-back"></i>
    <div class="search">
      <img src="../../assets/images/search.png"/>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="less" scoped>
  @import '../../assets/font/iconfont.css';

  header {
    position: absolute;
    left: 0;
    top:0;
    width:100%;
    height:8vh;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    padding-left:4vw;
    z-index: 999;
    box-shadow: 0 0.5px 20px rgb(221, 221, 221);
    .icon-back{
      transform: rotate(-90deg);
      font-size:1.2rem;
      padding: 0 7px;
    }
    .search{
      cursor: text;
      border-radius:90px;background-color: #eee;width: 80%;text-align: center;
      height:6vh;
      img{
        height:100%; padding: 1vh 0;
      }
    }
  }

  @media screen and (min-width: 640px) {
    header {
      font-size: 1.7rem;
      font-family:"Microsoft Himalaya";
      padding-left:28px;
      .icon-back{
        font-size:1.4rem;
        margin-bottom: 10px;
        padding: 0 7px;
      }
    }
  }
</style>
