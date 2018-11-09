<template>
  <div id="category">
    <v-header></v-header>
    <div class="div">
      <v-aside></v-aside>
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/header/index.vue'
  import Footer from '@/common/footer/index.vue'
  import Aside from './components/aside.vue'
  import Main from './components/main.vue'

  export default {
    components: {
      'VAside': Aside,
      'VHeader': Header,
      'VFooter': Footer,
      'VMain': Main
    }
  }
</script>

<style lang="less" scoped>
  #category {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    .div {
      display: flex;
      margin-top: 55px;
    }
  }
  @media screen and (min-width: 400px) {
    #category {
      .div {
        margin-top: 60px;
      }
    }
  }
</style>
