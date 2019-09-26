<template>
  <div id="tab-menu">
    <div v-if="menuItems.length>0" class="menu-item" v-for="(item,i) in menuItems" :key="i"
         :class="{'isActive':item.label === selected }" @click="menuClick(item.label)">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      menuItems: {
        default: []
      },
      selected: ''
    },
    methods: {
      /**
       * 菜单点击事件
       * @param val 被点击的index
       */
      menuClick(val) {
        // 模拟请求数据
        this.$emit('menu-selected', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #tab-menu {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80rem/@baseFontSize;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 999;
    background-color: #fafafa;
    border-bottom: 1px solid rgb(235, 235, 235);
    .menu-item {
      width: 100%;
      height: 100%;
      line-height: 80rem/@baseFontSize;
      text-align: center;
      cursor: pointer;
      font-size: 28rem/@baseFontSize;
    }
    .isActive {
      color: @themeColor;
      position: relative;
      &::after{
        position: absolute;
        content: "";
        width: 80%;
        height: 3rem/@baseFontSize;
        background-color: @themeColor;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
