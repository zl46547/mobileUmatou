<template>
  <div id="menuSelect">
    <div v-if="menuItems.length>0" class="menu-item" v-for="(item,i) in menuItems" :key="i"
         :class="{'isActive':item.label === getSelected }" @click="menuClick(item.label)">
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
    data() {
      return {
        menuSelected: ''
      }
    },
    computed: {
      getSelected() {
        var vm = this
        vm.menuSelected = vm.selected
        return vm.menuSelected
      }
    },
    mounted() {
      var vm = this
      vm.menuSelected = vm.selected
    },
    methods: {
      /**
       * 菜单点击事件
       * @param val 被点击的index
       */
      menuClick(val) {
        var vm = this
        // 模拟请求数据
        vm.menuSelected = val
        vm.$emit('menu-selected', vm.menuSelected)
      }
    }
  }
</script>

<style lang="less" scoped>
  #menuSelect {
    position: absolute;
    left: 50%;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 999;
    background-color: #fafafa;
    box-shadow: 0 3px 20px rgb(235, 235, 235);
    max-width:640px;
    transform: translateX(-50%);
    .menu-item {
      width: 100%;
      height: 100%;
      display: flex;
      cursor: pointer;
      border-bottom: 2px solid #fafafa;
      span {
        margin: auto;
      }
    }
    .isActive {
      color: #ff3d5b;
      border-bottom: 2px solid #ff3d5b;
    }
  }
</style>
