<template>
  <div id="category">
    <CityHeader></CityHeader>
    <div class="category-container">
      <Aside></Aside>
      <router-view></router-view>
    </div>
    <TabBar/>
  </div>
</template>

<script type="text/ecmascript-6">
  import CityHeader from '../../common/CityHeader'
  import TabBar from '../../common/TabBar'
  import Aside from './components/Aside'

  export default {
    components: {
      Aside,
      CityHeader,
      TabBar
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
