<template>
  <div id="category">
    <Header></Header>
    <div class="category-container">
      <Aside></Aside>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../common/header'
  import Footer from '../../common/footer'
  import Aside from './components/aside'

  export default {
    components: {
      Aside,
      Header,
      Footer
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #category {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    overflow: hidden;
    .category-container {
      height: calc(100% - 9.5rem);
      display: flex;
      margin-top: 100rem/@baseFontSize;
    }
  }
</style>
