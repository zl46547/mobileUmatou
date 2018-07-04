<template>
  <div class="service">
    <ul>
      <li><i class="iconfont icon-safe"><span>自营品牌</span></i></li>
      <li><i class="iconfont icon-ok"><span>无忧退货</span></i></li>
      <li><i class="iconfont icon-ok"><span>48小时快速退款</span></i></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/font/iconfont.css';

  .service {
    .bd();
    ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 3vh 0;
      font-size: 4vw;
      span {
        margin-left: 2vw;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .service {
      ul {
        margin: 25px 0;
        font-size: 26px;
        span {
          margin-left: 10px;
        }
      }
    }
  }
</style>
