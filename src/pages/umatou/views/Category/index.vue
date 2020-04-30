<template>
  <div id="category">
    <CityHeader></CityHeader>
    <div class="category-container">
      <Aside @change-tab="changeTab"/>
      <Main ref="mainComponent"/>
    </div>
    <TabBar/>
  </div>
</template>

<script type="text/ecmascript-6">
  import CityHeader from '../../common/CityHeader'
  import TabBar from '../../common/TabBar'
  import Aside from './components/Aside'
  import Main from './components/Main'

  export default {
    components: {
      Aside,
      CityHeader,
      TabBar,
      Main
    },
    methods: {
      changeTab({Id}) {
        this.$refs.mainComponent.getCategoryDetailById(Id)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../less/variables";

  #category {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    overflow: hidden;
    .category-container {
      height: calc(100% - 10rem);
      display: flex;
      margin-top: 5rem;
    }
  }
</style>
