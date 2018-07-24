<template>
  <div class="menu" style="height: 8vh;display: flex;align-items: center;justify-content: space-around">
    <div v-if="menuItems.length>0" class="menu-item" v-for="(item,i) in menuItems" :key="i"
         :class="{'isActive':i === menuSelected }" @click="menuClick(i)">
      <p>{{item.label}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      menuItems: {
        default: []
      }
    },
    data() {
      return {
        menuSelected: 0
      }
    },
    methods: {
      /**
       * 菜单点击事件
       * @param val 被点击的index
       */
      menuClick(val) {
        var vm = this
        vm.menuSelected = val
        vm.$emit('menu-selected', vm.menuSelected)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/font/iconfont.css";

  .menu {
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -50%;
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 999;
    background-color: #fafafa;
    box-shadow: 0 0.5px 20px rgb(221, 221, 221);
    .menu-item {
      width:100%;
      height:100%;
      display: flex;
      font-size: 2vw;
      cursor: pointer;
      border-bottom: 2px solid #fff;
      P{
        margin: auto;
      }
    }
    .isActive {
      color: #ff3d5b;
      border-bottom: 2px solid #ff3d5b;
    }
  }

  @media screen and (min-width: 768px) {
    .menu {
      margin-left: -384px;
      width: 768px;
    }
  }
</style>
