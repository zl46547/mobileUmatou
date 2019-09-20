<template>
  <footer id="footer">
    <div class="tabbar">
      <div class="tabbar-item"
           v-for="item in tabbarItem"
           :key="item.name"
           :class="{'isSelected':item.url === selected}"
           @click="footSelect(item.url)">
        <i :class="[`${item.icon}`]" class="iconfont"></i>
        <span class="tabbar-item-name">{{item.name}}</span>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
import { FOOT_SELECT_MENU } from '../../vuex/types'
  export default {
    data () {
      return {
        selected: '/',
        tabbarItem: [
          {
            name: '首页',
            icon: 'icon-home',
            url: '/'
          },
          {
            name: '分类',
            icon: 'icon-category',
            url: '/category'
          },
          {
            name: '购物车',
            icon: 'icon-cart',
            url: '/car'
          },
          {
            name: '我的',
            icon: 'icon-mine',
            url: '/user'
          }
        ]
      }
    },
    methods: {
      footSelect(val) {
        this.selected = val
        this.$router.replace(val)
        this.$store.commit(FOOT_SELECT_MENU, val)
      }
    },
    created () {
      this.selected = this.$store.state.common.footSelectMenu
      let routerName = this.$route.name
      switch (routerName) {
        case '首页':
          this.selected = '/'
          break
        case '分类页':
          this.selected = '/category'
          break
        case '购物车页':
          this.selected = '/car'
          break
        case '用户页':
          this.selected = '/user'
          break
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #footer {
    background-color: #fff;
    width: 100%;
    height: 90rem/@baseFontSize;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    border-top: 1px solid rgb(221, 221, 221);
    .tabbar {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      .tabbar-item {
        text-align: center;
        cursor: pointer;
        .iconfont {
          font-size: 36rem/@baseFontSize;
          display: block;
        }
        .tabbar-item-name {
          display: block;
          font-size: 20rem/@baseFontSize;
        }
      }
    }
    .isSelected {
      color: @themeColor;
      font-weight:bold;
    }
  }
</style>
