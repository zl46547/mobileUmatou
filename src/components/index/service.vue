<template>
  <div class="service">
    <ul>
      <li><i class="iconfont icon-safe"></i><span>自营品牌</span></li>
      <li><i class="iconfont icon-sponsor"></i><span>无忧退货</span></li>
      <li><i class="iconfont icon-vip"></i><span>优质服务</span></li>
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
      font-size: 4.5vw;
      .iconfont{
        font-size:5.5vw;
        color: #ec7b11;
      }
      span {
        margin-left: 1vw;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .service {
      ul {
        margin: 25px 0;
        font-size: 26px;
        .iconfont{
          font-size:30px;
        }
        span {
          margin-left: 8px;
        }
      }
    }
  }
</style>
