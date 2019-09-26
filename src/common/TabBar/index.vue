<template>
  <footer id="footer">
    <div class="tab-bar">
      <router-link class="tab-bar-item" exact to="/">
        <i class="iconfont icon-home"></i>
        <span class="tab-bar-item-name">首页</span>
      </router-link>
      <router-link class="tab-bar-item" to="/category">
        <i class="iconfont icon-category"></i>
        <span class="tab-bar-item-name">分类</span>
      </router-link>
      <router-link class="tab-bar-item" to="/cart">
        <i class="iconfont icon-cart"></i>
        <span class="tab-bar-item-name">购物车</span>
      </router-link>
      <router-link class="tab-bar-item" to="/user">
        <i class="iconfont icon-mine"></i>
        <span class="tab-bar-item-name">我的</span>
      </router-link>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #footer {
    background-color: #fff;
    width: 100%;
    height: 100rem/@baseFontSize;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    border-top: 1px solid rgb(221, 221, 221);
    .tab-bar {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      .tab-bar-item {
        text-align: center;
        cursor: pointer;
        .iconfont {
          font-size: 36rem/@baseFontSize;
          display: block;
        }
        .tab-bar-item-name {
          display: block;
          font-size: 20rem/@baseFontSize;
        }
      }
    }
    .is-selected {
      color: @themeColor;
      font-weight:bold;
    }
  }
</style>
