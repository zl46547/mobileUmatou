<template>
  <div class="back-to-top" @click="toTop()">
    <i class="icon iconfont icon-scrollTop"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import utils from '../../../../../util/common'

  export default {
    methods: {
      toTop () {
        let dom = this.$parent.$refs.content
        utils.backToTop(dom)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  /* 加载字体样式 */
  .back-to-top {
    cursor: pointer;
    position: absolute;
    right: 10rem/@baseFontSize;
    bottom: 130rem/@baseFontSize;
    width: 70rem/@baseFontSize;
    height: 70rem/@baseFontSize;
    border-radius: 50%;
    background-color: rgba(78, 78, 78, 0.45);
    display: flex;
    .iconfont {
      margin: auto;
      font-size: 40rem/@baseFontSize;
      color: #4c4949;
    }
  }
</style>
