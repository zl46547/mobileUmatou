<template>
  <div class="common-btn" @click="handleClick()">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      handleClick() {
        this.$emit('on-click')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../less/variables";

  .common-btn {
    letter-spacing: .5rem;
    cursor: pointer;
    border-radius: 5rem/@baseFontSize;;
    background-color: @themeColor;
    color: #fff;
    text-align: center;
    font-size: 30rem/@baseFontSize;
    height: 100rem/@baseFontSize;
    line-height: 100rem/@baseFontSize;
  }
</style>
