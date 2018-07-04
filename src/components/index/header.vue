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
    display: flex;
    align-items: center;
    font-size: 4vw;
    padding: 8px;
    .address{
      margin: 0 5px;
    }
    .icon-back{
      transform: rotate(-90deg);margin-right: 10px;
    }
    .search{
      cursor: text;
      border-radius:90px;background-color: #eee;width: 80%;text-align: center;
      img{
        width: 40%;margin: 5px 0;
      }
    }
  }

  @media screen and (min-width: 768px) {
    header {
      font-size: 24px;
    }
  }
</style>
