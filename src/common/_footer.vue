<template>
  <footer class="footer" @click.stop="gotoRouter">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="/">
        <i slot="icon" class="icon-index"></i>首页
      </mt-tab-item>
      <mt-tab-item id="/category/all">
        <i slot="icon" class="icon-category"></i>分类
      </mt-tab-item>
      <mt-tab-item id="/car">
        <i slot="icon" class="icon-car"></i>购物车
      </mt-tab-item>
      <mt-tab-item id="/user">
        <i slot="icon" class="icon-user"></i>我的
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
        this.$router.push(this.selected)
      }
    },
    mounted () {
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
  @import "../assets/index/style.css";
  @import "../assets/fz.less";

  .footer {
    .mint-tabbar {
      padding: 5px 0;
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .23);
      -webkit-box-shadow: 0 0 sla(0, 6%, 50%, .23);
      .is-selected {
        color: @cl;
        font-weight:bold;
        background-color: #fff;
        i {
          &::before {
            color: @cl;
            font-weight:bold;
          }
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    .footer{
      .mint-tabbar{
        width:768px;
        margin: 0 auto;
      }
    }
  }
</style>
