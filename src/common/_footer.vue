<template>
  <footer class="footer" @click.stop="gotoRouter">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <i slot="icon" class="icon-index"></i>首页
      </mt-tab-item>
      <mt-tab-item id="分类页">
        <i slot="icon" class="icon-category"></i>分类
      </mt-tab-item>
      <mt-tab-item id="购物车页">
        <i slot="icon" class="icon-category"></i>购物车
      </mt-tab-item>
      <mt-tab-item id="用户页">
        <i slot="icon" class="icon-category"></i>我的
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script type="text/ecmascript-6">

  export default {
    components: {},
    data () {
      return {
        selected: ''
      }
    },
    methods: {
      gotoRouter () {
        this.$router.push({name: this.selected})
      }
    },
    mounted () {
      let routerName = this.$router.name
      switch (routerName) {
        case '首页':
          this.selected = '首页'
          break
        case '分类页':
          this.selected = '分类页'
          break
        case '购物车页':
          this.selected = '购物车页'
          break
        case '用户页':
          this.selected = '用户页'
          break
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/index/style.css";
  @import "../assets/fz.less";

  .footer {
    .mint-tabbar {
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      -webkit-box-shadow: 0 0 sla(0, 6%, 50%, .13);
      .is-selected {
        color: @cl;
        background-color: #fff;
        i {
          &::before {
            color: @cl;
          }
        }
      }
    }
  }
</style>
