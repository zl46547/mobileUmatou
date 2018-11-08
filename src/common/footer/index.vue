<template>
  <footer class="footer" @click.stop="gotoRouter">
    <div class="tabbar">
      <div class="tabbar-item" v-for="item in tabbarItem" :key="item.name"
           :class="{'isSelected':item.url === selected}" @click="selectMenu(item.url)">
        <i :class="[`${item.icon}`]" class="iconfont"></i><br/>
        <span class="tabbar-item-name">{{item.name}}</span>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">

  export default {
    components: {},
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
            icon: 'icon-cascades',
            url: '/category/all'
          },
          {
            name: '购物车',
            icon: 'icon-icon01',
            url: '/car'
          },
          {
            name: '我的',
            icon: 'icon-profile',
            url: '/user'
          }
        ]
      }
    },
    methods: {
      gotoRouter () {
        this.$router.replace(this.selected)
      },
      selectMenu(val) {
        this.selected = val
        this.$store.commit('SELECT_MENU', val)
      }
    },
    mounted () {
      this.selected = this.$store.state.common.selectMenu
      let routerName = this.$route.name
      switch (routerName) {
        case '首页':
          this.selected = '/'
          break
        case '分类页':
          this.selected = '/category/all'
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
  @import "../../assets/font/iconfont.css";
  @import "../../assets/fz.less";

  .footer {
    width: 100%;
    height: 55px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -50%;
    display: flex;
    align-items: center;
    box-shadow: 0 -0.5px 20px rgb(221, 221, 221);
    .tabbar {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      .tabbar-item {
        text-align: center;
        .iconfont {
          font-size: 1.5rem;
        }
        .tabbar-item-name {
          font-size: 1rem;
        }
      }
    }
    .isSelected {
      color: @cl;
      font-weight: bold;
      background-color: #fff;
      i {
        &::before {
          color: @cl;
          font-weight: bold;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .footer {
      width: 640px;
      margin-left: -320px;
      .tabbar {
        .tabbar-item {
          .iconfont {
            font-size: 1.8rem;
          }
          .tabbar-item-name {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>
